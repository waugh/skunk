const browsing = globalThis === globalThis.window;
const _load = function (bare_path) {
  console.log(`load ${bare_path}`);
  let full_path = (browsing ? "/" : "./") + bare_path;
  this.modules_by_bare_path[bare_path] = import(full_path).then( exports => {
    return exports.asInstalled ?
      exports.asInstalled({
        mgr: this,
      }).catch(console.error) : exports
  })
};
const find = function (bare_path) {
  let hit;
  while (! (hit = this.modules_by_bare_path[bare_path]))
    this._load(bare_path);
  return hit  // is a promise
};
const init = function() {
  let mgr = Object.create({_load, find});
  mgr.modules_by_bare_path = {};
  return mgr
};

export {init}

