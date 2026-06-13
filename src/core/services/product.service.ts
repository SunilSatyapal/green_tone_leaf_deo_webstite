import { ProductRepository } from '../repositories/product.repository';
import { Product } from '../entities/product';

export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.getProducts();
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return this.productRepository.getFeaturedProducts();
  }

  async getProduct(slug: string): Promise<Product | null> {
    return this.productRepository.getProductBySlug(slug);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return this.productRepository.getProductsByCategory(category);
  }
}
