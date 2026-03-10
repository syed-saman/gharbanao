// ============================================================
// APP.JS — Core application logic
// ============================================================

let selectedLocation = localStorage.getItem("nb_location") || "patna";

// ─── INIT ────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  loadSavedData();   // merge admin-saved data (prices + images) into APP_DATA
  renderAll();
  initScrollAnimations();
  initStickyNav();
  initConstructionParticles();
});

// Merge admin's localStorage snapshot (nb_admin_data) into the in-memory APP_DATA.
// This is the same blob the admin portal saves, so prices AND item.image URLs
// are always in sync — on every browser, not just the admin's device.
function loadSavedData() {
  try {
    const saved = localStorage.getItem("nb_admin_data");
    if (!saved) return;
    const parsed = JSON.parse(saved);
    if (parsed.materials) APP_DATA.materials = parsed.materials;
    if (parsed.services)  APP_DATA.services  = parsed.services;
  } catch (e) { /* ignore corrupt data */ }
}

function renderAll() {
  renderLocationDropdown();
  renderCategoryTabs();
  renderMaterials("bricks");
  renderServices();
  renderReviews();
  applyTranslations();
  updateLangBtn();
  updateWhatsappLinks();
}

// ─── WHATSAPP LINKS (driven by config.js) ────────────────────
function updateWhatsappLinks() {
  const num = SITE_CONFIG.businessWhatsapp;
  const greeting = currentLang === "hi"
    ? SITE_CONFIG.whatsappGreetingHi
    : SITE_CONFIG.whatsappGreetingEn;

  const heroBtn = document.getElementById("heroWaBtn");
  if (heroBtn) heroBtn.href = `https://wa.me/${num}?text=${encodeURIComponent(greeting)}`;

  const footerBtn = document.getElementById("footerWaBtn");
  if (footerBtn) footerBtn.href = `https://wa.me/${num}`;

  const footerNum = document.getElementById("footerWaNum");
  if (footerNum) {
    // Format: +91 XXXXX XXXXX
    const digits = num.replace(/^\d{2}/, "");
    footerNum.textContent = `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
  }
}

// ─── LANGUAGE ────────────────────────────────────────────────
function toggleLanguage() {
  setLang(currentLang === "hi" ? "en" : "hi");
  renderAll();
}

function applyTranslations() {
  document.querySelectorAll("[data-t]").forEach(el => {
    const key = el.getAttribute("data-t");
    el.textContent = t(key);
  });
  document.querySelectorAll("[data-t-ph]").forEach(el => {
    el.placeholder = t(el.getAttribute("data-t-ph"));
  });
}

function updateLangBtn() {
  const btn = document.getElementById("langBtn");
  if (btn) btn.textContent = t("lang_btn");
}

// ─── LOCATION ────────────────────────────────────────────────
function renderLocationDropdown() {
  const container = document.getElementById("locationDropdown");
  if (!container) return;

  const activeLocations = APP_DATA.locations.filter(l => l.active);
  const inactiveLocations = APP_DATA.locations.filter(l => !l.active);

  let html = `<div class="location-wrapper">
    <span class="location-icon">📍</span>
    <select id="locationSelect" onchange="changeLocation(this.value)">`;

  activeLocations.forEach(loc => {
    const selected = loc.id === selectedLocation ? "selected" : "";
    html += `<option value="${loc.id}" ${selected}>${currentLang === "hi" ? loc.name : loc.nameEn}</option>`;
  });

  html += `</select></div>`;

  if (inactiveLocations.length) {
    const names = inactiveLocations.map(l => currentLang === "hi" ? l.name : l.nameEn).join(", ");
    html += `<div class="coming-soon-tag">🚀 ${t("coming_soon")}: ${names}</div>`;
  }

  container.innerHTML = html;
}

function changeLocation(locId) {
  selectedLocation = locId;
  localStorage.setItem("nb_location", locId);
  renderMaterials(currentCategory);
  renderServices();
}

// ─── CATEGORY TABS ───────────────────────────────────────────
let currentCategory = "bricks";

function renderCategoryTabs() {
  const container = document.getElementById("categoryTabs");
  if (!container) return;

  const materialCats = APP_DATA.categories.filter(c => c.id !== "services");
  let html = "";
  materialCats.forEach(cat => {
    const active = cat.id === currentCategory ? "active" : "";
    const name = currentLang === "hi" ? cat.name : cat.nameEn;
    html += `<button class="tab-btn ${active}" onclick="switchCategory('${cat.id}')">
      <span class="tab-icon">${cat.icon}</span> ${name}
    </button>`;
  });
  container.innerHTML = html;
}

function switchCategory(catId) {
  currentCategory = catId;
  renderCategoryTabs();
  renderMaterials(catId);
}

// ─── MATERIALS ───────────────────────────────────────────────
function renderMaterials(catId) {
  const container = document.getElementById("materialsGrid");
  if (!container) return;

  const items = APP_DATA.materials[catId] || [];
  const filtered = items.filter(i => i.location === selectedLocation);

  if (!filtered.length) {
    container.innerHTML = `<div class="empty-state">इस शहर में अभी डेटा उपलब्ध नहीं है।</div>`;
    return;
  }

  // Category meta (gradient bg + Unsplash placeholder until admin uploads)
  const catMeta     = APP_DATA.categories.find(c => c.id === catId) || {};
  const catFallback = catMeta.imageFallback || "";
  const catBg       = catMeta.imageBg       || "linear-gradient(135deg,#D9770622,#F59E0B22)";
  const catAlt      = catMeta.imageAlt      || catMeta.nameEn || catId;
  const catLabel    = `${catMeta.icon || ""} ${currentLang === "hi" ? catMeta.name : catMeta.nameEn}`;

  let html = "";
  filtered.forEach((supplier, idx) => {
    const name  = currentLang === "hi" ? supplier.supplier  : supplier.supplierEn;
    const badge = supplier.badge ? (currentLang === "hi" ? supplier.badge : supplier.badgeEn) : null;
    const stars = renderStars(supplier.rating);

    let priceRows = supplier.items.map(item => {
      const grade = currentLang === "hi" ? item.grade : item.gradeEn;
      const unit  = currentLang === "hi" ? item.unit  : item.unitEn;
      return `<div class="price-row">
        <span class="grade-name">${grade}</span>
        <span class="price-tag">₹${item.price.toLocaleString("en-IN")} <small>${unit}</small></span>
      </div>`;
    }).join("");

    // ── Carousel: per-item images stored on item.image (uploaded via admin) ──
    const itemImgs = supplier.items.map(item => {
      return item.image
        ? { src: item.image, caption: currentLang === "hi" ? item.grade : item.gradeEn }
        : null;
    }).filter(Boolean);

    const carId = `cr-${catId}-${idx}`;
    let imgBlock = "";

    if (itemImgs.length) {
      // Admin-uploaded per-grade images → show carousel
      const slides = itemImgs.map((img, i) =>
        `<div class="carousel-slide${i === 0 ? " active" : ""}">
           <img class="card-img" src="${img.src}" alt="${img.caption}" loading="lazy"/>
         </div>`
      ).join("");
      const arrows = itemImgs.length > 1
        ? `<button class="carousel-btn c-prev" onclick="carouselMove('${carId}',-1)" aria-label="prev">&#8249;</button>
           <button class="carousel-btn c-next" onclick="carouselMove('${carId}', 1)" aria-label="next">&#8250;</button>`
        : "";
      const dots = itemImgs.length > 1
        ? `<div class="carousel-dots">${itemImgs.map((_, i) =>
            `<span class="c-dot${i === 0 ? " active" : ""}" onclick="carouselGo('${carId}',${i})"></span>`
          ).join("")}</div>` : "";
      imgBlock = `<div class="card-img-wrap" style="background:${catBg}">
        <div class="carousel" id="${carId}">
          ${slides}${arrows}${dots}
          <div class="card-img-overlay"></div>
          <span class="card-img-label" id="${carId}-lbl">${itemImgs[0].caption}</span>
        </div>
      </div>`;
    } else if (catFallback) {
      // No admin images yet → Unsplash placeholder
      imgBlock = `<div class="card-img-wrap" style="background:${catBg}">
        <img class="card-img" src="${catFallback}" alt="${catAlt}" loading="lazy"
             onerror="this.style.display='none'"/>
        <div class="card-img-overlay"></div>
        <span class="card-img-label">${catLabel}</span>
      </div>`;
    } else {
      imgBlock = `<div class="card-img-wrap card-img-placeholder" style="background:${catBg}">
        <span class="placeholder-icon">${catMeta.icon || "🏗️"}</span>
      </div>`;
    }

    html += `<div class="material-card reveal-card" style="animation-delay:${idx * 0.1}s">
      ${imgBlock}
      ${badge ? `<div class="card-badge">${badge}</div>` : ""}
      <div class="card-body">
        <div class="card-header">
          <h3>${name}</h3>
          <div class="rating">${stars} <span>(${supplier.reviews})</span></div>
        </div>
        <div class="price-list">${priceRows}</div>
        <div class="card-footer">
          <div class="updated-text">${t("updated")} ${APP_DATA.lastUpdated}</div>
          <a href="https://wa.me/${supplier.whatsapp}?text=${encodeURIComponent(getWhatsappMsg(name))}"
             target="_blank" class="whatsapp-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            ${t("contact_whatsapp")}
          </a>
        </div>
      </div>
    </div>`;
  });

  container.innerHTML = html;
  triggerRevealAnimation();
}

