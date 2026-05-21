import React from 'react';
import Section, { SectionHeader } from '@/components/ui/Section';
import { Button } from '@/components/ui/button';
import { Handshake, GraduationCap, Code, Palette, Briefcase, Globe, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function Careers() {
  const opportunities = [
    { icon: Handshake, title: 'Strategic Partners', desc: 'Organizations and hubs looking to collaborate on innovation infrastructure projects.' },
    { icon: GraduationCap, title: 'Trainers & Mentors', desc: 'Experts in AI, digital literacy, and business strategy to join our Academy.' },
    { icon: Code, title: 'Developers', desc: 'Freelance or full-time tech enthusiasts skilled in React, Firebase, and AI integrations.' },
    { icon: Palette, title: 'Designers', desc: 'Creative minds specializing in UI/UX and brand identity for SMEs.' },
    { icon: Briefcase, title: 'Business Experts', desc: 'Professional proposal writers and funding readiness consultants.' },
    { icon: Globe, title: 'Industry Experts', desc: 'Specialized consultants in agriculture, mining, and municipal services.' },
  ];

  return (
    <>
      <section className="bg-primary text-primary-foreground py-24 relative">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 tracking-tight">Partner With Us</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto opacity-90 italic">
            Join the JJ Multi Solutions ecosystem and help us scale innovation across underserved communities.
          </p>
        </div>
      </section>

      <Section>
        <SectionHeader 
          centered
          title="Opportunities to Collaborate"
          subtitle="We believe in the power of collective impact. Whether you're an industry expert, a developer, or a strategic partner, there's a space for you in our mission."
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {opportunities.map((op, i) => (
            <div key={i} className="p-8 rounded-2xl bg-muted/30 border border-muted-foreground/10 hover:border-primary/50 transition-all hover:bg-background group">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <op.icon size={24} />
              </div>
              <h4 className="text-xl font-bold mb-4 font-heading">{op.title}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">{op.desc}</p>
              <Badge variant="outline" className="text-primary border-primary/20">Open for interest</Badge>
            </div>
          ))}
        </div>
      </Section>

      <Section variant="muted">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 font-heading">Submit Your Interest</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We are constantly expanding our network of specialists and implementation partners. If you share our vision of practical innovation and digital empowerment, we'd love to hear from you.
            </p>
            <ul className="space-y-4 mb-8">
              {['Project Coordination', 'Technology Development', 'Skills Facilitation', 'Strategic Alliances'].map((l, i) => (
                <li key={i} className="flex items-center gap-3 font-semibold text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full"></div> {l}
                </li>
              ))}
            </ul>
            <Button asChild className="rounded-full px-10 h-12 font-bold uppercase tracking-widest text-[10px]">
              <a href="mailto:jerome.vut@gmail.com">Email Your Portfolio <ArrowRight size={14} className="ml-2" /></a>
            </Button>
          </div>
          <div className="bg-slate-900 aspect-video rounded-3xl overflow-hidden relative border border-slate-800 shadow-2xl">
            <div className="absolute inset-0 opacity-50 bg-[url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
            <div className="relative z-10 w-full h-full flex items-center justify-center bg-slate-950/40 backdrop-blur-sm p-12 text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white font-heading">"Together, we build the digital infrastructure of our future."</h3>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
