import Link from 'next/link'
import { ArrowRight, Globe, Mail, MapPin, Phone, ShieldCheck, Tag } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'

const formatPublishedDate = (value?: unknown) => {
  if (typeof value !== 'string' || !value.trim()) return null
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null
  return new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'short', day: 'numeric' }).format(date)
}

export function DirectoryTaskDetailPage({
  task,
  taskLabel,
  taskRoute,
  post,
  description,
  category,
  images,
  mapEmbedUrl,
  related,
}: {
  task: TaskKey
  taskLabel: string
  taskRoute: string
  post: SitePost
  description: string
  category: string
  images: string[]
  mapEmbedUrl: string | null
  related: SitePost[]
}) {
  const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const location = typeof content.address === 'string' ? content.address : typeof content.location === 'string' ? content.location : ''
  const website = typeof content.website === 'string' ? content.website : ''
  const phone = typeof content.phone === 'string' ? content.phone : ''
  const email = typeof content.email === 'string' ? content.email : ''
  const sellerName =
    (typeof content.author === 'string' && content.author.trim()) ||
    (typeof (content as { contactName?: unknown }).contactName === 'string' && ((content as { contactName?: string }).contactName || '').trim()) ||
    (typeof (post as { authorName?: unknown }).authorName === 'string' && ((post as { authorName?: string }).authorName || '').trim()) ||
    'Verified Seller'
  const highlights = Array.isArray(content.highlights) ? content.highlights.filter((item): item is string => typeof item === 'string') : []
  const publishedDate = formatPublishedDate((post as { publishedAt?: unknown }).publishedAt)
  const hasContact = Boolean(phone || email || website)

  const schemaPayload = {
    '@context': 'https://schema.org',
    '@type': task === 'profile' ? 'Organization' : 'LocalBusiness',
    name: post.title,
    description,
    image: images[0],
    url: `${taskRoute}/${post.slug}`,
    address: location || undefined,
    telephone: phone || undefined,
    email: email || undefined,
  }

  return (
    <div className="min-h-screen bg-[#f8fbff] text-slate-950">
      <SchemaJsonLd data={schemaPayload} />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-[2.4rem] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
          <div className="relative h-[220px] overflow-hidden bg-slate-100 sm:h-[260px]">
            <ContentImage src={images[0]} alt={post.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-950/45 to-transparent" />
            <div className="absolute inset-x-0 bottom-0">
              <div className="mx-auto max-w-7xl px-6 pb-7 pt-8">
                <Link href={taskRoute} className="inline-flex items-center gap-2 text-sm font-semibold text-white/85 hover:text-white">
                  ← Back to {taskLabel}
                </Link>
                <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">{post.title}</h1>
                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
                  {category ? <span className="rounded-full bg-white/15 px-3 py-1">{category}</span> : null}
                  {location ? <span className="rounded-full bg-white/15 px-3 py-1">{location}</span> : null}
                  {publishedDate ? <span className="rounded-full bg-white/15 px-3 py-1">{publishedDate}</span> : null}
                  <span className="inline-flex items-center gap-2 rounded-full bg-emerald-400/15 px-3 py-1 text-emerald-50">
                    <ShieldCheck className="h-3.5 w-3.5" /> Verified
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px] lg:items-start">
          <div className="space-y-8">
            <div className="overflow-hidden rounded-[2.2rem] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
              <div className="relative h-[420px] overflow-hidden bg-slate-100">
                <ContentImage src={images[0]} alt={post.title} fill className="object-cover" />
              </div>
              {images.length > 1 ? (
                <div className="grid grid-cols-4 gap-3 p-4">
                  {images.slice(1, 5).map((image) => (
                    <div key={image} className="relative h-24 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                      <ContentImage src={image} alt={post.title} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Overview</p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">Everything you need at a glance.</h2>
                </div>
                {task !== 'classified' ? (
                  <Link href={taskRoute} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-100">
                    Browse more <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : null}
              </div>

              <p className="mt-4 text-sm leading-8 text-slate-600">{description}</p>

              {highlights.length ? (
                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  {highlights.slice(0, 4).map((item) => (
                    <div key={item} className="rounded-[1.4rem] border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-700">
                      {item}
                    </div>
                  ))}
                </div>
              ) : null}

              {hasContact ? (
                <div className="mt-7 grid gap-3">
                  {website ? (
                    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                      <Globe className="h-4 w-4" /> {website}
                    </div>
                  ) : null}
                  {phone ? (
                    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                      <Phone className="h-4 w-4" /> {phone}
                    </div>
                  ) : null}
                  {email ? (
                    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                      <Mail className="h-4 w-4" /> {email}
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Seller Information</p>
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold tracking-[-0.03em] text-slate-950">{sellerName}</p>
                  <p className="mt-1 text-sm text-slate-600">Usually responds within 24 hours.</p>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" /> Online
                </span>
              </div>

              <div className="mt-6 grid gap-3">
                {phone ? (
                  <a
                    href={`tel:${phone}`}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                  >
                    <Phone className="h-4 w-4" /> Call now
                  </a>
                ) : (
                  <Link
                    href="/contact"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                  >
                    Message seller
                  </Link>
                )}

                {email ? (
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-100"
                  >
                    <Mail className="h-4 w-4" /> Email seller
                  </a>
                ) : null}

                {website ? (
                  <a
                    href={website}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-100"
                  >
                    <Globe className="h-4 w-4" /> Visit website <ArrowRight className="h-4 w-4" />
                  </a>
                ) : null}
              </div>

              {location ? (
                <div className="mt-6 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  <MapPin className="h-4 w-4" /> {location}
                </div>
              ) : null}
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Trust & safety</p>
              <div className="mt-5 grid gap-3">
                {['Meet in a safe public place', 'Verify item condition before paying', 'Prefer traceable payments', 'Report suspicious activity'].map((item) => (
                  <div key={item} className="rounded-[1.3rem] border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-700">{item}</div>
                ))}
              </div>
            </div>
          </aside>
        </section>

        {mapEmbedUrl ? (
          <section className="mt-10 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
            <div className="border-b border-slate-200 px-6 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Location</p>
            </div>
            <iframe src={mapEmbedUrl} title={`${post.title} map`} className="h-[360px] w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </section>
        ) : null}

        {related.length ? (
          <section className="mt-14">
            <div className="flex items-end justify-between gap-4 border-b border-slate-200 pb-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Related surfaces</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Keep browsing nearby matches.</h2>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                <Tag className="h-3.5 w-3.5" /> {taskLabel}
              </span>
            </div>
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {related.map((item) => (
                <TaskPostCard key={item.id} post={item} href={`${taskRoute}/${item.slug}`} taskKey={task} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  )
}

