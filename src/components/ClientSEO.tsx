"use client";

import { useEffect } from "react";

interface ClientSEOProps {
  storageKey: string;
}

export function ClientSEO({ storageKey }: ClientSEOProps) {
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed) {
          if (parsed.seoTitle) document.title = parsed.seoTitle;
          
          const updateMeta = (name: string, content: string, isProperty = false) => {
            if (!content) return;
            const attr = isProperty ? 'property' : 'name';
            let meta = document.querySelector(`meta[${attr}="${name}"]`);
            if (!meta) {
              meta = document.createElement('meta');
              meta.setAttribute(attr, name);
              document.head.appendChild(meta);
            }
            meta.setAttribute('content', content);
          };

          if (parsed.seoDescription) {
            updateMeta('description', parsed.seoDescription);
            updateMeta('og:description', parsed.seoDescription, true);
          }
          if (parsed.seoKeywords) updateMeta('keywords', parsed.seoKeywords);
          if (parsed.seoAuthor) updateMeta('author', parsed.seoAuthor);
          if (parsed.seoPublisher) updateMeta('publisher', parsed.seoPublisher);
          if (parsed.seoTitle) updateMeta('og:title', parsed.seoTitle, true);

          let robots = document.querySelector('meta[name="robots"]');
          if (!robots) {
            robots = document.createElement('meta');
            robots.setAttribute('name', 'robots');
            document.head.appendChild(robots);
          }
          robots.setAttribute('content', 'index, follow');

          
          const canonicalUrl = parsed.seoCanonical || window.location.href;
          if (canonicalUrl) {
            let canonical = document.querySelector('link[rel="canonical"]');
            if (!canonical) {
              canonical = document.createElement('link');
              canonical.setAttribute('rel', 'canonical');
              document.head.appendChild(canonical);
            }
            canonical.setAttribute('href', canonicalUrl);
          }
        }
      } catch (e) {
        console.error("Failed to apply client SEO", e);
      }
    }
  }, [storageKey]);

  return null;
}
