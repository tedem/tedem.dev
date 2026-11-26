import Seo from '@/components/site/seo';
import { LEAD } from '@/content/profile';
import Hero from '@/components/site/home/hero';
import About from '@/components/site/home/about';
import Posts from '@/components/site/home/posts';
import Approach from '@/components/site/home/approach';
import Contact from '@/components/site/home/contact';

export default function HomePage() {
  return (
    <>
      <Seo description={LEAD} />

      <Hero />
      <About />
      <Posts />
      <Approach />
      <Contact />
    </>
  );
}
