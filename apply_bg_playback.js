const fs = require('fs');

let code = fs.readFileSync('app.js', 'utf8');

// 1. Disable Web Audio API routing on mobile
const target1 = `        audioElement = new Audio();
        try {
            audioSourceNode = audioCtx.createMediaElementSource(audioElement);
            audioSourceNode.connect(masterGain);
        } catch (e) {
            console.warn('Web Audio API routing unavailable', e);
            audioSourceNode = null;
        }`;

const replacement1 = `        audioElement = new Audio();
        
        // On mobile devices (iOS/Android), routing audio through AudioContext prevents 
        // reliable background playback when the screen is locked, because the OS suspends the context.
        // We disable the visualizer connection on mobile to allow true background playback.
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

if (code.includes(target1)) {
    code = code.replace(target1, replacement1);
    console.log('Replaced AudioContext mobile check.');
} else {
    console.log('Failed to find AudioContext block.');
}

// 2. Add updateMediaSession function
const mediaSessionCode = `
// ── Media Session API (Background Playback & Lock Screen Controls) ───────────
function updateMediaSession(track) {
    if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: track.title,
            artist: track.artist || 'AMU',
            album: 'AMU BASE MUSIC',
            artwork: [
                { src: 'https://amfmu49-spec.github.io/amu-base/icon-512x512.png', sizes: '512x512', type: 'image/png' }
            ]
        });

        navigator.mediaSession.setActionHandler('play', () => startPlay());
        navigator.mediaSession.setActionHandler('pause', () => stopPlay());
        navigator.mediaSession.setActionHandler('previoustrack', () => playPrevTrack());
        navigator.mediaSession.setActionHandler('nexttrack', () => playNextTrack());
    }
}
`;

if (!code.includes('updateMediaSession')) {
    code += mediaSessionCode;
    console.log('Added Media Session API.');
}

// 3. Call updateMediaSession in selectTrack
const target3 = `function selectTrack(index, autoPlay = true) {
    if (index < 0 || index >= tracks.length) return;
    currentTrackIndex = index;
    const track = tracks[currentTrackIndex];`;

const replacement3 = `function selectTrack(index, autoPlay = true) {
    if (index < 0 || index >= tracks.length) return;
    currentTrackIndex = index;
    const track = tracks[currentTrackIndex];

    if (typeof updateMediaSession === 'function') {
        updateMediaSession(track);
    }`;

if (code.includes(target3)) {
    code = code.replace(target3, replacement3);
    console.log('Added updateMediaSession call to selectTrack.');
} else {
    console.log('Failed to find selectTrack block.');
}

fs.writeFileSync('app.js', code, 'utf8');
console.log('Successfully updated app.js!');
