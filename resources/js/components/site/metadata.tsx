import { SOCIALS } from '@/content/profile';
import { buildSchema, serializeSchema, type ArticleDates, type PageType } from '@/content/schema';
import { DEFAULT_LOCALE, type Locale, LOCALES, useMessages } from '@/i18n';
import { Head, usePage } from '@inertiajs/react';

type MetadataProps = {
  /** Page title without the site name; the title callback in app.tsx appends it. Omit on the home page. */
  title?: string;
  /** One or two sentences for search results and link previews. */
  description: string;
  /** Open Graph type: "profile" for /about, "article" for a post, "website" otherwise. */
  type?: 'website' | 'profile' | 'article';
  /** schema.org type of the page in the JSON-LD graph (see content/schema.ts). */
  pageType?: PageType;
  /** Publication dates of a post: adds article:* tags and fills the BlogPosting node. */
  article?: ArticleDates;
};

/** "@tedemedet", taken from the X entry in content/profile.ts, if there is one. */
const X_HANDLE = SOCIALS.find((social) => social.label === 'X')?.handle;

/**
 * A public page's metadata, rendered into <head> through Inertia's <Head>: title,
 * description, canonical URL, language alternates (hreflang), Open Graph, Twitter card
 * and JSON-LD structured data.
 * Every tag has a `head-key`, so a page's tags replace the previous page's on client
 * navigation instead of piling up. Rendered on the server too when SSR is running.
 */
export default function Metadata({
  title,
  description,
  type = 'website',
  pageType = 'WebPage',
  article,
}: MetadataProps) {
  const { url, props } = usePage();
  const { name, appUrl, locale, alternates } = props;
  const t = useMessages();

  // The fixed pages exist in every language, so they list their translations. A post is
  // written in one language: its `alternates` are the post lists (for the language
  // switch), which are not translations of it, so it gets no hreflang set.
  const translations = pageType === 'BlogPosting' ? null : alternates;
  const otherLocales = (Object.keys(LOCALES) as Locale[]).filter((other) => other !== locale);

  // The `url` prop is the path (with any query string); canonical drops the query.
  const canonical = new URL(url.split(/[?#]/)[0], appUrl).toString();
  const fullTitle = title ? `${title} - ${name}` : name;
  const schema = buildSchema({
    appUrl,
    siteName: name,
    locale,
    role: t.profile.role,
    location: t.profile.location,
    canonical,
    // A post's headline is its own title, without the site name.
    title: pageType === 'BlogPosting' && title ? title : fullTitle,
    description,
    pageType,
    article,
  });

  return (
    <Head title={title}>
      <meta head-key="description" name="description" content={description} />
      <link head-key="canonical" rel="canonical" href={canonical} />
      {translations &&
        (Object.keys(translations) as Locale[]).map((language) => (
          <link
            key={language}
            head-key={`hreflang-${language}`}
            rel="alternate"
            hrefLang={language}
            href={translations[language]}
          />
        ))}
      {translations && (
        <link head-key="hreflang-x-default" rel="alternate" hrefLang="x-default" href={translations[DEFAULT_LOCALE]} />
      )}

      <meta head-key="og:type" property="og:type" content={type} />
      <meta head-key="og:site_name" property="og:site_name" content={name} />
      <meta head-key="og:title" property="og:title" content={fullTitle} />
      <meta head-key="og:description" property="og:description" content={description} />
      <meta head-key="og:url" property="og:url" content={canonical} />
      <meta head-key="og:locale" property="og:locale" content={LOCALES[locale].og} />
      {translations &&
        otherLocales.map((other) => (
          <meta
            key={other}
            head-key={`og:locale:alternate-${other}`}
            property="og:locale:alternate"
            content={LOCALES[other].og}
          />
        ))}
      {article && (
        <meta head-key="article:published_time" property="article:published_time" content={article.publishedAt} />
      )}
      {article && (
        <meta
          head-key="article:modified_time"
          property="article:modified_time"
          content={article.updatedAt ?? article.publishedAt}
        />
      )}

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
