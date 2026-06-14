
const giftData = {
  girlfriendName: "Gesil Jean D. Hapay",
  graduationDate: "JUNE 15TH",
  mainMessage:
    "To my LABLAB , congratulations on this beautiful milestone. I am so proud of everything you have achieved. This graduation is not just an ending, but the beginning of an amazing new chapter. I am honored to celebrate this day with you.",
  memories: [
    { id: 1, image: "images/photo1.jpg", caption: "the start of everything", date: "JUNE 15TH", title: "Sweet Success", editableDescription: "" },
    { id: 2, image: "images/photo2.jpg", caption: "", date: "JUNE 15TH", title: "We Made It", editableDescription: "" },
    { id: 3, image: "images/photo3.jpg", caption: "A dream come true", date: "JUNE 15TH", title: "Forever My Favorite Person", editableDescription: "" },
    { id: 4, image: "images/photo4.jpg", caption: "Pink skies and proud hearts", date: "JUNE 15TH", title: "A Beautiful Chapter", editableDescription: "" },
    { id: 5, image: "images/photo5.jpg", caption: "Caps in the air", date: "JUNE 15TH", title: "We Made It", editableDescription: "" },
    { id: 6, image: "images/photo6.jpg", caption: "Soft light, big love", date: "JUNE 15TH", title: "My Graduate", editableDescription: "" },
    { id: 7, image: "images/photo7.jpg", caption: "Golden hour memories", date: "JUNE 15TH", title: "Radiant Future", editableDescription: "" },
    { id: 8, image: "images/photo8.jpg", caption: "A hug after the ceremony", date: "JUNE 15TH", title: "Always Beside You", editableDescription: "" },
    { id: 9, image: "images/photo9.jpg", caption: "Pretty in pink", date: "JUNE 15TH", title: "Sweet Success", editableDescription: "" },
    { id: 10, image: "images/photo10.jpg", caption: "All your hard work", date: "JUNE 15TH", title: "The Moment You Deserve", editableDescription: "" },
    { id: 11, image: "images/photo11.jpg", caption: "Love, laughter, and laurels", date: "JUNE 15TH", title: "A Love Worth Celebrating", editableDescription: "" },
    { id: 12, image: "images/photo12.jpg", caption: "the start of our next adventure", date: "JUNE 15TH", title: "Our Next Chapter", editableDescription: "" },
  ],
};

const heroTitle = document.getElementById("heroTitle");
const heroName = document.getElementById("heroName");
const heroMessage = document.getElementById("heroMessage");
const startBtn = document.getElementById("startBtn");
const closeBtn = document.getElementById("closeBtn");
const introModal = document.getElementById("introModal");
const yesFullscreenBtn = document.getElementById("yesFullscreenBtn");
const skipFullscreenBtn = document.getElementById("skipFullscreenBtn");
const sceneStage = document.querySelector(".scene-stage");
const polaroidLayer = document.getElementById("polaroidLayer");
const orbitRing = document.getElementById("orbitRing");
const sparkleLayer = document.getElementById("sparkleLayer");
const modalOverlay = document.getElementById("modalOverlay");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const memoryDescription = document.getElementById("memoryDescription");
const saveMemoryBtn = document.getElementById("saveMemory");
const memorySavedStatus = document.getElementById("saveStatus");
const modalClose = document.getElementById("modalClose");
const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
const centralVideo = document.getElementById("centralVideo");

const memoryStoragePrefix = "our-graduation-story-memory-";

let currentMemoryIndex = 0;
let autosaveTimer = 0;
let savedStatusTimer = 0;
let musicFadeTimer = 0;
let musicUnlocked = false;
let musicEnabled = false;

const musicVolume = 0.35;

function applyLandingText() {
  heroTitle.textContent = "HAPPY GRADUATION";
  heroName.textContent = giftData.girlfriendName;
  heroMessage.textContent = giftData.mainMessage;
}

