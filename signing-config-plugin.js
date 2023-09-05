const {withAppBuildGradle} = require('expo/config-plugins');

// We build a config plugin that modifies the signing config of our build.gradle.
// With this we can avoid checking the whole native stuff in an just let it be generated in the pipeline
module.exports = function withSigningConfig(config) {
  return withAppBuildGradle(config, config => {
    console.log('modifying signing config in build.gradle');
    const signingConfigRelease = `release {
      if (project.hasProperty('CONBINGO_UPLOAD_STORE_FILE')) {
            storeFile file(CONBINGO_UPLOAD_STORE_FILE)
            storePassword CONBINGO_UPLOAD_STORE_PASSWORD
            keyAlias CONBINGO_UPLOAD_KEY_ALIAS
            keyPassword CONBINGO_UPLOAD_KEY_PASSWORD
        }
    }
    `;

    const buildTypesReleaseConfig = `if (project.hasProperty('CONBINGO_UPLOAD_STORE_FILE')) {
      signingConfig signingConfigs.release
    }
    `;

    config.modResults.contents = config.modResults.contents
      .replace(
        /(signingConfigs {\s*)(debug {\s)/gm,
        `$1${signingConfigRelease}$2`,
      )
      .replace(
        /(buildTypes {\s*debug {[\s\w.]*}\s*release {.*)(signingConfig signingConfigs\.debug)(.*)/s,
        `$1${buildTypesReleaseConfig}$3`,
      );

    return config;
  });
};
