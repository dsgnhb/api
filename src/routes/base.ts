'use strict';

// Test routes
import {Application} from 'express';

import donate_router from './donate';
import levels_router from './levels';
import post_router from './posts';
import topdesign_router from './topdesign';


export function addRouter(req, res, next) {
        let app = req.app;
        app.use(donate_router);
        app.use(levels_router);
        app.use(post_router);
        app.use(topdesign_router);
    }

/**
if (C.development) {
router.stack.forEach(function(r) {
  if (r.route && r.route.path) {
    console.log(r.route.stack[0].method + '  ' + r.route.path  );
  }
});
}*/

