import React from 'react';
import Section, { SectionHeader } from '@/components/ui/Section';
import { 
  Lightbulb, 
  Settings, 
  Network, 
  Server, 
  Code, 
  Layout, 
  Palette, 
  Printer, 
  GraduationCap, 
  Zap,
  Package,
  ArrowRight,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function Services() {
  const serviceCategories = [
    {
      id: 'innovation',
      icon: Lightbulb,
      title: 'Innovation & Ecosystem Development',
      description: 'Designing and fostering innovation environments for sustainable growth.',
      image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=600&auto=format&fit=crop',
      items: [
        'Innovation programme design', 'Innovation challenges & Hackathons', 'Ideation workshops', 
        'Design Thinking facilitation', 'Innovation pipeline support', 'Commercialisation readiness', 
        'Stakeholder engagement', 'Innovation assessments', 'Mentorship programmes', 
        'Funding proposal support', 'Monitoring & Evaluation'
      ]
    },
    {
      id: 'prototyping',
      icon: Settings,
      title: 'Rapid Prototyping & Maker Technologies',
      description: 'Bringing physical product ideas to life through advanced fabrication.',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop',
      items: [
        'Product design', 'Rapid prototyping', '3D printing & 3D scanning', 
        'Reverse engineering', 'CAD design', 'Concept visualisation', 
        'Proof-of-concept development', 'Small-batch prototype production', 'Fabrication advisory'
      ]
    },
    {
      id: 'ict',
      icon: Network,
      title: 'ICT & Digital Infrastructure',
      description: 'Robust connectivity and IT foundations for modern enterprises.',
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=600&auto=format&fit=crop',
      items: [
        'MTN Mobile Data & Fixed LTE/5G', 'Telkom LTE', 'Vodacom Fixed LTE', 
        'Network setup', 'Office connectivity', 'IT support', 'Infrastructure consulting'
      ]
    },
    {
      id: 'hosting',
      icon: Server,
      title: 'Hosting & Domain Services',
      description: 'Secure and reliable digital homes for your web properties.',
      image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=600&auto=format&fit=crop',
      items: [
        'Domain registration & transfers', 'Website hosting', 'WordPress hosting', 
        'Business email hosting', 'Email setup & technical support', 'Hosting management'
      ]
    },
    {
      id: 'systems',
      icon: Code,
      title: 'Digital Systems & App Development',
      description: 'Automating processes with custom software and data solutions.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop',
      items: [
        'Business process automation', 'Custom web & mobile apps', 'Performance dashboards', 
        'Innovation lab management apps', 'Data tracking & reporting systems', 'Digital transformation support'
      ]
    },
    {
      id: 'web',
      icon: Layout,
      title: 'Website Design & Development',
      description: 'Crafting professional, high-impact web experiences.',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=600&auto=format&fit=crop',
      items: [
        'Business websites', 'WordPress & Wix websites', 'AI-assisted website builds', 
        'Website redesign & maintenance', 'Monthly support plans'
      ]
    },
    {
      id: 'branding',
      icon: Palette,
      title: 'Branding, Marketing & Design',
      description: 'Visual storytelling that resonates with your target audience.',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=600&auto=format&fit=crop',
      items: [
        'Poster design', 'Business branding kits', 'Social media content creation', 
        'Marketing campaigns', 'Promotional & Explainer videos', 'Event branding'
      ]
    },
    {
      id: 'printing',
      icon: Printer,
      title: 'Printing & Branding Production',
      description: 'Large-scale physical branding and production management.',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop',
      items: [
        'Gazebos & Banners (Pull-up, X-banners)', 'Branded tablecloths', 
        'Vehicle branding & Decals', 'Corporate branding materials', 
        'Supplier sourcing & Quality control', 'Client delivery management'
      ]
    },
    {
      id: 'training',
      icon: GraduationCap,
      title: 'Training & Skills Development',
      description: 'Upgrading team capabilities in digital and innovative tools.',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=600&auto=format&fit=crop',
      items: [
        'Canva & AI tools training (ChatGPT, etc.)', 'Website development basics', 
        'Innovation & Entrepreneurship training', 'Design Thinking workshops', 
        'IP awareness training', 'CAD & 3D printing training', 'Maker skills training'
      ]
    },
    {
      id: 'ai-infra',
      icon: Zap,
      title: 'AI & Smart Innovation Infrastructure',
      description: 'Cutting-edge platforms for managing innovation at scale.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=600&auto=format&fit=crop',
      items: [
        'Innovation lab platforms', 'Innovator onboarding systems', 'KPI & Budget tracking', 
        'Programme management tools', 'Mobile innovation lab concepts', 
        'Rural innovation outreach', 'AI-driven innovation solutions'
      ]
    }
  ];

  const softwareProducts = [
    'Microsoft 365', 'Windows 10/11 Licenses', 'Adobe Acrobat Pro DC', 
    'Antivirus Solutions', 'Fusion 360', 'AutoCAD', 'CAD Software Solutions'
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Page Header */}
      <section className="bg-muted/30 text-foreground py-24 relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 z-0 overflow-hidden opacity-50">
          <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-secondary/5 rounded-full blur-[120px]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 pt-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
              Our Capabilities
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 tracking-tight text-foreground">
              Integrated <span className="text-primary italic">Solutions</span> for Your Success.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10">
              Building Solutions. Empowering Futures. From digital infrastructure to physical prototyping, we provide the tools to innovate.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full px-8 bg-primary hover:bg-primary/90">
                <Link to="/request-quote">Request a Quote</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8 bg-transparent border-white/20 text-white hover:bg-white/10">
                <Link to="/contact">Book a Consultation</Link>
              </Button>
            </div>
            
            <div className="mt-12 flex items-center gap-8 text-[10px] font-bold uppercase tracking-widest text-slate-500">
              <span className="flex items-center gap-2 italic">Innovate</span>
              <span className="w-1 h-1 bg-slate-800 rounded-full"></span>
              <span className="flex items-center gap-2 italic">Integrate</span>
              <span className="w-1 h-1 bg-slate-800 rounded-full"></span>
              <span className="flex items-center gap-2 italic">Elevate</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Services Grid */}
      <Section>
        <SectionHeader 
          title="Our Comprehensive Services"
          subtitle="Specialised divisions bringing together design, technology, and manufacturing excellence."
          centered
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {serviceCategories.map((cat) => (
            <Card id={cat.id} key={cat.id} className="group relative bg-card border-border hover:border-primary/50 transition-all duration-300 overflow-hidden scroll-mt-32 flex flex-col justify-between">
              <div>
                <div className="aspect-[16/10] overflow-hidden relative bg-muted">
                  <img 
                    src={cat.image} 
                    alt={cat.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent"></div>
                </div>

                <CardHeader className="pb-4 relative pt-10">
                  <div className="absolute -top-7 right-6 w-14 h-14 bg-secondary text-white shadow-lg rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform z-10">
                    <cat.icon size={26} />
                  </div>
                  <CardTitle className="text-2xl font-bold font-heading pr-12">{cat.title}</CardTitle>
                  <CardDescription className="text-muted-foreground mt-2 leading-relaxed">
                    {cat.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="relative pb-6">
                  <Accordion type="single" collapsible className="w-full border-none">
                    <AccordionItem value="items" className="border-none">
                      <AccordionTrigger className="py-2 text-primary font-bold text-sm tracking-widest uppercase hover:no-underline hover:text-secondary flex justify-start gap-2">
                         Explore Services
                      </AccordionTrigger>
                      <AccordionContent className="pt-4">
                        <ul className="grid grid-cols-1 gap-3">
                          {cat.items.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-sm text-foreground/80 leading-snug">
                              <Plus size={14} className="text-secondary shrink-0 mt-0.5" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </div>
              
              <CardFooter className="relative border-t border-border/50 bg-muted/20">
                <Button asChild variant="ghost" className="w-full justify-between hover:bg-transparent group/btn p-0">
                  <Link to="/contact" className="flex items-center justify-between w-full text-foreground/70 hover:text-primary font-bold">
                    Learn More <ArrowRight className="group-hover/btn:translate-x-1 transition-transform" size={16} />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Section>

      {/* Software Section */}
      <Section variant="muted">
        <div className="max-w-5xl mx-auto bg-card rounded-3xl border border-border p-8 md:p-12 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-32 translate-x-32"></div>
          
          <div className="grid md:grid-cols-3 gap-12 relative z-10 items-center">
            <div className="md:col-span-1">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8">
                <Package size={32} />
              </div>
              <h2 className="text-3xl font-bold font-heading mb-4">Software & Licencing</h2>
              <p className="text-muted-foreground leading-relaxed">
                Global leading enterprise software solutions with full setup, activation, and technical support for your business.
              </p>
              <div className="mt-8">
                <Button asChild size="lg" className="rounded-full px-8">
                  <Link to="/request-quote">Get Licencing Quote</Link>
                </Button>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                {softwareProducts.map((product, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-background border border-border/50 rounded-xl hover:border-primary/30 transition-colors">
                    <div className="w-2 h-2 bg-secondary rounded-full shadow-[0_0_8px_rgba(246,139,30,0.5)]"></div>
                    <span className="font-semibold text-sm">{product}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Final CTA */}
      <Section className="relative overflow-hidden py-32">
        <div className="absolute inset-0 bg-primary opacity-5"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-8">Ready to <span className="text-primary italic underline underline-offset-8">Scale</span> Your Project?</h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Whether you need a full digital transformation or a single rapid prototype, our multi-disciplinary team is ready to assist.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button asChild size="lg" className="rounded-full px-12 h-16 text-lg font-bold shadow-lg shadow-primary/20">
              <Link to="/request-quote">Request a Quote</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-12 h-16 text-lg font-bold border-primary text-primary hover:bg-primary/5">
              <Link to="/contact">Discuss Your Project</Link>
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
}
