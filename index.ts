export interface User {
  id: string;
  email: string;
  password: string;
  role: 'buyer' | 'seller';
  isVerified: boolean;
  balance: number;
  favorites: string[];
  orders: Order[];
  createdAt: Date;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  sellerId: string;
  isVerified: boolean;
  credentials?: {
    email: string;
    password: string;
    additionalInfo?: string;
  };
}

export interface Order {
  id: string;
  productId: string;
  productName: string;
  price: number;
  status: 'pending' | 'completed' | 'cancelled';
  credentials?: {
    email: string;
    password: string;
    additionalInfo?: string;
  };
  createdAt: Date;
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal';
  amount: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: Date;
}

export type ThemeMode = 'dark' | 'light';

export type TabType = 'home' | 'products' | 'deposit' | 'withdraw' | 'orders' | 'favorites' | 'settings' | 'seller';