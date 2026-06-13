export interface Product {
  id: string; // SKU or UUID
  name: string;
  scientificName: string;
  slug: string;
  shortDescription: string;
  description: string;
  category: string;
  originCountry: string;
  price: number;
  priceVisibility: 'public' | 'contact_for_price' | 'request_quote';
  stockStatus: 'in_stock' | 'out_of_stock' | 'coming_soon';
  
  // Luxury/Collector Details
  plantStory?: string;
  collectorNotes?: string;
  importDetails?: string;
  
  // Care Info
  care: PlantCareInfo;
  
  // Media
  images: string[];
  
  // Variants
  variants: ProductVariant[];
  
  // Meta
  tags: string[];
}

export interface PlantCareInfo {
  lightRequirement: string;
  humidity: string;
  watering: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Expert';
  growthRate: 'Slow' | 'Moderate' | 'Fast';
  petSafe: boolean;
  temperature: string;
}

export interface ProductVariant {
  id: string;
  name: string; // e.g., "Medium - 4 Leaves", "Collector Grade - Mother Plant"
  priceModifier?: number;
  stockStatus: 'in_stock' | 'out_of_stock';
}
