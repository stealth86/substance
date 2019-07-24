import fs from 'fs'
import Express from 'express'
import React from 'react'
import { Provider } from 'react-redux'
import Window from '../components/Window/Window'
import { StaticRouter } from "react-router"
import ReactDOMServer from 'react-dom/server'
import createStore from '../store'

const app = Express()
const port = 3000

//Serve static files
app.use('../build', Express.static('static'))
console.log("running")
// This is fired every time the server side receives a request
app.use(handleRender)

// We are going to fill these out in the sections to follow
function handleRender(req, res) {
    const context = {}
    // Render the component to a string
    const { store } = createStore(req.url);
    const html = ReactDOMServer.renderToString(
        <Provider store={store}>
            <StaticRouter location={req.url} context={context}>
                <Window/>
            </StaticRouter>
        </Provider>
    )

    // Grab the initial state from our Redux store
    const preloadedState = store.getState()

    // Send the rendered page back to the client
    res.send(renderFullPage(html, preloadedState))
}
function renderFullPage(html, preloadedState) {
    var text = fs.readFileSync('../build/index.html')
    text.replace(`<div id="root"></div>`, `<div id="root">${html}</div>
  <script>
    window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
        /</g,
        '\\u003c'
    )}
  </script>`)
  return text;
}

app.listen(port)