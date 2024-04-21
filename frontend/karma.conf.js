module.exports = function (config) {
  config.set({
    // ...
    plugins: [
      // ...
      require('karma-coverage'),
      require('karma-coverage-istanbul-reporter'),
      require('karma-chrome-launcher')
    ],
    // ...
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, './coverage'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true
    },
    reporters: ['progress', 'kjhtml', 'coverage-istanbul'],
    // ...
    browsers: ['ChromeHeadlessCustom'],
    customLaunchers: {
      ChromeHeadlessCustom: {
        base: 'ChromeHeadless',
        // flags, etc.
      },
    },
    // ...
  });
};