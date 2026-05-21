export interface NavigationItem {
  title: string;
  href: string;
  description?: string;
}

export const NAV_LINKS: NavigationItem[] = [
  { title: 'Home', href: '/' },
  { title: 'About', href: '/about' },
  { title: 'Services', href: '/services' },
  { title: 'Solutions', href: '/solutions' },
  { title: 'Projects', href: '/projects' },
  { title: 'News', href: '/news' },
  { title: 'Blog', href: '/blog' },
  { title: 'Store', href: '/store' },
  { title: 'Client Area', href: '/dashboard' },
  { title: 'FAQ', href: '/faq' },
  { title: 'Contact', href: '/contact' },
];

export const COMPANY_DETAILS = {
  name: 'JJ Multi Solutions (Pty) Ltd',
  location: 'Upington, Northern Cape, South Africa',
  email: 'info@jjmultisolutions.co.za',
  phone: '062 542 5434',
  tagline: 'From Idea to Digital Implementation.',
  description: 'Innovation infrastructure, digital transformation, AI, rapid prototyping, and technology development support for SMEs and communities.',
};
