export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  availableSizes: string[];
  featured: boolean;
  arLensId?: string;
  arLensGroupId?: string;
}