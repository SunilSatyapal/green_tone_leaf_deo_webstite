export function formatINR(amount: number): string {
  if (amount === 0) return 'Contact for Price';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
