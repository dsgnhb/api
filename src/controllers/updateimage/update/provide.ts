import map from '../map';
import * as Re from '../../../services/response';
import showdown = require('showdown');
const converter = new showdown.Converter();

export default async function (req, res) {
    if (map.length === 0) {
      return Re.forbidden(res);
    }
    map.forEach((val, index) => {
      if (val.uuid === req.headers.uuid) {
        res.set('Content-Type', 'text/html');
        map.splice(index, 1);
        return res.send(deliver_html(val.bgimg, val.header1, val.header2, converter.makeHtml(val.content)));
      }
    });
}


function deliver_html(bgimg, heading1, heading2, content) {
    return new Buffer(`
    <!DOCTYPE html>
    <html lang="de">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Post</title>
    <link rel="stylesheet" href="https://use.typekit.net/vtp0hqt.css">
    <style>body{
  font-family: 'proxima-nova', sans-serif;
  }
  main#canvas{
    display: flex;
    flex-wrap: 1000px;
    width: 2000px;
    height: 1000px;
    box-sizing: border-box;
  }
  section#text{
    width: 1000px;
    height: 1000px;
    padding: 100px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  section#image{
    width: 1000px;
    height: 1000px;
    background-image: url("${bgimg}");
    background-position: center;
    background-size: cover;
    box-sizing: border-box;
  }
  h2{
    color: #222;
    font-size: 60px;
    font-weight: 700;
    line-height: 1;
    margin: 0;
    padding: 0;
    margin-bottom: 20;
  }
  h1{
    font-size: 190px;
    font-weight: 800;
    line-height: 1;
    margin: 0;
    padding: 0;
  }
  p{
    color: #444;
    font-size: 50px;
    font-weight: 500;
    line-height: 1.2;
    margin: 0;
    padding: 0;
    margin-top: 20px;
  }
  .blue{
    background-image: linear-gradient(90deg, #478CBE, #59E4DA);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .orange{
    background-image: linear-gradient(90deg, #ECD95B, #EF5F52);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .gray{
    background-image: linear-gradient(90deg, #C1C1C1, #767676);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .green{
    background-image: linear-gradient(90deg, #BCF265, #75DFA1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .logo{
    height: 100px;
    width: 100px;
    position: absolute;
    top: 840px;
    left: 1830px;
  }
  .logo>g{
    fill: #fff;
  }
  </style>
  </head>
  <body>
  <main id="canvas">
  <svg viewBox="0 0 250 250" class="logo">
  <g id="Artboard-3" transform="translate(-69.000000, -25.000000)">
  <path d="M293.727398,275 L300,250 L250,250 L243.733641,275 L293.727398,275 Z M125.227106,150 L119,175 L69,175 L87.7312687,100 L118.95005,100 L162.656344,100 L150.168831,150 L175.143856,150 L193.875125,75 L200.118881,50 L250.068931,50 L243.825175,75 L225.093906,150 L250.068931,150 L262.016019,102.16386 C294.731889,110.211335 319,139.768773 319,175 L269.04995,175 C269.04995,163.199973 260.882854,153.309382 249.898299,150.683212 L250.068931,150 L234.58442,150 L225.093906,150 L200.118881,250 L175.143856,250 L144.174825,250 L144.174825,200 L162.656344,200 L175.143856,150 L125.227106,150 Z M144.174825,250 C102.794849,250 69,216.421356 69,175 L119,175 C119,188.807119 130.3815,200 144.174825,200 L144.174825,250 Z M300,250 L250,250 L269,175 L319,175 L300,250 Z M250.068931,50 L200.118881,50 L206.362637,25 L256.312687,25 L250.068931,50 Z"></path>
  </g> </svg>
  <section id="text">
  <h2>${heading1}</h2>
  <h1 class="orange">${heading2}</h1>
  <p>${content}</p></section>
  <section id="image"> </section>
  </main>
  </body>
  </html>
`);
}
