import puppeteer from "puppeteer";
import proxyChain from "proxy-chain";
import "dotenv/config";

(async () => {
  const newProxyUrl = await proxyChain.anonymizeProxy(process.env.CANADA_PROXY);
  console.log({ newProxyUrl });

  const browser = await puppeteer.launch({
    headless: false,
    args: [`--proxy-server=${newProxyUrl}`],
    ignoreHTTPSErrors: true,
  });

  const page = await browser.newPage();
  await page.goto("https://shophorne.com/products/type-75-desk-lamp", {
    timeout: 60000,
  });
  await page.waitForSelector('[data-ref="price"]');
  const price = await page.evaluate(
    () => document.querySelector(`[data-ref="price"]`).innerHTML
  );
  await page.screenshot({ path: "_shophorne_CANADA.png", fullPage: true });
  console.log({ price });
  await browser.close();

  await proxyChain.closeAnonymizedProxy(newProxyUrl);

  process.exit(0);
})();
