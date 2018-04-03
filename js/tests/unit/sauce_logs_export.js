$(function () {
  'use strict'

  var log = []
  var err = []

  QUnit.done(function (testResults) {
    var modules = {}
    for (var i = 0, len = log.length; i < len; i++) {
      var details = log[i]
      if (!modules[details.module]) {
        modules[details.module] = {
          failed: 0,
          tests: []
        }
      };

      modules[details.module]['failed']++
      modules[details.module]['tests'].push({
        name: details.name,
        failed: details.failed,
        total: details.total,
        failures: []
      });
    }

    for(var i = 0, len = err.length; i < len; i++) {
      var details = err[i]
      for(var i = 0, len = modules[details.module]['failed']; i < len; i++) {
        var test = modules[details.module]['tests'][i]
        if (test.name == details.name) {
          test.failures.push({
            result: details.result,
            expected: details.expected,
            actual: details.actual,
            source: details.source
          })
        }
      }
    }

    testResults.tests = modules
    window.global_test_results = testResults
  });

  QUnit.testDone(function(details){
    if (!!details.failed) {
      log.push(details)
    }
  });
  QUnit.log(function(details){
    if (!details.result) {
      err.push(details)
    }
  });
});
