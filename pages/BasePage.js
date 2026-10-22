class BasePage {
    constructor(driver) {
        this.driver = driver;
    }

    async click(locator) {

        const element =
            await this.driver.$(locator);

        await element.waitForDisplayed({
            timeout: 10000
        });

        await element.click();
    }
        
    
    async click(locator) {
        await (await this.driver.$(locator)).click();
    }

    async getText(locator) {
        return await (
            await this.driver.$(locator)
        ).getText();
    }

    async waitForElement(locator, timeout = 10000) {
        const element =
            await this.driver.$(locator);

        await element.waitForDisplayed({
            timeout
        });

        return element;
    }
}

module.exports = BasePage;