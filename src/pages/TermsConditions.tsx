import React from 'react';
import Section from '@/components/ui/Section';

export default function TermsConditions() {
  const lastUpdated = 'May 13, 2026';

  return (
    <Section>
      <div className="max-w-4xl mx-auto prose prose-slate">
        <h1 className="text-4xl font-bold font-heading mb-4">Terms & Conditions</h1>
        <p className="text-muted-foreground mb-8">Last Updated: {lastUpdated}</p>

        <section className="mb-12">
          <h2 className="text-2xl font-bold font-heading mb-4">1. Website Use</h2>
          <p>
            By accessing this website, you agree to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern JJ Multi Solutions (Pty) Ltd's relationship with you in relation to this website.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold font-heading mb-4">2. Service Enquiries</h2>
          <p>
            The information contained in this website is for general information purposes only. While we endeavour to keep the information up to date and correct, any reliance you place on such information is strictly at your own risk. Enquiries made through this website do not constitute a binding contract until a formal Service Level Agreement (SLA) is signed.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold font-heading mb-4">3. Quotes and Proposals</h2>
          <p>
            Quotes provided through our online request system are estimates based on the information provided. Final pricing is subject to a formal technical assessment and scoping exercise.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold font-heading mb-4">4. Intellectual Property</h2>
          <p>
            This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold font-heading mb-4">5. Project Timelines</h2>
          <p>
            Project timelines estimated during the quote phase are approximate. Final timelines will be agreed upon during the project kickoff phase and documented in the SLA.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold font-heading mb-4">6. Limitation of Liability</h2>
          <p>
            In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold font-heading mb-4">7. External Links</h2>
          <p>
            Through this website you are able to link to other websites which are not under the control of JJ Multi Solutions. We have no control over the nature, content and availability of those sites.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold font-heading mb-4">8. Jurisdiction</h2>
          <p>
            Your use of this website and any dispute arising out of such use of the website is subject to the laws of the Republic of South Africa.
          </p>
        </section>
      </div>
    </Section>
  );
}
