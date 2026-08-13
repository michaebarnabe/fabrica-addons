import { getAvailableAddons } from '@/lib/addons-loader';

const EXTERNAL_DATA_URL = 'https://fabrica-addons.michaelbarnabe.site';

function generateSiteMap(addons) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${EXTERNAL_DATA_URL}</loc>
       <changefreq>daily</changefreq>
       <priority>1.0</priority>
     </url>
     ${addons
       .map((addon) => {
         return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/ferramentas/${addon.slug}`}</loc>
           <changefreq>weekly</changefreq>
           <priority>0.8</priority>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

export async function getServerSideProps({ res }) {
  const addons = getAvailableAddons();

  const sitemap = generateSiteMap(addons);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default function SiteMap() {
  // getServerSideProps will do the heavy lifting
}
