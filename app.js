const audioFile = document.getElementById('audio-file');
const audioPlayer = document.getElementById('audio-player');
const speedSlider = document.getElementById('speed-slider');
const speedValue = document.getElementById('speed-value');

// 1. Load the uploaded audio file into the player
audioFile.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const fileURL = URL.createObjectURL(file);
        audioPlayer.src = fileURL;
    }
});

// 2. Change playback speed in real-time
speedSlider.addEventListener('input', function(event) {
    const speed = event.target.value;
    audioPlayer.playbackRate = speed;
    speedValue.textContent = `${parseFloat(speed).toFixed(1)}x`;
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