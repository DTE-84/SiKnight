// ══════════════════════════════
//  STATE
// ══════════════════════════════
let coins = 0;
let scores = [
  { name: "Si Knight", score: 98500, game: "fortnite", me: true },
  { name: "xXDragonSlayer", score: 87200, game: "roblox", me: false },
  { name: "MinecraftPro99", score: 76400, game: "minecraft", me: false },
  { name: "FortKing42", score: 65100, game: "fortnite", me: false },
  { name: "BuilderBob", score: 54800, game: "minecraft", me: false },
  { name: "RobloxRacer", score: 43200, game: "roblox", me: false },
];
let currentTab = "all";

// ══════════════════════════════
//  INTRO MODAL
// ══════════════════════════════
// Generate stars inside banner
const ibStarsEl = document.getElementById("ibStars");
if (ibStarsEl) {
  for (let i = 0; i < 65; i++) {
    const s = document.createElement("div");
    s.className = "ib-star";
    const sz = Math.random() * 2.5 + 0.6;
    s.style.cssText = `left:${Math.random() * 100}%;top:${Math.random() * 55}%;width:${sz}px;height:${sz}px;animation-duration:${Math.random() * 3 + 1.5}s;animation-delay:${Math.random() * 5}s;`;
    ibStarsEl.appendChild(s);
  }
}

// Click on character inside modal = sparks
const ibHero = document.getElementById("ibHero");
if (ibHero) {
  ibHero.addEventListener("click", (e) => {
    spawnParticles(e.clientX, e.clientY, [
      "⚔️",
      "🛡️",
      "⭐",
      "✨",
      "🪙",
      "💥",
    ]);
  });
}

function dismissIntro() {
  const modal = document.getElementById("introModal");
  modal.classList.add("hiding");
  setTimeout(() => {
    modal.style.display = "none";
  }, 650);
  // give 5 welcome coins
  coins += 5;
  updateCoins();
  showToast("⚔ WELCOME TO THE HQ! +5 COINS 🪙");
}

// ══════════════════════════════
//  HERO STARS
// ══════════════════════════════
const starsEl = document.getElementById("heroStars");
if (starsEl) {
  for (let i = 0; i < 80; i++) {
    const s = document.createElement("div");
    s.className = "hstar";
    const sz = Math.random() * 2.5 + 0.5;
    s.style.cssText = `left:${Math.random() * 100}%;top:${Math.random() * 100}%;width:${sz}px;height:${sz}px;animation-duration:${Math.random() * 3 + 1.5}s;animation-delay:${Math.random() * 5}s;`;
    starsEl.appendChild(s);
  }
}

// ══════════════════════════════
//  HERO CHARACTER CLICK
// ══════════════════════════════
const QUIPS = [
  "LET'S GAME! 🎮",
  "CLICK COINS! 🪙",
  "ADVENTURE! ⚔",
  "SUBSCRIBE! 🔔",
  "SI KNIGHT! 🐾",
  "LETS GO!! 🔥",
  "ROBLOX FTW! 🟥",
  "BUILD IT! ⛏",
  "NO SCOPE! ⚡",
];
let quipIdx = 0;
const heroSvg = document.getElementById("heroSvg");
if (heroSvg) {
  heroSvg.addEventListener("click", function (e) {
    coins += 5;
    updateCoins();
    showBubble(QUIPS[quipIdx++ % QUIPS.length]);
    spawnParticles(e.clientX, e.clientY, ["⭐", "🪙", "✨", "💥"]);
    showToast("🪙 +5 COINS!");
  });
}

function showBubble(txt) {
  const b = document.getElementById("bubble");
  b.textContent = txt;
  b.classList.add("show");
  setTimeout(() => b.classList.remove("show"), 2200);
}
function updateCoins() {
  const coinCount = document.getElementById("coinCount");
  if (coinCount) coinCount.textContent = coins;
}

// ══════════════════════════════
//  PARTICLES
// ══════════════════════════════
function spawnParticles(x, y, emojis) {
  for (let i = 0; i < 8; i++) {
    const p = document.createElement("div");
    p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    const angle = Math.random() * Math.PI * 2;
    const dist = Math.random() * 80 + 30;
    p.style.cssText = `position:fixed;left:${x}px;top:${y}px;font-size:${Math.random() * 14 + 10}px;pointer-events:none;z-index:9998;transition:all .7s ease-out;`;
    document.body.appendChild(p);
    requestAnimationFrame(() => {
      p.style.transform = `translate(${Math.cos(angle) * dist}px,${Math.sin(angle) * dist - 40}px) scale(0)`;
      p.style.opacity = "0";
    });
    setTimeout(() => p.remove(), 750);
  }
}

