const fs = require('fs');
const https = require('https');
const path = require('path');

const appJsPath = path.join(__dirname, 'app.js');
let appJsContent = fs.readFileSync(appJsPath, 'utf8');

const urlRegex = /url:\s*'([^']+cdn1\.suno\.ai[^']+)'/g;
let match;
let downloads = [];

const audioDir = path.join(__dirname, 'audio');
if (!fs.existsSync(audioDir)) fs.mkdirSync(audioDir);

let count = 1;
while ((match = urlRegex.exec(appJsContent)) !== null) {
    const origUrl = match[1];
    const uuidMatch = origUrl.match(/\/([a-f0-9-]+)\.mp4/);
    if (uuidMatch) {
        const uuid = uuidMatch[1];
        const localPath = `audio/suno-${uuid}.mp4`;
        downloads.push({ url: origUrl, local: path.join(__dirname, localPath) });
        appJsContent = appJsContent.replace(origUrl, localPath);
    }
}

fs.writeFileSync(appJsPath, appJsContent);
console.log('Updated app.js, starting downloads...', downloads.length);

async function downloadAll() {
    for (const dl of downloads) {
        console.log('Downloading ' + dl.url);
        await new Promise((resolve, reject) => {
            const file = fs.createWriteStream(dl.local);
            https.get(dl.url, (response) => {
                response.pipe(file);
                file.on('finish', () => {
                    file.close();
                    resolve();
                });
            }).on('error', (err) => {
                fs.unlink(dl.local, () => {});
                reject(err);
            });
        });
    }
    console.log('All downloads complete');
}
downloadAll();
