/* ==========================================================================
   AMU BASE — app.js
   ========================================================================== */

// ── App Catalog ──────────────────────────────────────────────────────────────
const apps = [
    {
        id: 'amu-freethrow',
        title: 'AMU FREE THROW',
        tag: 'game',
        icon: '🏀',
        desc: '直感操作の3Dバスケットボール・フリースローゲーム。タイミングを合わせてスコア更新を目指せ。',
        tech: ['Canvas', 'Physics', 'Web Audio'],
        link: '../amu-freethrow/index.html'
    },
    {
        id: 'amulish',
        title: 'AMULISH',
        tag: 'game',
        icon: '🔤',
        desc: 'ゲーム感覚で英単語や英語フレーズを楽しく学ぶインタラクティブ英会話ラーニングアプリ。',
        tech: ['JavaScript', 'Speech Synthesis'],
        link: '../amulish/index.html'
    },
    {
        id: 'amu-tune',
        title: 'AMU-TUNE',
        tag: 'music',
        icon: '🎧',
        desc: 'ビートに合わせてノーツをタップ！音楽とシンクロしてハイスコアを狙うリズムゲーム。',
        tech: ['Web Audio API', 'Canvas', 'Rhythm Engine'],
        link: '../amu-tune-rhythm-game/index.html'
    },
    {
        id: 'pixel-face',
        title: 'PIXEL FACE',
        tag: 'tool',
        icon: '👾',
        desc: 'マイク音声に反応してドット絵の表情が変化する、インタラクティブ音波リップシンクアバター。',
        tech: ['Web Audio API', 'Pixel Art', 'Visualizer'],
        link: '../pixel-face-app/index.html'
    },
    {
        id: 'amu-kara',
        title: 'AMU-KARA',
        tag: 'music',
        icon: '🎤',
        desc: '自作楽曲に合わせて歌詞がアニメーション同期表示されるWebカラオケプレイヤー。',
        tech: ['LRC Parser', 'Web Audio', 'Animation'],
        link: '../amu-kara/index.html'
    },
    {
        id: 'amuris',
        title: 'AMURIS',
        tag: 'game',
        icon: '🧩',
        desc: 'パズルブロックを組み合わせて消去していく疾走感のある落ち物パズルゲーム。',
        tech: ['Canvas 2D', 'Game Loop', 'SFX'],
        link: '../amuris/index.html'
    },
    {
        id: 'amuvi-pro',
        title: 'AMUVI PRO',
        tag: 'tool',
        icon: '🎬',
        desc: 'ショート動画やSNS用プロモーション動画を手軽に生成・編集できる動画制作ツール。',
        tech: ['MediaRecorder', 'WebRTC', 'Canvas Export'],
        link: '../amuvi-pro/index.html'
    },
    {
        id: 'virtual-darts',
        title: 'VIRTUAL DARTS',
        tag: 'game',
        icon: '🎯',
        desc: 'タップとフリックで矢を放ち、カウントアップや01ゲームを楽しめる仮想ダーツゲーム。',
        tech: ['3D Engine', 'Touch Events', 'Physics'],
        link: '../ipad-virtual-darts/index.html'
    }
];

// ── Nebula Canvas Background ─────────────────────────────────────────────────
function initNebula() {
    const canvas = document.getElementById('nebula-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    window.addEventListener('resize', () => {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
    });

    // Nebula clouds — soft AI color palette on white
    const clouds = [
        { x: W * 0.6, y: H * 0.25, r: 500, h1: 260, h2: 240, a: 0.10 },
        { x: W * 0.25, y: H * 0.7,  r: 400, h1: 210, h2: 190, a: 0.08 },
        { x: W * 0.85, y: H * 0.65, r: 300, h1: 285, h2: 260, a: 0.07 }
    ];

    // Soft light particles
    const stars = Array.from({ length: 80 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 2 + 0.5,
        a: Math.random() * 0.25 + 0.05,
        speed: Math.random() * 0.003 + 0.001
    }));

    let t = 0;

    function draw() {
        ctx.clearRect(0, 0, W, H);

        // White base
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, W, H);

        // Soft AI gradient blobs
        clouds.forEach(c => {
            const grad = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.r);
            grad.addColorStop(0,   `hsla(${c.h1}, 85%, 72%, ${c.a})`);
            grad.addColorStop(0.5, `hsla(${c.h2}, 75%, 80%, ${c.a * 0.5})`);
            grad.addColorStop(1,   'transparent');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
            ctx.fill();
        });

        // Subtle floating soft dots
        stars.forEach(s => {
            const tw = 0.5 + 0.5 * Math.sin(t * s.speed * 100 + s.x);
            ctx.globalAlpha = s.a * tw;
            ctx.fillStyle = '#7c3aed';
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fill();
        });

        ctx.globalAlpha = 1;
        t++;
        requestAnimationFrame(draw);
    }

    draw();
}

// ── Nav scroll effect ─────────────────────────────────────────────────────────
function initNav() {
    const nav = document.getElementById('main-nav');
    let scrolled = false;
    window.addEventListener('scroll', () => {
        const now = window.scrollY > 40;
        if (now !== scrolled) {
            scrolled = now;
            nav.classList.toggle('scrolled', scrolled);
        }
    }, { passive: true });
}

// ── Media Tabs ────────────────────────────────────────────────────────────────
function initMediaTabs() {
    document.querySelectorAll('.media-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const key = tab.dataset.media;

            document.querySelectorAll('.media-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.media-panel').forEach(p => p.classList.remove('active'));

            tab.classList.add('active');
            const panel = document.getElementById(`media-panel-${key}`);
            if (panel) panel.classList.add('active');
        });
    });
}

// YouTube
function loadYT(id, btn) {
    document.getElementById('yt-iframe').src = `https://www.youtube.com/embed/${id}?autoplay=1`;
    if (btn) {
        document.querySelectorAll('.preset-item').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }
}

function applyYT() {
    let val = document.getElementById('yt-url-input').value.trim();
    if (!val) return;
    if (val.includes('v=')) val = val.split('v=')[1].split('&')[0];
    else if (val.includes('youtu.be/')) val = val.split('youtu.be/')[1].split('?')[0];
    loadYT(val, null);
    document.getElementById('yt-url-input').value = '';
}

