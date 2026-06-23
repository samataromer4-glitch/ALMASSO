/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CustomerHeader } from './components/CustomerHeader';
import { CustomerHero } from './components/CustomerHero';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AdminDashboard } from './components/AdminDashboard';
import { LiveChat } from './components/LiveChat';

import { Product, CartItem, Order, Language } from './types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, TRANSLATIONS } from './data/initialData';
import { Lock, ShoppingCart, Info, Check, Sparkles, X, Phone, ShoppingBag } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<Language>('so');
  const [currentView, setCurrentView] = useState<'customer' | 'admin'>('customer');

  // Load state from LocalStorage so CRUD edits and Order records persist beautifully
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('almasso_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('almasso_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('almasso_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // UI state managers
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Synchronizers
  useEffect(() => {
    localStorage.setItem('almasso_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('almasso_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('almasso_cart', JSON.stringify(cart));
  }, [cart]);

  const t = TRANSLATIONS[lang];

  // Cart operations
  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, newQty: number) => {
    if (newQty <= 0) {
      setCart(prev => prev.filter(item => item.id !== productId));
    } else {
      setCart(prev => prev.map(item => item.id === productId 
        ? { ...item, quantity: newQty } 
        : item
      ));
    }
  };

  const handleRemoveItem = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  // WhatsApp individual product message formulation
  const handleWhatsAppProductOrder = (product: Product) => {
    const priceText = product.discountPrice !== null ? product.discountPrice : product.price;
    const descText = 
      `Asc Almasso Direct,\n` +
      `Waxaan rabaa inaan si toos ah u dalbado alaabtan:\n` +
      `- ${product.title[lang]}\n` +
      `- Qiimaha: $${priceText.toFixed(2)}\n\n` +
      `Fadlan ila soo xiriir si aan u dhamaystiro dhiibista dalka gudihiisa. Mahadsanid!`;
    
    window.open(`https://wa.me/252634000000?text=${encodeURIComponent(descText)}`, '_blank');
  };

  const handleOrderCompleted = (newOrder: Order) => {
    // Append to orders state (persists in localStorage and immediately updates the live Admin dashboard stats!)
    setOrders(prev => [newOrder, ...prev]);

    // Subtract purchased product inventory counts immediately as specified in spec:
    // "Live Revenue Analytics: Cards highlighting Cumulative Sales in USD, Active Pending Orders count, and live inventory item levels."
    setProducts(prevProducts => {
      return prevProducts.map(p => {
        const matchingCartItem = cart.find(c => c.id === p.id);
        if (matchingCartItem) {
          const nextStock = Math.max(0, p.stock - matchingCartItem.quantity);
          return { ...p, stock: nextStock };
        }
        return p;
      });
    });

    // Clear cart
    setCart([]);
    setIsCheckoutOpen(false);

    // Dynamic prompt telling the user the direct STK action completed
    alert(lang === 'so' 
      ? `Nasiib Wanaagsan! Dalabkaaga ${newOrder.id} waa la gudbiyay. Fadlan eeg taleefankaaga si aad u xaqiijiso Pin-ka!`
      : `Success! Order ${newOrder.id} successfully queued. Please review your mobile handset for prompt authorization.`
    );
  };

  // Filter products by category & queries
  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = !searchQuery.trim() || 
      p.title[lang].toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.title.so.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.title.en.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-between antialiased">
      
      {/* Dynamic View rendering depending on Store vs Owner Dashboard */}
      {currentView === 'customer' ? (
        <div className="flex flex-col flex-1">
          {/* Multi-language Sticky Header */}
          <CustomerHeader
            lang={lang}
            setLang={setLang}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
            onOpenCart={() => setIsCartOpen(true)}
            onGotoAdmin={() => setCurrentView('admin')}
          />

          {/* Core Storefront Body content */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
            
            {/* Banner block */}
            <CustomerHero lang={lang} />

            {/* Catalog Grid Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="text-xl font-black text-slate-950 tracking-tight">
                    {t.featuredProducts}
                  </h2>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">
                    {lang === 'so' ? 'Tayo la hubiyay oo qiimo dhimis leh oo diyaar kuu ah.' : 'Premium authentic items ready for immediate regional shipping.'}
                  </p>
                </div>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="bg-white p-12 text-center rounded-3xl border border-slate-100 space-y-3">
                  <span className="text-4xl text-slate-300">📦</span>
                  <p className="font-extrabold text-slate-800 text-sm">
                    {lang === 'so' ? 'Wax alaab ah oo ku habboon raadintaada lama helin.' : 'No items match your search filters.'}
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="bg-slate-900 text-white hover:bg-amber-400 hover:text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition"
                  >
                    {lang === 'so' ? 'Nadiifi Filterka' : 'Reset Search'}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      lang={lang}
                      onAddToCart={handleAddToCart}
                      onViewDetails={(p) => setSelectedProduct(p)}
                      onWhatsAppOrder={handleWhatsAppProductOrder}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Regional Delivery Banner Info */}
            <div className="bg-white rounded-3xl border border-slate-100 p-6 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="space-y-2">
                <span className="bg-amber-400 text-slate-950 px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider">
                  {lang === 'so' ? 'MAGAALOOYINKA' : 'SHIPPING AREAS'}
                </span>
                <h3 className="text-base font-black text-slate-950 tracking-tight">
                  {lang === 'so' ? 'Deegaanada aan u dhiibno Alaabada' : 'Cities & Delivery Turnaround'}
                </h3>
                <p className="text-xs text-slate-500 max-w-xl leading-relaxed font-medium">
                  {lang === 'so' 
                    ? "Waxaan dhiibista ka samaynaa dhammaan qaybaha dalka gaar ahaan: Hargeisa, Mogadishu, Garowe, Borama, Berbera, Bosaso, Kismayo, iyo qaar kaloo badan. ZAAD, EVC iyo Sahal waa la ogolyahay."
                    : "We dispatch direct to your location in Hargeisa, Mogadishu, Garowe, Berbera, Bosaso, and Kismayo. Seamless mobile authorizations processed under minutes."}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2.5 w-full md:w-auto text-center font-bold">
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <p className="text-slate-900 text-sm">2-3 Hrs</p>
                  <p className="text-[9px] text-slate-400 font-bold uppercase">{lang === 'so' ? 'MAGAALOOYINKA' : 'MAJOR CITIES'}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <p className="text-slate-900 text-sm">24 Hrs</p>
                  <p className="text-[9px] text-slate-400 font-bold uppercase">{lang === 'so' ? 'BAADIYAHA' : 'OUTSIDE NODES'}</p>
                </div>
              </div>
            </div>

          </main>

          {/* Footer view */}
          <footer className="bg-slate-900 text-slate-400 py-12 mt-12 border-t border-slate-800 text-xs shrink-0 select-none">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <div className="space-y-3.5">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-black text-lg">
                    A
                  </div>
                  <span className="text-white font-black text-sm">{t.brand}</span>
                </div>
                <p className="leading-relaxed font-medium">
                  {lang === 'so' 
                    ? "Goob gaar ahaaneed oo lagu soo bandhigo alaab tayo leh uuna maamulayo hal qof (Single-Merchant Retailer). Alaabo si toos ah dalka loogu dhex qaybiyo."
                    : "Fully tailored Single-Merchant boutique featuring direct push STK checkout. Pure layout precision and premium deliveries."}
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-white font-black">{lang === 'so' ? 'Adeegyada Lacag bixinta' : 'Interactive Networks'}</span>
                <ul className="space-y-1.5 text-slate-400 font-medium">
                  <li>• Telesom ZAAD Service (Somaliland)</li>
                  <li>• Hormuud EVC Plus (Somalia Central/South)</li>
                  <li>• Golis/Somtel Sahal (Puntland)</li>
                  <li>• Safaricom M-Pesa (Kenya)</li>
                </ul>
              </div>

              <div className="space-y-3">
                <span className="text-white font-black">{lang === 'so' ? 'Koontada Mulkiilaha' : 'Administrator Area'}</span>
                <p className="text-slate-450 leading-relaxed">
                  {lang === 'so' 
                    ? "Haddii aad tahay mulkiilaha saxda ah ee dukaanka, ku dhufo badhanka hoose si aad u maamusho alaabta yaala Almasso."
                    : "Private merchant administrative console. Log in here to review invoices and publish real-time catalog items."}
                </p>
                
                {/* Hidden Entry Button labeled "Gali Maamulka (Owner Login)" as strictly ordered */}
                <button
                  onClick={() => {
                    setCurrentView('admin');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-slate-800 hover:bg-amber-400 hover:text-slate-950 text-slate-205 font-black px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-2 pointer-events-auto"
                  id="merchant-footer-gate-btn"
                >
                  <Lock size={12} />
                  <span>Gali Maamulka (Owner Login)</span>
                </button>
              </div>

            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-8 border-t border-slate-800 text-center font-medium">
              <p>© 2026 Almasso Single-Vendor Retailer. Handcrafted with Alaabso-style layouts.</p>
            </div>
          </footer>

          {/* Cart Drawer */}
          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            lang={lang}
            cartItems={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onCheckout={() => {
              setIsCartOpen(false);
              setIsCheckoutOpen(true);
            }}
          />

          {/* Checkout Drawer prompt */}
          <CheckoutModal
            isOpen={isCheckoutOpen}
            onClose={() => setIsCheckoutOpen(false)}
            lang={lang}
            cartItems={cart}
            onOrderCompleted={handleOrderCompleted}
          />

          {/* Live messaging help box bubble */}
          <LiveChat lang={lang} />

          {/* Product detail Dialog */}
          {selectedProduct && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div 
                onClick={() => setSelectedProduct(null)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              ></div>
              <div className="relative bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-100 animate-scale-up text-xs">
                
                <div className="flex justify-between items-center p-4 border-b bg-slate-50">
                  <h3 className="font-extrabold text-slate-950 text-xs">
                    {lang === 'so' ? 'Faahfaahinta Alaabta' : 'Product Details'}
                  </h3>
                  <button 
                    onClick={() => setSelectedProduct(null)}
                    className="text-slate-400 hover:text-slate-700 bg-slate-200/50 p-1 rounded-full"
                    id="product-detail-modal-close"
                  >
                    <X size={14} />
                  </button>
                </div>

                <div className="p-6 space-y-4">
                  <div className="bg-slate-50 h-44 rounded-2xl flex items-center justify-center text-7xl select-none">
                    {selectedProduct.image}
                  </div>
                  
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-black text-amber-600 block tracking-widest uppercase">
                      {selectedProduct.category}
                    </span>
                    <h4 className="font-black text-slate-900 text-sm leading-tight">
                      {selectedProduct.title[lang]}
                    </h4>
                    <p className="text-slate-500 font-medium leading-relaxed">
                      {selectedProduct.description[lang]}
                    </p>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t">
                    <div>
                      <span className="text-slate-400 block text-[9px] font-bold uppercase">{lang === 'so' ? 'Qiimaha' : 'Price'}</span>
                      <span className="text-lg font-black text-slate-900">
                        ${(selectedProduct.discountPrice || selectedProduct.price).toFixed(2)}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          handleWhatsAppProductOrder(selectedProduct);
                          setSelectedProduct(null);
                        }}
                        className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 p-2.5 rounded-xl transition"
                        title={lang === 'so' ? 'Ku dalbo WhatsApp' : 'Order on WhatsApp'}
                      >
                        <Phone size={14} />
                      </button>
                      <button
                        disabled={selectedProduct.stock <= 0}
                        onClick={() => {
                          handleAddToCart(selectedProduct);
                          setSelectedProduct(null);
                        }}
                        className="bg-slate-950 hover:bg-amber-400 hover:text-slate-950 text-white font-black px-4 py-2.5 rounded-xl transition text-xs"
                      >
                        {selectedProduct.stock <= 0 ? t.stockOut : t.addToCart}
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          )}

        </div>
      ) : (
        /* The Hidden Protected Admin Dashboard view */
        <AdminDashboard
          lang={lang}
          onClose={() => setCurrentView('customer')}
          products={products}
          setProducts={setProducts}
          orders={orders}
          setOrders={setOrders}
        />
      )}

    </div>
  );
}
