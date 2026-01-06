/* =====================================
   FILTERING SYSTEM
===================================== */

const typeFilter = document.getElementById('typeFilter');
const regionFilter = document.getElementById('regionFilter');
const budgetFilter = document.getElementById('budgetFilter');
const cards = document.querySelectorAll('.card'); // updated from .location

function filterLocations() {
  const typeValue = typeFilter.value;
  const regionValue = regionFilter.value;
  const budgetValue = budgetFilter.value;

  cards.forEach(card => {
    const cardType = card.getAttribute('data-type');
    const cardRegion = card.getAttribute('data-region');
    const cardBudget = card.getAttribute('data-budget');

    if ((typeValue === 'all' || cardType === typeValue) &&
        (regionValue === 'all' || cardRegion === regionValue) &&
        (budgetValue === 'all' || cardBudget === budgetValue)) {
      card.classList.remove('hide');
    } else {
      card.classList.add('hide');
    }
  });
}

// EVENT LISTENERS

typeFilter.addEventListener('change', filterLocations);
regionFilter.addEventListener('change', filterLocations);
budgetFilter.addEventListener('change', filterLocations);


/* =====================================
   HEART FAVORITES (UNICODE → EMOJI)
===================================== */
document.addEventListener("DOMContentLoaded", () => {
  const UNICODE_HEART = "♡";
  const EMOJI_HEART = "❤️";

  const allCards = document.querySelectorAll(".card");
  const favoritesContainer = document.querySelector(".favorites-container");

  let savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

  function saveFavorites() {
    localStorage.setItem("favorites", JSON.stringify(savedFavorites));
  }

  function isFavorited(title) {
    return savedFavorites.includes(title);
  }

  function toggleHeartUI(heart, active) {
    heart.classList.toggle("active", active);
    heart.textContent = active ? EMOJI_HEART : UNICODE_HEART;
  }

  function updateMainCards() {
    allCards.forEach(card => {
      const title = card.querySelector("h3").textContent;
      const heart = card.querySelector(".favorite-heart");

      toggleHeartUI(heart, isFavorited(title));
    });
  }

  function buildFavorites() {
    favoritesContainer.innerHTML = "";

    savedFavorites.forEach(title => {
      const originalCard = [...allCards].find(
        card => card.querySelector("h3").textContent === title
      );

      if (!originalCard) return;

      const clone = originalCard.cloneNode(true);
      const cloneHeart = clone.querySelector(".favorite-heart");

      toggleHeartUI(cloneHeart, true);

      // 👇 UNFAVORITE FROM FAVORITES SECTION
      cloneHeart.addEventListener("click", () => {
        savedFavorites = savedFavorites.filter(item => item !== title);
        saveFavorites();
        updateMainCards();
        buildFavorites();
      });

      favoritesContainer.appendChild(clone);
    });
  }

  // MAIN CARD HEART CLICKS
  allCards.forEach(card => {
    const heart = card.querySelector(".favorite-heart");
    const title = card.querySelector("h3").textContent;

    toggleHeartUI(heart, isFavorited(title));

    heart.addEventListener("click", () => {
      if (isFavorited(title)) {
        savedFavorites = savedFavorites.filter(item => item !== title);
      } else {
        savedFavorites.push(title);
      }

      saveFavorites();
      updateMainCards();
      buildFavorites();
    });
  });

  // INITIAL LOAD
  updateMainCards();
  buildFavorites();
});

// VIDEO 

const videoContainer = document.querySelector('.video-container');
const videoFiles = [
  'media/video/video3.mp4',
  'media/video/video4.mp4',
  'media/video/video5.mp4',
  'media/video/video7.mp4',
  'media/video/video8.mp4',
  'media/video/video9.mp4'
];

let currentIndex = 0;

// Create two video elements
const videoA = document.createElement('video');
const videoB = document.createElement('video');

[videoA, videoB].forEach(video => {
  video.autoplay = false;
  video.muted = true;
  video.loop = true;
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

// Load the first video
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

  // Schedule next video after 7 seconds
  setTimeout(nextVideo, 5000);
}

// Start the cycle after 7 seconds
setTimeout(nextVideo, 5000);




// BUTTON

document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startExploring");
  const filtersSection = document.getElementById("filters");

  if (!startBtn || !filtersSection) return;

  startBtn.addEventListener("click", (e) => {
    e.preventDefault();
    filtersSection.scrollIntoView({ behavior: "smooth" });
  });
});
