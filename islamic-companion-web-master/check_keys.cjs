const fs = require('fs');

// Read the file content
const fileContent = fs.readFileSync('src/lib/translations.ts', 'utf8');

// Function to extract keys for a language
function extractKeys(content, lang) {
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