function createPlaceholderImage(caption, index) {
  const palette = [
    [244, 165, 190],
    [243, 206, 142],
    [237, 190, 231],
    [255, 213, 178],
    [224, 154, 183],
    [250, 233, 190],
  ];
  const [a, b, c] = palette[index % palette.length];
  const [d, e, f] = palette[(index + 2) % palette.length];
  const safeCaption = caption.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="900" height="900" viewBox="0 0 900 900">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="rgb(${a}, ${b}, ${c})"/>
          <stop offset="100%" stop-color="rgb(${d}, ${e}, ${f})"/>
        </linearGradient>
        <radialGradient id="r" cx="50%" cy="38%" r="70%">
          <stop offset="0%" stop-color="rgba(255,255,255,0.72)"/>
          <stop offset="62%" stop-color="rgba(255,255,255,0.06)"/>
          <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
        </radialGradient>
      </defs>
      <rect width="900" height="900" rx="72" fill="url(#g)"/>
      <circle cx="450" cy="330" r="270" fill="url(#r)"/>
      <circle cx="160" cy="150" r="92" fill="rgba(255,255,255,0.28)"/>
      <circle cx="710" cy="200" r="118" fill="rgba(255,255,255,0.2)"/>
      <path d="M120 690 C250 560, 410 560, 530 650 S760 760, 820 650" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="20" stroke-linecap="round"/>
      <text x="450" y="475" text-anchor="middle" fill="white" font-size="62" font-family="Georgia, serif" letter-spacing="6">PHOTO</text>
      <text x="450" y="560" text-anchor="middle" fill="rgba(255,255,255,0.9)" font-size="38" font-family="Georgia, serif" letter-spacing="3">${safeCaption}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function setImagePlaceholder(imageElement, caption, index) {
  imageElement.src = createPlaceholderImage(caption, index);
  imageElement.alt = caption;
}

function storageKey(memoryId) {
  return `${memoryStoragePrefix}${memoryId}`;
}

function getStoredDescription(memoryId) {
  try {
    return window.localStorage.getItem(storageKey(memoryId)) || "";
  } catch {
    return "";
  }
}

function saveStoredDescription(memoryId, value) {
  try {
    window.localStorage.setItem(storageKey(memoryId), value);
  } catch {
    // Ignore storage errors in restricted browser contexts.
  }
}

function showSavedStatus(message) {
  window.clearTimeout(savedStatusTimer);
  memorySavedStatus.textContent = message;
  if (!message) return;
  savedStatusTimer = window.setTimeout(() => {
    memorySavedStatus.textContent = "";
  }, 1800);
}

function renderPolaroids() {
  orbitRing.innerHTML = "";

  giftData.memories.forEach((memory, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "photo-card";
    button.dataset.index = String(index);
    button.setAttribute("aria-label", `Open memory: ${memory.title}`);

    const floatWrapper = document.createElement("span");
    floatWrapper.className = "photo-card-inner";

    const body = document.createElement("span");
    body.className = "photo-card-body";

    const photoFrame = document.createElement("span");
    photoFrame.className = "photo-card__photo";

    const image = document.createElement("img");
    // Prefer the real image path; fall back to generated SVG placeholder on error
    image.decoding = "async";
    image.loading = "lazy";
    if (memory.image) {
      image.src = memory.image;
      image.alt = memory.caption;
      image.onerror = () => setImagePlaceholder(image, memory.caption, index);
    } else {
      setImagePlaceholder(image, memory.caption, index);
    }

    const caption = document.createElement("span");
    caption.className = "photo-card__caption";
    caption.textContent = memory.caption;

    photoFrame.appendChild(image);
    body.append(photoFrame, caption);
    floatWrapper.appendChild(body);
    button.appendChild(floatWrapper);
    orbitRing.appendChild(button);

    const angle = index * (360 / giftData.memories.length);
    button.style.setProperty("--angle", `${angle}deg`);
  });

  updateOrbitLayout();
}

function updateOrbitLayout() {
  const isMobile = window.matchMedia("(max-width: 720px)").matches;
  const orbitRadius = isMobile ? "145px" : window.matchMedia("(max-width: 1080px)").matches ? "210px" : "250px";
  orbitRing.style.setProperty("--orbit-radius", orbitRadius);
}

function updateMusicButton(isPlaying) {
  musicEnabled = isPlaying;
  musicToggle.textContent = isPlaying ? "❚❚ Pause Music" : "♪ Play Music";
  musicToggle.classList.toggle("is-playing", isPlaying);
}

function fadeMusic(targetVolume, shouldPauseAfterFade = false) {
  if (!bgMusic) {
    return Promise.resolve();
  }

  window.clearInterval(musicFadeTimer);

  return new Promise((resolve) => {
    const startVolume = typeof bgMusic.volume === "number" ? bgMusic.volume : 0;
    const duration = 320;
    const startedAt = performance.now();

    if (Math.abs(targetVolume - startVolume) < 0.01) {
      bgMusic.volume = targetVolume;
      if (shouldPauseAfterFade) {
        bgMusic.pause();
      }
      resolve();
      return;
    }

    musicFadeTimer = window.setInterval(() => {
      const elapsed = performance.now() - startedAt;
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      bgMusic.volume = startVolume + (targetVolume - startVolume) * eased;

      if (progress >= 1) {
        window.clearInterval(musicFadeTimer);
        musicFadeTimer = 0;
        bgMusic.volume = targetVolume;
        if (shouldPauseAfterFade) {
          bgMusic.pause();
        }
        resolve();
      }
    }, 16);
  });
}

async function playMusic() {
  if (!bgMusic) return;
  musicUnlocked = true;

  try {
    bgMusic.loop = true;
    bgMusic.volume = 0;
    if (bgMusic.paused) {
      await bgMusic.play();
    }
    await fadeMusic(musicVolume, false);
    updateMusicButton(true);
  } catch {
    updateMusicButton(false);
  }
}

async function playMusicSoftly() {
  if (!bgMusic) return;
  musicUnlocked = true;

  try {
    bgMusic.loop = true;
    bgMusic.muted = true;
    bgMusic.volume = musicVolume;
    if (bgMusic.paused) {
      await bgMusic.play();
    }
    bgMusic.muted = false;
    await fadeMusic(musicVolume, false);
    updateMusicButton(true);
  } catch {
    bgMusic.muted = false;
    updateMusicButton(false);
  }
}

async function pauseMusic() {
  if (!bgMusic) return;

  try {
    await fadeMusic(0, true);
  } catch {
    bgMusic.pause();
  } finally {
    updateMusicButton(false);
  }
}

async function toggleMusic() {
  if (!musicUnlocked) {
    return;
  }

  if (bgMusic.paused) {
    await playMusic();
    return;
  }

  await pauseMusic();
}

function burstSparkles() {
  sparkleLayer.innerHTML = "";
  const particleCount = 26;
  const shapes = ["dot", "dot", "dot", "star", "heart"];

  for (let index = 0; index < particleCount; index += 1) {
    const particle = document.createElement("span");
    particle.className = "sparkle-piece";
    particle.dataset.shape = shapes[index % shapes.length];
    particle.style.setProperty("--dx", `${(Math.random() * 2 - 1) * 240}px`);
    particle.style.setProperty("--dy", `${(Math.random() * 2 - 1) * 220}px`);
    particle.style.setProperty("--delay", `${Math.random() * 0.18}s`);
    particle.style.setProperty("--hue", `${330 + Math.random() * 40}`);
    particle.style.setProperty("--size", `${0.3 + Math.random() * 0.5}rem`);

    if (Math.random() > 0.68) {
      particle.dataset.shape = "star";
    }

    sparkleLayer.appendChild(particle);
  }

  window.setTimeout(() => {
    sparkleLayer.innerHTML = "";
  }, 1200);
}

function launchMemories() {
  sceneStage.classList.add("is-launched");
  sceneStage.classList.remove("is-paused");
  // mark experience started so CSS can reveal and animate the orbit ring
  document.body.classList.add("experience-started");
  // set a sensible orbit duration (can be tuned)
  orbitRing.style.setProperty("--orbit-duration", "16s");
  orbitRing.classList.remove("paused");
  burstSparkles();
}

function stopOrbit() {
  sceneStage.classList.remove("is-launched");
  sceneStage.classList.remove("is-paused");
  orbitRing.classList.remove("paused");
  // undo experience started state
  document.body.classList.remove("experience-started");
}

function pauseOrbit() {
  orbitRing.classList.add("paused");
}

function resumeOrbit() {
  orbitRing.classList.remove("paused");
}

function enterFullscreenIfAvailable() {
  const root = document.documentElement;
  if (document.fullscreenElement || !document.fullscreenEnabled) {
    return Promise.resolve();
  }

  return root.requestFullscreen().catch(() => {});
}

function closeIntroModal() {
  introModal.classList.add("is-hidden");
  window.setTimeout(() => {
    introModal.style.display = "none";
  }, 260);
}

function loadMemoryDescription(memory) {
  const stored = getStoredDescription(memory.id);
  return stored || memory.editableDescription || "";
}

function syncMemoryEditor(memory) {
  memoryDescription.value = loadMemoryDescription(memory);
  memorySavedStatus.textContent = "";
}

function openMemoryModal(index) {
  const memory = giftData.memories[index];
  if (!memory) return;

  currentMemoryIndex = index;
  // modalTitle remains static "Our Memory" — don't show per-card dates/titles
  modalTitle.textContent = "Our Memory";
  // Prefer real image with fallback to placeholder
  if (memory.image) {
    modalImage.src = memory.image;
    modalImage.alt = memory.caption || memory.title || "Memory photo";
    modalImage.onerror = () => setImagePlaceholder(modalImage, memory.caption, index);
  } else {
    setImagePlaceholder(modalImage, memory.caption, index);
  }
  syncMemoryEditor(memory);

  modalOverlay.classList.add("active");
  document.body.classList.add("modal-open");
  pauseOrbit();
}

function closeMemoryModalFn() {
  modalOverlay.classList.remove("active");
  document.body.classList.remove("modal-open");
  resumeOrbit();
}

function saveCurrentMemoryDescription(showFeedback) {
  const memory = giftData.memories[currentMemoryIndex];
  if (!memory) return;

  const value = memoryDescription.value;
  saveStoredDescription(memory.id, value);
  memory.editableDescription = value;

  if (showFeedback) {
    showSavedStatus("Saved beautifully.");
  }
}

function closeMemories() {
  if (modalOverlay && modalOverlay.classList.contains("active")) {
    modalOverlay.classList.remove("active");
    document.body.classList.remove("modal-open");
  }

  stopOrbit();
}

function showCentralVideo() {
  if (!centralVideo) return;
  centralVideo.classList.add("is-visible");
}

function hideCentralVideo() {
  if (!centralVideo) return;
  try {
    centralVideo.pause();
  } catch (e) {}
  try {
    centralVideo.currentTime = 0;
  } catch (e) {}
  centralVideo.classList.remove("is-visible");
}

applyLandingText();
renderPolaroids();
updateMusicButton(false);

window.addEventListener("resize", () => {
  updateOrbitLayout();
});

window.addEventListener("load", () => {
  introModal.style.display = "grid";
});

yesFullscreenBtn.addEventListener("pointerdown", () => {
  if (!musicUnlocked) {
    musicUnlocked = true;
  }

  void playMusicSoftly();
}, { once: true });

yesFullscreenBtn.addEventListener("click", async () => {
  musicUnlocked = true;
  void enterFullscreenIfAvailable();
  closeIntroModal();
});

skipFullscreenBtn.addEventListener("click", () => {
  musicUnlocked = true;
  closeIntroModal();
});

startBtn.addEventListener("click", async () => {
  musicUnlocked = true;
  launchMemories();
  // reveal central video with the same timing as the orbit
  showCentralVideo();
  await playMusic();
});

closeBtn.addEventListener("click", () => {
  // hide central video and then stop the orbit
  hideCentralVideo();
  closeMemories();
});

musicToggle.addEventListener("click", () => {
  toggleMusic();
});

polaroidLayer.addEventListener("click", (event) => {
  const card = event.target.closest(".photo-card");
  if (!card || !sceneStage.classList.contains("is-launched")) return;
  openMemoryModal(Number(card.dataset.index));
});

modalClose.addEventListener("click", closeMemoryModalFn);

// Clicking outside the modal content (on the overlay) closes it
modalOverlay.addEventListener("click", (event) => {
  if (event.target === modalOverlay) {
    closeMemoryModalFn();
  }
});

saveMemoryBtn.addEventListener("click", () => {
  saveCurrentMemoryDescription(true);
});

memoryDescription.addEventListener("input", () => {
  window.clearTimeout(autosaveTimer);
  autosaveTimer = window.setTimeout(() => {
    saveCurrentMemoryDescription(false);
  }, 220);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (modalOverlay && modalOverlay.classList.contains("active")) {
      closeMemoryModalFn();
    } else if (sceneStage.classList.contains("is-launched")) {
      closeMemories();
    }
  }
});

