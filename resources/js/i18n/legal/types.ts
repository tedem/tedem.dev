/*
 * Shape of the legal documents (Terms of Service, Privacy Policy). Both languages must
 * have the same documents; sections may differ in wording but keep the same ids, so a
 * link to #cookies works in either language.
 *
 * Text may contain tokens that the page turns into links (see pages/site/legal.tsx):
 * {email}, {owner}, {terms}, {privacy} and {cookieSettings}.
 */

export type LegalTable = {
  head: readonly string[];
  rows: readonly (readonly string[])[];
};

/** A paragraph, a bullet list or a table. */
export type LegalBlock = string | { list: readonly string[] } | { table: LegalTable };

export type LegalSection = {
  id: string;
  title: string;
  blocks: readonly LegalBlock[];
};

export type LegalDocument = {
  title: string;
  /** For search results and link previews. */
  description: string;
  /** Path name shown after "~/"; decoration only. */
  path: string;
  /** Calendar day of the last change, "YYYY-MM-DD". */
  updated: string;
  /** Plain-language points shown before the full text. */
  summary: readonly string[];
  sections: readonly LegalSection[];
};

export type LegalDocumentKey = 'terms' | 'privacy';

export type LegalDocuments = Record<LegalDocumentKey, LegalDocument>;
