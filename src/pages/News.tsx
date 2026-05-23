import React, { useState } from 'react';
import Section, { SectionHeader } from '@/components/ui/Section';
import { 
  Calendar as CalendarIcon, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Bell, 
  ChevronLeft, 
  ChevronRight, 
  Newspaper, 
  Tag, 
  Sparkles, 
  BookOpen, 
  Search, 
  X,
  CheckCircle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface EventItem {
  id: string;
  title: string;
  date: string;
  isoDate: string; // 'YYYY-MM-DD'
  time: string;
  venue: string;
  desc: string;
  status: 'upcoming' | 'past' | 'ongoing';
  category: 'Workshop' | 'Exhibition' | 'Challenge' | 'Briefing';
}

interface NewsItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  body: string;
  category: 'Company Update' | 'Press Release' | 'Infrastructure' | 'Community';
  readTime: string;
  image: string;
  featured?: boolean;
}

const EVENTS: EventItem[] = [
  {
    id: 'ev-1',
    title: 'AI for Small Business Workshop',
    date: 'May 28, 2026',
    isoDate: '2026-05-28',
    time: '18:00 PM - 20:00 PM',
    venue: 'Online / Zoom',
    desc: 'An interactive, hands-on session focusing on deploying Gemini models and other cutting-edge AI technologies to automate administration, draft contracts, and boost micro-business operational efficiency.',
    status: 'upcoming',
    category: 'Workshop'
  },
  {
    id: 'ev-2',
    title: 'Youth Innovation Challenge 2026',
    date: 'June 15, 2026',
    isoDate: '2026-06-15',
    time: '09:00 AM - 16:00 PM',
    venue: 'Upington Innovation Hub',
    desc: 'An annual flagship pitching arena targeting youth innovators in the Northern Cape. Competitors pitch localized digital solutions addressing socio-economic demands with seed grants on the line.',
    status: 'upcoming',
    category: 'Challenge'
  },
  {
    id: 'ev-3',
    title: 'SME Cyber Security Briefing',
    date: 'June 22, 2026',
    isoDate: '2026-06-22',
    time: '10:00 AM - 12:00 PM',
    venue: 'JJMS Corporate Office / Online Hybrid',
    desc: 'Practical guidance for local business managers on establishing multi-factor authentication, avoiding credential compromise, securing email systems, and complying with the POPIA framework.',
    status: 'upcoming',
    category: 'Briefing'
  },
  {
    id: 'ev-4',
    title: 'Rapid Prototyping Demo Day',
    date: 'July 05, 2026',
    isoDate: '2026-07-05',
    time: '11:00 AM - 15:00 PM',
    venue: 'Nexus Prototyping Lab',
    desc: 'Live laboratory show demonstrating physical product development cycles, featuring open-source 3D printers, precision resin mold drafting, and automated circuit board prototyping services.',
    status: 'upcoming',
    category: 'Exhibition'
  },
  {
    id: 'ev-5',
    title: 'Northern Cape Tech Expo',
    date: 'April 10, 2026',
    isoDate: '2026-04-10',
    time: 'All Day Event',
    venue: 'Upington Convention Centre',
    desc: 'A physical showcase assembling technological solution providers and municipal decision-makers to fast-track regional digital transformation agendas.',
    status: 'past',
    category: 'Exhibition'
  }
];

