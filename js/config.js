// ============================================================
// CONFIG.JS — Central configuration for Nirman Bazaar
// ✏️  Edit THIS FILE to update business settings site-wide.
//     No need to touch any other file for routine changes.
// ============================================================

const SITE_CONFIG = {

  // ── BUSINESS CONTACT ─────────────────────────────────────
  // WhatsApp number with country code, no + or spaces
  businessWhatsapp: "919980923575",

  // ── BUSINESS INFO ─────────────────────────────────────────
  businessName:   "निर्माण बाजार",
  businessNameEn: "Nirman Bazaar",
  foundedYear:    2025,

  // ── ADMIN PORTAL CREDENTIALS ──────────────────────────────
  // Change these to secure your admin panel
  adminUser: "admin",
  adminPass: "nirman2025",

  // ── DEFAULTS ──────────────────────────────────────────────
  // "hi" = Hindi (default), "en" = English
  defaultLanguage: "hi",
  // Must match a location id in data.js
  defaultLocation: "patna",

  // ── WHATSAPP GREETING MESSAGES ────────────────────────────
  // Sent automatically when a user taps the main WA button
  whatsappGreetingHi: "नमस्ते! मुझे निर्माण सामग्री के बारे में जानकारी चाहिए।",
  whatsappGreetingEn: "Hello! I need information about construction materials from Nirman Bazaar.",

  // ── IMAGE HOSTING (ImgBB) ─────────────────────────────────
  // Free image hosting — sign up at https://imgbb.com
  // Get your API key from: https://api.imgbb.com/
  // Images uploaded via admin portal will be stored on ImgBB's servers
  // and visible to ALL visitors on ALL devices.
  imgbbApiKey: "59a95d9717d7f373f243564d996de66b",

  // ── CROSS-BROWSER DATA SYNC (JSONBin) ─────────────────────
  // Stores prices + image URLs so ALL browsers see admin changes.
  // 1. Sign up free at https://jsonbin.io
  // 2. Go to API Keys → copy your Master Key
  // 3. Click "Create Bin" → paste {} → Save → copy the Bin ID
  // 4. Fill in both values below
  jsonbinId:  "YOUR_BIN_ID_HERE",
  jsonbinKey: "YOUR_MASTER_KEY_HERE",

};
