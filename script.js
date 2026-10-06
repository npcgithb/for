/* =====================================================
   EDIT ONLY THE THREE SECTIONS BELOW
   (WISH SCREEN, PHOTOS, FINAL SCREEN)
   ===================================================== */

// ---------- 1. WISH SCREEN (first screen) ----------
const WISH = {
  title: "Happy Birthday 𝐍𝐈𝐉𝐇𝐔𝐌🤍",
  message: "Many many happy returns of the day✨"
};

// ---------- 2. PHOTOS ----------
// To add a photo: copy one block { image: "...", text: "..." },
// paste it after the last one, and change the number and text.
// Don't forget the comma after each closing brace }
const PHOTOS = [
  // PHOTO 1 TEXT
  {
    image: "images/1.jpg",
    text: "The very first time I saw your post and thought it's a fake ID or You're from India"
  },
  // PHOTO 2 TEXT
  {
    image: "images/2.jpg",
    text: "The prettiest one, like the ocean🌊💙"
  },
  // PHOTO 3 TEXT
  {
    image: "images/3.jpg",
    text: "The cutest one fr😭🫶🏻"
  },
  // PHOTO 4 TEXT  (remove the // at the start of the lines below to use it)
   {
     image: "images/4.jpg",
     text: "Another pretty one..💫"
   },
  // PHOTO 5 TEXT
  {
    image: "images/5.jpg",
    text: "Shining like a moon🌕💖"
  },
  // PHOTO 6 TEXT
  {
    image: "images/6.jpg",
    text: "Prettiest, cutest, sweetest, finest.... All in one💯💗 THE BEST"
  },
];

// ---------- 3. FINAL SCREEN (last screen) ----------
const FINAL = {
  title: "Thanks for spending your valuable time and energy to see a Fairy",
  message: "Have a great day. Always keep that sweet smile on your face. Again, Happy Birthday Ms. Fake ID🤍🩵"
};

/* =====================================================
   CODE BELOW RUNS THE WEBSITE — no need to edit
   ===================================================== */

const stage = document.getElementById("stage");
const bar = document.getElementById("progressBar");

// Order: wish -> all photos -> final
const slides = [
  { type: "wish" },
  ...PHOTOS.map(p => ({ type: "photo", ...p })),
  { type: "final" }
];

let current = 0;
let busy = false;

// Small helper to create an element
function el(tag, className, text) {
  const e = document.createElement(tag);
  if (className) e.className = className;
  if (text !== undefined) e.textContent = text;
  return e;
}

function nextButton(isLast) {
  const wrap = el("div", "next-wrap fade d3");
  const btn = el("button", "next-btn");
  btn.setAttribute("aria-label", isLast ? "Replay" : "Next");
  btn.innerHTML = isLast
    ? "↺"
    : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  btn.addEventListener("click", () => goTo(isLast ? 0 : current + 1));
  wrap.appendChild(btn);
  return wrap;
}

function buildTextSlide(data, extraClass, isLast) {
  const s = el("section", "slide " + extraClass);
  s.append(
    el("h1", "title fade d1", data.title),
    el("div", "line fade d2"),
    el("p", "message fade d2", data.message),
    nextButton(isLast)
  );
  return s;
}

function buildPhotoSlide(data) {
  const s = el("section", "slide");
  const wrap = el("div", "photo-wrap");
  const img = el("img");
  img.src = data.image;
  img.alt = "";
  img.addEventListener("error", () => {      // photo missing? show a hint
    img.remove();
    wrap.appendChild(el("div", "no-photo-hint", "Add your photo: " + data.image));
  });
  wrap.appendChild(img);

  const text = el("div", "photo-text fade d2", data.text);
  s.append(wrap, text, nextButton(false));
  return s;
}

function buildSparkles(slide) {
  for (let i = 0; i < 14; i++) {
    const sp = el("span", "spark");
    sp.style.left = Math.random() * 100 + "%";
    sp.style.animationDuration = 6 + Math.random() * 6 + "s";
    sp.style.animationDelay = Math.random() * 6 + "s";
    slide.appendChild(sp);
  }
}

function buildSlide(i) {
  const data = slides[i];
  if (data.type === "wish") return buildTextSlide(WISH, "wish", false);
  if (data.type === "photo") return buildPhotoSlide(data);
  const s = buildTextSlide(FINAL, "final", true);
  buildSparkles(s);
  return s;
}

function updateProgress() {
  bar.style.width = (current / (slides.length - 1)) * 100 + "%";
}

function goTo(i) {
  if (busy) return;
  busy = true;
  stage.classList.add("leaving");            // fade out
  setTimeout(() => {
    current = i;
    stage.replaceChildren(buildSlide(i));    // swap slide
    updateProgress();
    requestAnimationFrame(() => stage.classList.remove("leaving")); // fade in
    busy = false;
  }, 450);
}

// Start
stage.appendChild(buildSlide(0));
updateProgress();