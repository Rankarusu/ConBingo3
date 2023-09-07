const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  // Enable CSS support from SDK version 49 and up
  isCSSEnabled: true,
});
config.resolver.sourceExts.push("mjs"); // needed for canvas confetti
module.exports = config;
