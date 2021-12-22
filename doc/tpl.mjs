let s, t;

typeof s === typeof {} || (s = {});   /* script */
typeof t === typeof {} || (t = {});   /* temporary */

t.have_prereqs = ( async function () {
  const mgr = globalThis.fw.moduleManager;
  s.lib || (s.lib = {});

  /* stuff if needed here -- fulfill prerequsites */

  return true
})().catch(console.error);

t.script_loaded = ( async function () {
  await t.have_prereqs;

  /* stuff if needed here -- finish loading this script */

  return true
})().catch(console.error);


export const asInstalled = async function  ({mgr}) {
  await t.script_loaded;

  /* finalize and arrange and shape what to export if needed here */
  const exports = {};
  for (name of []) exports[name] = s[name];
  return exports
};
