export type ProductCategory = 'devices' | 'lifestyle' | 'software' | 'tinkering';

export interface Product {
  id: string;
  category: ProductCategory;
  name: string;
  brand: string;
  rating: number;
  review: string;
  purchaseDate: string;
  imageUrl?: string;
  price?: number;
  link?: string;
  tags?: string[];
}

export interface ProductStats {
  totalDevices: number;
  totalLifestyle: number;
  totalSoftware: number;
  totalTinkering: number;
  totalSpent: number;
  averageRating: number;
}