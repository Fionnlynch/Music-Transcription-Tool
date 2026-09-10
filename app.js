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