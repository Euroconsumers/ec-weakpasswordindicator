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



const componentToHex = (c) => {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

const rgbToHex = (r, g, b) => {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}


// TODO: Define constant selectors in another way.
const SELECTOR = {
    CSS_ALL_INDICATORS: 'input[data-plugin="weakpasswordindicator"]', //CSS
    CSS_DEFAULT_INDICATOR: 'input[data-plugin="weakpasswordindicator"]', //CSS
    CSS_SUGGESTION_INDICATOR: 'input[data-plugin="weakpasswordindicator"]', //CSS
    XPATH_SIBLING_METER: './following-sibling::div[@class="weakpasswordindicator__meter"]', //XPATH
    XPATH_SIBLING_SUGGESTION: './following-sibling::div[@class="weakpasswordindicator__suggestions"]', //XPATH
    XPATH_SIBLING_METER_BAR: './following-sibling::div[@class="weakpasswordindicator__meter"]/div[@class="weakpasswordindicator__meter__bg"]/div[@class="weakpasswordindicator__meter__bar"]'
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

    test.it('Should be 7 widgets on a page', function() {
        driver.findElements(By.css(SELECTOR.CSS_ALL_INDICATORS))
            .then(elements => {
                assert(elements.length === 7, '7 widgets should be found, but was ' + elements.length);
            })
    })
    
    
    test.it('Default widget should display meter bar', function() {
        // TODO, this test is to change. We won't check ids values

        driver.findElement(By.css(SELECTOR.CSS_DEFAULT_INDICATOR))
            .then(element => {
                // element.findElement(By.xpath("//*[@id='pv0']/following-sibling::div[@class='weakpasswordindicator__meter']"))
                element.findElement(By.xpath(SELECTOR.XPATH_SIBLING_METER))
                // element.findElement(By.xpath("/following-sibling::div[@class='weakpasswordindicator__meter']"))
                    .then(meter => {
                        console.log('METER FOUND', meter);
                        assert(typeof meter !== 'undefined', 'Meter should not be undefined');
                    });

                // element.findElement(By.css(SELECTOR.INDICATOR_METER)).then(meter => {
                //     assert(typeof meter !== 'undefined', 'Meter should not be undefined');
                // })
            })
        
    });

    // // TODO: Waiting for element change after input text
    test.it('Default widget should display proper colors after input', function() {
        const mockInputs = [{
            password: 'password',
            color_hex: '#E51900',
            color_rgb: 'rgba(229,25,0,1)',
            score: 0,
        }, {
            password: 'level1',
            color_hex: '#F55B00',
            color_rgb: 'rgba(245,91,0,1)',
            score: 1
        }, {
            password: 'ukikuki',
            color_hex: '#E7A700',
            color_rgb: 'rgba(231,167,0,1)',
            score: 2
        }, {
            password: 'ukikuki12',
            color_hex: '#FFE300',
            color_rgb: 'rgba(255,227,0,1)',
            score: 3
        }, {
            password: 'thisisextremelevel',
            color_hex: '#46A32B',
            color_rgb: 'rgba(70,163,43,1)',
            score: 4
        }]
        
        mockInputs.forEach(mockInput => {
            driver.findElement(By.css(SELECTOR.CSS_DEFAULT_INDICATOR)).then(element => {
                element.clear();
                element.sendKeys(mockInput.password).then(() => {
                    return element.findElement(By.xpath(SELECTOR.XPATH_SIBLING_METER_BAR))
                }).then(meterbar => {
                    // Sleeper waiting for css animation end
                    return new Promise((resolve, rej) => {
                        setTimeout(() => {
                            return resolve(meterbar)
                        }, 1000)
                    })
                }).then(meterbar => {
                    return meterbar.getCssValue('background-color')
                }).then(bgcolor => {
                    assert(bgcolor.replace(/ /g, '') === mockInput.color_rgb, `Background color should be equal ${mockInput.color_rgb}, but found ${bgcolor.replace(' ', '')}`);
                    
                })
            })
        })
        
    })

    test.it('Suggestion widget should have proper id specified', function() {
        driver.findElements(By.css(SELECTOR.CSS_SUGGESTION_INDICATOR)).then(elements => {
            elements[1].getAttribute('id').then(id => {
                assert(id === 'pv1',`id should be "pv1" but was "${id}"`)
            })
        })
    })

    test.it('Suggestion widget should display suggestion after input', function () {
        const inputMocks = [{
            password: 'password',
            suggestion: 'Add another word or two. Uncommon words are better.'
        }, {
            password: 'passwordpassword',
            suggestion: 'Add another word or two. Uncommon words are better. Avoid repeated words and characters'
        }, {
            password: 'Password',
            suggestion: "Add another word or two. Uncommon words are better. Capitalization doesn't help very much"
        }]

        driver.findElements(By.css(SELECTOR.CSS_SUGGESTION_INDICATOR)).then(elements => {
            inputMocks.forEach(inputMock => {
                elements[1].clear();
                elements[1].sendKeys(inputMock.password).then(() => {
                    return elements[1].findElement(By.xpath(SELECTOR.XPATH_SIBLING_SUGGESTION))
                }).then((suggestionElement => {
                    return suggestionElement.getText()
                })).then(value => {
                    assert(value.trim() === inputMock.suggestion, `suggestions should be "${inputMock.suggestion}" but was "${value}"`)
                })
            })
        })
    })
});

