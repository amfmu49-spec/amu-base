const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

const mp3Files = [
    'Air....mp3',
    'Crown of Sand.mp3',
    'Digital Overdose.mp3',
    'HELLO TURTLE.mp3',
    'Shoes.mp3',
    '神様なんていない.mp3',
    '綺麗な窒息.mp3',
    '蜘蛛の糸.mp3',
    '雨ニモマケズ.mp3'
];

const newTracks = mp3Files.map((file, i) => {
    return `    {
        id: 'local-song-${i+1}',
        title: '${file.replace('.mp3', '')}',
        artist: 'AMU',
        tag: 'Original',
        icon: '🎧',
        durationStr: '--:--',
        durationSec: 180,
        type: 'audio',
        url: 'audio/${file}',
        desc: ''
    }`;
}).join(',\n');

const startStr = 'let tracks = [';
const startIdx = code.indexOf(startStr);
if (startIdx !== -1) {
    let endIdx = -1;
    let bracketCount = 0;
    for (let i = startIdx + startStr.length - 1; i < code.length; i++) {
        if (code[i] === '[') bracketCount++;
        else if (code[i] === ']') {
            bracketCount--;
            if (bracketCount === 0) {
                endIdx = i;
                break;
            }
        }
    }
    
    if (endIdx !== -1) {
        const newCode = code.substring(0, startIdx + startStr.length) + '\n' + newTracks + '\n' + code.substring(endIdx);
        fs.writeFileSync('app.js', newCode);
        console.log('Successfully updated app.js with local MP3s!');
    } else {
        console.log('Could not find end of tracks array');
    }
} else {
    console.log('Could not find let tracks = [');
}
