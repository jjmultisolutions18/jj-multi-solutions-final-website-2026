import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  orderBy
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './firebase';
import { 
  StoreProduct, 
  StoreQuotationRequest, 
  Invoice, 
  Subscription, 
  SupportRequest,
  StoreCategory 
} from '../types/store';

// Collection references
const PRODUCTS_COL = 'storeProducts';
const QUOTES_COL = 'storeQuotationRequests';
const INVOICES_COL = 'invoices';
const SUBS_COL = 'subscriptions';
const TICKETS_COL = 'supportRequests';

// High-quality pre-seeded default South African SME products
export const SEEDED_PRODUCTS: Omit<StoreProduct, 'id'>[] = [
  // Microsoft 365 & Business Email
  {
    name: 'Microsoft 365 Business Basic',
    category: 'Microsoft 365 & Business Email',
    shortDescription: 'Professional cloud business email, Teams, secure OneDrive (1TB) cloud storage, and web versions of Word, Excel, and Outlook.',
    features: ['Business Email (50GB mailbox)', 'Teams online meetings and chat', '1TB secure OneDrive cloud storage', 'Web versions of Word, Excel, PowerPoint', 'Spam and malware server filters'],
    monthlyPrice: 110,
    annualPrice: 1188,
    imageUrl: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&auto=format&fit=crop&q=60',
    isActive: true,
    isFeatured: true,
    createdAt: new Date().toISOString()
  },
  {
    name: 'Microsoft 365 Business Standard',
    category: 'Microsoft 365 & Business Email',
    shortDescription: 'The complete productivity suite. Fully installed premium Office apps on PCs, tablets and phones, plus secure collaborative tools.',
    features: ['Fully installed premium Office desktop apps', 'Full Microsoft Teams collaboration', 'Business email with custom domain', '1TB cloud storage per user', 'Advanced host-level security and access controls'],
    monthlyPrice: 250,
    annualPrice: 2700,
    imageUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&auto=format&fit=crop&q=60',
    isActive: true,
    isFeatured: true,
    createdAt: new Date().toISOString()
  },
  
  // Website Hosting & Domains
  {
    name: 'Lite Linux Shared Hosting',
    category: 'Website Hosting & Domains',
    shortDescription: 'Fast, secure, and budget-friendly shared hosting tailored for starting South African SMME sites. Includes free co.za domains.',
    features: ['5GB Superfast SSD Storage', '10 Professional SMTP emails', 'Free Let\'s Encrypt SSL certificate', 'Free .co.za domain registration (1 year)', 'User-friendly hosting panel'],
    monthlyPrice: 59,
    annualPrice: 636,
    imageUrl: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=600&auto=format&fit=crop&q=60',
    isActive: true,
    isFeatured: false,
    createdAt: new Date().toISOString()
  },
  {
    name: 'Pro Business Hosting',
    category: 'Website Hosting & Domains',
    shortDescription: 'High performance hosting for dynamic business websites. Optimized bandwidth, high traffic threshold, with premium cPanel control.',
    features: ['30GB NVMe SSD Fast Storage', 'Unlimited professional email accounts', 'Free SSL certificate & dedicated IP', 'Free .co.za domain registration', 'Daily cloud website backups'],
    monthlyPrice: 149,
    annualPrice: 1608,
    imageUrl: 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?w=600&auto=format&fit=crop&q=60',
    isActive: true,
    isFeatured: true,
    createdAt: new Date().toISOString()
  },

  // Antivirus & Security
  {
    name: 'Kaspersky Premium Endpoint Security',
    category: 'Antivirus & Security',
    shortDescription: 'Protect your hardware and company assets with industry-leading cloud endpoint security. Multi-layered protection against viruses and ransomware.',
    features: ['Award-winning virus & ransomware shield', 'Real-time phishing & scam detection', 'Corporate safe banking web protection', 'Integrated local firewall', 'Smart client resource usage'],
    monthlyPrice: 45,
    annualPrice: 490,
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=60',
    isActive: true,
    isFeatured: true,
    createdAt: new Date().toISOString()
  },

  // Business Internet (Fibre/LTE/5G)
  {
    name: 'SME Uncapped Fibre (50/50 Mbps)',
    category: 'Business Internet (Fibre/LTE/5G)',
    shortDescription: 'Symmetrical, uncapped business fibre connectivity with low-latency routing and optimized performance for concurrent Zooming and backup.',
    features: ['50 Mbps Upload & Download speeds', 'Absolutely uncapped data with 0 FUP limits', 'Synchronous channel perfect for backups', 'Free Wi-Fi standard router included', 'Proactive SLA: 99% Uptime guaranteed'],
    monthlyPrice: 699,
    annualPrice: 7990,
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&auto=format&fit=crop&q=60',
    isActive: true,
    isFeatured: true,
    createdAt: new Date().toISOString()
  },
  {
    name: 'Business Uncapped LTE Router Package',
    category: 'Business Internet (Fibre/LTE/5G)',
    shortDescription: 'Plug-and-play high-speed LTE internet for off-grid operations or immediate office setups. Uncapped data with reliable signals.',
    features: ['Fast 4G/LTE mobile speeds', 'Plug-and-play activation in minutes', 'Includes pre-configured LTE desk router', 'Uncapped data plan for entire team', 'Perfect failover backup connection'],
    monthlyPrice: 499,
    annualPrice: 5690,
    imageUrl: 'https://images.unsplash.com/photo-1562408590-e32931084e23?w=600&auto=format&fit=crop&q=60',
    isActive: true,
    isFeatured: false,
    createdAt: new Date().toISOString()
  },

  // Cloud Backup
  {
    name: 'JJMS Secured Cloud Backup 100GB',
    category: 'Cloud Backup',
    shortDescription: 'Sleep well knowing your mission critical finance, ERP database, and company files are securely replicated in automated offsite cloud backups.',
    features: ['100GB AES-256 military-grade encrypted cloud vault', 'Fully automated scheduled night runs', 'Self-service recovery software interface', 'Ransomware backup freeze protection', 'Sought-after POPIA & GDPR compliant storage'],
    monthlyPrice: 120,
    annualPrice: 1290,
    imageUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&auto=format&fit=crop&q=60',
    isActive: true,
    isFeatured: false,
    createdAt: new Date().toISOString()
  },
  {
    name: 'JJMS Enterprise Cloud Backup 1TB',
    category: 'Cloud Backup',
    shortDescription: 'Industrial strength system-state backup. Protects multiple servers, virtual environments, MS SQL local engines, and high-volume network drives.',
    features: ['1000GB (1TB) expansive active storage', 'System-state bare-metal backup and recovery', 'SQL & Exchange warm database agents', 'Deduplication technology to minimize bandwidth', '24/7 priority recovery support assistance'],
    monthlyPrice: 790,
    annualPrice: 8500,
    imageUrl: 'https://images.unsplash.com/photo-1627409212872-46723f5ab52c?w=600&auto=format&fit=crop&q=60',
    isActive: true,
    isFeatured: true,
    createdAt: new Date().toISOString()
  },

  // IT Support Packages
  {
    name: 'Remote IT Helpdesk Care',
    category: 'IT Support Packages',
    shortDescription: 'On-demand technical rescue for your small business. Includes up to 2 hours of expert remote maintenance, printer troubleshooting, and security patches.',
    features: ['Up to 2 hours dedicated remote IT support', 'Helpdesk ticket tracker access', 'Windows/Mac system update patch audits', 'Remote desktop setup for printer/Wi-Fi issues', 'R600 discounted billing for overflow hours'],
    monthlyPrice: 350,
    annualPrice: 3780,
    imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&auto=format&fit=crop&q=60',
    isActive: true,
    isFeatured: true,
    createdAt: new Date().toISOString()
  },
  {
    name: 'Dedicated On-Site Upington Helpdesk Care',
    category: 'IT Support Packages',
    shortDescription: 'The ultimate IT insurance plan. Secure proactive remote monitoring, continuous server upkeep, plus 2 dedicated hours of on-site Upington dispatcher site visits.',
    features: ['Proactive security monitoring team', '2 hours on-site callout inside Upington bounds', 'R800 on-site discounted surcharge for remote areas', 'Server and LAN infrastructure upkeep', 'Fast 4-hour critical response SLA'],
    monthlyPrice: 1250,
    annualPrice: 13500,
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=60',
    isActive: true,
    isFeatured: false,
    createdAt: new Date().toISOString()
  }
];

