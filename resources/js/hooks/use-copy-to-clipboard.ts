import { useCallback, useEffect, useRef, useState } from 'react';

export type CopyStatus = 'idle' | 'copied' | 'error';

/**
 * Copies text to the clipboard and exposes a status that resets itself.
 * The pending timer is cleared on unmount and on every new copy attempt.
 */
export function useCopyToClipboard(resetDelay = 2000) {
  const [status, setStatus] = useState<CopyStatus>('idle');
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = useCallback(
    async (text: string) => {
      clearTimeout(timer.current);
      try {
        await navigator.clipboard.writeText(text);
        setStatus('copied');
      } catch {
        // Clipboard API unavailable or permission denied.
        setStatus('error');
      }
      timer.current = setTimeout(() => setStatus('idle'), resetDelay);
    },
    [resetDelay],
  );

  return { status, copy };
}
