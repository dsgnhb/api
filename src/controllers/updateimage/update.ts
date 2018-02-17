import puppeteer from 'puppeteer';
import map from './map';
import uuidd from 'uuid/v1';

export default async function(req, res) {
    let uuid = uuidd();
    map.push({uuid: uuid, header1: req.body.header1, header2: req.body.header2, content: req.body.content, bgimg: req.body.bgimg});
    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    await page.setExtraHTTPHeaders({'uuid': uuid});
    await page.goto('https://localhost:8080/post_b');

    await page.setViewport({width: 2000, height: 1000});
    await page.screenshot({fullpage: true, path: uuid + '.png'});

    await browser.close();

    return res.sendFile(`./${uuid}.png`);
}
