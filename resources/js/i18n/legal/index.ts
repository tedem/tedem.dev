import { type Locale, useLocale } from '@/i18n';
import en from '@/i18n/legal/en';
import tr from '@/i18n/legal/tr';
import type { LegalDocument, LegalDocumentKey, LegalDocuments } from '@/i18n/legal/types';

export type * from '@/i18n/legal/types';

const DOCUMENTS: Record<Locale, LegalDocuments> = { tr, en };

/** A legal document in the current page's language. */
export function useLegalDocument(key: LegalDocumentKey): LegalDocument {
  return DOCUMENTS[useLocale()][key];
}
