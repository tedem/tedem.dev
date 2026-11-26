import { SOCIALS } from '@/content/profile';
import { buildSchema, serializeSchema, type PageType } from '@/content/schema';
import { Head, usePage } from '@inertiajs/react';

type SeoProps = {
  /** Page title without the site name; the title callback in app.tsx appends it. Omit on the home page. */
  title?: string;
  /** One or two sentences for search results and link previews. */
  description: string;
  /** Open Graph type: "profile" for /about, "article" for a post, "website" otherwise. */
  type?: 'website' | 'profile' | 'article';
  /** schema.org type of the page in the JSON-LD graph (see content/schema.ts). */
  pageType?: PageType;
};

/** "@tedemedet", taken from the X entry in content/profile.ts, if there is one. */
const X_HANDLE = SOCIALS.find((social) => social.label === 'X')?.handle;

/**
 * Title, description, canonical URL, Open Graph, Twitter card and JSON-LD tags for a public page.
 * Every tag has a `head-key`, so a page's tags replace the previous page's on client
 * navigation instead of piling up. Rendered on the server too when SSR is running.
 */
export default function Seo({ title, description, type = 'website', pageType = 'WebPage' }: SeoProps) {
  const { url, props } = usePage();
  const { name, appUrl, locale } = props;

  // The `url` prop is the path (with any query string); canonical drops the query.
  const canonical = new URL(url.split(/[?#]/)[0], appUrl).toString();
  const fullTitle = title ? `${title} - ${name}` : name;
  const schema = buildSchema({ appUrl, siteName: name, locale, canonical, title: fullTitle, description, pageType });

  return (
    <Head title={title}>
      <meta head-key="description" name="description" content={description} />
      <link head-key="canonical" rel="canonical" href={canonical} />

      <meta head-key="og:type" property="og:type" content={type} />
      <meta head-key="og:site_name" property="og:site_name" content={name} />
      <meta head-key="og:title" property="og:title" content={fullTitle} />
      <meta head-key="og:description" property="og:description" content={description} />
      <meta head-key="og:url" property="og:url" content={canonical} />

      {/* "summary" until there is a 1200x630 share image for "summary_large_image". */}
      <meta head-key="twitter:card" name="twitter:card" content="summary" />
      <meta head-key="twitter:title" name="twitter:title" content={fullTitle} />
      <meta head-key="twitter:description" name="twitter:description" content={description} />
      {X_HANDLE && <meta head-key="twitter:creator" name="twitter:creator" content={`@${X_HANDLE}`} />}

      {/* Must stay a direct child of <Head>: Inertia serialises only direct children on the server. */}
      <script
        head-key="schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeSchema(schema) }}
      />
    </Head>
  );
}