// TikTok Click-to-Play Activation
function activateTikTok(card) {
    if (!card || card.classList.contains('loaded')) return;
    card.classList.add('loaded');

    const videoId = card.dataset.videoId;
    const citeUrl = card.dataset.cite;

    card.innerHTML = `
        <blockquote class="tiktok-embed" cite="${citeUrl}" data-video-id="${videoId}" style="max-width: 325px; min-width: 325px; width: 325px; margin: 0 auto;">
            <section><a target="_blank" href="${citeUrl}">動画を読み込み中...</a></section>
        </blockquote>
    `;

    const existingScript = document.getElementById('tiktok-embed-script');
    if (existingScript) {
        existingScript.remove();
    }
    const script = document.createElement('script');
    script.id = 'tiktok-embed-script';
    script.src = 'https://www.tiktok.com/embed.js';
    script.async = true;
    document.body.appendChild(script);
}

function applyTT() {
    let val = document.getElementById('tt-url-input').value.trim();
    if (!val) return;
    let src = val.startsWith('http') ? val : `https://www.tiktok.com/embed/v2/${val}`;
    document.getElementById('tt-iframe').src = src;
    document.getElementById('tt-url-input').value = '';
}

// Spotify
function loadSP(path, btn) {
    document.getElementById('sp-iframe').src =
        `https://open.spotify.com/embed/${path}?utm_source=generator&theme=0`;
    if (btn) {
        document.querySelectorAll('.sp-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }
}

function applySP() {
    let val = document.getElementById('sp-url-input').value.trim();
    if (!val) return;
    if (val.includes('open.spotify.com/')) val = val.split('open.spotify.com/')[1].split('?')[0];
    loadSP(val, null);
    document.getElementById('sp-url-input').value = '';
}

// ── Floating Spotify Player ───────────────────────────────────────────────────
function initSpotifyPlayer() {
    const player = document.getElementById('spotify-player');
    const toggleBtn = document.getElementById('spotify-toggle');
    const closeBtn = document.getElementById('spotify-close');
    const openSpotifyProfileBtn = document.getElementById('open-spotify-btn');

    toggleBtn.addEventListener('click', () => {
        player.classList.toggle('open');
    });

    closeBtn.addEventListener('click', () => {
        player.classList.remove('open');
    });

    if (openSpotifyProfileBtn) {
        openSpotifyProfileBtn.addEventListener('click', (e) => {
            e.preventDefault();
            player.classList.add('open');
            setTimeout(() => {
                player.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }, 100);
        });
    }
}

// ── App Grid ──────────────────────────────────────────────────────────────────
function renderApps(list) {
    const grid = document.getElementById('app-grid');
    if (!grid) return;

    if (list.length === 0) {
        grid.innerHTML = `<p style="color:var(--muted);grid-column:1/-1;text-align:center;padding:40px 0;">No apps found.</p>`;
        return;
    }

    grid.innerHTML = list.map(a => `
        <article class="app-card reveal" onclick="openModal('${a.id}')">
            <div class="app-card-thumb">
                <span>${a.icon}</span>
                <span class="app-card-type">${a.tag.toUpperCase()}</span>
            </div>
            <div class="app-card-body">
                <h3>${a.title}</h3>
                <p>${a.desc}</p>
                <div class="app-card-footer">
                    <div class="app-card-tech">
                        ${a.tech.slice(0, 2).map(t => `<span class="tech-chip">${t}</span>`).join('')}
                    </div>
                    <span class="app-card-arrow">↗</span>
                </div>
            </div>
        </article>
    `).join('');

    // Trigger reveal for newly rendered cards
    requestAnimationFrame(() => observeReveal());
}

function initAppFilters() {
    let currentTag = 'all';

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentTag = btn.dataset.tag;
            const filtered = currentTag === 'all' ? apps : apps.filter(a => a.tag === currentTag);
            renderApps(filtered);
        });
    });
}

// ── Modal ─────────────────────────────────────────────────────────────────────
function initModal() {
    const overlay = document.getElementById('app-modal');
    document.getElementById('modal-close').addEventListener('click', closeModal);
    overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}

function openModal(id) {
    const app = apps.find(a => a.id === id);
    if (!app) return;

    document.getElementById('modal-icon').textContent = app.icon;
    document.getElementById('modal-tag').textContent = app.tag.toUpperCase();
    document.getElementById('modal-title').textContent = app.title;
    document.getElementById('modal-desc').textContent = app.desc;
    document.getElementById('modal-stack').innerHTML = app.tech.map(t => `<span class="tech-chip">${t}</span>`).join('');
    document.getElementById('modal-link').href = app.link;

    document.getElementById('app-modal').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('app-modal').classList.remove('open');
    document.body.style.overflow = '';
}

// ── Scroll Reveal ─────────────────────────────────────────────────────────────
function observeReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((e, i) => {
            if (e.isIntersecting) {
                setTimeout(() => e.target.classList.add('visible'), i * 60);
                observer.unobserve(e.target);
            }
        });
    }, { threshold: 0.08 });

    document.querySelectorAll('.reveal:not(.visible)').forEach(el => observer.observe(el));
}

/* ==========================================================================
   AMU BASE — CUSTOM MUSIC STATION & AUDIO VISUALIZER
   ========================================================================== */

// ── Track Catalog ─────────────────────────────────────────────────────────────
let tracks = [
    {
        id: 'local-0',
        title: 'Air...',
        artist: 'AMU',
        tag: 'Original',
        icon: '🎧',
        cover: '',
        durationStr: '--:--',
        durationSec: 180,
        type: 'audio',
        url: 'audio/Air....mp3',
        desc: ''
    },
    {
        id: 'local-1',
        title: 'Crown of Sand',
        artist: 'AMU',
        tag: 'Original',
        icon: '🎧',
        cover: '',
        durationStr: '--:--',
        durationSec: 180,
        type: 'audio',
        url: 'audio/Crown of Sand.mp3',
        desc: ''
    },
    {
        id: 'local-2',
        title: 'Digital Overdose',
        artist: 'AMU',
        tag: 'Original',
        icon: '🎧',
        cover: '',
        durationStr: '--:--',
        durationSec: 180,
        type: 'audio',
        url: 'audio/Digital Overdose.mp3',
        desc: ''
    },
    {
        id: 'local-3',
        title: 'HELLO TURTLE',
        artist: 'AMU',
        tag: 'Original',
        icon: '🎧',
        cover: '',
        durationStr: '--:--',
        durationSec: 180,
        type: 'audio',
        url: 'audio/HELLO TURTLE.mp3',
        desc: ''
    },
    {
        id: 'local-4',
        title: 'Shoes',
        artist: 'AMU',
        tag: 'Original',
        icon: '🎧',
        cover: '',
        durationStr: '--:--',
        durationSec: 180,
        type: 'audio',
        url: 'audio/Shoes.mp3',
        desc: ''
    },
    {
        id: 'local-5',
        title: '神様なんていない',
        artist: 'AMU',
        tag: 'Original',
        icon: '🎧',
        cover: '',
        durationStr: '--:--',
        durationSec: 180,
        type: 'audio',
        url: 'audio/神様なんていない.mp3',
        desc: ''
    },
    {
        id: 'local-6',
        title: '綺麗な窒息',
        artist: 'AMU',
        tag: 'Original',
        icon: '🎧',
        cover: '',
        durationStr: '--:--',
        durationSec: 180,
        type: 'audio',
        url: 'audio/綺麗な窒息.mp3',
        desc: ''
    },
    {
        id: 'local-7',
        title: '蜘蛛の糸',
        artist: 'AMU',
        tag: 'Original',
        icon: '🎧',
        cover: '',
        durationStr: '--:--',
        durationSec: 180,
        type: 'audio',
        url: 'audio/蜘蛛の糸.mp3',
        desc: ''
    },
    {
        id: 'local-8',
        title: '雨ニモマケズ',
        artist: 'AMU',
        tag: 'Original',
        icon: '🎧',
        cover: '',
        durationStr: '--:--',
        durationSec: 180,
        type: 'audio',
        url: 'audio/雨ニモマケズ.mp3',
        desc: ''
    },
    {
        id: 'local-9',
        title: 'Sweet Venom',
        artist: 'AMU',
        tag: 'Original',
        icon: '🎧',
        cover: '',
        durationStr: '--:--',
        durationSec: 180,
        type: 'audio',
        url: 'audio/Sweet Venom.mp3',
        desc: ''
    }
];

