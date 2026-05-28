/* =============================================================================
   POSING GLOW LIBRARY — Front-end script

   Responsibilities:
     1. renderGrid()  — build the album cards from `releases` (data.js)
     2. sizeCards()   — set each card's --cover-size so cover + caption ≈ 90vh
     3. mobile menu   — open/close the dropdown when MENU is tapped
     4. sticky header — hide on scroll down, show on scroll up

   You should not need to edit this file to update content. Add new albums in
   `data.js`. Visual tweaks live in `style-hybrid.css`.
   ============================================================================= */

(function () {

  /* ── Config ──────────────────────────────────────────────────────────────── */

  const CARD_HEIGHT_RATIO   = 0.90;   // card = 90% of viewport height (matches CSS)
  const MAX_COVER_DESKTOP   = 0.60;   // cover capped at 60vw on desktop
  const MAX_COVER_MOBILE    = 0.85;   // cover capped at 85vw on mobile
  const MIN_COVER           = 80;     // smallest cover, in px
  const COVER_TO_TEXT_GAP   = 16;     // px (.card-body margin-top)
  const MOBILE_BREAKPOINT   = 600;    // matches the CSS @media (max-width: 600px)

  // Fallback descriptions, used only when a release has no `description` field.
  const FALLBACK_DESCRIPTIONS = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  ];


  /* ── DOM references ──────────────────────────────────────────────────────── */

  const grid       = document.getElementById("grid");
  const header     = document.querySelector("header");
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");


  /* ── 1. Render the album cards ───────────────────────────────────────────── */

  function renderGrid() {
    grid.className = "view-grid";

    releases.forEach((release, idx) => {
      const card = document.createElement("article");
      card.className = "card";

      card.appendChild(buildCover(release));
      card.appendChild(buildBody(release, idx));

      grid.appendChild(card);
    });
  }

  function buildCover(release) {
    const link = document.createElement("a");
    link.className = "card-cover";
    link.href      = release.downloadUrl;
    link.target    = "_blank";
    link.rel       = "noopener noreferrer";
    link.setAttribute("aria-label", `Download ${release.title}`);

    if (release.cover) {
      const img = document.createElement("img");
      img.src     = release.cover;
      img.alt     = `${release.title} — ${release.artist}`;
      img.loading = "lazy";
      link.appendChild(img);
    } else {
      const placeholder = document.createElement("div");
      placeholder.className = "card-cover-placeholder";
      const label = document.createElement("span");
      label.textContent = release.title;
      placeholder.appendChild(label);
      link.appendChild(placeholder);
    }

    return link;
  }

  function buildBody(release, idx) {
    const body = document.createElement("div");
    body.className = "card-body";

    // Byline: "Title by Artist"
    const byline = document.createElement("p");
    byline.className = "card-byline";

    const title = document.createElement("em");
    title.className   = "card-title";
    title.textContent = release.title;
    byline.appendChild(title);

    byline.appendChild(document.createTextNode(" by "));

    const artist = document.createElement("span");
    artist.className   = "card-artist";
    artist.textContent = release.artist;
    byline.appendChild(artist);

    body.appendChild(byline);

    // Caption: description + Download link
    const caption = document.createElement("p");
    caption.className = "card-caption";

    const description = release.description
      || FALLBACK_DESCRIPTIONS[idx % FALLBACK_DESCRIPTIONS.length];
    caption.appendChild(document.createTextNode(description + " "));

    const download = document.createElement("a");
    download.className   = "card-download";
    download.href        = release.downloadUrl;
    download.target      = "_blank";
    download.rel         = "noopener noreferrer";
    download.textContent = "Download here.";
    caption.appendChild(download);

    body.appendChild(caption);
    return body;
  }


  /* ── 2. Size each card's cover so cover + caption ≈ 90vh ────────────────── */

  function sizeCards() {
    const isMobile      = window.innerWidth <= MOBILE_BREAKPOINT;
    const cardHeight    = CARD_HEIGHT_RATIO * window.innerHeight;
    const maxCoverWidth = (isMobile ? MAX_COVER_MOBILE : MAX_COVER_DESKTOP) * window.innerWidth;

    document.querySelectorAll(".card").forEach((card) => {
      const body = card.querySelector(".card-body");
      if (!body) return;

      // Iterate a few times: changing --cover-size can shift line wrapping
      // in the body, which then changes the body's height, etc.
      for (let i = 0; i < 4; i++) {
        const textHeight = body.getBoundingClientRect().height;
        let coverSize    = cardHeight - textHeight - COVER_TO_TEXT_GAP;

        coverSize = Math.min(coverSize, maxCoverWidth);
        coverSize = Math.max(coverSize, MIN_COVER);

        card.style.setProperty("--cover-size", coverSize + "px");
      }
    });
  }


  /* ── 3. Mobile menu toggle ──────────────────────────────────────────────── */

  function initMobileMenu() {
    if (!menuToggle || !mobileMenu) return;

    function setMenuOpen(open) {
      mobileMenu.classList.toggle("open", open);
      menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
      mobileMenu.setAttribute("aria-hidden",  open ? "false" : "true");
      menuToggle.textContent = open ? "CLOSE" : "MENU";
    }

    menuToggle.addEventListener("click", () => {
      setMenuOpen(!mobileMenu.classList.contains("open"));
    });

    mobileMenu.querySelectorAll(".mobile-menu-link").forEach((link) => {
      link.addEventListener("click", () => setMenuOpen(false));
    });
  }


  /* ── 4. Sticky header hide-on-scroll-down ───────────────────────────────── */

  function initStickyHeader() {
    if (!header) return;

    let lastScrollY = window.scrollY;
    let ticking     = false;

    function update() {
      const y         = window.scrollY;
      const goingDown = y > lastScrollY;

      if (goingDown && y > 16) {
        header.classList.add("header--hidden");
      } else if (!goingDown) {
        header.classList.remove("header--hidden");
      }

      lastScrollY = y;
      ticking = false;
    }

    window.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }, { passive: true });

    update();
  }


  /* ── Boot ────────────────────────────────────────────────────────────────── */

  renderGrid();
  sizeCards();
  initMobileMenu();
  initStickyHeader();

  // Re-run cover sizing on layout-affecting events
  window.addEventListener("resize", sizeCards);
  window.addEventListener("load",   sizeCards);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(sizeCards);
  }

})();
