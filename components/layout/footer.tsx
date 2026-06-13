import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-brand-forest text-brand-cream pt-20 pb-4 mt-auto">
      <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <h3 className="font-serif text-2xl tracking-[0.2em] font-bold uppercase mb-6 text-brand-cream">LEAF&DEO</h3>
          <p className="text-brand-cream/60 text-sm leading-relaxed max-w-xs">
            The destination for premium imported botanical specimens in India. We source, acclimate, and deliver rare aroids to collectors nationwide.
          </p>
        </div>
        
        <div>
          <h4 className="text-[10px] tracking-[0.2em] uppercase mb-6 font-bold text-brand-cream">Explore</h4>
          <ul className="space-y-4 text-xs tracking-widest uppercase text-brand-cream/60">
            <li><Link href="/collections" className="hover:text-brand-cream transition-opacity">All Plants</Link></li>
            <li><Link href="/collections/rare" className="hover:text-brand-cream transition-opacity">Collector&apos;s Vault</Link></li>
            <li><Link href="/care" className="hover:text-brand-cream transition-opacity">Care Instructions</Link></li>
            <li><Link href="/about" className="hover:text-brand-cream transition-opacity">Our Story</Link></li>
          </ul>
        </div>

        <div>
           <h4 className="text-[10px] tracking-[0.2em] uppercase mb-6 font-bold text-brand-cream">Support</h4>
          <ul className="space-y-4 text-xs tracking-widest uppercase text-brand-cream/60">
            <li><Link href="/faq" className="hover:text-brand-cream transition-opacity">FAQ</Link></li>
            <li><Link href="/shipping" className="hover:text-brand-cream transition-opacity">Shipping & Acclimation</Link></li>
            <li><Link href="/returns" className="hover:text-brand-cream transition-opacity">Returns Policy</Link></li>
            <li><Link href="/contact" className="hover:text-brand-cream transition-opacity">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] tracking-[0.2em] uppercase mb-6 font-bold text-brand-cream">Connect</h4>
          <p className="text-sm text-brand-cream/60 mb-4">Join our private collector&apos;s list for exclusive drop notifications.</p>
          <div className="flex border-b border-brand-cream/20 pb-2">
            <input 
              type="email" 
              placeholder="Email Address" 
              className="bg-transparent outline-none text-sm w-full placeholder:text-brand-cream/40 focus:placeholder:text-transparent transition-all"
            />
            <button className="text-[10px] uppercase tracking-widest font-bold text-brand-cream hover:opacity-80 transition-opacity">Join</button>
          </div>
        </div>
      </div>
      
      {/* Replaces the copyright row with the themed bottom status bar */}
      <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-12 mt-20 pt-4 border-t border-brand-cream/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap gap-4 md:gap-8 text-[9px] uppercase tracking-[0.2em] opacity-80">
          <span>&copy; {new Date().getFullYear()} LEAF&DEO</span>
          <span>Curating since 2021</span>
          <span>Authenticity Guaranteed</span>
          <div className="flex space-x-6 md:ml-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Privacy</Link>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-[9px] uppercase tracking-[0.1em]">Now Importing: New Anthurium Hybrids</span>
        </div>
      </div>
    </footer>
  );
}
