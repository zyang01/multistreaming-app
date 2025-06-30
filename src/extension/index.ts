import NodeCG from "nodecg/types";
import { Builder, Browser, ThenableWebDriver } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";
const config: { [key: string]: string } = require("../../config.json");

const options = new chrome.Options();
// options.detachDriver(true);
options.addArguments("--start-maximized");
options.addArguments("--verbose");
options.addArguments("--user-data-dir=/home/seluser/.cache");

// Add experimental options
options.excludeSwitches("enable-automation");
options.addArguments("--disable-blink-features=AutomationControlled");

module.exports = function (nodecg: NodeCG.ServerAPI) {
  let driver: ThenableWebDriver;
  const handles: { [key: string]: any } = {};

  nodecg.listenFor("openBrowser", async (name: string) => {
    if (Object.keys(handles).length === 0) {
      driver = new Builder()
        .usingServer("http://chromium:4444")
        .forBrowser(Browser.CHROME)
        .setChromeOptions(options)
        .build();
    }

    if (handles[name]) {
      driver
        .switchTo()
        .window(handles[name])
        .then(() => {
          nodecg.log.info(`Switched to ${name} tab successfully.`);
        })
        .catch((err: any) => {
          nodecg.log.error(`Error switching to ${name} tab: ${err}`);
        });
      return;
    }

    driver
      .switchTo()
      .newWindow("tab")
      .then(() => driver.getWindowHandle())
      .then((handle: string) => {
        nodecg.log.info(`${name} assigned handle: ${handle}`);
        handles[name] = handle;
      })
      .then(() => driver.get(config[name]))
      .catch((err: any) => {
        nodecg.log.error(`Error opening ${name}: ${err}`);
      });
  });
};
