import BrandMark from '@/components/shared/brand-mark';
import { WORDMARK } from '@/content/profile';

/** The site logo in the admin sidebar; only the mark stays visible when the sidebar is collapsed. */
export default function AppLogo() {
  return (
    <>
      <BrandMark className="size-8" />
      <span className="ml-1 truncate text-base font-semibold tracking-wide">{WORDMARK}</span>
    </>
  );
}
