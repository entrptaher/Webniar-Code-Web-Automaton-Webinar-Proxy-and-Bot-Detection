// https://proxy.incolumitas.com/proxy_detect.html

import puppeteer from "puppeteer";
import proxyChain from "proxy-chain";
import "dotenv/config";
import { setTimeout } from "timers/promises";
import { newInjectedPage } from "fingerprint-injector";

(async () => {
  const newProxyUrl = await proxyChain.anonymizeProxy(process.env.CANADA_PROXY);
  console.log({ newProxyUrl });

  const browser = await puppeteer.launch({
    headless: false,
    args: [`--proxy-server=${newProxyUrl}`],
    ignoreHTTPSErrors: true,
  });

  const page = await newInjectedPage(browser, {
    fingerprintOptions: {
      mockWebRTC: true,
    },
  });

  await page.goto("https://ifconfig.co/json");
  const ipJSON = await page.evaluate((e) => document.body.innerText);
  const timezone = JSON.parse(ipJSON)?.time_zone;
  await page.emulateTimezone(timezone);

  await page.goto("https://abrahamjuliot.github.io/creepjs/");
  await setTimeout(10000);
  await page.screenshot({ path: "_creepjs_headless_proxy_timezone.png", fullPage: true });
  await browser.close();
})();

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    ignoreHTTPSErrors: true,
  });
  const page = await browser.newPage();
  await page.goto("https://abrahamjuliot.github.io/creepjs/");
  await setTimeout(10000);
  await page.screenshot({ path: "_creepjs_headless.png", fullPage: true });
  await browser.close();
})();
