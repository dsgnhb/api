module Route {
    export function topdesign(routename) {
        return `/topdesign${routename}`;
    }

    export function levels (routename) {
        return `/levels${routename}`;
    }

    export function donate(routename) {
        return `/donate${routename}`;
    }

    export function posts (routename) {
        return `/topdesign/posts${routename}`;
    }
}
export = Route;
