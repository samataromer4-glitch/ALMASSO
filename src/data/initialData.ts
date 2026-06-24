/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Category, Product, Order } from '../types';

import pprPipes from '../assets/images/ppr_pipes_1782291176920.jpg';
import steelRebars from '../assets/images/steel_rebars_1782291192959.jpg';
import cementBag from '../assets/images/cement_bag_1782291208180.jpg';
import cordlessDrill from '../assets/images/cordless_drill_1782291224252.jpg';
import digitalMultimeter from '../assets/images/digital_multimeter_1782291242387.jpg';
import waterPump from '../assets/images/water_pump_1782291259930.jpg';
import roofingSheets from '../assets/images/roofing_sheets_1782291760256.jpg';
import brassValve from '../assets/images/brass_valve_1782291774645.jpg';
import toolSet from '../assets/images/tool_set_1782291789207.jpg';
import ledFloodlight from '../assets/images/led_floodlight_1782291803843.jpg';
import electricalWire from '../assets/images/electrical_wire_1782291816384.jpg';
import safetyHelmet from '../assets/images/safety_helmet_1782291831740.jpg';

export const CATEGORIES: Category[] = [
  { id: 'all', name: { so: 'Dhammaan Alaabta', en: 'All Products' }, icon: '✨' },
  { id: 'plumbing', name: { so: 'Qalabka Biyaha', en: 'Plumbing & Water Equipment' }, icon: '🚰' },
  { id: 'steel', name: { so: 'Stealka', en: 'Steel & Metalware' }, icon: '🏗️' },
  { id: 'building', name: { so: 'Building Materials', en: 'Building Materials' }, icon: '🧱' },
  { id: 'tools', name: { so: 'Tools', en: 'Tools & Hardware' }, icon: '🛠️' },
  { id: 'electronics', name: { so: 'Electronic-ga', en: 'Electronics & Devices' }, icon: '🔌' }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p-1',
    category: 'plumbing',
    title: {
      so: "Tuubbooyinka Biyaha PPR High-Pressure (1 Inch)",
      en: "PPR High-Pressure Water Pipes (1 Inch - Pack of 10)"
    },
    price: 24.00,
    discountPrice: 20.00,
    image: pprPipes,
    description: {
      so: "Tuubbooyin PPR tayo sare leh oo loogu talagalay biyo-galinta guryaha iyo dhismayaasha. Waxay u adkaysan karaan cadaadis xoogan.",
      en: "Premium durable PPR piping solution for hot and cold residential water distribution systems."
    },
    stock: 25,
    rating: 4.8,
    reviewsCount: 34,
    isFlash: true
  },
  {
    id: 'p-2',
    category: 'steel',
    title: {
      so: "Biinanka Birta ee Dhismaha (Grade 60 Steel Rebars - 12mm)",
      en: "High-Strength Steel Rebars for Construction (12mm - Ton)"
    },
    price: 850.00,
    discountPrice: 810.00,
    image: steelRebars,
    description: {
      so: "Biraha stealka adag ee loo isticmaalo shubka iyo dhismaha derbiyada adag. Shahaado caalami ah leh.",
      en: "Industry-standard structural grade-60 carbon steel reinforcing bars. Perfect for masonry, foundations, and robust columns."
    },
    stock: 8,
    rating: 4.9,
    reviewsCount: 19,
    isFlash: true
  },
  {
    id: 'p-3',
    category: 'building',
    title: {
      so: "Shamiinto Premium Portland Cement (50Kg)",
      en: "Premium Grade Portland Cement (50Kg Bag)"
    },
    price: 9.50,
    discountPrice: 8.50,
    image: cementBag,
    description: {
      so: "Shamiinto tayo sare leh oo si degdeg ah u qalasha isla markaana adkaynaysa shubka iyo guryaha dhismahooda.",
      en: "High-performance cement formula suitable for all general concrete, mortar, plastering, and bricklaying projects."
    },
    stock: 120,
    rating: 4.7,
    reviewsCount: 112,
    isFlash: false
  },
  {
    id: 'p-4',
    category: 'tools',
    title: {
      so: "Driilka Bilaa Xadhiga ah ee DeWalt 20V Max Cordless Drill",
      en: "DeWalt 20V Max Cordless Drill with Battery Pack"
    },
    price: 120.00,
    discountPrice: 99.00,
    image: cordlessDrill,
    description: {
      so: "Driil awood badan oo shaqo kasta ku fududaynaya. Waxaa la socda baytari dhowr saacadood shaqaynaya iyo boorso qaadis ah.",
      en: "Heavy-duty cordless compact drill driver kit featuring variable speeds, ergonomics, and high-capacity battery."
    },
    stock: 15,
    rating: 4.5,
    reviewsCount: 28,
    isFlash: false
  },
  {
    id: 'p-5',
    category: 'electronics',
    title: {
      so: "Qalabka Cabbiraada Korontada ee Digital Multimeter Pro",
      en: "Professional Digital Multimeter & Electrical Tester"
    },
    price: 45.00,
    discountPrice: null,
    image: digitalMultimeter,
    description: {
      so: "Qalabka cabbiraada danabka, caabbiga, iyo qulqulka korontada ee digital-ka ah. Aad ugu fiican farsamayaqaanka korontada.",
      en: "High-accuracy digital testing meter for measuring voltage, resistance, current, and continuous connectivity."
    },
    stock: 12,
    rating: 4.6,
    reviewsCount: 15,
    isFlash: false
  },
  {
    id: 'p-6',
    category: 'plumbing',
    title: {
      so: "Mashiinka Biyaha Riixaya ee Honda High-Flow Water Pump",
      en: "Honda High-Flow Electric Water Pump (2HP)"
    },
    price: 320.00,
    discountPrice: 299.00,
    image: waterPump,
    description: {
      so: "Mashiin awood sare leh oo biyo dhoofinta iyo kor u soo jiidista guryaha u fududaynaya. Buuq yar oo tamar badbaadinaya.",
      en: "Powerful multi-purpose centrifugal pump for residential high-pressure flow and agricultural irrigation."
    },
    stock: 20,
    rating: 4.8,
    reviewsCount: 30,
    isFlash: false
  },
  {
    id: 'p-7',
    category: 'building',
    title: {
      so: "Jiingad Cas oo Premium ah (Corrugated Roofing Sheet)",
      en: "Premium Galvanized Corrugated Steel Roofing Sheets (Red)"
    },
    price: 18.50,
    discountPrice: 16.00,
    image: roofingSheets,
    description: {
      so: "Jiingad cas oo tayo sare leh, ka samaysan bir dhumuc weyn oo aan daxaloobin. Aad ugu fiican saqafka guryaha iyo bakhaarada.",
      en: "Premium grade corrugated iron sheets with rust-resistant red coating. Ideal for durable residential and commercial roofing."
    },
    stock: 150,
    rating: 4.9,
    reviewsCount: 42,
    isFlash: false
  },
  {
    id: 'p-8',
    category: 'plumbing',
    title: {
      so: "Khaanad naxas ah oo aad u adag (Heavy-Duty Brass Gate Valve)",
      en: "Heavy-Duty Industrial Brass Gate Valve (2 Inch)"
    },
    price: 32.00,
    discountPrice: 28.50,
    image: brassValve,
    description: {
      so: "Khaanad naxas adag ah oo u adkaysata cadaadiska sare ee biyaha, kana hortagta wax kasta oo duloobid ama daadasho ah.",
      en: "Full-port solid brass water flow control gate valve. Corrosion-resistant and highly rated for residential plumbing systems."
    },
    stock: 45,
    rating: 4.7,
    reviewsCount: 19,
    isFlash: true
  },
  {
    id: 'p-9',
    category: 'tools',
    title: {
      so: "Boorsada Farsamada ee Chrome-Vanadium (Professional Tool Set)",
      en: "Chrome-Vanadium Heavy-Duty Mechanic Socket Tool Set"
    },
    price: 145.00,
    discountPrice: 125.00,
    image: toolSet,
    description: {
      so: "Qalabka farsamada gacanta oo dhamaystiran, laga sameeyay birta adag ee Chrome-Vanadium. Aad ugu fiican garaashyada iyo shaqada guriga.",
      en: "Complete professional tool set with durable chrome-vanadium finish, neatly organized inside an impact-resistant carrying case."
    },
    stock: 15,
    rating: 4.8,
    reviewsCount: 28,
    isFlash: false
  },
  {
    id: 'p-10',
    category: 'electronics',
    title: {
      so: "Nalka Dibadda ee awoodda badan (Heavy-Duty LED Floodlight 200W)",
      en: "Heavy-Duty Waterproof Outdoor LED Floodlight (200W)"
    },
    price: 55.00,
    discountPrice: 49.00,
    image: ledFloodlight,
    description: {
      so: "Nalka xoogan ee loogu talagalay bannaanka guryaha, shirkadaha ama garoomada. Waa biyo-celis, tamartana aad u badbaadiya.",
      en: "Super bright, energy-efficient outdoor security floodlight with IP66 waterproofing and robust aluminum heat dissipation."
    },
    stock: 60,
    rating: 4.5,
    reviewsCount: 34,
    isFlash: true
  },
  {
    id: 'p-11',
    category: 'electronics',
    title: {
      so: "Duubka Waayirka Korontada ee naxasta ah (Insulated Copper Cable)",
      en: "Premium Insulated Copper Electrical Wire Roll (100 Meters)"
    },
    price: 85.00,
    discountPrice: 79.00,
    image: electricalWire,
    description: {
      so: "Waayir koronto oo tayo sare leh, ka samaysan naxas saafi ah oo dahaaran. Aad ugu badbaado badan rakibaadda korontada guryaha.",
      en: "High-grade copper core insulated building wire for indoor/outdoor electrical wiring projects. Flame retardant jacket."
    },
    stock: 35,
    rating: 4.9,
    reviewsCount: 50,
    isFlash: false
  },
  {
    id: 'p-12',
    category: 'tools',
    title: {
      so: "Koofiyada iyo Jaakada Badbaadada (Safety Helmet & High-Vis Vest)",
      en: "Premium Construction Safety Set (Hard Hat & High-Vis Vest)"
    },
    price: 25.00,
    discountPrice: 19.99,
    image: safetyHelmet,
    description: {
      so: "Qalabka rasmiga ah ee badbaadada shaqaalaha dhismaha. Waxaa ku jira koofiyad adag oo jaalle ah iyo jaakad iftiimaysa.",
      en: "Essential workplace safety kit containing an impact-resistant ABS hard hat helmet and a high-visibility orange safety vest."
    },
    stock: 80,
    rating: 4.8,
    reviewsCount: 22,
    isFlash: false
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: "ALM-3012",
    customerName: "Khadra Ismaaciil",
    phoneNumber: "0634289134",
    city: "Hargeisa",
    neighborhood: "Jigjiga Yar",
    paymentGateway: "zaad",
    products: [
      { productId: "p-2", title: "Premium Traditional Somali Shabaax Silk Dirac Set", quantity: 1, pricePaid: 110.00 }
    ],
    totalAmount: 110.00,
    status: "completed",
    createdAt: "2026-06-21T18:34:00.000Z"
  },
  {
    id: "ALM-5091",
    customerName: "Muxumed Barre",
    phoneNumber: "0615112233",
    city: "Mogadishu",
    neighborhood: "Hodan",
    paymentGateway: "evc",
    products: [
      { productId: "p-3", title: "Saliid Macsaro Saafi ah (1 Litre - Cold Pressed)", quantity: 2, pricePaid: 15.00 },
      { productId: "p-5", title: "Dambas Carfiso Smart USB oo leh Nalal Nuuraya", quantity: 1, pricePaid: 28.00 }
    ],
    totalAmount: 58.00,
    status: "pending",
    createdAt: "2026-06-22T14:15:00.000Z"
  }
];