// ── Suno Playlist Dynamic Fetcher ─────────────────────────────────────────────
const SUNO_KNOWN_SHORT_LINKS = {
    'QYT4yQwzCISNd78M': 'f96c534f-a8eb-49e4-938f-54bd05717630'
};

async function applySunoPlaylist(isSilent = false) {
    const input = document.getElementById('suno-playlist-input');
    const syncBtn = document.getElementById('suno-sync-btn');
    if (!input) return;

    const urlOrId = input.value.trim();
    if (!urlOrId) return;

    if (!isSilent && syncBtn) {
        syncBtn.textContent = '読込中...';
        syncBtn.style.opacity = '0.7';
    }

    try {
        let playlistId = urlOrId;
        const shortMatch = urlOrId.match(/suno\.com\/s\/([a-zA-Z0-9_-]+)/);
        if (shortMatch) {
            const shortCode = shortMatch[1];
            if (SUNO_KNOWN_SHORT_LINKS[shortCode]) {
                playlistId = SUNO_KNOWN_SHORT_LINKS[shortCode];
            }
        }
        const match = playlistId.match(/playlist\/([a-zA-Z0-9-]+)/);
        if (match) {
            playlistId = match[1];
        }

        const apiUrl = `https://studio-api.prod.suno.com/api/playlist/${playlistId}/?page=1`;
        const res = await fetch(apiUrl, {
            headers: {
                'Referer': 'https://suno.com/'
            }
        });

        if (res.ok) {
            const data = await res.json();
            let clips = [];
            if (data && data.playlist_clips) {
                clips = data.playlist_clips.map(c => c.clip);
            } else if (Array.isArray(data)) {
                clips = data;
            }

            if (clips.length > 0) {
                // Save to localStorage for automatic reload next time
                try {
                    localStorage.setItem('amu_suno_playlist', urlOrId);
                } catch (_) {}

                // Chrome <audio> does not support m4a-opus, but reliably plays Suno's mp4 (AAC audio track)
                const newTracks = clips.map((c, i) => {
                    let audioUrl = '';
                    let fallbackUrl = '';

                    if (c.video_url) {
                        audioUrl = c.video_url;
                    } else if (c.id) {
                        audioUrl = `https://cdn1.suno.ai/${c.id}.mp4`;
                    }

                    if (c.media_urls && c.media_urls.length > 0) {
                        fallbackUrl = c.media_urls[0].url;
                    } else if (c.id) {
                        fallbackUrl = `https://d2lwuy8qc234o3.cloudfront.net/1/clip/${c.id}.m4a`;
                    }

                    if (!audioUrl) audioUrl = fallbackUrl;

                    const durationSec = (c.metadata && c.metadata.duration) ? Math.round(c.metadata.duration) : 210;
                    const m = Math.floor(durationSec / 60);
                    const s = Math.floor(durationSec % 60);

                    return {
                        id: 'suno-' + c.id,
                        title: c.title || 'Untitled',
                        artist: c.display_name || 'AiMu',
                        tag: (c.metadata && c.metadata.tags) ? c.metadata.tags.split(',')[0].slice(0, 16) : 'Suno AI',
                        icon: '🥀',
                        cover: c.image_large_url || c.image_url || 'assets/twilight_horizon.png',
                        durationStr: `${m}:${s.toString().padStart(2, '0')}`,
                        durationSec: durationSec,
                        type: 'audio',
                        url: audioUrl,
                        fallbackUrl: fallbackUrl,
                        desc: (c.metadata && c.metadata.prompt) ? c.metadata.prompt : ''
                    };
                });

                tracks = newTracks;
                renderTrackList();
                fetchTrackLikesFromCloud();

                // If not playing, refresh current track info to first item
                if (!isPlaying) {
                    selectTrack(0, false);
                }

                if (!isSilent && syncBtn) {
                    syncBtn.textContent = '完了✓';
                    setTimeout(() => { if (syncBtn) { syncBtn.textContent = '連携'; syncBtn.style.opacity = '1'; } }, 2000);
                }
                return;
            }
        }
    } catch (e) {
        console.warn('Suno fetch error:', e);
    }

    if (!isSilent && syncBtn) {
        syncBtn.textContent = '完了';
        setTimeout(() => { if (syncBtn) { syncBtn.textContent = '連携'; syncBtn.style.opacity = '1'; } }, 1500);
    }
}

let currentTrackIndex = 0;
let isPlaying = false;
let isShuffle = false;
let repeatMode = 0; // 0: none, 1: all, 2: one
let audioVolume = 0.8;
let isMuted = false;
let trackCurrentSeconds = 0;
let progressTimer = null;

// Web Audio API State
let audioCtx = null;
let analyser = null;
let masterGain = null;
let audioElement = null;
let audioSourceNode = null;
let synthTimer = null;
let synthStep = 0;
let isVisualizerRunning = false;

