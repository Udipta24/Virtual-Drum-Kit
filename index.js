const pads = document.querySelectorAll(".pad");
const volumeControl = document.getElementById("volume");

const sounds = {
  w: "./sounds/tom-1.mp3",
  a: "./sounds/tom-2.mp3",
  s: "./sounds/tom-3.mp3",
  d: "./sounds/tom-4.mp3",
  j: "./sounds/snare.mp3",
  k: "./sounds/crash.mp3",
  l: "./sounds/kick-bass.mp3",
};

let volume = 1;
volumeControl.addEventListener("input", (e) => {
  volume = e.target.value;
});

// Play sound
function playSound(key) {
  const soundSrc = sounds[key];
  if (!soundSrc) return;
  const audio = new Audio(soundSrc);
  audio.volume = volume;
  audio.play();
}

// Button animation
function buttonAnimation(key) {
  const activePad = document.querySelector(`.pad[data-key="${key}"]`);
  if (!activePad) return;
  activePad.classList.add("pressed");
  setTimeout(() => {
    activePad.classList.remove("pressed");
  }, 100);
}

// Event listeners for click
pads.forEach((pad) => {
  pad.addEventListener("click", () => {
    const key = pad.getAttribute("data-key");
    playSound(key);
    buttonAnimation(key);
    handleRecording(key);
  });
});

// Event listener for key press
document.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();
  playSound(key);
  buttonAnimation(key);
  handleRecording(key);
});

// Recording functionality
let isRecording = false;
let recording = [];
let startTime = 0;

document.getElementById("record").addEventListener("click", () => {
  recording = [];
  isRecording = true;
  startTime = Date.now();
  document.getElementById("record").classList.add("recording");
  document.getElementById("record").innerHTML = "Recording..";
});

document.getElementById("stop").addEventListener("click", () => {
  isRecording = false;
  document.getElementById("record").classList.remove("recording");
  document.getElementById("record").innerHTML = "⏺️ Record";
});

document.getElementById("play").addEventListener("click", () => {
  if (recording.length === 0) return;
  const firstTime = recording[0].time;
  recording.forEach((event) => {
    setTimeout(() => {
      playSound(event.key);
      buttonAnimation(event.key);
    }, event.time - firstTime);
  });
});

function handleRecording(key) {
  if (isRecording) {
    recording.push({ key, time: Date.now() });
  }
}
