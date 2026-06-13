'use client';

import Link from 'next/link';
import { ShoppingBag, Menu, Search, X } from 'lucide-react';
import { useInquiryCart } from '../context/inquiry-cart-context';
import { useState, useEffect } from 'react';

export function Navbar() {
  const { itemCount } = useInquiryCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-cream/90 backdrop-blur-md border-b border-brand-forest/10 py-4' : 'bg-transparent py-8 border-b border-brand-forest/10'}`}>
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-brand-forest" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <Link href="/" className="font-serif text-2xl tracking-[0.2em] font-bold uppercase text-brand-forest">
            LEAF&DEO
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10 text-[11px] uppercase tracking-[0.15em] font-medium">
            <Link href="/collections" className="hover:opacity-50 transition-opacity">Collections</Link>
            <Link href="/collections/rare" className="hover:opacity-50 transition-opacity">Rare</Link>
            <Link href="/care" className="hover:opacity-50 transition-opacity">Care</Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <button className="hidden md:block text-brand-forest hover:opacity-50 transition-opacity">
              <Search className="w-5 h-5" />
            </button>
            <div className="hidden md:block h-[32px] w-[1px] bg-brand-forest/20 mx-2"></div>
            <Link href="/inquiry" className="relative border border-brand-forest px-6 py-2 text-[10px] uppercase tracking-widest font-bold hover:bg-brand-forest hover:text-brand-cream transition-all flex items-center gap-2">
              <span className="hidden md:inline">Inquiry Cart ({itemCount})</span>
              <ShoppingBag className="w-4 h-4 md:hidden" />
              {itemCount > 0 && (
                <span className="md:hidden absolute -top-2 -right-2 bg-brand-forest outline outline-2 outline-brand-cream text-brand-cream text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-brand-cream flex flex-col p-6 animate-in slide-in-from-left-full duration-300">
          <div className="flex justify-between items-center mb-12">
             <span className="font-serif text-2xl tracking-tight text-brand-forest">
              LEAF&DEO
            </span>
            <button onClick={() => setMobileMenuOpen(false)}>
              <X className="w-6 h-6 text-brand-forest" />
            </button>
          </div>
          <nav className="flex flex-col space-y-8 text-xl font-serif text-brand-forest">
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link href="/collections" onClick={() => setMobileMenuOpen(false)}>All Collections</Link>
            <Link href="/collections/rare" onClick={() => setMobileMenuOpen(false)}>Rare Aroids</Link>
            <Link href="/care" onClick={() => setMobileMenuOpen(false)}>Plant Care</Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
          </nav>
        </div>
      )}
    </>
  );
}
