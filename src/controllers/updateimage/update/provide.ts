import map from '../map';
const showdown  = require('showdown'),
    converter = new showdown.Converter();

export default async function (req, res) {
    map.forEach( val => {
            if (val.uuid === req.headers.uuid) {
                return res.render('post', {
                    helpers: {
                        heading1: () => { return val.header1; },
                        heading2: () => { return val.header2; },
                        content: () => { return converter.makeHtml(val.content); },
                        bgimg: () => { return val.bgimg; },
                    }
                });
            }
    });
}
