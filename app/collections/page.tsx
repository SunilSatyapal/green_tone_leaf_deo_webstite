import Image from 'next/image';
import Link from 'next/link';
import { productService } from '../../src/infrastructure/di';
import { formatINR } from '../../src/core/utils/currency';

export default async function CollectionsPage() {
  const products = await productService.getAllProducts();

  return (
    <div className="min-h-screen bg-brand-cream pt-32 pb-20">
      <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-12">
        <div className="mb-16">
          <span className="text-brand-forest-light tracking-[0.2em] text-xs uppercase mb-4 block">
            The Catalog
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-brand-forest mb-6">
            All Botanical Specimens
          </h1>
          <p className="max-w-2xl text-brand-forest/70">
            Browse our entire collection of rare and premium imported plants. Filtered by genus, rarity, and availability.
          </p>
        </div>

        {/* Filters placeholder */}
        <div className="flex border-t border-b border-brand-forest/10 py-4 mb-12 space-x-8 text-xs uppercase tracking-widest text-brand-forest/60 overflow-x-auto whitespace-nowrap">
          <span className="text-brand-forest font-medium border-b border-brand-forest pb-1">All Plants</span>
          <span className="hover:text-brand-forest cursor-pointer transition-colors">Monstera</span>
          <span className="hover:text-brand-forest cursor-pointer transition-colors">Philodendron</span>
          <span className="hover:text-brand-forest cursor-pointer transition-colors">Anthurium</span>
          <span className="hover:text-brand-forest cursor-pointer transition-colors">Collector&apos;s Vault</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-16">
          {products.map((product) => (
            <Link href={`/product/${product.slug}`} key={product.id} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden bg-brand-cream-dark mb-6">
                <Image
                  src={product.images[0] || 'https://picsum.photos/seed/placeholder/800/1000'}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                {product.priceVisibility === 'contact_for_price' && (
                  <div className="absolute top-4 left-4 bg-brand-forest text-brand-cream text-[10px] uppercase tracking-widest px-3 py-1">
                    Private Sale
                  </div>
                )}
                {product.stockStatus === 'out_of_stock' && (
                  <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm text-brand-cream text-[10px] uppercase tracking-widest px-3 py-1">
                    Out of Stock
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-serif text-lg text-brand-forest mb-1 line-clamp-1">{product.name}</h3>
                <p className="text-xs text-brand-forest/50 italic mb-3">{product.category}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-brand-forest">
                    {product.priceVisibility === 'public' ? formatINR(product.price) : 'Price on Request'}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
