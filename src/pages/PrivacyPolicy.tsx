import React from 'react';
import Section from '@/components/ui/Section';

export default function PrivacyPolicy() {
  const lastUpdated = 'May 13, 2026';

  return (
    <Section>
      <div className="max-w-4xl mx-auto prose prose-slate">
        <h1 className="text-4xl font-bold font-heading mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last Updated: {lastUpdated}</p>

        <section className="mb-12">
          <h2 className="text-2xl font-bold font-heading mb-4">1. Introduction</h2>
          <p>
            JJ Multi Solutions (Pty) Ltd ("we," "us," or "our") respects your privacy and is committed to protecting your personal data. This Privacy Policy is designed to comply with the Protection of Personal Information Act (POPIA) of South Africa.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold font-heading mb-4">2. Information We Collect</h2>
          <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Identity Data:</strong> Includes full name, business name, and job title.</li>
            <li><strong>Contact Data:</strong> Includes email address, phone number, and WhatsApp details.</li>
            <li><strong>Project Data:</strong> Information you provide regarding service enquiries and quote requests.</li>
            <li><strong>Technical Data:</strong> Includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold font-heading mb-4">3. How We Use Your Information</h2>
          <p>We use your personal data for the following purposes:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>To register you as a new client.</li>
            <li>To process and deliver your requested services.</li>
            <li>To respond to your enquiries via contact forms or WhatsApp.</li>
            <li>To send you updates about our services and upcoming innovation events (with your consent).</li>
            <li>To manage our relationship with you including notifying you about changes to our terms or privacy policy.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold font-heading mb-4">4. Data Storage and Security</h2>
          <p>
            Your data is stored securely using cloud-based platforms including Firebase (Google Cloud). We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold font-heading mb-4">5. POPIA Compliance Statement</h2>
          <p>
            Pursuant to the Protection of Personal Information Act, 2013 (POPIA), we ensure that all personal information is processed lawfully and in a reasonable manner that does not infringe on the privacy of the data subject.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold font-heading mb-4">6. Your Rights</h2>
          <p>Under POPIA, you have the right to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Request access to your personal data.</li>
            <li>Request correction of your personal data.</li>
            <li>Request erasure of your personal data.</li>
            <li>Object to the processing of your personal data.</li>
            <li>Request restriction of processing your personal data.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold font-heading mb-4">7. Contact Details</h2>
          <p>If you have any questions about this privacy policy or our privacy practices, please contact our Information Officer at:</p>
          <div className="mt-4 p-6 bg-muted rounded-xl">
            <p className="font-bold">JJ Multi Solutions (Pty) Ltd</p>
            <p>Email: jerome.vut@gmail.com</p>
            <p>Location: Upington, Northern Cape, South Africa</p>
          </div>
        </section>
      </div>
    </Section>
  );
}
