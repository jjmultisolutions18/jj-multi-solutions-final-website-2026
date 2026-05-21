import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  getQuotationRequests, 
  getInvoices, 
  getSubscriptions, 
  getSupportRequests, 
  submitSupportRequest,
  updateInvoiceStatus,
  addSubscription
} from '../lib/storeService';
import { 
  StoreQuotationRequest, 
  Invoice, 
  Subscription, 
  SupportRequest,
  PaymentGatewayConfig 
} from '../types/store';
import { 
  auth 
} from '../lib/firebase';
import { 
  onAuthStateChanged, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut 
} from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Key, 
  ArrowRight, 
  HelpCircle, 
  LogOut, 
  Clock, 
  FileCheck, 
  ShieldCheck, 
  LifeBuoy, 
  Send, 
  CreditCard, 
  Check, 
  ArrowUpRight, 
  HeartHandshake,
  Wallet,
  Building,
  Mail,
  Smartphone,
  Info,
  ChevronRight,
  Sparkles,
  X
} from 'lucide-react';

export default function CustomerDashboard() {
  const [user, setUser] = useState<any>(null);
  const [authChecking, setAuthChecking] = useState(true);
  
  // Data State
  const [quotes, setQuotes] = useState<StoreQuotationRequest[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [tickets, setTickets] = useState<SupportRequest[]>([]);
  const [loading, setLoading] = useState(true);

  // New Ticket Form State
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    message: '',
    category: 'Technical' as 'Technical' | 'Billing' | 'General'
  });
  const [submittingTicket, setSubmittingTicket] = useState(false);

  // Payment Gateway Modal State
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [selectedGateway, setSelectedGateway] = useState<'payfast' | 'yoco' | 'ozow' | 'peach' | 'stripe' | null>(null);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);

  // Authenticate triggers
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setAuthChecking(false);
      
      if (currentUser) {
        setLoading(true);
        try {
          // Fetch data associated with this logged-in account
          const fetchedQuotes = await getQuotationRequests(currentUser.uid);
          setQuotes(fetchedQuotes);

          const fetchedInvoices = await getInvoices(currentUser.uid);
          setInvoices(fetchedInvoices);

          const fetchedSubs = await getSubscriptions(currentUser.uid);
          setSubscriptions(fetchedSubs);

          const fetchedTickets = await getSupportRequests(currentUser.uid);
          setTickets(fetchedTickets);
        } catch (e) {
          console.error("Error loading account data:", e);
        } finally {
          setLoading(false);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error("Auth helper Google sign in error:", err);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
    setQuotes([]);
    setInvoices([]);
    setSubscriptions([]);
    setTickets([]);
  };

  // Submit Client Support Ticket
  const handleSubmitTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !ticketForm.subject || !ticketForm.message) return;
    setSubmittingTicket(true);

    try {
      const payload = {
        customerUid: user.uid,
        customerName: user.displayName || 'Active Client',
        customerEmail: user.email || 'client@jjmultisolutions.co.za',
        subject: ticketForm.subject,
        message: ticketForm.message,
        category: ticketForm.category
      };

      const ticketId = await submitSupportRequest(payload);
      setTickets([{
        id: ticketId,
        ...payload,
        status: 'open',
        createdAt: new Date().toISOString()
      }, ...tickets]);

      setTicketForm({
        subject: '',
        message: '',
        category: 'Technical'
      });
      alert('Support ticket logged successfully! Support core notified.');
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingTicket(false);
    }
  };

  // Simulate Payment Processing Through Gateway
  const handleSimulatePayment = async () => {
    if (!selectedInvoice || !selectedGateway) return;
    setProcessingPayment(true);

    // Dynamic gateway names matching ZAR integrations
    const gatewayNames = {
      payfast: 'PayFast',
      yoco: 'Yoco Payments',
      ozow: 'Ozow EFT',
      peach: 'Peach Payments',
      stripe: 'Stripe Global'
    };

    setTimeout(async () => {
      try {
        const selectedGateStr: any = gatewayNames[selectedGateway];
        
        // 1. Update invoice status in DB
        await updateInvoiceStatus(selectedInvoice.id, 'paid', selectedGateStr);
        
        // 2. Proactively build active SaaS subscriptions for paid products inside collection!
        // To construct a hyper-complete user loop, we iterate over items in matching quotation
        const quoteObj = quotes.find(q => q.id === selectedInvoice.quoteRequestId);
        if (quoteObj) {
          for (const item of quoteObj.items) {
            const subPayload = {
              customerUid: user.uid,
              productName: item.productName,
              productId: item.productId,
              billingCycle: item.priceChoice,
              price: item.price,
              status: 'active' as 'active',
              startDate: new Date().toISOString().split('T')[0],
              nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 30 Days Out
            };
            const newSubId = await addSubscription(subPayload);
            setSubscriptions(prev => [{ id: newSubId, ...subPayload, createdAt: new Date().toISOString() }, ...prev]);
          }
        } else {
          // Fallback subscription generation from items description inside invoice bills
          for (const item of selectedInvoice.items) {
            const subPayload = {
              customerUid: user.uid,
              productName: item.description.split('[')[0].trim(),
              productId: 'manual-saas',
              billingCycle: (item.billingCycle === 'annual' ? 'annual' : 'monthly') as any,
              price: item.totalPrice,
              status: 'active' as 'active',
              startDate: new Date().toISOString().split('T')[0],
              nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
            };
            const newSubId = await addSubscription(subPayload);
            setSubscriptions(prev => [{ id: newSubId, ...subPayload, createdAt: new Date().toISOString() }, ...prev]);
          }
        }

        // Update local memory invoices
        setInvoices(invoices.map(inv => inv.id === selectedInvoice.id ? { 
          ...inv, 
          status: 'paid', 
          paymentGateway: selectedGateStr,
          paymentDate: new Date().toISOString()
        } : inv));

        setPaymentDone(true);
      } catch (e) {
        console.error("Simulation payment errors", e);
      } finally {
        setProcessingPayment(false);
      }
    }, 2000);
  };

  if (authChecking) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary mb-4"></div>
        <p className="text-xs text-muted-foreground font-mono">Verifying secure token handshakes...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-muted/20 text-foreground pb-20 pt-24">
      
      {/* ================= CASE A: NOT LOGGED IN ================= */}
      {!user ? (
        <div className="container mx-auto px-4 max-w-md my-auto flex flex-col items-center justify-center space-y-8 bg-card p-8 border border-border rounded-2xl shadow-sm text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <User size={30} />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold font-heading">Secure Client Space</h1>
            <p className="text-xs text-muted-foreground">
              Log in securely using Google to view approved quotation aggregates, process instant payments via local gateways, track SaaS keys, and access our dedicated SLA support helpdesk.
            </p>
          </div>

          <button 
            type="button"
            onClick={handleGoogleLogin} 
            className="w-full flex items-center justify-center gap-2 border border-border bg-background hover:bg-muted text-foreground p-3.5 rounded-full text-xs font-black shadow-sm transition-all"
          >
            {/* Google Logo */}
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
            </svg>
            Continue with Google Registration
          </button>
          
          <div className="flex items-center justify-between text-[10px] text-muted-foreground w-full font-mono">
            <span>POPIA Certified Security</span>
            <span>JJ Multi Solutions RSA</span>
          </div>
        </div>
      ) : (
        
        // ================= CASE B: LOGGED IN WORKSPACE =================
        <div className="container mx-auto px-4 space-y-8">
          
          {/* Dashboard Header Profile Banner */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img 
                src={user.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60'} 
                alt="" 
                referrerPolicy="no-referrer"
                className="w-14 h-14 rounded-full object-cover border-2 border-primary" 
              />
              <div>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-primary/10 text-primary border border-primary/20 rounded-full text-[9px] font-bold uppercase tracking-wider mb-1">
                  Verified Client Workspace
                </span>
                <h1 className="text-2xl font-heading font-black">{user.displayName}</h1>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button asChild size="sm" variant="outline" className="rounded-full">
                <Link to="/store">Store Catalog</Link>
              </Button>
              <Button onClick={handleSignOut} size="sm" variant="ghost" className="rounded-full text-xs text-red-500 hover:bg-red-50">
                <LogOut size={14} className="mr-1" /> Sign Out
              </Button>
            </div>
          </div>

          {/* Aggregate Stat cards widgets */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-card border border-border">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground">My Quotes</span>
                  <div className="text-2xl font-black font-mono text-foreground mt-1">{quotes.length}</div>
                </div>
                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg">
                  <Clock size={20} />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border border-border">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground">Unpaid Bills</span>
                  <div className="text-2xl font-black font-mono text-yellow-600 mt-1">
                    R {invoices.filter(i => i.status === 'unpaid').reduce((ac, cv) => ac + cv.totalAmount, 0)}
                  </div>
                </div>
                <div className="p-2.5 bg-yellow-50 text-yellow-600 rounded-lg">
                  <CreditCard size={20} />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border border-border">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground">Active SaaS Plans</span>
                  <div className="text-2xl font-black font-mono text-emerald-600 mt-1">{subscriptions.length}</div>
                </div>
                <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-lg">
                  <ShieldCheck size={20} />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border border-border">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground">Open Support Tickets</span>
                  <div className="text-2xl font-black font-mono text-orange-600 mt-1">
                    {tickets.filter(t => t.status === 'open' || t.status === 'in_progress').length}
                  </div>
                </div>
                <div className="p-2.5 bg-orange-50 text-orange-600 rounded-lg">
                  <LifeBuoy size={20} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Two-Column split workspace */}
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Column 1 & 2: Quotes, Invoices, Subscriptions */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Quotations Container */}
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-4">
                <h3 className="font-heading font-black text-base text-foreground flex items-center gap-1.5 border-b pb-3">
                  <FileCheck className="text-primary" size={18} /> Approved Solutions & Quotes
                </h3>

                {quotes.length === 0 ? (
                  <div className="text-center py-8 text-xs text-muted-foreground">
                    <p>No quotation requests registered under your account yet.</p>
                    <p className="opacity-70 mt-1">Browse our store and check out with an Enquiry Basket.</p>
                    <Button asChild size="sm" className="mt-4 rounded-full">
                      <Link to="/store">Browse Solutions Store</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {quotes.map(q => (
                      <div key={q.id} className="p-4 border rounded-xl bg-muted/15 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="font-mono font-bold text-xs text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                              {q.id}
                            </span>
                            <span className="text-[10px] font-bold text-muted-foreground">
                              {new Date(q.createdAt).toLocaleDateString()}
                            </span>
                            <Badge className={q.status === 'pending' ? 'bg-yellow-500' : 'bg-emerald-600'}>
                              {q.status === 'pending' ? 'Awaiting Technical Review' : 'Billing Invoice Generated'}
                            </Badge>
                          </div>
                          
                          <p className="text-xs text-foreground font-semibold">
                            Request Bundle: {q.items.map(it => `${it.productName} (x${it.quantity})`).join(', ')}
                          </p>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-[10px] text-muted-foreground block font-bold">TOTAL SUM (ZAR)</span>
                          <span className="font-mono text-sm font-extrabold text-foreground">
                            R {q.totalMonthlyAmount + q.totalAnnualAmount}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Outstanding Invoices & Gateway Billing Pay box! */}
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-4">
                <h3 className="font-heading font-black text-base text-foreground flex items-center gap-1.5 border-b pb-3">
                  <CreditCard className="text-secondary" size={18} /> Active Invoice Accounts & Gateways
                </h3>

                {invoices.length === 0 ? (
                  <div className="text-center py-8 text-xs text-muted-foreground">
                    <p>No billing invoices currently compiled.</p>
                    <p className="opacity-70 mt-1">Invoices appear immediately once quotation requests are reviewed and approved by administrators.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {invoices.map(inv => (
                      <div key={inv.id} className="p-4 border rounded-xl bg-muted/15 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono font-bold text-xs text-foreground">{inv.invoiceNumber}</span>
                            <span className="text-[10px] font-semibold text-red-500 font-mono">Due: {inv.dueDate}</span>
                            <Badge className={inv.status === 'paid' ? 'bg-emerald-600' : 'bg-yellow-500'}>
                              {inv.status === 'paid' ? 'SaaS Provisioned' : 'Awaiting Payment'}
                            </Badge>
                          </div>
                          
                          <div className="text-xs text-muted-foreground space-y-0.5 mt-1.5">
                            {inv.items.map((it, idx) => (
                              <p key={idx}>- {it.description} <span className="font-mono text-[10px]">(R {it.totalPrice})</span></p>
                            ))}
                          </div>
                        </div>

                        <div className="text-right flex flex-col sm:items-end gap-2 shrink-0 w-full sm:w-auto">
                          <div>
                            <span className="text-[10px] text-muted-foreground block font-bold">ACCOUNT SUM</span>
                            <span className="font-mono text-base font-extrabold text-foreground">R {inv.totalAmount}</span>
                          </div>

                          {inv.status === 'unpaid' ? (
                            <Button 
                              onClick={() => { setSelectedInvoice(inv); setPaymentDone(false); }} 
                              size="sm" 
                              className="rounded-full bg-secondary text-white text-[10px] h-8 px-4 font-bold flex items-center gap-1.5 text-center justify-center pointer"
                            >
                              <Wallet size={12} /> Pay with PayFast / Yoco
                            </Button>
                          ) : (
                            <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 sm:justify-end mt-1">
                              <Check size={14} /> Settled via {inv.paymentGateway}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Subscriptions Module */}
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-4">
                <h3 className="font-heading font-black text-base text-foreground flex items-center gap-1.5 border-b pb-3">
                  <ShieldCheck className="text-emerald-500" size={18} /> Active SME Software Subscriptions
                </h3>

                {subscriptions.length === 0 ? (
                  <div className="text-center py-6 text-xs text-muted-foreground">
                    <p>No active subscriptions linked.</p>
                    <p className="opacity-70 mt-1">SaaS and Connectivity structures provision synchronously as soon as invoiced payments settle.</p>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {subscriptions.map(sub => (
                      <div key={sub.id} className="p-4 border rounded-xl bg-card hover:border-emerald-500/20 transition-all flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 font-bold text-[9px] uppercase">
                              Active SaaS
                            </Badge>
                            <span className="text-[10px] font-mono font-bold text-muted-foreground">{sub.id}</span>
                          </div>

                          <h4 className="font-bold text-sm text-foreground mb-1 leading-normal">{sub.productName}</h4>
                          <p className="text-[10px] text-muted-foreground">
                            Billing cycle: <strong className="capitalize">{sub.billingCycle} Plan</strong> (R {sub.price} / cycle)
                          </p>
                        </div>

                        <div className="border-t border-border/60 pt-3 mt-4 text-[10px] text-muted-foreground flex items-center justify-between font-mono">
                          <span>Next Bill: {sub.nextBillingDate}</span>
                          <span className="text-emerald-600 font-bold">Secure Guard Lock</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

            {/* Column 3: Helpdesk & Support tickets */}
            <div className="lg:col-span-1 space-y-8">
              
              {/* Log Support Ticket Form Container */}
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-4">
                <h3 className="font-heading font-black text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 border-b pb-2">
                  <LifeBuoy className="text-orange-500 animate-spin" style={{ animationDuration: '6s' }} size={16} /> Technical Helpdesk
                </h3>

                <form onSubmit={handleSubmitTicket} className="space-y-4 text-xs">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-muted-foreground">Query Category</label>
                    <select 
                      className="w-full text-xs bg-transparent border border-border rounded-lg p-2.5 text-foreground h-10"
                      value={ticketForm.category}
                      onChange={(e: any) => setTicketForm({ ...ticketForm, category: e.target.value })}
                    >
                      <option value="Technical">Technical & Integration Issues</option>
                      <option value="Billing">Billing & Invoice Inquiries</option>
                      <option value="General">General Inquiries / Domain Check</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-muted-foreground">Short Summary *</label>
                    <Input 
                      required 
                      placeholder="e.g. Printer offline, domain redirect, fibre slow"
                      className="bg-transparent text-xs text-foreground border-border h-10" 
                      value={ticketForm.subject}
                      onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-muted-foreground">Detailed Message *</label>
                    <textarea 
                      required
                      rows={4}
                      placeholder="Detail what errors you are seeing, hardware indicators..." 
                      className="w-full text-xs bg-transparent border border-border rounded-lg p-3 text-foreground"
                      value={ticketForm.message}
                      onChange={(e) => setTicketForm({ ...ticketForm, message: e.target.value })}
                    />
                  </div>

                  <Button type="submit" disabled={submittingTicket} className="w-full rounded-full bg-primary text-white font-bold h-9">
                    {submittingTicket ? 'Syncing ticket...' : 'Submit Assistance Ticket'}
                  </Button>
                </form>
              </div>

              {/* My Historic Tickets List Box */}
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-4">
                <h4 className="font-bold text-xs uppercase tracking-wider text-muted-foreground">My Active Tickets</h4>
                
                {tickets.length === 0 ? (
                  <p className="text-xs text-muted-foreground text-center py-4 italic">No logged support inquiries.</p>
                ) : (
                  <div className="space-y-3">
                    {tickets.map(tk => (
                      <div key={tk.id} className="p-3 border rounded-xl bg-muted/20 text-xs space-y-1.5 relative border-border/85">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[9px] font-bold text-muted-foreground">ID: {tk.id}</span>
                          <Badge variant={tk.status === 'resolved' ? 'outline' : 'destructive'} className={tk.status === 'resolved' ? 'text-emerald-600 border-emerald-600' : ''}>
                            {tk.status === 'resolved' ? 'Resolved / Replied' : 'Open Ticket'}
                          </Badge>
                        </div>
                        <p className="font-bold text-foreground leading-tight">{tk.subject}</p>
                        <p className="text-muted-foreground line-clamp-2 italic">"{tk.message}"</p>
                        
                        {tk.adminResponse && (
                          <div className="mt-2 text-[11px] p-2 rounded bg-emerald-50 text-emerald-800 border-l-4 border-l-emerald-500 space-y-0.5">
                            <span className="font-black block uppercase text-[8px] text-emerald-700">Official Reply from Tech Desk:</span>
                            <p className="not-italic font-medium">"{tk.adminResponse}"</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>
      )}


      {/* ================= MODAL: PAYMENT GATEWAY SELECTION SANBOX OVERLAY ================= */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-xl shadow-lg w-full max-w-lg overflow-hidden flex flex-col justify-between max-h-[90vh]">
            
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h3 className="font-heading font-bold text-sm text-foreground flex items-center gap-1.5">
                <CreditCard className="text-secondary" size={18} /> Remit Invoice: {selectedInvoice.invoiceNumber}
              </h3>
              <button onClick={() => setSelectedInvoice(null)} className="p-1 rounded bg-muted text-muted-foreground hover:text-foreground">
                <X size={16} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              
              {paymentDone ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <Check size={36} />
                  </div>
                  <h4 className="font-heading font-black text-xl text-foreground">Secure Billing Settled!</h4>
                  <p className="text-xs text-muted-foreground max-w-md mx-auto">
                    Thank you. Your bill <strong>{selectedInvoice.invoiceNumber}</strong> was approved through the gateway. In accordance with South African POPIA regulations, your recurring active subscription is now provisioned in our CRM index. 
                  </p>
                  
                  <div className="bg-emerald-50 text-emerald-800 p-4 rounded-lg text-left max-w-md mx-auto text-xs flex gap-2 border">
                    <Sparkles className="text-emerald-500 shrink-0" size={16} />
                    <div>
                      <p className="font-bold">SaaS Subscriptions Activated!</p>
                      <p className="text-[11px] opacity-85">Check the Active Subscriptions card on your workspace dashboard: your keys have been issued.</p>
                    </div>
                  </div>

                  <Button onClick={() => setSelectedInvoice(null)} className="rounded-full bg-primary text-white font-bold text-xs mt-4">
                    Return to Workspace Dashboard
                  </Button>
                </div>
              ) : selectedGateway ? (
                /* Dynamic simulated checkout terminal interface */
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-xl text-center space-y-2">
                    <span className="text-[10px] font-bold text-primary block uppercase tracking-wider">SECURE REDIRECT ENVIRONMENT</span>
                    <h4 className="font-black text-xl text-foreground font-heading">
                      {selectedGateway === 'payfast' && 'PayFast Checkout Sandbox'}
                      {selectedGateway === 'yoco' && 'Yoco Web Pay Gateway'}
                      {selectedGateway === 'ozow' && 'Ozow Secure Automated EFT'}
                      {selectedGateway === 'peach' && 'Peach Payments RSA Portal'}
                      {selectedGateway === 'stripe' && 'Stripe Secure global Gateway'}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Transaction Amount: <strong className="font-mono text-foreground font-black">R {selectedInvoice.totalAmount}</strong> (ZAR)
                    </p>
                  </div>

                  <div className="border border-border rounded-xl p-5 space-y-4">
                    <h5 className="font-bold text-xs text-muted-foreground uppercase tracking-widest text-center">Simulated RSA Checkout Portal</h5>
                    
                    <div className="space-y-3">
                      <div className="p-3 bg-primary/5 rounded border text-xs text-primary font-medium">
                        Info: This represents a sandbox transaction demonstrating integration hooks. Tap "Authorize Demo Payment" below to simulate a real payment callback.
                      </div>
                      
                      <div className="space-y-1.5 text-xs">
                        <label className="text-[10px] font-black uppercase text-muted-foreground">Simulated Merchant Ref</label>
                        <Input disabled value={selectedInvoice.invoiceNumber} className="bg-muted text-xs text-foreground h-9" />
                      </div>

                      <div className="space-y-1.5 text-xs">
                        <label className="text-[10px] font-black uppercase text-muted-foreground">Demo Card / Bank Details</label>
                        <Input disabled value="**** **** **** 4242 [TEST CREDIT]" className="bg-muted text-xs text-foreground h-9" />
                      </div>
                    </div>

                    <div className="pt-2 flex gap-3">
                      <Button onClick={() => setSelectedGateway(null)} variant="outline" className="flex-1 rounded-full text-xs">
                        Change Gateway
                      </Button>
                      <Button 
                        type="button"
                        onClick={handleSimulatePayment} 
                        disabled={processingPayment}
                        className="flex-1 bg-secondary text-white rounded-full font-bold text-xs"
                      >
                        {processingPayment ? 'Authorising gateway EFT...' : 'Authorize Demo Payment'}
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Gateway choices board */
                <div className="space-y-4">
                  <div className="bg-muted/40 p-3.5 rounded-lg text-xs leading-normal">
                    Select a future-ready payment gateway below to process card payments, direct EFT, or mobile authorizations inside South Africa.
                  </div>

                  <div className="space-y-2.5">
                    <h4 className="font-bold text-[10px] uppercase text-muted-foreground tracking-wider">Compatible local gateway integrations:</h4>
                    
                    <button 
                      onClick={() => setSelectedGateway('payfast')}
                      className="w-full flex items-center justify-between p-3 border rounded-xl hover:border-primary/40 text-left hover:bg-muted/30 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-[#ff1c1c]/10 text-[#ff1c1c] flex items-center justify-center font-black rounded-lg text-xs font-heading">
                          PayFast
                        </div>
                        <div>
                          <h5 className="font-bold text-xs">PayFast Checkout (Pty) Ltd</h5>
                          <span className="text-[10px] text-muted-foreground block">Credit Cards, Instant EFT, Scheck, Mobicred</span>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-muted-foreground" />
                    </button>

                    <button 
                      onClick={() => setSelectedGateway('yoco')}
                      className="w-full flex items-center justify-between p-3 border rounded-xl hover:border-primary/40 text-left hover:bg-muted/30 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-[#1056f7]/10 text-[#1056f7] flex items-center justify-center font-black rounded-lg text-xs font-heading">
                          Yoco
                        </div>
                        <div>
                          <h5 className="font-bold text-xs">Yoco Payments (Standard card hooks)</h5>
                          <span className="text-[10px] text-muted-foreground block">Quick card integrations, Apple Pay, Snapscan</span>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-muted-foreground" />
                    </button>

                    <button 
                      onClick={() => setSelectedGateway('ozow')}
                      className="w-full flex items-center justify-between p-3 border rounded-xl hover:border-primary/40 text-left hover:bg-muted/30 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-[#01cb55]/10 text-[#01cb55] flex items-center justify-center font-black rounded-lg text-xs font-heading">
                          Ozow
                        </div>
                        <div>
                          <h5 className="font-bold text-xs">Ozow Secure EFT (Absa, FNB, Capitec, STD)</h5>
                          <span className="text-[10px] text-muted-foreground block">Direct, instantaneous cardless banking EFT authorization</span>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-muted-foreground" />
                    </button>

                    <button 
                      onClick={() => setSelectedGateway('peach')}
                      className="w-full flex items-center justify-between p-3 border rounded-xl hover:border-primary/40 text-left hover:bg-muted/30 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-[#fe4c61]/10 text-[#fe4c61] flex items-center justify-center font-black rounded-lg text-xs font-heading">
                          Peach
                        </div>
                        <div>
                          <h5 className="font-bold text-xs">Peach Payments Integration Layer</h5>
                          <span className="text-[10px] text-muted-foreground block">Secure card, recurring subscriptions, 3D secure standards</span>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-muted-foreground" />
                    </button>

                    <button 
                      onClick={() => setSelectedGateway('stripe')}
                      className="w-full flex items-center justify-between p-3 border rounded-xl hover:border-primary/40 text-left hover:bg-muted/30 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-[#635bff]/10 text-[#635bff] flex items-center justify-center font-black rounded-lg text-xs font-heading">
                          Stripe
                        </div>
                        <div>
                          <h5 className="font-bold text-xs">Stripe Global (Visa, Mastercard, AMEX)</h5>
                          <span className="text-[10px] text-muted-foreground block">Global multi-currency standard card structures</span>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-muted-foreground" />
                    </button>
                  </div>
                </div>
              )}

            </div>

            <div className="p-4 bg-muted/20 border-t border-border text-center text-[10px] text-muted-foreground font-mono">
              Enforced with Zero Trust Security - POPIA compliant RSA
            </div>
            
          </div>
        </div>
      )}

    </div>
  );
}
