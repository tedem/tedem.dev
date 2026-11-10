import { useEffect, useMemo, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { useScramble } from 'use-scramble';

import Container from '@/components/main/container';

const details = [
  {
    label: 'Track record',
    value: '14+ Years',
    description: 'Full-stack developer',
  },
  {
    label: 'Expertise',
    value: 'Full-stack',
    description: 'Frontend to backend',
  },
  {
    label: 'Approach',
    value: 'End-to-end',
    description: 'From concept to deployment',
  },
  {
    label: 'Presence',
    value: null,
    description: 'Istanbul',
  },
];

function ScrambleValue({ value }: { value: string }) {
  const { ref } = useScramble({
    text: value,
    speed: 1,
    tick: 2,
    step: 1,
    scramble: 1,
    ignore: [' '],
    seed: 0,
  });

  return (
    <dd className="text-[clamp(1.375rem,3vw,2.125rem)] leading-none font-medium tracking-[-0.075em]">
      <span className="sr-only">{value}</span>
      <span ref={ref} aria-hidden="true">
        {value}
      </span>
    </dd>
  );
}

export default function Glance() {
  const { locale, time } = usePage().props;

  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  const formatter = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        timeZone: time.timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hourCycle: 'h23',
      }),
    [locale, time.timezone],
  );

  useEffect(() => {
    const serverTimestamp = new Date(time.now).getTime();
    const clientTimestamp = Date.now();

    const updateTime = () => {
      setCurrentTime(new Date(serverTimestamp + (Date.now() - clientTimestamp)));
    };

    updateTime();

    const interval = window.setInterval(updateTime, 1000);

    return () => window.clearInterval(interval);
  }, [time.now]);

  return (
    <section id="glance" aria-labelledby="glance-title" className="border-border border-t">
      <Container border={true}>
        <div className="py-8 lg:py-16">
          <h2 id="glance-title" className="sr-only">
            At a glance
          </h2>

          <dl className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-16 lg:grid-cols-4">
            {details.map(({ label, value, description }) => (
              <div key={label} className="space-y-4">
                <dt className="font-mono text-[13px] lowercase">
                  <span className="text-muted-foreground mr-[1ch]" aria-hidden="true">
                    //
                  </span>
                  {label}
                </dt>

                <ScrambleValue value={label === 'Presence' ? `UTC${time.utc_offset}` : value!} />

                <dd className="text-muted-foreground">
                  {description}

                  {label === 'Presence' && currentTime && (
                    <>
                      {' · '}
                      <time dateTime={currentTime.toISOString()} className="font-mono tabular-nums">
                        {formatter.format(currentTime)}
                      </time>
                    </>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
