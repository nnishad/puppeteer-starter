// otherModule.ts

import { getBrowser, getPage, close } from './core/puppeteerInstance';

async function doAutomation() {
    const browser = await getBrowser();
    const page = await getPage();

    // Use the browser and page instances to perform your automation tasks
    await page.goto('https://www.doordash.com');
    // ... Your automation code ...
}

// Call the function
doAutomation()
