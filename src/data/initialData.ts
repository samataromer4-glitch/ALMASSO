/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Category, Product, Order } from '../types';

export const CATEGORIES: Category[] = [
  { id: 'all', name: { so: 'Dhammaan Alaabta', en: 'All Products' }, icon: '✨' },
  { id: 'electronics', name: { so: 'Elektaroonigga & Tech-ga', en: 'Tech & Electronics' }, icon: '💻' },
  { id: 'fashion', name: { so: 'Dharka Luxury & Diracda', en: 'Dirac & Luxury Fashion' }, icon: '👗' },
  { id: 'oils', name: { so: 'Saliidaha & Cadarrada', en: 'Oils & Fragrances' }, icon: '🏺' },
  { id: 'home', name: { so: 'Agabka Aqalka & Qurxinta', en: 'Home Living & Styling' }, icon: '🏠' }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p-1',
    category: 'electronics',
    title: {
      so: "Kumbuyuutar Apple MacBook Pro M3 (8GB/512GB SSD)",
      en: "Apple MacBook Pro M3 Laptop (8GB RAM / 512GB SSD)"
    },
    price: 1450.00,
    discountPrice: 1399.00,
    image: "💻",
    description: {
      so: "Kumbuyuutar Apple MacBook Pro M3 aad u dheereeya. Ku haboon shaqada, waxbarashada, iyo naqshadaynta. Alaab damaanad leh.",
      en: "Supercharged Apple MacBook Pro M3 laptop. Perfect for demanding workflows, engineering, and digital creative design."
    },
    stock: 5,
    rating: 4.9,
    reviewsCount: 34,
    isFlash: true
  },
  {
    id: 'p-2',
    category: 'fashion',
    title: {
      so: "Dirac Shabaax Xariir ah oo Koyto Premium ah",
      en: "Premium Traditional Somali Shabaax Silk Dirac Set"
    },
    price: 125.00,
    discountPrice: 110.00,
    image: "👗",
    description: {
      so: "Dirac Shabaax oo xariir saafi ah, oo lagu qurxiyey daabacado dahabi ah oo indhaha soo jiidaya. Aad ugu haboon aroosyada iyo xafladaha.",
      en: "Exquisite traditional Somali Shabaax Dirac made from premium royal silk with bespoke gold metallic embroidery. Perfect for prestige occasions."
    },
    stock: 8,
    rating: 4.8,
    reviewsCount: 19,
    isFlash: true
  },
  {
    id: 'p-3',
    category: 'oils',
    title: {
      so: "Saliid Macsaro Saafi ah (1 Litre - Cold Pressed)",
      en: "100% Organic Sesame Oil (1L - Cold Pressed)"
    },
    price: 18.00,
    discountPrice: 15.00,
    image: "🏺",
    description: {
      so: "Saliid macsaro dabiici ah oo laga miiray beeraha dalka. Aad u caafimaad badan, ku haboon cuntada iyo jidka.",
      en: "Pure cold-pressed organic sesame oil directly harvested from regional farms. Nutrient-dense, versatile, and 100% natural."
    },
    stock: 45,
    rating: 4.7,
    reviewsCount: 112,
    isFlash: false
  },
  {
    id: 'p-4',
    category: 'electronics',
    title: {
      so: "Samaacadaha Bilaa Xadhiga ah ee Smart Pods Pro II",
      en: "Smart Pods Pro II Wireless Active ANC Earphones"
    },
    price: 65.00,
    discountPrice: null,
    image: "🎧",
    description: {
      so: "Samaacado dhegaha ah oo aad u cod macaan, lehna xakamaynta dhawaqa dibadda (ANC) iyo batari waara dhowr maalmood.",
      en: "Pro-fidelity wireless sound pods featuring active noise cancellation, deep acoustic bass, and extended high-capacity battery life."
    },
    stock: 15,
    rating: 4.5,
    reviewsCount: 28,
    isFlash: false
  },
  {
    id: 'p-5',
    category: 'home',
    title: {
      so: "Dambas Carfiso Smart USB oo leh Nalal Nuuraya",
      en: "Smart USB Essential Oil Aromatherapy Diffuser"
    },
    price: 35.00,
    discountPrice: 28.00,
    image: "🏺",
    description: {
      so: "Dambas carfiso oo casri ah oo ku shaqaysa USB. Waxay u qurxinaysaa aqalkaaga qaab ambient ah oo indho-qabad leh.",
      en: "Aesthetic ultrasonic essential oil mist humidifier with multi-color ambient lighting and quiet continuous scheduling."
    },
    stock: 12,
    rating: 4.6,
    reviewsCount: 15,
    isFlash: false
  },
  {
    id: 'p-6',
    category: 'fashion',
    title: {
      so: "Khamiis Carabi Premium ah (Al-Aseel Design)",
      en: "Bespoke Arabic Thobe - Premium Al-Aseel Fit"
    },
    price: 45.00,
    discountPrice: 38.00,
    image: "👕",
    description: {
      so: "Khamiis cad oo aad u qurux badan, oo laga tolay cudbi tayo sare leh. Ku haboon ciidaha iyo salaadaha dalka.",
      en: "Tailored luxury white Arabic thobe sewn with premium breathable linen-cotton. Designed for religious prayers and holiday celebrations."
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
    brand: "Almasso",
    subBrand: "Dukaan Toos ah",
    headerMuted: "Nidaamka rasmiga ee Alaabso-Style",
    customerMode: "Ku laabo Dukaanka",
    ownerPortal: "Gali Maamulka (Owner Login)",
    ownerPortalHeader: "Almasso Core Engine",
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
    adminLoginTitle: "Maamulka Qarsoon ee Almasso",
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
    analyticsTitle: "Xogta Dukaanka Almasso",
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
    brand: "Almasso",
    subBrand: "Direct Store",
    headerMuted: "Official Alaabso-Style Gateway",
    customerMode: "Back to Public Catalog",
    ownerPortal: "Gali Maamulka (Owner Login)",
    ownerPortalHeader: "Almasso Core Engine",
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
    paymentGatewayDesc: "The Almasso engine will seamlessly push a banking dialog directly to your phone for confirmation.",
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
