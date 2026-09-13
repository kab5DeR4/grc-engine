import { useEffect } from 'react';

/**
 * Custom hook to dynamically update page title and meta description on route navigation.
 */
export function usePageMetadata(title, description) {
  useEffect(() => {
    if (title) {
      document.title = `${title} — GRC Engine`;
    }

    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', description);
      }
    }
  }, [title, description]);
}

export default usePageMetadata;
