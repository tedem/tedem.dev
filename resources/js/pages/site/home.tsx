import Metadata from '@/components/site/metadata';
import { useMessages } from '@/i18n';
import Hero from '@/components/site/home/hero';
import About from '@/components/site/home/about';
import Posts from '@/components/site/home/posts';
import Approach from '@/components/site/home/approach';
import Contact from '@/components/site/home/contact';
import type { PostSummary } from '@/types';

export default function HomePage({ latestPosts }: { latestPosts: PostSummary[] }) {
  const t = useMessages();

  return (
    <>
      <Metadata description={t.profile.lead} />

      <Hero />
      <About />
      <Posts latest={latestPosts} />
      <Approach />
      <Contact />
    </>
  );
}
