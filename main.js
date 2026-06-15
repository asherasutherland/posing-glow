/* =============================================================================
   POSING GLOW — Front-end script

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

  const grid        = document.getElementById("grid");
  const gridView    = document.getElementById("grid-view");
  const header      = document.querySelector("header");
  const menuToggle  = document.querySelector(".menu-toggle");
  const mobileMenu  = document.querySelector(".mobile-menu");
  const modal       = document.getElementById("album-modal");
  const modalDialog = modal ? modal.querySelector(".album-modal-dialog") : null;


  /* ── 1. Render the album cards ───────────────────────────────────────────── */

  function renderGrid() {
    grid.className = "view-grid";

    releases.forEach((release, idx) => {
      const card = document.createElement("article");
      card.className = "card";

      const datestamp = buildDatestamp(release);
      if (datestamp) card.appendChild(datestamp);
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

  // Datestamp line shown above the cover, aligned to the cover's left edge.
  function buildDatestamp(release) {
    const stamp = formatDate(release);
    if (!stamp) return null;
    const date = document.createElement("p");
    date.className   = "card-datestamp";
    date.textContent = `Posted on ${stamp}`;
    return date;
  }

  // Four bracket colors, rotated in order across every bracket instance on the page.
  const BRACKET_COLORS = [
    [  0, 255,255],   // cyan
    [255,   0,255],   // magenta
    [255, 255,  0],   // yellow
  ];
  let bracketColorIdx = 0;

  function nextBracketColor() {
    const [r, g, b] = BRACKET_COLORS[bracketColorIdx % BRACKET_COLORS.length];
    bracketColorIdx++;
    return {
      on:  `rgba(${r}, ${g}, ${b}, 0.5)`,
      off: `rgba(${r}, ${g}, ${b}, 0)`,
    };
  }

  function applyBracketColor(color, ...els) {
    els.forEach((el) => {
      el.style.setProperty("--bk-on",  color.on);
      el.style.setProperty("--bk-off", color.off);
    });
  }

  // "2026-05-23" → "2026.05.23"; falls back to the year, then "".
  function formatDate(release) {
    if (release.releaseDate) return release.releaseDate.replace(/-/g, ".");
    if (release.year)        return release.year;
    return "";
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

    byline.appendChild(document.createTextNode(", "));

    const artist = document.createElement("span");
    artist.className   = "card-artist";
    artist.textContent = release.artist;
    byline.appendChild(artist);

    body.appendChild(byline);

    appendCaption(body, release, idx);
    return body;
  }

  // Caption: story paragraph (italic) + optional "Recorded on…" paragraph
  // (mono DotumChe). The Download link is appended to the last paragraph.
  function appendCaption(container, release, idx) {
    const story = document.createElement("p");
    story.className = "caption-story";

    // Artist's written quote — bracketed by gradient highlight swipes on the
    // first and last words. The trailing "– Artist." attribution sits outside
    // the bracket (un-highlighted).
    const quote = release.description
      || FALLBACK_DESCRIPTIONS[idx % FALLBACK_DESCRIPTIONS.length];

    let body = quote, attribution = "";
    const dash = quote.lastIndexOf("–");
    if (dash !== -1) {
      body        = quote.slice(0, dash).trim();          // quoted content
      attribution = quote.slice(dash + 1).trim()          // "Artist." → "Artist"
                         .replace(/\.$/, "");
    }

    const words = body.split(" ");
    const n = 3;                       // words wrapped at each end (swipe is fixed-length)

    const qColor = nextBracketColor();
    const quoteWrap = document.createElement("span");   // italic wrapper for the artist quote
    quoteWrap.className = "quote";
    if (words.length <= n * 2) {
      const mark = document.createElement("span");
      mark.className   = "quote-start";
      mark.textContent = "“" + body + "”";
      applyBracketColor(qColor, mark);
      quoteWrap.appendChild(mark);
    } else {
      const start = document.createElement("span");
      start.className   = "quote-start";
      start.textContent = "“" + words.slice(0, n).join(" ");

      const end = document.createElement("span");
      end.className   = "quote-end";
      end.textContent = words.slice(-n).join(" ") + "”";

      applyBracketColor(qColor, start, end);
      quoteWrap.appendChild(start);
      quoteWrap.appendChild(document.createTextNode(
        " " + words.slice(n, words.length - n).join(" ") + " "
      ));
      quoteWrap.appendChild(end);
    }
    story.appendChild(quoteWrap);

    if (attribution) {
      story.appendChild(document.createTextNode(" (" + attribution + ")."));
    }

    // Gear / credits continues inline, bracketed by its own colour swipes
    if (release.recorded) {
      story.appendChild(document.createTextNode(" "));
      const gColor = nextBracketColor();
      const gw = release.recorded.split(" ");
      const gn = 3;
      if (gw.length <= gn * 2) {
        const m = document.createElement("span");
        m.className   = "gear-start";
        m.textContent = release.recorded;
        applyBracketColor(gColor, m);
        story.appendChild(m);
      } else {
        const gs = document.createElement("span");
        gs.className   = "gear-start";
        gs.textContent = gw.slice(0, gn).join(" ");

        const ge = document.createElement("span");
        ge.className   = "gear-end";
        ge.textContent = gw.slice(-gn).join(" ");

        applyBracketColor(gColor, gs, ge);
        story.appendChild(gs);
        story.appendChild(document.createTextNode(
          " " + gw.slice(gn, gw.length - gn).join(" ") + " "
        ));
        story.appendChild(ge);
      }
    }

    story.appendChild(document.createTextNode(" "));
    const download = document.createElement("a");
    download.className   = "card-download";
    download.href        = release.downloadUrl;
    download.target      = "_blank";
    download.rel         = "noopener noreferrer";
    download.textContent = "Download here.";
    story.appendChild(download);

    container.appendChild(story);
  }


  /* ── 2. Size each card's cover so cover + caption ≈ 90vh ────────────────── */

  function sizeCards() {
    const isMobile      = window.innerWidth <= MOBILE_BREAKPOINT;
    const cardHeight    = CARD_HEIGHT_RATIO * window.innerHeight;
    const maxCoverWidth = (isMobile ? MAX_COVER_MOBILE : MAX_COVER_DESKTOP) * window.innerWidth;

    document.querySelectorAll(".card").forEach((card) => {
      const body = card.querySelector(".card-body");
      if (!body) return;

      const datestamp   = card.querySelector(".card-datestamp");
      const dateHeight  = datestamp ? datestamp.getBoundingClientRect().height : 0;

      // Iterate a few times: changing --cover-size can shift line wrapping
      // in the body, which then changes the body's height, etc.
      for (let i = 0; i < 4; i++) {
        const textHeight = body.getBoundingClientRect().height;
        let coverSize    = cardHeight - textHeight - dateHeight - COVER_TO_TEXT_GAP;

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
      menuToggle.textContent = open ? "Close" : "Menu";
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


  /* ── About link → scroll to the very bottom of the page ─────────────────── */

  function initAboutScroll() {
    document.querySelectorAll('a[href="#about"]').forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      });
    });
  }


  /* ── About-copy bracket: colour the highlighted phrase from the palette ─── */

  function initAboutBracket() {
    const starts = document.querySelectorAll(".end-note .quote-start");
    const ends   = document.querySelectorAll(".end-note .quote-end");
    const n = Math.min(starts.length, ends.length);
    for (let i = 0; i < n; i++) {
      applyBracketColor(nextBracketColor(), starts[i], ends[i]);
    }
  }


  /* ── Site-name rotator: cycle the wordmark every few seconds ────────────── */

  function initSiteNameRotator() {
    const el = document.querySelector(".site-name");
    if (!el) return;

    // [text, useAltStyle (Clarendon)] — toggled on an interval.
    const states = [
      { text: "Posing Glow",        alt: false },   // League Gothic 39.6px
      { text: "Free Music Library", alt: true  },   // Clarendon 42.03px
    ];
    let i = 0;

    setInterval(() => {
      i = (i + 1) % states.length;
      el.textContent = states[i].text;
      el.classList.toggle("site-name--alt", states[i].alt);
    }, 3000);
  }


  /* ── 5. GRID view (3-column cover grid) ─────────────────────────────────── */

  function renderGridView() {
    if (!gridView) return;

    releases.forEach((release, idx) => {
      const tile = document.createElement("button");
      tile.type      = "button";
      tile.className = "grid-tile";

      if (release.cover) {
        const img = document.createElement("img");
        img.src     = release.cover;
        img.alt     = `${release.title} — ${release.artist}`;
        img.loading = "lazy";
        tile.appendChild(img);
      } else {
        const placeholder = document.createElement("div");
        placeholder.className = "card-cover-placeholder";
        const label = document.createElement("span");
        label.textContent = release.title;
        placeholder.appendChild(label);
        tile.appendChild(placeholder);
      }

      // Hover label: "Title by Artist"
      const label = document.createElement("span");
      label.className = "grid-tile-label";
      const title = document.createElement("em");
      title.textContent = release.title;
      label.appendChild(title);
      label.appendChild(document.createTextNode(` by ${release.artist}`));
      tile.appendChild(label);

      tile.addEventListener("click", () => openAlbum(release, idx));
      gridView.appendChild(tile);
    });
  }


  /* ── 6. Album detail modal ──────────────────────────────────────────────── */

  function openAlbum(release, idx) {
    if (!modal || !modalDialog) return;
    modalDialog.innerHTML = "";

    // Close (X)
    const close = document.createElement("button");
    close.type      = "button";
    close.className = "album-close";
    close.setAttribute("aria-label", "Close");
    close.textContent = "X";
    close.addEventListener("click", closeAlbum);
    modalDialog.appendChild(close);

    // Byline
    const byline = document.createElement("p");
    byline.className = "album-modal-byline";
    const title = document.createElement("em");
    title.className   = "card-title";
    title.textContent = release.title;
    byline.appendChild(title);
    byline.appendChild(document.createTextNode(", "));
    const artist = document.createElement("span");
    artist.className   = "card-artist";
    artist.textContent = release.artist;
    byline.appendChild(artist);
    modalDialog.appendChild(byline);

    // Caption: story (italic) + optional gear (mono) + download
    appendCaption(modalDialog, release, idx);

    modal.hidden = false;
  }

  function closeAlbum() {
    if (modal) modal.hidden = true;
  }

  function initModal() {
    if (!modal) return;
    modal.addEventListener("click", (e) => {
      if (e.target.matches(".album-modal-backdrop, [data-close]")) closeAlbum();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeAlbum();
    });
  }


  /* ── 7. FEED / GRID view toggle ─────────────────────────────────────────── */

  function setView(view) {
    const isGrid = view === "grid";
    if (grid)     grid.hidden     = isGrid;
    if (gridView) gridView.hidden = !isGrid;
    document.querySelectorAll("[data-view]").forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.view === view);
    });
    if (isGrid) closeAlbum();
    else        sizeCards();   // recompute feed cover sizes after being hidden
  }

  function initViewToggle() {
    document.querySelectorAll("[data-view]").forEach((btn) => {
      btn.addEventListener("click", () => setView(btn.dataset.view));
    });
  }


  /* ── Boot ────────────────────────────────────────────────────────────────── */

  renderGrid();
  renderGridView();
  sizeCards();
  initMobileMenu();
  initStickyHeader();
  initAboutScroll();
  initModal();
  initViewToggle();
  initAboutBracket();
  initSiteNameRotator();

  // Re-run cover sizing on layout-affecting events
  window.addEventListener("resize", sizeCards);
  window.addEventListener("load",   sizeCards);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(sizeCards);
  }

})();
