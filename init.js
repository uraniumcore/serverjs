const sleep = ms => new Promise(res => setTimeout(res, ms));
const puppeteer = require('puppeteer');
const fs = require('fs');

async function init(roomScriptFile) {
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();
    
    try {
        await page.goto('https://www.haxball.com/headless', {waitUntil: 'networkidle2'});
    }
    catch (e) {
        throw new Error('Unable to connect to the haxball headless page. Check your internet connection.');
    }
    
    // Inject the room script into the browser
    await page.evaluate(
        fs.readFileSync(roomScriptFile, {encoding: 'utf-8'})
    );    
    
    // We need to wait the iframe update in order to check if the room was open sucessfully
    await sleep(3000);

    const elementHandle = await page.$('iframe');
    const frame = await elementHandle.contentFrame();
    const recaptcha = await frame.$eval('#recaptcha', e => e.innerHTML);
    
    // If we see the recaptcha, then token (https://www.haxball.com/headlesstoken) must be either invalid or expired
    if (recaptcha) {
        throw new Error('The token is either invalid or expired.');
    }
    
    return await frame.$eval('#roomlink a', e => {
        return e.getAttribute('href');
    });
}

const args = process.argv.slice(2);

if (args.length >= 1) {
    let roomScriptFile = args[0];

    init(roomScriptFile).then((roomLink) => {
        console.log('\x1b[32m%s\x1b[0m', 'Successfully opened the room at ' + roomLink);
    }).catch((e) => {
        console.error('\x1b[31m%s\x1b[0m', e)
        process.exit(1);
    });
}
else {
    console.error('Missing room script file');
    process.exit(1);
}