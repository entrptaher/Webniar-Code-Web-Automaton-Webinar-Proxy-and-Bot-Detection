import puppeteer from "puppeteer";
import proxyChain from "proxy-chain";
import "dotenv/config";

(async () => {
  const newProxyUrl = await proxyChain.anonymizeProxy(process.env.TURKEY_PROXY);
  console.log({ newProxyUrl });

  const browser = await puppeteer.launch({
    headless: false,
    args: [`--proxy-server=${newProxyUrl}`],
    ignoreHTTPSErrors: true,
  });

  const page = await browser.newPage();

  await page.goto("https://www.udemy.com/user/ali-hossain-26/", {
    waitUntil: "networkidle2",
  });

  await page.waitForSelector('[data-purpose="course-title-url"]');

  const price = await page.evaluate(
    () => document.querySelector(`[data-purpose="course-title-url"]`).innerHTML
  );

  await page.screenshot({ path: "_udemy_TURKEY.png", fullPage: true });

  console.log({ price });

  await browser.close();

  await proxyChain.closeAnonymizedProxy(newProxyUrl);

  process.exit(0);
})();