function initAudioContext() {
    if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContextClass();

        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 128;
        analyser.smoothingTimeConstant = 0.82;

        masterGain = audioCtx.createGain();
        masterGain.gain.value = audioVolume;

        masterGain.connect(analyser);
        analyser.connect(audioCtx.destination);

        audioElement = new Audio();
        
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
        }

        audioElement.addEventListener('timeupdate', () => {
            if (isPlaying && tracks[currentTrackIndex].type === 'audio') {
                trackCurrentSeconds = audioElement.currentTime;
                updateProgressBar();
            }
        });

        audioElement.addEventListener('ended', () => {
            handleTrackEnd();
        });

        initVisualizer();
    }

    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}



// ── Synthesizer Music Generation Engine ──────────────────────────────────────
function playSynthStep() {
    if (!isPlaying || !audioCtx) return;

    const track = tracks[currentTrackIndex];
    if (track.type !== 'synth') return;

    const now = audioCtx.currentTime;
    synthStep++;

    if (track.style === 'synthwave') {
        // Melodic arpeggios in Twilight Horizon chord progression
        const chords = [
            [261.63, 329.63, 392.00, 493.88], // Cmaj7
            [220.00, 261.63, 329.63, 392.00], // Am7
            [174.61, 220.00, 261.63, 329.63], // Fmaj7
            [196.00, 246.94, 293.66, 349.23]  // G7
        ];
        const chordIdx = Math.floor((synthStep / 16) % chords.length);
        const notes = chords[chordIdx];
        const note = notes[synthStep % notes.length];

        // Lead / Arp
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(note * 2, now);

        gain.gain.setValueAtTime(0.09, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(now);
        osc.stop(now + 0.22);

        // Soft sub-bass
        if (synthStep % 2 === 0) {
            const bassOsc = audioCtx.createOscillator();
            const bassGain = audioCtx.createGain();
            bassOsc.type = 'triangle';
            bassOsc.frequency.setValueAtTime(notes[0] / 2, now);
            bassGain.gain.setValueAtTime(0.14, now);
            bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
            bassOsc.connect(bassGain);
            bassGain.connect(masterGain);
            bassOsc.start(now);
            bassOsc.stop(now + 0.3);
        }

        // Ambient beat pulse
        if (synthStep % 4 === 0) {
            const kickOsc = audioCtx.createOscillator();
            const kickGain = audioCtx.createGain();
            kickOsc.frequency.setValueAtTime(110, now);
            kickOsc.frequency.exponentialRampToValueAtTime(32, now + 0.14);
            kickGain.gain.setValueAtTime(0.24, now);
            kickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
            kickOsc.connect(kickGain);
            kickGain.connect(masterGain);
            kickOsc.start(now);
            kickOsc.stop(now + 0.15);
        }
    } else if (track.style === 'lofi') {
        if (synthStep % 4 === 0) {
            const chords = [
                [261.63, 311.13, 392, 466.16],
                [220, 261.63, 329.63, 392],
                [174.61, 220, 261.63, 329.63]
            ];
            const chord = chords[Math.floor((synthStep / 8) % chords.length)];
            chord.forEach((freq, idx) => {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, now);
                gain.gain.setValueAtTime(0.05, now + idx * 0.02);
                gain.gain.exponentialRampToValueAtTime(0.0005, now + 0.7);
                osc.connect(gain);
                gain.connect(masterGain);
                osc.start(now);
                osc.stop(now + 0.8);
            });
        }
    } else {
        const arpNotes = [440, 523.25, 659.25, 783.99, 880, 783.99];
        const note = arpNotes[synthStep % arpNotes.length];
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(note, now);
        gain.gain.setValueAtTime(0.07, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(now);
        osc.stop(now + 0.14);
    }
}

// ── Crystal Aurora Visualizer Canvas Loop ───────────────────────────────────
function initVisualizer() {
    if (isVisualizerRunning) return;
    isVisualizerRunning = true;

    const canvas = document.getElementById('music-visualizer');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * window.devicePixelRatio || 600;
        canvas.height = rect.height * window.devicePixelRatio || 280;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const bufferLength = analyser ? analyser.frequencyBinCount : 64;
    const dataArray = new Uint8Array(bufferLength);

    function draw() {
        requestAnimationFrame(draw);
        if (!ctx) return;

        if (analyser) {
            analyser.getByteFrequencyData(dataArray);
        }

        const w = canvas.width;
        const h = canvas.height;

        // Clear for glass transparency
        ctx.clearRect(0, 0, w, h);

        // Ambient fluid aurora wave at bottom
        const barCount = 32;
        const barWidth = (w / barCount) * 0.65;
        const gap = (w / barCount) * 0.35;

        for (let i = 0; i < barCount; i++) {
            const binIdx = Math.floor((i / barCount) * (bufferLength * 0.7));
            let val = dataArray[binIdx] || 0;

            if (!isPlaying) {
                val = Math.sin(Date.now() * 0.002 + i * 0.25) * 10 + 14;
            }

            const barHeight = Math.max(6, (val / 255) * (h * 0.55));
            const x = i * (barWidth + gap) + gap / 2;
            const y = h - barHeight;

            // Prism gradient: pink (#f472b6) -> purple (#c084fc) -> blue (#60a5fa) -> cyan (#38bdf8)
            const grad = ctx.createLinearGradient(0, h, 0, y);
            grad.addColorStop(0, 'rgba(255, 255, 255, 0.05)');
            grad.addColorStop(0.4, 'rgba(192, 132, 252, 0.3)');
            grad.addColorStop(0.8, 'rgba(96, 165, 250, 0.5)');
            grad.addColorStop(1, 'rgba(255, 255, 255, 0.85)');

            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.roundRect(x, y, barWidth, barHeight, [4, 4, 0, 0]);
            ctx.fill();

            // Glass glint cap
            if (barHeight > 12) {
                ctx.fillStyle = '#ffffff';
                ctx.shadowColor = '#60a5fa';
                ctx.shadowBlur = 6;
                ctx.fillRect(x, y, barWidth, 2);
                ctx.shadowBlur = 0;
            }
        }

        // Flowing smooth wave ribbon
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 2.5;
        for (let i = 0; i < barCount; i++) {
            const binIdx = Math.floor((i / barCount) * (bufferLength * 0.7));
            let val = dataArray[binIdx] || 0;
            if (!isPlaying) val = Math.sin(Date.now() * 0.002 + i * 0.25) * 10 + 14;
            const barHeight = (val / 255) * (h * 0.55);
            const x = i * (barWidth + gap) + barWidth / 2;
            const y = h - barHeight - 4;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();
    }

    draw();
}

function selectTrack(index, autoPlay = true) {
    if (index < 0 || index >= tracks.length) return;
    currentTrackIndex = index;
    const track = tracks[currentTrackIndex];

    if (typeof updateMediaSession === 'function') {
        updateMediaSession(track);
    }

    trackCurrentSeconds = 0;

    // Update Player UI
    const titleEl = document.getElementById('player-title');
    const artistEl = document.getElementById('player-artist');
    const coverEl = document.getElementById('player-cover-img');
    const totalTimeEl = document.getElementById('player-total-time');
    const currTimeEl = document.getElementById('player-current-time');

    if (titleEl) titleEl.textContent = track.title;
    if (artistEl) artistEl.textContent = track.artist || 'AiMu';
    if (coverEl) coverEl.src = track.cover || 'default_cover.jpg';
    if (totalTimeEl) totalTimeEl.textContent = track.durationStr;
    if (currTimeEl) currTimeEl.textContent = '0:00';

    const fill = document.getElementById('seek-bar-fill');
    const thumb = document.getElementById('seek-bar-thumb');
    if (fill) fill.style.width = '0%';
    if (thumb) thumb.style.left = '0%';

    renderTrackList();

    if (autoPlay) {
        startPlay();
    } else {
        stopPlay();
    }
}

function startPlay() {
    initAudioContext();
    const track = tracks[currentTrackIndex];

    isPlaying = true;
    updatePlayPauseIcons();

    const inner = document.querySelector('.crystal-player-inner');
    if (inner) inner.classList.add('playing');

    if (track.type === 'audio') {
        if (synthTimer) { clearInterval(synthTimer); synthTimer = null; }
        if (progressTimer) { clearInterval(progressTimer); progressTimer = null; }
        
        audioElement.volume = isMuted ? 0 : audioVolume;
        audioElement.src = track.url;
        audioElement.load();
        audioElement.play().catch(e => {
            console.warn('Audio playback error:', e);
        });
    } else {
        if (audioElement) audioElement.pause();
        if (synthTimer) clearInterval(synthTimer);
        const intervalMs = track.style === 'chiptune' ? 100 : 150;
        synthTimer = setInterval(playSynthStep, intervalMs);

        if (progressTimer) clearInterval(progressTimer);
        progressTimer = setInterval(() => {
            if (isPlaying && tracks[currentTrackIndex].type === 'synth') {
                trackCurrentSeconds += 0.25;
                if (trackCurrentSeconds >= track.durationSec) {
                    handleTrackEnd();
                } else {
                    updateProgressBar();
                }
            }
        }, 250);
    }

    renderTrackList();
}


function stopPlay() {
    isPlaying = false;
    updatePlayPauseIcons();

    const inner = document.querySelector('.crystal-player-inner');
    if (inner) inner.classList.remove('playing');

    if (audioElement) { try { audioElement.pause(); } catch(_){} }
    if (synthTimer) { clearInterval(synthTimer); synthTimer = null; }
    if (progressTimer) { clearInterval(progressTimer); progressTimer = null; }

    renderTrackList();
}

function stopTrack() {
    stopPlay();
    trackCurrentSeconds = 0;
    if (tracks[currentTrackIndex].type === 'audio' && audioElement) {
        audioElement.currentTime = 0;
    }
    updateProgressBar();
}

function togglePlay() {
    if (isPlaying) {
        stopPlay();
    } else {
        startPlay();
    }
}

function handleTrackEnd() {
    if (repeatMode === 2) {
        // Repeat one
        trackCurrentSeconds = 0;
        startPlay();
    } else if (repeatMode === 1 || currentTrackIndex < tracks.length - 1) {
        playNextTrack();
    } else {
        stopPlay();
        trackCurrentSeconds = 0;
        updateProgressBar();
    }
}

function playNextTrack() {
    if (isShuffle) {
        let nextIdx = Math.floor(Math.random() * tracks.length);
        if (tracks.length > 1 && nextIdx === currentTrackIndex) {
            nextIdx = (nextIdx + 1) % tracks.length;
        }
        selectTrack(nextIdx, true);
    } else {
        const nextIdx = (currentTrackIndex + 1) % tracks.length;
        selectTrack(nextIdx, true);
    }
}

function playPrevTrack() {
    if (trackCurrentSeconds > 3) {
        // If passed 3s, replay current track
        trackCurrentSeconds = 0;
        if (tracks[currentTrackIndex].type === 'audio' && audioElement) {
            audioElement.currentTime = 0;
        }
        updateProgressBar();
        return;
    }
    const prevIdx = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    selectTrack(prevIdx, true);
}

function updatePlayPauseIcons() {
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    if (isPlaying) {
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
    } else {
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
    }
}

function formatSeconds(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
}

function updateProgressBar() {
    const track = tracks[currentTrackIndex];
    const totalSec = track.durationSec || 60;
    const pct = Math.min(100, Math.max(0, (trackCurrentSeconds / totalSec) * 100));

    document.getElementById('seek-bar-fill').style.width = `${pct}%`;
    document.getElementById('seek-bar-thumb').style.left = `${pct}%`;
    document.getElementById('player-current-time').textContent = formatSeconds(trackCurrentSeconds);
}

function seekTo(fraction) {
    const track = tracks[currentTrackIndex];
    const totalSec = track.durationSec || 60;
    trackCurrentSeconds = fraction * totalSec;

    if (track.type === 'audio' && audioElement) {
        audioElement.currentTime = trackCurrentSeconds;
    }

    updateProgressBar();
}

// ── Firebase Configuration ───────────────────────────────────────────────────
const FIREBASE_DB_URL = 'https://amu-base-board-default-rtdb.firebaseio.com';

// ── Track Likes & Sort (Global via Firebase REST API) ────────────────────────
let currentTrackSort = 'newest'; // 'newest' | 'liked'
let globalTrackLikeCounts = {}; // { trackId: number } — fetched from Firebase
let trackLikesPollingInterval = null;

// My own likes stored locally (to prevent double-liking)
function getMyTrackLikes() {
    try {
        const raw = localStorage.getItem('amu_my_track_likes');
        return raw ? JSON.parse(raw) : {};
    } catch (_) { return {}; }
}

function saveMyTrackLikes(obj) {
    try {
        localStorage.setItem('amu_my_track_likes', JSON.stringify(obj));
    } catch (_) {}
}

// Fetch global like counts from Firebase
async function fetchTrackLikesFromCloud() {
    try {
        const res = await fetch(FIREBASE_DB_URL + '/track_likes.json');
        if (res.ok) {
            const data = await res.json();
            if (data && typeof data === 'object') {
                globalTrackLikeCounts = data;
            } else {
                globalTrackLikeCounts = {};
            }
            renderTrackList();
        }
    } catch (e) {
        console.warn('Track likes fetch error:', e);
    }
}

async function toggleTrackLike(e, trackId) {
    e.stopPropagation();

    const myLikes = getMyTrackLikes();
    const alreadyLiked = !!myLikes[trackId];
    const currentCount = globalTrackLikeCounts[trackId] || 0;

    if (alreadyLiked) {
        // Unlike
        delete myLikes[trackId];
        globalTrackLikeCounts[trackId] = Math.max(0, currentCount - 1);
    } else {
        // Like
        myLikes[trackId] = true;
        globalTrackLikeCounts[trackId] = currentCount + 1;
    }

    saveMyTrackLikes(myLikes);
    renderTrackList(); // optimistic update

    // Sync to Firebase
    try {
        await fetch(FIREBASE_DB_URL + '/track_likes/' + encodeURIComponent(trackId) + '.json', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(globalTrackLikeCounts[trackId])
        });
    } catch (err) {
        console.warn('Firebase track like sync error:', err);
    }
}

function setTrackSort(sortType) {
    currentTrackSort = sortType;
    document.querySelectorAll('.track-sort-btn').forEach(b => b.classList.remove('active'));
    const targetBtn = document.getElementById(sortType === 'liked' ? 'tsort-liked' : 'tsort-newest');
    if (targetBtn) targetBtn.classList.add('active');
    renderTrackList();
}

// ── Track List Rendering ─────────────────────────────────────────────────────
function renderTrackList() {
    const listEl = document.getElementById('track-list');
    const countEl = document.getElementById('track-count');
    const counterTracksEl = document.getElementById('counter-tracks');

    if (!listEl) return;
    if (countEl) countEl.textContent = tracks.length;
    if (counterTracksEl) counterTracksEl.textContent = tracks.length;

    const myLikes = getMyTrackLikes();

    // Build sorted index list
    let sortedIndices = tracks.map((_, idx) => idx);
    if (currentTrackSort === 'liked') {
        sortedIndices.sort((a, b) => {
            const countA = globalTrackLikeCounts[tracks[a].id] || 0;
            const countB = globalTrackLikeCounts[tracks[b].id] || 0;
            return countB - countA;
        });
    }

    listEl.innerHTML = sortedIndices.map((idx) => {
        const track = tracks[idx];
        const isActive = idx === currentTrackIndex;
        const isLiked = !!myLikes[track.id];
        const likeCount = globalTrackLikeCounts[track.id] || 0;
        return `
            <div class="track-item ${isActive ? 'active' : ''}" onclick="selectTrack(${idx}, true)">
                <span class="track-item-idx">${(idx + 1).toString().padStart(2, '0')}</span>
                <div class="track-item-playing-icon">
                    <span></span><span></span><span></span>
                </div>
                <div class="track-item-icon">${track.icon || '🎵'}</div>
                <div class="track-item-info">
                    <div class="track-item-title">${track.title}</div>
                    <div class="track-item-sub">
                        <span>${track.artist || 'AMU'}</span>
                        <span class="track-item-tag">${track.tag}</span>
                    </div>
                </div>
                <span class="track-item-duration">${track.durationStr}</span>
                <button type="button" class="track-like-btn ${isLiked ? 'liked' : ''}"
                    onclick="toggleTrackLike(event, '${track.id}')"
                    title="${isLiked ? 'いいね解除' : 'いいね'}">
                    <span class="track-like-icon">${isLiked ? '❤️' : '🤍'}</span>
                    ${likeCount > 0 ? `<span class="track-like-count">${likeCount}</span>` : ''}
                </button>
            </div>
        `;
    }).join('');
}

// ── Drag & Drop Audio Upload / File Input ─────────────────────────────────────
function handleAudioFiles(files) {
    if (!files || files.length === 0) return;

    let firstNewIndex = -1;
    Array.from(files).forEach(file => {
        if (!file.type.startsWith('audio/') && !file.name.match(/\.(mp3|wav|ogg|m4a|aac|flac)$/i)) return;

        const objectUrl = URL.createObjectURL(file);
        const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "");

        const newTrack = {
            id: 'uploaded-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
            title: nameWithoutExt,
            artist: 'AMU (Local)',
            tag: 'Original Audio',
            icon: '🔥',
            durationStr: '--:--',
            durationSec: 180,
            type: 'audio',
            url: objectUrl,
            desc: `ファイル: ${file.name}`
        };

        // Determine actual audio duration
        const tempAudio = new Audio();
        tempAudio.src = objectUrl;
        tempAudio.addEventListener('loadedmetadata', () => {
            if (tempAudio.duration && !isNaN(tempAudio.duration)) {
                newTrack.durationSec = tempAudio.duration;
                newTrack.durationStr = formatSeconds(tempAudio.duration);
                renderTrackList();
                if (tracks[currentTrackIndex].id === newTrack.id) {
                    document.getElementById('player-total-time').textContent = newTrack.durationStr;
                }
            }
        });

        tracks.push(newTrack);
        if (firstNewIndex === -1) {
            firstNewIndex = tracks.length - 1;
        }
    });

    if (firstNewIndex !== -1) {
        renderTrackList();
        selectTrack(firstNewIndex, true);
    }
}

