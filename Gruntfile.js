module.exports = function (grunt) {
  var browsers = [
    {
      "browserName": "chrome",
      "platform": "Linux",
      "version": "latest"
    }
  ];

  var username = grunt.option('username');
  var access_key = grunt.option('access-key');
  var build_id = grunt.option('build-id') || 'test';

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
          username: username,
          key: function() {
            return access_key;
          },
          urls: [
            'http://127.0.0.1:9999/js/tests/index.html?hidepassed'
          ],
          browsers: browsers,
          build: build_id,
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