require('dotenv').config();
const { remote } = require('webdriverio');
const { expect } = require('chai');
const fs = require('fs');
const { execSync } = require('child_process');
const locators = require('../locators/locators.json');
const testData = require('../test_data/testData.json');
const capabilities = require('../app_capabilities/capabilities.json');
const ScreenshotUtil = require('../utils/ScreenshotUtil');

describe('Calculator Tests', function () {

    this.timeout(60000);

    let driver;

before(async function () {

    console.log('CWD=', process.cwd());
    console.log('HOST=', process.env.APPIUM_HOST);
    console.log('PORT=', process.env.APPIUM_PORT);

    capabilities['appium:udid'] =
        execSync('adb get-serialno').toString().trim();

   driver = await remote({
    protocol: 'http',
    hostname: '127.0.0.1',
    port: 4723,
    path: '/',
    capabilities
});
});

    after(async function () {
        if (driver) {
            await driver.deleteSession();
        }
    });

   afterEach(async function () {

    if (this.currentTest.state === 'failed') {

        console.log(
            `FAILED: ${this.currentTest.err.message}`
        );

        await ScreenshotUtil.capture(
            driver,
            this.currentTest.title
        );
    }
});

describe('Calculator Tests', function () {

    testData.calculatorTests.forEach((calculator) => {

        it(
            `should calculate ${calculator.firstNumber} ${calculator.operation} ${calculator.secondNumber}`,
            async function () {

                this.retries(2);

                const firstNumber = await driver.$(
                    locators.calculator[`number${calculator.firstNumber}`]
                );

                const operation = await driver.$(
                    locators.calculator[calculator.operation]
                );

                const secondNumber = await driver.$(
                    locators.calculator[`number${calculator.secondNumber}`]
                );

                const equals = await driver.$(
                    locators.calculator.equals
                );

                const result = await driver.$(
                    locators.calculator.result
                );

                 await firstNumber.click();
               // await enterNumber(calculator.firstNumber);
                await operation.click();
                await secondNumber.click();
                await equals.click();

                const resultText = await result.getText();

                console.log('Raw result:', resultText);

                const numericResult =
                    resultText.match(/\d+/)?.[0];

                console.log('Actual:', numericResult);
                console.log(
                    'Expected:',
                    calculator.expectedResult
                );

                expect(numericResult).to.equal(
                    calculator.expectedResult
                );

                console.log('TEST PASSED');
            }
        );

    });

});
});