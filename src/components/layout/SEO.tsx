import React from 'react';
import { Helmet } from 'react-helmet-async';
import { COMPANY_DETAILS } from '@/constants';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

export default function SEO({ 
  title, 
  description = COMPANY_DETAILS.description, 
  image = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop', 
  url = 'https://jjmultisolutions.co.za', // Placeholder for actual domain
  type = 'website' 
}: SEOProps) {
  const siteTitle = title ? `${title} | ${COMPANY_DETAILS.name}` : `${COMPANY_DETAILS.name} - ${COMPANY_DETAILS.tagline}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
