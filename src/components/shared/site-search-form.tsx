import { Search } from 'lucide-react'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { cn } from '@/lib/utils'

function searchTaskFilter(): TaskKey | null {
  const enabled = SITE_CONFIG.tasks.filter((t) => t.enabled)
  if (enabled.length !== 1) return null
  return enabled[0].key
}

type SiteSearchFormProps = {
  id?: string
  className?: string
  formClassName?: string
  inputClassName?: string
  buttonClassName?: string
  placeholder?: string
  buttonLabel?: string
  /** When true, the submit control is text (e.g. "Search") instead of an icon-only button. */
  textSubmit?: boolean
}

export function SiteSearchForm({
  id,
  className,
  formClassName,
  inputClassName,
  buttonClassName,
  placeholder = 'Search…',
  buttonLabel = 'Search',
  textSubmit = false,
}: SiteSearchFormProps) {
  const task = searchTaskFilter()

  return (
    <form method="get" action="/search" className={cn(className)} role="search">
      <input type="hidden" name="master" value="1" />
      {task ? <input type="hidden" name="task" value={task} /> : null}
      <div className={cn('flex min-w-0 w-full items-center gap-2', formClassName)}>
        <div className="relative min-w-0 flex-1">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-50"
            aria-hidden
          />
          <input
            id={id}
            type="search"
            name="q"
            enterKeyHint="search"
            autoComplete="off"
            aria-label={placeholder}
            placeholder={placeholder}
            className={cn(
              'h-10 w-full min-w-0 rounded-full border-0 bg-transparent pl-10 pr-3 text-sm outline-none ring-0 placeholder:text-current placeholder:opacity-55',
              inputClassName,
            )}
          />
        </div>
        {textSubmit ? (
          <button type="submit" className={cn('inline-flex shrink-0 items-center justify-center rounded-full text-sm font-semibold', buttonClassName)}>
            {buttonLabel}
          </button>
        ) : (
          <button type="submit" className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors', buttonClassName)} aria-label={buttonLabel}>
            <Search className="h-4 w-4" />
          </button>
        )}
      </div>
    </form>
  )
}