function initMusicStation() {
    // Initial Render
    renderTrackList();
    selectTrack(0, false);

    // Play / Pause
    const playBtn = document.getElementById('play-btn');
    if (playBtn) playBtn.addEventListener('click', togglePlay);

    // Prev / Next / Stop
    const prevBtn = document.getElementById('prev-btn');
    if (prevBtn) prevBtn.addEventListener('click', playPrevTrack);
    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) nextBtn.addEventListener('click', playNextTrack);
    const stopBtn = document.getElementById('stop-btn');
    if (stopBtn) stopBtn.addEventListener('click', stopTrack);

    // Shuffle
    const shuffleBtn = document.getElementById('shuffle-btn');
    if (shuffleBtn) {
        shuffleBtn.addEventListener('click', () => {
            isShuffle = !isShuffle;
            shuffleBtn.classList.toggle('active', isShuffle);
        });
    }

    // Repeat
    const repeatBtn = document.getElementById('repeat-btn');
    if (repeatBtn) {
        repeatBtn.addEventListener('click', () => {
            repeatMode = (repeatMode + 1) % 3; // 0: off, 1: all, 2: one
            repeatBtn.classList.toggle('active', repeatMode > 0);
            repeatBtn.style.color = repeatMode === 2 ? '#34d399' : '';
            repeatBtn.title = repeatMode === 2 ? '1曲リピート' : (repeatMode === 1 ? '全曲リピート' : 'リピートなし');
        });
    }

    // Seek bar drag/click
    const seekWrap = document.getElementById('seek-bar-container');
    if (seekWrap) {
        let isSeeking = false;
        const calcSeek = (e) => {
            const rect = seekWrap.getBoundingClientRect();
            const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
            seekTo(pos);
        };

        seekWrap.addEventListener('mousedown', (e) => {
            isSeeking = true;
            calcSeek(e);
        });
        window.addEventListener('mousemove', (e) => {
            if (isSeeking) calcSeek(e);
        });
        window.addEventListener('mouseup', () => {
            isSeeking = false;
        });
    }

    // Volume Slider
    const volSlider = document.getElementById('vol-slider');
    const volMuteBtn = document.getElementById('vol-mute-btn');
    if (volSlider) {
        volSlider.addEventListener('input', (e) => {
            audioVolume = parseFloat(e.target.value);
            isMuted = false;
            if (masterGain) masterGain.gain.value = audioVolume;
            if (audioElement) audioElement.volume = audioVolume;
        });
    }
    if (volMuteBtn) {
        volMuteBtn.addEventListener('click', () => {
            isMuted = !isMuted;
            if (masterGain) {
                masterGain.gain.value = isMuted ? 0 : audioVolume;
            }
            if (audioElement) audioElement.volume = isMuted ? 0 : audioVolume;
            volSlider.value = isMuted ? 0 : audioVolume;
        });
    }

    // File input change
    const fileInput = document.getElementById('track-file-input');
    if (fileInput) {
        fileInput.addEventListener('change', (e) => {
            handleAudioFiles(e.target.files);
        });
    }

    // Drag & Drop
    const dropzone = document.getElementById('track-dropzone');
    if (dropzone) {
        ['dragenter', 'dragover'].forEach(name => {
            dropzone.addEventListener(name, (e) => {
                e.preventDefault();
                dropzone.classList.add('dragover');
            });
        });

        ['dragleave', 'drop'].forEach(name => {
            dropzone.addEventListener(name, (e) => {
                e.preventDefault();
                dropzone.classList.remove('dragover');
            });
        });

        dropzone.addEventListener('drop', (e) => {
            if (e.dataTransfer && e.dataTransfer.files) {
                handleAudioFiles(e.dataTransfer.files);
            }
        });

        dropzone.addEventListener('click', () => {
            if (fileInput) fileInput.click();
        });
    }

    // Auto-fetch latest Suno playlist on page load
    const sunoInput = document.getElementById('suno-playlist-input');
    if (sunoInput) {
        try {
            const saved = localStorage.getItem('amu_suno_playlist');
            if (saved) sunoInput.value = saved;
        } catch (_) {}

        sunoInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                applySunoPlaylist(false);
            }
        });
    }

    // Fetch latest playlist tracks silently in background
    setTimeout(() => {
        applySunoPlaylist(true);
    }, 200);

    // Fetch global track likes from Firebase and poll periodically
    fetchTrackLikesFromCloud();
    if (!trackLikesPollingInterval) {
        trackLikesPollingInterval = setInterval(fetchTrackLikesFromCloud, 15000);
    }
}

