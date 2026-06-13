import { ProductRepository } from '../../core/repositories/product.repository';
import { Product } from '../../core/entities/product';

const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p-001',
    name: 'Monstera Deliciosa Albo Borsigiana',
    scientificName: 'Monstera deliciosa \'Albo Borsigiana\'',
    slug: 'monstera-albo',
    shortDescription: 'Stunning highly variegated imported Monstera.',
    description: 'A collector\'s dream. This imported Monstera Albo features striking white and green variegation. Each leaf is a unique piece of art. Sourced from premier growers in Thailand.',
    category: 'Monstera',
    originCountry: 'Thailand',
    price: 15000,
    priceVisibility: 'public',
    stockStatus: 'in_stock',
    plantStory: 'This specific lineage has been cultivated for over 5 years to ensure stable, high-contrast variegation.',
    collectorNotes: 'Look for the marbled stem variegation which indicates future leaf stability.',
    care: {
      lightRequirement: 'Bright Indirect',
      humidity: '60%+',
      watering: 'Allow top 2 inches to dry',
      difficulty: 'Intermediate',
      growthRate: 'Moderate',
      petSafe: false,
      temperature: '18°C - 27°C'
    },
    images: [
      'https://picsum.photos/seed/monstera-albo-1/800/1000',
      'https://picsum.photos/seed/monstera-albo-2/800/1000',
    ],
    variants: [
      { id: 'v-001-1', name: 'Starter Plant (2-3 Leaves)', stockStatus: 'in_stock' },
      { id: 'v-001-2', name: 'Collector Grade (Half Moon)', priceModifier: 5000, stockStatus: 'in_stock' }
    ],
    tags: ['rare', 'variegated', 'monstera']
  },
  {
    id: 'p-002',
    name: 'Philodendron Spiritus Sancti',
    scientificName: 'Philodendron spiritus-sancti',
    slug: 'philodendron-spiritus-sancti',
    shortDescription: 'The holy grail of Philodendrons.',
    description: 'Extremely rare and sought after. Known for its long, pendant leaves and deep green color. A true statement piece for serious collectors.',
    category: 'Philodendron',
    originCountry: 'Brazil (Cultivated)',
    price: 0,
    priceVisibility: 'contact_for_price',
    stockStatus: 'in_stock',
    plantStory: 'Historically one of the rarest plants in cultivation, now carefully propagated to preserve the species.',
    care: {
      lightRequirement: 'Medium to Bright Indirect',
      humidity: '70%+',
      watering: 'Keep evenly moist, do not let dry completely',
      difficulty: 'Expert',
      growthRate: 'Slow',
      petSafe: false,
      temperature: '20°C - 28°C'
    },
    images: [
      'https://picsum.photos/seed/spiritus-1/800/1000',
    ],
    variants: [
      { id: 'v-002-1', name: 'Juvenile (4 Leaves)', stockStatus: 'in_stock' }
    ],
    tags: ['ultra-rare', 'philodendron']
  },
  {
    id: 'p-003',
    name: 'Anthurium Warocqueanum',
    scientificName: 'Anthurium warocqueanum',
    slug: 'anthurium-warocqueanum',
    shortDescription: 'The Queen Anthurium with velvety elongated leaves.',
    description: 'The Queen Anthurium commands attention with its massive, dark green, velvety leaves and striking silver veining. Requires high humidity to thrive.',
    category: 'Anthurium',
    originCountry: 'Ecuador',
    price: 8500,
    priceVisibility: 'public',
    stockStatus: 'in_stock',
    care: {
      lightRequirement: 'Medium Indirect',
      humidity: '80%+',
      watering: 'Keep consistently moist',
      difficulty: 'Expert',
      growthRate: 'Moderate',
      petSafe: false,
      temperature: '18°C - 25°C'
    },
    images: [
      'https://picsum.photos/seed/anthurium-waro-1/800/1000',
    ],
    variants: [
      { id: 'v-003-1', name: 'Medium (12-15" leaf)', stockStatus: 'in_stock' },
      { id: 'v-003-2', name: 'Large (20"+ leaf)', priceModifier: 4000, stockStatus: 'out_of_stock' }
    ],
    tags: ['velvet', 'anthurium']
  }
];

export class MockProductProvider implements ProductRepository {
  async getProducts(): Promise<Product[]> {
    return MOCK_PRODUCTS;
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    return MOCK_PRODUCTS.find(p => p.slug === slug) || null;
  }

  async getFeaturedProducts(): Promise<Product[]> {
    // Return first 2 as featured for mock
    return MOCK_PRODUCTS.slice(0, 2);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return MOCK_PRODUCTS.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }
}
