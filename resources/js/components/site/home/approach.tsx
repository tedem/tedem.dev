import Container from '@/components/site/container';
import SectionHeader from '@/components/site/section-header';
import { PRINCIPLES, type Principle } from '@/content/profile';
import { CornerDownRight } from 'lucide-react';

const pad = (value: number) => String(value).padStart(2, '0');

function PrincipleItem({ index, total, title, detail }: Principle & { index: number; total: number }) {
  return (
    <li className="grid grid-cols-12 items-center gap-4 py-8 md:gap-8">
      {/* The <ol> already announces "1 of 3", so the visual counter is hidden from assistive tech. */}
      <span aria-hidden="true" className="col-span-12 font-mono text-[13px] tabular-nums md:col-span-2">
        {pad(index + 1)} / {pad(total)}
      </span>

      <h3 className="col-span-12 text-lg md:col-span-4">{title}</h3>

      <p className="text-muted-foreground col-span-12 text-sm text-balance md:col-span-5">{detail}</p>

      <CornerDownRight
        className="text-muted-foreground/50 col-span-1 justify-self-end max-md:hidden"
        aria-hidden="true"
      />
    </li>
  );
}

export default function Approach() {
  return (
    <section className="border-border border-t" id="approach" aria-labelledby="approach-title">
      <Container border={true}>
        <div className="py-8 lg:py-16">
          <SectionHeader
            id="approach-title"
            path="approach"
            tagline="Small steps, thoughtful outcomes"
            title={
              <>
                Thought first. <span className="text-muted-foreground">Craft always.</span>
              </>
            }
            description="A clear process makes room for good surprises. Here's how I like to get there."
          />

          {/* An ordered list: the steps really are a sequence. role="list" keeps the semantics in Safari. */}
          <ol role="list" className="divide-accent border-accent mt-8 divide-y border-y md:mt-16">
            {PRINCIPLES.map((principle, index) => (
              <PrincipleItem key={principle.title} index={index} total={PRINCIPLES.length} {...principle} />
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
