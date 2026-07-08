/* ============================================================
   MEESHO LITE — /api/products
   Vercel serverless function. Returns the full trilingual
   catalog: 7 rural-market categories, 21 products, each with a
   unique id, category slug, compressed CDN image URL, regional
   price, MRP, rating and multilingual search keywords.
   ============================================================ */

const CDN = (id, w, h) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&q=55&auto=format`;

const CATEGORIES = [
  { slug: "saree",       names: { hi: "साड़ी",                 bho: "साड़ी",                ta: "புடவை" } },
  { slug: "kurta",       names: { hi: "कुर्ता",                bho: "कुरता",               ta: "குர்தா" } },
  { slug: "kids",        names: { hi: "बच्चे और खिलौने",       bho: "लइका आ खेलौना",       ta: "குழந்தைகள் & பொம்மை" } },
  { slug: "home",        names: { hi: "घर का सामान",           bho: "घर के सामान",          ta: "வீட்டு பொருட்கள்" } },
  { slug: "farm",        names: { hi: "खेती और औजार",          bho: "खेती आ औजार",          ta: "விவசாயம் & கருவி" } },
  { slug: "footwear",    names: { hi: "चप्पल और जूते",         bho: "चप्पल आ जूता",         ta: "செருப்பு & காலணி" } },
  { slug: "electronics", names: { hi: "इलेक्ट्रॉनिक और टॉर्च", bho: "इलेक्ट्रॉनिक आ टार्च", ta: "எலெக்ட்ரானிக்ஸ் & டார்ச்" } }
];

const PRODUCTS = [
  /* ---------- साड़ी / Sarees ---------- */
  { id: 1,  cat: "saree", img: CDN("photo-1610030469983-98e550d6193c", 200, 140), imgLarge: CDN("photo-1610030469983-98e550d6193c", 360, 360), hue: "#f7c6de",
    price: "₹249", mrp: "₹599", rating: "4.1 ★",
    names: { hi: "सूती छपाई साड़ी", bho: "सूती छपाई साड़ी", ta: "பருத்தி அச்சு புடவை" },
    keywords: ["साड़ी", "सूती", "छपाई", "कपड़े", "புடவை", "பருத்தி", "saree", "sari", "cotton"] },
  { id: 2,  cat: "saree", img: CDN("photo-1583391733956-3750e0ff4e8b", 200, 140), imgLarge: CDN("photo-1583391733956-3750e0ff4e8b", 360, 360), hue: "#dcc6f7",
    price: "₹399", mrp: "₹999", rating: "4.3 ★",
    names: { hi: "रेशमी ज़री साड़ी", bho: "रेसमी जरी साड़ी", ta: "பட்டு ஜரி புடவை" },
    keywords: ["साड़ी", "रेशमी", "ज़री", "शादी", "புடவை", "பட்டு", "ஜரி", "saree", "silk", "zari"] },
  { id: 3,  cat: "saree", img: CDN("photo-1594736797933-d0501ba2fe65", 200, 140), imgLarge: CDN("photo-1594736797933-d0501ba2fe65", 360, 360), hue: "#f7d9c6",
    price: "₹199", mrp: "₹499", rating: "4.0 ★",
    names: { hi: "रोज़ पहनने की साड़ी", bho: "रोज पहिने के साड़ी", ta: "தினசரி புடவை" },
    keywords: ["साड़ी", "रोज़", "सस्ती", "புடவை", "தினசரி", "saree", "daily"] },

  /* ---------- कुर्ता / Kurtas ---------- */
  { id: 4,  cat: "kurta", img: CDN("photo-1583744946564-b52ac1c389c8", 200, 140), imgLarge: CDN("photo-1583744946564-b52ac1c389c8", 360, 360), hue: "#c6e5f7",
    price: "₹299", mrp: "₹749", rating: "4.0 ★",
    names: { hi: "अनारकली कुर्ता सेट", bho: "अनारकली कुरता सेट", ta: "அனார்கலி குர்தா செட்" },
    keywords: ["कुर्ता", "अनारकली", "कपड़े", "குர்தா", "அனார்கலி", "kurta", "anarkali"] },
  { id: 5,  cat: "kurta", img: CDN("photo-1597983073493-88cd35cf93b0", 200, 140), imgLarge: CDN("photo-1597983073493-88cd35cf93b0", 360, 360), hue: "#d3f0c0",
    price: "₹349", mrp: "₹799", rating: "3.9 ★",
    names: { hi: "पुरुषों का सूती कुर्ता", bho: "मरद के सूती कुरता", ta: "ஆண்கள் பருத்தி குர்தா" },
    keywords: ["कुर्ता", "पुरुष", "मरद", "சட்டை", "குர்தா", "ஆண்கள்", "kurta", "men", "cotton"] },
  { id: 6,  cat: "kurta", img: CDN("photo-1594633312681-425c7b97ccd1", 200, 140), imgLarge: CDN("photo-1594633312681-425c7b97ccd1", 360, 360), hue: "#f7e0c6",
    price: "₹229", mrp: "₹549", rating: "4.2 ★",
    names: { hi: "महिलाओं की कुर्ती", bho: "मेहरारू के कुर्ती", ta: "பெண்கள் குர்தி" },
    keywords: ["कुर्ती", "कुर्ता", "महिला", "मेहरारू", "குர்தி", "பெண்கள்", "kurti", "women"] },

  /* ---------- बच्चे और खिलौने / Kids & Toys ---------- */
  { id: 7,  cat: "kids", img: CDN("photo-1587654780291-39c9404d746b", 200, 140), imgLarge: CDN("photo-1587654780291-39c9404d746b", 360, 360), hue: "#f7e7c0",
    price: "₹199", mrp: "₹499", rating: "4.4 ★",
    names: { hi: "लकड़ी के खिलौने सेट", bho: "लकड़ी के खेलौना सेट", ta: "மர பொம்மை செட்" },
    keywords: ["खिलौने", "खेलौना", "लकड़ी", "बच्चे", "பொம்மை", "மர", "toys", "wooden"] },
  { id: 8,  cat: "kids", img: CDN("photo-1519238263530-99bdd11df2ea", 200, 140), imgLarge: CDN("photo-1519238263530-99bdd11df2ea", 360, 360), hue: "#f7d0ef",
    price: "₹149", mrp: "₹399", rating: "4.2 ★",
    names: { hi: "बच्चों की टी-शर्ट", bho: "लइकन के टी-शर्ट", ta: "குழந்தைகள் டி-ஷர்ட்" },
    keywords: ["टी-शर्ट", "बच्चे", "लइका", "कपड़े", "டி-ஷர்ட்", "குழந்தைகள்", "tshirt", "kids"] },
  { id: 9,  cat: "kids", img: CDN("photo-1515488042361-ee00e0ddd4e4", 200, 140), imgLarge: CDN("photo-1515488042361-ee00e0ddd4e4", 360, 360), hue: "#c9e8f7",
    price: "₹99",  mrp: "₹249", rating: "4.0 ★",
    names: { hi: "रंगीन गेंद सेट", bho: "रंगीन गेन सेट", ta: "வண்ண பந்து செட்" },
    keywords: ["गेंद", "गेन", "खिलौने", "खेल", "பந்து", "விளையாட்டு", "ball", "toys"] },

  /* ---------- घर का सामान / Home Utilities ---------- */
  { id: 10, cat: "home", img: CDN("photo-1505693416388-ac5ce068fe85", 200, 140), imgLarge: CDN("photo-1505693416388-ac5ce068fe85", 360, 360), hue: "#c0f0e2",
    price: "₹279", mrp: "₹699", rating: "4.0 ★",
    names: { hi: "डबल बेडशीट सेट", bho: "डबल बेडशीट सेट", ta: "இரட்டை படுக்கை விரிப்பு" },
    keywords: ["बेडशीट", "चादर", "घर", "படுக்கை", "விரிப்பு", "bedsheet", "chadar"] },
  { id: 11, cat: "home", img: CDN("photo-1563861826100-9cb868fdbe1c", 200, 140), imgLarge: CDN("photo-1563861826100-9cb868fdbe1c", 360, 360), hue: "#ead9c2",
    price: "₹189", mrp: "₹450", rating: "3.8 ★",
    names: { hi: "लकड़ी की दीवार घड़ी", bho: "लकड़ी के देवाल घड़ी", ta: "மர சுவர் கடிகாரம்" },
    keywords: ["घड़ी", "दीवार", "देवाल", "கடிகாரம்", "சுவர்", "clock", "ghadi"] },
  { id: 12, cat: "home", img: CDN("photo-1556910103-1c02745aae4d", 200, 140), imgLarge: CDN("photo-1556910103-1c02745aae4d", 360, 360), hue: "#d8dee8",
    price: "₹349", mrp: "₹899", rating: "4.1 ★",
    names: { hi: "स्टील के बर्तन सेट", bho: "स्टील के बरतन सेट", ta: "ஸ்டீல் பாத்திரம் செட்" },
    keywords: ["बर्तन", "बरतन", "स्टील", "रसोई", "பாத்திரம்", "சமையல்", "bartan", "steel", "utensils"] },

  /* ---------- खेती और औजार / Farm Tools & Seeds ---------- */
  { id: 13, cat: "farm", img: CDN("photo-1592921870789-04563d55041c", 200, 140), imgLarge: CDN("photo-1592921870789-04563d55041c", 360, 360), hue: "#dff0c0",
    price: "₹79",  mrp: "₹199", rating: "4.3 ★",
    names: { hi: "सब्ज़ी के बीज पैक", bho: "तरकारी के बिया पैक", ta: "காய்கறி விதை பேக்" },
    keywords: ["बीज", "बिया", "सब्ज़ी", "तरकारी", "खेती", "விதை", "காய்கறி", "seeds", "beej", "sabzi"] },
  { id: 14, cat: "farm", img: CDN("photo-1589923188900-85dae523342b", 200, 140), imgLarge: CDN("photo-1589923188900-85dae523342b", 360, 360), hue: "#e8e0c2",
    price: "₹129", mrp: "₹299", rating: "4.0 ★",
    names: { hi: "हाथ का हँसिया", bho: "हाथ के हँसुआ", ta: "கை அரிவாள்" },
    keywords: ["हँसिया", "हँसुआ", "औजार", "खेती", "அரிவாள்", "கருவி", "sickle", "hasiya"] },
  { id: 15, cat: "farm", img: CDN("photo-1416879595882-3373a0480b5b", 200, 140), imgLarge: CDN("photo-1416879595882-3373a0480b5b", 360, 360), hue: "#cfe8c2",
    price: "₹199", mrp: "₹449", rating: "3.9 ★",
    names: { hi: "खेत की कुदाल", bho: "खेत के कुदारी", ta: "மண்வெட்டி" },
    keywords: ["कुदाल", "कुदारी", "औजार", "खेत", "மண்வெட்டி", "கருவி", "kudal", "hoe"] },

  /* ---------- चप्पल और जूते / Footwear ---------- */
  { id: 16, cat: "footwear", img: CDN("photo-1603487742131-4160ec999306", 200, 140), imgLarge: CDN("photo-1603487742131-4160ec999306", 360, 360), hue: "#e0d2c2",
    price: "₹129", mrp: "₹349", rating: "4.0 ★",
    names: { hi: "पुरुषों की चप्पल", bho: "मरद के चप्पल", ta: "ஆண்கள் செருப்பு" },
    keywords: ["चप्पल", "पुरुष", "मरद", "செருப்பு", "ஆண்கள்", "chappal", "slipper"] },
  { id: 17, cat: "footwear", img: CDN("photo-1543163521-1bf539c55dd2", 200, 140), imgLarge: CDN("photo-1543163521-1bf539c55dd2", 360, 360), hue: "#f7cfd2",
    price: "₹179", mrp: "₹449", rating: "4.1 ★",
    names: { hi: "महिलाओं की सैंडल", bho: "मेहरारू के सैंडल", ta: "பெண்கள் செருப்பு" },
    keywords: ["सैंडल", "चप्पल", "महिला", "मेहरारू", "செருப்பு", "பெண்கள்", "sandal", "women"] },
  { id: 18, cat: "footwear", img: CDN("photo-1514989940723-e8e51635b782", 200, 140), imgLarge: CDN("photo-1514989940723-e8e51635b782", 360, 360), hue: "#c2d8e8",
    price: "₹159", mrp: "₹399", rating: "4.2 ★",
    names: { hi: "बच्चों के जूते", bho: "लइकन के जूता", ta: "குழந்தைகள் ஷூ" },
    keywords: ["जूते", "जूता", "बच्चे", "लइका", "ஷூ", "குழந்தைகள்", "shoes", "joota", "kids"] },

  /* ---------- इलेक्ट्रॉनिक और टॉर्च / Electronics & Torches ---------- */
  { id: 19, cat: "electronics", img: CDN("photo-1516617442634-75371039cb3a", 200, 140), imgLarge: CDN("photo-1516617442634-75371039cb3a", 360, 360), hue: "#f0e6c0",
    price: "₹249", mrp: "₹599", rating: "4.3 ★",
    names: { hi: "रिचार्ज होने वाली टॉर्च", bho: "रिचार्ज वाला टार्च", ta: "சார்ஜ் டார்ச்" },
    keywords: ["टॉर्च", "टार्च", "बत्ती", "रोशनी", "டார்ச்", "விளக்கு", "torch", "light"] },
  { id: 20, cat: "electronics", img: CDN("photo-1593078165899-c7d2ac0d6aea", 200, 140), imgLarge: CDN("photo-1593078165899-c7d2ac0d6aea", 360, 360), hue: "#d8c2e8",
    price: "₹299", mrp: "₹799", rating: "4.0 ★",
    names: { hi: "छोटा रेडियो", bho: "छोट रेडियो", ta: "சிறிய ரேடியோ" },
    keywords: ["रेडियो", "गाना", "ரேடியோ", "பாட்டு", "radio", "fm"] },
  { id: 21, cat: "electronics", img: CDN("photo-1583863788434-e58a36330cf0", 200, 140), imgLarge: CDN("photo-1583863788434-e58a36330cf0", 360, 360), hue: "#c2e8e2",
    price: "₹99",  mrp: "₹299", rating: "3.9 ★",
    names: { hi: "मोबाइल चार्जर", bho: "मोबाइल चार्जर", ta: "மொபைல் சார்ஜர்" },
    keywords: ["चार्जर", "मोबाइल", "சார்ஜர்", "மொபைல்", "charger", "mobile"] }
];

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ ok: false, error: "method_not_allowed" });
    return;
  }
  // Edge-cache the catalog for a day; serve stale while revalidating.
  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate=604800");
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.status(200).json({
    ok: true,
    generatedAt: new Date().toISOString(),
    categories: CATEGORIES,
    products: PRODUCTS
  });
}
