const fs = require('fs');
const path = require('path');

class ScreenshotUtil {

    static async capture(driver, testName) {

        const screenshot =
            await driver.takeScreenshot();

        const fileName =
            `${Date.now()}-${testName}.png`;

        const filePath = path.join(
            __dirname,
            '..',
            'tests_snapshots',
            fileName
        );

        fs.writeFileSync(
            filePath,
            Buffer.from(screenshot, 'base64')
        );

        console.log(
            `Screenshot saved: ${filePath}`
        );
    }
}

module.exports = ScreenshotUtil;