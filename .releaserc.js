module.exports = {
  branches: [{ name: 'master' }],
  npmPublish: false,
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/npm',
    [
      'semantic-release-replace-plugin',
      {
        replacements: [
          {
            files: ['app.config.ts'],
            from: "version: '.*'",
            to: "version: '${nextRelease.version}'",
          },
          {
            files: ['app.config.ts'],
            from: `versionCode: [^,]*`,
            to: (match) =>
              `versionCode: ${parseInt(match.split(':')[1].trim()) + 1}`,
          },
        ],
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: ['package.json', 'package-lock.json', 'app.config.ts'],
        message:
          'chore(release): ${nextRelease.version} \n\n${nextRelease.notes}',
      },
    ],
    '@semantic-release/github',
  ],
};