// Dynamically import and map entire DBUY products catalog for the web store
import { DBUY_PRODUCTS } from '../data/dbuy_products';

const MAPPED_DBUY_SEEDS: Omit<StoreProduct, 'id'>[] = DBUY_PRODUCTS.map(p => {
  let monthlyPrice = 0;
  let annualPrice = 0;
  
  if (p.billing_cycle === 'Monthly') {
    monthlyPrice = p.recommended_selling_price_zar;
    annualPrice = Math.round(p.recommended_selling_price_zar * 12 * 0.9); // 10% annual discount
  } else if (p.billing_cycle === 'Annual') {
    monthlyPrice = Math.round(p.recommended_selling_price_zar / 12);
    annualPrice = p.recommended_selling_price_zar;
  } else { // Once-off
    monthlyPrice = 0;
    annualPrice = p.recommended_selling_price_zar;
  }

  function getProductImage(productId: string, category: string): string {
    if (productId.includes('m365')) return 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&auto=format&fit=crop&q=60';
    if (productId.includes('adobe')) return 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&auto=format&fit=crop&q=60';
    if (productId.includes('corel')) return 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&auto=format&fit=crop&q=60';
    if (productId.includes('autocad')) return 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=60';
    if (productId.includes('fusion') || productId.includes('sketchup')) return 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&auto=format&fit=crop&q=60';
    if (productId.includes('kaspersky') || productId.includes('bitdefender') || productId.includes('eset')) return 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=60';
    if (productId.includes('sage') || productId.includes('zoho')) return 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=60';
    
    switch(category) {
      case 'Productivity & Office Software':
        return 'https://images.unsplash.com/photo-1627409212872-46723f5ab52c?w=600&auto=format&fit=crop&q=60';
      case 'Graphic Design & Creative Software':
        return 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=60';
      case 'CAD & Engineering Design Software':
        return 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=60';
      case 'Cybersecurity & Antivirus':
        return 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=60';
      case 'PDF & Document Management':
        return 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=600&auto=format&fit=crop&q=60';
      case 'Operating Systems & Server Software':
        return 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&auto=format&fit=crop&q=60';
      case 'Business & Accounting Software':
        return 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=60';
      case 'Cloud & Hosting Services':
        return 'https://images.unsplash.com/photo-1627409212872-46723f5ab52c?w=600&auto=format&fit=crop&q=60';
      case 'Connectivity & Communication Tools':
        return 'https://images.unsplash.com/photo-1562408590-e32931084e23?w=600&auto=format&fit=crop&q=60';
      default:
        return 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?w=600&auto=format&fit=crop&q=60';
    }
  }

  return {
    name: p.product_name,
    category: p.category,
    shortDescription: p.description,
    features: p.key_features,
    monthlyPrice,
    annualPrice,
    imageUrl: getProductImage(p.product_id, p.category),
    isActive: true,
    isFeatured: p.recommended_badge === 'Best Value' || p.recommended_badge === 'Popular' || p.recommended_badge === 'Premium',
    createdAt: new Date().toISOString()
  };
});

