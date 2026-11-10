import Container from '@/components/main/container';
import { Badge } from '@/components/ui/badge';

const focusAreas = ['Frontend', 'Backend', 'Interface design', 'Creative coding'];

export default function About() {
  return (
    <section className="border-border border-t" id="about" aria-labelledby="about-title">
      <Container border={true}>
        <div className="py-8 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <p className="text-primary mb-4 flex items-center gap-4 font-mono text-[10px]">
                ~/about <span className="text-muted-foreground uppercase">The person behind the pixels</span>
              </p>
              <h2
                id="about-title"
                className="max-w-120 text-[clamp(2.625rem,6vw,4.375rem)] leading-none font-medium tracking-[-0.075em]"
              >
                Good work lives in the details<span className="text-primary">.</span>
              </h2>
            </div>
            <div className="flex flex-col gap-4 lg:col-span-5 lg:col-start-7 lg:pt-9">
              <p className="text-foreground text-lg leading-relaxed tracking-tight">
                I like the space between a sharp idea and a thoughtful detail — where a rough thought becomes something
                clear, useful, and a little unexpected.
              </p>
              <p className="text-muted-foreground text-sm leading-7">
                I bring design and development together, guided by curiosity and a thoughtful approach to every detail.
                My aim is to create digital experiences that are meaningful, intuitive, and a pleasure to use.
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {focusAreas.map((area) => (
                  <Badge key={area} variant="secondary">
                    {area}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
