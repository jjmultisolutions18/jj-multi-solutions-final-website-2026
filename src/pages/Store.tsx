import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  ShoppingBasket, 
  Mail, 
  Globe, 
  ShieldCheck, 
  Wifi, 
  Cloud, 
  HeartHandshake, 
  Check, 
  ArrowRight, 
  SlidersHorizontal, 
  HelpCircle, 
  X,
  Plus, 
  Minus, 
  CheckCircle,
  FileText,
  User,
  ExternalLink,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  getProducts, 
  submitQuotationRequest 
} from '../lib/storeService';
import { StoreProduct, StoreCategory, EnquiryBasketItem } from '../types/store';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export default function Store() {
  const [products, setProducts] = useState<StoreProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [basket, setBasket] = useState<EnquiryBasketItem[]>([]);
  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<StoreProduct | null>(null);
  const [user, setUser] = useState<any>(null);

  // Quote Basket Submission Form
  const [basketForm, setBasketForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    businessName: '',
    message: ''
  });
  const [submissionSuccess, setSubmissionSuccess] = useState<string | null>(null);
  const [submittingBasket, setSubmittingBasket] = useState(false);

  // Single Quote Direct Form Modal
  const [directQuoteProduct, setDirectQuoteProduct] = useState<StoreProduct | null>(null);
  const [directForm, setDirectForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    businessName: '',
    priceChoice: 'monthly' as 'monthly' | 'annual',
    quantity: 1,
    message: ''
  });
  const [submittingDirect, setSubmittingDirect] = useState(false);

  // Contact Sales Modal
  const [contactSalesProduct, setContactSalesProduct] = useState<StoreProduct | null>(null);

  // Track customer identity
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setBasketForm(prev => ({
          ...prev,
          fullName: currentUser.displayName || '',
          email: currentUser.email || ''
        }));
        setDirectForm(prev => ({
          ...prev,
          fullName: currentUser.displayName || '',
          email: currentUser.email || ''
        }));
      }
    });
    return () => unsubscribe();
  }, []);

  // Fetch Products & Basket on mount
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts.filter(p => p.isActive));
      
      // Load saved basket
      const savedBasket = localStorage.getItem('jjms_enquiry_basket');
      if (savedBasket) {
        try {
          setBasket(JSON.parse(savedBasket));
        } catch (e) {
          console.error(e);
        }
      }
      setLoading(false);
    }
    loadData();
  }, []);

  // Save basket to localstorage whenever it changes
  useEffect(() => {
    localStorage.setItem('jjms_enquiry_basket', JSON.stringify(basket));
  }, [basket]);

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error("Auth google login error:", err);
    }
  };

  // Add Item to Enquiry Basket
  const addToBasket = (product: StoreProduct) => {
    const existingIndex = basket.findIndex(item => item.product.id === product.id);
    if (existingIndex > -1) {
      // Already inside, increase quantity
      const newBasket = [...basket];
      newBasket[existingIndex].quantity += 1;
      setBasket(newBasket);
    } else {
      setBasket([...basket, { product, priceChoice: 'monthly', quantity: 1 }]);
    }
    // Open feedback panel or alert feedback
    setIsBasketOpen(true);
  };

  const removeFromBasket = (productId: string) => {
    setBasket(basket.filter(item => item.product.id !== productId));
  };

  const updateBasketQty = (productId: string, qty: number) => {
    if (qty < 1) return;
    setBasket(basket.map(item => item.product.id === productId ? { ...item, quantity: qty } : item));
  };

  const toggleBasketBilling = (productId: string) => {
    setBasket(basket.map(item => item.product.id === productId ? { 
      ...item, 
      priceChoice: item.priceChoice === 'monthly' ? 'annual' : 'monthly' 
    } : item));
  };

  // Calculate Basket Totals
  const totalMonthlyAmount = basket.reduce((acc, item) => {
    if (item.priceChoice === 'monthly') {
      return acc + (item.product.monthlyPrice * item.quantity);
    }
    return acc;
  }, 0);

  const totalAnnualAmount = basket.reduce((acc, item) => {
    if (item.priceChoice === 'annual') {
      return acc + (item.product.annualPrice * item.quantity);
    }
    return acc;
  }, 0);

  // Submit Multi-Quotation Request
  const handleSubmitBasketQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (basket.length === 0) return;
    setSubmittingBasket(true);

    try {
      const quotePayload = {
        fullName: basketForm.fullName,
        email: basketForm.email,
        phone: basketForm.phone,
        businessName: basketForm.businessName,
        message: basketForm.message,
        items: basket.map(item => ({
          productId: item.product.id,
          productName: item.product.name,
          category: item.product.category,
          priceChoice: item.priceChoice,
          price: item.priceChoice === 'monthly' ? item.product.monthlyPrice : item.product.annualPrice,
          quantity: item.quantity
        })),
        totalMonthlyAmount,
        totalAnnualAmount,
        uid: user?.uid || ''
      };

      const quoteId = await submitQuotationRequest(quotePayload);
      setSubmissionSuccess(quoteId);
      setBasket([]); // Clear basket
      setBasketForm({
        fullName: prev => user?.displayName || '',
        email: prev => user?.email || '',
        phone: '',
        businessName: '',
        message: ''
      } as any);
    } catch (err) {
      console.error(err);
      alert('Failed to submit quote request. Please check inputs.');
    } finally {
      setSubmittingBasket(false);
    }
  };

  // Submit Single Product Quote
  const handleDirectQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!directQuoteProduct) return;
    setSubmittingDirect(true);

    try {
      const price = directForm.priceChoice === 'monthly' ? directQuoteProduct.monthlyPrice : directQuoteProduct.annualPrice;
      const quotePayload = {
        fullName: directForm.fullName,
        email: directForm.email,
        phone: directForm.phone,
        businessName: directForm.businessName,
        message: directForm.message,
        items: [{
          productId: directQuoteProduct.id,
          productName: directQuoteProduct.name,
          category: directQuoteProduct.category,
          priceChoice: directForm.priceChoice,
          price,
          quantity: directForm.quantity
        }],
        totalMonthlyAmount: directForm.priceChoice === 'monthly' ? (price * directForm.quantity) : 0,
        totalAnnualAmount: directForm.priceChoice === 'annual' ? (price * directForm.quantity) : 0,
        uid: user?.uid || ''
      };

      const quoteId = await submitQuotationRequest(quotePayload);
      setSubmissionSuccess(quoteId);
      setDirectQuoteProduct(null);
      // Reset form
      setDirectForm(prev => ({
        fullName: user?.displayName || '',
        email: user?.email || '',
        phone: '',
        businessName: '',
        priceChoice: 'monthly',
        quantity: 1,
        message: ''
      }));
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingDirect(false);
    }
  };

  // Define Category Icons mapping
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Microsoft 365 & Business Email': return <Mail className="text-blue-500" size={18} />;
      case 'Website Hosting & Domains': return <Globe className="text-emerald-500" size={18} />;
      case 'Antivirus & Security': return <ShieldCheck className="text-red-500" size={18} />;
      case 'Business Internet (Fibre/LTE/5G)': return <Wifi className="text-purple-500" size={18} />;
      case 'Cloud Backup': return <Cloud className="text-sky-500" size={18} />;
      case 'IT Support Packages': return <HeartHandshake className="text-orange-500" size={18} />;
      default: return <SlidersHorizontal className="text-gray-500" size={18} />;
    }
  };

  // Filter Products based on category & search terms
  const filteredProducts = products.filter(prod => {
    const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          prod.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          prod.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCat = selectedCategory === 'All' || prod.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const featuredProducts = products.filter(p => p.isFeatured && p.isActive);

  // Lists of priority first launches
  const priorityCategories: StoreCategory[] = [
    'Microsoft 365 & Business Email',
    'Website Hosting & Domains',
    'Antivirus & Security',
    'Business Internet (Fibre/LTE/5G)',
    'Cloud Backup',
    'IT Support Packages'
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground scroll-smooth">
      {/* Top Hero Banner */}
      <section className="bg-muted/30 text-foreground py-16 relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-secondary/5 rounded-full blur-[100px]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 pt-10">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                SME Solutions Marketplace
              </span>
              <h1 className="text-3xl md:text-5xl font-bold font-heading mb-4 tracking-tight">
                Digital Products & <span className="text-secondary">Business Store</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl text-sm md:text-base leading-relaxed mb-6">
                Equip your South African SME with leading digital frameworks, uncapped office internet gateways, cloud secure vaults, and certified on-demand SLA remote helpdesks. Build a custom quote basket and checkout with zero hassle.
              </p>
              
              <div className="flex flex-wrap gap-3">
                <Button asChild size="sm" variant="outline" className="rounded-full">
                  <a href="#browse-catalog">Browse Catalog</a>
                </Button>
                {user ? (
                  <Button asChild size="sm" className="rounded-full bg-primary hover:bg-primary/90 text-white">
                    <Link to="/dashboard">Go to Customer Dashboard</Link>
                  </Button>
                ) : (
                  <Button onClick={handleGoogleLogin} size="sm" className="rounded-full bg-secondary hover:bg-secondary/90 text-white">
                    Client Space Login
                  </Button>
                )}
                <Button asChild size="sm" variant="ghost" className="rounded-full text-xs font-semibold">
                  <Link to="/admin/store">Admin Control Panel</Link>
                </Button>
              </div>
            </div>

            {/* Quick Floating Cart Summary widget */}
            <div className="md:col-span-4 bg-card p-5 border border-border rounded-2xl shadow-sm relative">
              <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center animate-bounce shadow">
                <ShoppingBasket size={18} />
              </div>
              <h4 className="font-bold text-sm text-foreground mb-3 flex items-center gap-2">
                Your Enquiry Basket
              </h4>
              <div className="text-2xl font-black text-primary mb-1">
                {basket.length} <span className="text-xs text-muted-foreground font-normal">Products added</span>
              </div>
              {basket.length > 0 ? (
                <>
                  <p className="text-xs text-muted-foreground mb-4">
                    Submit as one single streamlined quote to save time.
                  </p>
                  <Button onClick={() => setIsBasketOpen(true)} className="w-full rounded-full bg-primary text-white text-xs h-9">
                    Review Quote Basket
                  </Button>
                </>
              ) : (
                <>
                  <p className="text-xs text-muted-foreground mb-4">
                    Your basket is currently empty. Browse below and tap "Add to Basket".
                  </p>
                  <Button disabled className="w-full rounded-full text-xs h-9">
                    Basket Empty
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Seasonal Promotional Banners */}
      <section className="bg-primary/5 border-b border-primary/10 py-4 text-center text-xs font-medium">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-2 text-primary">
          <Badge className="bg-primary text-white hover:bg-primary text-[10px]">PROMO EVENT</Badge>
          <span>Get up to <strong>15% bundle discount</strong> on Microsoft 365 + Any Shared hosting or IT Helpdesk agreement!</span>
          <button onClick={() => {
            const m365 = products.find(p => p.category === 'Microsoft 365 & Business Email');
            if(m365) addToBasket(m365);
          }} className="underline font-bold hover:text-secondary flex items-center gap-1 cursor-pointer">
            Claim Package <ArrowRight size={12} />
          </button>
        </div>
      </section>

      {/* Best-Sellers (Featured Products) Shelf */}
      {featuredProducts.length > 0 && searchQuery === '' && selectedCategory === 'All' && (
        <section className="py-12 bg-muted/10 border-b border-border">
          <div className="container mx-auto px-4">
            <h2 className="text-xs uppercase tracking-widest font-extrabold text-secondary mb-2">HOT REVENUE SOLUTIONS</h2>
            <h3 className="text-xl md:text-2xl font-bold font-heading mb-6">SME Best-Sellers</h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              {featuredProducts.slice(0, 3).map((prod) => (
                <div key={prod.id} className="bg-card border border-primary/20 rounded-xl p-5 relative shadow-sm overflow-hidden flex flex-col justify-between hover:scale-[1.01] transition-transform">
                  <Badge className="absolute top-4 right-4 bg-secondary text-white">Popular</Badge>
                  <div>
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider block mb-1">
                      {prod.category}
                    </span>
                    <h4 className="font-bold text-base mb-2 text-foreground">{prod.name}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-4">{prod.shortDescription}</p>
                  </div>
                  <div className="flex items-center justify-between border-t border-border pt-4 mt-2">
                    <div>
                      <span className="text-xs text-muted-foreground">Monthly ZAR</span>
                      <div className="text-lg font-black text-foreground">R {prod.monthlyPrice}</div>
                    </div>
                    <Button onClick={() => addToBasket(prod)} size="sm" className="rounded-full bg-primary text-xs px-4">
                      Add to Basket
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Browse Catalog Area */}
      <section id="browse-catalog" className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            
            {/* Sidebar Filters */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
                <h4 className="font-bold text-sm text-foreground mb-4 flex items-center gap-2">
                  <Filter size={16} className="text-primary" /> Filter by Category
                </h4>
                
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                      selectedCategory === 'All' 
                        ? 'bg-primary text-white' 
                        : 'text-muted-foreground hover:bg-muted/50'
                    }`}
                  >
                    <span>All Products</span>
                    <Badge variant="outline" className={selectedCategory === 'All' ? 'border-white text-white' : ''}>
                      {products.length}
                    </Badge>
                  </button>

                  {priorityCategories.map(cat => {
                    const count = products.filter(p => p.category === cat).length;
                    return (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors ${
                          selectedCategory === cat 
                            ? 'bg-primary text-white font-bold' 
                            : 'text-muted-foreground hover:bg-muted/50'
                        }`}
                      >
                        {getCategoryIcon(cat)}
                        <span className="truncate flex-1 text-left">{cat}</span>
                        <span className={`text-[10px] ${selectedCategory === cat ? 'text-white' : 'text-muted-foreground'}`}>
                          ({count})
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Secure Customer Portal login promo ad */}
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-border rounded-xl p-5 text-center">
                <h5 className="font-bold text-xs uppercase tracking-widest text-primary mb-1">APPROVED CLIENT AREA</h5>
                <h4 className="font-heading font-black text-sm mb-2">Automate Your Bills</h4>
                <p className="text-xs text-muted-foreground mb-4">
                  Approved customers can view quotations, invoices, and active subscriptions with PayFast or Yoco integrations.
                </p>
                {user ? (
                  <Button asChild size="sm" className="rounded-full bg-primary text-xs w-full">
                    <Link to="/dashboard">Workspace Dashboard <ExternalLink size={12} className="ml-1" /></Link>
                  </Button>
                ) : (
                  <Button onClick={handleGoogleLogin} size="sm" className="rounded-full bg-secondary text-xs w-full text-white">
                    Access Portal Now
                  </Button>
                )}
              </div>
            </div>

            {/* Catalog Grid Area */}
            <div className="lg:col-span-3 space-y-6">
              
              {/* Search and results helper */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-card p-4 border border-border rounded-xl shadow-sm">
                <div className="relative w-full sm:max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input 
                    type="text" 
                    placeholder="Search SaaS products, business emails, antivirus, Wi-Fi router spec..." 
                    className="pl-9 h-10 text-xs w-full bg-transparent border-border"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs"
                    >
                      Clear
                    </button>
                  )}
                </div>
                
                <div className="text-xs text-muted-foreground font-mono self-end sm:self-center shrink-0">
                  Showing <strong>{filteredProducts.length}</strong> solutions
                </div>
              </div>

              {/* Products Rendering */}
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 bg-card border border-border rounded-xl">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary mb-4"></div>
                  <p className="text-xs text-muted-foreground">Decrypting solutions catalogue from servers...</p>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-20 bg-card border border-border rounded-xl space-y-4">
                  <HelpCircle className="mx-auto text-muted-foreground" size={48} />
                  <h4 className="font-bold text-lg">No Matching Digital Products Found</h4>
                  <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                    We currently don't have catalog entries matching "{searchQuery}". Try searching general keywords or change your category filters.
                  </p>
                  <Button onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }} variant="outline" size="sm" className="rounded-full">
                    Reset Catalog Scope
                  </Button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredProducts.map(prod => (
                    <Card key={prod.id} className="group relative bg-card border-border hover:border-primary/50 transition-all duration-300 overflow-hidden flex flex-col justify-between">
                      <div>
                        {/* Dynamic category colored bar */}
                        <div className="h-1.5 w-full bg-gradient-to-r from-primary to-secondary/70"></div>
                        
                        <div className="relative h-40 w-full overflow-hidden bg-muted">
                          <img 
                            src={prod.imageUrl || 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?w=600&auto=format&fit=crop&q=60'} 
                            alt={prod.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                          />
                          <Badge className="absolute top-3 left-3 bg-black/60 backdrop-blur text-white hover:bg-black/60 select-none text-[9px] font-bold tracking-wider">
                            {prod.category}
                          </Badge>
                          {prod.isFeatured && (
                            <Badge className="absolute top-3 right-3 bg-secondary text-white font-bold text-[9px]">
                              Featured
                            </Badge>
                          )}
                        </div>

                        <CardHeader className="p-4 pb-1">
                          <h4 className="font-bold font-heading text-base leading-tight hover:text-primary transition-colors cursor-pointer" onClick={() => setSelectedProduct(prod)}>
                            {prod.name}
                          </h4>
                          <p className="text-xs text-muted-foreground line-clamp-2 mt-1 leading-normal">
                            {prod.shortDescription}
                          </p>
                        </CardHeader>

                        <CardContent className="p-4 py-2">
                          <ul className="space-y-1.5">
                            {prod.features.slice(0, 3).map((feat, idx) => (
                              <li key={idx} className="text-xs flex items-start gap-1.5 text-muted-foreground">
                                <Check size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                                <span className="line-clamp-1">{feat}</span>
                              </li>
                            ))}
                            {prod.features.length > 3 && (
                              <li onClick={() => setSelectedProduct(prod)} className="text-[10px] text-primary hover:underline cursor-pointer font-bold mt-1">
                                + View {prod.features.length - 3} more technical specs
                              </li>
                            )}
                          </ul>
                        </CardContent>
                      </div>

                      <CardFooter className="p-4 pt-4 border-t border-border/60 bg-muted/10 flex flex-col gap-3">
                        {/* Display Rates */}
                        <div className="w-full flex items-center justify-between mb-1">
                          <div>
                            <span className="text-[10px] text-muted-foreground block font-bold">MONTHLY RATE</span>
                            <span className="text-base font-black text-foreground">R {prod.monthlyPrice}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] text-muted-foreground block font-bold">ANNUAL SAVING RATE</span>
                            <span className="text-xs font-bold text-secondary">R {prod.annualPrice} <span className="text-[9px] font-normal text-muted-foreground">/yr</span></span>
                          </div>
                        </div>

                        {/* Interactive operations */}
                        <div className="w-full grid grid-cols-2 gap-2">
                          <Button 
                            onClick={() => {
                              setDirectQuoteProduct(prod);
                              setDirectForm(prev => ({
                                ...prev,
                                priceChoice: 'monthly',
                                quantity: 1
                              }));
                            }} 
                            variant="outline" 
                            size="sm" 
                            className="rounded-full text-[10px] h-8 font-semibold border-border hover:bg-muted"
                          >
                            Request Quote
                          </Button>
                          <Button 
                            onClick={() => addToBasket(prod)} 
                            size="sm" 
                            className="rounded-full text-[10px] h-8 font-semibold bg-primary text-white"
                          >
                            Add to Basket
                          </Button>
                        </div>
                        
                        <Button 
                          onClick={() => setContactSalesProduct(prod)}
                          variant="ghost" 
                          size="sm" 
                          className="w-full hover:bg-transparent hover:text-secondary text-[10px] h-6 justify-center text-muted-foreground font-medium"
                        >
                          Need Custom Scoping? Contact Sales
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER CAPTION / BRAND INTEGRATION STATEMENT */}
      <footer className="bg-card border-t border-border mt-auto py-8 text-center text-xs text-muted-foreground">
        <div className="container mx-auto px-4 space-y-2">
          <p>© JJ Multi Solutions. All rights reserved.</p>
          <p className="text-[10px] max-w-sm mx-auto opacity-70">
            JJ Multi Solutions (Pty) Ltd. Empowering African SMEs and public registries through modular technological architectures. Registered in South Africa.
          </p>
        </div>
      </footer>

      {/* ================= MODAL: MULTI-PRODUCT ENQUIRY BASKET OVERLAY ================= */}
      {isBasketOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col justify-between">
            
            {/* Modal Header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h3 className="font-heading font-bold text-lg text-foreground flex items-center gap-2">
                <ShoppingBasket className="text-primary animate-pulse" size={20} /> Bulk Solutions Enquiry Basket
              </h3>
              <button onClick={() => setIsBasketOpen(false)} className="p-1 rounded bg-muted text-muted-foreground hover:text-foreground">
                <X size={16} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              {submissionSuccess ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle size={36} />
                  </div>
                  <h4 className="font-heading font-black text-xl text-foreground">Quotation Request Dispatched!</h4>
                  <p className="text-xs text-muted-foreground max-w-md mx-auto">
                    Your request reference is <strong className="font-mono text-primary bg-primary/10 px-2 py-1 rounded">{submissionSuccess}</strong>. An email notification has been synchronized to <strong>info@jjmultisolutions.co.za</strong> and logged into our CRM database. Our account managers will contact you within 2 business hours.
                  </p>
                  
                  <div className="bg-muted p-4 rounded-lg text-left max-w-md mx-auto space-y-1.5 text-xs">
                    <p className="font-bold text-foreground">Next Proactive Steps:</p>
                    <p>1. If you registered with Google, track approvals inside your Client Space Dashboard.</p>
                    <p>2. Approved items spawn interactive invoice pay-gates (Yoco / PayFast).</p>
                  </div>

                  <div className="pt-4 flex justify-center gap-3">
                    <Button onClick={() => { setSubmissionSuccess(null); setIsBasketOpen(false); }} className="rounded-full text-xs">
                      Continue Shopping
                    </Button>
                    <Button asChild variant="outline" className="rounded-full text-xs">
                      <Link to="/dashboard">Go to Dashboard</Link>
                    </Button>
                  </div>
                </div>
              ) : basket.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground space-y-3">
                  <ShoppingBasket size={48} className="mx-auto text-muted-foreground/40" />
                  <p className="text-xs">Your basket has been cleared. Tap "Add to Basket" on any products to request custom bulk rates.</p>
                  <Button onClick={() => setIsBasketOpen(false)} variant="outline" size="sm" className="rounded-full text-xs">
                    View Catalog
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Selected items list */}
                  <div className="space-y-4">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-muted-foreground">Selectable items</h4>
                    
                    {basket.map(item => (
                      <div key={item.product.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 border border-border rounded-lg bg-muted/30 gap-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={item.product.imageUrl} 
                            alt="" 
                            className="w-12 h-12 object-cover rounded bg-muted shrink-0" 
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <h5 className="font-bold text-xs text-foreground leading-tight">{item.product.name}</h5>
                            <span className="text-[10px] text-muted-foreground font-mono block">
                              {item.product.category}
                            </span>
                          </div>
                        </div>

                        {/* Adjust qty & toggles */}
                        <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                          <div className="flex items-center border border-border rounded-full bg-card overflow-hidden">
                            <button 
                              type="button"
                              onClick={() => updateBasketQty(item.product.id, item.quantity - 1)}
                              className="p-1 px-2.5 text-muted-foreground hover:bg-muted"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-xs px-2.5 font-bold font-mono">{item.quantity}</span>
                            <button 
                              type="button"
                              onClick={() => updateBasketQty(item.product.id, item.quantity + 1)}
                              className="p-1 px-2.5 text-muted-foreground hover:bg-muted"
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => toggleBasketBilling(item.product.id)}
                              className={`text-[10px] font-bold p-1 px-2 rounded-full border transition-all ${
                                item.priceChoice === 'monthly'
                                  ? 'bg-primary/10 border-primary/30 text-primary'
                                  : 'bg-secondary/10 border-secondary/30 text-secondary'
                              }`}
                            >
                              {item.priceChoice === 'monthly' ? 'Monthly Billing' : 'Annual (10% Off)'}
                            </button>
                            <span className="text-xs font-bold shrink-0 font-mono text-right w-16">
                              R {item.priceChoice === 'monthly' 
                                ? item.product.monthlyPrice * item.quantity 
                                : item.product.annualPrice * item.quantity
                              }
                            </span>
                          </div>

                          <button 
                            type="button"
                            onClick={() => removeFromBasket(item.product.id)}
                            className="text-xs text-red-500 hover:text-red-600 font-bold ml-1"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pricing dynamic calculation box */}
                  <div className="bg-muted p-4 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-xs text-muted-foreground block">Dynamic Aggregate Total:</span>
                      <span className="text-xs opacity-75 font-mono">
                        (Active calculations in ZAR)
                      </span>
                    </div>
                    
                    <div className="text-right space-y-1">
                      {totalMonthlyAmount > 0 && (
                        <div className="text-xs font-bold text-primary">
                          Monthly Bill: <span className="font-mono">R {totalMonthlyAmount}</span>
                        </div>
                      )}
                      {totalAnnualAmount > 0 && (
                        <div className="text-xs font-bold text-secondary">
                          Annual Saved Bill: <span className="font-mono">R {totalAnnualAmount} <span className="text-[9px] text-muted-foreground font-normal">once-off</span></span>
                        </div>
                      )}
                      <div className="text-xs text-[10px] text-muted-foreground">excluding VAT</div>
                    </div>
                  </div>

                  {/* Submission form */}
                  <form onSubmit={handleSubmitBasketQuote} className="space-y-4 border-t border-border pt-4">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-muted-foreground">LEAD PORTAL CAPTURE</h4>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-muted-foreground">Full Name *</label>
                        <Input 
                          required 
                          placeholder="Your Name" 
                          className="bg-transparent text-xs text-foreground border-border" 
                          value={basketForm.fullName}
                          onChange={(e) => setBasketForm({ ...basketForm, fullName: e.target.value })}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-muted-foreground">Business Email Address *</label>
                        <Input 
                          required 
                          type="email" 
                          placeholder="Your Email" 
                          className="bg-transparent text-xs text-foreground border-border" 
                          value={basketForm.email}
                          onChange={(e) => setBasketForm({ ...basketForm, email: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-muted-foreground">Contact Phone Number *</label>
                        <Input 
                          required 
                          type="tel" 
                          placeholder="e.g. 062 542 5434" 
                          className="bg-transparent text-xs text-foreground border-border" 
                          value={basketForm.phone}
                          onChange={(e) => setBasketForm({ ...basketForm, phone: e.target.value })}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-muted-foreground">Registered Business / SMME Name *</label>
                        <Input 
                          required 
                          placeholder="My Company (Pty) Ltd" 
                          className="bg-transparent text-xs text-foreground border-border" 
                          value={basketForm.businessName}
                          onChange={(e) => setBasketForm({ ...basketForm, businessName: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-muted-foreground">Special Custom System Specs (Optional)</label>
                      <textarea 
                        rows={2}
                        placeholder="Detail any multi-user requirements, domains you already own, server backup storage goals..." 
                        className="w-full text-xs bg-transparent border border-border rounded-lg p-3 text-foreground"
                        value={basketForm.message}
                        onChange={(e) => setBasketForm({ ...basketForm, message: e.target.value })}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      disabled={submittingBasket} 
                      className="w-full rounded-full bg-primary hover:bg-primary/95 text-xs text-white"
                    >
                      {submittingBasket ? 'Syncing Quotation request...' : 'Secure Submit Bulk Quotation Request (R 0.00)'}
                    </Button>
                  </form>
                </div>
              )}
            </div>
            
            <div className="p-4 bg-muted/20 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1"><ShieldCheck size={14} className="text-emerald-500" /> AES-256 cloud encryption synced</span>
              <span>© JJ Multi Solutions Store</span>
            </div>
          </div>
        </div>
      )}


      {/* ================= MODAL: SINGLE PRODUCT DIRECT QUOTE ================= */}
      {directQuoteProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-xl shadow-lg w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h3 className="font-heading font-bold text-sm text-foreground">
                Quotation Request: {directQuoteProduct.name}
              </h3>
              <button onClick={() => setDirectQuoteProduct(null)} className="p-1 rounded bg-muted text-muted-foreground hover:text-foreground">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleDirectQuoteSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
              <div className="bg-primary/5 p-3 rounded-lg flex items-center gap-3">
                <Info size={16} className="text-primary shrink-0" />
                <p className="text-[11px] text-muted-foreground leading-normal">
                  You are generating a custom priority quote for <strong>{directQuoteProduct.name}</strong> ({directQuoteProduct.category}).
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground">Pricing Tier</label>
                  <select 
                    className="w-full text-xs bg-transparent border border-border rounded-lg p-2.5 text-foreground h-10"
                    value={directForm.priceChoice}
                    onChange={(e: any) => setDirectForm({ ...directForm, priceChoice: e.target.value })}
                  >
                    <option value="monthly">Monthly Plan (R {directQuoteProduct.monthlyPrice} /mo)</option>
                    <option value="annual">Annual Plan (R {directQuoteProduct.annualPrice} /yr - Standard Saving)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground">Device/Seat Quantity</label>
                  <Input 
                    type="number" 
                    min={1} 
                    required
                    className="h-10 text-xs border-border"
                    value={directForm.quantity}
                    onChange={(e) => setDirectForm({ ...directForm, quantity: parseInt(e.target.value) || 1 })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground">First & Last Name *</label>
                  <Input 
                    required 
                    placeholder="Your Name" 
                    className="bg-transparent text-xs text-foreground border-border h-10" 
                    value={directForm.fullName}
                    onChange={(e) => setDirectForm({ ...directForm, fullName: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground">Business Email address *</label>
                  <Input 
                    required 
                    type="email" 
                    placeholder="Your Email" 
                    className="bg-transparent text-xs text-foreground border-border h-10" 
                    value={directForm.email}
                    onChange={(e) => setDirectForm({ ...directForm, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground">Phone Number *</label>
                  <Input 
                    required 
                    placeholder="e.g. 062 542 5434" 
                    className="bg-transparent text-xs text-foreground border-border h-10" 
                    value={directForm.phone}
                    onChange={(e) => setDirectForm({ ...directForm, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground">SMME / Corporation Name *</label>
                  <Input 
                    required 
                    placeholder="My Company (Pty) Ltd" 
                    className="bg-transparent text-xs text-foreground border-border h-10" 
                    value={directForm.businessName}
                    onChange={(e) => setDirectForm({ ...directForm, businessName: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground">Custom Integration/Support Instructions</label>
                <textarea 
                  rows={2}
                  placeholder="Detail preferred setup timelines, active domains..." 
                  className="w-full text-xs bg-transparent border border-border rounded-lg p-3 text-foreground"
                  value={directForm.message}
                  onChange={(e) => setDirectForm({ ...directForm, message: e.target.value })}
                />
              </div>

              <Button 
                type="submit" 
                disabled={submittingDirect} 
                className="w-full rounded-full bg-primary text-xs text-white"
              >
                {submittingDirect ? 'Syncing...' : 'Submit Custom Quote request'}
              </Button>
            </form>
          </div>
        </div>
      )}


      {/* ================= MODAL: DYNAMIC PRODUCT DETAILS ================= */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-xl shadow-lg w-full max-w-xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h3 className="font-heading font-bold text-sm text-foreground">
                Technical Blueprint Specs
              </h3>
              <button onClick={() => setSelectedProduct(null)} className="p-1 rounded bg-muted text-muted-foreground hover:text-foreground">
                <X size={16} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              <div className="relative h-48 w-full overflow-hidden bg-muted rounded-lg border">
                <img src={selectedProduct.imageUrl} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <Badge className="absolute top-3 left-3 bg-primary text-white text-[9px]">
                  {selectedProduct.category}
                </Badge>
              </div>

              <h4 className="font-heading font-black text-xl text-foreground">{selectedProduct.name}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {selectedProduct.shortDescription}
              </p>

              <div className="space-y-2 border-t border-border pt-4">
                <h5 className="font-bold text-xs uppercase tracking-wider text-muted-foreground">Enterprise Features Included</h5>
                <div className="grid sm:grid-cols-2 gap-2 text-xs">
                  {selectedProduct.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-muted p-4 rounded-lg flex items-center justify-around text-center border-t border-border pt-4">
                <div>
                  <span className="text-[10px] text-muted-foreground block font-bold">RECURRING MONTHLY</span>
                  <span className="font-heading font-black text-lg text-primary">R {selectedProduct.monthlyPrice}</span>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground block font-bold">SAVING ANNUAL PLAN</span>
                  <span className="font-heading font-black text-lg text-secondary">R {selectedProduct.annualPrice} <span className="text-[9px] font-normal text-muted-foreground">/yr</span></span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-muted/20 border-t border-border flex gap-3">
              <Button onClick={() => { addToBasket(selectedProduct); setSelectedProduct(null); }} className="flex-1 rounded-full bg-primary text-white text-xs py-2.5">
                Add To Enquiry Basket
              </Button>
              <Button 
                onClick={() => {
                  setDirectQuoteProduct(selectedProduct);
                  setSelectedProduct(null);
                }} 
                variant="outline" 
                className="flex-1 rounded-full text-xs"
              >
                Immediate Quotation
              </Button>
            </div>
          </div>
        </div>
      )}


      {/* ================= MODAL: CONTACT SALES ================= */}
      {contactSalesProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-xl shadow-lg w-full max-w-md p-6 relative">
            <button onClick={() => setContactSalesProduct(null)} className="absolute top-4 right-4 p-1 rounded bg-muted text-muted-foreground hover:text-foreground">
              <X size={16} />
            </button>

            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <Mail size={24} />
              </div>
              <h4 className="font-heading font-black text-lg text-foreground">Contact Account Executives</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Need specialized SLA contracts, offline custom volume licences, or hardware configurations for <strong>{contactSalesProduct.name}</strong>?
              </p>
              
              <div className="space-y-2 border-t border-border pt-4 text-xs font-semibold">
                <div className="flex items-center justify-between p-2.5 rounded border">
                  <span className="text-muted-foreground">Email Hotline:</span>
                  <a href={`mailto:info@jjmultisolutions.co.za?subject=Enterprise Scoping: ${contactSalesProduct.name}`} className="text-primary hover:underline font-bold">
                    info@jjmultisolutions.co.za
                  </a>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded border">
                  <span className="text-muted-foreground">Support Line:</span>
                  <a href="tel:0625425434" className="text-foreground hover:text-primary font-bold">
                    062 542 5434
                  </a>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded border">
                  <span className="text-muted-foreground">Upington Office:</span>
                  <span className="text-muted-foreground font-normal">Northern Cape, RSA</span>
                </div>
              </div>

              <Button onClick={() => setContactSalesProduct(null)} className="w-full rounded-full bg-primary text-white text-xs mt-4">
                Close Help Portal
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