// Append the newly structured DBUY digital catalog products
SEEDED_PRODUCTS.push(...MAPPED_DBUY_SEEDS);


// Helper to check and seed default products if empty
export async function seedProductsIfEmpty(): Promise<StoreProduct[]> {
  try {
    const querySnapshot = await getDocs(collection(db, PRODUCTS_COL));
    if (!querySnapshot.empty) {
      const items: StoreProduct[] = [];
      querySnapshot.forEach((docSnap) => {
        items.push({ id: docSnap.id, ...(docSnap.data() as any) } as StoreProduct);
      });
      return items;
    }

    // Seed products
    console.log('Seeding default JJMS store products into Firestore...');
    const seededList: StoreProduct[] = [];
    for (const prod of SEEDED_PRODUCTS) {
      const docId = prod.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const docRef = doc(db, PRODUCTS_COL, docId);
      await setDoc(docRef, prod);
      seededList.push({ id: docId, ...prod } as StoreProduct);
    }
    return seededList;
  } catch (error) {
    console.error('Failed to query or seed products in database, falling back to local memory simulation...', error);
    // If permission or network issue, return mock preseeded items
    return SEEDED_PRODUCTS.map((p, idx) => ({ id: `seeded-${idx}`, ...p } as StoreProduct));
  }
}

