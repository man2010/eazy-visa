const puppeteer = require('puppeteer');

async function testSEO() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // ── Liste mise à jour avec TOUTES les nouvelles pages destinations
  const urls = [
    // Pages principales existantes
    'http://localhost:3000/',
    'http://localhost:3000/billets',
    'http://localhost:3000/services',
    'http://localhost:3000/voyager-en-allemagne',
    'http://localhost:3000/hotels',
    'http://localhost:3000/a-propos',

    // ── NOUVELLES pages destinations (9 au total)
    'http://localhost:3000/destinations',
    'http://localhost:3000/destinations/dakar-paris',
    'http://localhost:3000/destinations/dakar-istanbul',
    'http://localhost:3000/destinations/dakar-casablanca',
    'http://localhost:3000/destinations/dakar-montreal',
    'http://localhost:3000/destinations/dakar-dubai',
    'http://localhost:3000/destinations/dakar-new-york',
    'http://localhost:3000/destinations/dakar-madrid',
    'http://localhost:3000/destinations/dakar-rome',
    'http://localhost:3000/destinations/dakar-bruxelles',
  ];

  console.log('🔍 TEST SEO EAZY-VISA (version complète 2025)\n' + '='.repeat(70) + '\n');

  for (const url of urls) {
    try {
      console.log(`📄 ${url}`);
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 15000 });

      // Title
      const title = await page.title();
      const titleLen = title.length;
      const titleIcon = titleLen >= 50 && titleLen <= 60 ? '✅' : '⚠️';
      console.log(`  ${titleIcon} Title (${titleLen} chars): ${title.substring(0, 70)}${title.length > 70 ? '...' : ''}`);

      // Meta description
      const desc = await page.$eval('meta[name="description"]', el => el?.content || 'MANQUANT').catch(() => 'MANQUANT');
      const descLen = desc.length;
      const descIcon = descLen >= 140 && descLen <= 165 ? '✅' : '⚠️';
      console.log(`  ${descIcon} Meta desc (${descLen} chars): ${desc.substring(0, 70)}...`);

      // H1
      const h1 = await page.$eval('h1', el => el?.textContent?.trim() || null).catch(() => null);
      console.log(h1 ? `  ✅ H1: ${h1.substring(0, 60)}${h1.length > 60 ? '...' : ''}` : `  ❌ H1 MANQUANT`);

      // Canonical
      const canonical = await page.$eval('link[rel="canonical"]', el => el?.href || 'MANQUANT').catch(() => 'MANQUANT');
      console.log(`  ${canonical !== 'MANQUANT' ? '✅' : '⚠️'} Canonical: ${canonical}`);

      // Open Graph minimum
      const ogTitle = await page.$eval('meta[property="og:title"]', el => el?.content || 'MANQUANT').catch(() => 'MANQUANT');
      const ogImage = await page.$eval('meta[property="og:image"]', el => el?.content || 'MANQUANT').catch(() => 'MANQUANT');
      console.log(`  ${ogTitle !== 'MANQUANT' ? '✅' : '⚠️'} OG:title  |  ${ogImage !== 'MANQUANT' ? '✅' : '⚠️'} OG:image`);

      // Schema.org (présence)
      const hasSchema = await page.$$eval('script[type="application/ld+json"]', els => els.length > 0);
      console.log(`  ${hasSchema ? '✅' : '⚠️'} Schema.org présent`);

      // Images sans alt
      const noAltCount = await page.$$eval('img:not([alt])', els => els.length);
      console.log(`  ${noAltCount === 0 ? '✅' : noAltCount <= 2 ? '⚠️' : '❌'} Images sans alt: ${noAltCount}`);

      // Liens internes (approximation)
      const internalLinks = await page.$$eval('a[href^="/"]:not([href^="/#"])', els => els.length);
      console.log(`  ✅ Liens internes détectés: ${internalLinks}`);

      console.log('─'.repeat(60) + '\n');

    } catch (err) {
      console.error(`  ❌ ERREUR sur ${url}: ${err.message}`);
      console.log('─'.repeat(60) + '\n');
    }
  }

  // ── Tests fichiers système
  console.log('🗺️ FICHIERS SYSTÈME\n' + '='.repeat(60));

  try {
    const sm = await page.goto('http://localhost:3000/sitemap.xml', { waitUntil: 'domcontentloaded' });
    console.log(`  ${sm?.ok() ? '✅' : '❌'} sitemap.xml → ${sm?.status() || 'erreur'}`);
  } catch {
    console.log('  ❌ sitemap.xml → inaccessible');
  }

  try {
    const rt = await page.goto('http://localhost:3000/robots.txt', { waitUntil: 'domcontentloaded' });
    console.log(`  ${rt?.ok() ? '✅' : '❌'} robots.txt   → ${rt?.status() || 'erreur'}`);
  } catch {
    console.log('  ❌ robots.txt → inaccessible');
  }

  console.log('\n' + '='.repeat(70));
  console.log('🎯 TESTS SEO TERMINÉS');
  console.log('='.repeat(70) + '\n');

  await browser.close();
}

testSEO().catch(err => {
  console.error('Erreur globale du script :', err);
  process.exit(1);
});