const fs = require('fs');
const pdf = require('pdf-parse');

async function parsePdf(filePath, outPath) {
    let dataBuffer = fs.readFileSync(filePath);
    try {
        const data = await pdf(dataBuffer);
        fs.writeFileSync(outPath, data.text);
        console.log(`Successfully parsed ${filePath} and saved to ${outPath}`);
    } catch (err) {
        console.error(`Error parsing ${filePath}:`, err);
    }
}

parsePdf('profeti_italiano.pdf', 'parsed_profeti.txt');
parsePdf('it-gli-atti-di-sunnah-e-le-invocazioni-quotidiane-del-profeta.pdf', 'parsed_sunnah.txt');
