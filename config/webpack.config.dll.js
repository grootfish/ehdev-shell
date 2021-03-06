const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = env => {
  const plugins = [
    new webpack.DllPlugin({
      context: path.join(__dirname, '..'),
      path: path.join(
        __dirname,
        env.prod ? '../assets/dll/manifest.prod.json' : '../assets/dll/manifest.dev.json'
      ),
      name: '[name]',
    }),
    new webpack.ContextReplacementPlugin(/^\.\/locale$/, (context) => {
      if ( !/[/\\]moment[/\\]/.test(context.context) ) return;
      Object.assign(context, {
        regExp: /^\.\/\w+/,
        request: '../../locale' // resolved relatively
      });
    }),
  ];
  if (env.prod) {
    plugins.push(
      new UglifyJSPlugin({
        parallel: true,
        uglifyOptions: {
          ecma: 6,
        },
      })
    );
  }
  return {
    entry: {
      dll: [
        'react',
        'react-dom',
        'redux',
        'react-redux',
        'moment',
        'antd',
        'react-router',
        'react-router-dom',
        'reselect',
      ],
    },
    output: {
      path: path.join(__dirname, '../assets/dll/'),
      filename: env.prod ? '[name].prod.js' : '[name].dev.js',
      library: '[name]',
    },
    plugins,
  };
};
