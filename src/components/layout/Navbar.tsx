import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { NAV_LINKS, COMPANY_DETAILS } from '@/constants';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        scrolled ? "bg-background/80 backdrop-blur-md py-3 border-border shadow-sm" : "bg-transparent py-5 border-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative w-12 h-12 flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
            {/* Gear + Globe Logo Simulation */}
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
              {/* Top Gear Half (Orange) */}
              <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray="54.98 54.98" strokeDashoffset="54.98" className="text-secondary" />
              <path d="M50 15 L50 5 M74.7 25.3 L81.8 18.2 M85 50 L95 50 M74.7 74.7 L81.8 81.8" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" className="text-secondary" />
              
              {/* Bottom Gear Half (Blue) */}
              <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray="54.98 54.98" strokeDashoffset="0" className="text-primary" />
              <path d="M50 85 L50 95 M25.3 74.7 L18.2 81.8 M15 50 L5 50 M25.3 25.3 L18.2 18.2" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" className="text-primary" />
              
              {/* Globe Lines (White/Light) */}
              <circle cx="50" cy="50" r="25" fill="none" stroke="white" strokeWidth="1" opacity="0.5" />
              <ellipse cx="50" cy="50" rx="10" ry="25" fill="none" stroke="white" strokeWidth="1" opacity="0.3" />
              <ellipse cx="50" cy="50" rx="25" ry="10" fill="none" stroke="white" strokeWidth="1" opacity="0.3" />
              
              {/* Swoosh */}
              <path d="M10 40 Q 30 70 90 60" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-primary" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-xl leading-none tracking-tight">
              <span className="text-primary">JJ</span>
              <span className="text-secondary">MS</span>
            </span>
            <span className="text-[10px] text-muted-foreground font-bold tracking-[0.2em] uppercase">Multi Solutions</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link 
              key={link.href}
              to={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location.pathname === link.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {link.title}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button asChild variant="default" size="sm" className="rounded-full px-6">
            <Link to="/request-quote">Request a Quote</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden p-2 text-foreground"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-b overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <Link 
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "text-lg font-medium py-2 border-b border-border/50 transition-colors",
                    location.pathname === link.href ? "text-primary px-2 border-l-4 border-l-primary" : "text-muted-foreground"
                  )}
                >
                  {link.title}
                </Link>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <Button asChild className="w-full rounded-full">
                  <Link to="/request-quote">Request a Quote</Link>
                </Button>
                <Button asChild variant="outline" className="w-full rounded-full">
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
