const chai         = require('chai');
const chaiWebdriver = require('chai-webdriver');
const selenium      = require('selenium-webdriver');
const test          = require('selenium-webdriver/testing');

const timeOut = 15000;

const By = selenium.By;
const until = selenium.until;
const assert = chai.assert;

const config = {
    host: 'localhost',
    port: '8080'
}


const SELECTOR = {
    ALL_INDICATORS: 'input[data-plugin="weakpasswordindicator"]',
    DEFAULT_INDICATOR: 'input[data-plugin="weakpasswordindicator"]',
    INDICATOR_METER: 'div.weakpasswordindicator__meter',
}

test.describe('Testing widget', function() {
    this.timeout(timeOut);
    
    test.before(function() {
        driver = new selenium.Builder().
        withCapabilities(selenium.Capabilities.chrome()).
        build();
        
        chaiWebdriver(driver);
        driver.get(`http://${config.host}:${config.port}/index.html`);
        // driver.get('http://localhost:8080/index.html')
    });
        
    test.after(function() {
        driver.quit();
    });

    test.it('Should be 7 widgets on a page', function() {
        driver.findElements(By.css(SELECTOR.ALL_INDICATORS))
            .then(elements => {
                assert(elements.length === 7, '7 widgets should be found, but was ' + elements.length);
            })
    })
    
    
    test.it('Default widget should display meter bar', function() {
        // TODO, this test is to change. We won't check ids values

        driver.findElement(By.css(SELECTOR.DEFAULT_INDICATOR))
            .then(element => {
                element.findElement(By.css(SELECTOR.INDICATOR_METER)).then(meter => {
                    assert(typeof meter !== 'undefined', 'Meter should not be undefined');
                })
            })
        
    });
    
    test.it('Default widget meter should change color on input', function() {
        
    })
    
});

