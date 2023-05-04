import fs from 'fs';
import path from 'path';

const contentDirectory = path.join(process.cwd(), 'content');

export function getAllContentFilePaths(): string[] {
    const allContentFiles = getAllFiles(contentDirectory);
    return allContentFiles.map((file) => file.replace(contentDirectory, ''));
}

function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
        if (fs.statSync(dirPath + '/' + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles);
        } else {
            arrayOfFiles.push(path.join(dirPath, '/', file));
        }
    });

    return arrayOfFiles;
}

export function getContentData(filePath: string): { filePath: string; content: string } {
    const fullPath = path.join(contentDirectory, filePath);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    return {
        filePath,
        content: fileContents,
    };
}