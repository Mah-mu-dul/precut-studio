import React, { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const Terms: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-off-white text-navy-blue font-sans selection:bg-sky-blue selection:text-white">
      <Navbar isDarkMode={false} />
      
      <main className="max-w-4xl mx-auto px-6 pt-32 pb-24 md:pt-40 md:pb-32">
        <h1 className="text-4xl md:text-5xl font-mono font-bold mb-4 tracking-tight">Terms of Service</h1>
        <p className="text-navy-blue/60 font-medium mb-12">Last updated: 1st March, 2026</p>

        <div className="space-y-10 prose prose-navy max-w-none">
          <section>
            <p className="text-lg leading-relaxed text-navy-blue/80">
              These Terms of Service (“Terms”) govern your access to and use of Precut Studio (“Precut
              Studio,” “we,” “us,” “our”) and our services, including video editing and related creative
              production (“Services”). By purchasing or using our Services, you agree to these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-mono font-bold mb-4 flex items-center gap-3">
              <span className="text-sky-blue">01</span> Services
            </h2>
            <p className="text-navy-blue/70 mb-4">
              Precut Studio provides subscription-based video editing and related creative production
              services (“Services”)
            </p>
            <ul className="list-disc pl-5 space-y-2 text-navy-blue/70">
              <li>Including short-form edits, long-form edits, and supporting creative tasks as agreed for your plan.</li>
              <li>Any services outside the agreed scope may be quoted separately.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-mono font-bold mb-4 flex items-center gap-3">
              <span className="text-sky-blue">02</span> Plans, Workflow, and Turnaround
            </h2>
            <ul className="list-disc pl-5 space-y-3 text-navy-blue/70">
              <li><strong>Workflow:</strong> We’ll follow the agreed submission and review process (email, shared drive, Frame.io, Notion, or other tools).</li>
              <li><strong>Turnaround:</strong> Turnaround times depend on the queue, complexity, and the video length. We may share estimated delivery windows for every video, but exact delivery times are not guaranteed.</li>
              <li><strong>Business Days:</strong> Standard working days are Monday to Friday (U.S. business schedule).</li>
              <li><strong>Queues:</strong> Requests are handled in order unless otherwise agreed.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-mono font-bold mb-4 flex items-center gap-3">
              <span className="text-sky-blue">03</span> Requests, Scope, and Fair Use
            </h2>
            <p className="text-navy-blue/70 mb-4">Your subscription is intended for a reasonable workflow aligned with your plan tier.</p>
            <ul className="list-disc pl-5 space-y-2 text-navy-blue/70">
              <li>Included requests are those that match the scope of your plan and follow the agreed format.</li>
              <li>Out-of-scope examples may include heavy 3D/VFX, advanced sound design, extensive scripting, brand strategy consulting, or tasks not mentioned in our plan.</li>
              <li>If request volume or complexity is consistently beyond what your plan supports, we may recommend an upgraded plan, adjust timelines, or propose a custom arrangement.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-mono font-bold mb-4 flex items-center gap-3">
              <span className="text-sky-blue">04</span> Revisions
            </h2>
            <ul className="list-disc pl-5 space-y-3 text-navy-blue/70">
              <li><strong>Included revisions:</strong> Revisions are included according to your plan, as long as they relate to the original request, you can ask for revisions as many times as you want.</li>
              <li><strong>What counts as a revision:</strong> Adjustments like timing tweaks, text updates, captions, color/contrast, music swaps, minor pacing changes, and similar refinements, changing in assets / B-rolls.</li>
              <li><strong>What doesn’t count as a revision:</strong> New creative direction, new assets that change the edit structure, new script/storyline after delivery, or “redo from scratch” requests. These will be treated as a new request.</li>
              <li><strong>Revision rounds:</strong> Multiple back-to-back revision cycles may extend timelines, which will cause a delay in the IN PROGRESS videos.</li>
              <li><strong>Approval responsibility:</strong> You are responsible for reviewing and approving deliverables before publishing.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-mono font-bold mb-4 flex items-center gap-3">
              <span className="text-sky-blue">05</span> Free Trials
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-navy-blue/70">
              <li>Free trials are not guaranteed and are provided only at our discretion after speaking with the prospect.</li>
              <li>Any trial outputs will contain a Precut Studio watermark.</li>
              <li>Trial scope, limits, and period will be defined before trial work begins.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-mono font-bold mb-4 flex items-center gap-3">
              <span className="text-sky-blue">06</span> Billing and Payments
            </h2>
            <ul className="list-disc pl-5 space-y-3 text-navy-blue/70">
              <li><strong>Monthly billing:</strong> Subscriptions renew every month.</li>
              <li><strong>Payment Process:</strong> Billing is currently handled via Payoneer. On your renewal date (or shortly before), we will send you a Payoneer payment link to complete the renewal.</li>
              <li><strong>Access and work status:</strong> If payment is not completed by the due date, work may be paused until payment is received.</li>
              <li><strong>Plan changes:</strong> Upgrades/downgrades can be requested and will take effect at the next billing cycle.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-mono font-bold mb-4 flex items-center gap-3">
              <span className="text-sky-blue">07</span> Cancellations and Pauses
            </h2>
            <ul className="list-disc pl-5 space-y-3 text-navy-blue/70">
              <li><strong>Cancellation:</strong> You may request cancellation before the next renewal date. Cancellation becomes effective at the end of the current paid period.</li>
              <li><strong>Pauses:</strong> You can pause the plan anytime you want, up to 1 year.</li>
              <li><strong>No carryover:</strong> Unused capacity does not convert into refunds or carry forward to the next month.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-mono font-bold mb-4 flex items-center gap-3">
              <span className="text-sky-blue">08</span> Refunds
            </h2>
            <p className="text-navy-blue/70 mb-4">Refunds are handled case-by-case.</p>
            <p className="text-navy-blue/70 mb-4 italic">No refunds are issued for dissatisfaction; unlimited revisions are included to ensure desired results.</p>
            <ul className="list-disc pl-5 space-y-2 text-navy-blue/70">
              <li>Refunds are only provided if Precut Studio fails to deliver due to legitimate operational constraints.</li>
              <li>Approved refunds are processed within 10-15 business days.</li>
              <li>Refund requests must be made within 7 days of service commencement.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-mono font-bold mb-4 flex items-center gap-3">
              <span className="text-sky-blue">09</span> Project Archiving and File Retention
            </h2>
            <ul className="list-disc pl-5 space-y-3 text-navy-blue/70">
              <li><strong>Retention window:</strong> We will store project files for 30 days after the delivery date.</li>
              <li><strong>Archiving:</strong> After the retention window, projects may be archived or deleted.</li>
              <li><strong>Client responsibility:</strong> You should download and back up final deliverables promptly.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-mono font-bold mb-4 flex items-center gap-3">
              <span className="text-sky-blue">10</span> Downtime & Force Majeure
            </h2>
            <p className="text-navy-blue/70 leading-relaxed">
              We are not responsible for delays caused by events outside our reasonable control. If significant downtime occurs, we will compensate missed days by working on holidays and weekends where possible.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-mono font-bold mb-4 flex items-center gap-3">
              <span className="text-sky-blue">11</span> Non-Solicitation
            </h2>
            <p className="text-navy-blue/70 leading-relaxed">
              During your engagement and for 12 months after, you agree not to directly solicit or hire any Precut Studio team member you interacted with without permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-mono font-bold mb-4 flex items-center gap-3">
              <span className="text-sky-blue">12</span> Intellectual Property
            </h2>
            <ul className="list-disc pl-5 space-y-3 text-navy-blue/70">
              <li><strong>Your content:</strong> You retain ownership of the materials you provide.</li>
              <li><strong>Our work product:</strong> Upon full payment, you receive rights to the final exported deliverables.</li>
              <li><strong>Portfolio use:</strong> We will not publicly share your work without your permission.</li>
            </ul>
          </section>

          <section className="pt-10 border-t border-navy-blue/10">
            <h2 className="text-2xl font-mono font-bold mb-4">Contact</h2>
            <p className="font-bold text-navy-blue">Precut Studio</p>
            <p className="text-navy-blue/70">Florida, USA</p>
            <a href="mailto:info@precutstudio.com" className="text-sky-blue font-bold hover:underline underline-offset-4 block mt-1">
              info@precutstudio.com
            </a>
            <p className="text-navy-blue/50 text-sm mt-2">precutstudio.com</p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
