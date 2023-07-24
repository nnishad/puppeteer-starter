import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import {Browser, Page} from "puppeteer";
import dotenv from 'dotenv';


dotenv.config(); // Load environment variables from .env file

// Get the executable path from the environment
const executablePath = process.env.EXECUTABLE_PATH;
if (!executablePath) {
    throw new Error('EXECUTABLE_PATH environment variable not defined.');
}

// Get the user profile path from the environment (mandatory)
const userProfilePath = process.env.USER_PROFILE_PATH;
if (!userProfilePath) {
    throw new Error('USER_PROFILE_PATH environment variable not defined.');
}

// Initialize Puppeteer with Stealth plugin
puppeteer.use(StealthPlugin());

// Singleton pattern to ensure we have only one browser and page instance
let browser: Browser | null = null;
let page: Page | null = null;

async function initPuppeteerInstance(): Promise<void> {
    if (!browser) {
        browser = await puppeteer.launch({
            headless: false, // Change to false if you want to see the browser window
            executablePath, // Set the executable path
            args: ['--no-sandbox', '--disable-setuid-sandbox'], // Add any additional args you need
            userDataDir: userProfilePath, // Set the profile path
        });
    }

    if (!page) {
        const pages = await browser.pages();
        page = pages.length > 0 ? pages[0] : await browser.newPage();
    }
}

export async function getBrowser(): Promise<Browser> {
    if (!browser) {
        await initPuppeteerInstance();
    }
    return browser as Browser;
}

export async function getPage(): Promise<Page> {
    if (!page) {
        await initPuppeteerInstance();
    }
    return page as Page;
}

export async function close(): Promise<void> {
    if (browser) {
        await browser.close();
        browser = null;
        page = null;
    }
}