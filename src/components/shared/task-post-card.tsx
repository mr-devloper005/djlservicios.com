import { ContentImage } from '@/components/shared/content-image'
import Link from 'next/link'
import { ArrowUpRight, ExternalLink, FileText, Mail, MapPin, Sparkles, Tag } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import type { TaskKey } from '@/lib/site-config'
import { SITE_THEME } from '@/config/site.theme'
import { getFactoryState } from '@/design/factory/get-factory-state'

type ListingContent = {
  location?: string
  category?: string
  description?: string
  email?: string
  price?: string | number
}

const stripHtml = (value?: string | null) =>
  (value || '')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(Number.parseInt(code, 16)))
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<\/?[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const getExcerpt = (value?: string | null, maxLength = 140) => {
  const text = stripHtml(value)
  if (!text) return ''
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength).trimEnd()}…`
}

const getContent = (post: SitePost): ListingContent => {
  const content = post.content && typeof post.content === 'object' ? post.content : {}
  return content as ListingContent
}

const formatPrice = (content: Record<string, unknown>) => {
  const raw = content.price ?? content.asking_price ?? content.amount
  if (typeof raw === 'number' && Number.isFinite(raw)) {
    if (raw <= 0) return null
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      currencyDisplay: 'symbol',
      maximumFractionDigits: 0,
    }).format(raw)
  }
  if (typeof raw === 'string' && raw.trim()) {
    const trimmed = raw.trim()
    const numeric = Number(trimmed.replace(/[^0-9.-]/g, ''))
    if (Number.isFinite(numeric) && numeric <= 0) return null
    return trimmed
  }
  return null
}

const listedFreshness = (publishedAt?: string | null) => {
  if (!publishedAt) return null
  const t = new Date(publishedAt).getTime()
  if (!Number.isFinite(t)) return null
  const days = (Date.now() - t) / (1000 * 60 * 60 * 24)
  if (days < 2) return 'New'
  if (days < 7) return 'This week'
  return null
}

const getImageUrl = (post: SitePost, content: ListingContent) => {
  const media = Array.isArray(post.media) ? post.media : []
  const mediaUrl = media[0]?.url
  if (mediaUrl) return mediaUrl

  const contentAny = content as Record<string, unknown>
  const contentImage = typeof contentAny.image === 'string' ? contentAny.image : null
  if (contentImage) return contentImage

  const contentImages = Array.isArray(contentAny.images) ? contentAny.images : []
  const firstImage = contentImages.find((value) => typeof value === 'string')
  if (firstImage) return firstImage as string

  const contentLogo = typeof contentAny.logo === 'string' ? contentAny.logo : null
  if (contentLogo) return contentLogo

  return '/placeholder.svg?height=640&width=960'
}

const cardStyles = {
  'listing-elevated': {
    frame: 'rounded-[1.9rem] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] hover:-translate-y-1 hover:shadow-[0_28px_75px_rgba(15,23,42,0.14)]',
    muted: 'text-slate-600',
    title: 'text-slate-950',
    badge: 'bg-slate-950 text-white',
  },
  'editorial-feature': {
    frame: 'rounded-[1.8rem] border border-[rgba(125,83,45,0.12)] bg-[#fffaf3] shadow-[0_18px_55px_rgba(89,52,24,0.1)] hover:-translate-y-1 hover:shadow-[0_26px_75px_rgba(89,52,24,0.14)]',
    muted: 'text-[#71584b]',
    title: 'text-[#2b1d17]',
    badge: 'bg-[#2b1d17] text-[#fff3df]',
  },
  'studio-panel': {
    frame: 'rounded-[1.9rem] border border-white/10 bg-[linear-gradient(180deg,rgba(7,17,31,0.96),rgba(12,23,43,0.96))] text-white shadow-[0_24px_80px_rgba(15,23,42,0.35)] hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(15,23,42,0.42)]',
    muted: 'text-slate-300',
    title: 'text-white',
    badge: 'bg-[#8df0c8] text-[#07111f]',
  },
  'catalog-grid': {
    frame: 'rounded-2xl border border-[color:var(--listing-card-border)] bg-card shadow-[0_20px_50px_rgba(29,23,22,0.08)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_28px_64px_rgba(29,23,22,0.12)]',
    muted: 'text-muted-foreground',
    title: 'text-foreground',
    badge: 'bg-primary text-primary-foreground',
  },
} as const

const getVariantForTask = (taskKey: TaskKey) => SITE_THEME.cards[taskKey] || 'listing-elevated'

export function TaskPostCard({
  post,
  href,
  taskKey,
  compact,
}: {
  post: SitePost
  href: string
  taskKey?: TaskKey
  compact?: boolean
}) {
  const content = getContent(post)
  const contentRecord = (post.content && typeof post.content === 'object' ? post.content : {}) as Record<string, unknown>
  const priceLabel = formatPrice(contentRecord)
  const freshness = listedFreshness(post.publishedAt)
  const image = getImageUrl(post, content)
  const rawCategory = content.category || post.tags?.[0] || 'Post'
  const normalizedCategory = normalizeCategory(rawCategory)
  const category = CATEGORY_OPTIONS.find((item) => item.slug === normalizedCategory)?.name || rawCategory
  const variant = taskKey || 'listing'
  const visualVariant = cardStyles[getVariantForTask(variant)]
  const isBookmarkVariant = variant === 'sbm' || variant === 'social'
  const imageAspect = variant === 'image' ? 'aspect-[4/5]' : variant === 'article' ? 'aspect-[16/10]' : variant === 'pdf' ? 'aspect-[4/5]' : variant === 'classified' ? 'aspect-[16/11]' : 'aspect-[4/3]'
  const altText = `${post.title} ${category} ${variant === 'listing' ? 'business listing' : variant} image`
  const imageSizes = variant === 'article' ? '(max-width: 640px) 90vw, (max-width: 1024px) 48vw, 420px' : variant === 'image' ? '(max-width: 640px) 82vw, (max-width: 1024px) 34vw, 320px' : '(max-width: 640px) 85vw, (max-width: 1024px) 42vw, 340px'

  const { recipe } = getFactoryState()
  const isDirectoryProduct = recipe.homeLayout === 'listing-home' || recipe.homeLayout === 'classified-home'
  const isDirectorySurface = isDirectoryProduct && (variant === 'listing' || variant === 'classified' || variant === 'profile')

  if (isDirectorySurface) {
    const cardTone = recipe.brandPack === 'market-utility'
      ? {
          frame: 'rounded-2xl border border-[color:var(--listing-card-border)] bg-card shadow-[0_22px_56px_rgba(29,23,22,0.09)] ring-1 ring-[color:var(--listing-card-glow)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_32px_72px_rgba(29,23,22,0.14)]',
          badge: 'bg-[#402a23] text-[#f3bc77]',
          muted: 'text-muted-foreground',
          title: 'text-[#1d1716]',
          cta: 'bg-[#a55233] text-[#fffefb]',
          price: 'bg-[#f3bc77] text-[#1d1716]',
        }
      : {
          frame: 'rounded-2xl border border-border bg-card shadow-[0_18px_44px_rgba(15,23,42,0.08)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(15,23,42,0.14)]',
          badge: 'bg-primary text-primary-foreground',
          muted: 'text-muted-foreground',
          title: 'text-foreground',
          cta: 'bg-primary text-primary-foreground',
          price: 'bg-accent text-accent-foreground',
        }

    return (
      <Link href={href} className={`group relative flex h-full flex-col overflow-hidden ${cardTone.frame}`}>
        <div className="relative aspect-[5/4] overflow-hidden bg-muted sm:aspect-[16/11]">
          <ContentImage src={image} alt={altText} fill sizes={imageSizes} quality={75} className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.045]" intrinsicWidth={960} intrinsicHeight={720} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1d1716]/55 via-[#1d1716]/10 to-transparent opacity-90" />
          <div className="absolute left-3 top-3 flex flex-wrap items-center gap-2 sm:left-4 sm:top-4">
            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] shadow-sm ${cardTone.badge}`}>
              <Tag className="h-3 w-3" />
              {category}
            </span>
            {freshness ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-white/92 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#a55233] shadow-sm">
                <Sparkles className="h-3 w-3" />
                {freshness}
              </span>
            ) : null}
          </div>
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2 sm:bottom-4 sm:left-4 sm:right-4">
            {priceLabel ? (
              <span className={`rounded-lg px-3 py-1.5 text-lg font-semibold tabular-nums shadow-md sm:text-xl ${cardTone.price}`}>
                {priceLabel}
              </span>
            ) : null}
          </div>
        </div>
        <div className="flex flex-1 flex-col border-t border-[color:var(--listing-card-border)] bg-gradient-to-b from-card to-secondary/40 p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className={`font-display line-clamp-2 text-lg font-semibold leading-snug tracking-tight sm:text-xl ${cardTone.title}`}>{post.title}</h3>
            <ArrowUpRight className={`mt-0.5 h-5 w-5 shrink-0 opacity-60 transition-opacity group-hover:opacity-100 ${cardTone.muted}`} />
          </div>
          <p className={`mt-2 line-clamp-2 text-sm leading-relaxed ${cardTone.muted}`}>{getExcerpt(content.description || post.summary, 110) || 'Tap through for the full description and contact path.'}</p>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs">
            {content.location ? <span className={`inline-flex items-center gap-1 ${cardTone.muted}`}><MapPin className="h-3.5 w-3.5 shrink-0 text-[#a55233]" />{content.location}</span> : null}
            {content.email ? <span className={`inline-flex max-w-[200px] items-center gap-1 truncate ${cardTone.muted}`}><Mail className="h-3.5 w-3.5 shrink-0 text-[#a55233]" />{content.email}</span> : null}
          </div>
          <div className="mt-auto flex items-center justify-between gap-3 border-t border-dashed border-border/80 pt-4">
            <span className={`text-xs font-semibold uppercase tracking-[0.2em] ${cardTone.muted}`}>Listing</span>
            <span className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 group-hover:brightness-110 ${cardTone.cta}`}>
              {variant === 'classified' ? 'View listing' : 'View details'}
            </span>
          </div>
        </div>
      </Link>
    )
  }

  if (isBookmarkVariant) {
    return (
      <Link href={href} className={`group flex h-full flex-row items-start gap-4 overflow-hidden p-5 transition duration-300 ${visualVariant.frame}`}>
        <div className="mt-1 rounded-full bg-white/10 p-2.5 text-current transition group-hover:scale-105">
          <ExternalLink className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${visualVariant.badge}`}>
              <Tag className="h-3.5 w-3.5" />
              {category}
            </span>
            {content.location ? <span className={`inline-flex items-center gap-1 text-xs ${visualVariant.muted}`}><MapPin className="h-3.5 w-3.5" />{content.location}</span> : null}
          </div>
          <h3 className={`mt-3 line-clamp-2 text-lg font-semibold leading-snug group-hover:opacity-85 ${visualVariant.title}`}>{post.title}</h3>
          <p className={`mt-2 line-clamp-3 text-sm leading-7 ${visualVariant.muted}`}>{getExcerpt(content.description || post.summary, compact ? 120 : 180) || 'Explore this bookmark.'}</p>
          {content.email ? <div className={`mt-3 inline-flex items-center gap-1 text-xs ${visualVariant.muted}`}><Mail className="h-3.5 w-3.5" />{content.email}</div> : null}
        </div>
      </Link>
    )
  }

  return (
    <Link href={href} className={`group flex h-full flex-col overflow-hidden transition duration-300 ${visualVariant.frame}`}>
      <div className={`relative ${imageAspect} overflow-hidden bg-[#ede2dc]`}>
        <ContentImage src={image} alt={altText} fill sizes={imageSizes} quality={75} className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" intrinsicWidth={960} intrinsicHeight={720} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-80" />
        <span className={`absolute left-4 top-4 inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${visualVariant.badge}`}>
          <Tag className="h-3.5 w-3.5" />
          {category}
        </span>
        {variant === 'pdf' && <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/88 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-950 shadow"><FileText className="h-3.5 w-3.5" />PDF</span>}
      </div>
      <div className={`flex flex-1 flex-col p-5 ${compact ? 'py-4' : ''}`}>
        <h3 className={`line-clamp-2 font-semibold leading-snug ${variant === 'article' ? 'text-[1.35rem]' : 'text-lg'} ${visualVariant.title}`}>{post.title}</h3>
        <p className={`mt-3 text-sm leading-7 ${variant === 'article' ? 'line-clamp-4' : 'line-clamp-3'} ${visualVariant.muted}`}>{getExcerpt(content.description || post.summary) || 'Explore this post.'}</p>
        <div className="mt-auto pt-4">
          {content.location && <div className={`inline-flex items-center gap-1 text-xs ${visualVariant.muted}`}><MapPin className="h-3.5 w-3.5" />{content.location}</div>}
          {content.email && <div className={`mt-2 inline-flex items-center gap-1 text-xs ${visualVariant.muted}`}><Mail className="h-3.5 w-3.5" />{content.email}</div>}
        </div>
      </div>
    </Link>
  )
}
