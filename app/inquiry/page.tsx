'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useInquiryCart } from '../../components/context/inquiry-cart-context';
import { Button } from '../../components/ui/button';
import { formatINR } from '../../src/core/utils/currency';
import { whatsappService } from '../../src/core/services/whatsapp.service';
import { ArrowRight, Trash2 } from 'lucide-react';

export default function InquiryCartPage() {
  const { cart, removeItem, clearCart, itemCount } = useInquiryCart();
  const [customerNotes, setCustomerNotes] = useState('');

  const handleSendToWhatsApp = () => {
    const link = whatsappService.getInquiryCartLink(cart.items, customerNotes);
    window.open(link, '_blank');
    // Optional: clearCart() after successful redirect
  };

  if (itemCount === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-brand-cream px-6">
        <h1 className="font-serif text-3xl md:text-5xl text-brand-forest mb-6">Your Inquiry is Empty</h1>
        <p className="text-brand-forest/60 mb-10 max-w-md text-center">
          Browse our collection of imported specimens to add items for a private consultation and shipping quote.
        </p>
        <Link href="/collections">
          <Button variant="outline" size="lg">Explore Collection</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream pt-32 pb-20">
      <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-12">
        <div className="mb-12">
          <span className="text-brand-forest-light tracking-[0.2em] text-xs uppercase mb-4 block">
            Private Consultation
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-brand-forest mb-4">
            Inquiry Request
          </h1>
          <p className="text-brand-forest/70 font-light text-sm max-w-2xl">
            Review your selected specimens below. Once submitted, our concierge team will contact you via WhatsApp to confirm availability, finalize pricing, and arrange acclimated shipping.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-8">
            <div className="hidden border-b border-brand-forest/10 pb-4 md:grid grid-cols-12 gap-4 text-xs uppercase tracking-widest text-brand-forest/50">
              <div className="col-span-6">Specimen</div>
              <div className="col-span-3 text-center">Expected Price</div>
              <div className="col-span-3 text-right">Actions</div>
            </div>

            <div className="divide-y divide-brand-forest/10 border-b border-brand-forest/10 pb-8">
              {cart.items.map((item, index) => {
                const finalPrice = item.product.price + (item.variant.priceModifier || 0);
                const displayPrice = item.product.priceVisibility === 'public' ? formatINR(finalPrice) : 'TBD';

                return (
                  <div key={`${item.product.id}-${item.variant.id}`} className="py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    <div className="md:col-span-6 flex items-center space-x-6">
                      <div className="relative w-20 h-24 md:w-24 md:h-32 bg-brand-cream-dark flex-shrink-0">
                        <Image 
                          src={item.product.images[0] || 'https://picsum.photos/seed/placeholder/800/1000'}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <h3 className="font-serif text-lg text-brand-forest mb-1">{item.product.name}</h3>
                        <p className="text-xs text-brand-forest/60 mb-2">Variant: {item.variant.name}</p>
                        <p className="text-xs text-brand-forest/50">Qty Interested: {item.quantityInterest}</p>
                      </div>
                    </div>
                    
                    <div className="md:col-span-3 text-left md:text-center font-medium text-brand-forest text-sm">
                      {displayPrice}
                    </div>

                    <div className="md:col-span-3 flex justify-end">
                      <button 
                        onClick={() => removeItem(item.product.id, item.variant.id)}
                        className="text-brand-forest/40 hover:text-red-500 transition-colors uppercase text-[10px] tracking-widest flex items-center space-x-2"
                      >
                        <span>Remove</span>
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="flex justify-between items-center">
               <Link href="/collections" className="text-xs uppercase tracking-widest border-b border-brand-forest/30 pb-1 text-brand-forest hover:border-brand-forest transition-all">
                  ← Continue Exploring
               </Link>
               <button onClick={clearCart} className="text-xs font-light text-brand-forest/50 hover:text-brand-forest transition-colors">
                  Empty Request
               </button>
            </div>
          </div>

          {/* Submission Panel */}
          <div className="lg:col-span-1 border border-brand-forest/10 p-8 self-start bg-white/40 backdrop-blur-sm sticky top-32">
            <h2 className="font-serif text-2xl text-brand-forest mb-6">Concierge Desk</h2>
            
            <div className="space-y-6 mb-8 pt-6 border-t border-brand-forest/10">
              <div>
                <label className="block text-xs uppercase tracking-widest text-brand-forest/60 mb-3">Additional Notes or Sourcing Requests</label>
                <textarea 
                  value={customerNotes}
                  onChange={(e) => setCustomerNotes(e.target.value)}
                  className="w-full bg-brand-cream/50 border border-brand-forest/20 p-4 text-sm font-light text-brand-forest focus:outline-none focus:border-brand-forest resize-none h-32"
                  placeholder="E.g., I'm looking for a highly variegated specific leaf pattern, or shipping to New Delhi."
                />
              </div>
            </div>

            <Button 
               size="lg" 
               className="w-full flex items-center justify-between group"
               onClick={handleSendToWhatsApp}
            >
              <span>Submit to WhatsApp</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
            
            <p className="text-[10px] text-brand-forest/50 text-center mt-6 font-light">
              By submitting this inquiry, you are contacting our sales team directly. No payment is processed at this step.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
