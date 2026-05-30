const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');

config.watchFolders = [path.resolve(monorepoRoot, 'packages')];

config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
];

config.resolver.extraNodeModules = {
  '@mediphi/shared': path.resolve(monorepoRoot, 'packages/shared'),
};

config.server = {
  ...config.server,
  enhanceMiddleware: (middleware) => {
    return (req, res, next) => {
      if (req.url.includes('.next') || req.url.includes('dashboard')) {
        res.statusCode = 404;
        res.end();
        return;
      }
      return middleware(req, res, next);
    };
  },
};

config.watchman = {
  ...config.watchman,
  additionalExts: ['cjs', 'json'],
};

config.resolver.blockList = [
  /node_modules\/.*\/node_modules\/react-native\/.*/,
  /.*\.next.*/,
  /.*dashboard.*/,
];

module.exports = config;
