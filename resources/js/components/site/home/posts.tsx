import Container from '@/components/site/container';
import SectionHeader from '@/components/site/section-header';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EMPTY_DETAIL, EMPTY_TITLE, POSTS_DESCRIPTION, POSTS_TITLE } from '@/content/posts';
import { posts } from '@/routes';
import { Link } from '@inertiajs/react';

export default function Posts() {
  return (
    <section className="border-border border-t" id="posts" aria-labelledby="posts-title">
      <Container border={true}>
        <div className="py-8 lg:py-16">
          <SectionHeader
            id="posts-title"
            path="posts"
            tagline="Latest articles and thoughts"
            title={POSTS_TITLE}
            description={POSTS_DESCRIPTION}
          />

          <div className="bg-muted/30 mt-8 grid gap-8 p-8 md:mt-16 md:grid-cols-2">
            <p className="text-balance">
              <span>{EMPTY_TITLE}</span>
              &nbsp;
              <span className="text-muted-foreground">{EMPTY_DETAIL}</span>
            </p>
            <div className="md:flex md:items-center md:justify-end">
              <Button variant="outline" asChild>
                <Link href={posts().url}>
                  All posts
                  <ArrowRight data-icon="inline-end" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
