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

test.describe('Testing widget', function() {
    this.timeout(timeOut);
    
    test.before(function() {
        driver = new selenium.Builder().
        withCapabilities(selenium.Capabilities.chrome()).
        build();
        
        chaiWebdriver(driver);
        driver.get(`http://${config.host}:${config.port}/index.html`);
    });
    
    
    test.after(function() {
        driver.quit();
    });
    
    test.it('Widgets should be defined', function() {
        
        let elements = driver.findElement(By.css('input[data-plugin="weakpasswordindicator"]'))
        assert(elements, 'widgets should be defined');
        
    });

    test.it('Should be 7 widgets on a page', function() {

        let elements = driver.findElements(By.css('input[data-plugin="weakpasswordindicator"]'))
            .then(elements => {
                assert(elements.length === 7, '7 widgets should be found, but was ' + elements.length);
            })

    })
    
    
    test.it('Default widget should display meter bar', function() {
        // TODO, this test is to change. We won't check ids values

        driver.findElements(By.css('input[data-plugin="weakpasswordindicator"]'))
            .then(elements => {
                elements[0].getAttribute('id').then(id => {
                    assert(id === 'pv0', 'default widget should has' + id)
                })
            })
        
    });
    
    test.it('Default widget meter should change on input', function() {
        
    })
    
});

