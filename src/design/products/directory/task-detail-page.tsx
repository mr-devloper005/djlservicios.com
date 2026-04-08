import Link from 'next/link'
import { ArrowRight, Globe, Mail, MapPin, Phone, ShieldCheck, Tag } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'

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
  const highlights = Array.isArray(content.highlights) ? content.highlights.filter((item): item is string => typeof item === 'string') : []
  const rawPrice = content.price ?? content.asking_price ?? content.amount
  let priceLabel: string | null = null
  if (typeof rawPrice === 'number' && Number.isFinite(rawPrice)) {
    priceLabel = new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(rawPrice)
  } else if (typeof rawPrice === 'string' && rawPrice.trim()) {
    priceLabel = rawPrice.trim()
  }
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

  const panel = 'rounded-2xl border border-[color:var(--listing-card-border)] bg-card shadow-[0_24px_64px_rgba(29,23,22,0.08)] ring-1 ring-[color:var(--listing-card-glow)]'
  const inset = 'rounded-2xl border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground'

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SchemaJsonLd data={schemaPayload} />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Link href={taskRoute} className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-primary">
          ← Back to {taskLabel}
        </Link>

        <section className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
          <div>
            <div className={`overflow-hidden ${panel}`}>
              <div className="relative h-[420px] overflow-hidden bg-muted">
                <ContentImage src={images[0]} alt={post.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1d1716]/40 to-transparent" />
                {task === 'classified' && priceLabel ? (
                  <div className="absolute bottom-4 left-4 rounded-xl bg-[#f3bc77] px-4 py-2 text-2xl font-semibold tabular-nums text-[#1d1716] shadow-lg">
                    {priceLabel}
                  </div>
                ) : null}
              </div>
              {images.length > 1 ? (
                <div className="grid grid-cols-4 gap-3 p-4">
                  {images.slice(1, 5).map((image) => (
                    <div key={image} className="relative h-24 overflow-hidden rounded-xl border border-border bg-muted">
                      <ContentImage src={image} alt={post.title} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            <div className={`mt-8 p-7 ${panel}`}>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">About this {task}</p>
              <h2 className="font-display mt-3 text-3xl font-semibold tracking-[-0.03em] text-foreground">Full description and seller details</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{description}</p>
              {highlights.length ? (
                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  {highlights.slice(0, 4).map((item) => (
                    <div key={item} className={`${inset}`}>
                      {item}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div className="space-y-6">
            <div className={`p-7 ${panel}`}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">{category || taskLabel}</p>
                  <h1 className="font-display mt-3 text-4xl font-semibold tracking-[-0.03em] text-foreground">{post.title}</h1>
                  {task === 'classified' && priceLabel ? (
                    <p className="mt-4 inline-flex rounded-xl bg-[#402a23] px-4 py-2 text-2xl font-semibold tabular-nums text-[#f3bc77]">
                      {priceLabel}
                    </p>
                  ) : null}
                </div>
                <span className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground">
                  <ShieldCheck className="h-3.5 w-3.5" /> {task === 'classified' ? 'Live listing' : 'Verified'}
                </span>
              </div>

              <div className="mt-6 grid gap-3">
                {location ? <div className={`flex items-center gap-3 ${inset}`}><MapPin className="h-4 w-4 shrink-0 text-primary" /> {location}</div> : null}
                {phone ? <div className={`flex items-center gap-3 ${inset}`}><Phone className="h-4 w-4 shrink-0 text-primary" /> {phone}</div> : null}
                {email ? <div className={`flex items-center gap-3 ${inset}`}><Mail className="h-4 w-4 shrink-0 text-primary" /> {email}</div> : null}
                {website ? <div className={`flex items-center gap-3 ${inset}`}><Globe className="h-4 w-4 shrink-0 text-primary" /> {website}</div> : null}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {website ? <a href={website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#a55233] px-5 py-3 text-sm font-semibold text-[#fffefb] shadow-md transition hover:bg-[#8e4529]">Visit website <ArrowRight className="h-4 w-4" /></a> : null}
                <Link href={taskRoute} className="inline-flex items-center gap-2 rounded-full border border-[color:var(--listing-card-border)] bg-secondary/40 px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-secondary">Browse more</Link>
              </div>
            </div>

            {mapEmbedUrl ? (
              <div className={`overflow-hidden ${panel}`}>
                <div className="border-b border-border px-6 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Location</p>
                </div>
                <iframe src={mapEmbedUrl} title={`${post.title} map`} className="h-[320px] w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            ) : null}

            <div className={`p-6 ${panel}`}>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">At a glance</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  'Read the full description and check photos before you message the seller.',
                  'Use the phone or email on the ad—avoid sending payment to unknown accounts.',
                  'Meet in a public place for local pickups; confirm the item matches the listing.',
                  'Below you will find similar ads in the same category to compare options.',
                ].map((item) => (
                  <div key={item.slice(0, 28)} className={`${inset} text-muted-foreground`}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {related.length ? (
          <section className="mt-14">
            <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">You may also like</p>
                <h2 className="font-display mt-3 text-3xl font-semibold tracking-[-0.03em] text-foreground">More listings worth a look</h2>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--listing-card-border)] bg-card px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                <Tag className="h-3.5 w-3.5" /> {taskLabel}
              </span>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
