import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Linkedin, Twitter, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { COMPANY_DETAILS, NAV_LINKS } from '@/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 text-foreground border-t border-border">
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <span className="font-heading font-bold text-2xl tracking-tight text-foreground">
                <span className="text-primary">JJ</span>
                <span className="text-secondary">MS</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {COMPANY_DETAILS.description}
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 bg-background border border-border rounded-full hover:bg-secondary transition-colors hover:text-white">
                <Facebook size={18} />
              </a>
              <a href="#" className="p-2 bg-background border border-border rounded-full hover:bg-secondary transition-colors hover:text-white">
                <Linkedin size={18} />
              </a>
              <a href="#" className="p-2 bg-background border border-border rounded-full hover:bg-secondary transition-colors hover:text-white">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-foreground mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              {NAV_LINKS.filter(l => ['Home', 'About', 'Services', 'News', 'FAQ'].includes(l.title)).map(link => (
                <li key={link.href}>
                  <Link to={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.title}
                  </Link>
                </li>
              ))}
              <li><Link to="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-conditions" className="text-muted-foreground hover:text-primary transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-bold text-foreground mb-6">Our Services</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">ICT & Digital Solutions</Link></li>
              <li><Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">AI & Automation</Link></li>
              <li><Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">Rapid Prototyping</Link></li>
              <li><Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">Innovation Support</Link></li>
              <li><Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">Training & Skills</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-foreground mb-6">Get in Touch</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary mt-1 shrink-0" />
                <span className="text-muted-foreground leading-relaxed font-medium">
                  {COMPANY_DETAILS.location}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary shrink-0" />
                <a href={`tel:${COMPANY_DETAILS.phone.replace(/\s/g, '')}`} className="text-muted-foreground hover:text-primary transition-colors">
                  {COMPANY_DETAILS.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary shrink-0" />
                <a href={`mailto:${COMPANY_DETAILS.email}`} className="text-muted-foreground hover:text-primary transition-colors break-all">
                  {COMPANY_DETAILS.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {currentYear} {COMPANY_DETAILS.name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <p>Made with &lt;3 in South Africa</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppButton() {
  const whatsappNumber = COMPANY_DETAILS.phone.replace(/\s/g, '');
  const message = encodeURIComponent("Hello JJ Multi Solutions, I'm interested in your services.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <a 
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all hover:scale-110 flex items-center justify-center group"
      aria-label="WhatsApp Us"
    >
      <MessageCircle size={28} />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 font-medium whitespace-nowrap">
        WhatsApp Us
      </span>
    </a>
  );
}
