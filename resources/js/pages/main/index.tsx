import { Head } from '@inertiajs/react';
import Hero from '@/pages/main/index/hero';
import About from '@/pages/main/index/about';

export default function Index() {
  return (
    <>
      <Head title="Home" />

      <Hero />
      <About />
    </>
  );
}
