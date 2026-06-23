/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  TrendingUp, Layers, Package, Lock, Unlock, Database, ArrowLeft, 
  Trash2, Edit3, Plus, RefreshCw, FileText, CheckCircle, Truck, ShoppingBag 
} from 'lucide-react';
import { Product, Order, Language } from '../types';
import { TRANSLATIONS, CATEGORIES } from '../data/initialData';

interface AdminDashboardProps {
  lang: Language;
  onClose: () => void;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  lang,
  onClose,
  products,
  setProducts,
  orders,
  setOrders,
}) => {
  const t = TRANSLATIONS[lang];

  // Auth passcode lock state
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(false);

  // CRUD Product state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // Form fields
  const [titleSo, setTitleSo] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [category, setCategory] = useState('electronics');
  const [price, setPrice] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');
  const [imageEmoji, setImageEmoji] = useState('💻');
  const [descSo, setDescSo] = useState('');
  const [descEn, setDescEn] = useState('');
  const [stock, setStock] = useState('10');

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'samatarB2') {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const populateFormForEdit = (p: Product) => {
    setEditingProduct(p);
    setTitleSo(p.title.so);
    setTitleEn(p.title.en);
    setCategory(p.category);
    setPrice(p.price.toString());
    setDiscountPrice(p.discountPrice?.toString() || '');
    setImageEmoji(p.image);
    setDescSo(p.description.so);
    setDescEn(p.description.en);
    setStock(p.stock.toString());
    
    // Smooth scroll to top of form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditingProduct(null);
    setTitleSo('');
    setTitleEn('');
    setCategory('electronics');
    setPrice('');
    setDiscountPrice('');
    setImageEmoji('💻');
    setDescSo('');
    setDescEn('');
    setStock('10');
  };

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleSo.trim() || !titleEn.trim() || !price) {
      alert(lang === 'so' ? 'Fadlan geli macluumaadka saxda ah!' : 'Please check required fields!');
      return;
    }

    const parsedPrice = parseFloat(price);
    const parsedDiscount = discountPrice ? parseFloat(discountPrice) : null;
    const parsedStock = parseInt(stock) || 0;

    if (editingProduct) {
      // Edit mode
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? {
        ...p,
        title: { so: titleSo, en: titleEn },
        category,
        price: parsedPrice,
        discountPrice: parsedDiscount,
        image: imageEmoji,
        description: { so: descSo, en: descEn },
        stock: parsedStock,
      } : p));
      
      alert(lang === 'so' ? 'Alaabta waa la cusboonaysiiyay!' : 'Product updated successfully!');
    } else {
      // Add mode
      const newProduct: Product = {
        id: 'p-' + (products.length + 1) + '-' + Math.floor(100 + Math.random() * 900),
        category,
        title: { so: titleSo, en: titleEn },
        price: parsedPrice,
        discountPrice: parsedDiscount,
        image: imageEmoji,
        description: { so: descSo || titleSo, en: descEn || titleEn },
        stock: parsedStock,
        rating: 5.0,
        reviewsCount: 0,
      };

      setProducts(prev => [newProduct, ...prev]);
      alert(lang === 'so' ? 'Alaabta cusub waa la faafiyay!' : 'Successfully published new product!');
    }

    resetForm();
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm(lang === 'so' ? 'Ma hubaal inaad tirto alaabtan dukaanka?' : 'Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
      if (editingProduct?.id === id) {
        resetForm();
      }
    }
  };

  const updateOrderStatus = (orderId: string, nextStatus: 'pending' | 'shipped' | 'completed') => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: nextStatus } : o));
  };

  // Financial calculations
  const calculateTotalSales = () => {
    return orders.reduce((sum, o) => sum + o.totalAmount, 0);
  };

  const countPendingOrders = () => {
    return orders.filter(o => o.status === 'pending').length;
  };

  // Gate check
  if (!isAuthenticated) {
    return (
      <div className="flex-1 bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-slate-950 max-w-sm w-full p-8 rounded-3xl border border-slate-800 text-white shadow-2xl space-y-5 animate-scale-up text-xs">
          <div className="text-center space-y-2">
            <div className="h-12 w-12 bg-rose-500/10 text-rose-500 border border-rose-500/15 rounded-2xl flex items-center justify-center text-xl mx-auto animate-pulse">
              <Lock size={20} />
            </div>
            <h2 className="text-base font-black tracking-tight">{t.adminLoginTitle}</h2>
            <p className="text-slate-400 text-[10px] leading-relaxed">
              {t.adminLoginDesc}
            </p>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="font-extrabold text-slate-400 block">{t.passcodeLabel}</label>
              <input 
                type="password"
                placeholder={t.passcodePlace}
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 placeholder-slate-600 outline-none px-4 py-3 rounded-xl text-center text-lg tracking-widest text-amber-400 font-extrabold focus:ring-1 focus:ring-amber-500"
                id="admin-passcode-input"
              />
            </div>

            {authError && (
              <p className="text-rose-500 font-extrabold text-center text-[10px] animate-shake">
                {t.passcodeError}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black py-2.8 rounded-xl tracking-wide transition-all pointer-events-auto"
              id="admin-auth-submit"
            >
              {t.submitLogin}
            </button>
          </form>

          <p className="text-[10px] text-slate-500 text-center leading-relaxed">
             {t.passcodeHint}
          </p>

          <button 
            onClick={onClose}
            className="text-[10px] text-amber-550/80 hover:text-amber-400 block text-center w-full font-bold underline"
          >
            {t.customerMode}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-slate-50 flex flex-col text-xs">
      
      {/* Admin header */}
      <div className="bg-slate-950 text-white shrink-0 border-b border-slate-850">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-xl shadow-lg ring-2 ring-amber-500/20 shadow-amber-500/10">
              M
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-black text-white">{t.ownerPortalHeader}</h1>
                <span className="bg-emerald-500/15 text-emerald-400 text-[8px] font-black px-1.5 py-0.5 rounded tracking-widest uppercase">
                  ACTIVE_LIVE
                </span>
              </div>
              <p className="text-[10px] text-slate-450 font-bold uppercase tracking-wider">{t.analyticsTitle}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:text-white text-slate-300 font-extrabold px-4 py-2.5 rounded-xl transition duration-150 flex items-center gap-2 pointer-events-auto"
            id="admin-back-store-btn"
          >
            <ArrowLeft size={14} />
            <span>{t.customerMode}</span>
          </button>
        </div>
      </div>

      {/* Main console interface */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

        {/* Analytics Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">{t.revenueCard}</span>
              <p className="text-2xl font-black text-slate-900">${calculateTotalSales().toFixed(2)}</p>
            </div>
            <div className="h-12 w-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-xl shadow-sm">
              💵
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">{t.pendingOrdersCard}</span>
              <p className="text-2xl font-black text-rose-600">{countPendingOrders()} Invoice(s)</p>
            </div>
            <div className="h-12 w-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center text-xl shadow-sm animate-pulse">
              📬
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">{t.inventoryCard}</span>
              <p className="text-2xl font-black text-slate-900">{products.length} {lang === 'so' ? 'Shay' : 'Unique Items'}</p>
            </div>
            <div className="h-12 w-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center text-xl shadow-sm">
              🍎
            </div>
          </div>
        </div>

        {/* Console layout Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Inventory Controller form block (CRUD) */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4 lg:col-span-1 h-fit shrink-0">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <h3 className="font-black text-slate-900 text-sm flex items-center gap-1.5">
                <Layers className="text-amber-500" size={16} />
                <span>{editingProduct ? t.editProdBtn : t.addProdBtn}</span>
              </h3>
              {editingProduct && (
                <button 
                  onClick={resetForm}
                  className="bg-slate-100 text-slate-500 px-2 py-1 rounded-lg text-[9px] font-bold"
                >
                  {t.cancelBtn}
                </button>
              )}
            </div>

            <form onSubmit={handleProductSubmit} className="space-y-3">
              <div className="space-y-0.5">
                <label className="font-extrabold text-slate-500">{t.formTitleSo} *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Saliid Macsaro Saafi ah"
                  value={titleSo}
                  onChange={(e) => setTitleSo(e.target.value)}
                  className="w-full border border-slate-200/80 px-3 py-2 rounded-lg bg-slate-50 focus:outline-none focus:bg-white text-xs"
                />
              </div>

              <div className="space-y-0.5">
                <label className="font-extrabold text-slate-500">{t.formTitleEn} *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Organic Sesame Oil"
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                  className="w-full border border-slate-200/80 px-3 py-2 rounded-lg bg-slate-50 focus:outline-none focus:bg-white text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="space-y-0.5">
                  <label className="font-extrabold text-slate-500">{t.formCategory}</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border border-slate-200/80 px-2.5 py-1.8 rounded-lg bg-slate-50 focus:outline-none focus:bg-white text-xs"
                  >
                    {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name[lang]}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-0.5">
                  <label className="font-extrabold text-slate-500">{t.formImageEmoji}</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 🏺"
                    value={imageEmoji}
                    onChange={(e) => setImageEmoji(e.target.value)}
                    className="w-full border border-slate-200/80 px-3 py-1.5 rounded-lg bg-slate-50 focus:outline-none focus:bg-white text-center text-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="space-y-0.5">
                  <label className="font-extrabold text-slate-500">{t.formPrice} *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="18.00"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full border border-slate-200/80 px-3 py-2 rounded-lg bg-slate-50 focus:outline-none focus:bg-white text-xs font-bold"
                  />
                </div>

                <div className="space-y-0.5">
                  <label className="font-extrabold text-slate-500">{t.formDiscountPrice}</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="15.00"
                    value={discountPrice}
                    onChange={(e) => setDiscountPrice(e.target.value)}
                    className="w-full border border-slate-200/80 px-3 py-2 rounded-lg bg-slate-50 focus:outline-none focus:bg-white text-xs"
                  />
                </div>
              </div>

              <div className="space-y-0.5">
                <label className="font-extrabold text-slate-500">{t.formStock}</label>
                <input
                  type="number"
                  required
                  placeholder="30"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full border border-slate-200/80 px-3 py-2 rounded-lg bg-slate-50 focus:outline-none text-xs"
                />
              </div>

              <div className="space-y-0.5">
                <label className="font-extrabold text-slate-500">{t.formDescSo}</label>
                <textarea
                  rows={2}
                  placeholder="Ku qor sharaxaad kooban oo Soomaali ah..."
                  value={descSo}
                  onChange={(e) => setDescSo(e.target.value)}
                  className="w-full border border-slate-200/80 px-3 py-2 rounded-lg bg-slate-50 focus:outline-none text-xs"
                ></textarea>
              </div>

              <div className="space-y-0.5">
                <label className="font-extrabold text-slate-500">{t.formDescEn}</label>
                <textarea
                  rows={2}
                  placeholder="Enter a short English descriptive copy..."
                  value={descEn}
                  onChange={(e) => setDescEn(e.target.value)}
                  className="w-full border border-slate-200/80 px-3 py-2 rounded-lg bg-slate-50 focus:outline-none text-xs"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-slate-900 hover:bg-amber-400 hover:text-slate-950 text-white font-black py-2.8 rounded-xl transition"
                id="admin-save-product-btn"
              >
                {editingProduct ? t.editProdBtn : t.addProdBtn}
              </button>
            </form>
          </div>

          {/* Right column: Orders ledger, followed by live product lists for edits */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Real-time Incoming Orders Ledger */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h3 className="font-black text-slate-900 text-sm flex items-center gap-1.5">
                  <FileText className="text-amber-500" size={16} />
                  <span>{t.ordersSection}</span>
                </h3>
                <span className="bg-rose-100 text-rose-800 text-[8px] font-black px-2 py-0.5 rounded-full tracking-wider uppercase">
                  REPORTS ({orders.length})
                </span>
              </div>

              <div className="space-y-3">
                {orders.length === 0 ? (
                  <div className="text-center py-8 text-slate-400 font-bold">
                    {t.noOrders}
                  </div>
                ) : (
                  orders.map((order) => (
                    <div 
                      key={order.id} 
                      className="p-4 rounded-2xl border border-slate-150/80 bg-slate-55/40 hover:bg-slate-50 transition flex flex-col sm:flex-row justify-between gap-4"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-slate-950 text-sm">{order.id}</span>
                          <span className="text-slate-400 font-normal">| {new Date(order.createdAt).toLocaleDateString()}</span>
                        </div>

                        {/* Customer profile description details */}
                        <div className="text-slate-700 space-y-0.5">
                          <p>
                            👤 <span className="font-black text-slate-900">{order.customerName}</span> · ({order.phoneNumber})
                          </p>
                          <p>
                            📍 <span className="text-slate-500 font-medium">{order.city}, {order.neighborhood}</span>
                          </p>
                        </div>

                        {/* Order purchased item names lists */}
                        <div className="bg-white/80 p-2 border border-slate-100 rounded-xl space-y-1">
                          {order.products.map((p, pIdx) => (
                            <div key={pIdx} className="flex justify-between text-slate-800 font-medium text-[10.5px]">
                              <span>· {p.title} <span className="text-slate-400 font-bold">x{p.quantity}</span></span>
                              <span className="font-bold">${(p.pricePaid * p.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center gap-2 pt-1">
                          <span className="bg-indigo-50 text-indigo-700 text-[8px] font-black px-1.8 py-0.5 rounded uppercase tracking-wider">
                            {order.paymentGateway.toUpperCase()} Mobil
                          </span>
                          <span className="text-[9px] text-slate-400">Total Charged:</span>
                          <span className="font-black text-slate-900">${order.totalAmount.toFixed(2)}</span>
                        </div>
                      </div>

                      {/* State transitions widgets */}
                      <div className="flex sm:flex-col justify-between sm:items-end shrink-0 gap-2">
                        <div className="text-right">
                          <span className={`inline-block text-[9px] font-black px-2 py-0.8 rounded-lg uppercase tracking-wide ${
                            order.status === 'completed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : order.status === 'shipped'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {order.status === 'completed' ? (lang === 'so' ? 'Dhamaaday' : 'Completed') : order.status === 'shipped' ? (lang === 'so' ? 'Ku jira Jidka' : 'Shipped') : (lang === 'so' ? 'Sugaya' : 'Pending')}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 pt-2">
                          {order.status === 'pending' && (
                            <button
                              onClick={() => updateOrderStatus(order.id, 'shipped')}
                              className="bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold px-2 py-1 rounded text-[10px] transition"
                            >
                              {lang === 'so' ? 'Dir' : 'Dispatch'}
                            </button>
                          )}
                          {order.status !== 'completed' && (
                            <button
                              onClick={() => updateOrderStatus(order.id, 'completed')}
                              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-2 py-1 rounded text-[10px] transition"
                            >
                              ✓ {lang === 'so' ? 'Dhammee' : 'Deliver'}
                            </button>
                          )}
                        </div>
                      </div>

                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Catalog catalog listings */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
              <h3 className="font-black text-slate-900 text-sm border-b pb-2">{lang === 'so' ? 'Liiska Alaabaha la maamuli karo' : 'Active Catalog Controller'}</h3>
              
              <div className="divide-y divide-slate-100">
                {products.length === 0 ? (
                  <p className="text-slate-400 text-center py-6 font-bold">{t.noProducts}</p>
                ) : (
                  products.map((p) => (
                    <div key={p.id} className="py-3.5 flex justify-between items-center hover:bg-slate-50/50 px-2 rounded-xl transition duration-150">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl select-none">{p.image}</span>
                        <div className="space-y-0.5">
                          <p className="font-bold text-slate-950 text-xs">{p.title[lang]}</p>
                          <p className="text-[10px] text-slate-400 font-medium">
                            Category: <span className="font-semibold text-slate-600">{p.category}</span> · 
                            Stock: <span className="font-semibold text-slate-600">{p.stock}</span> · 
                            Base: <span className="font-semibold text-slate-600">${p.price.toFixed(2)}</span>
                            {p.discountPrice && ` · Discount: $${p.discountPrice.toFixed(2)}`}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0 ml-4">
                        <button
                          onClick={() => populateFormForEdit(p)}
                          className="p-2 bg-slate-100 hover:bg-amber-100 text-slate-600 hover:text-amber-950 rounded-xl transition"
                          title={t.editProdBtn}
                          id={`admin-edit-prod-${p.id}`}
                        >
                          <Edit3 size={13} />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="p-2 bg-slate-100 hover:bg-rose-100 text-rose-600 rounded-xl transition"
                          title="Tirtir"
                          id={`admin-delete-prod-${p.id}`}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
};
