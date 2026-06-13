import { InquiryItem } from '../entities/inquiry';
import { Product } from '../entities/product';

export class WhatsAppService {
  private readonly SALES_NUMBER = '919876543210'; // Mock number
  private readonly SUPPORT_NUMBER = '919876543211'; // Mock number

  // Generate a WhatsApp deep link
  private generateLink(phone: string, message: string): string {
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phone}?text=${encodedMessage}`;
  }

  // Single Product Buy Now Flow
  getSingleProductLink(product: Product, variantName?: string): string {
    const variantText = variantName ? `\nVariant: ${variantName}` : '';
    const message = `Hello LEAF&DEO Team,\n\nI am interested in purchasing:\n\n*${product.name}* (${product.scientificName})${variantText}\n\nCould you please share the current availability and delivery details?\n\nProduct Link: [URL Placeholder]`;
    return this.generateLink(this.SALES_NUMBER, message);
  }

  // Inquiry Cart Flow
  getInquiryCartLink(items: InquiryItem[], customerNotes: string = ''): string {
    let message = `Hello LEAF&DEO Team,\n\nI would like to request a quote/availability for the following items:\n\n`;
    
    items.forEach((item, index) => {
      message += `${index + 1}. *${item.product.name}*\n   Expected Variant: ${item.variant.name}\n   Interest/Qty: ${item.quantityInterest}\n`;
      if (item.notes) {
        message += `   Note: ${item.notes}\n`;
      }
      message += '\n';
    });

    if (customerNotes) {
      message += `Additional Notes:\n${customerNotes}\n\n`;
    }

    message += `Please let me know the availability, final pricing, and shipping estimate.`;
    
    return this.generateLink(this.SALES_NUMBER, message);
  }

  getSupportLink(): string {
    const message = `Hello LEAF&DEO Support,\n\nI need help with my plant care / recent order.\n`;
    return this.generateLink(this.SUPPORT_NUMBER, message);
  }
}

export const whatsappService = new WhatsAppService();
