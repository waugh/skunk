'use strict';

/* Start Node here. */

globalThis.app || (globalThis.app = {});
globalThis.lib || (globalThis.lib = {});
globalThis.fw  || (globalThis.fw  = {});  /* Framework */
lib.require = require;
import("./module_manager.mjs").then( exports => {
  const mgr = exports.init();
  fw.moduleManager = mgr;
  mgr.find("framework/server/index.mjs").
    then(a => a.init()).catch(console.error);
}).catch(console.error)

