/**
 * COMPOSANT BREADCRUMB SEO
 * Affiche les breadcrumbs ET génère le Schema.org JSON-LD
 * Améliore navigation ET ranking
 */

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const baseUrl = process.env.NODE_ENV === 'production'
    ? 'https://www.app.eazy-visa.com'
    : 'http://localhost:3000';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`,
    })),
  };

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Breadcrumb Visuel (Accessibility + UX) */}
      <nav aria-label="Breadcrumb" className="bg-gray-50 px-4 py-3 rounded-lg mb-6">
        <ol className="flex flex-wrap items-center gap-2 text-sm">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              {index > 0 && <span className="text-gray-400">/</span>}
              {index === items.length - 1 ? (
                <span className="text-gray-700 font-semibold">{item.name}</span>
              ) : (
                <a
                  href={item.url}
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                  {item.name}
                </a>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

export default BreadcrumbSchema;

