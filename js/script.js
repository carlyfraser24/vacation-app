// VIDEO 
const videoContainer = document.querySelector('.video-container');
const videoFiles = [
  'media/video/video3.mp4',
  'media/video/video7.mp4',
  'media/video/video8.mp4'
];

let currentIndex = 0;

// Create two video elements
const videoA = document.createElement('video');
const videoB = document.createElement('video');

[videoA, videoB].forEach(video => {
  video.autoplay = false;
  video.muted = true;
  video.loop = false; // we handle looping manually for seamless transition
  video.playsInline = true;
  video.style.position = 'absolute';
  video.style.top = 0;
  video.style.left = 0;
  video.style.width = '100%';
  video.style.height = '100%';
  video.style.objectFit = 'cover';
  video.style.transition = 'opacity 1s ease';
  video.style.opacity = 0;
  videoContainer.appendChild(video);
});

let front = videoA;
let back = videoB;

// Load the first video immediately
front.src = videoFiles[currentIndex];
front.style.opacity = 1;
front.play();

// Function to swap videos seamlessly
function nextVideo() {
  // Calculate next video index
  currentIndex = (currentIndex + 1) % videoFiles.length;

  // Prepare back video
  back.src = videoFiles[currentIndex];
  back.currentTime = 0;
  back.play();

  // Fade front out, back in
  back.style.opacity = 1;
  front.style.opacity = 0;

  // Swap front/back references
  [front, back] = [back, front];
}

// Event listener to trigger next video when the current one ends
front.addEventListener('ended', function cycle() {
  nextVideo();
  // Reattach listener to the new front video
  front.addEventListener('ended', cycle);
});


