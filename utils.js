const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssNormalize = require('postcss-normalize');

module.exports = {
  getClientEnvironment: publicUrl => {
    const raw = Object.keys(process.env)
      .filter(key => /^APP_/i.test(key))
      .reduce(
        (env, key) => {
          env[key] = process.env[key];
          return env;
        },
        {
          // Useful for determining whether we’re running in production mode.
          // Most importantly, it switches React into the correct mode.
          NODE_ENV: process.env.NODE_ENV || 'development',
          // Useful for resolving the correct path to static assets in `public`.
          // For example, <img src={process.env.PUBLIC_URL + '/img/logo.png'} />.
          // This should only be used as an escape hatch. Normally you would put
          // images into the `src` and `import` them in code to get their paths.
          PUBLIC_URL: publicUrl
        }
      );
    // Stringify all values so we can feed into Webpack DefinePlugin
    const stringified = {
      'process.env': Object.keys(raw).reduce((env, key) => {
        env[key] = JSON.stringify(raw[key]);
        return env;
      }, {})
    };

    return { raw, stringified };
  },
  getStyleLoaders: (cssOptions, preProcessor, isEnvProduction = false) => {
    const loaders = [
      !isEnvProduction && 'style-loader',
      isEnvProduction && {
        loader: MiniCssExtractPlugin.loader
      },
      {
        loader: 'css-loader',
        options: cssOptions
      },
      {
        // Options for PostCSS as we reference these options twice
        // Adds vendor prefixing based on your specified browser support in
        // package.json
        loader: 'postcss-loader',
        options: {
          // Necessary for external CSS imports to work
          // https://github.com/facebook/create-react-app/issues/2677
          ident: 'postcss',
          plugins: () => [
            require('postcss-flexbugs-fixes'),
            require('postcss-preset-env')({
              autoprefixer: {
                flexbox: 'no-2009'
              },
              stage: 3
            }),
            // Adds PostCSS Normalize as the reset css with default options,
            // so that it honors browserslist config in package.json
            // which in turn let's users customize the target behavior as per their needs.
            postcssNormalize()
          ],
          sourceMap: isEnvProduction
        }
      }
    ].filter(Boolean);
    if (preProcessor) {
      loaders.push({
        loader: preProcessor,
        options: {
          sourceMap: isEnvProduction
        }
      });
    }
    return loaders;
  }
};