const NEWS_ARTICLES: NewsItem[] = [
  {
    id: 'news-1',
    title: 'JJ Multi Solutions Launches Digital Customer Shop & Self-Service Portal',
    date: 'May 18, 2026',
    excerpt: 'We are thrilled to unveil our self-service customer portal. Browse local business products, request automated quotation enquiries, manage invoices, and pay directly with integrated PayFast or Yoco!',
    body: 'Continuous technological evolution is at the heart of our mission. In our largest digital upgrade yet, we have built a fully secure client area directly on our web platform. South African small business owners and public agencies can now instantly browse pre-configured IT products (from web hosting packages to enterprise support desk options), check out with an "Enquiry Basket," collaborate on administrative service requirements, and settle digital accounts via secure South African payment gateways like PayFast and Yoco. This streamlines project delivery and empowers regional innovators to grow rapidly.',
    category: 'Company Update',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2026&auto=format&fit=crop',
    featured: true
  },
  {
    id: 'news-2',
    title: 'High-Speed Fibre Infrastructure Targets Regional Northern Cape Business Hubs',
    date: 'May 04, 2026',
    excerpt: 'Partnering with premium connectivity providers to bring ultra-fast dedicated fiber backbones directly to enterprise offices and tech environments.',
    body: 'Reliable link redundancy has long been a challenge for businesses in underserved geographic sectors. By partnering directly with tier-1 backhaul operators, JJ Multi Solutions is spearheading infrastructure programs targeting local office clusters and coworking hubs. We aim to secure high-capacity symmetrical fibre routes ranging from 50Mbps to 1000Mbps, minimizing downtime and equipping rural business hubs with the exact same structural assets enjoyed in major metropolitan cities like Johannesburg or Cape Town.',
    category: 'Infrastructure',
    readTime: '3 min read',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'news-3',
    title: 'Preparing Local Youth for Digitally Oriented Futures',
    date: 'April 15, 2026',
    excerpt: 'Refining preparatory masterclasses to empower high school graduates with UI/UX mockups and physical prototyping concepts before the annual June Innovation Challenge.',
    body: 'Providing equal technological exposure builds resilient entrepreneurial pipelines. In direct alignment with the upcoming Youth Innovation Challenge 2026, our training personnel hosted introductory bootcamps in Upington. Over 50 youth gained hands-on experience in cloud storage paradigms, collaborative code documentation tools, and software wireframing concepts. This gives regional students the immediate skills needed to translate community challenges into functioning software prototypes.',
    category: 'Community',
    readTime: '3 min read',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop'
  }
];

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function News() {
  const [newsQuery, setNewsQuery] = useState('');
  const [selectedNewsCategory, setSelectedNewsCategory] = useState<string>('All');
  const [activeNewsModal, setActiveNewsModal] = useState<NewsItem | null>(null);

  // Calendar States initialized to May 2026 matching local timeline context
  const [calendarDate, setCalendarDate] = useState<Date>(new Date(2026, 4, 21)); 
  const [selectedDateStr, setSelectedDateStr] = useState<string | null>(null);
  const [rsvpSuccessEventId, setRsvpSuccessEventId] = useState<string | null>(null);
  
  // Newsletter dialog simulation state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  // Month navigation
  const handlePrevMonth = () => {
    setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1));
  };

  // Calendar Calculation
  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  // Days list grid
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  const cells: { day: number; isCurrentMonth: boolean; dateStr: string }[] = [];

  // Padding from previous month
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const prevDay = daysInPrevMonth - i;
    const prevMonthIdx = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    cells.push({
      day: prevDay,
      isCurrentMonth: false,
      dateStr: `${prevYear}-${String(prevMonthIdx + 1).padStart(2, '0')}-${String(prevDay).padStart(2, '0')}`
    });
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({
      day: d,
      isCurrentMonth: true,
      dateStr: `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    });
  }

  // Padding for next month to match clean grid layout of 7 cols
  const totalCells = Math.ceil(cells.length / 7) * 7;
  const initialCellsCount = cells.length;
  const nextMonthIdx = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;
  for (let n = 1; n <= totalCells - initialCellsCount; n++) {
    cells.push({
      day: n,
      isCurrentMonth: false,
      dateStr: `${nextYear}-${String(nextMonthIdx + 1).padStart(2, '0')}-${String(n).padStart(2, '0')}`
    });
  }

  // Filters news articles dynamically
  const filteredNews = NEWS_ARTICLES.filter(art => {
    const matchesCategory = selectedNewsCategory === 'All' || art.category === selectedNewsCategory;
    const matchesQuery = art.title.toLowerCase().includes(newsQuery.toLowerCase()) || 
                         art.excerpt.toLowerCase().includes(newsQuery.toLowerCase()) ||
                         art.body.toLowerCase().includes(newsQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  // Filters events based on interactive calendar clicked cell
  const eventFilteredList = selectedDateStr 
    ? EVENTS.filter(ev => ev.isoDate === selectedDateStr)
    : EVENTS;

  const handleRSVP = (eventId: string) => {
    setRsvpSuccessEventId(eventId);
    setTimeout(() => {
      setRsvpSuccessEventId(null);
    }, 4500);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSuccess(true);
      setTimeout(() => {
        setNewsletterSuccess(false);
        setNewsletterEmail('');
        setShowNotificationModal(false);
      }, 3500);
    }
  };

  return (
    <>
      {/* Hero Header Unit */}
      <section className="bg-muted/45 py-20 relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/25 blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 pt-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 max-w-6xl mx-auto">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">Regional Updates & Events Calendar</span>
              <h1 className="text-3xl md:text-5xl font-extrabold font-heading tracking-tight text-foreground">
                News & Events
              </h1>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                Stay updated with corporate announcements, broadband fibre rollouts, regional innovation challenges, and hands-on SME tech training workshops.
              </p>
            </div>
            <Button onClick={() => setShowNotificationModal(true)} className="rounded-full px-6 gap-2 bg-primary text-white font-bold text-xs">
              <Bell size={14} /> Subscribe to Updates
            </Button>
          </div>
        </div>
      </section>

      {/* Main Multi-Column Split Portal */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* LEFT PANEL: ANNOCEMENTS & INFORMATIVE NEWS UPDATES (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <h2 className="text-xl font-bold font-heading flex items-center gap-2">
                  <Newspaper className="text-primary" size={20} /> Corporate Announcements & Press
                </h2>
                <span className="text-xs font-mono text-muted-foreground">{filteredNews.length} articles matching</span>
              </div>

              {/* Filtering + Search Utility Bar */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Input 
                    placeholder="Search announcements..." 
                    value={newsQuery}
                    onChange={(e) => setNewsQuery(e.target.value)}
                    className="pl-9 text-xs rounded-full bg-background border-border h-9"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
                </div>
                
                {/* Category selectors */}
                <div className="flex flex-wrap gap-1.5 items-center">
                  {['All', 'Company Update', 'Infrastructure', 'Community'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedNewsCategory(cat)}
                      className={`px-3 py-1 text-[11px] font-bold rounded-full transition-all border ${
                        selectedNewsCategory === cat 
                          ? 'bg-primary border-primary text-white shadow-sm' 
                          : 'bg-card border-border hover:bg-muted text-muted-foreground'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* News Lists */}
            {filteredNews.length === 0 ? (
              <div className="bg-card border border-border rounded-xl p-12 text-center text-muted-foreground text-xs space-y-1">
                <Search className="mx-auto opacity-30 text-muted-foreground mb-2" size={32} />
                <p>No matches found in news database matching.</p>
                <p className="opacity-70">Try resetting the custom tag filter categories or typing keywords.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredNews.map(news => (
                  <div 
                    key={news.id} 
                    className={`bg-card border border-border rounded-2xl overflow-hidden hover:shadow-md transition-all flex flex-col sm:flex-row gap-4 p-4 ${
                      news.featured ? 'ring-2 ring-primary/20 bg-primary/[0.01]' : ''
                    }`}
                  >
                    <div className="sm:w-40 h-28 shrink-0 rounded-xl overflow-hidden bg-muted">
                      <img 
                        src={news.image} 
                        alt={news.title} 
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between space-y-2">
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <Badge className="bg-secondary/10 border-transparent text-secondary hover:bg-secondary/20 hover:text-secondary rounded text-[9px] px-2 py-0">
                            {news.category}
                          </Badge>
                          <span className="text-[10px] text-muted-foreground font-mono">{news.date}</span>
                        </div>
                        
                        <h3 className="font-bold text-sm text-foreground hover:text-primary transition-colors cursor-pointer line-clamp-1" onClick={() => setActiveNewsModal(news)}>
                          {news.title}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                          {news.excerpt}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-1 border-t border-border/40">
                        <span className="text-[10px] text-muted-foreground font-mono font-bold uppercase tracking-wider">{news.readTime}</span>
                        <button 
                          onClick={() => setActiveNewsModal(news)} 
                          className="text-[10px] font-bold text-primary hover:text-primary-dark transition-colors flex items-center gap-1 font-heading pointer"
                        >
                          Read Release <ArrowRight size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT PANEL: INTERACTIVE CALENDAR & UPCOMING SCHEDULES (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-bold font-heading flex items-center gap-2 border-b pb-3">
                <CalendarIcon className="text-amber-500" size={20} /> Events Interactive Calendar
              </h2>

              {/* Calendar Workspace Grid Widget */}
              <div className="bg-card border border-border rounded-2xl p-4 shadow-sm space-y-4 select-none">
                
                {/* Header Month Navigate Block */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-black text-sm text-foreground tracking-tight font-sans">
                      {MONTH_NAMES[month]} {year}
                    </h3>
                    <p className="text-[9px] text-muted-foreground font-mono mt-0.5 uppercase tracking-wider">Select highlighted date for specific agendas</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={handlePrevMonth}
                      className="p-1 px-2 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted transition-colors text-xs pointer"
                      title="Previous Month"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button 
                      onClick={handleNextMonth}
                      className="p-1 px-2 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted transition-colors text-xs pointer"
                      title="Next Month"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

                {/* Days of week titles */}
                <div className="grid grid-cols-7 gap-1 text-center font-mono text-[9px] font-bold text-muted-foreground border-b pb-1">
                  {DAYS_OF_WEEK.map(d => (
                    <div key={d}>{d}</div>
                  ))}
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7 gap-1 text-xs">
                  {cells.map((cell, idx) => {
                    const cellEvents = EVENTS.filter(ev => ev.isoDate === cell.dateStr);
                    const isSelected = selectedDateStr === cell.dateStr;
                    const hasEvents = cellEvents.length > 0;
                    
                    return (
                      <button
                        key={`${cell.dateStr}-${idx}`}
                        onClick={() => setSelectedDateStr(isSelected ? null : cell.dateStr)}
                        className={`aspect-square relative rounded-lg flex flex-col items-center justify-center font-semibold transition-all pointer ${
                          !cell.isCurrentMonth ? 'text-muted-foreground/40 font-normal' : 'text-foreground hover:bg-muted/60'
                        } ${
                          isSelected 
                            ? 'bg-primary text-white shadow-sm scale-105 hover:bg-primary hover:text-white' 
                            : hasEvents 
                              ? 'bg-amber-500/10 border-2 border-amber-500/30 text-amber-600 font-extrabold' 
                              : ''
                        }`}
                      >
                        <span>{cell.day}</span>
                        {hasEvents && !isSelected && (
                          <span className="absolute bottom-1 h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Clear Selected Criteria */}
                {selectedDateStr && (
                  <div className="bg-primary/5 p-2 px-3 rounded-lg flex items-center justify-between text-[11px] text-primary font-bold">
                    <span>Filtering: {selectedDateStr} ({eventFilteredList.length} events found)</span>
                    <button 
                      onClick={() => setSelectedDateStr(null)} 
                      className="text-red-500 hover:text-red-700 font-sans pointer"
                    >
                      Clear Filter
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* List Events resulting from clicking */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs uppercase tracking-widest text-muted-foreground">
                  {selectedDateStr ? `Events for ${selectedDateStr}` : 'All Upcoming Schedules'}
                </h4>
              </div>

              {eventFilteredList.length === 0 ? (
                <div className="bg-card border border-border rounded-xl p-8 text-center text-xs text-muted-foreground italic">
                  No innovation schedules marked for this specific date string. Select another date slot.
                </div>
              ) : (
                <div className="space-y-4.5">
                  {eventFilteredList.map(ev => (
                    <div 
                      key={ev.id} 
                      className={`bg-card border border-border rounded-xl p-4.5 shadow-sm space-y-3 hover:border-amber-500/20 transition-all ${
                        ev.status === 'past' ? 'opacity-60 grayscale bg-muted/20' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <Badge className="bg-amber-500/10 text-amber-500 border-none font-sans text-[8px] px-1.5 py-0 uppercase">
                              {ev.category}
                            </Badge>
                            <Badge className={`border-none text-[8px] px-1.5 py-0 uppercase ${
                              ev.status === 'upcoming' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-300 text-slate-600'
                            }`}>
                              {ev.status}
                            </Badge>
                          </div>
                          <h4 className="font-bold text-sm text-foreground line-clamp-1">{ev.title}</h4>
                        </div>
                      </div>

                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {ev.desc}
                      </p>

                      <div className="grid grid-cols-2 gap-2 text-[10px] text-muted-foreground font-mono bg-muted/30 p-2 rounded-lg">
                        <div className="flex items-center gap-1">
                          <CalendarIcon size={12} className="text-primary shrink-0" />
                          <span className="truncate">{ev.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={12} className="text-primary shrink-0" />
                          <span className="truncate">{ev.time}</span>
                        </div>
                        <div className="col-span-2 flex items-center gap-1">
                          <MapPin size={12} className="text-primary shrink-0" />
                          <span className="truncate">{ev.venue}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-1 justify-end">
                        {ev.status === 'upcoming' && (
                          <Button 
                            onClick={() => handleRSVP(ev.id)}
                            size="sm" 
                            className="rounded-full h-8 text-[11px] font-extrabold uppercase bg-secondary hover:bg-secondary/90 text-white font-heading"
                            disabled={rsvpSuccessEventId === ev.id}
                          >
                            {rsvpSuccessEventId === ev.id ? (
                              <span className="flex items-center gap-1 text-emerald-300">
                                <CheckCircle size={10} /> Spot Reserved!
                              </span>
                            ) : (
                              'RSVP Free Entry'
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Call to Action: Facilitate with JJMS */}
      <Section variant="muted">
        <div className="bg-background p-10 rounded-2xl text-center border border-border shadow-sm max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold font-heading text-foreground">Host an Innovation and Enterprise Workshop</h2>
          <p className="text-muted-foreground text-xs md:text-sm max-w-2xl mx-auto leading-relaxed">
            Are you a local South African hub, educational facility, or municipality looking to host specialized technological workshops, rapid prototyping seminars, or seed fund hackathons? Partner with us.
          </p>
          <Button asChild className="rounded-full px-8 h-10 font-bold text-xs bg-primary text-white">
            <a href="/contact">Enquire About Facilitation Partnership</a>
          </Button>
        </div>
      </Section>

      {/* MODAL 1: News Detail Inspector */}
      {activeNewsModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="relative h-48 bg-muted shrink-0">
              <img 
                src={activeNewsModal.image} 
                alt={activeNewsModal.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button 
                onClick={() => setActiveNewsModal(null)}
                className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/80 rounded-full text-white transition-opacity inline-flex items-center justify-center pointer"
              >
                <X size={16} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <Badge className="bg-secondary/10 text-secondary border-none uppercase text-[9px]">
                  {activeNewsModal.category}
                </Badge>
                <div className="flex items-center gap-1 text-[11px] text-muted-foreground font-mono">
                  <span>{activeNewsModal.date}</span>
                  <span>•</span>
                  <span>{activeNewsModal.readTime}</span>
                </div>
              </div>

              <h3 className="font-heading font-black text-lg text-foreground leading-tight">
                {activeNewsModal.title}
              </h3>

              <div className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line space-y-2 font-mono">
                {activeNewsModal.body}
              </div>
            </div>

            <div className="p-4 border-t border-border bg-muted/10 flex justify-end">
              <Button onClick={() => setActiveNewsModal(null)} size="sm" className="rounded-full text-xs font-bold bg-primary text-white">
                Dismiss Release
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Newsletter subscription */}
      {showNotificationModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl max-w-sm w-full shadow-2xl p-6 relative space-y-4 text-center">
            <button 
              onClick={() => setShowNotificationModal(false)}
              className="absolute top-4 right-4 p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground inline-flex items-center justify-center pointer"
            >
              <X size={14} />
            </button>

            <div className="h-12 w-12 bg-primary/10 text-primary flex items-center justify-center rounded-full mx-auto">
              <Bell size={24} className="animate-bounce" />
            </div>

            <div className="space-y-1">
              <h3 className="font-heading font-bold text-base text-foreground">Subscribe to Corporate Press</h3>
              <p className="text-xs text-muted-foreground">
                Get notified of broadband updates, innovation grants, and interactive training workshops directly.
              </p>
            </div>

            {newsletterSuccess ? (
              <div className="p-4 bg-emerald-500/10 rounded-xl space-y-1 text-emerald-500 text-xs border border-emerald-500/20">
                <p className="font-extrabold flex items-center justify-center gap-1">
                  <CheckCircle size={14} /> Successful Sign-Up!
                </p>
                <p className="opacity-80">You will receive notifications on {newsletterEmail}.</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <Input 
                  type="email"
                  required
                  placeholder="name@company.co.za"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-transparent border-border text-xs text-center"
                />
                <Button type="submit" size="sm" className="w-full rounded-full bg-primary text-white font-bold text-xs h-9">
                  Enroll Me Free
                </Button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

