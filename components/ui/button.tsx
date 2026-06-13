import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-forest disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-brand-forest text-brand-cream hover:bg-brand-forest/90': variant === 'primary',
            'bg-brand-cream-dark text-brand-forest hover:bg-black/5': variant === 'secondary',
            'border border-brand-forest/20 bg-transparent hover:bg-brand-forest/5 text-brand-forest': variant === 'outline',
            'hover:bg-brand-forest/5 text-brand-forest': variant === 'ghost',
            'h-9 px-4 py-2': size === 'md',
            'h-8 px-3 text-xs': size === 'sm',
            'h-12 px-8 text-base': size === 'lg',
            'h-9 w-9': size === 'icon',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
