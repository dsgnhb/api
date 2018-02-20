import C = require('../config-rewrapper');

const imgur = require('imgur');
namespace Utility {
    export function timeshort(date: Date): String {
        let monthInt = date.getMonth() + 1;
        let year = date.getFullYear();
        return '' + year + monthInt;
    }

    export function groupBy(xs, key) {
        return xs.reduce(function(rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        },               {});
    }

    export async function imgurUpload(url) {
        imgur.setClientId(C.imgur.clientID);
        try {
            let json = await imgur.uploadUrl(url);
            if (C.development) {
                console.log('Imgur Data:', JSON.parse(json));
            }
            return json.data.link;
        } catch (ex) {
            console.error(ex.message);
        }
        return undefined;
    }
}
export = Utility;
