import puppeteer from "puppeteer";
import links  from "./links.js";

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    for(let link of links){
        let classCheck = false;
        let notFound = false;
        page.on('response', response => {
            if (response.url() === link.url ){
                if(response.status() === 404) 
                    notFound = true;
            }
        });

        try {
            await page.goto(link.url)

            if(!classCheck){
                if(link.name === 'Hackerrank'){
                    classCheck = await page.evaluate( () => {
                        const element = document.querySelectorAll(".container--inner p strong");
                        if(element[0]?.textContent === "404")   return true;
                        else    return false;
                    })
                }else if(link.name === "LeetCode"){

                    try {
                        const element = await page.waitForSelector('.flex.flex-row.space-x-4', { timeout: 2000 })
                        console.log("Class exists");
                        if(element)
                            classCheck = true;
                    } catch (error) {
                        classCheck = false;
                    }
                }
            }
            if(classCheck || notFound)
                link.status = false;
            else    
                link.status = true;

        } catch (error) {
            console.log("Error Occured:",error )
        } finally{
            page.removeAllListeners('response');
        }
    }

    for(const link of links){
        console.log(link);
    }
    await browser.close();
})();
