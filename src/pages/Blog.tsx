import React from 'react';
import Section, { SectionHeader } from '@/components/ui/Section';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowRight, Search, Hash } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';

const BLOG_POSTS = [
  {
    id: 1,
    title: 'How AI Can Help Small Businesses Save Time',
    category: 'AI for Business',
    excerpt: 'Discover practical ways to implement AI tools in your daily operations to automate mundane tasks and focus on growth.',
    author: 'Jerome V.',
    date: 'May 10, 2026',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'Why Every SME Needs a Professional Website',
    category: 'Digital Transformation',
    excerpt: 'In 2026, a website is more than just a digital business card—its your most powerful sales and credibility tool.',
    author: 'Tech Team',
    date: 'April 22, 2026',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=2069&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'From Idea to Prototype: How Rapid Prototyping Works',
    category: 'Rapid Prototyping',
    excerpt: 'Learn the step-by-step process of turning a physical product concept into a functional 3D printed prototype.',
    author: 'Maker Team',
    date: 'April 05, 2026',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 4,
    title: 'How Innovation Platforms Can Support Underserved Regions',
    category: 'Innovation',
    excerpt: 'Bridging the digital divide starts with providing the right infrastructure for local innovators to thrive.',
    author: 'Jerome V.',
    date: 'March 15, 2026',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 5,
    title: 'Digital Tools Every Business Owner Should Use',
    category: 'Digital Transformation',
    excerpt: 'Our curated list of essential software and platforms for managing small businesses efficiently.',
    author: 'Tech Team',
    date: 'Feb 28, 2026',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2026&auto=format&fit=crop'
  },
  {
    id: 6,
    title: 'Preparing Your Business for Funding Applications',
    category: 'Funding Readiness',
    excerpt: 'A comprehensive guide on documentation, financial reporting, and pitching for innovation grants.',
    author: 'Consulting Team',
    date: 'Feb 10, 2026',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop'
  }
];

const CATEGORIES = ['All', 'AI for Business', 'Digital Transformation', 'Innovation', 'Rapid Prototyping', 'SME Development', 'Funding Readiness'];

export default function Blog() {
  return (
    <>
      <section className="bg-muted/30 text-foreground py-24 relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_#0047AB_1px,_transparent_1px)] [background-size:20px_20px]"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 pt-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-heading tracking-tight text-foreground">Insights & Innovation Blog</h1>
            <p className="text-muted-foreground text-xl leading-relaxed">
              Thought leadership, practical guides, and industry trends to help you navigate the digital landscape.
            </p>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <aside className="lg:col-span-1 order-2 lg:order-1 space-y-8">
            <div>
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Search size={18} className="text-primary" /> Search
              </h4>
              <div className="relative">
                <Input placeholder="Search articles..." className="rounded-full pr-10" />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Hash size={18} className="text-primary" /> Categories
              </h4>
              <ul className="space-y-2">
                {CATEGORIES.map(cat => (
                  <li key={cat}>
                    <button className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                      <div className="w-1 h-1 bg-border rounded-full"></div> {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <Card className="bg-primary text-primary-foreground border-none shadow-xl overflow-hidden p-0 relative">
              <div className="absolute inset-0 bg-accent-blue/10 pointer-events-none"></div>
              <CardHeader className="p-6 pb-2">
                <h4 className="font-bold text-xl leading-tight">Join Our Newsletter</h4>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <p className="text-primary-foreground/80 text-sm mb-4">Get the latest innovation news delivered to your inbox.</p>
                <Input placeholder="your@email.com" className="bg-white/10 border-white/20 text-white placeholder:text-white/50 mb-3" />
                <Button className="w-full bg-white text-primary hover:bg-slate-100 font-bold uppercase tracking-widest text-[10px]">Subscribe</Button>
              </CardContent>
            </Card>
          </aside>

          {/* Blog Grid */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <div className="grid md:grid-cols-2 gap-8">
              {BLOG_POSTS.map((post) => (
                <Card key={post.id} className="flex flex-col h-full hover:shadow-xl transition-all border-border/50 group">
                  <Link to={`/blog/${post.id}`} className="block relative aspect-[16/9] overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/90 text-primary hover:bg-white">{post.category}</Badge>
                    </div>
                  </Link>
                  <CardHeader className="p-6 pb-2 flex-grow">
                     <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4 font-bold uppercase tracking-widest">
                       <span className="flex items-center gap-1"><Calendar size={14} className="text-primary" /> {post.date}</span>
                       <span className="flex items-center gap-1"><User size={14} className="text-primary" /> {post.author}</span>
                     </div>
                     <Link to={`/blog/${post.id}`}>
                       <h3 className="text-xl font-bold font-heading group-hover:text-primary transition-colors leading-tight mb-4">
                         {post.title}
                       </h3>
                     </Link>
                     <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                       {post.excerpt}
                     </p>
                  </CardHeader>
                  <CardFooter className="p-6 pt-0">
                    <Button asChild variant="link" className="p-0 h-auto text-primary font-bold text-xs uppercase tracking-widest">
                      <Link to={`/blog/${post.id}`} className="flex items-center gap-2">
                        Read Full Article <ArrowRight size={14} />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            {/* Pagination Placeholder */}
            <div className="mt-16 flex justify-center gap-2">
              <Button variant="outline" size="icon" disabled>1</Button>
              <Button variant="outline" size="icon">2</Button>
              <Button variant="outline" size="icon">3</Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
