import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
  });
  const page = await browser.newPage();
  const customUA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36';
  await page.setUserAgent(customUA);

  await page.goto("https://bot.sannysoft.com/");
  await page.screenshot({ path: "_sannysoft_custom_UA.png", fullPage: true });
  await browser.close();
})();
