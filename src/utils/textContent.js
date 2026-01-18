import fs from 'fs';
import path from 'path';

export const loadTextContent = (...segments) => {
    const filePath = path.join(process.cwd(), 'src', ...segments);
    return fs.readFileSync(filePath, 'utf-8');
};

export const splitIntoBlocks = (content) =>
    content
        .split(/\r?\n\s*\r?\n/g)
        .map((block) => block.trim())
        .filter(Boolean);
