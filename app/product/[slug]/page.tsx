import Image from 'next/image';
import { notFound } from 'next/navigation';
import { productService } from '../../../src/infrastructure/di';
import { ProductActions } from '../../../components/product/product-actions';

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await productService.getProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-brand-cream pt-24 pb-20">
      
      {/* Product Main Section */}
      <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
        
        {/* Gallery */}
        <div className="space-y-4 sticky top-32">
          <div className="relative aspect-[4/5] bg-brand-cream-dark w-full">
            <Image
              src={product.images[0] || 'https://picsum.photos/seed/placeholder/800/1000'}
              alt={product.name}
              fill
              className="object-cover"
              priority
              referrerPolicy="no-referrer"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {product.images.map((img, i) => (
                <div key={i} className="relative w-24 h-32 flex-shrink-0 bg-brand-cream-dark cursor-pointer opacity-80 hover:opacity-100 transition-opacity">
                  <Image src={img} alt={`Gallery ${i}`} fill className="object-cover" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info & Actions */}
        <div className="pt-8">
          <div className="mb-4 text-xs uppercase tracking-widest text-brand-forest-light">
            {product.category} &bull; Origin: {product.originCountry}
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-brand-forest mb-2">
            {product.name}
          </h1>
          <h2 className="text-sm italic text-brand-forest/60 mb-8 font-serif">
            {product.scientificName}
          </h2>

          <p className="text-brand-forest/80 leading-relaxed font-light mb-8">
            {product.description}
          </p>

          <ProductActions product={product} />

          {/* Luxury Accordions / Care Info */}
          <div className="mt-16 border-t border-brand-forest/20 divide-y divide-brand-forest/10">
            
            {product.plantStory && (
              <div className="py-6 transition-all">
                <h3 className="text-xs uppercase tracking-widest font-medium mb-4 text-brand-forest">The Lineage Story</h3>
                <p className="text-sm font-light text-brand-forest/80 leading-relaxed">{product.plantStory}</p>
              </div>
            )}

            {product.collectorNotes && (
              <div className="py-6 transition-all">
                <h3 className="text-xs uppercase tracking-widest font-medium mb-4 text-brand-forest">Collector&apos;s Notes</h3>
                <p className="text-sm font-light text-brand-forest/80 leading-relaxed flex items-start">
                  <span className="text-brand-gold mr-2">✦</span>
                  {product.collectorNotes}
                </p>
              </div>
            )}

            <div className="py-6 transition-all">
              <h3 className="text-xs uppercase tracking-widest font-medium mb-6 text-brand-forest">Acclimation & Care</h3>
              <ul className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm text-brand-forest/80 font-light">
                <li className="flex flex-col space-y-1">
                  <span className="text-[10px] uppercase text-brand-forest/50">Light</span>
                  <span>{product.care.lightRequirement}</span>
                </li>
                <li className="flex flex-col space-y-1">
                  <span className="text-[10px] uppercase text-brand-forest/50">Humidity</span>
                  <span>{product.care.humidity}</span>
                </li>
                <li className="flex flex-col space-y-1">
                  <span className="text-[10px] uppercase text-brand-forest/50">Watering</span>
                  <span>{product.care.watering}</span>
                </li>
                <li className="flex flex-col space-y-1">
                  <span className="text-[10px] uppercase text-brand-forest/50">Experience Level</span>
                  <span>{product.care.difficulty}</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
