import Container from '@/components/main/container';
import type { ReactElement } from 'react';
import { CornerDownRight } from 'lucide-react';

export default function Approach() {
  const principles = [
    {
      number: '01',
      title: 'Find the real question.',
      detail: 'Listen closely, make sense of the moving parts, and agree on what matters before making anything.',
    },
    {
      number: '02',
      title: 'Make it feel inevitable.',
      detail: 'Give the idea a clear shape through considered design, useful technology, and a little restraint.',
    },
    {
      number: '03',
      title: 'Refine until it feels right.',
      detail: 'Fine-tune interactions, remove friction, and give the final details the attention they deserve.',
    },
  ];

  const principleItems: ReactElement[] = [];

  principles.forEach((principle) => {
    principleItems.push(
      <li className="grid grid-cols-12 gap-4 py-8 md:gap-8" key={principle.number}>
        <div className="col-span-12 flex items-center md:col-span-2">
          <span className="font-mono text-[13px] tabular-nums">
            {principle.number} / {String(principles.length).padStart(2, '0')}
          </span>
        </div>
        <div className="col-span-12 flex items-center md:col-span-4">
          <h3 className="text-lg">{principle.title}</h3>
        </div>
        <div className="col-span-12 flex items-center md:col-span-5">
          <p className="text-muted-foreground text-sm text-balance">{principle.detail}</p>
        </div>
        <div className="col-span-12 flex items-center justify-end max-md:hidden md:col-span-1">
          <CornerDownRight className="text-muted-foreground/50" aria-hidden="true" />
        </div>
      </li>,
    );
  });

  return (
    <section className="border-border border-t" id="approach" aria-labelledby="approach-title">
      <Container border={true}>
        <div className="py-8 lg:py-16">
          <div className="grid grid-cols-1 gap-x-8 md:grid-cols-2 md:gap-x-16">
            {/* Headline */}
            <div className="mb-4 md:col-span-2">
              <p className="text-primary flex items-center gap-4 font-mono text-[10px]">
                ~/approach <span className="text-muted-foreground uppercase">Small steps, thoughtful outcomes</span>
              </p>
            </div>

            {/* Title */}
            <div>
              <h2
                id="approach-title"
                className="max-w-120 text-[clamp(2.625rem,6vw,4.375rem)] leading-none font-medium tracking-[-0.075em]"
              >
                Thought first. <span className="text-muted-foreground">Craft always.</span>
              </h2>
            </div>

            {/* Description */}
            <div className="justify-end max-md:mt-8 md:flex md:items-end">
              <p className="text-muted-foreground text-sm leading-7 text-pretty md:max-w-2xs">
                A clear process makes room for good surprises. Here's how I like to get there.
              </p>
            </div>

            {/* Content */}
            <div className="mt-8 md:col-span-2 md:mt-16">
              <ul className="divide-accent border-accent divide-y border-y">{principleItems}</ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
