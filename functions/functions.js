const imgur = require('imgur');
const config = require("../config.json")
exports.timeshort = function(date) {
    var monthNames = ["januar", "februar", "march", "april", "may", "june", "juli", "august", "september", "october", "november", "december"];
    monthInt = date.getMonth();
    monthName = monthNames[date.getMonth()].toUpperCase().substring(0,3);
    year = date.getFullYear();
    return year + monthInt
}
exports.groupBy = function(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
};
exports.imgur = async (url) => {
    imgur.setClientId(config.imgur.clientID);
    try {
        let json = await imgur.uploadUrl(url);
        return json.data.link;
    } catch(ex) {
        console.error(ex.message);
    }
    return undefined;
}