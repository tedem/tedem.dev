import Container from '@/components/main/container';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Hero() {
  return (
    <section className="py-12 lg:py-16" id="hero">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            {/* Eyebrow */}
            <p className="text-muted-foreground mbe-6 flex items-center gap-1 font-mono text-[13px]">
              <span className="from-muted-foreground to-foreground h-px w-5 bg-linear-to-r" aria-hidden="true"></span>
              Thoughtful by design. Curious by default.
            </p>

            {/* Heading */}
            <h1 className="text-[clamp(5rem,10.6vw,9.375rem)] leading-none">
              <span className="font-extralight">Hi, I'm</span>
              <br />
              <span className="text-muted-foreground font-extrabold">Medet.</span>
            </h1>

            {/* Description */}
            <p className="text-muted-foreground mbs-8 mbe-7 max-w-lg text-base leading-relaxed tracking-tight text-balance md:text-lg">
              I turn curious ideas into considered digital experiences — from the first sketch to the final interaction.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="#work">
                  Explore my work
                  <ArrowDown aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="#about">
                  A little about me
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </div>

            <p className="text-muted-foreground mbs-7 font-mono text-[9px] tracking-widest uppercase">
              Designing for people, not pixels.
            </p>
          </div>

          <aside aria-label="A note about my approach">
            <Card className="size-full">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardDescription className="font-mono text-[9px] tracking-widest uppercase">
                  Field notes
                </CardDescription>
                <CardAction>
                  <Badge variant="outline">001</Badge>
                </CardAction>
              </CardHeader>
              <CardContent className="flex flex-1 justify-center">
                <p className="text-2xl leading-tight font-medium xl:text-4xl">
                  Good things happen
                  <br />
                  when <em className="font-serif font-normal text-emerald-500 dark:text-emerald-300">care</em> meets
                  <br />
                  curiosity.
                </p>
              </CardContent>
              <CardFooter>
                <CardDescription className="font-mono text-[9px] tracking-widest uppercase">
                  Craftsmanship
                </CardDescription>
              </CardFooter>
            </Card>
          </aside>
        </div>
      </Container>
    </section>
  );
}
