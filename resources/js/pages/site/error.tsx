import Container from '@/components/site/container';
import { Button } from '@/components/ui/button';
import { about, contact, home, posts } from '@/routes';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

/*
 * The site's error page, rendered by App\Exceptions\RenderErrorPage for 403, 404,
 * and (outside debug mode) 500 and 503. The requested path is shown as a shell
 * command that failed, in the same terminal voice as the rest of the site.
 */

type Status = 403 | 404 | 500 | 503;

type ErrorCopy = {
  title: string;
  message: string;
  /** What the "shell" answers when you try to open the path. */
  shell: (path: string) => string;
};

const COPY: Record<Status, ErrorCopy> = {
  403: {
    title: 'Access denied',
    message: "This page exists, but you don't have access to it.",
    shell: (path) => `cd: ${path}: Permission denied`,
  },
  404: {
    title: 'Page not found',
    message: 'The page you are looking for does not exist or has moved.',
    shell: (path) => `cd: ${path}: No such file or directory`,
  },
  500: {
    title: 'Something went wrong',
    message: 'An error on my side stopped this page from loading. Please try again in a moment.',
    shell: (path) => `${path}: process exited with code 1`,
  },
  503: {
    title: 'Back soon',
    message: 'The site is down for maintenance. Please check back in a few minutes.',
    shell: (path) => `${path}: service unavailable`,
  },
};

const PAGES = [
  { code: '~/', label: 'Home', href: home().url },
  { code: '~/about', label: 'About', href: about().url },
  { code: '~/posts', label: 'Posts', href: posts().url },
  { code: '~/contact', label: 'Contact', href: contact().url },
] as const;

const focusRing =
  'rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

export default function ErrorPage({ status }: { status: Status }) {
  const { url } = usePage();
  const path = url.split(/[?#]/)[0];
  const { title, message, shell } = COPY[status] ?? COPY[500];

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

          <p className="text-muted-foreground mt-12 font-mono text-sm tabular-nums">Error {status}</p>
          <h1 className="mt-2 text-[clamp(2.75rem,8vw,6rem)] leading-none font-medium tracking-[-0.075em] text-balance">
            {title}
          </h1>
          <p className="text-muted-foreground mt-6 max-w-xl text-base leading-8 text-pretty">{message}</p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link href={home().url}>
                <ArrowLeft aria-hidden="true" />
                Back home
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href={contact().url}>
                Report a problem
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>

          <nav aria-labelledby="error-nav-title" className="mt-16">
            <h2 id="error-nav-title" className="text-muted-foreground font-mono text-xs font-normal">
              Or try one of these
            </h2>
            <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
              {PAGES.map(({ code, label, href }) => (
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
