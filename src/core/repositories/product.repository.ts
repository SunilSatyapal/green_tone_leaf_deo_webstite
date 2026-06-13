import { Product } from '../entities/product';

export interface ProductRepository {
  getProducts(): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | null>;
  getFeaturedProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
}
