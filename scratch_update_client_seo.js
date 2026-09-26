const fs = require('fs');
let content = fs.readFileSync('src/components/ClientSEO.tsx', 'utf8');

// Update canonical URL logic to fallback to window.location.href
content = content.replace(
    /if \(parsed\.seoCanonical\) \{/,
    `const canonicalUrl = parsed.seoCanonical || window.location.href;
          if (canonicalUrl) {`
);
content = content.replace(
    /canonical\.setAttribute\('href', parsed\.seoCanonical\);/,
    `canonical.setAttribute('href', canonicalUrl);`
);

// Inject robots meta tag logic
const robotsInjection = `
          let robots = document.querySelector('meta[name="robots"]');
          if (!robots) {
            robots = document.createElement('meta');
            robots.setAttribute('name', 'robots');
            document.head.appendChild(robots);
          }
          robots.setAttribute('content', 'index, follow');
`;

content = content.replace(
    /if \(parsed\.seoTitle\) updateMeta\('og:title', parsed\.seoTitle, true\);/,
    `if (parsed.seoTitle) updateMeta('og:title', parsed.seoTitle, true);
${robotsInjection}`
);

fs.writeFileSync('src/components/ClientSEO.tsx', content);
