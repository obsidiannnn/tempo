/* Background particle animation */
const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");
let w, h, dots;
function resize() {
  w = canvas.width = innerWidth;
  h = canvas.height = innerHeight;
  dots = Array.from({ length: 100 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
  }));
}
function draw() {
  ctx.clearRect(0, 0, w, h);
  dots.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > w) p.vx *= -1;
    if (p.y < 0 || p.y > h) p.vy *= -1;
    ctx.fillStyle = "#b8d8ff";
    ctx.fillRect(p.x, p.y, 2, 2);
  });
  requestAnimationFrame(draw);
}
addEventListener("resize", resize);
resize();
draw();

/* Stepper */
const scrub = document.getElementById("scrub");
const fill = document.getElementById("fill");
scrub.addEventListener(
  "input",
  () => (fill.style.width = (scrub.value / 4) * 100 + "%")
);

/* Popup Video Player */
const dialog = document.getElementById("player");
const pv = document.getElementById("pv");
document.querySelectorAll(".hex").forEach((card) => {
  card.onclick = () => {
    pv.src = card.dataset.video;
    dialog.showModal();
    pv.play();
  };
});
document.getElementById("close").onclick = () => {
  pv.pause();
  pv.src = "";
  dialog.close();
};

/* Demo Generate Button */
document.getElementById("gen").onclick = () => alert("Connect your API here.");
