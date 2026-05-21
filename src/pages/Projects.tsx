import React, { useState } from 'react';
import Section, { SectionHeader } from '@/components/ui/Section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const PROJECT_CATEGORIES = [
  'All', 'Digital Systems', 'Websites', 'Apps', 'Prototypes', 'Training', 'Innovation Programmes', 'Branding Projects'
];

const PROJECTS = [
  { 
    id: 1, 
    title: 'Innovation Management Platform', 
    category: 'Digital Systems', 
    status: 'Completed', 
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2026&auto=format&fit=crop',
    desc: 'Custom built CRM and dashboard for managing startup ecosystems.'
  },
  { 
    id: 2, 
    title: 'Maker Space Management System', 
    category: 'Apps', 
    status: 'In Progress', 
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=2070&auto=format&fit=crop',
    desc: 'Web portal for managing equipment bookings and memberships in a maker lab.'
  },
  { 
    id: 3, 
    title: 'SME Website Package', 
    category: 'Websites', 
    status: 'Completed', 
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=2069&auto=format&fit=crop',
    desc: 'High-performance template-based business websites for Upington entrepreneurs.'
  },
  { 
    id: 4, 
    title: 'AI Business Assistant', 
    category: 'Apps', 
    status: 'Completed', 
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop',
    desc: 'Gemini-integrated tool for SMEs to generate business proposals and reports.'
  },
  { 
    id: 5, 
    title: 'Mobile Innovation Lab Concept', 
    category: 'Innovation Programmes', 
    status: 'Concept', 
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop',
    desc: 'Design and logistics plan for a mobile tech laboratory for rural Northern Cape.'
  },
  { 
    id: 6, 
    title: 'Rapid Prototyping Demo', 
    category: 'Prototypes', 
    status: 'Completed', 
    image: 'https://images.unsplash.com/photo-1631533224226-9d32788e330a?q=80&w=2037&auto=format&fit=crop',
    desc: 'Showcase of 3D printed mechanical components for mining machinery.'
  },
  { 
    id: 7, 
    title: 'Business Dashboard System', 
    category: 'Digital Systems', 
    status: 'Completed', 
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    desc: 'Real-time performance tracking for local municipal departments.'
  },
  { 
    id: 8, 
    title: 'Training Academy Platform', 
    category: 'Training', 
    status: 'In Progress', 
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=2074&auto=format&fit=crop',
    desc: 'LMS portal for learners to access digital skills and AI courses.'
  }
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeCategory);

  return (
    <>
      <section className="py-24 bg-muted/30 text-foreground overflow-hidden relative border-b border-border">
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="container mx-auto px-4 relative z-10 text-center pt-10">
          <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 tracking-tight text-foreground">Project Gallery</h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto italic">
            Showcasing the journey from concept to implementation across digital and physical domains.
          </p>
        </div>
      </section>

      <Section>
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {PROJECT_CATEGORIES.map(cat => (
            <Button
              key={cat}
              variant={activeCategory === cat ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-6 text-xs font-bold uppercase tracking-widest ${activeCategory === cat ? 'bg-primary border-primary' : 'hover:border-primary/50'}`}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-border/50 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge variant="secondary" className="bg-white/90 text-primary hover:bg-white">{project.category}</Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className={
                      project.status === 'Completed' ? 'bg-green-500 hover:bg-green-600' : 
                      project.status === 'In Progress' ? 'bg-amber-500 hover:bg-amber-600' : 
                      'bg-slate-500 hover:bg-slate-600'
                    }>
                      {project.status}
                    </Badge>
                  </div>
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                     <Button asChild size="sm" className="rounded-full bg-white text-primary hover:bg-slate-100 font-bold">
                        <a href={`/projects/${project.id}`}>View Details <ExternalLink size={14} className="ml-2" /></a>
                     </Button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 font-heading tracking-tight group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">{project.desc}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProjects.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-muted-foreground text-lg">No projects found in this category yet.</p>
          </div>
        )}
      </Section>

      {/* Stats Counter */}
      <section className="bg-muted py-20 border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { val: '50+', label: 'Projects Completed' },
              { val: '12', label: 'Innovation Labs' },
              { val: '200+', label: 'SMEs Supported' },
              { val: '1k+', label: 'Learners Trained' }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-5xl font-black text-primary mb-2 font-heading">{stat.val}</div>
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
