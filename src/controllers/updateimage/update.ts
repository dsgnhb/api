const puppeteer = require('puppeteer');
import map from './map';
const uuidd = require('uuid/v1');

export default async function(req, res) {


    try {
        let uuid = uuidd();
        console.log(uuid);
        console.log(req.body);
        map.push({uuid: uuid, header1: req.body.header1, header2: req.body.header2, content: req.body.content, bgimg: req.body.bgimg});
        const browser = await puppeteer.launch();

        const page = await browser.newPage();
        await page.setExtraHTTPHeaders({'uuid': uuid});
        await page.goto('http://localhost:8080/post_b', {
            timeout: 3000000
        });

        await page.setViewport({width: 2000, height: 1000});
        await page.screenshot({fullpage: true, path: __dirname + `/${uuid}.png`});

        await browser.close();

        return res.sendFile(__dirname + `/${uuid}.png`);
    } catch (e) {
        console.log(e);
    }

}
