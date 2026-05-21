import React from 'react';
import Section, { SectionHeader } from '@/components/ui/Section';
import { COMPANY_DETAILS } from '@/constants';
import { Target, Eye, Heart, Shield, Users, Lightbulb, Zap, Globe } from 'lucide-react';
import { motion } from 'motion/react';

export default function About() {
  const values = [
    { icon: Lightbulb, title: 'Innovation', desc: 'Pushing boundaries and exploring new horizons in technology.' },
    { icon: Shield, title: 'Integrity', desc: 'Maintaining the highest ethical standards in all our interactions.' },
    { icon: Target, title: 'Practical Impact', desc: 'Focusing on results that make a tangible difference.' },
    { icon: Users, title: 'Collaboration', desc: 'Working together with partners and communities to achieve common goals.' },
    { icon: Zap, title: 'Excellence', desc: 'Striving for pre-eminence in everything we build and deliver.' },
    { icon: Globe, title: 'Inclusion', desc: 'Ensuring digital opportunities reach underserved regions and people.' },
    { icon: Eye, title: 'Future-readiness', desc: 'Preparing our clients for the evolving digital and AI economy.' },
  ];

  return (
    <>
      {/* Page Header */}
      <section className="bg-muted/30 text-foreground py-24 relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 opacity-5 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="container mx-auto px-4 relative z-10 text-center pt-10">
          <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 text-foreground tracking-tighter">Our Story & Purpose</h1>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
            Pioneering digital transformation and innovation infrastructure from Upington to the rest of Africa.
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <Section>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 font-heading">Empowering Through Implementation</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
              <p>
                JJ Multi Solutions (Pty) Ltd was founded with a singular mission: to bridge the vast gap between innovation and implementation. Based in Upington, Northern Cape, we understand the unique challenges faced by organizations in underserved regions.
              </p>
              <p>
                We specialize in building the infrastructure needed for innovation to thrive. This includes everything from custom digital platforms and AI-enabled systems to physical maker spaces and rapid prototyping labs.
              </p>
              <p>
                Our approach is rooted in the belief that technology should be a tool for empowerment, not a barrier. By providing SMEs, innovators, and local governments with world-class tech solutions, we foster economic growth and future-readiness.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" 
                alt="Our Team" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-primary p-8 rounded-2xl shadow-xl text-primary-foreground hidden md:block">
              <div className="text-4xl font-bold mb-1 tracking-tighter">EST. 2026</div>
              <p className="text-xs uppercase tracking-widest font-bold opacity-80">Rooted in Innovation</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Vision & Mission */}
      <Section variant="muted">
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-background p-12 rounded-3xl shadow-sm border border-border"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8">
              <Eye size={36} />
            </div>
            <h3 className="text-2xl font-bold mb-6 font-heading">Our Vision</h3>
            <p className="text-xl text-muted-foreground leading-relaxed italic">
              “To become a leading African innovation infrastructure and digital transformation partner for underserved communities, SMEs, innovators and future industries.”
            </p>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-background p-12 rounded-3xl shadow-sm border border-border"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8">
              <Target size={36} />
            </div>
            <h3 className="text-2xl font-bold mb-6 font-heading">Our Mission</h3>
            <p className="text-xl text-muted-foreground leading-relaxed">
              “To empower businesses, innovators, institutions and communities through integrated digital systems, AI-enabled solutions, rapid prototyping, training and innovation ecosystem support.”
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Core Values */}
      <Section>
        <SectionHeader 
          centered
          title="Our Core Values"
          subtitle="The principles that guide every decision and implementation we undertake."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v, i) => (
            <div key={i} className="group">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-muted-foreground mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                <v.icon size={24} />
              </div>
              <h4 className="text-lg font-bold mb-3">{v.title}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Strategic Focus */}
      <Section variant="dark">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-accent-blue font-bold uppercase tracking-widest text-sm mb-6 block">Our Approach</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-8 font-heading text-foreground tracking-tight">Focusing on Underserved Regions</h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-12">
            History has shown that innovation is often centralized in major hubs. JJ Multi Solutions is changing that narrative by bringing world-class infrastructure to Upington and the broader Northern Cape. We believe that talent is distributed equally, but opportunity is not—and we are here to provide that opportunity.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-6 rounded-2xl bg-white border border-border shadow-sm">
              <div className="text-3xl font-bold text-primary mb-1">Hubs</div>
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Ecosystem Support</p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-border shadow-sm">
              <div className="text-3xl font-bold text-primary mb-1">Local</div>
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Government Solutions</p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-border shadow-sm">
              <div className="text-3xl font-bold text-primary mb-1">SME</div>
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Digital Growth</p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-border shadow-sm">
              <div className="text-3xl font-bold text-primary mb-1">Youth</div>
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Skills Training</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Leadership Preview */}
      <Section>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-muted">
              {/* Placeholder for Founder Image */}
              <div className="w-full h-full flex items-center justify-center text-muted-foreground flex-col gap-2">
                <Users size={64} opacity={0.2} />
                <span className="text-xs font-bold uppercase tracking-widest opacity-40">Founder Portrait</span>
              </div>
            </div>
          </div>
          <div>
            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Leadership</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-heading">Driven by Visionary Implementation</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Our leadership team combines deep technical expertise with a passion for socio-economic development. Led by individuals who understand the intersection of technology, business, and community.
            </p>
            <div className="bg-muted/50 p-6 rounded-xl border border-border/50">
              <h4 className="font-bold text-xl mb-1">Jerome [Surname]</h4>
              <p className="text-primary font-semibold text-sm mb-4">Founder & Lead Strategist</p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Focused on digital transformation and innovation ecosystems for the African continent. Dedicated to building sustainable technology infrastructures in underserved communities.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
