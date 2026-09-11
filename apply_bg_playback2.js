const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

// 1. Mobile check
const regex1 = /audioElement\s*=\s*new\s*Audio\(\);\s*try\s*\{\s*audioSourceNode\s*=\s*audioCtx\.createMediaElementSource\(audioElement\);\s*audioSourceNode\.connect\(masterGain\);\s*\}\s*catch\s*\(e\)\s*\{\s*console\.warn\('Web Audio API routing unavailable',\s*e\);\s*audioSourceNode\s*=\s*null;\s*\}/;

const replace1 = `audioElement = new Audio();
        
        // On mobile devices, routing through AudioContext breaks background playback.
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        
        if (!isMobile) {
            try {
                audioSourceNode = audioCtx.createMediaElementSource(audioElement);
                audioSourceNode.connect(masterGain);
            } catch (e) {
                console.warn('Web Audio API routing unavailable', e);
                audioSourceNode = null;
            }
        }`;

if (regex1.test(code)) {
    code = code.replace(regex1, replace1);
    console.log('Replaced AudioContext mobile check.');
}

// 3. selectTrack
const regex3 = /function\s*selectTrack\s*\(\s*index\s*,\s*autoPlay\s*=\s*true\s*\)\s*\{\s*if\s*\(index\s*<\s*0\s*\|\|\s*index\s*>=\s*tracks\.length\)\s*return;\s*currentTrackIndex\s*=\s*index;\s*const\s*track\s*=\s*tracks\[currentTrackIndex\];/;

const replace3 = `function selectTrack(index, autoPlay = true) {
    if (index < 0 || index >= tracks.length) return;
    currentTrackIndex = index;
    const track = tracks[currentTrackIndex];

    if (typeof updateMediaSession === 'function') {
        updateMediaSession(track);
    }`;

if (regex3.test(code)) {
    code = code.replace(regex3, replace3);
    console.log('Added updateMediaSession call to selectTrack.');
}

fs.writeFileSync('app.js', code, 'utf8');
console.log('Successfully updated app.js!');
