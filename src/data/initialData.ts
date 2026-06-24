/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Category, Product, Order } from '../types';

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
    image: "🚰",
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
    image: "🏗️",
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
    image: "🧱",
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
    image: "🛠️",
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
    image: "🔌",
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
    image: "💧",
    description: {
      so: "Mashiin awood sare leh oo biyo dhoofinta iyo kor u soo jiidista guryaha u fududaynaya. Buuq yar oo tamar badbaadinaya.",
      en: "Powerful multi-purpose centrifugal pump for residential high-pressure flow and agricultural irrigation."
    },
    stock: 20,
    rating: 4.8,
    reviewsCount: 30,
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
    headerMuted: "Nidaamka rasmiga ee Alaabso-Style",
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
    headerMuted: "Official Alaabso-Style Gateway",
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
