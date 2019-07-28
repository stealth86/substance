import path from 'path'
import fs from 'fs'
import React from 'react'
import { Provider } from 'react-redux'
import Window from '../components/Window/Window'
import { StaticRouter } from "react-router"
import ReactDOMServer from 'react-dom/server'
import createStore from '../store'
import Helmet from 'react-helmet'
import manifest from '../../build/asset-manifest.json';
import * as cv from 'opencv4nodejs'
import pretty from 'pretty'

export default (req, res) => {
const injectHTML = (data, { html, title, meta, body, scripts, state }) => {
    data = data.toString().replace('<html>', `<html ${html}>`);
    data = data.replace(/<title>.*?<\/title>/g, title);
    data = data.replace('</head>', `${meta}</head>`);
    data = data.replace(
      '<div id="root"></div>',
      `<div id="root">${body}</div><script>window.__PRELOADED_STATE__ = ${state}</script>${scripts.join('')}`
    );

    return data;
  };

  fs.readFile(
    path.resolve(__dirname, '../../build/index.html'),
    'utf8',
    (err, htmlData) => {
      // If there's an error... serve up something nasty
      if (err) {
        console.error('Read error', err);

        return res.status(404).end();
      }
      // Create a store (with a memory history) from our current url
      const { store } = createStore(req.url);

      // If the user has a cookie (i.e. they're signed in) - set them as the current user
      // Otherwise, we want to set the current state to be logged out, just in case this isn't the default
      
      const context = {};
      const modules = [];

      /*
        Here's the core funtionality of this file. We do the following in specific order (inside-out):
          1. Load the <App /> component
          2. Inside of the Frontload HOC
          3. Inside of a Redux <StaticRouter /> (since we're on the server), given a location and context to write to
          4. Inside of the store provider
          5. Inside of the React Loadable HOC to make sure we have the right scripts depending on page
          6. Render all of this sexiness
          7. Make sure that when rendering Frontload knows to get all the appropriate preloaded requests
        In English, we basically need to know what page we're dealing with, and then load all the appropriate scripts and
        data for that page. We take all that information and compute the appropriate state to send to the user. This is
        then loaded into the correct components and sent as a Promise to be handled below.
      */
      const routeMarkup = ReactDOMServer.renderToString(
            <Provider store={store}>
              <StaticRouter location={req.url} context={context}>
                  <Window />
              </StaticRouter>
            </Provider>
        )
        if (context.url) {
          // If context has a url property, then we need to handle a redirection in Redux Router
          res.writeHead(302, {
            Location: context.url
          });

          res.end();
        } else {
          // Otherwise, we carry on...

          // Let's give ourself a function to load all our page-specific JS assets for code splitting
          const extractAssets = (assets, chunks) =>
            Object.keys(assets)
              .filter(asset => chunks.indexOf(asset.replace('.js', '')) > -1)
              .map(k => assets[k]);

          // Let's format those assets into pretty <script> tags
          const extraChunks = extractAssets(manifest, modules).map(
            c => `<script type="text/javascript" src="/${c.replace(/^\//, '')}"></script>`
          );

          // We need to tell Helmet to compute the right meta tags, title, and such
          const helmet = Helmet.renderStatic();

          // NOTE: Disable if you desire
          // Let's output the title, just to see SSR is working as intended
          //console.log('THE TITLE', helmet.title.toString());

          // Pass all this nonsense into our HTML formatting function above
          const html = injectHTML(htmlData, {
            html: helmet.htmlAttributes.toString(),
            title: helmet.title.toString(),
            meta: helmet.meta.toString(),
            body: routeMarkup,
            scripts: extraChunks,
            state: store.getState()
          });

          // We have all the final HTML, let's send it to the user already!
          res.send(pretty(html));
        }
    }
  );
};