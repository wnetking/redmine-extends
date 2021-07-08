const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = () => {
  const mode = process.env.NODE_ENV || 'development';
  const SOURCE_FOLDER = path.resolve(__dirname, 'src');
  const DIST_FOLDER = path.resolve(__dirname, 'dist');

  const COPY = [
    {
      from: path.join(SOURCE_FOLDER, 'copied'),
      to: DIST_FOLDER,
      ignore: []
    }
  ];

  const plugins = [];

  plugins.push(new CopyWebpackPlugin(COPY));

  if (isProduction) {
    // plugins.push(new BundleAnalyzerPlugin({ analyzerPort: 4000 }));
  }

  return {
    mode,
    entry: {
      //   popup: path.resolve(SOURCE_FOLDER, 'popup.js'),
      options: path.resolve(SOURCE_FOLDER, 'options.js'),
      background: path.resolve(SOURCE_FOLDER, 'background.js'),
      contentscript: path.resolve(SOURCE_FOLDER, 'contentscript.js'),
      inpage: path.resolve(SOURCE_FOLDER, 'inpage.js')
    },
    output: {
      filename: '[name].js',
      path: DIST_FOLDER,
      publicPath: './'
    },
    devtool: 'inline-source-map',
    resolve: {
      extensions: [
        '.ts',
        '.tsx',
        '.js',
        '.jsx',
        '.json',
        '.styl',
        '.css',
        '.png',
        '.jpg',
        '.gif',
        '.svg',
        '.woff',
        '.woff2',
        '.ttf',
        '.otf'
      ]
    },

    plugins,

    module: {
      rules: [
        {
          test: /\.(jsx?)$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        }
      ]
    },
  };
};
