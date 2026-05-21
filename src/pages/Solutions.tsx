import React from 'react';
import Section, { SectionHeader } from '@/components/ui/Section';
import { motion } from 'motion/react';
import { 
  Network, 
  Bot, 
  Truck, 
  Factory, 
  GraduationCap, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Solutions() {
  const products = [
    {
      id: 'nexus-os',
      icon: Network,
      color: 'bg-primary',
      title: 'NexusOS',
      subtitle: 'Innovation Management Platform',
      desc: 'An end-to-end ecosystem platform for hubs, universities, municipalities, and innovation programmes to track and manage their impact.',
      features: [
        'Innovator onboarding & CRM', 'Project & KPI tracking', 'Mentorship management', 
        'Stakeholder mapping', 'Innovation challenge management', 'Funding pipeline tracking'
      ]
    },
    {
      id: 'nexus-ai',
      icon: Bot,
      color: 'bg-accent-blue',
      title: 'Nexus AI',
      subtitle: 'Intelligent Business Assistant',
      desc: 'AI-powered business and innovation assistant designed specifically for African SMEs and startups to navigate current market complexities.',
      features: [
        'AI Proposal support tools', 'Innovation guidance', 'Funding readiness assessments', 
        'AI reporting & business support', 'Digital literacy guidance', 'SME automation tools'
      ]
    },
    {
      id: 'mobile-lab',
      icon: Truck,
      color: 'bg-slate-900',
      title: 'Nexus Mobile Lab',
      subtitle: 'Decentralized Prototyping Unit',
      desc: 'A mobile innovation and rapid prototyping laboratory that travels to underserved communities to provide technology awareness and skills.',
      features: [
        'Technology awareness sessions', 'Digital skills training', '3D printing demos', 
        'AI awareness workshops', 'Community innovation challenges', 'Youth innovation activation'
      ]
    },
    {
      id: 'proto-lab',
      icon: Factory,
      color: 'bg-primary',
      title: 'Nexus Prototyping Lab',
      subtitle: 'Fixed Maker Infrastructure',
      desc: 'A permanent innovation and maker facility equipped with high-end tools for physical product development and manufacturing support.',
      features: [
        'High-precision 3D printing', 'Advanced CAD design station', 'Large-scale laser cutting', 
        'Vinyl & material cutting', 'Product assembly support', 'Maker space management systems'
      ]
    },
    {
      id: 'academy',
      icon: GraduationCap,
      color: 'bg-accent-blue',
      title: 'Nexus Academy',
      subtitle: 'Future Skills Platform',
      desc: 'Training and future skills development platform offering modern courses that bridge the gap between education and industrial demand.',
      features: [
        'Online & physical training modes', 'Course registration & LMS', 'Digital certification', 
        'Learner progress tracking', 'AI & digital strategy courses', 'Innovation & design thinking'
      ]
    }
  ];

  return (
    <>
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">JJMS Ecosystem Products</span>
            <h1 className="text-4xl md:text-6xl font-bold font-heading mb-8">Integrated Innovation Solutions</h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              Our Nexus suite of products is designed to provide the infrastructure, intelligence, and accessibility needed for sustainable digital transformation.
            </p>
          </div>
        </div>
      </section>

      {products.map((product, i) => (
        <Section key={product.id} className={i % 2 === 1 ? 'bg-muted/10' : ''}>
          <div className={`grid md:grid-cols-2 gap-16 items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
            <div className={i % 2 === 1 ? 'md:order-2' : ''}>
              <div className={`w-16 h-16 ${product.color} text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg`}>
                <product.icon size={36} />
              </div>
              <h2 className="text-4xl font-bold mb-2 font-heading">{product.title}</h2>
              <h3 className="text-lg font-semibold text-primary mb-6">{product.subtitle}</h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {product.desc}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {product.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                    <span className="text-sm font-medium leading-tight">{feature}</span>
                  </div>
                ))}
              </div>
              <Button asChild size="lg" className="rounded-full px-8">
                <a href="#contact">Inquire About {product.title}</a>
              </Button>
            </div>
            
            <div className={`${i % 2 === 1 ? 'md:order-1' : ''}`}>
              <div className="relative">
                <div className="bg-slate-200 aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl relative z-10 group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground italic flex-col gap-3">
                    <product.icon size={64} opacity={0.1} />
                    <span className="text-xs uppercase tracking-widest font-bold opacity-30">Solution Visualization Placeholder</span>
                  </div>
                </div>
                <div className={`absolute -inset-4 ${product.color} opacity-5 blur-2xl -z-10 rounded-full`}></div>
              </div>
            </div>
          </div>
        </Section>
      ))}

      {/* Global Impact Branding */}
      <Section variant="dark">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 font-heading text-foreground">Scaling Innovation Locally</h2>
          <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
            Our solutions are modular and adaptable, designed to fit the specific constraints and opportunities of local municipalities and private ecosystems alike.
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-40 grayscale">
            {['HUB-OS', 'SMART-MUNI', 'AGRI-TECH', 'SKILLS-X'].map((logo, i) => (
              <span key={i} className="text-2xl font-black italic tracking-tighter">{logo}</span>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