// ---------------- PRODUCTS OPERATIONS ----------------
export async function getProducts(): Promise<StoreProduct[]> {
  try {
    const snap = await getDocs(collection(db, PRODUCTS_COL));
    const list: StoreProduct[] = [];
    snap.forEach((docRef) => {
      list.push({ id: docRef.id, ...(docRef.data() as any) } as StoreProduct);
    });
    
    // Check if any of the new structured DBUY products are missing from the Firestore database
    const existingNames = new Set(list.map(p => p.name.toLowerCase()));
    const missingSeeds = SEEDED_PRODUCTS.filter(p => !existingNames.has(p.name.toLowerCase()));
    
    if (missingSeeds.length > 0) {
      console.log(`Syncing ${missingSeeds.length} new DBUY master catalog items...`);
      for (const p of missingSeeds) {
        try {
          const docId = p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
          const docRef = doc(db, PRODUCTS_COL, docId);
          await setDoc(docRef, p);
          list.push({ id: docId, ...p } as StoreProduct);
        } catch (e) {
          console.error(`Sync error for product ${p.name}:`, e);
          list.push({ id: `offline-dbuy-${p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`, ...p } as StoreProduct);
        }
      }
    }
    
    return list;
  } catch (error) {
    console.warn('Cannot fetch products from live DB, providing local items:', error);
    return SEEDED_PRODUCTS.map((p, idx) => ({ id: `offline-${idx}`, ...p } as StoreProduct));
  }
}

export async function addProduct(product: Omit<StoreProduct, 'id' | 'createdAt'>): Promise<string> {
  const path = PRODUCTS_COL;
  try {
    const docId = product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const docRef = doc(db, PRODUCTS_COL, docId);
    
    const newProduct = {
      ...product,
      createdAt: new Date().toISOString()
    };
    
    await setDoc(docRef, newProduct);
    return docId;
  } catch (err) {
    return handleFirestoreError(err, OperationType.CREATE, path);
  }
}

export async function updateProduct(id: string, product: Partial<StoreProduct>): Promise<void> {
  const path = `${PRODUCTS_COL}/${id}`;
  try {
    const docRef = doc(db, PRODUCTS_COL, id);
    await updateDoc(docRef, product);
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, path);
  }
}

export async function deleteProduct(id: string): Promise<void> {
  const path = `${PRODUCTS_COL}/${id}`;
  try {
    const docRef = doc(db, PRODUCTS_COL, id);
    await deleteDoc(docRef);
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, path);
  }
}

// ---------------- ACTIONS & ENQUIRY BASKET (QUOTES) ----------------
export async function submitQuotationRequest(request: Omit<StoreQuotationRequest, 'id' | 'status' | 'createdAt'>): Promise<string> {
  const path = QUOTES_COL;
  try {
    const uniqueId = 'quote-' + Math.random().toString(36).substring(2, 9);
    const docRef = doc(db, QUOTES_COL, uniqueId);
    
    const finalRequest: StoreQuotationRequest = {
      ...request,
      id: uniqueId,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    await setDoc(docRef, finalRequest);
    
    // Auto-email simulation notification logger
    console.info(`[SYSTEM ALERT] Invoice Notification trigger to info@jjmultisolutions.co.za: New Quotation Basket Submission ${uniqueId} received from ${request.fullName} (${request.email}) of total standard monthly R${request.totalMonthlyAmount}.`);
    
    return uniqueId;
  } catch (err) {
    return handleFirestoreError(err, OperationType.CREATE, path);
  }
}

export async function getQuotationRequests(uid?: string): Promise<StoreQuotationRequest[]> {
  try {
    let q;
    if (uid) {
      q = query(collection(db, QUOTES_COL), where('uid', '==', uid));
    } else {
      q = query(collection(db, QUOTES_COL), orderBy('createdAt', 'desc'));
    }
    const snap = await getDocs(q);
    const list: StoreQuotationRequest[] = [];
    snap.forEach((docSnap) => {
      list.push({ id: docSnap.id, ...(docSnap.data() as any) } as StoreQuotationRequest);
    });
    return list;
  } catch (error) {
    console.warn('Failed retrieving quote requests, falling back to local simulation', error);
    return [];
  }
}

// ---------------- INVOICES ----------------
export async function getInvoices(customerUid?: string): Promise<Invoice[]> {
  try {
    let q;
    if (customerUid) {
      q = query(collection(db, INVOICES_COL), where('customerUid', '==', customerUid));
    } else {
      q = query(collection(db, INVOICES_COL));
    }
    const snap = await getDocs(q);
    const list: Invoice[] = [];
    snap.forEach((docEv) => {
      list.push({ id: docEv.id, ...(docEv.data() as any) } as Invoice);
    });
    return list;
  } catch (err) {
    console.warn('Invoices load fallback', err);
    return [];
  }
}

export async function addInvoice(invoice: Omit<Invoice, 'id' | 'createdAt'>): Promise<string> {
  const path = INVOICES_COL;
  try {
    const uniqueId = 'inv-' + Math.random().toString(36).substring(2, 9);
    const docRef = doc(db, INVOICES_COL, uniqueId);
    await setDoc(docRef, { ...(invoice as any), id: uniqueId, createdAt: new Date().toISOString() });
    return uniqueId;
  } catch (err) {
    return handleFirestoreError(err, OperationType.CREATE, path);
  }
}

export async function updateInvoiceStatus(id: string, status: 'paid' | 'unpaid' | 'overdue', gateway?: string): Promise<void> {
  const path = `${INVOICES_COL}/${id}`;
  try {
    const docRef = doc(db, INVOICES_COL, id);
    const updateData: any = { status };
    if (gateway) {
      updateData.paymentGateway = gateway;
      updateData.paymentDate = new Date().toISOString();
    }
    await updateDoc(docRef, updateData);
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, path);
  }
}

