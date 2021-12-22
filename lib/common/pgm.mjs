let s;

typeof s === typeof {} || (s = {});

s.addBoundMethod = (...args) => {
  let tgt, key, func;
  switch (args.length) {
  case 3:
    [tgt, key, func] = args;
    break;
  case 2:
    tgt  = args[0];
    func = args[1];
    key  = func.name;
    break;
  case 1:
    const spec = args[0];
    tgt = spec.tgt;
    if (spec.key && spec.src) {
      key  = spec.key;
      func = spec.src[key];
    } else {
      func = spec.func;
      key  = spec.key || func.name;
    };
    break;
  default: throw Error("usage");
  };
  if (! tgt || ! func || ! key) throw Error("Underspecified.");

  tgt[key] = func.bind(tgt);
  tgt[key].bind = func.bind.bind(func);
};
s.allOwnKeys = function* (an_obj) {
  yield* Object.getOwnPropertySymbols(an_obj);
  yield* Object.getOwnPropertyNames  (an_obj)
};
s.discipline = (tgt, src) => {
  const refl = Object.getOwnPropertyDescriptors(src);
  for (const key of s.allOwnKeys(refl)) {
    const descr = refl[key];
    const value = descr.value; /* might be undefined */
    if ("function" === typeof value) s.addBoundMethod({tgt, key, src});
    else Object.defineProperty(tgt, key, descr);
  };
};

s.lazy = (tgt, key, init) => Object.defineProperty( tgt, key, {
  configurable: true, enumerable: true,
  get: function () {
    const value = init();
    Object.defineProperty( this, key, {
      value, configurable: true, enumerable: true
    });
    return value
  }
});

export const asInstalled = async function ({mgr}) {
  return {discipline: s.discipline, lazy: s.lazy}
}
