import Metadata from '@/components/site/metadata';
import { LEAD } from '@/content/profile';
import Hero from '@/components/site/home/hero';
import About from '@/components/site/home/about';
import Posts from '@/components/site/home/posts';
import Approach from '@/components/site/home/approach';
import Contact from '@/components/site/home/contact';
import type { PostSummary } from '@/types';

export default function HomePage({ latestPosts }: { latestPosts: PostSummary[] }) {
  return (
    <>
      <Metadata description={LEAD} />

      <Hero />
      <About />
      <Posts latest={latestPosts} />
      <Approach />
      <Contact />
    </>
  );
}
