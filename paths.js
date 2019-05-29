const path = require('path');
const fs = require('fs');

const envPublicUrl = process.env.PUBLIC_URL;

const moduleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  'web.ts',
  'ts',
  'web.tsx',
  'tsx',
  'json',
  'web.jsx',
  'jsx'
];

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn, filePath) => {
  const extension = moduleFileExtensions.find(extension =>
    fs.existsSync(resolveFn(`${filePath}.${extension}`))
  );
  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }
  return resolveFn(`${filePath}.js`);
};

const getPublicUrl = appPackageJson =>
  envPublicUrl || require(appPackageJson).homepage;

const appPages = { index: 'index', about: 'index' };

const appJs = Object.keys(appPages).reduce(
  (prev, page) => ({ ...prev, [page]: resolveModule(resolveApp, `src/${appPages[page]}`) }),
  {}
);
const appHtml = Object.keys(appPages).map(page => ({
  template: resolveApp(`public/${page}.html`),
  filename: `${page}.html`,
  chunk: appPages[page]
}));

module.exports = {
  appHtml,
  appJs,
  dotenv: resolveApp('.env'),
  appPath: resolveApp('.'),
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  yarnLockFile: resolveApp('yarn.lock'),
  appNodeModules: resolveApp('node_modules'),
  publicUrl: getPublicUrl(resolveApp('package.json'))
};

module.exports.moduleFileExtensions = moduleFileExtensions;
