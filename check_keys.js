const fs = require('fs');

// Read the file content
const fileContent = fs.readFileSync('src/lib/translations.ts', 'utf8');

// Function to extract keys for a language
function extractKeys(content, lang) {
    const regex = new RegExp(`${lang}:\\s*{([^}]+)}`, 's'); // Simple regex, might need to be more robust if nested, but this structure seems flat-ish or one level
    // Actually the file has nested objects?
    // Let's rely on the structure being `export const translations = { ... }`
    // And then `en: { ... }`

    // A better approach might be to just eval a simplified version of the file or parse it.
    // Since it is TS, we can't just require it.
    // Let's just Regex for all keys inside `en: {` until the matching `}`.

    // Finding the start index of `en: {`
    const startIndex = content.indexOf(`  ${lang}: {`);
    if (startIndex === -1) return [];

    // Finding the matching closing bracket is hard with regex or simple search if there are nested objects.
    // Checking the file content provided earlier, it seems flat key-value pairs mostly, but maybe not.
    // Actually, looking at lines like `fastingDesc`, it's flat.

    // Let's look for the next language key e.g. `  it: {` to find the end, or `};` at the end of file.

    // Heuristic: extract the block.
    let block = "";
    let braceCount = 0;
    let inBlock = false;

    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.trim().startsWith(`${lang}: {`)) {
            inBlock = true;
            braceCount = 1;
            continue;
        }
        if (inBlock) {
            // Count braces
            braceCount += (line.match(/{/g) || []).length;
            braceCount -= (line.match(/}/g) || []).length;

            if (braceCount === 0) {
                break;
            }

            // Extract key
            const match = line.match(/^\s*([a-zA-Z0-9_]+):/);
            if (match) {
                block += match[1] + "\n";
            }
        }
    }
    return block.split('\n').filter(k => k);
}

const enKeys = extractKeys(fileContent, 'en');
const itKeys = extractKeys(fileContent, 'it');

const missingInIt = enKeys.filter(k => !itKeys.includes(k));

console.log('Missing in IT:', missingInIt);
console.log('Total EN keys:', enKeys.length);
console.log('Total IT keys:', itKeys.length);
