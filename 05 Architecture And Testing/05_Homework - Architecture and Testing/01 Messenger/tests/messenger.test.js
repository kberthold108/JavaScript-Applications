const { expect } = require("chai");
const { chromium } = require("playwright-chromium");

const url = "http://127.0.0.1:5500/05%20Architecture%20And%20Testing/05_Homework%20-%20Architecture%20and%20Testing/01%20Messenger/index.html";

let browser;
let page;
describe("E2E Testing", function () {
    this.timeout(10000);

    before(async () => {
        browser = await chromium.launch();
    });

    after(async () => {
        await browser.close();
    });

    beforeEach(async () => {
        page = await browser.newPage();
        await page.goto(url);
    });

    afterEach(async () => {
        await page.close();
    });

    it("after clicking button messages should be displayed", async () => {
        await page.click("#main #controls #refresh");
        const area = await page.$eval("#main #messages", (txt) => txt.value);
        expect(area).includes("Spami: Hello, are you there?\nGarry: Yep, whats up :?\nSpami: How are you? Long time no see? :)\nGeorge: Hello, guys! :))\nSpami: Hello, George nice to see you! :)))");
    });
    it("check if the send request is correct", async function() {
        await page.fill("#author", "Hans");
        await page.fill("#content", "Ich Bin Hans");
        const [response] = await Promise.all([
            page.waitForResponse(response => response.json() ),
            page.click("#main #controls #submit"),
        ]);
        const data = await response.json();
        delete data["_id"];
        expect(data).to.eql({author: "Hans", content: "Ich Bin Hans"});
    });
    it("another one", async function() {
        await page.fill("#author", "Hans");
        await page.fill("#content", "Ich Bin Hans");
        await page.click("#main #controls #submit");
        await page.click("#main #controls #refresh");
        let area = await page.$eval("#main #messages", (txt) => txt.value);
        area = area.split("\n");
        expect(area.pop()).to.equal("Hans: Ich Bin Hans");
    });
});