import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../components/ui/button';
import { productService } from '../src/infrastructure/di';
import { formatINR } from '../src/core/utils/currency';

export default async function HomePage() {
  const featuredProducts = await productService.getFeaturedProducts();

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] md:h-screen flex flex-col md:flex-row md:items-stretch overflow-hidden pt-24 md:pt-0">
        
        {/* Left: Editorial */}
        <div className="w-full md:w-1/2 relative bg-brand-cream-dark p-8 md:p-16 xl:p-24 flex flex-col justify-end items-start text-left shrink-0">
          <div className="absolute top-20 right-10 w-[300px] h-[300px] bg-brand-forest/5 rounded-full blur-3xl hidden md:block" />
          <div className="relative z-10 mt-auto md:mt-0 pt-20 md:pt-0">
            <span className="text-[11px] uppercase tracking-[0.4em] text-brand-forest/60 block mb-6">
              India&apos;s Premier Botanical Courier
            </span>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-8 leading-[0.9] text-brand-forest font-light">
              Rare. Cultivated.<br />
              <span className="italic font-normal">Extraordinary.</span>
            </h1>
            <p className="max-w-md text-sm leading-relaxed text-brand-forest/80 mb-10">
              Discover our curated collection of pristine, imported aroids and tropical specimens. Expertly acclimated for the Indian collector.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link href="/collections" className="w-full sm:w-auto">
                <Button size="lg" className="bg-brand-forest text-brand-cream hover:opacity-90 px-8 py-6 rounded-none text-xs uppercase tracking-widest font-bold w-full sm:w-auto border border-brand-forest">
                  Explore Vault
                </Button>
              </Link>
              <Link href="/collections/rare" className="w-full sm:w-auto inline-flex items-center justify-center border border-brand-forest text-brand-forest px-8 py-6 text-xs uppercase tracking-widest font-bold hover:bg-brand-forest/5 transition-all text-center">
                View Lookbook
              </Link>
            </div>
          </div>
        </div>

        {/* Right: Background Image */}
        <div className="w-full md:w-1/2 relative min-h-[40vh] md:min-h-full">
          <Image 
            src="https://picsum.photos/seed/luxury-plants-dark/1920/1080" 
            alt="Luxury Imported Plants"
            fill
            className="object-cover"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-brand-forest/10" />
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-32 bg-brand-cream">
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-brand-forest/10 pb-8 gap-6">
            <div>
              <span className="text-brand-forest tracking-[0.2em] text-[9px] uppercase mb-2 block opacity-50">
                The Curated Edit
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-brand-forest italic">
                Featured Specimens
              </h2>
            </div>
            <Link href="/collections" className="text-[10px] uppercase tracking-widest underline underline-offset-4 text-brand-forest inline-block self-start md:self-auto">
              View All Arrivals
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-x-8 gap-y-12">
            {featuredProducts.map((product) => (
              <Link href={`/product/${product.slug}`} key={product.id} className="group block cursor-pointer">
                <div className="relative aspect-[3/4] overflow-hidden bg-brand-cream-dark mb-4 border border-brand-forest/5">
                  {/* Background overlay similar to natural tones placeholder */}
                  <div className="absolute inset-0 bg-brand-forest/10 flex items-center justify-center text-[10px] uppercase tracking-tighter mix-blend-multiply z-10 opacity-0 group-hover:opacity-100 transition-opacity">View</div>
                  <Image
                    src={product.images[0] || 'https://picsum.photos/seed/placeholder/800/1000'}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {product.priceVisibility === 'contact_for_price' && (
                    <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-[9px] uppercase tracking-widest z-20">
                      Private Sale
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-start text-brand-forest">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider mb-1 line-clamp-1">{product.name}</h3>
                    <p className="text-[11px] italic opacity-60 line-clamp-1">{product.scientificName}</p>
                  </div>
                  <div className="text-xs font-serif whitespace-nowrap pl-4">
                    {product.priceVisibility === 'public' ? formatINR(product.price) : 'Inquire'}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Section */}
      <section className="flex flex-col md:flex-row bg-brand-cream border-t border-brand-forest/10">
        <div className="w-full md:w-1/2 p-12 md:p-24 border-b md:border-b-0 md:border-r border-brand-forest/10 flex flex-col justify-center">
          <span className="block text-[9px] uppercase tracking-[0.2em] mb-4 text-brand-forest/50">
            Our Philosophy
          </span>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl mb-8 leading-snug text-brand-forest font-light italic">
            Impeccable Sourcing. <br />Expert Acclimation.
          </h2>
          <p className="text-brand-forest/80 text-sm font-light leading-relaxed mb-10 max-w-md">
            We travel the globe to partner with master growers, bringing only the most genetically superior and structurally flawless specimens to India. Every plant undergoes a rigorous 4-week quarantine and acclimation protocol before it reaches your collection.
          </p>
          <div className="flex gap-4">
             <Button variant="outline" size="lg" className="border-brand-forest text-brand-forest hover:bg-brand-forest/5 rounded-none text-xs uppercase tracking-widest font-bold">
              Read Our Story
            </Button>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="relative aspect-square md:aspect-auto md:flex-1 w-full bg-brand-cream-dark">
            <Image
              src="https://picsum.photos/seed/lifestyle-plant-1/1000/1000"
              alt="Impeccable Sourcing"
              fill
              className="object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Utility blocks mimicking design */}
          <div className="grid grid-cols-2 text-center border-t border-brand-forest/10 bg-brand-cream">
            <div className="border-r border-brand-forest/10 p-8 flex flex-col justify-center items-center">
              <span className="block text-[9px] uppercase tracking-[0.2em] mb-2 text-brand-forest/50">Concierge Service</span>
              <h4 className="text-xs font-bold uppercase mb-4 tracking-widest underline decoration-brand-forest/30 text-brand-forest">WhatsApp Sales</h4>
            </div>
            <div className="p-8 flex flex-col justify-center items-center">
              <span className="block text-[9px] uppercase tracking-[0.2em] mb-2 text-brand-forest/50">Premium Logistics</span>
              <h4 className="text-xs font-bold uppercase mb-4 tracking-widest underline decoration-brand-forest/30 text-brand-forest">Pan India</h4>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
