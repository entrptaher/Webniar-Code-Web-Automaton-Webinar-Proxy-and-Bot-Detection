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
  await page.goto("https://edge-functions-bot-protection-datadome.vercel.app/");
  await page.screenshot({ path: "_datadome_USA.png", fullPage: true });
  await browser.close();
})();

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    ignoreHTTPSErrors: true,
  });
  const page = await browser.newPage();
  await page.goto("https://edge-functions-bot-protection-datadome.vercel.app/");
  await page.screenshot({ path: "_datadome_headless.png", fullPage: true });
  await browser.close();
})();
