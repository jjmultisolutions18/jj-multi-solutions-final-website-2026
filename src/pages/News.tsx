import React from 'react';
import Section, { SectionHeader } from '@/components/ui/Section';
import { Calendar, MapPin, Clock, ArrowRight, Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function News() {
  const events = [
    {
      title: 'Youth Innovation Challenge 2026',
      date: 'June 15, 2026',
      time: '09:00 AM - 16:00 PM',
      venue: 'Upington Innovation Hub',
      desc: 'An annual competition for youth to pitch innovative solutions for local community challenges.',
      status: 'upcoming'
    },
    {
      title: 'AI for Small Business Workshop',
      date: 'May 28, 2026',
      time: '18:00 PM - 20:00 PM',
      venue: 'Online / Zoom',
      desc: 'Practical session on using Gemini and other AI tools to automate business administrative tasks.',
      status: 'upcoming'
    },
    {
      title: 'Northern Cape Tech Expo',
      date: 'April 10, 2026',
      time: 'All Day',
      venue: 'Upington Convention Centre',
      desc: 'Showcasing local technological developments and digital transformation success stories.',
      status: 'past'
    },
    {
      title: 'Rapid Prototyping Demo Day',
      date: 'July 05, 2026',
      time: '11:00 AM - 15:00 PM',
      venue: 'Nexus Prototyping Lab',
      desc: 'Live demonstration of 3D printing and CAD design for manufacturing startups.',
      status: 'upcoming'
    }
  ];

  return (
    <>
      <section className="bg-muted/50 py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 tracking-tight">News & Events</h1>
              <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
                Stay updated with our latest announcements, innovation sessions, and community outreach programmes.
              </p>
            </div>
            <Button className="rounded-full px-8 gap-2 bg-primary">
              <Bell size={18} /> Notify Me of Events
            </Button>
          </div>
        </div>
      </section>

      <Section>
        <div className="space-y-8">
          {events.map((event, i) => (
            <div key={i} className={`flex flex-col md:flex-row gap-8 p-8 rounded-2xl border transition-all hover:shadow-md ${event.status === 'past' ? 'bg-muted/20 opacity-70 grayscale border-transparent' : 'bg-background border-border shadow-sm'}`}>
              <div className="md:w-48 shrink-0">
                <div className="bg-primary/10 text-primary p-4 rounded-xl text-center">
                  <div className="text-sm font-bold uppercase tracking-widest opacity-60">Month</div>
                  <div className="text-4xl font-black font-heading mt-1">{event.date.split(',')[0].split(' ')[1]}</div>
                  <div className="text-sm font-bold uppercase tracking-widest">{event.date.split(' ')[0]}</div>
                </div>
              </div>
              
              <div className="flex-grow">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Badge className={
                    event.status === 'upcoming' ? 'bg-primary' : 
                    event.status === 'ongoing' ? 'bg-green-500' : 'bg-slate-500'
                  }>
                    {event.status.toUpperCase()}
                  </Badge>
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                    <MapPin size={14} className="text-primary" /> {event.venue}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold mb-4 font-heading">{event.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {event.desc}
                </p>
                
                <div className="flex flex-wrap gap-6 text-sm text-muted-foreground font-medium mb-8">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-primary" /> {event.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-primary" /> {event.time}
                  </div>
                </div>
                
                <div className="flex gap-4">
                  {event.status === 'upcoming' && (
                    <Button size="sm" className="rounded-full px-6">RSVP Now</Button>
                  )}
                  <Button variant="outline" size="sm" className="rounded-full px-6 group">
                    Learn More <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section variant="muted">
        <div className="bg-background p-12 rounded-3xl text-center border border-border shadow-sm max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 font-heading">Host an Innovation Event</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Are you a hub, university, or municipality looking to host a hackathon or ideation workshop? JJMS provides end-to-end event design and facilitation.
          </p>
          <Button asChild className="rounded-full px-12 h-12 font-bold">
            <a href="/contact">Enquire About Partnerships</a>
          </Button>
        </div>
      </Section>
    </>
  );
}
