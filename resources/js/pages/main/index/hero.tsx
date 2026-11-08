import Container from '@/components/main/container';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { ArrowDown, ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="py-12 lg:py-16" id="hero">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            {/* Eyebrow */}
            <p className="mbe-6 font-mono text-[13px]">
              <span className="text-muted-foreground">/**</span>
              <span className="mx-[1ch]">Thoughtful by design. Curious by default.</span>
              <span className="text-muted-foreground">*/</span>
            </p>

            {/* Heading */}
            <h1 className="text-[clamp(5rem,10.6vw,9.375rem)] leading-none">
              <span className="font-extralight tracking-[-0.075em]">Hi, I'm</span>
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
          </div>
        </div>
      </Container>
    </section>
  );
}
