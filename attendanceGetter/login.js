import puppeteer from 'puppeteer';
import {username, password} from "./constants.js";


(async () => {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    console.log("Loading Website")

    await page.goto('https://erp.psit.ac.in');

    console.log("Writing credentials");

    await page.type('input[name="username"]', username);

    await page.type('input[name="password"]', password);

    await page.click('button[type="submit"]');

    await page.waitForNavigation();

    console.log("Logged In Successfully");

    await page.waitForSelector('#accordion li:nth-child(2) a');
    
    await page.click('#accordion li:nth-child(2) a')
    
    console.log("Fetching Details");

    await page.waitForSelector('.sub-menu li:nth-child(4) a');
    
    await page.click('.sub-menu li:nth-child(4) a');
    
    // await page.waitForSelector('.text-inverse strong');
    
    const totalLecture = await page.evaluate(() => {
        const elements = document.querySelectorAll('.text-inverse strong');
        return elements[0]?.textContent;
    })
    const absentLecture = await page.evaluate(() => {
        const elements = document.querySelectorAll('.text-inverse strong');
        return elements[1]?.textContent;
    })

    console.log("Details fetched successfully");

    console.log(totalLecture);
    console.log(absentLecture);

    await browser.close();
})();
