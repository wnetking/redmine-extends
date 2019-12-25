const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');


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
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            parse: {
              // we want terser to parse ecma 8 code. However, we don't want it
              // to apply any minfication steps that turns valid ecma 5 code
              // into invalid ecma 5 code. This is why the 'compress' and 'output'
              // sections only apply transformations that are ecma 5 safe
              // https://github.com/facebook/create-react-app/pull/4234
              ecma: 8
            },
            compress: {
              ecma: 5,
              warnings: false,
              // Disabled because of an issue with Uglify breaking seemingly valid code:
              // https://github.com/facebook/create-react-app/issues/2376
              // Pending further investigation:
              // https://github.com/mishoo/UglifyJS2/issues/2011
              comparisons: false,
              // Disabled because of an issue with Terser breaking valid code:
              // https://github.com/facebook/create-react-app/issues/5250
              // Pending futher investigation:
              // https://github.com/terser-js/terser/issues/120
              inline: 2,
              // drop_console: true,
              // filter all console's statements, console.error will stay
              pure_funcs: [
                'console.log',
                'console.info',
                'console.debug',
                'console.warn'
              ]
            },
            // mangle: {
            //   safari10: true,
            // },
            output: {
              ecma: 5,
              comments: false,
              // Turned on because emoji and regex is not minified properly using default
              // https://github.com/facebook/create-react-app/issues/2488
              ascii_only: true
            }
          },
          parallel: true
        })
      ]
    }
  };
};
