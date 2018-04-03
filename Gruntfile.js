module.exports = function (grunt) {
  var browsers = [
      {
        "browserName": "chrome",
        "platform": "Linux",
        "version": "latest"
      }
    ];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          base: '.',
          port: 9999
        }
      }
    },
  
    'saucelabs-qunit': {
      all: {
        options: {
          username: 'christophersanson', // if not provided it'll default to ENV SAUCE_USERNAME (if applicable)
          key: function() {
            return '2720c493-f07c-482e-b313-a9e2179c0b2f';
          }, // if not provided it'll default to ENV SAUCE_ACCESS_KEY (if applicable)
          urls: [
            'http://127.0.0.1:9999/js/tests/index.html?hidepassed'
          ],
          browsers: browsers,
          build: '123',
          testname: 'qunit tests',
          throttled: 3,
          sauceConfig: {
            'video-upload-on-pass': false
          },
          onTestComplete: function(result, callback) {
            console.log(result);
            callback(null);
          }
        }
      }
    },
    watch: {}
  });
  
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-saucelabs');
  
  grunt.registerTask('default', ['connect', 'saucelabs-qunit']);
};