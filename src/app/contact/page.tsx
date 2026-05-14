import Link from 'next/link';
import { ArrowRight, CircleHelp, Mail, MessageSquareText, ShieldAlert, ShieldCheck, Store } from 'lucide-react';

import { ContactLeadForm } from '@/components/shared/contact-lead-form';
import { Footer } from '@/components/shared/footer';
import { NavbarShell } from '@/components/shared/navbar-shell';
import { siteContent } from '@/config/site.content';

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'DJL Servicios';
const contactCopy = siteContent.contact;

const contactHighlights = [
  { icon: Mail, title: 'Direct response', copy: 'Your message is saved securely and routed to the right team.' },
  { icon: MessageSquareText, title: 'Clear details', copy: 'Share your requirement, question, or collaboration idea in one place.' },
  { icon: ShieldCheck, title: 'Reliable follow-up', copy: 'We keep the request record so every conversation stays traceable.' },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#faf6f1_0%,#efe9e2_55%,#faf6f1_100%)] text-[#1d1716]">
      <NavbarShell />
      <main>
        <section className="relative overflow-hidden px-6 py-16 md:px-10 lg:px-16 lg:py-20">
          <div className="absolute left-[-8%] top-0 h-72 w-72 rounded-full bg-[#f3bc77]/25 blur-3xl" />
          <div className="absolute bottom-0 right-[-8%] h-80 w-80 rounded-full bg-[#a55233]/20 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.35em] text-[#6b5c54]">Contact us</p>
              <h1 className="mt-5 max-w-3xl text-5xl font-black leading-[0.95] tracking-[-0.06em] text-[#1d1716] md:text-7xl">
                {contactCopy.directoryTitle}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#6b5c54]">
                {contactCopy.directoryLead}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-3xl border border-[color:var(--listing-card-border)] bg-card p-5 shadow-sm">
                  <CircleHelp className="h-5 w-5 text-[#a55233]" />
                  <h2 className="mt-3 text-sm font-black uppercase tracking-[0.12em] text-[#1d1716]">Posting help</h2>
                  <p className="mt-2 text-sm leading-6 text-[#6b5c54]">Account issues, ad edits, and listing guidance.</p>
                </div>
                <div className="rounded-3xl border border-[color:var(--listing-card-border)] bg-card p-5 shadow-sm">
                  <ShieldAlert className="h-5 w-5 text-[#a55233]" />
                  <h2 className="mt-3 text-sm font-black uppercase tracking-[0.12em] text-[#1d1716]">Safety reports</h2>
                  <p className="mt-2 text-sm leading-6 text-[#6b5c54]">Report suspicious content for quick review.</p>
                </div>
                <div className="rounded-3xl border border-[color:var(--listing-card-border)] bg-card p-5 shadow-sm">
                  <Store className="h-5 w-5 text-[#a55233]" />
                  <h2 className="mt-3 text-sm font-black uppercase tracking-[0.12em] text-[#1d1716]">Business</h2>
                  <p className="mt-2 text-sm leading-6 text-[#6b5c54]">Partnerships, placement, and local growth support.</p>
                </div>
              </div>

              <div className="mt-6 rounded-3xl border border-[color:var(--listing-card-border)] bg-card/90 p-5 shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#6b5c54]">Need answers first?</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  <Link href="/help" className="inline-flex items-center gap-2 rounded-full bg-[#a55233] px-4 py-2 text-sm font-semibold text-white hover:bg-[#8e4529]">
                    Help Center <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="/classifieds" className="inline-flex items-center gap-2 rounded-full border border-[color:var(--listing-card-border)] bg-white px-4 py-2 text-sm font-semibold text-[#1d1716] hover:bg-[#f7f1ea]">
                    Browse classifieds
                  </Link>
                </div>
              </div>

              <div className="mt-8 grid gap-4">
                {contactHighlights.map((item) => (
                  <div key={item.title} className="flex gap-4 rounded-3xl border border-[color:var(--listing-card-border)] bg-card/85 p-5 shadow-sm">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#1d1716] text-white">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-base font-black text-[#1d1716]">{item.title}</h2>
                      <p className="mt-1 text-sm leading-6 text-[#6b5c54]">{item.copy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-4 rounded-2xl border border-[color:var(--listing-card-border)] bg-card/90 px-5 py-4 text-sm leading-relaxed text-[#6b5c54] shadow-sm">
                <p className="font-semibold text-[#1d1716]">{contactCopy.formTitle}</p>
                <p className="mt-1">
                  {contactCopy.formNote} You are contacting <span className="font-semibold">{siteName}</span>.
                </p>
              </div>
              <ContactLeadForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
