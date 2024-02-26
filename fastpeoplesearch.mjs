import puppeteer from "puppeteer";
import proxyChain from "proxy-chain";
import "dotenv/config";

(async () => {
  const newProxyUrl = await proxyChain.anonymizeProxy(process.env.USA_PROXY);
  console.log({ newProxyUrl });

  const browser = await puppeteer.launch({
    headless: false,
    args: [`--proxy-server=${newProxyUrl}`],
    ignoreHTTPSErrors: true,
  });
  const page = await browser.newPage();
  await page.goto("https://fastpeoplesearch.com/");
  await page.screenshot({ path: "_fastpeoplesearch_USA.png", fullPage: true });
  await browser.close();
})();


(async () => {
  const newProxyUrl = await proxyChain.anonymizeProxy(process.env.CANADA_PROXY);
  console.log({ newProxyUrl });

  const browser = await puppeteer.launch({
    headless: false,
    args: [`--proxy-server=${newProxyUrl}`],
    ignoreHTTPSErrors: true,
  });
  const page = await browser.newPage();
  await page.goto("https://fastpeoplesearch.com/");
  await page.screenshot({ path: "_fastpeoplesearch_CANADA.png", fullPage: true });
  await browser.close();
})();

(async () => {
  // const newProxyUrl = await proxyChain.anonymizeProxy(process.env.CANADA_PROXY);
  // console.log({ newProxyUrl });

  const browser = await puppeteer.launch({
    headless: false,
    // args: [`--proxy-server=${newProxyUrl}`],
    ignoreHTTPSErrors: true,
  });
  const page = await browser.newPage();
  await page.goto("https://fastpeoplesearch.com/");
  await page.screenshot({ path: "_fastpeoplesearch_NO_PROXY.png", fullPage: true });
  await browser.close();
})();
