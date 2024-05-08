// karma.conf.js
module.exports = function(config) {
  config.set({
    // other configuration settings...

    browsers: ['ChromeHeadlessCustom'],

    customLaunchers: {
      ChromeHeadlessCustom: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-gpu', '--remote-debugging-port=9222']
      }
    },

    // continue with other configurations...
  });
};
