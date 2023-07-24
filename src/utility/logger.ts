import {createLogger, transports, format} from 'winston';
import {join} from 'path';
import * as fs from "fs";

const logsDir = join(__dirname, 'logs'); // Define the logs directory path
const logFilePath = join(logsDir, 'app.log'); // Define the log file path

// Create a Winston logger
const logger = createLogger({
    level: 'info', // Set the logging level (options: error, warn, info, verbose, debug, silly)
    format: format.combine(
        format.timestamp(),
        format.printf(({timestamp, level, message}) => `${timestamp} [${level.toUpperCase()}]: ${message}`)
    ),
    transports: [
        // Add a file transport to log messages to the file
        new transports.File({filename: logFilePath}),

        // Add a console transport to log messages to the console during development
        new transports.Console(),
    ],
});

// Utility function to get the current date and time
export const log = (message: string): void => {
    try {
        // Check if the logs directory exists, and create it if it doesn't
        if (!fs.existsSync(logsDir)) {
            fs.mkdirSync(logsDir, {recursive: true});
        }

        // Log the message using Winston
        logger.info(message);
    } catch (error) {
        console.error('Error writing to log file:', error);
    }
};
