// models/product.model.ts
export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  wood_type: string;
  finish: string;
  dimensions: {
    depth: number;
    width: number;
    height: number;
  };
  price: number;
  discount_price?: number;
  weight: number;
  image_path: string;
  stock: number;
  sku: string;
  status: 'active' | 'inactive';
  featured: boolean;
  created_at: string;
  updated_at: string;
  tags?: string[] | null;
}

export interface ProductsResponse {
  success: boolean;
  count: number;
  data: Product[];
}

// Các giá trị hợp lệ để dùng trong UI
export const CATEGORIES = [
  'sofa', 'chair', 'stool', 'table', 'desk', 
  'kitchen', 'vanitory', 'matress', 'mirror', 
  'wardrove', 'lamp', 'tv table', 'garden'
];

export const WOOD_TYPES = [
  'walnut', 'maple', 'oak', 'pine', 
  'eucalyptus', 'bamboo', 'teak', 'cedar'
];

export const FINISHES = ['dark', 'medium', 'light', 'natural'];

export const SORT_OPTIONS = [
  'price_asc', 'price_desc', 'name_asc', 
  'name_desc', 'newest', 'oldest'
];