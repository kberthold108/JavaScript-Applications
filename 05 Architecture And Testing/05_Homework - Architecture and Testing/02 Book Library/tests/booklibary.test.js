const { expect } = require("chai");
const { chromium } = require("playwright-chromium");


const url = "http://127.0.0.1:5500/05%20Architecture%20And%20Testing/05_Homework%20-%20Architecture%20and%20Testing/02%20Book%20Library/index.html";

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

    it("load all books and display them", async function () {
        await page.click("#loadBooks");
        await page.waitForSelector("#books");
        const books = await page.$$eval("#books tr td", (x) => x.map(y => y.textContent));

        expect(books[0]).to.equal("Harry Potter and the Philosopher's Stone");
        expect(books[3]).to.equal("C# Fundamentals");
    });
    it("add a new book", async function () {
        await page.fill("#title", "Sheesh");
        await page.fill("#author", "Mister Sheesh");
        await page.click("#submit");
        await page.click("#loadBooks");
        const books = await page.$$eval("#books tr td", (x) => x.map(y => y.textContent));

        expect(books[books.length - 3]).to.equal("Sheesh");
        expect(books[books.length - 2]).to.equal("Mister Sheesh");
    });
    it("edit book", async function () {
        await page.click("#loadBooks");
        await page.click("#books .editBtn >> nth=-1");
        await page.fill("#editTitle", "Scam");
        await page.fill("#editAuthor", "Mister Scammer");

        await page.click("#save");
        await page.waitForTimeout(1000);
        await page.waitForSelector("#loadBooks");
        await page.click("#loadBooks");
        const books = await page.$$eval("#books tr td", (x) => x.map(y => y.textContent));

        expect(books[books.length - 3]).to.equal("Scam");
        expect(books[books.length - 2]).to.equal("Mister Scammer");
    });
    it("delete book", async function () {
        await page.click("#loadBooks");

        const books1 = await page.$$eval("#books tr td", (x) => x.map(y => y.textContent));
        page.on("dialog", dialog => dialog.accept());
        await page.click("#books .deleteBtn >> nth=-1");
        await page.waitForTimeout(1000);
        await page.click("#loadBooks");
        const books = await page.$$eval("#books tr td", (x) => x.map(y => y.textContent));
        expect(books.length).not.equal(books1.length);
    });

});