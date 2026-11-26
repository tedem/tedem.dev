import { EMAIL, LOCATION, NAME, ROLE, SOCIALS, STACK } from '@/content/profile';

/*
 * schema.org structured data (JSON-LD) for the public pages. Every page gets one @graph
 * with the site, its author and the page itself; the nodes point at each other by @id,
 * so search engines read them as one connected entity.
 */

export type PageType = 'WebPage' | 'ProfilePage' | 'CollectionPage' | 'ContactPage';

type SchemaInput = {
  /** Site root from Laravel's APP_URL, e.g. "https://tedem.dev". */
  appUrl: string;
  siteName: string;
  /** Laravel locale ("en", "pt_BR"); schema.org wants a BCP 47 tag ("pt-BR"). */
  locale: string;
  canonical: string;
  title: string;
  description: string;
  pageType: PageType;
};

export function buildSchema({ appUrl, siteName, locale, canonical, title, description, pageType }: SchemaInput) {
  const root = new URL('/', appUrl).toString();
  const personId = `${root}#person`;
  const websiteId = `${root}#website`;
  const language = locale.replace('_', '-');

  const person = {
    '@type': 'Person',
    '@id': personId,
    name: NAME,
    alternateName: siteName,
    jobTitle: ROLE,
    url: root,
    email: `mailto:${EMAIL}`,
    homeLocation: { '@type': 'Place', name: LOCATION },
    knowsAbout: STACK,
    sameAs: SOCIALS.map((social) => social.href),
  };

  const website = {
    '@type': 'WebSite',
    '@id': websiteId,
    url: root,
    name: siteName,
    inLanguage: language,
    publisher: { '@id': personId },
  };

  const page = {
    '@type': pageType,
    '@id': `${canonical}#webpage`,
    url: canonical,
    name: title,
    description,
    inLanguage: language,
    isPartOf: { '@id': websiteId },
    // A profile page is about the person; every other page is still authored by them.
    ...(pageType === 'ProfilePage' ? { mainEntity: { '@id': personId } } : { about: { '@id': personId } }),
  };

  return { '@context': 'https://schema.org', '@graph': [website, person, page] };
}

/**
 * JSON for a <script type="application/ld+json"> body. "<" is escaped so text such as
 * "</script>" inside a value can never close the tag early.
 */
export function serializeSchema(schema: object) {
  return JSON.stringify(schema).replace(/</g, '\\u003c');
}
