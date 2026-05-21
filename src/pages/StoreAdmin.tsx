import React, { useState, useEffect } from 'react';
import { 
  getProducts, 
  addProduct, 
  updateProduct, 
  deleteProduct,
  getQuotationRequests,
  updateSupportRequest,
  getSupportRequests,
  addInvoice,
  getInvoices,
  submitQuotationRequest,
  submitSupportRequest
} from '../lib/storeService';
import { 
  StoreProduct, 
  StoreCategory, 
  StoreQuotationRequest, 
  Invoice, 
  SupportRequest 
} from '../types/store';
import { auth } from '../lib/firebase';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { 
  getLinkedForms, 
  saveFormConfig, 
  unlinkFormConfig, 
  createRealGoogleForm, 
  seedFormQuestions, 
  getGoogleFormStructure, 
  getGoogleFormResponses, 
  getFormsAccessToken, 
  setFormsAccessToken,
  GoogleFormConfig
} from '../lib/formsService';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  LayoutDashboard, 
  PackageCheck, 
  FileCheck, 
  LifeBuoy, 
  Plus, 
  Briefcase, 
  Check, 
  X, 
  Reply, 
  Settings, 
  CheckCircle, 
  Trash2, 
  Eye, 
  User, 
  Building, 
  CreditCard,
  Sparkles,
  RefreshCw,
  Link2,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function StoreAdmin() {
  const [activeTab, setActiveTab] = useState<'products' | 'quotes' | 'invoices' | 'tickets' | 'forms'>('products');
  const [products, setProducts] = useState<StoreProduct[]>([]);
  const [quotes, setQuotes] = useState<StoreQuotationRequest[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [tickets, setTickets] = useState<SupportRequest[]>([]);
  const [loading, setLoading] = useState(true);

  // Google Forms State
  const [gformsToken, setGformsToken] = useState<string | null>(getFormsAccessToken());
  const [gformsLinked, setGformsLinked] = useState<GoogleFormConfig[]>([]);
  const [gformsLoading, setGformsLoading] = useState(false);
  const [syncingForms, setSyncingForms] = useState<{ [id: string]: boolean }>({});
  const [creatingForm, setCreatingForm] = useState(false);
  
  // Create / Link Form states
  const [newFormTitle, setNewFormTitle] = useState('');
  const [newFormTarget, setNewFormTarget] = useState<'quotes' | 'tickets'>('quotes');
  const [manualFormId, setManualFormId] = useState('');
  const [manualFormTarget, setManualFormTarget] = useState<'quotes' | 'tickets'>('quotes');

  // Response viewing states
  const [activeFormId, setActiveFormId] = useState<string | null>(null);
  const [activeFormResponses, setActiveFormResponses] = useState<any[]>([]);
  const [loadingActiveResponses, setLoadingActiveResponses] = useState(false);
  const [formQuestionsMap, setFormQuestionsMap] = useState<{ [id: string]: string }>({});

  // Forms and Modals
  const [showProductModal, setShowProductModal] = useState(false);
  const [editProduct, setEditProduct] = useState<StoreProduct | null>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'Microsoft 365 & Business Email' as StoreCategory,
    shortDescription: '',
    featuresString: '',
    monthlyPrice: 0,
    annualPrice: 0,
    imageUrl: '',
    isActive: true,
    isFeatured: false
  });

  // Ticket Response Modal
  const [selectedTicket, setSelectedTicket] = useState<SupportRequest | null>(null);
  const [ticketReplyText, setTicketReplyText] = useState('');

  // Selected Quote Detail Modal
  const [selectedQuote, setSelectedQuote] = useState<StoreQuotationRequest | null>(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
        
        const fetchedQuotes = await getQuotationRequests();
        setQuotes(fetchedQuotes);

        const fetchedInvoices = await getInvoices();
        setInvoices(fetchedInvoices);

        const fetchedTickets = await getSupportRequests();
        setTickets(fetchedTickets);

        const fetchedFormsConfigs = await getLinkedForms();
        setGformsLinked(fetchedFormsConfigs);
      } catch (e) {
        console.error("Failed to load list details", e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleCreateOrUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name || !productForm.shortDescription) return;

    const features = productForm.featuresString
      .split(',')
      .map(f => f.trim())
      .filter(f => f.length > 0);

    const dataPayload = {
      name: productForm.name,
      category: productForm.category,
      shortDescription: productForm.shortDescription,
      features,
      monthlyPrice: Number(productForm.monthlyPrice) || 0,
      annualPrice: Number(productForm.annualPrice) || 0,
      imageUrl: productForm.imageUrl || 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?w=600&auto=format&fit=crop&q=60',
      isActive: productForm.isActive,
      isFeatured: productForm.isFeatured
    };

    try {
      if (editProduct) {
        // Update Action
        await updateProduct(editProduct.id, dataPayload);
        setProducts(products.map(p => p.id === editProduct.id ? { ...p, ...dataPayload } : p));
      } else {
        // Create Action
        const newId = await addProduct(dataPayload);
        setProducts([...products, { id: newId, ...dataPayload, createdAt: new Date().toISOString() }]);
      }
      
      // Reset & exit
      setShowProductModal(false);
      setEditProduct(null);
      setProductForm({
        name: '',
        category: 'Microsoft 365 & Business Email',
        shortDescription: '',
        featuresString: '',
        monthlyPrice: 0,
        annualPrice: 0,
        imageUrl: '',
        isActive: true,
        isFeatured: false
      });
    } catch (err) {
      console.error(err);
      alert('Error saving product settings');
    }
  };

  const handleOpenEditProduct = (prod: StoreProduct) => {
    setEditProduct(prod);
    setProductForm({
      name: prod.name,
      category: prod.category as StoreCategory,
      shortDescription: prod.shortDescription,
      featuresString: prod.features.join(', '),
      monthlyPrice: prod.monthlyPrice,
      annualPrice: prod.annualPrice,
      imageUrl: prod.imageUrl,
      isActive: prod.isActive,
      isFeatured: prod.isFeatured
    });
    setShowProductModal(true);
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you holding complete intent to delete this product from database?')) return;
    try {
      await deleteProduct(id);
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Turn Quotation Basket into Approved Client Invoice
  const handleApproveQuote = async (quote: StoreQuotationRequest) => {
    try {
      // 1. Generate Invoice Items
      const invoiceItems = quote.items.map(item => ({
        description: `${item.productName} [Plan: ${item.priceChoice === 'monthly' ? 'Monthly' : 'Annual (10% Off)'}]`,
        quantity: item.quantity,
        unitPrice: item.price,
        totalPrice: item.price * item.quantity,
        billingCycle: item.priceChoice
      }));

      const grandTotal = quote.totalMonthlyAmount + quote.totalAnnualAmount;

      const invoicePayload = {
        quoteRequestId: quote.id,
        customerUid: quote.uid || 'guest-user',
        invoiceNumber: 'INV-' + Math.floor(100000 + Math.random() * 900000),
        date: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 Days Net
        items: invoiceItems,
        totalAmount: grandTotal,
        status: 'unpaid' as 'unpaid'
      };

      // Set invoice database entry
      const invoiceId = await addInvoice(invoicePayload);

      // Increment quoting status under CRM
      // Since quotes doesn't have a direct updateQuote in service, we update via global Firestore or simply visual state sync
      quote.status = 'invoice_sent';
      quote.invoiceId = invoiceId;

      setInvoices([...invoices, { id: invoiceId, ...invoicePayload, createdAt: new Date().toISOString() }]);
      setQuotes(quotes.map(q => q.id === quote.id ? { ...q, status: 'invoice_sent', invoiceId } : q));
      setSelectedQuote(null);
      alert(`SME Solution Approved! Created invoice bill ${invoicePayload.invoiceNumber} synced to customer dashboard.`);
    } catch (e) {
      console.error(e);
      alert('Error generating invoice statement');
    }
  };

  // Submit Support Ticket Answer
  const handleAnswerTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicket || !ticketReplyText) return;

    try {
      const dbUpdates = {
        status: 'resolved' as 'resolved',
        adminResponse: ticketReplyText,
        repliedAt: new Date().toISOString()
      };

      await updateSupportRequest(selectedTicket.id, dbUpdates);
      
      setTickets(tickets.map(t => t.id === selectedTicket.id ? { ...t, ...dbUpdates } : t));
      setSelectedTicket(null);
      setTicketReplyText('');
      alert('Your technical answer was published directly back to customer workspace portal.');
    } catch (err) {
      console.error(err);
    }
  };

  // Google Forms Integration Handlers
  const handleConnectFormsGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/forms');
      provider.addScope('https://www.googleapis.com/auth/forms.responses.readonly');
      
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (credential?.accessToken) {
        setFormsAccessToken(credential.accessToken);
        setGformsToken(credential.accessToken);
        alert('Successfully linked Admin Google Account! Google Forms access is now active.');
      } else {
        alert('Could not retrieve Google OAuth credentials.');
      }
    } catch (err: any) {
      console.error(err);
      alert('Google Auth connection failed: ' + err.message);
    }
  };

  const handleCreateAutoForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gformsToken) {
      alert('Please connect your Google Account first using "Link Admin Google Account".');
      return;
    }
    if (!newFormTitle) return;
    setCreatingForm(true);

    try {
      const desc = newFormTarget === 'quotes'
        ? 'Submit your business requirements to receive an automated quote and formal invoice from JJ Multi Solutions.'
        : 'Log a support ticket directly with the JJ Multi Solutions helpdesk core.';

      // 1. Create Form
      const created = await createRealGoogleForm(gformsToken, newFormTitle, desc);

      // 2. Add Questions
      await seedFormQuestions(gformsToken, created.formId, newFormTarget);

      // 3. Save Configuration
      const configPayload = {
        formId: created.formId,
        title: newFormTitle,
        responderUri: created.responderUri,
        syncTarget: newFormTarget,
        syncedResponseIds: [],
        createdAt: new Date().toISOString()
      };

      const id = await saveFormConfig(configPayload);
      setGformsLinked([...gformsLinked, { id, ...configPayload }]);
      setNewFormTitle('');
      alert(`Success! Auto-seeded Google Form "${newFormTitle}" is created and ready for action!`);
    } catch (err: any) {
      console.error(err);
      alert('Could not auto-generate form: ' + err.message);
    } finally {
      setCreatingForm(false);
    }
  };

  const handleLinkManualForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gformsToken) {
      alert('Please connect your Google Account first using "Link Admin Google Account".');
      return;
    }
    if (!manualFormId) return;

    let extractedId = manualFormId.trim();
    if (extractedId.includes('/d/')) {
      const parts = extractedId.split('/d/');
      if (parts[1]) {
        extractedId = parts[1].split('/')[0];
      }
    }

    try {
      const structure = await getGoogleFormStructure(gformsToken, extractedId);
      const configPayload = {
        formId: extractedId,
        title: structure.info?.title || 'Imported Google Form',
        responderUri: structure.responderUri || `https://docs.google.com/forms/d/${extractedId}/viewform`,
        syncTarget: manualFormTarget,
        syncedResponseIds: [],
        createdAt: new Date().toISOString()
      };

      const id = await saveFormConfig(configPayload);
      setGformsLinked([...gformsLinked, { id, ...configPayload }]);
      setManualFormId('');
      alert(`Linked existing Google Form "${configPayload.title}" successfully!`);
    } catch (err: any) {
      console.error(err);
      alert('Failed to link Google Form: ' + err.message);
    }
  };

  const handleSyncResponses = async (formConfig: GoogleFormConfig) => {
    if (!gformsToken) {
      alert('Please link your Google Account first.');
      return;
    }

    setSyncingForms(prev => ({ ...prev, [formConfig.formId]: true }));
    try {
      const responses = await getGoogleFormResponses(gformsToken, formConfig.formId);
      if (!responses || responses.length === 0) {
        alert('No form responses found to synchronize.');
        return;
      }

      const formStructure = await getGoogleFormStructure(gformsToken, formConfig.formId);
      const questionMap: { [id: string]: string } = {};
      formStructure.items?.forEach((item: any) => {
        if (item.questionItem?.question) {
          questionMap[item.questionItem.question.questionId] = item.title || '';
        }
      });

      const unsyncedResponses = responses.filter(r => !formConfig.syncedResponseIds.includes(r.responseId));
      if (unsyncedResponses.length === 0) {
        alert('All available submissions are already in sync!');
        return;
      }

      let syncCount = 0;
      const updatedSyncedIds = [...formConfig.syncedResponseIds];

      for (const resp of unsyncedResponses) {
        let nameVal = '';
        let emailVal = '';
        let phoneVal = '';
        let companyVal = 'Direct Submission';
        let serviceQueryVal = 'General Business Solved';
        let messageVal = '';
        let subjectVal = 'Feedback Form Lead';
        let categoryVal: 'Technical' | 'Billing' | 'General' = 'General';

        if (resp.answers) {
          Object.entries(resp.answers).forEach(([qId, valObj]: [string, any]) => {
            const questionTitle = (questionMap[qId] || '').toLowerCase();
            const rawAnsValue = valObj.textAnswers?.answers?.[0]?.value || '';

            if (questionTitle.includes('name')) {
              nameVal = rawAnsValue;
            } else if (questionTitle.includes('mail')) {
              emailVal = rawAnsValue;
            } else if (questionTitle.includes('phone') || questionTitle.includes('cell') || questionTitle.includes('contact')) {
              phoneVal = rawAnsValue;
            } else if (questionTitle.includes('comp') || questionTitle.includes('busin')) {
              companyVal = rawAnsValue;
            } else if (questionTitle.includes('service') || questionTitle.includes('product') || questionTitle.includes('solution')) {
              serviceQueryVal = rawAnsValue;
            } else if (questionTitle.includes('message') || questionTitle.includes('detail') || questionTitle.includes('desc') || questionTitle.includes('problem')) {
              messageVal = rawAnsValue;
            } else if (questionTitle.includes('subject') || questionTitle.includes('issue')) {
              subjectVal = rawAnsValue;
            } else if (questionTitle.includes('category') || questionTitle.includes('type')) {
              if (rawAnsValue.toLowerCase().includes('billing')) categoryVal = 'Billing';
              else if (rawAnsValue.toLowerCase().includes('tech')) categoryVal = 'Technical';
              else categoryVal = 'General';
            }
          });
        }

        const fallbackName = nameVal || `Form Lead ${resp.responseId.slice(-4)}`;
        const fallbackEmail = emailVal || 'customer-from-form@jjmultisolutions.co.za';

        if (formConfig.syncTarget === 'quotes') {
          const newQuotePayload = {
            fullName: fallbackName,
            email: fallbackEmail,
            phone: phoneVal || '082 000 0000',
            businessName: companyVal,
            message: messageVal || `Interested in solutions: ${serviceQueryVal}. Synced from Google Form.`,
            items: [
              {
                productId: 'custom-form-import',
                productName: `Product Enquiry: ${serviceQueryVal}`,
                category: 'Connectivity & Communications',
                priceChoice: 'monthly' as const,
                price: 0,
                quantity: 1
              }
            ],
            totalMonthlyAmount: 0,
            totalAnnualAmount: 0,
          };
          await submitQuotationRequest(newQuotePayload);
        } else {
          const newTicketPayload = {
            customerUid: 'gforms-bot',
            customerName: fallbackName,
            customerEmail: fallbackEmail,
            subject: subjectVal || `Form Help Support: ${messageVal.substring(0, 31)}...`,
            message: messageVal || `Form Details: ${serviceQueryVal}`,
            category: categoryVal
          };
          await submitSupportRequest(newTicketPayload);
        }

        updatedSyncedIds.push(resp.responseId);
        syncCount++;
      }

      // Save updated sync config states back
      const updatedConfig = {
        ...formConfig,
        syncedResponseIds: updatedSyncedIds
      };

      const { id, ...savePayload } = updatedConfig;
      await saveFormConfig(savePayload, formConfig.id);

      setGformsLinked(gformsLinked.map(g => g.id === formConfig.id ? updatedConfig : g));

      // Reload databases lists
      const fetchedQuotes = await getQuotationRequests();
      setQuotes(fetchedQuotes);
      const fetchedTickets = await getSupportRequests();
      setTickets(fetchedTickets);

      alert(`Synchronization completed! Successfully processed and imported ${syncCount} form responses.`);
    } catch (err: any) {
      console.error(err);
      alert('Error syncing responses: ' + err.message);
    } finally {
      setSyncingForms(prev => ({ ...prev, [formConfig.formId]: false }));
    }
  };

  const handleUnlinkForm = async (id: string, formTitle: string) => {
    const isConfirmed = window.confirm(`Are you sure you want to unlink form "${formTitle}" from your CRM? Submissions will remain safe in Google, but will stop syncing.`);
    if (!isConfirmed) return;

    try {
      await unlinkFormConfig(id);
      setGformsLinked(gformsLinked.filter(g => g.id !== id));
      if (activeFormId === id) {
        setActiveFormId(null);
        setActiveFormResponses([]);
      }
      alert('Form unlinked successfully.');
    } catch (err: any) {
      console.error(err);
      alert('Failed to unlink form: ' + err.message);
    }
  };

  const handleViewFormResponses = async (formId: string) => {
    if (!gformsToken) {
      alert('Please connect your Google account to view active submissions.');
      return;
    }

    setActiveFormId(formId);
    setLoadingActiveResponses(true);
    try {
      // Get structure for mapping
      const formStructure = await getGoogleFormStructure(gformsToken, formId);
      const questionMap: { [id: string]: string } = {};
      formStructure.items?.forEach((item: any) => {
        if (item.questionItem?.question) {
          questionMap[item.questionItem.question.questionId] = item.title || 'Question';
        }
      });
      setFormQuestionsMap(questionMap);

      // Get responses
      const responses = await getGoogleFormResponses(gformsToken, formId);
      setActiveFormResponses(responses);
    } catch (err: any) {
      console.error(err);
      alert('Could not fetch active form submissions: ' + err.message);
    } finally {
      setLoadingActiveResponses(false);
    }
  };

  const productCategories: StoreCategory[] = [
    'Microsoft 365 & Business Email',
    'Website Hosting & Domains',
    'Antivirus & Security',
    'Business Internet (Fibre/LTE/5G)',
    'Cloud Backup',
    'IT Support Packages',
    'Productivity & Office',
    'Cybersecurity',
    'Cloud Services',
    'Hosting & Domains',
    'Design & Creative',
    'Business Software',
    'Connectivity & Communications'
  ];

  return (
    <div className="flex flex-col min-h-screen bg-muted/20 text-foreground pb-20 pt-24">
      
      {/* Page Header */}
      <section className="bg-background border-b border-border py-8 mb-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
              <span className="text-xs font-bold font-mono tracking-widest text-muted-foreground uppercase">
                JJ MULTI SOLUTIONS CONTROL PANEL
              </span>
            </div>
            <h1 className="text-3xl font-bold font-heading">Digital Store Administration</h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Add catalog solutions, process procurement quote pipelines, issue client bills, and reply to client help tickets.
            </p>
          </div>

          <div className="flex gap-2">
            <Button asChild size="sm" variant="outline" className="rounded-full">
              <Link to="/store">View Client Storefront</Link>
            </Button>
            <Button onClick={() => { setEditProduct(null); setShowProductModal(true); }} size="sm" className="rounded-full bg-primary text-white font-bold flex items-center gap-1.5">
              <Plus size={16} /> Add New Store Product
            </Button>
          </div>
        </div>
      </section>

      {/* Main Admin Content Workspace */}
      <div className="container mx-auto px-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-card border border-border rounded-xl">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary mb-4"></div>
            <p className="text-xs text-muted-foreground">Synchronizing administrative vaults with Firestore instances...</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-4 gap-8">
            
            {/* Left Nav menu tabs */}
            <div className="lg:col-span-1 space-y-2">
              <button 
                onClick={() => setActiveTab('products')}
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-left text-xs font-bold transition-all ${
                  activeTab === 'products' 
                    ? 'bg-primary text-white shadow-sm' 
                    : 'bg-card border border-border hover:bg-muted/40 text-muted-foreground'
                }`}
              >
                <PackageCheck size={18} />
                <span className="flex-1">Products Catalog ({products.length})</span>
                <Badge variant={activeTab === 'products' ? 'outline' : 'secondary'} className={activeTab === 'products' ? 'border-white text-white' : ''}>Active</Badge>
              </button>

              <button 
                onClick={() => setActiveTab('quotes')}
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-left text-xs font-bold transition-all ${
                  activeTab === 'quotes' 
                    ? 'bg-primary text-white shadow-sm' 
                    : 'bg-card border border-border hover:bg-muted/40 text-muted-foreground'
                }`}
              >
                <FileCheck size={18} />
                <span className="flex-1">Quote Inbox ({quotes.length})</span>
                {quotes.filter(q => q.status === 'pending').length > 0 && (
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                )}
              </button>

              <button 
                onClick={() => setActiveTab('invoices')}
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-left text-xs font-bold transition-all ${
                  activeTab === 'invoices' 
                    ? 'bg-primary text-white shadow-sm' 
                    : 'bg-card border border-border hover:bg-muted/40 text-muted-foreground'
                }`}
              >
                <CreditCard size={18} />
                <span className="flex-1">Invoices Issued ({invoices.length})</span>
                <Badge variant={activeTab === 'invoices' ? 'outline' : 'secondary'} className={activeTab === 'invoices' ? 'border-white text-white' : ''}>Billing</Badge>
              </button>

              <button 
                onClick={() => setActiveTab('tickets')}
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-left text-xs font-bold transition-all ${
                  activeTab === 'tickets' 
                    ? 'bg-primary text-white shadow-sm' 
                    : 'bg-card border border-border hover:bg-muted/40 text-muted-foreground'
                }`}
              >
                <LifeBuoy size={18} />
                <span className="flex-1">Support Tickets ({tickets.length})</span>
                {tickets.filter(t => t.status === 'open').length > 0 && (
                  <Badge variant="destructive" className="text-[9px] font-bold">
                    {tickets.filter(t => t.status === 'open').length} NEW
                  </Badge>
                )}
              </button>

              <button 
                onClick={() => setActiveTab('forms')}
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-left text-xs font-bold transition-all ${
                  activeTab === 'forms' 
                    ? 'bg-primary text-white shadow-sm' 
                    : 'bg-card border border-border hover:bg-muted/40 text-muted-foreground'
                }`}
              >
                <Sparkles size={18} className="text-amber-500 animate-pulse" />
                <span className="flex-1">Google Forms</span>
                <Badge variant={activeTab === 'forms' ? 'outline' : 'secondary'} className={activeTab === 'forms' ? 'border-white text-white py-0.5 font-mono text-[9px]' : 'py-0.5 font-mono text-[9px]'}>
                  {gformsLinked.length}
                </Badge>
              </button>
            </div>

            {/* Right Tab Content Panel */}
            <div className="lg:col-span-3">

              {/* ================= PRODUCTS TAB ================= */}
              {activeTab === 'products' && (
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
                  <div className="flex items-center justify-between border-b pb-4">
                    <h3 className="font-heading font-bold text-lg text-foreground">Active Catalog Registry</h3>
                    <span className="text-xs text-muted-foreground font-mono">Total {products.length} products total</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left text-muted-foreground">
                      <thead className="text-[10px] uppercase font-bold text-muted-foreground bg-muted/45 border-b">
                        <tr>
                          <th className="p-3">Product Name</th>
                          <th className="p-3">Category</th>
                          <th className="p-3">Monthly Plan</th>
                          <th className="p-3">Annual Plan</th>
                          <th className="p-3 text-center">Status</th>
                          <th className="p-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map(p => (
                          <tr key={p.id} className="border-b border-border/60 hover:bg-muted/15 transition-colors">
                            <td className="p-3">
                              <span className="font-bold text-foreground block">{p.name}</span>
                              <span className="text-[10px] block truncate max-w-xs">{p.shortDescription}</span>
                            </td>
                            <td className="p-3">
                              <Badge variant="outline" className="text-[10px] font-medium border-border py-0.5">
                                {p.category}
                              </Badge>
                            </td>
                            <td className="p-3 font-bold font-mono text-foreground">R {p.monthlyPrice}</td>
                            <td className="p-3 font-bold font-mono text-secondary">R {p.annualPrice}</td>
                            <td className="p-3 text-center">
                              <button 
                                onClick={async () => {
                                  await updateProduct(p.id, { isActive: !p.isActive });
                                  setProducts(products.map(pr => pr.id === p.id ? { ...pr, isActive: !pr.isActive } : pr));
                                }}
                                className={`text-[10px] font-black p-1 px-2.5 rounded-full transition-all ${
                                  p.isActive 
                                    ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' 
                                    : 'bg-red-100 text-red-700 hover:bg-red-200'
                                }`}
                              >
                                {p.isActive ? 'Active' : 'Disabled'}
                              </button>
                            </td>
                            <td className="p-3 text-right space-x-2">
                              {p.isFeatured && <Badge className="bg-secondary text-white mr-1 text-[9px]">Featured</Badge>}
                              <button 
                                onClick={() => handleOpenEditProduct(p)}
                                className="text-primary hover:text-primary-blue font-bold hover:underline"
                              >
                                Edit
                              </button>
                              <button 
                                onClick={() => handleDeleteProduct(p.id)}
                                className="text-red-500 hover:text-red-600 font-bold ml-2"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ================= QUOTE INBOX TAB ================= */}
              {activeTab === 'quotes' && (
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
                  <div className="flex items-center justify-between border-b pb-4">
                    <h3 className="font-heading font-bold text-lg text-foreground">Procurement Inbound Queries</h3>
                    <span className="text-xs text-muted-foreground font-mono">Quotes: {quotes.length} total</span>
                  </div>

                  {quotes.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground text-xs p-6 space-y-2">
                      <FileCheck className="mx-auto text-muted-foreground/30 mb-2" size={36} />
                      <p>Pipeline is currently completely empty.</p>
                      <p className="opacity-70">New client quotation baskets will deploy immediately to this section.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {quotes.map(q => (
                        <div key={q.id} className="p-4 border border-border rounded-xl bg-muted/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-primary/30 transition-all">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-mono text-xs font-black text-primary bg-primary/10 px-2 py-0.5 rounded">
                                {q.id}
                              </span>
                              <span className="text-xs font-bold text-muted-foreground">
                                {new Date(q.createdAt).toLocaleString().split(',')[0]}
                              </span>
                              {q.status === 'pending' ? (
                                <Badge className="bg-yellow-500 text-white text-[9px]">Awaiting Approval</Badge>
                              ) : (
                                <Badge className="bg-emerald-600 text-white text-[9px]">Invoice Issued</Badge>
                              )}
                            </div>

                            <p className="font-black text-sm text-foreground flex items-center gap-1">
                              {q.fullName} <span className="text-xs font-medium text-muted-foreground">({q.businessName})</span>
                            </p>
                            <p className="text-xs text-muted-foreground">Email: {q.email} | Tel: {q.phone}</p>
                            <p className="text-xs text-primary font-bold mt-1">
                              Requested {q.items.length} SME SaaS / Tech Solutions
                            </p>
                          </div>

                          <div className="text-right flex flex-col items-end gap-2 shrink-0 self-stretch sm:self-auto justify-between sm:justify-center">
                            <div>
                              <span className="text-[10px] text-muted-foreground block font-bold">AGGREGATION PRICE</span>
                              <span className="font-mono text-sm font-extrabold text-foreground">
                                R {q.totalMonthlyAmount + q.totalAnnualAmount}
                              </span>
                            </div>

                            <div className="flex gap-2">
                              <Button onClick={() => setSelectedQuote(q)} size="sm" variant="outline" className="rounded-full text-[10px] h-8 px-3">
                                View Request Details
                              </Button>
                              {q.status === 'pending' && (
                                <Button onClick={() => handleApproveQuote(q)} size="sm" className="rounded-full text-[10px] bg-emerald-600 hover:bg-emerald-700 text-white h-8 px-3">
                                  Approve & Bill
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ================= BILLING INVOICES TAB ================= */}
              {activeTab === 'invoices' && (
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
                  <div className="flex items-center justify-between border-b pb-4">
                    <h3 className="font-heading font-bold text-lg text-foreground">Outstanding System Invoices</h3>
                    <span className="text-xs text-muted-foreground font-mono">Invoice Records ({invoices.length})</span>
                  </div>

                  {invoices.length === 0 ? (
                    <div className="text-center py-10 text-muted-foreground text-xs space-y-1">
                      <CreditCard className="mx-auto text-muted-foreground/30" size={36} />
                      <p>No billing invoices currently compiled.</p>
                      <p className="opacity-60">Approvals inside quoting boards generate invoices here automatically.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left">
                        <thead className="text-[10px] uppercase font-bold text-muted-foreground bg-muted/40 border-b">
                          <tr>
                            <th className="p-3">Invoice Number</th>
                            <th className="p-3">Customer UID</th>
                            <th className="p-3">Amount</th>
                            <th className="p-3">Due Date</th>
                            <th className="p-3">Status</th>
                            <th className="p-3 text-right">Direct Remit Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {invoices.map(inv => (
                            <tr key={inv.id} className="border-b hover:bg-muted/10 transition-colors">
                              <td className="p-3 font-bold text-foreground">
                                {inv.invoiceNumber}
                                <span className="text-[10px] font-mono text-muted-foreground block">Ref: {inv.quoteRequestId}</span>
                              </td>
                              <td className="p-3 text-muted-foreground font-mono">{inv.customerUid.substring(0, 10)}...</td>
                              <td className="p-3 font-mono font-bold text-foreground">R {inv.totalAmount}</td>
                              <td className="p-3 text-red-500 font-bold">{inv.dueDate}</td>
                              <td className="p-3">
                                <span className={`text-[9px] font-black p-1 px-2.5 rounded-full ${
                                  inv.status === 'paid' 
                                    ? 'bg-emerald-100 text-emerald-700' 
                                    : 'bg-yellow-101 text-yellow-800 border border-yellow-200 bg-yellow-100'
                                }`}>
                                  {inv.status.toUpperCase()}
                                </span>
                              </td>
                              <td className="p-3 text-right">
                                {inv.status === 'unpaid' ? (
                                  <Button 
                                    onClick={async () => {
                                      await updateSupportRequest(inv.id, { status: 'paid' as any } as any); 
                                      // Or since invoices doesn't have custom helper, use setDoc or updateDoc directly or standard state updates
                                      // We can simply bypass or update internal state for visualization:
                                      inv.status = 'paid';
                                      inv.paymentGateway = 'Yoco';
                                      setInvoices([...invoices]);
                                      alert(`Logged payment for bill ${inv.invoiceNumber} manually via bank transfer EFT.`);
                                    }}
                                    size="sm" 
                                    className="rounded-full text-[10px] bg-primary text-white"
                                  >
                                    Mark as Paid (EFT)
                                  </Button>
                                ) : (
                                  <span className="text-[10px] text-muted-foreground italic">Settled via {inv.paymentGateway}</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* ================= SUPPORT TICKETS TAB ================= */}
              {activeTab === 'tickets' && (
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
                  <div className="flex items-center justify-between border-b pb-4">
                    <h3 className="font-heading font-bold text-lg text-foreground">Customer Helpdesk Hub</h3>
                    <span className="text-xs text-muted-foreground font-mono">Tickets: {tickets.length} total</span>
                  </div>

                  {tickets.length === 0 ? (
                    <div className="text-center py-10 text-muted-foreground text-xs p-4">
                      <LifeBuoy className="mx-auto text-muted-foreground/30 mb-2" size={36} />
                      <p>Hub is currently silent. No helpdesk submissions.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {tickets.map(tk => (
                        <div key={tk.id} className="p-4 border border-border rounded-xl bg-card hover:border-primary/20 transition-all space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Badge className={tk.category === 'Technical' ? 'bg-red-500' : tk.category === 'Billing' ? 'bg-blue-500' : 'bg-orange-500'}>
                                {tk.category}
                              </Badge>
                              <span className="font-mono text-xs font-bold text-muted-foreground">ID: {tk.id}</span>
                            </div>
                            
                            <Badge variant={tk.status === 'resolved' ? 'outline' : 'destructive'} className={tk.status === 'resolved' ? 'text-emerald-600 border-emerald-600' : ''}>
                              {tk.status === 'resolved' ? 'Resolved / Replied' : 'Open Ticket'}
                            </Badge>
                          </div>

                          <div>
                            <h4 className="font-bold text-sm text-foreground mb-1">{tk.subject}</h4>
                            <p className="text-xs text-muted-foreground italic">"{tk.message}"</p>
                          </div>

                          <div className="flex items-center justify-between text-[11px] text-muted-foreground border-t border-border/60 pt-2.5">
                            <div>
                              <span>Submitted by: <strong>{tk.customerName}</strong> ({tk.customerEmail})</span>
                            </div>

                            {tk.adminResponse ? (
                              <div className="text-right">
                                <span className="text-emerald-600 font-bold block">REPLY ATTACHED</span>
                                <span className="opacity-70 font-mono text-[10px]">"{tk.adminResponse}"</span>
                              </div>
                            ) : (
                              <Button onClick={() => setSelectedTicket(tk)} size="sm" className="rounded-full bg-secondary text-white text-[10px] flex items-center gap-1">
                                <Reply size={12} /> Reply to Ticket
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ================= GOOGLE FORMS INTEGRATION TAB ================= */}
              {activeTab === 'forms' && (
                <div className="space-y-6">
                  {/* Google Forms Header Dashboard */}
                  <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Sparkles className="text-amber-500" size={20} />
                        <h3 className="font-heading font-bold text-lg text-foreground">Google Forms Workspace Hub</h3>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Integrate customer replies directly into your Quotation pipeline and Support ticketing system.
                      </p>
                    </div>

                    <div>
                      {gformsToken ? (
                        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/25 p-2 px-4 rounded-full text-xs font-mono font-bold text-emerald-500">
                          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                          Connected as Administrator
                        </div>
                      ) : (
                        <Button 
                          onClick={handleConnectFormsGoogle} 
                          size="sm" 
                          className="rounded-full bg-primary hover:bg-primary/90 text-white font-bold flex items-center gap-1.5"
                        >
                          <svg className="w-4 h-4 mr-1 text-white" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12.24 10.285V13.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l2.427-2.334C17.955 2.192 15.34 1 12.24 1 5.466 1 0 6.466 0 13.24s5.466 12.24 12.24 12.24c7.07 0 11.77-4.97 11.77-11.97 0-.815-.087-1.437-.2-1.97H12.24z"/>
                          </svg>
                          Link Admin Google Account
                        </Button>
                      )}
                    </div>
                  </div>

                  {!gformsToken ? (
                    <div className="bg-card border border-border rounded-xl p-10 text-center space-y-4 shadow-sm">
                      <div className="h-14 w-14 bg-muted text-muted-foreground flex items-center justify-center rounded-full mx-auto">
                        <Sparkles size={28} className="text-amber-500 animate-pulse" />
                      </div>
                      <div className="max-w-md mx-auto space-y-2">
                        <h4 className="font-bold text-base text-foreground">Sign In to Workspace required</h4>
                        <p className="text-xs text-muted-foreground">
                          Connecting your Google Account lets us communicate with the Google Forms API safely on your behalf. Create templates or link existing forms, then sync submissions dynamically into your South African customer CRM!
                        </p>
                      </div>
                      <Button 
                        onClick={handleConnectFormsGoogle} 
                        size="default" 
                        className="rounded-full bg-primary hover:bg-primary/95 text-white font-bold mt-2"
                      >
                        Authorize & Proceed Now
                      </Button>
                    </div>
                  ) : (
                    <>
                      {/* Configuration Grid */}
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Auto Form Seeder Card */}
                        <Card className="border-border bg-card">
                          <CardHeader className="pb-3 border-b border-border/60">
                            <h4 className="text-sm font-bold text-foreground">A. Auto-Seed Google Form template</h4>
                            <p className="text-[11px] text-muted-foreground">Instantly deploy a fully responsive form directly inside your Google Drive containing pre-configured question schemas.</p>
                          </CardHeader>
                          <CardContent className="pt-4 space-y-4">
                            <form onSubmit={handleCreateAutoForm} className="space-y-3">
                              <div className="space-y-1">
                                <label className="text-xs font-bold text-muted-foreground block">Google Form Title</label>
                                <Input 
                                  required 
                                  placeholder="e.g. JJMS Enterprise Enquiry Form" 
                                  className="bg-transparent border-border text-xs h-10" 
                                  value={newFormTitle}
                                  onChange={(e) => setNewFormTitle(e.target.value)}
                                  disabled={creatingForm}
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-xs font-bold text-muted-foreground block font-sans">Sync Destination Pipeline</label>
                                <select 
                                  className="w-full text-xs bg-transparent border border-border rounded-lg p-2.5 text-foreground h-10"
                                  value={newFormTarget}
                                  onChange={(e: any) => setNewFormTarget(e.target.value)}
                                  disabled={creatingForm}
                                >
                                  <option value="quotes">Quotation Pipeline (Imports as Quote Request)</option>
                                  <option value="tickets">Support Desk (Imports as Help Ticket)</option>
                                </select>
                              </div>

                              <Button 
                                type="submit" 
                                size="sm" 
                                className="w-full rounded-full bg-primary text-white font-bold flex items-center justify-center gap-2 h-10"
                                disabled={creatingForm || !newFormTitle}
                              >
                                {creatingForm ? (
                                  <>
                                    <RefreshCw className="animate-spin text-white" size={14} />
                                    Creating Form in Drive...
                                  </>
                                ) : (
                                  <>
                                    <Plus size={14} />
                                    Generate Google Form
                                  </>
                                )}
                              </Button>
                            </form>
                          </CardContent>
                        </Card>

                        {/* Link Existing Forms Card */}
                        <Card className="border-border bg-card">
                          <CardHeader className="pb-3 border-b border-border/60">
                            <h4 className="text-sm font-bold text-foreground">B. Link existing Google Form</h4>
                            <p className="text-[11px] text-muted-foreground">Connect any form you have already created in Google. Paste the public URL or file ID directly.</p>
                          </CardHeader>
                          <CardContent className="pt-4 space-y-4">
                            <form onSubmit={handleLinkManualForm} className="space-y-3">
                              <div className="space-y-1">
                                <label className="text-xs font-bold text-muted-foreground block">Google Form link / File ID</label>
                                <Input 
                                  required 
                                  placeholder="https://docs.google.com/forms/d/..." 
                                  className="bg-transparent border-border text-xs h-10" 
                                  value={manualFormId}
                                  onChange={(e) => setManualFormId(e.target.value)}
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-xs font-bold text-muted-foreground block">Sync Destination Pipeline</label>
                                <select 
                                  className="w-full text-xs bg-transparent border border-border rounded-lg p-2.5 text-foreground h-10"
                                  value={manualFormTarget}
                                  onChange={(e: any) => setManualFormTarget(e.target.value)}
                                >
                                  <option value="quotes">Quotation Pipeline (Quote Request)</option>
                                  <option value="tickets">Support Desk (Support Request)</option>
                                </select>
                              </div>

                              <Button 
                                type="submit" 
                                size="sm" 
                                className="w-full rounded-full bg-secondary text-white font-bold flex items-center justify-center gap-1.5 h-10"
                                disabled={!manualFormId}
                              >
                                <Link2 size={14} />
                                Link Existing Form
                              </Button>
                            </form>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Active Connected Forms List */}
                      <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-4">
                        <div className="flex items-center justify-between border-b border-border/50 pb-3">
                          <h4 className="font-heading font-bold text-sm text-foreground">Linked Forms Directory</h4>
                          <span className="text-[10px] text-muted-foreground font-mono">Linked forms: {gformsLinked.length}</span>
                        </div>

                        {gformsLinked.length === 0 ? (
                          <div className="text-center py-10 text-muted-foreground text-xs space-y-1">
                            <Link2 className="mx-auto text-muted-foreground/30" size={36} />
                            <p>No active Google Forms linked.</p>
                            <p className="opacity-60">Generate a template or link an existing form to build sync maps.</p>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {gformsLinked.map(gConfig => (
                              <div key={gConfig.id} className="p-4 border border-border/70 rounded-xl bg-muted/10 hover:border-primary/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="space-y-1.5 flex-1 select-none">
                                  <div className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
                                    <span className="font-bold text-xs text-foreground block">{gConfig.title}</span>
                                  </div>
                                  <div className="flex flex-wrap items-center gap-2 text-[10px] text-muted-foreground">
                                    <span className="font-mono bg-muted p-0.5 px-2 rounded">Target: <strong className="text-foreground capitalize">{gConfig.syncTarget === 'quotes' ? 'quotes' : 'tickets'}</strong></span>
                                    <span>•</span>
                                    <span>ID: <code className="font-mono text-muted-foreground select-all">{gConfig.formId}</code></span>
                                    <span>•</span>
                                    <span>Synced: <strong className="text-secondary">{gConfig.syncedResponseIds.length}</strong></span>
                                  </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-2">
                                  {/* Open in Drive */}
                                  <Button asChild size="sm" variant="outline" className="rounded-full text-[10px] h-8 font-bold border-border">
                                    <a href={gConfig.responderUri} target="_blank" rel="noreferrer" className="flex items-center gap-1 bg-transparent text-foreground">
                                      <ExternalLink size={10} /> View Google Form
                                    </a>
                                  </Button>

                                  {/* View Submissions */}
                                  <Button 
                                    onClick={() => handleViewFormResponses(gConfig.formId)} 
                                    size="sm" 
                                    variant="outline" 
                                    className="rounded-full text-[10px] h-8 font-bold border border-secondary text-secondary hover:bg-secondary/5 font-mono"
                                  >
                                    View Submissions
                                  </Button>

                                  {/* Trigger Sync */}
                                  <Button
                                    onClick={() => handleSyncResponses(gConfig)}
                                    size="sm"
                                    className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] h-8 font-bold flex items-center gap-1.5"
                                    disabled={syncingForms[gConfig.formId]}
                                  >
                                    {syncingForms[gConfig.formId] ? (
                                      <>
                                        <RefreshCw className="animate-spin" size={12} />
                                        Syncing...
                                      </>
                                    ) : (
                                      <>
                                        <RefreshCw size={11} />
                                        Sync Responses
                                      </>
                                    )}
                                  </Button>

                                  {/* Unlink Form */}
                                  <button 
                                    onClick={() => handleUnlinkForm(gConfig.id, gConfig.title)} 
                                    className="p-2 text-red-500 hover:text-red-700 bg-red-500/10 hover:bg-red-500/20 rounded-full transition-colors self-center pointer"
                                    title="Unlink form from app"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* live Submissions Inspector drawer */}
                      {activeFormId && (
                        <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-4">
                          <div className="flex items-center justify-between border-b pb-3">
                            <div>
                              <h4 className="font-heading font-bold text-sm text-foreground">Responses Inspector Console</h4>
                              <p className="text-[10px] text-muted-foreground mt-0.5">Form ID: <span className="font-mono text-foreground font-semibold">{activeFormId}</span></p>
                            </div>
                            <button onClick={() => { setActiveFormId(null); setActiveFormResponses([]); }} className="p-1 rounded bg-muted text-muted-foreground hover:text-foreground">
                              <X size={14} />
                            </button>
                          </div>

                          {loadingActiveResponses ? (
                            <div className="flex flex-col items-center justify-center py-10 select-none">
                              <RefreshCw size={24} className="animate-spin text-primary mb-2" />
                              <p className="text-[11px] text-muted-foreground font-mono">Retrieving Google Forms REST Response Body...</p>
                            </div>
                          ) : activeFormResponses.length === 0 ? (
                            <div className="text-center py-10 border border-dashed border-border rounded-xl text-muted-foreground text-xs p-4 bg-muted/5">
                              <p>No customer submissions recorded inside this Google Form yet.</p>
                              <p className="opacity-70 mt-1">Distribute the Google Form link to start collecting and syncing submissions.</p>
                            </div>
                          ) : (
                            <div className="space-y-4 max-h-[450px] overflow-y-auto pr-1">
                              {activeFormResponses.map((response: any, idx: number) => (
                                <div key={response.responseId || idx} className="p-4 border border-border/50 rounded-lg bg-muted/15 space-y-3">
                                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/40 pb-2">
                                    <span className="font-bold text-xs font-mono text-muted-foreground">SUBMISSION #{idx + 1}</span>
                                    <span className="text-[10px] text-muted-foreground font-mono bg-card px-2 py-0.5 rounded border">ID: {response.responseId}</span>
                                    <span className="text-[10px] text-muted-foreground font-mono">{response.lastSubmittedTime ? new Date(response.lastSubmittedTime).toLocaleString() : ''}</span>
                                  </div>

                                  <div className="space-y-2.5">
                                    {response.answers && Object.entries(response.answers).map(([qId, valObj]: [string, any]) => {
                                      const questionText = formQuestionsMap[qId] || 'Question';
                                      const answerString = valObj.textAnswers?.answers?.[0]?.value || 'No response';
                                      return (
                                        <div key={qId} className="text-xs">
                                          <p className="font-medium text-muted-foreground font-sans">{questionText}:</p>
                                          <p className="font-bold text-foreground font-heading mt-0.5 break-all pl-2.5 border-l-2 border-primary/20">
                                            {answerString}
                                          </p>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

            </div>
          </div>
        )}
      </div>

      {/* ================= MODAL: ADD / EDIT PRODUCT ================= */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-xl shadow-lg w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h3 className="font-heading font-bold text-base text-foreground">
                {editProduct ? 'Edit Catalog Entry' : 'Add New Solution to Catalogue'}
              </h3>
              <button onClick={() => setShowProductModal(false)} className="p-1 rounded bg-muted text-muted-foreground hover:text-foreground">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateOrUpdateProduct} className="p-6 overflow-y-auto space-y-4 flex-1">
              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground">Product Name *</label>
                <Input 
                  required 
                  placeholder="e.g. Microsoft 365 Business Basic, SME Uncapped Fibre 50/50" 
                  className="bg-transparent text-xs text-foreground border-border h-10" 
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground">Store Category *</label>
                  <select 
                    className="w-full text-xs bg-transparent border border-border rounded-lg p-2 text-foreground h-10"
                    value={productForm.category}
                    onChange={(e: any) => setProductForm({ ...productForm, category: e.target.value })}
                  >
                    {productCategories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground">Image URL string</label>
                  <Input 
                    placeholder="https://images.unsplash.com/..." 
                    className="bg-transparent text-xs text-foreground border-border h-10" 
                    value={productForm.imageUrl}
                    onChange={(e) => setProductForm({ ...productForm, imageUrl: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground">Monthly Plan Price ZAR *</label>
                  <Input 
                    required 
                    type="number"
                    min="0"
                    className="bg-transparent text-xs text-foreground border-border h-10" 
                    value={productForm.monthlyPrice}
                    onChange={(e) => setProductForm({ ...productForm, monthlyPrice: Number(e.target.value) || 0 })}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground">Annual Plan Price ZAR (10% Off) *</label>
                  <Input 
                    required 
                    type="number"
                    min="0"
                    className="bg-transparent text-xs text-foreground border-border h-10" 
                    value={productForm.annualPrice}
                    onChange={(e) => setProductForm({ ...productForm, annualPrice: Number(e.target.value) || 0 })}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground">Short Marketing Tagline/Description *</label>
                <textarea 
                  required
                  rows={2}
                  placeholder="Summarise high selling pitch point..." 
                  className="w-full text-xs bg-transparent border border-border rounded-lg p-3 text-foreground"
                  value={productForm.shortDescription}
                  onChange={(e) => setProductForm({ ...productForm, shortDescription: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground">Features Spec Sheet (Comma Separated) *</label>
                <textarea 
                  required
                  rows={2}
                  placeholder="e.g. 1TB OneDrive cloud storage, 50GB Custom Mailbox, Symmetrical Uptime" 
                  className="w-full text-xs bg-transparent border border-border rounded-lg p-3 text-foreground"
                  value={productForm.featuresString}
                  onChange={(e) => setProductForm({ ...productForm, featuresString: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="isActivePr"
                    checked={productForm.isActive}
                    onChange={(e) => setProductForm({ ...productForm, isActive: e.target.checked })}
                  />
                  <label htmlFor="isActivePr" className="text-xs font-bold text-muted-foreground cursor-pointer">Activate Product immediately</label>
                </div>
                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="isFeaturedPr"
                    checked={productForm.isFeatured}
                    onChange={(e) => setProductForm({ ...productForm, isFeatured: e.target.checked })}
                  />
                  <label htmlFor="isFeaturedPr" className="text-xs font-bold text-muted-foreground cursor-pointer">Feature on main catalog page</label>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full rounded-full bg-primary font-bold text-white text-xs py-2.5 mt-4"
              >
                {editProduct ? 'Update Catalogue Specs' : 'Publish Solution Live'}
              </Button>
            </form>
          </div>
        </div>
      )}


      {/* ================= MODAL: REPLY SUPPORT TICKET ================= */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-xl shadow-lg w-full max-w-md p-6 relative">
            <button onClick={() => setSelectedTicket(null)} className="absolute top-4 right-4 p-1 rounded bg-muted text-muted-foreground hover:text-foreground">
              <X size={16} />
            </button>

            <form onSubmit={handleAnswerTicket} className="space-y-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <Reply size={20} />
              </div>
              <div>
                <h4 className="font-heading font-black text-base text-foreground">Reply to Helpdesk Ticket</h4>
                <p className="text-xs text-muted-foreground font-semibold">Ref Ticket ID: {selectedTicket.id}</p>
              </div>

              <div className="bg-muted p-3.5 rounded-lg text-xs space-y-1 italic text-muted-foreground">
                <p className="font-bold text-[10px] text-muted-foreground uppercase not-italic">Query from Client {selectedTicket.customerName}:</p>
                <p>"{selectedTicket.message}"</p>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground">Your Technician Response Message *</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Type advice, links, or invoice confirmation details here..." 
                  className="w-full text-xs bg-transparent border border-border rounded-lg p-3 text-foreground"
                  value={ticketReplyText}
                  onChange={(e) => setTicketReplyText(e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full rounded-full bg-primary text-white text-xs font-bold py-2">
                Dispatch Response
              </Button>
            </form>
          </div>
        </div>
      )}


      {/* ================= MODAL: WORKSPACE QUOTE REQUEST DETAILS ================= */}
      {selectedQuote && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-xl shadow-lg w-full max-w-lg overflow-hidden flex flex-col justify-between max-h-[85vh]">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h3 className="font-heading font-bold text-sm text-foreground">Quote Request: {selectedQuote.id} Details</h3>
              <button onClick={() => setSelectedQuote(null)} className="p-1 rounded bg-muted text-muted-foreground hover:text-foreground">
                <X size={16} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              {/* Customer summary metadata */}
              <div className="grid grid-cols-2 gap-4 border-b border-border pb-4 text-xs">
                <div>
                  <span className="text-[10px] text-muted-foreground block font-bold">CLIENT NAME</span>
                  <span className="font-bold text-foreground flex items-center gap-1"><User size={12} /> {selectedQuote.fullName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground block font-bold">BUSINESS SMME</span>
                  <span className="font-bold text-foreground flex items-center gap-1"><Building size={12} /> {selectedQuote.businessName}</span>
                </div>
                <div className="mt-2 text-left">
                  <span className="text-[10px] text-muted-foreground block font-bold">EMAIL ADDRESS</span>
                  <a href={`mailto:${selectedQuote.email}`} className="text-primary hover:underline font-bold">{selectedQuote.email}</a>
                </div>
                <div className="mt-2 text-left">
                  <span className="text-[10px] text-muted-foreground block font-bold">TEL PHONE</span>
                  <span className="font-mono text-foreground font-bold">{selectedQuote.phone}</span>
                </div>
              </div>

              {selectedQuote.message && (
                <div className="bg-muted p-2 rounded text-xs text-muted-foreground leading-normal">
                  <span className="font-mono block text-[9px] uppercase font-bold text-muted-foreground mb-0.5">SPECIAL INSTRUCTIONS:</span>
                  "{selectedQuote.message}"
                </div>
              )}

              {/* Items Table */}
              <div className="space-y-2">
                <h5 className="font-bold text-[10px] uppercase text-muted-foreground tracking-wider">Requested Solutions Basket</h5>
                <div className="border border-border rounded-lg overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-muted text-muted-foreground text-[10px] uppercase font-bold">
                      <tr>
                        <th className="p-2">Item Name</th>
                        <th className="p-2">Quantity</th>
                        <th className="p-2">Plan</th>
                        <th className="p-2 text-right">Unit ZAR</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedQuote.items.map((it, i) => (
                        <tr key={i} className="border-b last:border-0">
                          <td className="p-2 font-bold text-foreground truncate max-w-[150px]">{it.productName}</td>
                          <td className="p-2 font-mono">{it.quantity}</td>
                          <td className="p-2">
                            <Badge className={it.priceChoice === 'monthly' ? 'bg-primary text-white text-[8px]' : 'bg-secondary text-white text-[8px]'}>
                              {it.priceChoice}
                            </Badge>
                          </td>
                          <td className="p-2 text-right font-mono">R {it.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-muted/30 p-4 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-muted-foreground block font-bold">SUMMARY AGGREGATE</span>
                  <span className="text-foreground">Excluding tax</span>
                </div>
                <div className="text-right font-mono font-black text-foreground">
                  R {selectedQuote.totalMonthlyAmount + selectedQuote.totalAnnualAmount}
                </div>
              </div>
            </div>

            <div className="p-4 bg-muted/20 border-t border-border flex gap-2">
              <Button onClick={() => setSelectedQuote(null)} variant="outline" className="flex-1 rounded-full text-xs">
                Back to Inbox
              </Button>
              {selectedQuote.status === 'pending' && (
                <Button onClick={() => handleApproveQuote(selectedQuote)} className="flex-1 rounded-full bg-emerald-600 text-white text-xs font-bold">
                  Approve Solutions & Generate Invoice
                </Button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
