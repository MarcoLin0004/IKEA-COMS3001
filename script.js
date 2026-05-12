// Keep JavaScript focused on navigation and small progressive enhancements.
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("nav-open", isOpen);
  });

  navMenu.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      navMenu.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");
    }
  });
}

const currentFile = window.location.pathname.split("/").pop() || "index.html";
const currentPage = currentFile.replace(".html", "") || "index";

document.querySelectorAll("[data-page]").forEach((link) => {
  if (link.dataset.page === currentPage) {
    link.classList.add("active");
    link.setAttribute("aria-current", "page");
  }
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

const revealTargets = document.querySelectorAll(
  ".section, .feature-card, .link-card, .room-card, .step-card, .social-card, .visual-feature, .visual-tile, .gallery-item, .segment-grid article, .press-doc-summary article"
);

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealTargets.forEach((target) => {
    target.classList.add("reveal");
    revealObserver.observe(target);
  });
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}

const dropCards = [
  {
    platform: "Instagram Prompt",
    title: "Style a mini collector corner",
    text: "Use one shelf, three favourite objects, and one warm light source. Post a carousel showing the before, styling process, and final display.",
    tag: "#MyCollectorRoom",
    image: "linear-gradient(135deg, rgba(0, 88, 163, 0.72), rgba(255, 219, 0, 0.3)), url('assets/room-ideas-overview.png')",
    alt: "Mini collector shelf prompt preview",
  },
  {
    platform: "TikTok Challenge",
    title: "Show a desk-to-display glow-up",
    text: "Film a quick transformation from everyday desk to collector-ready setup with storage, risers, cable control, and one personal object story.",
    tag: "#DeskToDisplay",
    image: "linear-gradient(135deg, rgba(255, 183, 213, 0.38), rgba(0, 88, 163, 0.45)), url('assets/campaign-overview.png')",
    alt: "Desk-to-display social challenge preview",
  },
  {
    platform: "Room Styling Tip",
    title: "Create a night shelf gallery",
    text: "Try soft light, grouped objects, and a calm colour palette. The goal is a bedside setup that feels personal without taking over the room.",
    tag: "#NightShelfGallery",
    image: "linear-gradient(135deg, rgba(16, 37, 61, 0.42), rgba(255, 219, 0, 0.32)), url('assets/totoro-theme-room.png')",
    alt: "Night shelf gallery prompt preview",
  },
  {
    platform: "Community Feature",
    title: "Pick of the week: colour story",
    text: "Featured rooms can be selected for strong use of colour, smart storage, clear display zones, and a setup that still feels liveable.",
    tag: "#FeaturedRoomDrop",
    image: "linear-gradient(135deg, rgba(184, 242, 230, 0.42), rgba(0, 88, 163, 0.48)), url('assets/sanrio-collection.png')",
    alt: "Community feature prompt preview",
  },
];

const promptButtons = document.querySelectorAll("[data-drop-card]");
const liveImage = document.querySelector("#live-card-image");
const livePlatform = document.querySelector("#live-card-platform");
const liveTitle = document.querySelector("#live-card-title");
const liveText = document.querySelector("#live-card-text");
const liveTag = document.querySelector("#live-card-tag");

function updateDropCard(index) {
  const card = dropCards[index];
  if (!card || !liveImage || !livePlatform || !liveTitle || !liveText || !liveTag) return;

  promptButtons.forEach((button) => {
    const isActive = button.dataset.dropCard === String(index);
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  liveImage.classList.add("is-changing");

  window.setTimeout(() => {
    livePlatform.textContent = card.platform;
    liveTitle.textContent = card.title;
    liveText.textContent = card.text;
    liveTag.textContent = card.tag;
    liveImage.style.backgroundImage = card.image;
    liveImage.setAttribute("aria-label", card.alt);
    liveImage.classList.remove("is-changing");
  }, 140);
}

promptButtons.forEach((button) => {
  button.addEventListener("click", () => {
    updateDropCard(Number(button.dataset.dropCard));
  });
});
