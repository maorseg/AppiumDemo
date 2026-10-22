const BasePage = require('./BasePage');
const locators = require('../locators/locators.json');
const ResultParser = require('../utils/ResultParser.js_');

class CalculatorPage extends BasePage {

    async tapNumber(number) {
        await this.click(
            locators.calculator[
                `number${number}`
            ]
        );
    }

    async tapOperation(operation) {
        await this.click(
            locators.calculator[operation]
        );
    }

    async tapEquals() {
        await this.click(
            locators.calculator.equals
        );
    }

    async calculate(
        firstNumber,
        operation,
        secondNumber
    ) {
        await this.tapNumber(firstNumber);

        await this.tapOperation(operation);

        await this.tapNumber(secondNumber);

        await this.tapEquals();
    }

    async getResult() {
        const resultText =
            await this.getText(
                locators.calculator.result
            );

        return ResultParser.extractNumber(
            resultText
        );
    }
}

module.exports = CalculatorPage;