module.exports = function (config) {
    config.set({
      // ...
      plugins: [
        // ...
        require('karma-coverage'),
        require('karma-coverage-istanbul-reporter')
      ],
      // ...
      coverageIstanbulReporter: {
        dir: require('path').join(__dirname, './coverage'),
        reports: ['html', 'lcovonly', 'text-summary'],
        fixWebpackSourcePaths: true
      },
      reporters: ['progress', 'kjhtml', 'coverage-istanbul'],
      // ...
    });
  };