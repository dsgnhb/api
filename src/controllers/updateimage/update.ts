import puppeteer = require('puppeteer');
import map from './map';
import {getKeys} from '../../services/authentication';
import {generateToken} from '../../util/util';

export default async function(req, res) {
    try {
        let uuid = generateToken();
        map.push({uuid: uuid, header1: req.body.header1, header2: req.body.header2, content: req.body.content, bgimg: req.body.bgimg});
        const browser = await puppeteer.launch({args: [
            '--hide-scrollbars',
            '--mute-audio',
            '--no-sandbox'
        ]});

        const page = await browser.newPage();
        await page.setExtraHTTPHeaders({'uuid': uuid, 'token': getKeys()[0]});
        await page.goto('http://localhost:8080/post_b', {
            timeout: 3000000
        });

        await page.setViewport({width: 2000, height: 1000});
        await page.screenshot({fullpage: true, path: `${__dirname}/${uuid}.png`});

        await browser.close();

        return res.set('Content-Type', 'img/png').sendFile(`${__dirname}/${uuid}.png`);
    } catch (e) {
        console.log(e);
    }

}
