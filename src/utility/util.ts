import dotenv from 'dotenv';
import {log} from './logger';
import {Page} from "puppeteer";

dotenv.config();

export const randomWait = (): Promise<void> => {
    const minWaitTime = parseInt(process.env.MIN_WAIT_TIME || '100', 10);
    const maxWaitTime = parseInt(process.env.MAX_WAIT_TIME || '5000', 10);

    if (isNaN(minWaitTime) || isNaN(maxWaitTime)) {
        log('Invalid MIN_WAIT_TIME or MAX_WAIT_TIME in the .env file. Using default values.');
        return Promise.resolve();
    }

    if (minWaitTime >= maxWaitTime) {
        log('MIN_WAIT_TIME should be less than MAX_WAIT_TIME in the .env file. Using default values.');
        return Promise.resolve();
    }

    const waitTime = Math.floor(Math.random() * (maxWaitTime - minWaitTime + 1)) + minWaitTime;

    log(`Generated wait time: ${waitTime} milliseconds`);

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, waitTime);
    });
}

export const waitSeconds = (seconds: number): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, seconds * 1000); // Convert seconds to milliseconds
    });
};

export async function getElementAndType(page: Page, xpath: string, textToType: string): Promise<void> {
    const element = await page.waitForSelector(xpath);

    if (!element) {
        throw new Error(`Element not found for the XPath: ${xpath}`);
    }

    await element.click();
    await randomWait(); // Optionally wait for a random period after clicking

    // Type the text character by character with a delay between each character
    await page.type(xpath, textToType, {delay: 100});

    // Optionally wait for a random period after typing
    await randomWait();
}

export async function getElementAndClick(page: Page, xpath: string): Promise<void> {
    const element = await page.waitForSelector(xpath);

    if (!element) {
        throw new Error(`Element not found for the XPath: ${xpath}`);
    }

    await element.click();
    await randomWait(); // Optionally wait for a random period after clicking
}