export interface StoreProduct {
  id: string;
  name: string;
  category: StoreCategory;
  shortDescription: string;
  features: string[];
  monthlyPrice: number; // in ZAR
  annualPrice: number;  // in ZAR
  imageUrl: string;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
}

export type StoreCategory =
  | 'Microsoft 365 & Business Email'
  | 'Website Hosting & Domains'
  | 'Antivirus & Security'
  | 'Business Internet (Fibre/LTE/5G)'
  | 'Cloud Backup'
  | 'IT Support Packages'
  | 'Productivity & Office'
  | 'Cybersecurity'
  | 'Cloud Services'
  | 'Hosting & Domains'
  | 'Design & Creative'
  | 'Business Software'
  | 'Connectivity & Communications'
  | 'Productivity & Office Software'
  | 'Graphic Design & Creative Software'
  | 'CAD & Engineering Design Software'
  | 'Cybersecurity & Antivirus'
  | 'PDF & Document Management'
  | 'Operating Systems & Server Software'
  | 'Business & Accounting Software'
  | 'Cloud & Hosting Services'
  | 'Connectivity & Communication Tools';

export interface EnquiryBasketItem {
  product: StoreProduct;
  priceChoice: 'monthly' | 'annual';
  quantity: number;
}

export interface StoreQuotationRequest {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  businessName: string;
  message?: string;
  items: {
    productId: string;
    productName: string;
    category: string;
    priceChoice: 'monthly' | 'annual';
    price: number;
    quantity: number;
  }[];
  totalMonthlyAmount: number;
  totalAnnualAmount: number;
  status: 'pending' | 'approved' | 'rejected' | 'completed' | 'invoice_sent';
  createdAt: string;
  uid?: string; // Optional reference to registered customer UID
  approvedAt?: string;
  invoiceId?: string;
}

export interface Invoice {
  id: string;
  quoteRequestId: string;
  customerUid: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    billingCycle: 'monthly' | 'annual' | 'once-off';
  }[];
  totalAmount: number;
  status: 'paid' | 'unpaid' | 'overdue';
  paymentGateway?: 'PayFast' | 'Yoco' | 'Ozow' | 'Stripe' | 'Peach Payments';
  paymentDate?: string;
  createdAt: string;
}

export interface Subscription {
  id: string;
  customerUid: string;
  productName: string;
  productId: string;
  billingCycle: 'monthly' | 'annual';
  price: number;
  status: 'active' | 'cancelled' | 'paused';
  startDate: string;
  nextBillingDate: string;
  createdAt: string;
}

export interface SupportRequest {
  id: string;
  customerUid: string;
  customerName: string;
  customerEmail: string;
  subject: string;
  message: string;
  category: 'Technical' | 'Billing' | 'General';
  status: 'open' | 'in_progress' | 'resolved';
  createdAt: string;
  adminResponse?: string;
  repliedAt?: string;
}

export interface PaymentGatewayConfig {
  id: 'payfast' | 'yoco' | 'ozow' | 'peach' | 'stripe';
  name: string;
  logo: string;
  enabled: boolean;
  merchantId?: string;
  apiKey?: string;
  testMode: boolean;
}
