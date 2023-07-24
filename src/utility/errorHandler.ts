import {log} from './logger';

export function handleError(error: any): void {
    if (error instanceof Error) {
        log(`Error occurred: ${error.message}`);
    } else {
        log(`Unknown error occurred: ${error}`);
    }
}