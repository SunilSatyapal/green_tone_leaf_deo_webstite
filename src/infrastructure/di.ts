import { ProductService } from '../core/services/product.service';
import { MockProductProvider } from './providers/mock-product.provider';

// Dependency Injection Container (Simple manual composition root)

// 1. Instantiate Providers (Infrastructure)
const productProvider = new MockProductProvider();

// 2. Instantiate Services (Application Layer) injecting the providers
export const productService = new ProductService(productProvider);
