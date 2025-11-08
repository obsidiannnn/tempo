document.addEventListener("DOMContentLoaded", () => {
  /* =========  FLOATING BACKGROUND PARTICLES  ========= */
  const canvas = document.getElementById("bg-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let w, h, particles;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      particles = Array.from({ length: 120 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.5 + 0.3,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      }));
    };

    const animateParticles = () => {
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
    };

    window.addEventListener("resize", resize);
    resize();
    animateParticles();
  }

  /* =========  HOVER VIDEO PLAY ON HEXAGONS  ========= */
  document.querySelectorAll(".hexagon").forEach((hex) => {
    const video = hex.querySelector("video");
    if (video) {
      hex.addEventListener("mouseenter", () => {
        video.currentTime = 0;
        video.play().catch(() => {});
      });
      hex.addEventListener("mouseleave", () => {
        video.pause();
      });
    }
  });

  /* =========  PARALLAX HEXAGON FLOATING  ========= */
  document.addEventListener("mousemove", (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.02;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.02;
    document.querySelectorAll(".hexagon-container").forEach((hex, i) => {
      const resistance = 1 / (i * 0.5 + 1);
      hex.style.transform = `translate(${moveX * resistance}px, ${
        moveY * resistance
      }px)`;
    });
  });

  /* =========  SMOOTH SCROLL REVEAL FOR HERO  ========= */
  const revealElements = document.querySelectorAll(
    ".hero-content, .story-form, .stepper-wrapper, .brand-title, .hero-content h1"
  );
  const reveal = () => {
    revealElements.forEach((el) => {
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    });
  };
  setTimeout(reveal, 100);

  /* =========  MAGNETIC BUTTON EFFECT  ========= */
  const btn = document.querySelector("#generate-btn");
  if (btn) {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = `translate(0,0)`;
    });
  }

  /* =========  VIDEO POPUP MODAL  ========= */
  const modal = document.getElementById("video-modal");
  if (modal) {
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
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.close();
      }
    });
  }

  /* =========  INTERACTIVE STEPPER  ========= */
  const steps = document.querySelectorAll(".step");
  if (steps.length > 0) {
    const progress = document.querySelector(".stepper-progress");
    const ball = document.querySelector(".stepper-ball");
    const dots = document.querySelectorAll(".dot");
    steps.forEach((step) => {
      step.addEventListener("click", () => {
        const index = parseInt(step.dataset.step, 10);
        steps.forEach((s) => s.classList.remove("active"));
        dots.forEach((d) => d.classList.remove("active"));
        step.classList.add("active");
        if (dots[index]) dots[index].classList.add("active");
        const percent = (index / (steps.length - 1)) * 100;
        progress.style.width = percent + "%";
        ball.style.left = percent + "%";
      });
    });
  }

  /* =========  VIDEO CAROUSEL LOGIC  ========= */
  const track = document.getElementById("carousel-track");
  if (track) {
    const progressFill = document.getElementById("video-progress-fill");
    const prevBtn = document.getElementById("carousel-prev-btn");
    const nextBtn = document.getElementById("carousel-next-btn");
    const categoryButtons = document.querySelectorAll(".category-btn");

    const videos = [
      {
        src: "https://assets.coverr.co/videos/mp4/Aesthetic-Lo-fi-Japan-Style-Animation.mp4",
        title: "Lo-fi Animation",
        category: "concept art",
      },
      {
        src: "https://assets.coverr.co/videos/mp4/Street-Racer.mp4",
        title: "Street Racer",
        category: "character design",
      },
      {
        src: "https://assets.mixkit.co/videos/preview/mixkit-a-logo-of-a-wolf-being-formed-by-ink-43393-large.mp4",
        title: "Ink Wolf",
        category: "logo design",
      },
      {
        src: "https://assets.coverr.co/videos/mp4/Rain-at-Night.mp4",
        title: "Rainy Night",
        category: "fashion design",
      },
      {
        src: "https://assets.coverr.co/videos/mp4/Synthwave-Scifi-Retro-Animation.mp4",
        title: "Retro Sci-Fi",
        category: "game assets",
      },
      {
        src: "https://assets.mixkit.co/videos/preview/mixkit-a-futuristic-city-42930-large.mp4",
        title: "Futuristic City",
        category: "architecture",
      },
    ];

    let currentVideoIndex = 0;
    const slideWidth = 320;
    const slideGap = 20;

    videos.forEach((videoData, index) => {
      const slide = document.createElement("div");
      slide.className = "video-slide";
      slide.dataset.index = index;

      const videoEl = document.createElement("video");
      videoEl.src = videoData.src;
      videoEl.muted = true;
      videoEl.playsInline = true;

      const overlay = document.createElement("div");
      overlay.className = "video-slide-overlay";
      overlay.innerHTML = `<h3>${videoData.title}</h3>`;

      slide.appendChild(videoEl);
      slide.appendChild(overlay);
      track.appendChild(slide);
    });

    const slides = document.querySelectorAll(".video-slide");

    function goToSlide(index) {
      const offset =
        track.parentElement.clientWidth / 2 -
        index * (slideWidth + slideGap) -
        slideWidth / 2;
      track.style.transform = `translateX(${offset}px)`;

      slides.forEach((slide, i) => {
        const video = slide.querySelector("video");
        if (i === index) {
          slide.classList.add("active-slide");
          video.currentTime = 0;
          video.play().catch((e) => {});

          video.onended = () => goToSlide((index + 1) % videos.length);
          video.ontimeupdate = () => {
            const progress = (video.currentTime / video.duration) * 100;
            if (progressFill) progressFill.style.width = `${progress}%`;
          };
        } else {
          slide.classList.remove("active-slide");
          video.pause();
          video.onended = null;
          video.ontimeupdate = null;
        }
      });
      currentVideoIndex = index;
    }

    nextBtn.addEventListener("click", () =>
      goToSlide((currentVideoIndex + 1) % videos.length)
    );
    prevBtn.addEventListener("click", () =>
      goToSlide((currentVideoIndex - 1 + videos.length) % videos.length)
    );

    slides.forEach((slide) => {
      slide.addEventListener("click", () =>
        goToSlide(parseInt(slide.dataset.index, 10))
      );
    });

    categoryButtons.forEach((button) => {
      button.addEventListener("click", () => {
        categoryButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
        const category = button.textContent.toLowerCase().trim();
        const videoIndex = videos.findIndex((v) => v.category === category);
        if (videoIndex !== -1) goToSlide(videoIndex);
      });
    });

    const initialActiveCategory = document.querySelector(
      ".category-btn.active"
    );
    let initialIndex = 0;
    if (initialActiveCategory) {
      const category = initialActiveCategory.textContent.toLowerCase().trim();
      const foundIndex = videos.findIndex((v) => v.category === category);
      if (foundIndex !== -1) initialIndex = foundIndex;
    }
    goToSlide(initialIndex);
  }
});