// ══════════════════════════════
//  TOAST
// ══════════════════════════════
let toastTimer;
function showToast(msg) {
  const t = document.getElementById("toast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2000);
}

// ══════════════════════════════
//  VIDEOS
// ══════════════════════════════
function openVideo(url) {
  window.open(url, "_blank");
  showToast("▶ OPENING VIDEO...");
}
function openAddVideo() {
  document.getElementById("videoModal").classList.add("open");
}
function closeModal(id) {
  document.getElementById(id).classList.remove("open");
}
function addVideo() {
  const title = document.getElementById("vidTitle").value.trim();
  const url = document.getElementById("vidUrl").value.trim();
  const game = document
    .getElementById("vidGame")
    .value.trim()
    .toLowerCase();
  const dur = document.getElementById("vidDur").value.trim() || "0:00";
  if (!title || !url) {
    showToast("⚠ FILL IN TITLE + URL!");
    return;
  }
  const tagClass = game.includes("roblox")
    ? "tag-roblox"
    : game.includes("fort")
      ? "tag-fortnite"
      : "tag-minecraft";
  const tagLabel = game.includes("roblox")
    ? "ROBLOX"
    : game.includes("fort")
      ? "FORTNITE"
      : "MINECRAFT";
  const emoji = game.includes("roblox")
    ? "🟥"
    : game.includes("fort")
      ? "⚡"
      : "⛏";
  const card = document.createElement("div");
  card.className = "video-card";
  card.innerHTML = `<div class="video-thumb"><div class="video-thumb-bg">${emoji}</div><div class="video-play">▶</div><div class="video-label">${dur}</div></div><div class="video-info"><div class="video-title">${title}</div><div class="video-meta">👁 NEW · JUST ADDED</div><span class="video-tag ${tagClass}">${tagLabel}</span></div>`;
  card.onclick = () => openVideo(url);
  const grid = document.getElementById("videoGrid");
  grid.insertBefore(card, grid.lastElementChild);
  closeModal("videoModal");
  ["vidTitle", "vidUrl", "vidGame", "vidDur"].forEach(
    (id) => (document.getElementById(id).value = ""),
  );
  showToast("✅ VIDEO ADDED!");
  coins += 10;
  updateCoins();
}

// ══════════════════════════════
//  SCREENSHOTS
// ══════════════════════════════
function openLightbox(card) {
  const img = card.querySelector("img");
  if (!img) {
    showToast("📸 REPLACE PLACEHOLDER WITH YOUR OWN SCREENSHOT!");
    return;
  }
  document.getElementById("lightboxImg").src = img.src;
  document.getElementById("lightbox").classList.add("open");
}
function closeLightbox() {
  document.getElementById("lightbox").classList.remove("open");
}
function addShot(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const card = document.createElement("div");
    card.className = "shot-card";
    card.onclick = () => openLightbox(card);
    const img = document.createElement("img");
    img.src = e.target.result;
    img.style = "width:100%;height:100%;object-fit:cover;";
    const ov = document.createElement("div");
    ov.className = "shot-overlay";
    ov.innerHTML = "<span>🔍 VIEW</span>";
    card.appendChild(img);
    card.appendChild(ov);
    const grid = document.getElementById("shotsGrid");
    grid.insertBefore(card, grid.lastElementChild);
    showToast("📸 SCREENSHOT ADDED!");
    coins += 5;
    updateCoins();
    spawnParticles(window.innerWidth / 2, window.innerHeight / 2, [
      "📸",
      "⭐",
      "✨",
    ]);
  };
  reader.readAsDataURL(file);
}

