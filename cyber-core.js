// ==========================================
// CYBER CORE: Matrix Rain, Audio & Boot Sequence
// ==========================================

// 1. The Mechanical Audio Engine (Web Audio API)
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// ==========================================
// 1. The Audio Engine (MP3 File)
// ==========================================

// Load the audio file from your folder
const baseClickSound = new Audio('click.mp3');
baseClickSound.volume = 0.4; // Set volume between 0.0 and 1.0

function playClickSound() {
    // We clone the audio node on every keypress. 
    // This allows you to type extremely fast and hear overlapping clicks, 
    // rather than the sound cutting itself off to restart.
    const soundClone = baseClickSound.cloneNode();
    soundClone.volume = baseClickSound.volume;
    
    // Play the sound (catch prevents browser errors if audio is blocked before user interacts)
    soundClone.play().catch(err => {
        // Silent catch for autoplay restrictions
    });
}

// Attach the sound to EVERY keypress and button click on the page
document.addEventListener('keydown', playClickSound);
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT') {
        playClickSound();
    }
});

// 2. The Matrix Digital Rain Effect
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=~[]{}|;:<>/?'.split('');
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = [];

for (let x = 0; x < columns; x++) drops[x] = 1;

function drawMatrix() {
    // Translucent black background creates the fading trail effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Grab the current CSS variable color for the text
    const compStyles = window.getComputedStyle(document.body);
    ctx.fillStyle = compStyles.getPropertyValue('--cyber-primary').trim() || '#0F0';
    ctx.font = fontSize + 'px monospace';
    
    for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    }
}
setInterval(drawMatrix, 33); // Run at ~30 FPS

// 3. Fake Boot Sequence script
const bootText = [
    "Initializing secure kernel...",
    "Mounting encrypted volumes... [OK]",
    "Bypassing mainframe protocols... [OK]",
    "Establishing secure tunnel to 127.0.0.1...",
    "Handshake confirmed.",
    "System Ready."
];

const bootDiv = document.getElementById('boot-sequence');
let bootLine = 0;

function runBootSequence() {
    if (bootLine < bootText.length) {
        bootDiv.innerHTML += bootText[bootLine] + "<br>";
        bootLine++;
        setTimeout(runBootSequence, Math.random() * 400 + 100);
    } else {
        setTimeout(() => bootDiv.innerHTML = "", 3000); // Clear after 3 seconds
    }
}
runBootSequence();

// Handle window resizing to fix canvas stretch
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});