export const TRANSLATIONS = {
  so: {
    // Layout
    brand: "MAASH",
    subBrand: "Dukaan Toos ah",
    headerMuted: "Dukaanka Rasmiga ah ee MAASH",
    customerMode: "Ku laabo Dukaanka",
    ownerPortal: "Gali Maamulka (Owner Login)",
    ownerPortalHeader: "MAASH Core Engine",
    changeLang: "English",
    
    // Front page
    heroBadge: "Dukaan Keliya - Mulkiile Run Ah",
    heroTitle: "Ku Dalbo Si Toos ah & Degdeg ah",
    heroSubtitle: "Halkan ka iibso alaab tayo leh adigoo ku dhiibanaya ZAAD, EVC Plus, Sahal, ama WhatsApp. Keenis dhowr saacadood gudahood ah magaaladaada!",
    searchPlace: "Raadi alaabo aad rabto oo dukaanka ku jira...",
    allCats: "Dhammaan Noocyada",
    flashSale: "Ugu Qiimaha Jaban",
    featuredProducts: "Ugu Cad-cad Dukaanka",
    reviews: "qiimeyn",
    stock: "yaala",
    stockOut: "Wuu Dhamaaday",
    addToCart: "Ku dar Kariirada",
    whatsappOrder: "Ku dalbo WhatsApp",
    back: "Ku laabo",
    
    // Cart Slideout
    cartTitle: "Kariiradaada",
    cartEmpty: "Kariiradaada waxba kuma jiraan hadda.",
    subtotal: "Isu-geyn",
    checkoutBtn: "U Gudub Lacag-bixinta",
    deleteItem: "Ka saar",
    
    // Checkout Drawer
    checkoutTitle: "Foomka Dhiibista & Lacagta",
    fullName: "Magacaaga Oo Buuxa",
    fullNamePlace: "Tusaale: Maxamed Cali",
    phone: "Lambar Telefoonka",
    phonePlace: "Lambarada: EVC/Zaad/M-Pesa",
    city: "Magaalada",
    cityPlace: "Hargeisa, Mogadishu, Garowe etc.",
    neighborhood: "Xaafada & Goobta rasmiga ah",
    neighborhoodPlace: "Tusaale: Jigjiga Yar, Hodan, Koodbuur",
    paymentGateway: "Uruuriyaha Lacagta Mobilka",
    paymentGatewayDesc: "Nidaamka wuxuu toos ugu soo diri doonaa taleefankaaga fariin dhibic ah (STK Push) si dabiici ah oo fudud.",
    waFallbackPay: "Haddii aad rabto, waxaad sidoo kale ku bixin kartaa WhatsApp toos ah adigoo fariin la wadaagaya mulkiilaha.",
    completeOrder: "Xaqiiji Dalabka & Bixi",
    
    // STK Simulation Screen
    stkTitle: "STK Push Xaqiijin",
    stkPrompt: "Fadlan eeg taleefankaaga, waxaa laguu soo diray fariin lagugu weydiinayo PIN-kaaga.",
    stkProgress: "Sugaya go'aanka bangiga...",
    stkSuccess: "Lacagta waa la helay! Dalabkaaga waxaa lagu daray xogta dukaanka rasmiga ah.",
    close: "Xidh fariinta",
    
    // Admin Login Screen
    adminLoginTitle: "Maamulka Qarsoon ee MAASH",
    adminLoginDesc: "Goobtan waxaa geli kara oo keliya mulkiilaha dukaanka si uu u maamulo alaabta yaala iyo dalabaadka.",
    passcodeLabel: "Geli Passcode-ka Maamulka",
    passcodePlace: "Geli sirta...",
    passcodeHint: "PIN-ka Sirdoonka ee la dalbaday waa: samatarB2",
    passcodeError: "Passcode-ka waa khalad, fadlan dib u hubi!",
    submitLogin: "Gali Maamulka",
    
    // Admin Dashboard
    revenueCard: "Wadar Iibka ($)",
    pendingOrdersCard: "Dalabyada Cusub",
    inventoryCard: "Shayada Dukaanka",
    analyticsTitle: "Xogta Dukaanka MAASH",
    addProdBtn: "Soo Geli Alaab Cusub",
    editProdBtn: "Cusboonaysii Alaabta",
    ordersSection: "Dalabaadka Macaamiisha",
    customerHeader: "Macmiilka",
    addressHeader: "Address-ka",
    itemsHeader: "Alaabaha",
    gatewayHeader: "Gateway",
    statusHeader: "Xaalka",
    actionsHeader: "Waxgabad",
    markCompleted: "Dhiibistii Dhamaatay",
    markShipped: "Ku Jira Jidka",
    noOrders: "Weli wax dalabyo ah lama soo dirin.",
    noProducts: "Dukaanku hadda kama helaysid alaabo, fadlan soo geli.",
    
    // Product form fields
    formTitleSo: "Magaca Soomaali",
    formTitleEn: "Magaca English",
    formCategory: "Nooca Alaabta",
    formPrice: "Qiimaha Sifaha ah (USD)",
    formDiscountPrice: "Qiimaha Dhimista (USD - Ikhtiyaari)",
    formImageEmoji: "Astaanta Alaabta (Emoji)",
    formDescSo: "Faahfaahinta Kooban oo Soomaali ah",
    formDescEn: "Faahfaahinta Kooban oo English ah",
    formStock: "Mugga Yaala Dukaanka (Stock)",
    cancelBtn: "Ka Noqo",
    saveBtn: "Hadda Baas",
    
    // Chat System
    chatHeading: "Wada-hadalka Tooska ah",
    chatStatus: "Mulkiilaha wuxuu joogaa khadka",
    chatPrompt: "Qor fariin..."
  },
  en: {
    // Layout
    brand: "MAASH",
    subBrand: "Direct Store",
    headerMuted: "Official MAASH Store",
    customerMode: "Back to Public Catalog",
    ownerPortal: "Gali Maamulka (Owner Login)",
    ownerPortalHeader: "MAASH Core Engine",
    changeLang: "Somali",
    
    // Front page
    heroBadge: "Single-Vendor Direct Retail",
    heroTitle: "Instant Direct Shopping & Express Delivery",
    heroSubtitle: "Shop quality handpicked products with immediate local mobile wallet gateways (ZAAD, EVC Plus, Sahal) or via express WhatsApp. Delivery to your room within hours!",
    searchPlace: "Search for specific products in the store...",
    allCats: "All Categories",
    flashSale: "Flash Discount",
    featuredProducts: "Premium Showcases",
    reviews: "reviews",
    stock: "in stock",
    stockOut: "Sold Out",
    addToCart: "Add to Cart",
    whatsappOrder: "Order via WhatsApp",
    back: "Go Back",
    
    // Cart Slideout
    cartTitle: "Your Cart",
    cartEmpty: "Your cart is currently empty.",
    subtotal: "Subtotal",
    checkoutBtn: "Proceed to Checkout",
    deleteItem: "Remove",
    
    // Checkout Drawer
    checkoutTitle: "Express Mobile Checkout Details",
    fullName: "Full Delivery Name",
    fullNamePlace: "e.g. Mohamed Ali",
    phone: "Mobile Money Number",
    phonePlace: "Numbers used for EVC/Zaad/M-Pesa",
    city: "City Node",
    cityPlace: "Hargeisa, Mogadishu, Garowe etc.",
    neighborhood: "Neighborhood & House details",
    neighborhoodPlace: "e.g. Jigjiga Yar, Hodan, Koodbuur",
    paymentGateway: "Local Mobile Money Network",
    paymentGatewayDesc: "The MAASH engine will seamlessly push a banking dialog directly to your phone for confirmation.",
    waFallbackPay: "Alternative: You can finalize and make dynamic query purchases with the owner on WhatsApp.",
    completeOrder: "Authorize & Confirm Payment",
    
    // STK Simulation Screen
    stkTitle: "Simulated STK Push",
    stkPrompt: "A simulated STK banking message has been dispatched to your handset asking for your wallet PIN.",
    stkProgress: "Securing authorization from mobile gateway network...",
    stkSuccess: "Payment confirmed successfully! The invoice record is automatically entered into the admin logging ledger.",
    close: "Dismiss Dialog",
    
    // Admin Login Screen
    adminLoginTitle: "Protected Admin Gateway",
    adminLoginDesc: "Access restricted strictly to the single store merchant for inventory management.",
    passcodeLabel: "Enter Merchant Passcode",
    passcodePlace: "Secret keys...",
    passcodeHint: "Secure passcode requested: samatarB2",
    passcodeError: "Access Denied! Incorrect passcode.",
    submitLogin: "Confirm Passcode",
    
    // Admin Dashboard
    revenueCard: "Total Sales ($)",
    pendingOrdersCard: "Pending Invoices",
    inventoryCard: "Listed Items",
    analyticsTitle: "Merchant Realtime Dashboard",
    addProdBtn: "Add New Inventory",
    editProdBtn: "Edit Product Info",
    ordersSection: "Customer Store Invoices",
    customerHeader: "Buyer Profile",
    addressHeader: "Delivery Address",
    itemsHeader: "Items Purchased",
    gatewayHeader: "Wallet",
    statusHeader: "Process",
    actionsHeader: "Ledger Actions",
    markCompleted: "Done / Completed",
    markShipped: "Dispatch / Shipping",
    noOrders: "No invoices logged yet.",
    noProducts: "Inventory list empty. Create products to showcase.",
    
    // Product form fields
    formTitleSo: "Title (Somali)",
    formTitleEn: "Title (English)",
    formCategory: "Product Category",
    formPrice: "Base Price (USD)",
    formDiscountPrice: "Discount Price (USD - Optional)",
    formImageEmoji: "Product Illustration (Emoji)",
    formDescSo: "Short Description (Somali)",
    formDescEn: "Short Description (English)",
    formStock: "Stock Level Available",
    cancelBtn: "Abort",
    saveBtn: "Publish Changes",
    
    // Chat System
    chatHeading: "Instant Support Chat",
    chatStatus: "Owner is online and responsive",
    chatPrompt: "Message..."
  }
};
