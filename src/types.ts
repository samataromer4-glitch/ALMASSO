/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'so' | 'en';

export interface LocalizedString {
  so: string;
  en: string;
}

export interface Category {
  id: string;
  name: LocalizedString;
  icon: string;
}

export interface Product {
  id: string;
  category: string;
  title: LocalizedString;
  price: number;
  discountPrice: number | null;
  image: string; // Emoji representing high-fidelity product artwork
  description: LocalizedString;
  stock: number;
  rating: number;
  reviewsCount: number;
  isFlash?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  phoneNumber: string;
  city: string;
  neighborhood: string;
  paymentGateway: string; // 'evc' | 'zaad' | 'sahal' | 'mpesa'
  products: {
    productId: string;
    title: string;
    quantity: number;
    pricePaid: number;
  }[];
  totalAmount: number;
  status: 'pending' | 'shipped' | 'completed';
  createdAt: string;
}

export interface Message {
  id: string;
  sender: 'customer' | 'owner';
  text: string;
  timestamp: string;
}
