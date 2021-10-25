const { expect } = require("chai");
const { chromium } = require("playwright-chromium");

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
    });

    afterEach(async () => {
        await page.close();
    });

    it("should load articles correctly", async () => {
        await page.goto("http://127.0.0.1:5500/05%20Architecture%20And%20Testing/05%20Lab%20-%20Architecture%20and%20Testing/01-Accordion/index.html");
        const titles = await page.$$eval("#main .accordion .head span", (selection) => selection.map(span => span.textContent));
        expect(titles).includes("Scalable Vector Graphics");
        expect(titles).includes("Open standard");
        expect(titles).includes("Unix");
        expect(titles).includes("ALGOL");
    });

    it("should load scalable vector graphics first", async () => {
        await page.goto("http://127.0.0.1:5500/05%20Architecture%20And%20Testing/05%20Lab%20-%20Architecture%20and%20Testing/01-Accordion/index.html");
        const title = await page.textContent("#main .accordion .head span");
        expect(title).to.equal("Scalable Vector Graphics");
    });

    it("should display article details", async () => {
        await page.goto("http://127.0.0.1:5500/05%20Architecture%20And%20Testing/05%20Lab%20-%20Architecture%20and%20Testing/01-Accordion/index.html");
        await page.click("#main .accordion .head >> text=More");
        await page.waitForSelector("#main .accordion:first-child >> .extra p");
        const isVisible = await page.isVisible("#main .accordion:first-child >> .extra p");
        expect(isVisible).to.be.true;
    });
});