/* =========  FLOATING BACKGROUND PARTICLES  ========= */
const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");
let w, h, particles;

function resize() {
  w = canvas.width = innerWidth;
  h = canvas.height = innerHeight;
  particles = Array.from({ length: 120 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.5 + 0.3,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35
  }));
}

function animateParticles() {
  ctx.clearRect(0, 0, w, h);
  particles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > w) p.vx *= -1;
    if (p.y < 0 || p.y > h) p.vy *= -1;
    ctx.fillStyle = "#b8d8ff";
    ctx.fillRect(p.x, p.y, p.r, p.r);
  });
  requestAnimationFrame(animateParticles);
}

addEventListener("resize", resize);
resize();
animateParticles();


/* =========  HOVER → VIDEO PLAY  ========= */
document.querySelectorAll(".hexagon").forEach((hex) => {
  const video = hex.querySelector("video");

  hex.addEventListener("mouseenter", () => {
    video.currentTime = 0;
    video.play().catch(() => {});
  });

  hex.addEventListener("mouseleave", () => {
    video.pause();
  });
});


/* =========  PARALLAX HEX FLOATING (mouse moves background depth)  ========= */
document.addEventListener("mousemove", (e) => {
  const moveX = (e.clientX - window.innerWidth / 2) * 0.02;
  const moveY = (e.clientY - window.innerHeight / 2) * 0.02;

  document.querySelectorAll(".hexagon-container").forEach((hex, i) => {
    hex.style.transform = `translate(${moveX / (i + 1)}px, ${moveY / (i + 1)}px)`;
  });
});


/* =========  SMOOTH SCROLL REVEAL  ========= */
const revealElements = document.querySelectorAll(".hero-content, .story-form, .stepper, .brand-title, h1");

function reveal() {
  revealElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    }
  });
}
window.addEventListener("scroll", reveal);
reveal();


/* =========  MAGNETIC BUTTON EFFECT  ========= */
const btn = document.querySelector("#generate-btn");

btn.addEventListener("mousemove", (e) => {
  const rect = btn.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
});

btn.addEventListener("mouseleave", () => {
  btn.style.transform = `translate(0,0)`;
});


/* =========  VIDEO POPUP MODAL  ========= */
const modal = document.getElementById("video-modal");
const modalVideo = document.getElementById("modal-video");
const closeModal = document.getElementById("close-modal");

document.querySelectorAll(".hexagon").forEach((hex) => {
  hex.addEventListener("click", () => {
    modalVideo.src = hex.dataset.video;
    modal.showModal();
    modalVideo.play();
  });
});

closeModal.onclick = () => {
  modalVideo.pause();
  modalVideo.src = "";
  modal.close();
};
/* Stepper control */
/* Interactive Stepper */
const steps = document.querySelectorAll(".step");
const progress = document.querySelector(".stepper-progress");
const ball = document.querySelector(".stepper-ball");
const dots = document.querySelectorAll(".dot");

steps.forEach(step => {
  step.addEventListener("click", () => {
    const index = step.dataset.step;

    steps.forEach(s => s.classList.remove("active"));
    dots.forEach(d => d.classList.remove("active"));

    step.classList.add("active");
    dots[index].classList.add("active");

    const percent = (index / 4) * 100;
    progress.style.width = percent + "%";
    ball.style.left = percent + "%";
  });
});

