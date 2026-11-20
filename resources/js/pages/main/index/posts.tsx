import Container from '@/components/main/container';
import { RefreshCcwIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Posts() {
  const handleRefresh = () => window.location.reload();

  return (
    <section className="border-border border-t" id="posts" aria-labelledby="posts-title">
      <Container border={true}>
        <div className="py-8 lg:py-16">
          <div className="grid grid-cols-1 gap-x-8 md:grid-cols-2 md:gap-x-16">
            {/* Headline */}
            <div className="mb-4 md:col-span-2">
              <p className="text-primary flex items-center gap-4 font-mono text-[10px]">
                ~/posts <span className="text-muted-foreground uppercase">Latest articles and thoughts</span>
              </p>
            </div>

            {/* Title */}
            <div>
              <h2
                id="posts-title"
                className="max-w-120 text-[clamp(2.625rem,6vw,4.375rem)] leading-none font-medium tracking-[-0.075em]"
              >
                Things I keep thinking about.
              </h2>
            </div>

            {/* Description */}
            <div className="justify-end max-md:mt-8 md:flex md:items-end">
              <p className="text-muted-foreground text-sm leading-7 text-pretty md:max-w-2xs">
                A few short notes on making, noticing, and finding a clearer way through.
              </p>
            </div>

            {/* Content */}
            <div className="mt-8 md:col-span-2 md:mt-16">
              <div className="bg-muted/30 grid gap-8 p-8 md:grid-cols-2">
                <p className="text-balance">
                  <span>No posts found.</span>
                  &nbsp;
                  <span className="text-muted-foreground">
                    They may be hiding, procrastinating, or stuck in draft purgatory.
                  </span>
                </p>
                <div className="md:flex md:items-center md:justify-end">
                  <Button variant="outline" onClick={handleRefresh}>
                    <RefreshCcwIcon data-icon="inline-start" />
                    Refresh
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