function getWhatsappMsg(supplierName) {
  return currentLang === "hi"
    ? `नमस्ते! मैं निर्माण बाज़ार से ${supplierName} से सामग्री के बारे में जानकारी लेना चाहता हूँ।`
    : `Hello! I am interested in construction materials from ${supplierName} via Nirman Bazaar.`;
}

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let stars = "";
  for (let i = 0; i < full; i++) stars += "★";
  if (half) stars += "½";
  return `<span class="stars">${stars}</span> <span class="rating-num">${rating}</span>`;
}

// ─── SERVICES ────────────────────────────────────────────────
function renderServices() {
  const container = document.getElementById("servicesGrid");
  if (!container) return;

  const services = APP_DATA.services.filter(s => s.location === selectedLocation);
  let html = "";

  services.forEach((svc, idx) => {
    const name = currentLang === "hi" ? svc.name : svc.nameEn;
    const desc = currentLang === "hi" ? svc.description : svc.descriptionEn;
    const msgText = currentLang === "hi"
      ? `नमस्ते! मुझे ${name} सेवा चाहिए।`
      : `Hello! I need ${name} service from Nirman Bazaar.`;

    html += `<div class="service-card reveal-card" style="animation-delay:${idx * 0.08}s">
      <div class="service-icon">${svc.icon}</div>
      <h3>${name}</h3>
      <p>${desc}</p>
      <div class="providers-count">${svc.providers} ${t("providers_available")}</div>
      <a href="https://wa.me/${svc.whatsapp}?text=${encodeURIComponent(msgText)}"
         target="_blank" class="whatsapp-btn small">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        ${t("service_contact")}
      </a>
    </div>`;
  });

  container.innerHTML = html;
}

