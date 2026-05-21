import * as React from 'react';
import { useParams, Link } from 'react-router-dom';
import Section from '@/components/ui/Section';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User, Facebook, Linkedin, Twitter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardFooter } from '@/components/ui/card';

export default function BlogDetail() {
  const { id } = useParams();
  
  // This would ideally fetch from Firebase. For now, we mock.
  const post = React.useMemo(() => ({
    title: 'How AI Can Help Small Businesses Save Time',
    category: 'AI for Business',
    author: 'Jerome V.',
    date: 'May 10, 2026',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop',
    content: `
      <p class="mb-4">The rise of artificial intelligence has moved from large corporations to the palm of every business owner's hand. In 2026, AI is no longer a luxury—it is a critical necessity for maintaining efficiency in a rapidly evolving market.</p>
      <h2 class="text-2xl font-bold font-heading mb-4 mt-8">The SME AI Advantage</h2>
      <p class="mb-4">For small and medium enterprises (SMEs) in South Africa, time is often the most scarce resource. AI business assistants can handle mundane administrative tasks such as email management, scheduling, and invoice generation, freeing up the business owner to focus on strategic growth and relationship building.</p>
      <blockquote class="border-l-4 border-primary bg-muted/30 p-6 rounded-r-xl italic my-8">"AI doesn't replace humanity; it amplifies human productivity by removing logical friction."</blockquote>
      <h2 class="text-2xl font-bold font-heading mb-4 mt-8">Practical Implementation</h2>
      <p class="mb-4">Implementing AI doesn't have to be expensive or overly technical. Tools like Google Gemini can assist in proposal writing, market research, and content creation for social media. At JJ Multi Solutions, we help SMEs bridge this gap by providing tailored AI training and implementation services.</p>
      <ul class="list-disc pl-6 space-y-2 mb-8">
        <li>Automate data entry and report generation.</li>
        <li>Use AI to draft consistent and professional business communication.</li>
        <li>Implement chatbots for 24/7 basic customer support.</li>
        <li>Analyze customer trends with simple AI forecasting tools.</li>
      </ul>
      <p>By starting small and focusing on specific pain points, businesses in regions like the Northern Cape can compete on a global scale.</p>
    `
  }), []);

  return (
    <div className="flex flex-col min-h-screen">
      <Section className="pb-8">
        <Button asChild variant="ghost" className="mb-8 hover:text-primary p-0 h-auto">
          <Link to="/blog" className="flex items-center gap-2"><ArrowLeft size={16} /> Back to Blog</Link>
        </Button>
        
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6">{post.category}</Badge>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-heading mb-8 leading-tight">{post.title}</h1>
          <div className="flex flex-wrap items-center justify-between gap-6 pb-12 border-b border-border">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm">
                <User size={16} className="text-primary" />
                <span className="font-semibold">{post.author}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar size={16} className="text-primary" />
                <span>{post.date}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Share:</span>
              <div className="flex gap-2">
                <Button size="icon" variant="outline" className="w-8 h-8 rounded-full border-border hover:bg-primary hover:text-primary-foreground"><Facebook size={14} /></Button>
                <Button size="icon" variant="outline" className="w-8 h-8 rounded-full border-border hover:bg-primary hover:text-primary-foreground"><Twitter size={14} /></Button>
                <Button size="icon" variant="outline" className="w-8 h-8 rounded-full border-border hover:bg-primary hover:text-primary-foreground"><Linkedin size={14} /></Button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <div className="max-w-5xl mx-auto px-4 mb-16">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full aspect-video object-cover rounded-3xl shadow-2xl"
        />
      </div>

      <Section className="pt-0">
        <div className="max-w-3xl mx-auto">
          <div 
            className="text-lg leading-relaxed text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </div>
      </Section>

      {/* Suggested Reading */}
      <Section variant="muted">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold font-heading">Recommended Reading</h2>
            <Button asChild variant="link" className="p-0 text-primary">
              <Link to="/blog">View All Posts</Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="hover:shadow-md transition-shadow">
               <CardHeader className="p-4">
                 <Badge variant="secondary" className="w-fit mb-4">Innovation</Badge>
                 <h4 className="font-bold text-lg leading-tight">Digital Tools Every Business Owner Should Use</h4>
               </CardHeader>
               <CardFooter className="p-4 pt-0 border-none bg-transparent">
                 <Button asChild variant="link" className="p-0 text-xs uppercase tracking-widest font-bold">
                   <Link to={`/blog/${id === '1' ? '2' : '1'}`}>Read More</Link>
                 </Button>
               </CardFooter>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
               <CardHeader className="p-4">
                 <Badge variant="secondary" className="w-fit mb-4">Branding</Badge>
                 <h4 className="font-bold text-lg leading-tight">Why Every SME Needs a Professional Website</h4>
               </CardHeader>
               <CardFooter className="p-4 pt-0 border-none bg-transparent">
                 <Button asChild variant="link" className="p-0 text-xs uppercase tracking-widest font-bold">
                   <Link to={`/blog/${id === '2' ? '3' : '2'}`}>Read More</Link>
                 </Button>
               </CardFooter>
            </Card>
          </div>
        </div>
      </Section>
    </div>
  );
}
