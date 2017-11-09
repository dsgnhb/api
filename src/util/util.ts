module Utility {
    export function timeshort(date: Date): String {
        let monthInt = date.getMonth() + 1;
        let year = date.getFullYear();
        return '' + year + monthInt;
    }

    export function groupBy(xs, key) {
        return xs.reduce(function (rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        },               {});
    }
}