// ─── REVIEWS ─────────────────────────────────────────────────
function renderReviews() {
  const container = document.getElementById("reviewsSlider");
  if (!container) return;

  let html = "";
  APP_DATA.reviews.forEach((review, idx) => {
    const name = currentLang === "hi" ? review.name : review.nameEn;
    const location = currentLang === "hi" ? review.location : review.locationEn;
    const text = currentLang === "hi" ? review.text : review.textEn;
    const material = currentLang === "hi" ? review.material : review.materialEn;

    html += `<div class="review-card">
      <div class="review-stars">${"★".repeat(review.rating)}</div>
      <p class="review-text">"${text}"</p>
      <div class="review-footer">
        <div class="reviewer-info">
          <div class="reviewer-avatar">${name.charAt(0)}</div>
          <div>
            <strong>${name}</strong>
            <small>📍 ${location}</small>
          </div>
        </div>
        <span class="review-tag">${material}</span>
      </div>
    </div>`;
  });

  container.innerHTML = html;
}

// ─── SCROLL ANIMATIONS ───────────────────────────────────────
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".scroll-reveal").forEach(el => observer.observe(el));

  // Re-observe after renders
  const mutObserver = new MutationObserver(() => {
    document.querySelectorAll(".scroll-reveal:not(.visible)").forEach(el => observer.observe(el));
  });
  mutObserver.observe(document.body, { childList: true, subtree: true });
}

