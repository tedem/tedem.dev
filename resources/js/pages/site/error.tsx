import Container from '@/components/site/container';
import { Button } from '@/components/ui/button';
import { useMessages, useRoutes, useSitePages } from '@/i18n';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

/*
 * The site's error page, rendered by App\Exceptions\RenderErrorPage for 403, 404,
 * and (outside debug mode) 500 and 503. The requested path is shown as a shell
 * command that failed, in the same terminal voice as the rest of the site.
 */

type Status = 403 | 404 | 500 | 503;

const focusRing =
  'rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

export default function ErrorPage({ status }: { status: Status }) {
  const { url } = usePage();
  const path = url.split(/[?#]/)[0];
  const t = useMessages();
  const routes = useRoutes();
  const pages = useSitePages();
  const { title, message, shell } = t.errors[status] ?? t.errors[500];

  return (
    <>
      <Head title={`${status} ${title}`} />

      <Container border={true}>
        <div className="flex min-h-[calc(100lvh-8rem)] flex-col justify-center py-16 lg:py-24">
          {/* The failed "command": decoration that restates the heading, so hidden from assistive tech. */}
          <div aria-hidden="true" className="border-border bg-muted/30 max-w-2xl border font-mono text-xs">
            <p className="border-border text-muted-foreground border-b px-4 py-2">tedem@web ~ zsh</p>
            <div className="flex flex-col gap-1 p-4 break-all">
              <p>
                <span className="text-primary">$</span> cd {path}
              </p>
              <p className="text-destructive">{shell(path)}</p>
              <p>
                <span className="text-primary">$</span> <span className="motion-safe:animate-pulse">▍</span>
              </p>
            </div>
          </div>

          <p className="text-muted-foreground mt-12 font-mono text-sm tabular-nums">{t.errors.label(status)}</p>
          <h1 className="mt-2 text-[clamp(2.75rem,8vw,6rem)] leading-none font-medium tracking-[-0.075em] text-balance">
            {title}
          </h1>
          <p className="text-muted-foreground mt-6 max-w-xl text-base leading-8 text-pretty">{message}</p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link href={routes.home().url}>
                <ArrowLeft aria-hidden="true" />
                {t.common.backHome}
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href={routes.contact().url}>
                {t.errors.reportProblem}
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>

          <nav aria-labelledby="error-nav-title" className="mt-16">
            <h2 id="error-nav-title" className="text-muted-foreground font-mono text-xs font-normal">
              {t.errors.tryThese}
            </h2>
            <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
              {pages.map(({ code, label, href }) => (
                <li key={href}>
                  <Link href={href} className={`hover:text-primary font-mono text-sm transition-colors ${focusRing}`}>
                    <span aria-hidden="true">{code}</span>
                    <span className="sr-only">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </>
  );
}