// ══════════════════════════════
//  LEADERBOARD
// ══════════════════════════════
const medals = ["🥇", "🥈", "🥉"];
function renderLB() {
  const filtered =
    currentTab === "all"
      ? scores
      : scores.filter((s) => s.game === currentTab);
  const sorted = [...filtered].sort((a, b) => b.score - a.score);
  const body = document.getElementById("lbBody");
  if (!body) return;
  body.innerHTML = "";
  sorted.forEach((s, i) => {
    const row = document.createElement("div");
    row.className = "lb-row" + (s.me ? " lb-me" : "");
    const gameColor =
      s.game === "roblox"
        ? "#ff4444"
        : s.game === "fortnite"
          ? "#ffe040"
          : "#2ecc40";
    row.innerHTML = `
<div class="lb-rank ${i < 3 ? "rank-" + (i + 1) : ""}">${i < 3 ? medals[i] : i + 1}</div>
<div class="lb-name"><span class="lb-badge">${s.game === "roblox" ? "🟥" : s.game === "fortnite" ? "⚡" : "⛏"}</span>${s.name}${s.me ? " 👑" : ""}</div>
<div class="lb-score">${s.score.toLocaleString()}</div>
<div class="lb-game" style="color:${gameColor}">${s.game.toUpperCase()}</div>`;
    body.appendChild(row);
  });
}
function switchTab(tab, btn) {
  currentTab = tab;
  document
    .querySelectorAll(".lb-tab")
    .forEach((t) => t.classList.remove("active"));
  btn.classList.add("active");
  renderLB();
}
function openAddScore() {
  document.getElementById("scoreModal").classList.add("open");
}
function addScore() {
  const name = document.getElementById("scoreName").value.trim();
  const val = parseInt(document.getElementById("scoreVal").value);
  const game = document
    .getElementById("scoreGame")
    .value.trim()
    .toLowerCase();
  if (!name || !val) {
    showToast("⚠ FILL IN NAME + SCORE!");
    return;
  }
  const g = game.includes("roblox")
    ? "roblox"
    : game.includes("fort")
      ? "fortnite"
      : "minecraft";
  scores.push({ name, score: val, game: g, me: false });
  renderLB();
  closeModal("scoreModal");
  ["scoreName", "scoreVal", "scoreGame"].forEach(
    (id) => (document.getElementById(id).value = ""),
  );
  showToast("🏆 SCORE ADDED!");
  coins += 15;
  updateCoins();
}

// ══════════════════════════════
//  COIN KNIGHT MINI GAME
// ══════════════════════════════
const canvas = document.getElementById("gameCanvas");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let gameRunning = false,
    gameScore = 0,
    gameLevel = 1,
    gameTime = 30,
    bestScore = 0;
  let items = [],
    gameInterval,
    timerInterval;

  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight || 320;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const ITEM_TYPES = [
    { type: "coin", emoji: "🪙", points: 10, size: 36, speed: 1 },
    { type: "coin", emoji: "🪙", points: 10, size: 36, speed: 1 },
    { type: "coin", emoji: "🪙", points: 10, size: 36, speed: 1 },
    { type: "star", emoji: "⭐", points: 25, size: 32, speed: 1.4 },
    { type: "gem", emoji: "💎", points: 50, size: 30, speed: 1.8 },
    { type: "bomb", emoji: "💣", points: -30, size: 34, speed: 1.2 },
    { type: "heart", emoji: "❤️", points: 40, size: 32, speed: 1.6 },
  ];

  function spawnItem() {
    if (!gameRunning) return;
    const t = ITEM_TYPES[Math.floor(Math.random() * ITEM_TYPES.length)];
    const margin = 40;
    items.push({
      ...t,
      x: margin + Math.random() * (canvas.width - margin * 2),
      y: margin + Math.random() * (canvas.height - margin * 2),
      born: Date.now(),
      life: 1500 + Math.random() * 1000 - (gameLevel - 1) * 100,
      pulse: Math.random() * Math.PI * 2,
    });
  }

  function drawItems() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // draw bg grid
    ctx.strokeStyle = "rgba(46,204,64,0.06)";
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 32) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 32) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    const now = Date.now();
    items = items.filter((it) => {
      const age = now - it.born;
      const frac = age / it.life;
      if (frac >= 1) return false;
      const pulse = Math.sin(now / 200 + it.pulse) * 3;
      const alpha =
        frac < 0.2 ? frac / 0.2 : frac > 0.75 ? (1 - frac) / 0.25 : 1;
      const scale = 1 + (1 - frac) * 0.3 + pulse * 0.02;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(it.x, it.y);
      ctx.scale(scale, scale);
      // shrinking ring
      ctx.beginPath();
      ctx.arc(0, 0, (it.size / 2 + 8) * (1 - frac), 0, Math.PI * 2);
      ctx.strokeStyle =
        it.type === "bomb" ? "rgba(255,80,80,0.4)" : "rgba(255,224,64,0.3)";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.font = `${it.size}px serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(it.emoji, 0, 0);
      ctx.restore();
      return true;
    });
  }

  function gameLoop() {
    if (gameRunning) drawItems();
  }

  function startGame() {
    if (gameRunning) {
      clearInterval(gameInterval);
      clearInterval(timerInterval);
    }
    items = [];
    gameScore = 0;
    gameLevel = 1;
    gameTime = 30;
    gameRunning = true;
    document.getElementById("gameOver").classList.remove("show");
    document.getElementById("gScore").textContent = "0";
    document.getElementById("gLevel").textContent = "1";
    document.getElementById("gTime").textContent = "30";
    document.getElementById("startBtn").textContent = "↺ RESTART";

    gameInterval = setInterval(
      () => {
        if (gameRunning) {
          spawnItem();
          if (Math.random() < 0.15) spawnItem(); // double spawn chance
          drawItems();
        }
      },
      Math.max(400, 700 - (gameLevel - 1) * 50),
    );

    timerInterval = setInterval(() => {
      if (!gameRunning) return;
      gameTime--;
      document.getElementById("gTime").textContent = gameTime;
      if (gameTime <= 0) endGame();
      // level up every 10s
      const newLevel = Math.floor((30 - gameTime) / 8) + 1;
      if (newLevel !== gameLevel) {
        gameLevel = newLevel;
        document.getElementById("gLevel").textContent = gameLevel;
        showToast("⬆ LEVEL " + gameLevel + "!");
      }
    }, 1000);

    requestAnimationFrame(function loop() {
      drawItems();
      if (gameRunning) requestAnimationFrame(loop);
    });
  }

  function endGame() {
    gameRunning = false;
    clearInterval(gameInterval);
    clearInterval(timerInterval);
    if (gameScore > bestScore) {
      bestScore = gameScore;
      document.getElementById("gBest").textContent = bestScore;
    }
    document.getElementById("finalScore").textContent =
      "YOUR SCORE: " + gameScore;
    document.getElementById("gameOver").classList.add("show");
    coins += Math.floor(gameScore / 10);
    updateCoins();
    showToast("🏆 GAME OVER! SCORE: " + gameScore);
  }

  canvas.addEventListener("click", (e) => {
    if (!gameRunning) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left,
      my = e.clientY - rect.top;
    let hit = false;
    items = items.filter((it) => {
      const dx = mx - it.x,
        dy = my - it.y;
      if (Math.sqrt(dx * dx + dy * dy) < it.size / 2 + 8) {
        gameScore += it.points;
        if (gameScore < 0) gameScore = 0;
        document.getElementById("gScore").textContent = gameScore;
        coins += it.type === "bomb" ? 0 : Math.floor(it.points / 5);
        updateCoins();
        // score popup
        const pop = document.createElement("div");
        pop.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;font-family:var(--pixel);font-size:12px;color:${it.points < 0 ? "#ff4444" : "#ffe040"};pointer-events:none;z-index:9999;text-shadow:0 0 8px currentColor;transition:all .6s ease-out;`;
        pop.textContent = (it.points > 0 ? "+" : "") + it.points;
        document.body.appendChild(pop);
        requestAnimationFrame(() => {
          pop.style.transform = "translateY(-50px)";
          pop.style.opacity = "0";
        });
        setTimeout(() => pop.remove(), 650);
        hit = true;
        return false;
      }
      return true;
    });
    if (hit) spawnParticles(e.clientX, e.clientY, ["✨", "💫", "⭐"]);
  });

  // initial canvas draw
  drawItems();
}

