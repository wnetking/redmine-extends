const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = () => {
  const mode = process.env.NODE_ENV || 'development';
  const SOURCE_FOLDER = path.resolve(__dirname, 'src');
  const DIST_FOLDER = path.resolve(__dirname, 'dist');

  return {
    mode,
    devtool: mode === 'development' ? 'inline-source-map' : undefined,
    entry: {
      //   popup: path.resolve(SOURCE_FOLDER, 'popup.js'),
      options: path.resolve(SOURCE_FOLDER, './options/options.js'),
      sidepanel: path.resolve(SOURCE_FOLDER, './sidepanel/sidepanel.js'),
      background: path.resolve(SOURCE_FOLDER, './background/background.js'),
      contentscript: path.resolve(SOURCE_FOLDER, './contentscript/contentscript.js'),
      inpage: path.resolve(SOURCE_FOLDER, './inpage/inpage.js')
    },
    output: {
      filename: '[name].js',
      path: DIST_FOLDER,
      publicPath: './'
    },
    module: {
      rules: [
        {
          test: /\.(jsx?)$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        }
      ]
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: `${SOURCE_FOLDER}/**/*.html`,
            to({ context, absoluteFilename }) {
              return `${DIST_FOLDER}/[name][ext]`;
            },
          },
          {
            from: `${SOURCE_FOLDER}/**/*.css`,
            to({ context, absoluteFilename }) {
              return `${DIST_FOLDER}/css/[name][ext]`;
            },
          },
          {
            from: `${SOURCE_FOLDER}/extention/*.*`,
            to({ context, absoluteFilename }) {
              return `${DIST_FOLDER}/[name][ext]`;
            },
          },
        ],
      }),
    ],

    resolve: {
      symlinks: false,
      cacheWithContext: false,
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
      ],
    },
  };
};
