import { createClient } from '@supabase/supabase-js';
import { Product, Order } from '../types';

// Retrieve credentials safely from environment variables (with user-provided defaults)
const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL || 'https://wexwgkhvhfdygdnspguz.supabase.co';
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || 'sb_publishable__aU89hXxkJg8p46pWAotxQ_kXArOPcd';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * DB Table Schemas definition for Supabase SQL Editor.
 * Copy and run this inside your Supabase dashboard > SQL Editor to initialize.
 */
export const SUPABASE_SQL_CREATION = `-- 1. Create almasso_products Table
CREATE TABLE IF NOT EXISTS almasso_products (
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

-- Enable RLS and setup policies for almasso_products
ALTER TABLE almasso_products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read - Products" ON almasso_products FOR SELECT USING (true);
CREATE POLICY "Allow public write - Products" ON almasso_products FOR ALL USING (true);

-- 2. Create almasso_orders Table
CREATE TABLE IF NOT EXISTS almasso_orders (
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

-- Enable RLS and setup policies for almasso_orders
ALTER TABLE almasso_orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read - Orders" ON almasso_orders FOR SELECT USING (true);
CREATE POLICY "Allow public insert - Orders" ON almasso_orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public write - Orders" ON almasso_orders FOR ALL USING (true);`;

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