function triggerRevealAnimation() {
  setTimeout(() => {
    document.querySelectorAll(".reveal-card").forEach((card, i) => {
      setTimeout(() => card.classList.add("revealed"), i * 80);
    });
  }, 50);
}

// ─── STICKY NAV ──────────────────────────────────────────────
function initStickyNav() {
  const nav = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 50);
  });
}

// ─── CONSTRUCTION PARTICLES ──────────────────────────────────
function initConstructionParticles() {
  const canvas = document.getElementById("bgCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const shapes = ["▪", "◾", "▸", "◆", "⬡"];
  const particles = Array.from({ length: 30 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 8 + 4,
    speed: Math.random() * 0.4 + 0.1,
    opacity: Math.random() * 0.08 + 0.02,
    shape: shapes[Math.floor(Math.random() * shapes.length)],
    drift: (Math.random() - 0.5) * 0.3,
  }));

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = "#D97706";
      ctx.font = `${p.size}px sans-serif`;
      ctx.fillText(p.shape, p.x, p.y);
      p.y -= p.speed;
      p.x += p.drift;
      if (p.y < -20) { p.y = canvas.height + 20; p.x = Math.random() * canvas.width; }
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
  }
  animate();

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// ─── SMOOTH SCROLL ───────────────────────────────────────────
function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

// ─── MOBILE NAV ──────────────────────────────────────────────
function toggleMobileNav() {
  document.querySelector(".nav-links").classList.toggle("open");
}

// ─── IMAGE CAROUSEL ──────────────────────────────────────────
function carouselMove(id, dir) {
  const el = document.getElementById(id);
  if (!el) return;
  const slides = el.querySelectorAll(".carousel-slide");
  const dots   = el.querySelectorAll(".c-dot");
  let cur = [...slides].findIndex(s => s.classList.contains("active"));
  slides[cur].classList.remove("active");
  dots[cur]?.classList.remove("active");
  cur = (cur + dir + slides.length) % slides.length;
  slides[cur].classList.add("active");
  dots[cur]?.classList.add("active");
  _updateCarouselLabel(id, cur, slides);
}

function carouselGo(id, idx) {
  const el = document.getElementById(id);
  if (!el) return;
  const slides = el.querySelectorAll(".carousel-slide");
  slides.forEach((s, i) => s.classList.toggle("active", i === idx));
  el.querySelectorAll(".c-dot").forEach((d, i) => d.classList.toggle("active", i === idx));
  _updateCarouselLabel(id, idx, slides);
}

function _updateCarouselLabel(id, idx, slides) {
  const lbl = document.getElementById(id + "-lbl");
  if (!lbl || !slides[idx]) return;
  const img = slides[idx].querySelector("img");
  if (img) lbl.textContent = img.alt;
}
