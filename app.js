const audioFile = document.getElementById('audio-file');
const audioPlayer = document.getElementById('audio-player');
const speedSlider = document.getElementById('speed-slider');
const speedValue = document.getElementById('speed-value');
const filterSlider = document.getElementById('filter-slider');
const filterStatus = document.getElementById('filter-status');

// Web Audio API Context variables
let audioContext;
let trackNode;
let biquadFilter;

// 1. Initialize the Hardware Audio Graph on first user interaction
function initAudioGraph() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Route the HTML audio element into our JavaScript audio graph
        trackNode = audioContext.createMediaElementSource(audioPlayer);
        
        // Create an advanced bandpass filter (suppresses extreme highs and lows)
        biquadFilter = audioContext.createBiquadFilter();
        biquadFilter.type = "bandpass";
        biquadFilter.frequency.value = 1000; // Focus point: 1kHz (human hearing sweet spot)
        biquadFilter.Q.value = 1.0;          // Filter sharpness width
        
        // Connect the nodes: Player -> Filter -> Speakers
        trackNode.connect(biquadFilter);
        biquadFilter.connect(audioContext.destination);
    }
}

// 2. Load the uploaded audio file into the player
audioFile.addEventListener('change', function(event) {
    const file = event.target.files;
    if (file && file[0]) {
        const fileURL = URL.createObjectURL(file[0]);
        audioPlayer.src = fileURL;
    }
});

// 3. Change playback speed in real-time
speedSlider.addEventListener('input', function(event) {
    const speed = event.target.value;
    audioPlayer.playbackRate = speed;
    speedValue.textContent = `${parseFloat(speed).toFixed(1)}x`;
});

// 4. Acoustic Focus Isolation Engine (Bypasses/Engages the Filter)
filterSlider.addEventListener('input', function(event) {
    // Web Audio requires a user interaction to boot the audio hardware safely
    initAudioGraph();
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    const state = parseInt(event.target.value);
    
    if (state === 1) {
        // ENGAGE FILTER: Isolate the audio sweet spot
        biquadFilter.frequency.setValueAtTime(1000, audioContext.currentTime);
        filterStatus.textContent = "ISOLATED (1kHz)";
        filterStatus.style.color = "#38bdf8";
        
        // Sever direct player-to-speaker path so only filtered sound passes
        trackNode.disconnect(audioContext.destination);
    } else {
        // BYPASS FILTER: Clean, unaltered original audio track
        filterStatus.textContent = "OFF";
        filterStatus.style.color = "#94a3b8";
        
        // Re-route audio directly to speakers
        trackNode.connect(audioContext.destination);
    }
});

// =========================================================================
// FUTURE ROADMAP ARCHITECTURE: Visualizer Theme Configuration (OOP Practice)
// =========================================================================

// 1. THE BLUEPRINT (The Class)
class VisualizerTheme {
    constructor(themeName, primaryColor, barWidth) {
        this.themeName = themeName;
        this.primaryColor = primaryColor;
        this.barWidth = barWidth;
    }

    logConfiguration() {
        console.log(`🎨 Visualizer Profile Active: [${this.themeName}] - Color: ${this.primaryColor}, Node Width: ${this.barWidth}px`);
    }
}

// 2. CREATING THE OBJECTS (Instances for Phase 2 Web Audio API)
const cyberNeon = new VisualizerTheme("Cyber Neon", "#38bdf8", 3);
const classicSunset = new VisualizerTheme("Classic Sunset", "#f43f5e", 5);
const acousticMinimal = new VisualizerTheme("Acoustic Minimal", "#94a3b8", 2);

// 3. SIMULATING RUNTIME THEME SELECTION
console.log("--- Initializing Visualizer Configurations ---");
const availableThemes = [cyberNeon, classicSunset, acousticMinimal];

// Loop through themes and register them in the console log
availableThemes.forEach(theme => theme.logConfiguration());

// Simulate setting the default theme from our blueprint array
const activeTheme = availableThemes[0]; 
console.log(`\n🚀 System Ready. Phase 2 visualizer will initialize using the '${activeTheme.themeName}' profile.`);