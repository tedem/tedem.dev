import { Head } from '@inertiajs/react';
import Hero from '@/pages/main/index/hero';
import About from '@/pages/main/index/about';
import Glance from '@/pages/main/index/glance';
import Posts from '@/pages/main/index/posts';

export default function Index() {
  return (
    <>
      <Head title="Home" />

      <Hero />
      <Glance />
      <About />
      <Posts />
    </>
  );
}
