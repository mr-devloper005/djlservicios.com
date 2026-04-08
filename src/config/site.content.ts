import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  nav: {
    searchPlaceholder: 'Search ads by title, item, or keyword…',
    searchAriaLabel: 'Search classifieds',
    searchSubmit: 'Search',
    /** Scoped to classified posts in the master index when present */
    searchTaskScoped: 'classified' as const,
  },
  navbar: {
    tagline: 'Local classifieds & services',
  },
  footer: {
    tagline: 'Honest listings from your community',
  },
  hero: {
    badge: 'Fresh local ads',
    title: ['Find what you need', 'in your area—fast.'],
    description:
      'Browse real classified ads for jobs, housing, services, vehicles, and goods. Search by keyword or category and contact sellers directly.',
    primaryCta: {
      label: 'Browse classifieds',
      href: '/classifieds',
    },
    secondaryCta: {
      label: 'Search everything',
      href: '/search',
    },
    searchPlaceholder: 'Try “plumber”, “sofa”, “part-time”…',
    focusLabel: 'Category',
    featureCardBadge: 'Updated regularly',
    featureCardTitle: 'New and featured ads shape what you see first.',
    featureCardDescription:
      'Latest listings from the community stay easy to scan, with photos and details up front.',
  },
  directoryHome: {
    heroBadge: 'Community classifieds',
    heroTitle: 'Buy, sell, hire, and rent—without the noise of giant marketplaces.',
    heroStats: [
      ['Active board', 'Listings from real people nearby'],
      ['Straight talk', 'Titles and prices you can scan in seconds'],
      ['Reach sellers', 'Contact details shown when provided'],
    ] as const,
    searchPanelEyebrow: 'Find something',
    searchPanelTitle: 'Search the whole board or jump to a category.',
    searchPanelSubtitle:
      'Keyword search looks through classified titles and descriptions. Category filter opens the classifieds page filtered for you.',
    searchKeywordLabel: 'Keywords',
    searchCategoryLabel: 'Category',
    searchCategoryAll: 'All categories',
    searchCategorySubmit: 'View category',
    latestEyebrow: 'Just posted',
    latestTitle: 'Latest classified ads',
    latestSubtitle:
      'The most recent ads from our feed—the same list you will see on the classifieds page, ordered for a quick read.',
    trustEyebrow: 'Why use this site',
    trustTitle: 'Built for locals, not for endless scrolling.',
    trustBullets: [
      'We focus on one thing: clear classified ads with useful detail and photos when sellers add them.',
      'You can search by keyword or narrow by category before you open a full ad.',
      'Posting is straightforward—sign in, add your ad, and keep your contact info accurate so buyers can reach you.',
    ] as const,
    cardFallbackSummary: 'Open the ad for the full description, photos, and how to get in touch.',
  },
  home: {
    metadata: {
      title: 'Local classifieds—jobs, services, items for sale',
      description:
        'Browse and post classified ads in your area: services, jobs, housing, vehicles, and more. Simple search, clear listings, direct contact.',
      openGraphTitle: 'Local classifieds on DJL Servicios',
      openGraphDescription:
        'Find and post real classified ads—services, jobs, goods, and local deals—in one straightforward board.',
      keywords: [
        'classified ads',
        'local classifieds',
        'services',
        'jobs',
        'for sale',
        'local marketplace',
        'community listings',
      ],
    },
    introBadge: 'About this site',
    introTitle: 'A straightforward place for local ads.',
    introParagraphs: [
      'This site exists to help neighbors and businesses post what they are offering or looking for—without burying it in unrelated content.',
      'Whether you need a handyman, are selling furniture, hiring part-time help, or advertising a service, your ad belongs in one clear stream.',
      'Use search when you know what you want, or browse categories when you are exploring.',
    ],
    sideBadge: 'Quick facts',
    sidePoints: [
      'Classified-first layout: every card is built to show what matters at a glance.',
      'Keyword search across live ads from our index.',
      'Categories help you narrow results without extra clutter.',
      'Mobile-friendly so you can browse or post from your phone.',
    ],
    primaryLink: {
      label: 'Go to classifieds',
      href: '/classifieds',
    },
    secondaryLink: {
      label: 'Search ads',
      href: '/search',
    },
  },
  searchPage: {
    title: 'Search classifieds',
    emptyBrowseDescription: 'Browse the latest classified ads or enter a search term.',
    withQueryDescription: (q: string) => `Results matching “${q}” across classifieds.`,
  },
  cta: {
    badge: 'Post an ad',
    title: 'Have something to sell, offer, or advertise?',
    description:
      'Create a free account, write a clear title and description, add a fair price if it applies, and publish. Buyers search the same board you see on the homepage.',
    primaryCta: {
      label: 'Create account',
      href: '/register',
    },
    secondaryCta: {
      label: 'Contact us',
      href: '/contact',
    },
  },
  taskSectionHeading: 'Latest {label}',
  taskSectionDescriptionSuffix: 'Newest posts in this section.',
  about: {
    description: (name: string) =>
      `${name} runs a community classifieds board: real ads for services, jobs, items, and local opportunities—organized so you can find or post quickly.`,
    storyTitle: 'Local ads, clearly organized.',
    storyLead:
      'We set this site up so people in the area can post and find classified ads in one trusted place—without wading through unrelated feeds or fake urgency.',
    highlights: [
      { label: 'Focus', value: 'Classifieds only' },
      { label: 'Audience', value: 'Local & regional' },
      { label: 'Posting', value: 'Account-based' },
    ],
    values: [
      {
        title: 'Clarity first',
        description: 'Ads are meant to be read quickly: what it is, where it is, and how to respond.',
      },
      {
        title: 'Respect your time',
        description: 'Search and categories exist so you are not stuck scrolling unrelated content.',
      },
      {
        title: 'Honest listings',
        description: 'We encourage accurate descriptions and real contact details so deals can happen safely and simply.',
      },
    ],
    teamBlurb:
      'A small team keeps this board running: we review reports, help posters with account issues, and improve search and categories so the site stays useful for neighbors and local businesses.',
  },
  classifiedIndex: {
    heading: 'Browse live classified ads',
    subheading:
      'These are real listings from our index—same posts as on the home page. Use category filters on this page or open search to type what you need.',
    pillars: [
      {
        title: 'Made to scan',
        body: 'Photos, titles, and prices (when provided) show up front so you can decide what to open.',
      },
      {
        title: 'Honest categories',
        body: 'Filter by category to stay in the lane you care about—jobs, services, items, and more.',
      },
      {
        title: 'Direct contact',
        body: 'Sellers add phone, email, or links on their ad. Reach out through those channels like any local classifieds board.',
      },
    ] as const,
  },
  contact: {
    directoryTitle: 'Get in touch',
    directoryLead:
      'Questions about posting an ad, reporting a problem, or partnering with us? Pick the lane that fits and send a message—we read everything.',
    directoryLanes: [
      {
        title: 'Posting & accounts',
        body: 'Help signing up, editing an ad, photos not showing, or verifying your listing.',
      },
      {
        title: 'Safety & reports',
        body: 'Report suspicious ads, spam, or content that breaks our posting guidelines.',
      },
      {
        title: 'Business & partnerships',
        body: 'Local businesses wanting featured placement, bulk posting, or regional coverage.',
      },
    ],
    formTitle: 'Send a message',
    formNote:
      'This form is for inquiries only. For buying or selling, use the contact information on each ad.',
  },
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Articles and stories',
    description: 'Read articles, stories, guides, and long-form posts across topics and interests.',
  },
  listing: {
    title: 'Business listings',
    description: 'Browse verified businesses and service providers in one place.',
  },
  classified: {
    title: 'Classified ads',
    description:
      'Browse local classifieds: services, jobs, items for sale, housing, and more. Filter by category or open an ad for full details.',
  },
  image: {
    title: 'Image sharing and visual posts',
    description: 'Explore image-led posts, galleries, and visual stories from across the platform.',
  },
  profile: {
    title: 'Profiles and public pages',
    description: 'Discover public profiles, brand pages, and identity-focused posts in one place.',
  },
  sbm: {
    title: 'Curated links and saved resources',
    description: 'Browse useful links, saved references, and curated resources organized for discovery.',
  },
  pdf: {
    title: 'PDFs and downloadable resources',
    description: 'Open reports, documents, and downloadable resources shared across the platform.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: {
    title: 'Business listings',
    paragraphs: [
      'Browse structured business and service listings when this section is enabled.',
      'Each entry is organized to show what the business offers and how to reach them.',
      'Use categories to compare similar providers in one view.',
    ],
    links: [
      { label: 'Classifieds', href: '/classifieds' },
      { label: 'Search', href: '/search' },
    ],
  },
  article: {
    title: 'Articles and long-form reading',
    paragraphs: [
      'This section hosts stories, guides, and editorial content when enabled.',
      'Articles can complement classifieds by giving context, tips, or local news.',
      'Browse by topic or search when you are looking for something specific.',
    ],
    links: [
      { label: 'Classifieds', href: '/classifieds' },
      { label: 'Search', href: '/search' },
    ],
  },
  classified: {
    title: 'How classifieds work here',
    paragraphs: [
      'Every ad is a single post: a title, description, optional price, category, and photos when the seller adds them. You can search the whole board or filter by category from the menu above.',
      'When you find something interesting, open the ad for the full text and any phone, email, or link the seller provided. Always deal carefully: meet in safe places for handoffs and verify details before you pay.',
      'To post your own ad, register or sign in, choose classifieds, and fill out the form. Honest titles and accurate contact info help serious buyers find you faster.',
    ],
    links: [
      { label: 'Search all ads', href: '/search' },
      { label: 'About us', href: '/about' },
      { label: 'Contact support', href: '/contact' },
    ],
  },
  image: {
    title: 'Image-led posts',
    paragraphs: [
      'Visual posts and galleries appear here when image sharing is enabled.',
      'Use this section when photos are the main way to understand what is offered.',
      'Classifieds may also include images—check both sections when browsing.',
    ],
    links: [
      { label: 'Classifieds', href: '/classifieds' },
      { label: 'Search', href: '/search' },
    ],
  },
  profile: {
    title: 'Profiles',
    paragraphs: [
      'Public profiles help you learn who is behind a listing or brand.',
      'When enabled, browse profiles to see more from repeat sellers or local businesses.',
      'Classified ads may link to profile or contact details on the ad itself.',
    ],
    links: [
      { label: 'Classifieds', href: '/classifieds' },
      { label: 'Search', href: '/search' },
    ],
  },
  sbm: {
    title: 'Bookmarks and resources',
    paragraphs: [
      'Saved links and resource collections live here when bookmarking is enabled.',
      'Useful for reference material alongside browsing classifieds.',
    ],
    links: [
      { label: 'Classifieds', href: '/classifieds' },
      { label: 'Search', href: '/search' },
    ],
  },
  pdf: {
    title: 'Documents and PDFs',
    paragraphs: [
      'Downloadable files and documents are listed here when the PDF library is on.',
      'Helpful for contracts, menus, brochures, or guides related to local services.',
    ],
    links: [
      { label: 'Classifieds', href: '/classifieds' },
      { label: 'Search', href: '/search' },
    ],
  },
  social: {
    title: 'Short updates',
    paragraphs: [
      'Quick updates and community signals appear here when enabled.',
      'Often used alongside longer-form content or classifieds.',
    ],
    links: [
      { label: 'Classifieds', href: '/classifieds' },
      { label: 'Search', href: '/search' },
    ],
  },
  comment: {
    title: 'Comments',
    paragraphs: [
      'Discussion tied to articles or posts when commenting is enabled.',
    ],
    links: [
      { label: 'Classifieds', href: '/classifieds' },
      { label: 'Search', href: '/search' },
    ],
  },
  org: {
    title: 'Organizations',
    paragraphs: [
      'Team and organization pages provide structured identity for groups when enabled.',
    ],
    links: [
      { label: 'Classifieds', href: '/classifieds' },
      { label: 'Search', href: '/search' },
    ],
  },
}
