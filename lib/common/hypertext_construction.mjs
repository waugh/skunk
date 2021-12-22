/*
  Provide a way to say simple things like div(p("foo")) to mean
  <div><p>foo</p></div>.
*/

let s, t;

typeof s === typeof {} || (s = {});
typeof t === typeof {} || (t = {});

t.have_prereqs = ( async function () {
  const mgr = globalThis.fw.moduleManager;
  s.lib ||= {};
  s.browsing = (
    await mgr.find("lib/common/env.mjs")
  ).catch(console.error).browsing;
  s.DOM = s.browsing ? globalThis.document : await
    mgr.find("lib/server/DOM.mjs").catch(console.error);
  return true
})().catch(console.error);

export const asInstalled = async function  ({mgr}) {
  await t.have_prereqs;
  let tags = {};
  [
    'div', 'p', 'a', 'span', 'table', 'tr', 'td', 'th', 'tbody', 'thead',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'ul', 'ol', 'label', 'button',
    'input'
  ].forEach(n => tags[n] = s.tag(n));
  tags.txt = a_string => s.DOM.createTextNode(a_string);
  let pub = {tags};
  ['tag'].forEach(n => pub[n] = s[n]);
  return pub
};

s.tag = type => (...args) => {
  let it = s.DOM.createElement(type);
  let attrs = {};
  let children_args = args;
  if (typeof {} === typeof args[0] && ! args[0].nodeType) {
    children_args = args.slice(1, args.length);
    attrs = args[0]
  };
  let hit;
  if (attrs.id) it.id = attrs.id;
  if (hit = attrs.classes) for (let each of hit) it.classList.add(each);
  if (hit = attrs.class) it.classList.add(hit);
  if (hit = attrs.href)  it.href  = hit;
  if (hit = attrs.value) it.value = hit;
  if (hit = attrs.type)  it.type  = hit;
  if (hit = attrs.style) for (const [k, v] of Object.entries(hit))
    it.style[k] = v;
  children_args.forEach( each => {
    let cand = each;
    if (typeof "" === typeof each) cand = s.DOM.createTextNode(each);
    else if (typeof 3 === typeof each)
      cand = s.DOM.createTextNode("" + each);
    it.appendChild(cand)
  });
  return it
}

