// ============================================================
// DATA.JS — Central data store for all listings
// To add/update: edit this file or use admin portal
// ============================================================

const APP_DATA = {
  locations: [
    { id: "patna", name: "पटना", nameEn: "Patna", active: true },
    { id: "hajipur", name: "हाजीपुर", nameEn: "Hajipur", active: false },
    { id: "ara", name: "आरा", nameEn: "Ara", active: false },
    { id: "muzaffarpur", name: "मुजफ्फरपुर", nameEn: "Muzaffarpur", active: false },
  ],

  // Images are now managed per-item via the Admin Portal (stored in browser localStorage).
  // imageBg  = gradient shown when no image has been uploaded yet
  // imageFallback = Unsplash photo shown as placeholder until admin uploads real photos
  categories: [
    {
      id: "bricks", icon: "🧱", name: "ईंट", nameEn: "Bricks",
      imageFallback: "https://images.unsplash.com/photo-1587582345426-bf07f534a79c?auto=format&fit=crop&w=700&q=85",
      imageAlt: "Red clay construction bricks",
      imageBg: "linear-gradient(135deg,#c0392b22,#e67e2222)"
    },
    {
      id: "sand", icon: "⛱️", name: "बालू / रेत", nameEn: "Sand",
      imageFallback: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=700&q=85",
      imageAlt: "Construction sand",
      imageBg: "linear-gradient(135deg,#f39c1222,#f1c40f22)"
    },
    {
      id: "stonechips", icon: "🪨", name: "स्टोन चिप्स", nameEn: "Stone Chips",
      imageFallback: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=700&q=85",
      imageAlt: "Crushed stone chips aggregate",
      imageBg: "linear-gradient(135deg,#7f8c8d22,#2c3e5022)"
    },
    { id: "services", icon: "👷", name: "सेवाएं", nameEn: "Services" },
  ],

  materials: {
    bricks: [
      {
        id: "b1",
        supplier: "राम भट्ठा, फुलवारीशरीफ",
        supplierEn: "Ram Bhatta, Phulwarisharif",
        loginId: "ram", loginPass: "ram123",
        rating: 4.5,
        reviews: 38,
        whatsapp: "919876543210",
        items: [
          { grade: "1 नंबर", gradeEn: "Grade 1", price: 8500, unit: "प्रति हजार", unitEn: "per 1000" },
          { grade: "1.5 नंबर", gradeEn: "Grade 1.5", price: 7200, unit: "प्रति हजार", unitEn: "per 1000" },
          { grade: "2 नंबर", gradeEn: "Grade 2", price: 5800, unit: "प्रति हजार", unitEn: "per 1000" },
        ],
        badge: "सबसे लोकप्रिय",
        badgeEn: "Most Popular",
        location: "patna"
      },
      {
        id: "b2",
        supplier: "श्याम भट्ठा, दानापुर",
        supplierEn: "Shyam Bhatta, Danapur",
        loginId: "shyam", loginPass: "shyam123",
        rating: 4.2,
        reviews: 24,
        whatsapp: "919876543211",
        items: [
          { grade: "1 नंबर", gradeEn: "Grade 1", price: 8200, unit: "प्रति हजार", unitEn: "per 1000" },
          { grade: "2 नंबर", gradeEn: "Grade 2", price: 5600, unit: "प्रति हजार", unitEn: "per 1000" },
          { grade: "फ्लाई ऐश ईंट", gradeEn: "Fly Ash Brick", price: 6800, unit: "प्रति हजार", unitEn: "per 1000" },
        ],
        badge: null,
        location: "patna"
      },
      {
        id: "b3",
        supplier: "महादेव भट्ठा, बिहटा",
        supplierEn: "Mahadev Bhatta, Bihta",
        loginId: "mahadev", loginPass: "mahadev123",
        rating: 4.7,
        reviews: 52,
        whatsapp: "919876543212",
        items: [
          { grade: "1 नंबर (प्रीमियम)", gradeEn: "Grade 1 (Premium)", price: 9000, unit: "प्रति हजार", unitEn: "per 1000" },
          { grade: "1.5 नंबर", gradeEn: "Grade 1.5", price: 7500, unit: "प्रति हजार", unitEn: "per 1000" },
          { grade: "2 नंबर", gradeEn: "Grade 2", price: 6000, unit: "प्रति हजार", unitEn: "per 1000" },
          { grade: "फ्लाई ऐश ईंट", gradeEn: "Fly Ash Brick", price: 7000, unit: "प्रति हजार", unitEn: "per 1000" },
        ],
        badge: "टॉप रेटेड",
        badgeEn: "Top Rated",
        location: "patna"
      },
    ],

    sand: [
      {
        id: "s1",
        supplier: "गंगा बालू भंडार, पटना",
        supplierEn: "Ganga Balu Bhandar, Patna",
        loginId: "ganga", loginPass: "ganga123",
        rating: 4.6,
        reviews: 61,
        whatsapp: "919876543213",
        items: [
          { grade: "गंगा नदी बालू (मोटा)", gradeEn: "Ganga River Sand (Coarse)", price: 4500, unit: "प्रति ट्रॉली", unitEn: "per trolley" },
          { grade: "गंगा नदी बालू (बारीक)", gradeEn: "Ganga River Sand (Fine)", price: 5000, unit: "प्रति ट्रॉली", unitEn: "per trolley" },
          { grade: "सोन नदी बालू", gradeEn: "Son River Sand", price: 4200, unit: "प्रति ट्रॉली", unitEn: "per trolley" },
        ],
        badge: "सबसे लोकप्रिय",
        badgeEn: "Most Popular",
        location: "patna"
      },
      {
        id: "s2",
        supplier: "सरयू सैंड सप्लायर, पटना",
        supplierEn: "Saryu Sand Supplier, Patna",
        loginId: "saryu", loginPass: "saryu123",
        rating: 4.3,
        reviews: 29,
        whatsapp: "919876543214",
        items: [
          { grade: "M-सैंड (मैन्युफैक्चर्ड)", gradeEn: "M-Sand (Manufactured)", price: 3800, unit: "प्रति ट्रॉली", unitEn: "per trolley" },
          { grade: "सरयू नदी बालू", gradeEn: "Saryu River Sand", price: 4000, unit: "प्रति ट्रॉली", unitEn: "per trolley" },
        ],
        badge: null,
        location: "patna"
      },
    ],

    stonechips: [
      {
        id: "sc1",
        supplier: "पत्थर राजा स्टोन्स, पटना",
        supplierEn: "Patthar Raja Stones, Patna",
        loginId: "patthar", loginPass: "patthar123",
        rating: 4.8,
        reviews: 45,
        whatsapp: "919876543215",
        items: [
          { grade: "6mm चिप्स", gradeEn: "6mm Chips", price: 1800, unit: "प्रति टन", unitEn: "per ton" },
          { grade: "12mm चिप्स", gradeEn: "12mm Chips", price: 1650, unit: "प्रति टन", unitEn: "per ton" },
          { grade: "20mm चिप्स", gradeEn: "20mm Chips", price: 1500, unit: "प्रति टन", unitEn: "per ton" },
          { grade: "40mm चिप्स", gradeEn: "40mm Chips", price: 1400, unit: "प्रति टन", unitEn: "per ton" },
          { grade: "धूल (Dust)", gradeEn: "Stone Dust", price: 900, unit: "प्रति टन", unitEn: "per ton" },
        ],
        badge: "टॉप रेटेड",
        badgeEn: "Top Rated",
        location: "patna"
      },
      {
        id: "sc2",
        supplier: "झारखंड स्टोन सप्लाई, पटना",
        supplierEn: "Jharkhand Stone Supply, Patna",
        loginId: "jharkhand", loginPass: "jharkhand123",
        rating: 4.4,
        reviews: 33,
        whatsapp: "919876543216",
        items: [
          { grade: "12mm चिप्स", gradeEn: "12mm Chips", price: 1600, unit: "प्रति टन", unitEn: "per ton" },
          { grade: "20mm चिप्स", gradeEn: "20mm Chips", price: 1480, unit: "प्रति टन", unitEn: "per ton" },
          { grade: "40mm चिप्स", gradeEn: "40mm Chips", price: 1350, unit: "प्रति टन", unitEn: "per ton" },
        ],
        badge: null,
        location: "patna"
      },
    ],
  },

  services: [
    {
      id: "sv1",
      type: "labour",
      name: "राजमिस्त्री / मजदूर",
      nameEn: "Mason / Labour",
      icon: "🔨",
      description: "अनुभवी राजमिस्त्री और मजदूर — घर निर्माण, दीवार, प्लास्टर के लिए",
      descriptionEn: "Experienced masons and workers for house construction, walls, plaster",
      whatsapp: "919876543217",
      providers: 12,
      location: "patna"
    },
    {
      id: "sv2",
      type: "contractor",
      name: "ठेकेदार",
      nameEn: "Contractor",
      icon: "🏗️",
      description: "पूरे निर्माण का ठेका लेने वाले विश्वसनीय ठेकेदार",
      descriptionEn: "Reliable contractors for complete construction projects",
      whatsapp: "919876543218",
      providers: 8,
      location: "patna"
    },
    {
      id: "sv3",
      type: "engineer",
      name: "सिविल इंजीनियर",
      nameEn: "Civil Engineer",
      icon: "📐",
      description: "नक्शा बनाना, स्ट्रक्चर डिज़ाइन और साइट सुपरविज़न",
      descriptionEn: "Map design, structural design and site supervision",
      whatsapp: "919876543219",
      providers: 5,
      location: "patna"
    },
    {
      id: "sv4",
      type: "architect",
      name: "आर्किटेक्ट",
      nameEn: "Architect",
      icon: "🏠",
      description: "घर का नक्शा और इंटीरियर डिज़ाइन सेवा",
      descriptionEn: "House layout and interior design services",
      whatsapp: "919876543220",
      providers: 3,
      location: "patna"
    },
    {
      id: "sv5",
      type: "electrician",
      name: "इलेक्ट्रिशियन",
      nameEn: "Electrician",
      icon: "⚡",
      description: "घर की वायरिंग, फिटिंग और इलेक्ट्रिकल काम",
      descriptionEn: "Home wiring, fittings and electrical work",
      whatsapp: "919876543221",
      providers: 9,
      location: "patna"
    },
    {
      id: "sv6",
      type: "plumber",
      name: "प्लंबर",
      nameEn: "Plumber",
      icon: "🔧",
      description: "पाइप फिटिंग, टंकी और सैनिटरी काम",
      descriptionEn: "Pipe fitting, tank installation and sanitary work",
      whatsapp: "919876543222",
      providers: 7,
      location: "patna"
    },
  ],

  reviews: [
    {
      name: "अजय कुमार सिंह",
      nameEn: "Ajay Kumar Singh",
      location: "राजेंद्र नगर, पटना",
      locationEn: "Rajendra Nagar, Patna",
      text: "बहुत अच्छी सर्विस! ईंट का रेट एकदम सही था और डिलीवरी भी टाइम पर हुई। निर्माण बाजार से संपर्क करना बहुत आसान था।",
      textEn: "Very good service! Brick rates were accurate and delivery was on time. Contacting through Nirman Bazaar was very easy.",
      rating: 5,
      material: "ईंट",
      materialEn: "Bricks"
    },
    {
      name: "प्रिया देवी",
      nameEn: "Priya Devi",
      location: "बोरिंग रोड, पटना",
      locationEn: "Boring Road, Patna",
      text: "बालू का रेट पहले बहुत कन्फ्यूज़न था, यहाँ सब साफ़ दिखता है। सिविल इंजीनियर भी यहीं से मिला, बढ़िया काम किया।",
      textEn: "Sand pricing was confusing before, here everything is clear. Also found a civil engineer here, did great work.",
      rating: 5,
      material: "बालू + सेवाएं",
      materialEn: "Sand + Services"
    },
    {
      name: "रमेश प्रसाद",
      nameEn: "Ramesh Prasad",
      location: "कंकड़बाग, पटना",
      locationEn: "Kankarbagh, Patna",
      text: "स्टोन चिप्स की अलग-अलग साइज़ एक जगह मिलना बहुत सुविधाजनक है। WhatsApp पर तुरंत जवाब मिला।",
      textEn: "Getting different sizes of stone chips in one place is very convenient. Got an instant reply on WhatsApp.",
      rating: 4,
      material: "स्टोन चिप्स",
      materialEn: "Stone Chips"
    },
    {
      name: "संजय ठाकुर",
      nameEn: "Sanjay Thakur",
      location: "पाटलिपुत्र कॉलोनी, पटना",
      locationEn: "Patliputra Colony, Patna",
      text: "मकान बनाते वक्त सभी सामग्री का रेट यहाँ से चेक करता था। बहुत बचत हुई और धोखा नहीं हुआ।",
      textEn: "Used to check all material rates here while building the house. Saved a lot and no fraud.",
      rating: 5,
      material: "सभी सामग्री",
      materialEn: "All Materials"
    },
    {
      name: "मीना कुमारी",
      nameEn: "Meena Kumari",
      location: "अनीसाबाद, पटना",
      locationEn: "Anisabad, Patna",
      text: "ठेकेदार ढूंढना बहुत मुश्किल था पहले। यहाँ से नंबर लिया और काम शुरू हो गया। बहुत अच्छा प्लेटफॉर्म है।",
      textEn: "Finding a contractor was very difficult before. Got the number from here and work started. Very good platform.",
      rating: 4,
      material: "ठेकेदार",
      materialEn: "Contractor"
    },
  ],

  whatsappBusiness: "919876543210", // Main business WhatsApp
  lastUpdated: "10 मार्च 2025",
  lastUpdatedEn: "10 March 2025",
};
