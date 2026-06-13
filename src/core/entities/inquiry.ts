import { Product, ProductVariant } from './product';

export interface InquiryItem {
  product: Product;
  variant: ProductVariant;
  quantityInterest: number;
  notes?: string;
}

export interface InquiryCart {
  items: InquiryItem[];
}
