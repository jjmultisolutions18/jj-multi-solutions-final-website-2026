import React from 'react';
import Section, { SectionHeader } from '@/components/ui/Section';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQS = [
  {
    q: 'Do you build websites?',
    a: 'Yes, we build everything from simple business websites to complex web applications and e-commerce platforms using modern technologies like React and Firebase.'
  },
  {
    q: 'Do you build custom apps?',
    a: 'Absolutely. We specialize in custom business management systems, stakeholder platforms, and innovation tools tailored to your specific organizational needs.'
  },
  {
    q: 'Can you host my website and provide business emails?',
    a: 'Yes, we offer reliable website hosting and professional email setup as part of our ICT solutions package.'
  },
  {
    q: 'Can you help with AI tools?',
    a: 'Innovation is at our core. We help businesses integrate AI business assistants, automate workflows, and adopt Gemini-based solutions for efficiency.'
  },
  {
    q: 'Do you offer 3D printing and prototyping?',
    a: 'Yes, our Nexus Prototyping Lab provides 3D printing, CAD design, and laser cutting services specifically for innovators and SMEs developing physical products.'
  },
  {
    q: 'Do you work with government or NGOs?',
    a: 'Yes, we support government programmes, municipalities, and NGOs with innovation infrastructure and digital transformation services.'
  },
  {
    q: 'Do you offer professional training?',
    a: 'We offer various training programmes including AI for business, digital literacy, and innovation thinking through our Nexus Academy.'
  },
  {
    q: 'Can you help with funding applications?',
    a: 'Yes, our business development services include proposal writing and coordination for funding and commercialization readiness.'
  },
  {
    q: 'Can you support businesses outside Upington?',
    a: 'Definitely. While we are proud to be based in Upington, our digital and consulting services are available to clients across South Africa and the African continent.'
  }
];

export default function FAQ() {
  return (
    <>
      <section className="bg-muted/30 py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 tracking-tight">Frequently Asked Questions</h1>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
            Quick answers to common questions about our services, products, and implementation approach.
          </p>
        </div>
      </section>

      <Section>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {FAQS.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border border-border rounded-xl px-6 bg-background shadow-sm overflow-hidden">
                <AccordionTrigger className="text-left font-bold text-lg py-6 hover:text-primary transition-colors hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6 pt-2">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>
    </>
  );
}
