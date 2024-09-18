// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

// if you use Expo:
const config = getDefaultConfig(__dirname);
// unstable_enablePackageExports: true,
config.resolver.unstable_enablePackageExports = true;
module.exports = config;