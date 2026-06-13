'use client';

import React, { useState } from 'react';
import { Product, ProductVariant } from '../../src/core/entities/product';
import { Button } from '../ui/button';
import { useInquiryCart } from '../context/inquiry-cart-context';
import { whatsappService } from '../../src/core/services/whatsapp.service';
import { formatINR } from '../../src/core/utils/currency';
import { MessageCircle, ShoppingBag } from 'lucide-react';

export function ProductActions({ product }: { product: Product }) {
  const { addItem } = useInquiryCart();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0] || {} as ProductVariant);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const finalPrice = product.price + (selectedVariant.priceModifier || 0);
  const displayPrice = product.priceVisibility === 'public' ? formatINR(finalPrice) : 'Contact for Price';

  const handleAddToCart = () => {
    addItem(product, selectedVariant, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    const link = whatsappService.getSingleProductLink(product, selectedVariant.name);
    window.open(link, '_blank');
  };

  return (
    <div className="mt-8 pt-8 border-t border-brand-forest/10">
      
      {/* Price Display */}
      <div className="mb-8">
        <span className="text-3xl font-serif text-brand-forest block mb-2">{displayPrice}</span>
        <span className="text-xs uppercase tracking-widest text-brand-forest/60 block">
          {product.stockStatus === 'in_stock' ? 'Available to Order' : 'Currently Unavailable'}
        </span>
      </div>

      {/* Variants */}
      {product.variants.length > 0 && (
        <div className="mb-8">
          <span className="text-xs uppercase tracking-widest text-brand-forest/60 mb-4 block">Select Specimen Grade</span>
          <div className="grid grid-cols-1 gap-3">
            {product.variants.map((v) => (
              <button
                key={v.id}
                onClick={() => setSelectedVariant(v)}
                className={`text-left p-4 border transition-all ${selectedVariant.id === v.id ? 'border-brand-forest bg-brand-forest/5' : 'border-brand-forest/20 hover:border-brand-forest/50'}`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-brand-forest text-sm">{v.name}</span>
                  {v.priceModifier ? (
                    <span className="text-xs text-brand-forest/60">+ {formatINR(v.priceModifier)}</span>
                  ) : null}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col space-y-4">
        {product.priceVisibility === 'public' ? (
          <>
            <Button size="lg" className="w-full flex items-center justify-center space-x-2" onClick={handleAddToCart} disabled={product.stockStatus !== 'in_stock'}>
              <ShoppingBag className="w-4 h-4" />
              <span>{added ? 'Added to Inquiry' : 'Add to Inquiry Cart'}</span>
            </Button>
            <Button variant="outline" size="lg" className="w-full flex items-center justify-center space-x-2" onClick={handleBuyNow}>
              <MessageCircle className="w-4 h-4" />
              <span>Purchase via WhatsApp</span>
            </Button>
          </>
        ) : (
          <Button size="lg" className="w-full flex items-center justify-center space-x-2" onClick={handleBuyNow}>
            <MessageCircle className="w-4 h-4" />
            <span>Request Private Quote</span>
          </Button>
        )}
      </div>

    </div>
  );
}
