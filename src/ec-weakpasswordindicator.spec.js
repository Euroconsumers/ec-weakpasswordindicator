var assert = require('chai').assert;
var selenium = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');

const timeOut = 15000;

test.describe('Selenium for Chrome should work locally', function() {

  this.timeout(timeOut);
  
  test.it('Navigate', function() {
	var driver = new selenium.Builder().
        withCapabilities(selenium.Capabilities.chrome()).
        build();
	driver.get("https://design.euroconsumers.org");
    // driver.isElementPresent(selenium.By.id('wt')).then(function(weight) {
      // assert.equal(weight, true, "Weight entry not possible");
    // });
    driver.quit();
  });

});

