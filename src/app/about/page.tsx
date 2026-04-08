import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SITE_CONFIG } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'

const about = siteContent.about

export default function AboutPage() {
  return (
    <PageShell
      title={`About ${SITE_CONFIG.name}`}
      description={about.description(SITE_CONFIG.name)}
      actions={
        <>
          <Button variant="outline" asChild>
            <Link href="/classifieds">Browse classifieds</Link>
          </Button>
          <Button asChild>
            <Link href="/contact">Contact us</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-border bg-card">
          <CardContent className="space-y-4 p-6">
            <Badge variant="secondary">Our story</Badge>
            <h2 className="font-display text-2xl font-semibold text-foreground">{about.storyTitle}</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">{about.storyLead}</p>
            <div className="grid gap-4 sm:grid-cols-3">
              {about.highlights.map((item) => (
                <div key={item.label} className="rounded-xl border border-border bg-secondary/40 p-4">
                  <div className="text-xl font-semibold text-foreground">{item.value}</div>
                  <div className="text-xs text-muted-foreground">{item.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="space-y-4">
          {about.values.map((value) => (
            <Card key={value.title} className="border-border bg-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card className="mt-10 border-border bg-card">
        <CardContent className="p-6 sm:p-8">
          <h2 className="font-display text-xl font-semibold text-foreground">Who runs this site</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">{about.teamBlurb}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="outline" asChild>
              <Link href="/search">Search ads</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Post an ad</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </PageShell>
  )
}
