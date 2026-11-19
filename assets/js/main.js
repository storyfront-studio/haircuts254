// Haircuts254: Storyfront concept preview
const WA_NUMBER = "254724993394";

// mobile nav
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
const closeBtn = document.querySelector(".nav-close");
if (toggle && nav) {
  toggle.addEventListener("click", () => nav.classList.add("open"));
  closeBtn && closeBtn.addEventListener("click", () => nav.classList.remove("open"));
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));
}

// scroll reveal (respects reduced motion)
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!prefersReduced && "IntersectionObserver" in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));
} else {
  document.querySelectorAll(".reveal").forEach(el => el.classList.add("in"));
}

// booking form → structured WhatsApp message
const form = document.getElementById("booking-form");
if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    const v = id => (document.getElementById(id) || {}).value || "";
    const lines = [
      "Hello Haircuts254! I'd like to book a haircut.",
      "Name: " + v("bk-name"),
      "Service: " + v("bk-service"),
      "Preferred day: " + v("bk-date"),
      "Preferred time: " + v("bk-time"),
    ];
    const notes = v("bk-notes").trim();
    if (notes) lines.push("Notes: " + notes);
    const url = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(lines.join("\n"));
    window.open(url, "_blank", "noopener");
  });
}

// current year
document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());

(function () {
  const q = new URLSearchParams(location.search), nz = x => x.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/&/g, 'and').replace(/'/g, '');
  const s = document.getElementById('bk-service'), v = q.get('style');
  if (s && v) for (const o of s.options) if (nz(o.text).startsWith(nz(v)) || nz(o.text).includes(nz(v))) { s.value = o.value || o.text; break; }
  const d = document.getElementById('bk-date'); if (d) d.min = new Date().toISOString().slice(0, 10);
})();