// ── Native App Deep Link Handler ──────────────────────────────────────────────
function openXApp(e) {
    const screenName = 'AiPainter969696';
    const appUri = 'twitter://user?screen_name=' + screenName;
    const webUrl = 'https://x.com/' + screenName;

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile) {
        if (e) e.preventDefault();
        
        const now = Date.now();
        window.location.href = appUri;
        
        setTimeout(() => {
            if (Date.now() - now < 2000) {
                window.open(webUrl, '_blank');
            }
        }, 1200);
    }
}

// ── Firebase REST API Board (Global Real-time Sharing) ────────────────────────
let selectedAvatar = '🚀';
let currentBoardSort = 'newest';
let cloudPostsCache = [];
let cloudPollingInterval = null;

// Fetch all posts from Firebase REST API
async function fetchCloudPosts() {
    try {
        const res = await fetch(FIREBASE_DB_URL + '/posts.json');
        if (res.ok) {
            const data = await res.json();
            if (data && typeof data === 'object') {
                const list = Object.values(data).filter(p => p && p.id);
                cloudPostsCache = list;
                savePosts(list);
                renderBoardPosts();
            }
        }
    } catch (e) {
        console.warn('Firebase fetch error:', e);
    }
}

// Save a single post to Firebase REST API
async function savePostToCloud(post) {
    try {
        await fetch(FIREBASE_DB_URL + '/posts/' + post.id + '.json', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(post)
        });
    } catch (e) {
        console.warn('Firebase save error:', e);
    }
}

