import {promises as fs} from 'fs';

export async function readJSON(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading JSON file at ${filePath}:`, error);
        throw error;
    }
}

export async function writeJSON(filePath, data) {
    try {
        const jsonData = JSON.stringify(data, null, 2);
        await fs.writeFile(filePath, jsonData, 'utf8');
    } catch (error) {
        console.error(`Error writing JSON file at ${filePath}:`, error);
        throw error;
    }
}