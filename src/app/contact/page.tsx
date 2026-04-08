import { Building2, FileText, Image as ImageIcon, Mail, Phone, Sparkles, Bookmark, Tag } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'

function getTone(kind: ReturnType<typeof getProductKind>) {
  if (kind === 'directory') {
    return {
      shell: 'bg-background text-foreground',
      panel: 'paper-panel border border-[color:var(--listing-card-border)]',
      soft: 'rounded-2xl border border-[color:var(--listing-card-border)] bg-card/90',
      muted: 'text-muted-foreground',
      action: 'bg-[#a55233] text-[#fffefb] hover:bg-[#8e4529]',
    }
  }
  if (kind === 'editorial') {
    return {
      shell: 'bg-[#fbf6ee] text-[#241711]',
      panel: 'border border-[#dcc8b7] bg-[#fffdfa]',
      soft: 'border border-[#e6d6c8] bg-[#fff4e8]',
      muted: 'text-[#6e5547]',
      action: 'bg-[#241711] text-[#fff1e2] hover:bg-[#3a241b]',
    }
  }
  if (kind === 'visual') {
    return {
      shell: 'bg-[#07101f] text-white',
      panel: 'border border-white/10 bg-white/6',
      soft: 'border border-white/10 bg-white/5',
      muted: 'text-slate-300',
      action: 'bg-[#8df0c8] text-[#07111f] hover:bg-[#77dfb8]',
    }
  }
  return {
    shell: 'bg-[#f7f1ea] text-[#261811]',
    panel: 'border border-[#ddcdbd] bg-[#fffaf4]',
    soft: 'border border-[#e8dbce] bg-[#f3e8db]',
    muted: 'text-[#71574a]',
    action: 'bg-[#5b2b3b] text-[#fff0f5] hover:bg-[#74364b]',
  }
}

export default function ContactPage() {
  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const tone = getTone(productKind)
  const directoryLaneIcons = [Tag, Mail, Phone] as const
  const lanes =
    productKind === 'directory'
      ? siteContent.contact.directoryLanes.map((lane, i) => ({
          icon: directoryLaneIcons[i] || Building2,
          title: lane.title,
          body: lane.body,
        }))
      : productKind === 'editorial'
        ? [
            { icon: FileText, title: 'Editorial submissions', body: 'Pitch essays, columns, and long-form ideas that fit the publication.' },
            { icon: Mail, title: 'Newsletter partnerships', body: 'Coordinate sponsorships, collaborations, and issue-level campaigns.' },
            { icon: Sparkles, title: 'Contributor support', body: 'Get help with voice, formatting, and publication workflow questions.' },
          ]
        : productKind === 'visual'
          ? [
              { icon: ImageIcon, title: 'Creator collaborations', body: 'Discuss gallery launches, creator features, and visual campaigns.' },
              { icon: Sparkles, title: 'Licensing and use', body: 'Reach out about usage rights, commercial requests, and visual partnerships.' },
              { icon: Mail, title: 'Media kits', body: 'Request creator decks, editorial support, or visual feature placement.' },
            ]
          : [
              { icon: Bookmark, title: 'Collection submissions', body: 'Suggest resources, boards, and links that deserve a place in the library.' },
              { icon: Mail, title: 'Resource partnerships', body: 'Coordinate curation projects, reference pages, and link programs.' },
              { icon: Sparkles, title: 'Curator support', body: 'Need help organizing shelves, collections, or profile-connected boards?' },
            ]

  return (
    <div className={`min-h-screen ${tone.shell}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Contact {SITE_CONFIG.name}</p>
            <h1 className="font-display mt-4 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
              {productKind === 'directory' ? siteContent.contact.directoryTitle : 'Get in touch'}
            </h1>
            <p className={`mt-5 max-w-2xl text-sm leading-relaxed ${tone.muted}`}>
              {productKind === 'directory' ? siteContent.contact.directoryLead : 'Tell us what you need and we will point you in the right direction.'}
            </p>
            <div className="mt-8 space-y-4">
              {lanes.map((lane) => (
                <div key={lane.title} className={`rounded-[1.6rem] p-5 ${tone.soft}`}>
                  <lane.icon className="h-5 w-5" />
                  <h2 className="mt-3 text-xl font-semibold">{lane.title}</h2>
                  <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{lane.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-[2rem] p-7 ${tone.panel}`}>
            <h2 className="font-display text-2xl font-semibold text-foreground">{siteContent.contact.formTitle}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{siteContent.contact.formNote}</p>
            <form className="mt-6 grid gap-4">
              <input className="h-12 rounded-xl border border-border bg-background px-4 text-sm" placeholder="Your name" name="name" autoComplete="name" />
              <input className="h-12 rounded-xl border border-border bg-background px-4 text-sm" placeholder="Email address" name="email" type="email" autoComplete="email" />
              <input className="h-12 rounded-xl border border-border bg-background px-4 text-sm" placeholder="Subject (e.g. problem with my ad)" name="subject" />
              <textarea className="min-h-[180px] rounded-xl border border-border bg-background px-4 py-3 text-sm" placeholder="Describe your question or issue. Include your ad title if it is about a listing." name="message" />
              <button type="submit" className={`inline-flex h-12 items-center justify-center rounded-xl px-6 text-sm font-semibold ${tone.action}`}>
                Send message
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