// Delete a single post from Firebase REST API
async function deletePostFromCloud(postId) {
    try {
        await fetch(FIREBASE_DB_URL + '/posts/' + postId + '.json', {
            method: 'DELETE'
        });
    } catch (e) {
        console.warn('Firebase delete error:', e);
    }
}

// Update a single field in Firebase REST API
async function updatePostField(postId, field, value) {
    try {
        const body = {};
        body[field] = value;
        await fetch(FIREBASE_DB_URL + '/posts/' + postId + '.json', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
    } catch (e) {
        console.warn('Firebase update error:', e);
    }
}

async function initVisitorCounter() {
    const totalEl = document.getElementById('v-total-views');
    const todayEl = document.getElementById('v-today-views');
    const heroEl = document.getElementById('hero-visitors-num');

    try {
        const res = await fetch('https://counterapi.com/api/v1/amu-base-official/visits?action=up');
        if (res.ok) {
            const data = await res.json();
            const val = data.value || 1;
            if (totalEl) totalEl.textContent = val.toLocaleString();
            if (todayEl) todayEl.textContent = Math.max(1, Math.floor(val * 0.35)).toLocaleString();
            if (heroEl) heroEl.textContent = val.toLocaleString();
            return;
        }
    } catch (_) {}

    let visits = parseInt(localStorage.getItem('amu_base_total_visits') || '1', 10) + 1;
    localStorage.setItem('amu_base_total_visits', visits.toString());
    if (totalEl) totalEl.textContent = visits.toLocaleString();
    if (todayEl) todayEl.textContent = visits.toLocaleString();
    if (heroEl) heroEl.textContent = visits.toLocaleString();
}

function getStoredPosts() {
    if (cloudPostsCache && cloudPostsCache.length > 0) {
        return [...cloudPostsCache];
    }
    try {
        const raw = localStorage.getItem('amu_base_board_posts');
        if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) {
                return parsed.filter(p => p && p.id);
            }
        }
    } catch (_) {}
    return [];
}

function savePosts(posts) {
    try {
        localStorage.setItem('amu_base_board_posts', JSON.stringify(posts));
    } catch (_) {}
}

function getLikedPostIds() {
    try {
        const raw = localStorage.getItem('amu_base_liked_posts');
        return raw ? JSON.parse(raw) : [];
    } catch (_) { return []; }
}

