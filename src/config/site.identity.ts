export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || 'dj6x4q8m2v',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'DJL Servicios',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Local classifieds & services',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'Post and browse real classified ads in your area: home services, jobs, items for sale, rentals, and local deals. Search by keyword, filter by category, and contact sellers directly from each listing.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'djlservicios.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://djlservicios.com',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || 'AIzaSyBco7dIECu3rJWjP3J0MImnR_uxlbeqAe0',

} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: '/placeholder.svg?height=80&width=80',
} as const