// If you want background music later, uncomment the audio tag in index.html
// and play it from a click handler after the intro modal closes.

/* Central video <-> background music sync behavior
   - Pause background music when central video plays
   - Resume background music after video pause/end only if music was playing before video started
*/
(() => {
  const centralVideo = document.getElementById("centralVideo");
  const backgroundMusic = bgMusic; // already queried above
  let shouldResumeMusicAfterVideo = false;

  if (!centralVideo || !backgroundMusic) return;

  centralVideo.addEventListener("play", () => {
    // remember whether music was playing so we can resume it later
    shouldResumeMusicAfterVideo = !backgroundMusic.paused && !backgroundMusic.ended;
    if (shouldResumeMusicAfterVideo) {
      try {
        backgroundMusic.pause();
      } catch (e) {
        // ignore
      }
    }
  });

  const resumeMusicIfNeeded = () => {
    if (shouldResumeMusicAfterVideo && backgroundMusic.paused) {
      backgroundMusic.play().catch(() => {
        // Browser may block playback until user interacts again.
      });
    }
    shouldResumeMusicAfterVideo = false;
  };

  centralVideo.addEventListener("pause", () => {
    // only resume if the video wasn't ended (ended event will also call resume)
    if (!centralVideo.ended) {
      resumeMusicIfNeeded();
    }
  });

  centralVideo.addEventListener("ended", resumeMusicIfNeeded);
})();
