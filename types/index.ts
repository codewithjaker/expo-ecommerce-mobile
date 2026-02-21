// types/index.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  category: string;
  description: string;
  colors: string[];
  sizes: string[];
  isFavorite: boolean;
  inStock: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinedAt: Date;
}