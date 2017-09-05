const imgur = require('imgur');
const config = require("../config.json")
exports.timeshort = function(date) {
    var monthNames = ["januar", "februar", "march", "april", "may", "june", "juli", "august", "september", "october", "november", "december"];
    month = monthNames[date.getMonth()].toUpperCase().substring(0,3);
    year = date.getFullYear();
    return month+"_"+year
}
exports.groupBy = function(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
};
exports.imgur = function(url) {
    imgur.setClientId(config.imgur.clientID);
    imgur.uploadUrl(url)
    .then(function (json) {
        console.log(json.data.link)
    })
    .catch(function (err) {
        console.error(err.message);
    });
}