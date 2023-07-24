# Puppeteer Automation

This project demonstrates how to use Puppeteer to perform browser automation tasks using TypeScript. It sets up a reusable browser and page instance with options to specify the executable path and user profile path from environment variables.

## Installation

1. Clone this repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Install the required dependencies:

```bash
npm install
```

## Usage

1. Create a `.env` file in the project root directory and set the following environment variables:


Replace `/path/to/your/chrome_or_chromium_binary` with the actual path to your Chrome or Chromium binary, and `/path/to/your/custom_profile_directory` with the path to your custom profile directory (optional).

2. In your TypeScript files, import the Puppeteer functions as needed:

```typescript
import { getBrowser, getPage, close } from './puppeteerInstance';

async function doAutomation() {
  const browser = await getBrowser();
  const page = await getPage();

  // Use the browser and page instances to perform your automation tasks
  await page.goto('https://www.example.com');
  // ... Your automation code ...

  // Close the browser when done
  await close();
}

// Call the function
doAutomation();
```

## Run your TypeScript code:
```bash
npm run build       # Compiles the TypeScript code to JavaScript
npm start           # Runs the compiled JavaScript code
```

Configuration
In the puppeteerInstance.ts module, you can customize the following options:

executablePath: Set the path to your Chrome/Chromium binary. Defaults to /path/to/your/chrome_or_chromium_binary if not defined in the .env file.
userProfilePath: Set the path to your custom profile directory. Defaults to /path/to/your/custom_profile_directory if not defined in the .env file.
You can also adjust other Puppeteer options as needed by modifying the puppeteer.launch() function in initPuppeteerInstance().