// ══════════════════════════════
//  SCROLL REVEAL
// ══════════════════════════════
const revEls = document.querySelectorAll(".reveal");
const revObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    });
  },
  { threshold: 0.1 },
);
revEls.forEach((el) => revObs.observe(el));

// ══════════════════════════════
//  MOBILE NAV
// ══════════════════════════════
function checkMobileNav() {
  const btn = document.getElementById("mobileMenuBtn");
  const links = document.querySelector(".nav-links");
  if (!btn || !links) return;
  if (window.innerWidth <= 600) {
    btn.style.display = "block";
    links.style.display = "none";
  } else {
    btn.style.display = "none";
    links.style.display = "flex";
    const mobileNav = document.getElementById("mobileNav");
    if (mobileNav) mobileNav.style.display = "none";
  }
}
function toggleMobileMenu() {
  const nav = document.getElementById("mobileNav");
  if (nav) nav.style.display = nav.style.display === "flex" ? "none" : "flex";
}
function closeMobileMenu() {
  const mobileNav = document.getElementById("mobileNav");
  if (mobileNav) mobileNav.style.display = "none";
}

// Initial calls
renderLB();
checkMobileNav();
window.addEventListener("resize", checkMobileNav);

// Expose functions to window for HTML onclick handlers
window.dismissIntro = dismissIntro;
window.openAddVideo = openAddVideo;
window.closeModal = closeModal;
window.addVideo = addVideo;
window.closeLightbox = closeLightbox;
window.addShot = addShot;
window.switchTab = switchTab;
window.openAddScore = openAddScore;
window.addScore = addScore;
window.startGame = startGame;
window.toggleMobileMenu = toggleMobileMenu;
window.closeMobileMenu = closeMobileMenu;
window.openLightbox = openLightbox;
window.openVideo = openVideo;
