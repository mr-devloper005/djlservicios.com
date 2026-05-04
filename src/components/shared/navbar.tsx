'use client'

import { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { Search, Menu, X, User, FileText, Building2, LayoutGrid, Tag, Image as ImageIcon, ChevronRight, Sparkles, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { cn } from '@/lib/utils'
import { siteContent } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'

const NavbarAuthControls = dynamic(() => import('@/components/shared/navbar-auth-controls').then((mod) => mod.NavbarAuthControls), {
  ssr: false,
  loading: () => null,
})

/** Horizontal brand mark (gold on black) — served from /public/brand */
const BRAND_LOGO_SRC = '/brand/djl-classifieds-logo.png'

function NavbarBrandLogo({ variant }: { variant: 'market' | 'light' }) {
  const isMarket = variant === 'market'
  return (
    <span
      className={cn(
        'relative flex shrink-0 items-center overflow-visible rounded-lg transition-[box-shadow,ring-color] duration-300',
        isMarket
          ? 'bg-black px-2.5 py-1.5 ring-1 ring-[#c9a227]/55 shadow-[0_4px_24px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.07),0_0_0_1px_rgba(0,0,0,0.4)] group-hover:ring-[#e6c65c]/85 group-hover:shadow-[0_8px_32px_rgba(0,0,0,0.55),0_0_28px_rgba(212,175,55,0.14)]'
          : 'bg-black px-2.5 py-1.5 ring-1 ring-[#b8860b]/40 shadow-[0_2px_14px_rgba(0,0,0,0.2)] group-hover:ring-[#c9a227]/65 group-hover:shadow-[0_4px_20px_rgba(0,0,0,0.28)]',
      )}
    >
      <img
        src={BRAND_LOGO_SRC}
        alt=""
        width={320}
        height={64}
        className={cn(
          'h-9 w-auto object-contain object-left sm:h-10 md:h-11',
          isMarket
            ? 'max-w-[min(72vw,268px)] sm:max-w-[290px] md:max-w-[310px]'
            : 'max-w-[min(72vw,240px)] sm:max-w-[270px] md:max-w-[290px]',
        )}
        sizes="(max-width: 640px) 72vw, 310px"
      />
    </span>
  )
}

function NavbarBrandText({ market }: { market: boolean }) {
  return (
    <div className="flex min-w-0 flex-col justify-center leading-tight">
      <span
        className={cn(
          'truncate font-display text-base font-semibold tracking-tight sm:text-lg md:text-xl',
          market ? 'text-[#faf3eb]' : 'text-foreground',
        )}
      >
        {SITE_CONFIG.name}
      </span>
      <span
        className={cn(
          'max-w-[12rem] truncate text-[10px] uppercase tracking-[0.2em] sm:max-w-[16rem] sm:text-[11px] md:max-w-none',
          market ? 'text-[#d8cec6]' : 'text-muted-foreground',
        )}
      >
        {siteContent.navbar.tagline}
      </span>
    </div>
  )
}

const taskIcons: Record<TaskKey, any> = {
  article: FileText,
  listing: Building2,
  sbm: LayoutGrid,
  classified: Tag,
  image: ImageIcon,
  profile: User,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

const variantClasses = {
  'compact-bar': {
    shell: 'border-b border-slate-200/80 bg-white/88 text-slate-950 backdrop-blur-xl',
    logo: 'rounded-2xl border border-slate-200 bg-white shadow-sm',
    active: 'bg-slate-950 text-white',
    idle: 'text-slate-600 hover:bg-slate-100 hover:text-slate-950',
    cta: 'rounded-full bg-slate-950 text-white hover:bg-slate-800',
    mobile: 'border-t border-slate-200/70 bg-white/95',
  },
  'editorial-bar': {
    shell: 'border-b border-[#d7c4b3] bg-[#fff7ee]/90 text-[#2f1d16] backdrop-blur-xl',
    logo: 'rounded-full border border-[#dbc6b6] bg-white shadow-sm',
    active: 'bg-[#2f1d16] text-[#fff4e4]',
    idle: 'text-[#72594a] hover:bg-[#f2e5d4] hover:text-[#2f1d16]',
    cta: 'rounded-full bg-[#2f1d16] text-[#fff4e4] hover:bg-[#452920]',
    mobile: 'border-t border-[#dbc6b6] bg-[#fff7ee]',
  },
  'floating-bar': {
    shell: 'border-b border-transparent bg-transparent text-white',
    logo: 'rounded-[1.35rem] border border-white/12 bg-white/8 shadow-[0_16px_48px_rgba(15,23,42,0.22)] backdrop-blur',
    active: 'bg-[#8df0c8] text-[#07111f]',
    idle: 'text-slate-200 hover:bg-white/10 hover:text-white',
    cta: 'rounded-full bg-[#8df0c8] text-[#07111f] hover:bg-[#77dfb8]',
    mobile: 'border-t border-white/10 bg-[#09101d]/96',
  },
  'utility-bar': {
    shell: 'border-b border-[#d7deca] bg-[#f4f6ef]/94 text-[#1f2617] backdrop-blur-xl',
    logo: 'rounded-xl border border-[#d7deca] bg-white shadow-sm',
    active: 'bg-[#1f2617] text-[#edf5dc]',
    idle: 'text-[#56604b] hover:bg-[#e7edd9] hover:text-[#1f2617]',
    cta: 'rounded-lg bg-[#1f2617] text-[#edf5dc] hover:bg-[#2f3a24]',
    mobile: 'border-t border-[#d7deca] bg-[#f4f6ef]',
  },
} as const

const directoryPalette = {
  'directory-clean': {
    shell: 'border-b border-slate-200 bg-white/94 text-slate-950 shadow-[0_1px_0_rgba(15,23,42,0.04)] backdrop-blur-xl',
    logo: 'rounded-2xl border border-slate-200 bg-slate-50',
    nav: 'text-slate-600 hover:text-slate-950',
    search: 'border border-slate-200 bg-slate-50 text-slate-600',
    cta: 'bg-slate-950 text-white hover:bg-slate-800',
    post: 'border border-slate-200 bg-white text-slate-950 hover:bg-slate-50',
    mobile: 'border-t border-slate-200 bg-white',
  },
  'market-utility': {
    shell: 'border-b border-[#1d1716] bg-[#402a23] text-[#faf3eb] shadow-[0_4px_20px_rgba(29,23,22,0.25)]',
    logo: 'rounded-xl border border-[#f3bc77]/35 bg-[#1d1716]/55 shadow-[inset_0_1px_0_rgba(243,188,119,0.12)]',
    brandTitle: 'text-[#faf3eb]',
    brandTagline: 'text-[#c9b8ad]',
    nav: 'text-[#e8ddd4] hover:text-[#f3bc77]',
    navActive: 'text-[#f3bc77]',
    searchWrap:
      'flex w-full max-w-xl items-stretch gap-0 overflow-hidden rounded-full border border-[#f3bc77]/35 bg-[#1d1716]/65 shadow-[inset_0_1px_0_rgba(0,0,0,0.2)]',
    searchInput:
      'min-w-0 flex-1 border-0 bg-transparent py-2.5 pl-2 pr-2 text-sm text-[#faf3eb] outline-none placeholder:text-[#9a8b82] focus:ring-0',
    searchSubmit:
      'shrink-0 rounded-full bg-[#f3bc77] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#1d1716] transition hover:bg-[#e8ad65]',
    cta: 'bg-[#a55233] text-[#fffefb] shadow-md shadow-black/20 hover:bg-[#8e4529]',
    ghost: 'text-[#faf3eb] hover:bg-white/10 hover:text-white',
    post: 'text-[#e8ddd4] hover:bg-[#1d1716]/40 hover:text-[#f3bc77]',
    postActive: 'bg-[#f3bc77] text-[#1d1716] hover:bg-[#f3bc77]',
    mobile: 'border-t border-[#1d1716] bg-[#35221c]',
  },
} as const

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { isAuthenticated } = useAuth()
  const { recipe } = getFactoryState()
  const searchDefaultQ = searchParams.get('q') ?? ''

  const navigation = useMemo(() => SITE_CONFIG.tasks.filter((task) => task.enabled && task.key !== 'profile'), [])
  const primaryNavigation = navigation.slice(0, 5)
  const mobileNavigation = navigation.map((task) => ({
    name: task.label,
    href: task.route,
    icon: taskIcons[task.key] || LayoutGrid,
  }))
  const primaryTask = SITE_CONFIG.tasks.find((task) => task.key === recipe.primaryTask && task.enabled) || primaryNavigation[0]
  const isDirectoryProduct = recipe.homeLayout === 'listing-home' || recipe.homeLayout === 'classified-home'

  if (isDirectoryProduct) {
    const palette = directoryPalette[(recipe.brandPack === 'market-utility' ? 'market-utility' : 'directory-clean') as keyof typeof directoryPalette]
    const isMarketBar = recipe.brandPack === 'market-utility'

    const searchForm = (opts: { className?: string; rounded?: 'full' | '2xl' }) => (
      <form
        action="/search"
        method="get"
        className={cn(
          isMarketBar ? palette.searchWrap : 'flex w-full items-stretch gap-2 rounded-full border border-border bg-secondary/80',
          opts.rounded === '2xl' && isMarketBar && 'rounded-2xl',
          opts.className,
        )}
        onSubmit={() => setIsMobileMenuOpen(false)}
      >
        <input type="hidden" name="master" value="1" />
        <input type="hidden" name="task" value={siteContent.nav.searchTaskScoped} />
        <div className="flex min-w-0 flex-1 items-center gap-2 pl-3">
          <Search className={cn('h-4 w-4 shrink-0', isMarketBar ? 'text-[#b5a89e]' : 'text-muted-foreground')} aria-hidden />
          <input
            type="search"
            name="q"
            key={searchDefaultQ}
            defaultValue={searchDefaultQ}
            placeholder={siteContent.nav.searchPlaceholder}
            aria-label={siteContent.nav.searchAriaLabel}
            className={cn(
              isMarketBar ? palette.searchInput : 'h-10 min-w-0 flex-1 border-0 bg-transparent text-sm outline-none placeholder:text-muted-foreground',
            )}
          />
        </div>
        <button type="submit" className={cn(isMarketBar ? palette.searchSubmit : 'rounded-full bg-primary px-4 text-xs font-semibold text-primary-foreground')}>
          {siteContent.nav.searchSubmit}
        </button>
      </form>
    )

    return (
      <header className={cn('sticky top-0 z-50 w-full', palette.shell)}>
        <nav className="mx-auto flex min-h-[4.25rem] max-w-7xl items-center justify-between gap-3 px-4 py-2.5 sm:min-h-[4.5rem] sm:px-6 lg:gap-4 lg:px-8">
          <div className="flex min-w-0 items-center gap-3 lg:gap-4">
            <Link
              href="/"
              className={cn(
                'group flex min-w-0 shrink-0 items-center gap-2.5 sm:gap-3.5 outline-none focus-visible:rounded-lg focus-visible:ring-2 focus-visible:ring-[#d4af37]/55 focus-visible:ring-offset-2',
                isMarketBar ? 'focus-visible:ring-offset-[#402a23]' : 'focus-visible:ring-offset-background',
              )}
            >
              <NavbarBrandLogo variant={isMarketBar ? 'market' : 'light'} />
              <NavbarBrandText market={isMarketBar} />
            </Link>

            <div className="hidden items-center gap-4 xl:flex">
              {primaryNavigation.slice(0, 4).map((task) => {
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link
                    key={task.key}
                    href={task.route}
                    className={cn(
                      'text-sm font-semibold transition-colors',
                      isActive ? (isMarketBar ? palette.navActive : 'text-foreground') : palette.nav,
                    )}
                  >
                    {task.label}
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="hidden min-w-0 flex-1 justify-center px-2 lg:flex">{searchForm({})}</div>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            {primaryTask ? (
              <Link
                href={primaryTask.route}
                className={cn(
                  'hidden items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] md:inline-flex',
                  isMarketBar ? 'border-[#f3bc77]/35 text-[#e8ddd4] hover:border-[#f3bc77]/55 hover:text-[#f3bc77]' : 'border-current/10 opacity-75',
                )}
              >
                <Sparkles className="h-3.5 w-3.5" />
                {primaryTask.label}
              </Link>
            ) : null}

            {isAuthenticated ? (
              <NavbarAuthControls />
            ) : (
              <div className="hidden items-center gap-2 md:flex">
                <Button variant="ghost" size="sm" asChild className={cn('rounded-full px-4', isMarketBar && palette.ghost)}>
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button size="sm" asChild className={cn('rounded-full', palette.cta)}>
                  <Link href="/register">
                    <Plus className="mr-1 h-4 w-4" />
                    Post ad
                  </Link>
                </Button>
              </div>
            )}

            <Button variant="ghost" size="icon" className={cn('rounded-full lg:hidden', isMarketBar && palette.ghost)} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>

        {isMobileMenuOpen && (
          <div className={palette.mobile}>
            <div className="space-y-3 px-4 py-4">
              {searchForm({ className: 'w-full', rounded: '2xl' })}
              {mobileNavigation.map((item) => {
                const isActive = pathname.startsWith(item.href)
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors',
                      isActive && isMarketBar ? palette.postActive : isActive ? 'bg-foreground text-background' : palette.post,
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </header>
    )
  }

  const style = variantClasses[recipe.navbar]
  const isFloating = recipe.navbar === 'floating-bar'
  const isEditorial = recipe.navbar === 'editorial-bar'
  const isUtility = recipe.navbar === 'utility-bar'

  return (
    <header className={cn('sticky top-0 z-50 w-full', style.shell)}>
      <nav className={cn('mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8', isFloating ? 'h-24 pt-4' : 'h-20')}>
        <div className="flex min-w-0 flex-1 items-center gap-4 lg:gap-7">
          <Link
            href="/"
            className="group flex min-w-0 shrink-0 items-center gap-2.5 whitespace-normal pr-2 outline-none focus-visible:rounded-lg focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 sm:gap-3.5"
          >
            <NavbarBrandLogo variant="light" />
            <NavbarBrandText market={false} />
          </Link>

          {isEditorial ? (
            <div className="hidden min-w-0 flex-1 items-center gap-4 xl:flex">
              <div className="h-px flex-1 bg-[#d8c8bb]" />
              {primaryNavigation.map((task) => {
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link key={task.key} href={task.route} className={cn('text-sm font-semibold uppercase tracking-[0.18em] transition-colors', isActive ? 'text-[#2f1d16]' : 'text-[#7b6254] hover:text-[#2f1d16]')}>
                    {task.label}
                  </Link>
                )
              })}
              <div className="h-px flex-1 bg-[#d8c8bb]" />
            </div>
          ) : isFloating ? (
            <div className="hidden min-w-0 flex-1 items-center gap-2 xl:flex">
              {primaryNavigation.map((task) => {
                const Icon = taskIcons[task.key] || LayoutGrid
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link key={task.key} href={task.route} className={cn('flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors', isActive ? style.active : style.idle)}>
                    <Icon className="h-4 w-4" />
                    <span>{task.label}</span>
                  </Link>
                )
              })}
            </div>
          ) : isUtility ? (
            <div className="hidden min-w-0 flex-1 items-center gap-2 xl:flex">
              {primaryNavigation.map((task) => {
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link key={task.key} href={task.route} className={cn('rounded-lg px-3 py-2 text-sm font-semibold transition-colors', isActive ? style.active : style.idle)}>
                    {task.label}
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="hidden min-w-0 flex-1 items-center gap-1 overflow-hidden xl:flex">
              {primaryNavigation.map((task) => {
                const Icon = taskIcons[task.key] || LayoutGrid
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link key={task.key} href={task.route} className={cn('flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-colors whitespace-nowrap', isActive ? style.active : style.idle)}>
                    <Icon className="h-4 w-4" />
                    <span>{task.label}</span>
                  </Link>
                )
              })}
            </div>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {primaryTask && (recipe.navbar === 'utility-bar' || recipe.navbar === 'floating-bar') ? (
            <Link href={primaryTask.route} className="hidden items-center gap-2 rounded-full border border-current/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] opacity-80 md:inline-flex">
              <Sparkles className="h-3.5 w-3.5" />
              {primaryTask.label}
            </Link>
          ) : null}

          <Button variant="ghost" size="icon" asChild className="hidden rounded-full md:flex">
            <Link href="/search">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Link>
          </Button>

          {isAuthenticated ? (
            <NavbarAuthControls />
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Button variant="ghost" size="sm" asChild className="rounded-full px-4">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button size="sm" asChild className={style.cta}>
                <Link href="/register">{isEditorial ? 'Subscribe' : isUtility ? 'Post Now' : 'Get Started'}</Link>
              </Button>
            </div>
          )}

          <Button variant="ghost" size="icon" className="rounded-full lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {isFloating && primaryTask ? (
        <div className="mx-auto hidden max-w-7xl px-4 pb-3 sm:px-6 lg:block lg:px-8">
          <Link href={primaryTask.route} className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200 backdrop-blur hover:bg-white/12">
            Featured surface
            <span>{primaryTask.label}</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      ) : null}

      {isMobileMenuOpen && (
        <div className={style.mobile}>
          <div className="space-y-2 px-4 py-4">
            <Link href="/search" onClick={() => setIsMobileMenuOpen(false)} className="mb-3 flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-sm font-semibold text-muted-foreground">
              <Search className="h-4 w-4" />
              Search the site
            </Link>
            {mobileNavigation.map((item) => {
              const isActive = pathname.startsWith(item.href)
              return (
                <Link key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className={cn('flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors', isActive ? style.active : style.idle)}>
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}