function saveLikedPostIds(likedArray) {
    try {
        localStorage.setItem('amu_base_liked_posts', JSON.stringify(likedArray));
    } catch (_) {}
}

function initBoard() {
    const avatarContainer = document.getElementById('avatar-picker');
    if (avatarContainer) {
        avatarContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('.avatar-opt');
            if (!btn) return;
            avatarContainer.querySelectorAll('.avatar-opt').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedAvatar = btn.getAttribute('data-avatar') || '🚀';
        });
    }

    const msgInput = document.getElementById('board-msg');
    const charNum = document.getElementById('board-char-num');
    if (msgInput && charNum) {
        msgInput.addEventListener('input', () => {
            charNum.textContent = msgInput.value.length;
        });
    }

    // Load cloud posts immediately
    fetchCloudPosts();

    // Poll for new posts every 10 seconds (simulates real-time)
    cloudPollingInterval = setInterval(fetchCloudPosts, 10000);

    renderBoardPosts();
}

function renderBoardPosts() {
    const listContainer = document.getElementById('board-posts-list');
    const postsCountEl = document.getElementById('v-board-posts');
    if (!listContainer) return;

    let posts = getStoredPosts();
    if (postsCountEl) postsCountEl.textContent = posts.length;

    if (posts.length === 0) {
        listContainer.innerHTML = '<div class="board-empty-msg" style="text-align:center; padding: 48px 20px; color: var(--muted); font-size: 0.9rem; line-height: 1.8;">💬 まだメッセージはありません。<br>最初の感想・メッセージを投稿してみよう！</div>';
        return;
    }

    if (currentBoardSort === 'popular') {
        posts.sort((a, b) => b.likes - a.likes);
    } else {
        posts.sort((a, b) => new Date(b.time.replace(/\//g, '-')).getTime() - new Date(a.time.replace(/\//g, '-')).getTime());
    }

    const likedSet = new Set(getLikedPostIds());

    listContainer.innerHTML = posts.map(post => {
        const isLiked = likedSet.has(post.id);
        const ownerClass = post.isOwner ? 'owner-post' : '';
        const ownerBadge = post.isOwner ? '<span class="post-owner-badge">COMMANDER</span>' : '';
        const deleteBtn = `<button type="button" class="post-delete-btn" onclick="deleteBoardPost('${post.id}')" title="削除">削除</button>`;

        return `
            <div class="board-post-card ${ownerClass}">
                <div class="post-card-header">
                    <div class="post-user-info">
                        <div class="post-avatar-icon">${escapeHtml(post.avatar || '🚀')}</div>
                        <div class="post-author-name">
                            <span>${escapeHtml(post.name || '匿名クリエイター')}</span>
                            ${ownerBadge}
                        </div>
                    </div>
                    <span class="post-time-stamp">${escapeHtml(post.time)}</span>
                </div>
                <div class="post-body-text">${escapeHtml(post.text)}</div>
                <div class="post-card-actions">
                    <button type="button" class="post-like-btn ${isLiked ? 'liked' : ''}" onclick="toggleLikeBoardPost('${post.id}')">
                        <span>${isLiked ? '❤️' : '🤍'}</span>
                        <span>${post.likes || 0}</span>
                    </button>
                    ${deleteBtn}
                </div>
            </div>
        `;
    }).join('');
}

function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

async function handleBoardSubmit(e) {
    e.preventDefault();
    const nameInput = document.getElementById('board-name');
    const msgInput = document.getElementById('board-msg');
    const submitBtn = e.target.querySelector('button[type="submit"]');

    if (!msgInput || !msgInput.value.trim()) return;

    const name = nameInput && nameInput.value.trim() ? nameInput.value.trim() : '匿名クリエイター';
    const text = msgInput.value.trim();

    const now = new Date();
    const formattedTime = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newPost = {
        id: 'post-' + Date.now() + '-' + Math.floor(Math.random() * 9999),
        name: name,
        avatar: selectedAvatar,
        text: text,
        time: formattedTime,
        likes: 0,
        isOwner: false,
        canDelete: true
    };

    // Show optimistic update locally
    const posts = getStoredPosts();
    posts.unshift(newPost);
    cloudPostsCache = posts;
    savePosts(posts);
    renderBoardPosts();

    // Save to Firebase cloud (globally shared)
    await savePostToCloud(newPost);

    msgInput.value = '';
    const charNum = document.getElementById('board-char-num');
    if (charNum) charNum.textContent = '0';

    if (submitBtn) {
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>✅ 投稿しました！</span>';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
        }, 2000);
    }
}

async function toggleLikeBoardPost(postId) {
    const posts = getStoredPosts();
    let likedArray = getLikedPostIds();
    const index = likedArray.indexOf(postId);

    const post = posts.find(p => p.id === postId);
    if (!post) return;

    if (index >= 0) {
        likedArray.splice(index, 1);
        post.likes = Math.max(0, (post.likes || 1) - 1);
    } else {
        likedArray.push(postId);
        post.likes = (post.likes || 0) + 1;
    }

    saveLikedPostIds(likedArray);
    cloudPostsCache = posts;
    savePosts(posts);
    renderBoardPosts();

    // Sync likes to Firebase cloud
    await updatePostField(postId, 'likes', post.likes);
}

async function deleteBoardPost(postId) {
    if (!confirm('この投稿を削除しますか？')) return;
    let posts = getStoredPosts();
    posts = posts.filter(p => p.id !== postId);
    cloudPostsCache = posts;
    savePosts(posts);
    renderBoardPosts();

    // Remove from Firebase cloud
    await deletePostFromCloud(postId);
}

function setBoardSort(sortType) {
    currentBoardSort = sortType;
    document.querySelectorAll('.sort-btn').forEach(btn => btn.classList.remove('active'));
    const targetBtn = document.getElementById(sortType === 'popular' ? 'sort-popular' : 'sort-newest');
    if (targetBtn) targetBtn.classList.add('active');
    renderBoardPosts();
}

// ── INIT ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    initNebula();
    initNav();
    initMediaTabs();
    initMusicStation();
    initSpotifyPlayer();
    renderApps(apps);
    initAppFilters();
    initModal();
    initVisitorCounter();
    initBoard();

    // Add reveal class to static sections
    document.querySelectorAll('.section-label, .section-heading, .section-sub, .profile-bio, .profile-tags, .profile-socials').forEach(el => {
        el.classList.add('reveal');
    });

    // Initial reveal observation
    setTimeout(observeReveal, 100);

    // Re-observe on scroll for late elements
    window.addEventListener('scroll', observeReveal, { passive: true });
});


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
