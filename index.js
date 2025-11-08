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

document.addEventListener('DOMContentLoaded', () => {
    const categoryButtons = document.querySelectorAll('.category-btn');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove 'active' class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));

            // Add 'active' class to the clicked button
            button.classList.add('active');

            // You can add more functionality here,
            // e.g., filtering content based on the active category.
            console.log(`Category clicked: ${button.textContent}`);
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {
    // Category Buttons Logic (remains the same)
    const categoryButtons = document.querySelectorAll('.category-btn');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            console.log(`Category clicked: ${button.textContent}`);
        });
    });

    // --- Video Slider Logic ---
    const videoTrackContainer = document.querySelector('.video-track-container');
    const videoItems = document.querySelectorAll('.video-item');
    // Start at the last item index for rightward scrolling so we can scroll back
    let currentIndex = 0; // Will represent the current "first" item in view

    if (videoTrackContainer && videoItems.length > 0) {
        const itemWidth = videoItems[0].offsetWidth; // Get the width of a single video item
        const gap = 20; // The gap defined in CSS between video items
        const itemAndGapWidth = itemWidth + gap;
        const maxScrollLeft = (videoItems.length - 1) * itemAndGapWidth; // Max scroll position

        // Initialize scroll position to the end to allow immediate rightward scroll
        // This makes the last few items visible initially.
        // For a more traditional "rightward" scroll, we might start at 0 and prepend elements.
        // For simple `scrollLeft` manipulation and continuous loop, it's easier to think
        // of it as decrementing the scroll position.

        // Let's refine the logic to simulate "slide right" more intuitively.
        // Instead of decrementing scrollLeft, we can shift items.
        // Or, if we want to stick to scrollLeft, we need to consider an "infinite" loop
        // where content is dynamically added/removed.

        // A simpler approach for "slide right" with `scrollLeft` is to
        // start at `maxScrollLeft` and decrement, then loop back.

        // Let's adjust for a smoother rightward loop:
        // 1. Duplicate content dynamically if we want a truly seamless rightward loop with scrollLeft.
        // 2. Or, just scroll from right-to-left (decreasing scrollLeft) and reset.

        // Option 3: Use array methods to shift elements for truly "rightward" animation
        // This will create a better visual effect for "content coming in from the left".
        const videoTrack = document.querySelector('.video-track');

        const slideRight = () => {
            // Get the last item
            const lastItem = videoTrack.lastElementChild;
            if (!lastItem) return;

            // Prepend the last item to the beginning of the track
            videoTrack.prepend(lastItem);

            // Temporarily set scrollLeft to move past the new first item
            videoTrackContainer.scrollLeft = itemAndGapWidth;

            // Animate scroll back to 0 to show the new item smoothly sliding in
            setTimeout(() => {
                videoTrackContainer.scrollLeft = 0;
            }, 50); // Small delay to allow initial scrollLeft to register
        };

        // Set an interval for automatic sliding
        let slideInterval = setInterval(slideRight, 4000); // Change video every 4 seconds

        // Optional: Pause auto-slide on hover
        videoTrackContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });

        videoTrackContainer.addEventListener('mouseleave', () => {
            clearInterval(slideInterval);
            slideInterval = setInterval(slideRight, 4000);
        });
    }
});
// Your existing JavaScript for category buttons will remain here.
document.addEventListener('DOMContentLoaded', () => {
    const categoryButtons = document.querySelectorAll('.category-btn');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            console.log(`Category clicked: ${button.textContent}`);
        });
    });

    // No JavaScript for video sliding needed for the continuous CSS marquee effect
});