// ---------------- SUBSCRIPTIONS ----------------
export async function getSubscriptions(customerUid?: string): Promise<Subscription[]> {
  try {
    let q;
    if (customerUid) {
      q = query(collection(db, SUBS_COL), where('customerUid', '==', customerUid));
    } else {
      q = query(collection(db, SUBS_COL));
    }
    const snap = await getDocs(q);
    const list: Subscription[] = [];
    snap.forEach((docEv) => {
      list.push({ id: docEv.id, ...(docEv.data() as any) } as Subscription);
    });
    return list;
  } catch (err) {
    console.warn('Subscriptions load fallback', err);
    return [];
  }
}

export async function addSubscription(sub: Omit<Subscription, 'id' | 'createdAt'>): Promise<string> {
  const path = SUBS_COL;
  try {
    const uniqueId = 'sub-' + Math.random().toString(36).substring(2, 9);
    const docRef = doc(db, SUBS_COL, uniqueId);
    await setDoc(docRef, { ...(sub as any), id: uniqueId, createdAt: new Date().toISOString() });
    return uniqueId;
  } catch (err) {
    return handleFirestoreError(err, OperationType.CREATE, path);
  }
}

export async function updateSubscriptionStatus(id: string, status: 'active' | 'cancelled' | 'paused'): Promise<void> {
  const path = `${SUBS_COL}/${id}`;
  try {
    const docRef = doc(db, SUBS_COL, id);
    await updateDoc(docRef, { status });
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, path);
  }
}

// ---------------- SUPPORT REQUESTS (TICKETS) ----------------
export async function getSupportRequests(customerUid?: string): Promise<SupportRequest[]> {
  try {
    let q;
    if (customerUid) {
      q = query(collection(db, TICKETS_COL), where('customerUid', '==', customerUid));
    } else {
      q = query(collection(db, TICKETS_COL), orderBy('createdAt', 'desc'));
    }
    const snap = await getDocs(q);
    const list: SupportRequest[] = [];
    snap.forEach((docEv) => {
      list.push({ id: docEv.id, ...(docEv.data() as any) } as SupportRequest);
    });
    return list;
  } catch (err) {
    console.warn('SupportRequests load fallback', err);
    return [];
  }
}

export async function submitSupportRequest(ticket: Omit<SupportRequest, 'id' | 'status' | 'createdAt'>): Promise<string> {
  const path = TICKETS_COL;
  try {
    const uniqueId = 'ticket-' + Math.random().toString(36).substring(2, 9);
    const docRef = doc(db, TICKETS_COL, uniqueId);
    
    await setDoc(docRef, {
      ...ticket,
      id: uniqueId,
      status: 'open',
      createdAt: new Date().toISOString()
    });
    return uniqueId;
  } catch (err) {
    return handleFirestoreError(err, OperationType.CREATE, path);
  }
}

export async function updateSupportRequest(id: string, updates: Partial<SupportRequest>): Promise<void> {
  const path = `${TICKETS_COL}/${id}`;
  try {
    const docRef = doc(db, TICKETS_COL, id);
    await updateDoc(docRef, updates);
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, path);
  }
}
