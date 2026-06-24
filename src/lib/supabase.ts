import { createClient } from '@supabase/supabase-js';
import { Product, Order } from '../types';

// Retrieve credentials safely from environment variables (with robust parsing for raw IDs or complete URLs)
const getSanitizedConfig = () => {
  let rawUrl = ((import.meta as any).env?.VITE_SUPABASE_URL || 'https://wexwgkhvhfdygdnspguz.supabase.co').trim();
  
  // If the user pasted just the project reference code, reconstruct the full secure URL
  const supabaseUrl = (rawUrl.startsWith('http://') || rawUrl.startsWith('https://'))
    ? rawUrl
    : `https://${rawUrl}.supabase.co`;

  const supabaseAnonKey = ((import.meta as any).env?.VITE_SUPABASE_ANON_KEY || 'sb_publishable__aU89hXxkJg8p46pWAotxQ_kXArOPcd').trim();

  return { supabaseUrl, supabaseAnonKey };
};

const config = getSanitizedConfig();
export const supabase = createClient(config.supabaseUrl, config.supabaseAnonKey);

/**
 * DB Table Schemas definition for Supabase SQL Editor.
 * Copy and run this inside your Supabase dashboard > SQL Editor to initialize.
 */
export const SUPABASE_SQL_CREATION = `-- 1. Create maash_products Table
CREATE TABLE IF NOT EXISTS maash_products (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  title JSONB NOT NULL,
  price NUMERIC NOT NULL,
  discount_price NUMERIC,
  image TEXT NOT NULL,
  description JSONB NOT NULL,
  stock INTEGER NOT NULL,
  rating NUMERIC NOT NULL DEFAULT 5.0,
  reviews_count INTEGER NOT NULL DEFAULT 0,
  is_flash BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS and setup policies for maash_products
ALTER TABLE maash_products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read - Products" ON maash_products FOR SELECT USING (true);
CREATE POLICY "Allow public write - Products" ON maash_products FOR ALL USING (true);

-- 2. Create maash_orders Table
CREATE TABLE IF NOT EXISTS maash_orders (
  id TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  city TEXT NOT NULL,
  neighborhood TEXT NOT NULL,
  payment_gateway TEXT NOT NULL,
  products JSONB NOT NULL,
  total_amount NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS and setup policies for maash_orders
ALTER TABLE maash_orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read - Orders" ON maash_orders FOR SELECT USING (true);
CREATE POLICY "Allow public insert - Orders" ON maash_orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public write - Orders" ON maash_orders FOR ALL USING (true);`;

// Map Product (TypeScript Model) => Postgres Table Row
export function mapProductToDb(p: Product) {
  return {
    id: p.id,
    category: p.category,
    title: p.title,
    price: p.price,
    discount_price: p.discountPrice,
    image: p.image,
    description: p.description,
    stock: p.stock,
    rating: p.rating,
    reviews_count: p.reviewsCount,
    is_flash: !!p.isFlash,
  };
}

// Map Postgres Table Row => Product (TypeScript Model)
export function mapProductFromDb(row: any): Product {
  return {
    id: row.id,
    category: row.category,
    title: typeof row.title === 'string' ? JSON.parse(row.title) : row.title,
    price: parseFloat(row.price),
    discountPrice: row.discount_price !== null && row.discount_price !== undefined ? parseFloat(row.discount_price) : null,
    image: row.image,
    description: typeof row.description === 'string' ? JSON.parse(row.description) : row.description,
    stock: parseInt(row.stock),
    rating: parseFloat(row.rating),
    reviewsCount: parseInt(row.reviews_count),
    isFlash: !!row.is_flash,
  };
}

// Map Order (TypeScript Model) => Postgres Table Row
export function mapOrderToDb(o: Order) {
  return {
    id: o.id,
    customer_name: o.customerName,
    phone_number: o.phoneNumber,
    city: o.city,
    neighborhood: o.neighborhood,
    payment_gateway: o.paymentGateway,
    products: o.products,
    total_amount: o.totalAmount,
    status: o.status,
    created_at: o.createdAt,
  };
}

// Map Postgres Table Row => Order (TypeScript Model)
export function mapOrderFromDb(row: any): Order {
  return {
    id: row.id,
    customerName: row.customer_name,
    phoneNumber: row.phone_number,
    city: row.city,
    neighborhood: row.neighborhood,
    paymentGateway: row.payment_gateway,
    products: typeof row.products === 'string' ? JSON.parse(row.products) : row.products,
    totalAmount: parseFloat(row.total_amount),
    status: row.status,
    createdAt: row.created_at || new Date().toISOString(),
  };
}
