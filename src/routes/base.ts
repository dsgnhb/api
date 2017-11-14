'use strict';

import donate_router from './donate';
import levels_router from './levels';
import post_router from './posts';
import topdesign_router from './topdesign';
import root_router from './root';


export function addRouter(req) {
        let app = req.app;

        app.use(root_router);
        app.use(donate_router);
        app.use(levels_router);
        app.use(post_router);
        app.use(topdesign_router);
        app.stack.forEach((r) => {
            if (r.route && r.route.path) {
                console.log(r.route.stack[0].method + '  ' + r.route.path  );
            }
        });
    }

/*
if (C.development) {
router.stack.forEach(function(r) {
  if (r.route && r.route.path) {
    console.log(r.route.stack[0].method + '  ' + r.route.path  );
  }
});
}*/

