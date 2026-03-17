import React, { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const Privacy: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-off-white text-navy-blue font-sans selection:bg-sky-blue selection:text-white">
      <Navbar isDarkMode={false} />
      
      <main className="max-w-4xl mx-auto px-6 pt-32 pb-24 md:pt-40 md:pb-32">
        <h1 className="text-4xl md:text-5xl font-mono font-bold mb-4 tracking-tight">Privacy Policy</h1>
        <p className="text-navy-blue/60 font-medium mb-12">Last updated: 28th February, 2026</p>

        <div className="space-y-10 prose prose-navy max-w-none">
          <section>
            <p className="text-lg leading-relaxed text-navy-blue/80">
              Precut Studio (“Precut Studio,” “we,” “us,” or “our”) values your privacy. This Privacy Policy
              explains what information we collect, how we use it, and the choices you have when you
              visit our website, contact us, or use our services.
            </p>
            <p className="text-lg leading-relaxed text-navy-blue/80 mt-4">
              By using our website or services, you agree to the terms of this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-mono font-bold mb-4 flex items-center gap-3">
              <span className="text-sky-blue">01</span> Information We Collect
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold mb-2">Information you provide</h3>
                <ul className="list-disc pl-5 space-y-2 text-navy-blue/70">
                  <li>Name, email address, company name, and other contact details</li>
                  <li>Project information you submit (briefs, notes, assets, feedback)</li>
                  <li>Account-related details needed to provide service</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-2">Information collected automatically</h3>
                <ul className="list-disc pl-5 space-y-2 text-navy-blue/70">
                  <li>Device and browser information</li>
                  <li>IP address and approximate location</li>
                  <li>Usage data such as pages viewed and actions taken</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-mono font-bold mb-4 flex items-center gap-3">
              <span className="text-sky-blue">02</span> How We Use Information
            </h2>
            <p className="text-navy-blue/70 mb-4">We use collected information to:</p>
            <ul className="list-disc pl-5 space-y-2 text-navy-blue/70">
              <li>Deliver and improve our services</li>
              <li>Process payments and manage subscriptions</li>
              <li>Communicate about support, updates, and service-related notices</li>
              <li>Maintain security and prevent fraud</li>
              <li>Analyze website performance and improve user experience</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-mono font-bold mb-4 flex items-center gap-3">
              <span className="text-sky-blue">03</span> Payments
            </h2>
            <p className="text-navy-blue/70 leading-relaxed">
              Payments are processed through Payoneer. We do not store your full card details on our
              servers. Payment data is handled securely by the payment provider under their own
              policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-mono font-bold mb-4 flex items-center gap-3">
              <span className="text-sky-blue">04</span> Cookies
            </h2>
            <p className="text-navy-blue/70 mb-4">We may use cookies and similar technologies to:</p>
            <ul className="list-disc pl-5 space-y-2 text-navy-blue/70">
              <li>Keep the site running smoothly</li>
              <li>Remember preferences</li>
              <li>Understand how users interact with our pages</li>
              <li>Improve performance and marketing efforts</li>
            </ul>
            <p className="text-navy-blue/70 mt-4">
              You can disable cookies in your browser settings, but some parts of the site may not
              function properly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-mono font-bold mb-4 flex items-center gap-3">
              <span className="text-sky-blue">05</span> Sharing of Information
            </h2>
            <p className="text-navy-blue/70 mb-4">
              We do not sell your personal information. We may share information only when necessary,
              including:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-navy-blue/70">
              <li>With vendors and tools we use to operate our business (hosting, analytics, payment processing, communication tools)</li>
              <li>To comply with legal requirements or protect our rights and users</li>
              <li>If our business is involved in a merger, acquisition, or asset sale</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-mono font-bold mb-4 flex items-center gap-3">
              <span className="text-sky-blue">06</span> Data Retention
            </h2>
            <p className="text-navy-blue/70 leading-relaxed">
              We retain information only for as long as needed to provide services, meet operational
              needs, and comply with legal or accounting requirements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-mono font-bold mb-4 flex items-center gap-3">
              <span className="text-sky-blue">07</span> Security
            </h2>
            <p className="text-navy-blue/70 leading-relaxed">
              We take reasonable measures to protect your information. However, no online service can
              guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-mono font-bold mb-4 flex items-center gap-3">
              <span className="text-sky-blue">08</span> International Use
            </h2>
            <p className="text-navy-blue/70 leading-relaxed">
              If you access our services from outside where our systems or providers operate, your
              information may be processed in other locations with different data protection laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-mono font-bold mb-4 flex items-center gap-3">
              <span className="text-sky-blue">09</span> Your Rights and Choices
            </h2>
            <p className="text-navy-blue/70 leading-relaxed">
              Depending on your location, you may have the right to request access, correction, or
              deletion of your personal data, or object to certain processing. To make a request, email us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-mono font-bold mb-4 flex items-center gap-3">
              <span className="text-sky-blue">10</span> Children’s Privacy
            </h2>
            <p className="text-navy-blue/70 leading-relaxed">
              Our services are not intended for children under 13, and we do not knowingly collect
              personal information from children under 13.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-mono font-bold mb-4 flex items-center gap-3">
              <span className="text-sky-blue">11</span> Updates to This Policy
            </h2>
            <p className="text-navy-blue/70 leading-relaxed">
              We may update this Privacy Policy occasionally. Any changes will be posted here with an
              updated “Last updated” date.
            </p>
          </section>

          <section className="pt-10 border-t border-navy-blue/10">
            <h2 className="text-2xl font-mono font-bold mb-4">Contact</h2>
            <p className="text-navy-blue/70">For privacy-related questions or requests, contact:</p>
            <a href="mailto:info@precutstudio.com" className="text-sky-blue font-bold text-lg hover:underline decoration-2 underline-offset-4 mt-2 inline-block">
              info@precutstudio.com
            </a>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
