// const webpackNodeExternals = require('webpack-node-externals');
const common = {
    module: {
        noParse: function (content) {
            return /express/.test(content);
        }
    },
    resolve: {
        extensions: ['.js', '.jsx'] // common extensions
    }
    // other plugins, postcss config etc. common for frontend and backend
};

const frontend = {
     entry: [
         './public/js/main.js'
     ],
     output: {
        filename: 'frontend-output.js'
     }
     // other loaders, plugins etc. specific for frontend
};

const backend = {
     entry: [
         './index.js'
     ],
     output: {
        filename: 'backend-output.js'
     },
     target: 'node',
     externals: ['node_modules']
};

module.exports = [
    Object.assign({} , common, frontend),
    Object.assign({} , common, backend)
];