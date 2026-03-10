// ============================================================
// TRANSLATIONS.JS — All UI strings in Hindi and English
// To add a language: add a new key block below
// ============================================================

const TRANSLATIONS = {
  hi: {
    // Nav
    nav_home: "होम",
    nav_materials: "सामग्री",
    nav_services: "सेवाएं",
    nav_rates: "आज के रेट",
    nav_contact: "संपर्क",
    lang_btn: "EN",

    // Hero
    hero_tag: "बिहार का नंबर 1 निर्माण बाज़ार",
    hero_title: "निर्माण सामग्री अब आसान",
    hero_subtitle: "ईंट, बालू, स्टोन चिप्स — सही रेट, भरोसेमंद सप्लायर, सीधे WhatsApp पर ऑर्डर करें",
    hero_cta: "रेट देखें",
    hero_cta2: "WhatsApp पर बात करें",
    location_label: "अपना शहर चुनें",
    coming_soon: "जल्द आ रहा है",

    // Stats
    stat1: "सप्लायर",
    stat2: "सामग्री",
    stat3: "ग्राहक",
    stat4: "साल का अनुभव",

    // Sections
    sec_materials: "सामग्री",
    sec_materials_sub: "आज के सर्वोत्तम रेट — सीधे भट्ठा और सप्लायर से",
    sec_services: "सेवाएं",
    sec_services_sub: "विश्वसनीय मजदूर, ठेकेदार और इंजीनियर — एक जगह",
    sec_reviews: "ग्राहकों की राय",
    sec_reviews_sub: "पटना के असली ग्राहकों का अनुभव",
    sec_why: "निर्माण बाजार क्यों?",

    // Material cards
    contact_whatsapp: "WhatsApp पर संपर्क करें",
    per_unit: "प्रति",
    updated: "रेट अपडेट:",
    providers_available: "उपलब्ध",

    // Services
    service_contact: "सेवा के लिए संपर्क करें",

    // Why us
    why1_title: "पारदर्शी रेट",
    why1_desc: "कोई छुपा हुआ चार्ज नहीं। रोज़ अपडेट किए गए रेट।",
    why2_title: "भरोसेमंद सप्लायर",
    why2_desc: "25 साल के अनुभव से चुने गए विश्वसनीय भट्ठे और सप्लायर।",
    why3_title: "WhatsApp से ऑर्डर",
    why3_desc: "कोई ऐप डाउनलोड नहीं, सीधे WhatsApp पर बात करें।",
    why4_title: "एक जगह सब कुछ",
    why4_desc: "सामग्री से लेकर मजदूर और इंजीनियर तक — सब यहाँ।",

    // Footer
    footer_tagline: "बिहार का भरोसेमंद निर्माण बाज़ार",
    footer_contact: "संपर्क करें",
    footer_rights: "सर्वाधिकार सुरक्षित",
    footer_admin: "एडमिन पोर्टल",

    // Admin
    admin_title: "एडमिन पोर्टल",
    admin_login: "लॉगिन करें",
    admin_password: "पासवर्ड",
    admin_materials: "सामग्री प्रबंधन",
    admin_services: "सेवा प्रबंधन",
    admin_update: "अपडेट करें",
    admin_add: "नया जोड़ें",
    admin_delete: "हटाएं",
    admin_price: "रेट (₹)",
    admin_supplier: "सप्लायर नाम",
    admin_grade: "ग्रेड",
    admin_whatsapp: "WhatsApp नंबर",
    admin_save: "सेव करें",
    admin_logout: "लॉगआउट",
    admin_saved: "✅ सफलतापूर्वक सेव हुआ!",
    admin_back: "वेबसाइट पर जाएं",
  },

  en: {
    nav_home: "Home",
    nav_materials: "Materials",
    nav_services: "Services",
    nav_rates: "Today's Rates",
    nav_contact: "Contact",
    lang_btn: "हिं",

    hero_tag: "Bihar's No. 1 Construction Marketplace",
    hero_title: "Construction Materials, Simplified",
    hero_subtitle: "Bricks, Sand, Stone Chips — Best rates, trusted suppliers, order directly on WhatsApp",
    hero_cta: "View Rates",
    hero_cta2: "Chat on WhatsApp",
    location_label: "Select your city",
    coming_soon: "Coming Soon",

    stat1: "Suppliers",
    stat2: "Materials",
    stat3: "Customers",
    stat4: "Years Experience",

    sec_materials: "Materials",
    sec_materials_sub: "Best rates today — directly from kilns and suppliers",
    sec_services: "Services",
    sec_services_sub: "Trusted labourers, contractors and engineers — all in one place",
    sec_reviews: "Customer Reviews",
    sec_reviews_sub: "Real experiences from Patna customers",
    sec_why: "Why Nirman Bazaar?",

    contact_whatsapp: "Contact on WhatsApp",
    per_unit: "per",
    updated: "Rates updated:",
    providers_available: "available",

    service_contact: "Contact for Service",

    why1_title: "Transparent Rates",
    why1_desc: "No hidden charges. Rates updated daily.",
    why2_title: "Trusted Suppliers",
    why2_desc: "Verified kilns and suppliers chosen from 25 years of experience.",
    why3_title: "Order via WhatsApp",
    why3_desc: "No app downloads. Talk directly on WhatsApp.",
    why4_title: "Everything in One Place",
    why4_desc: "From materials to labourers and engineers — all here.",

    footer_tagline: "Bihar's trusted construction marketplace",
    footer_contact: "Contact Us",
    footer_rights: "All rights reserved",
    footer_admin: "Admin Portal",

    admin_title: "Admin Portal",
    admin_login: "Login",
    admin_password: "Password",
    admin_materials: "Manage Materials",
    admin_services: "Manage Services",
    admin_update: "Update",
    admin_add: "Add New",
    admin_delete: "Delete",
    admin_price: "Rate (₹)",
    admin_supplier: "Supplier Name",
    admin_grade: "Grade",
    admin_whatsapp: "WhatsApp Number",
    admin_save: "Save",
    admin_logout: "Logout",
    admin_saved: "✅ Saved successfully!",
    admin_back: "Go to Website",
  }
};

// Active language state
let currentLang = localStorage.getItem("nb_lang") || "hi";

function t(key) {
  return TRANSLATIONS[currentLang][key] || TRANSLATIONS["hi"][key] || key;
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem("nb_lang", lang);
}
