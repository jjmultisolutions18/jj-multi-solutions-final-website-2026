import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Lightbulb, 
  Cpu, 
  Settings, 
  Users, 
  TrendingUp, 
  ShieldCheck,
  Zap,
  Globe,
  Code
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Section, { SectionHeader } from '@/components/ui/Section';

import SEO from '@/components/layout/SEO';
import { cn } from '@/lib/utils';

export default function Home() {
  return (
    <>
      <SEO 
        title="Building Digital & Innovation Solutions"
        description="JJ Multi Solutions helps businesses, innovators, and communities move from ideas to implementation through digital systems, AI, and rapid prototyping."
      />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Animated Cinematic Background Tech Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
            alt="JJ Multi Solutions Innovation Hero"
            className="w-full h-full object-cover origin-center"
            initial={{ scale: 1.12, x: -10, y: -5 }}
            animate={{ 
              scale: [1.12, 1.01, 1.10, 1.12],
              x: [-10, 10, -5, -10],
              y: [-5, 5, 10, -5],
              rotate: [0, 1, -1, 0]
            }}
            transition={{ 
              duration: 32, 
              ease: "linear", 
              repeat: Infinity,
            }}
          />
          <div className="absolute inset-0 bg-white/75 backdrop-blur-[1px]"></div>
          
          {/* Animated Glows */}
          <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-secondary/15 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/20 text-primary border border-primary/20 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] mb-8">
              <Zap size={14} className="text-secondary" /> Innovate • Integrate • Elevate
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading leading-tight mb-4 text-slate-900">
              WELCOME TO <span className="text-primary">JJ MULTI SOLUTIONS</span>
            </h1>
            
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold font-heading text-secondary mb-8 text-balance">
              Your Partner in Technology, Connectivity and Innovation
            </h2>

            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Practical digital solutions that power smarter, more efficient businesses.
            </p>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 text-sm font-bold uppercase tracking-widest text-primary mb-12">
              <Link to="/services" className="transition-colors hover:text-secondary">Technology</Link>
              <span className="text-slate-600">|</span>
              <Link to="/services#ict" className="transition-colors hover:text-secondary">Connectivity</Link>
              <span className="text-slate-600">|</span>
              <Link to="/services#systems" className="transition-colors hover:text-secondary">Software</Link>
              <span className="text-slate-600">|</span>
              <Link to="/services#ai-infra" className="transition-colors hover:text-secondary">AI & Automation</Link>
              <span className="text-slate-600">|</span>
              <Link to="/services#innovation" className="transition-colors hover:text-secondary">Innovation</Link>
              <span className="text-slate-600">|</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button asChild size="lg" className="rounded-full px-12 text-lg h-16 bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20">
                <Link to="/request-quote">Request a Quote <ArrowRight className="ml-2" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-12 text-lg h-16 border-slate-200 text-slate-900 hover:bg-slate-50 backdrop-blur-sm">
                <Link to="/services">Explore Services</Link>
              </Button>
            </div>
            
            <div className="mt-20 grid grid-cols-3 gap-4 md:gap-12 max-w-2xl mx-auto grayscale opacity-40 border-t border-slate-200 pt-8">
              <div className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-slate-500">Upington</div>
              <div className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-slate-500">SA-Innovate</div>
              <div className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-slate-500">Future-Ready</div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-400"
        >
          <div className="w-6 h-10 border-2 border-slate-200 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-secondary rounded-full"></div>
          </div>
        </motion.div>
      </section>

      {/* Intro Section */}
      <Section variant="muted">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Who We Are</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-heading">Empowering Local Innovation through Global Technology Standards.</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              JJ Multi Solutions (Pty) Ltd is an innovation infrastructure, digital transformation, AI, rapid prototyping, and technology development company based in Upington, Northern Cape.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              We bridge the gap between abstract ideas and practical implementation, specifically focusing on underserved communities, SMEs, and innovation ecosystems across Africa.
            </p>
            <Button asChild variant="link" className="p-0 h-auto text-primary font-bold text-md">
              <Link to="/about" className="flex items-center gap-2">Learn more about our story <ArrowRight size={18} /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-background p-8 rounded-2xl shadow-sm border border-border/50 text-center">
              <div className="text-4xl font-bold text-primary mb-2">SME</div>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Support Focused</p>
            </div>
            <div className="bg-primary text-primary-foreground p-8 rounded-2xl shadow-lg border border-primary/20 text-center translate-y-8">
              <div className="text-4xl font-bold mb-2">AI</div>
              <p className="text-sm font-medium uppercase tracking-wider opacity-80">Integration</p>
            </div>
            <div className="bg-secondary text-secondary-foreground p-8 rounded-2xl shadow-lg border border-secondary/20 text-center">
              <div className="text-4xl font-bold mb-2">Lab</div>
              <p className="text-sm font-medium uppercase tracking-wider opacity-80">Maker Spaces</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Main Services Overview */}
      <Section>
        <SectionHeader 
          centered
          title="Our Core Expertise"
          subtitle="Comprehensive solutions designed to accelerate growth and digital maturity for your organization."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Globe, title: 'ICT & Infrastructure', text: 'MTN & Telkom LTE/5G data, network setup, office connectivity, and IT support.' },
            { icon: Code, title: 'Digital Systems', text: 'Custom web apps, process automation, business dashboards, and digital transformation.' },
            { icon: Settings, title: 'Rapid Prototyping', text: '3D printing, CAD design, 3D scanning, and product development services.' },
            { icon: Lightbulb, title: 'Innovation Ecosystem', text: 'Hackathons, ideation workshops, and managing innovation lab infrastructure.' },
          ].map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full hover:border-primary/50 transition-all group overflow-hidden">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                    <service.icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {service.text}
                  </p>
                  <Link to="/services" className="text-xs font-bold text-primary uppercase tracking-widest hover:underline">
                    Read More
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button asChild variant="outline" className="rounded-full px-10">
            <Link to="/services">View All Services</Link>
          </Button>
        </div>
      </Section>

      {/* Why Choose Us */}
      <Section variant="dark">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
              alt="Collaboration" 
              className="rounded-2xl shadow-2xl opacity-80"
            />
          </div>
          <div className="order-1 lg:order-2">
            <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-4 block">The JJMS Advantage</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 font-heading text-foreground tracking-tight">Why Partner With Us?</h2>
            
            <div className="space-y-8">
              {[
                { icon: ShieldCheck, title: 'Practical Impact', text: 'We don\'t just theorize; we build tangible solutions that solve real business problems.' },
                { icon: Users, title: 'Inclusion Focused', text: 'Specific focus on underserved regions, ensuring no community is left behind in the digital age.' },
                { icon: TrendingUp, title: 'Future-Readiness', text: 'We prepare you for the AI-driven economy with cutting-edge tools and future skills.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center text-secondary shrink-0">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-foreground mb-1">{item.title}</h4>
                    <p className="text-muted-foreground text-sm">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <Button asChild className="mt-12 rounded-full px-10">
              <Link to="/contact">Partner With Us</Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* Featured Projects/Products Preview */}
      <Section>
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Portfolio</span>
            <h2 className="text-3xl md:text-4xl font-bold font-heading">Featured Innovations</h2>
          </div>
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/projects">View All Projects</Link>
          </Button>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { 
              image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2026&auto=format&fit=crop',
              title: 'NexusOS Platform',
              category: 'Digital Systems',
              desc: 'Innovation management and ecosystem platform for hubs and incubators.'
            },
            { 
              image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
              title: 'Nexus AI Assistant',
              category: 'AI Solutions',
              desc: 'AI-powered business and innovation guidance assistant for SMEs.'
            },
            { 
              image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=2070&auto=format&fit=crop',
              title: 'Mobile Innovation Lab',
              category: 'Rapid Prototyping',
              desc: 'Decentralized prototyping facilities for rural and underserved areas.'
            }
          ].map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl mb-4">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-white/90 text-primary hover:bg-white">{project.category}</Badge>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
              <p className="text-muted-foreground text-sm line-clamp-2">{project.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <section className="bg-primary py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] [background-size:40px_40px]"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 font-heading">Ready to Digitalize your Innovation?</h2>
          <p className="text-primary-foreground/80 text-xl mb-12 max-w-2xl mx-auto">
            Let's work together to turn your ideas into functional digital platforms or physical prototypes.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-slate-50 rounded-full px-12 h-14 text-lg font-bold">
              <Link to="/request-quote">Request a Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 rounded-full px-12 h-14 text-lg font-bold">
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
