let s, t;

typeof s === typeof {} || (s = {});
typeof t === typeof {} || (t = {});

t.have_prereqs = ( async function () {
  const mgr = globalThis.fw.moduleManager;
  s.lib ||= {};
  const pgm = await mgr.find("lib/common/pgm.mjs").catch(console.error);
  s.lib.discipline = pgm.discipline;
  s.lib.lazy       = pgm.lazy;
  s.lib.tax = await
    mgr.find("lib/server/html_syntax.mjs").catch(console.error);
  return true
})().catch(console.error);;

s.Base = {
  clone: function (...args) {
    const discipline = s.lib.discpline;
    const it = Object.create(this.__proto__);
    discpline(it, this);
    for (const arg of args) discpline(it, arg);
    return it
  },
};

t.script_loaded = ( async function () {
  await t.have_prereqs;

  s.Node = s.Base.clone();

  s.TextNode = s.Node.clone();

  s.Element = s.Node.clone();
  s.lazy(s.Element, 'children', () => []);
  s.Element.appendChild = function (node) {this.children.push(node)};

  return true
})().catch(console.error);

s.serverDOM = {
  createTextNode: text  => s.TextNode.clone({text}),
  createElement: tagType => s.Element.clone({tagType})
}

export const asInstalled = async function ({mgr}) {
  await t.script_loaded;
  return s.serverDOM
}

