require('ignore-styles');
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';
require('@babel/register')({
    ignore: [ /node_modules\/(?!(react-dnd|react-dnd-html5-backend))/ ],
    presets: ['@babel/env','@babel/react']
});

require('./server');