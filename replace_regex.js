const fs = require('fs');

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

let newTracksStr = 'let tracks = [\n';
mp3Files.forEach((f, i) => {
    newTracksStr += `    {
        id: 'local-${i}',
        title: '${f.replace('.mp3', '')}',
        artist: 'AMU',
        tag: 'Original',
        icon: '🎧',
        cover: '',
        durationStr: '--:--',
        durationSec: 180,
        type: 'audio',
        url: 'audio/${f}',
        desc: ''
    }`;
    if (i < mp3Files.length - 1) newTracksStr += ',\n';
});
newTracksStr += '\n];';

let code = fs.readFileSync('app.js', 'utf8');

const regex = /let tracks = \[([\s\S]*?)\];/;
if (regex.test(code)) {
    code = code.replace(regex, newTracksStr);
    fs.writeFileSync('app.js', code, 'utf8');
    console.log('Successfully updated app.js!');
} else {
    console.log('Regex failed to match.');
}
