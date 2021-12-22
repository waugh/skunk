let s, t;

typeof s === typeof {} || (s = {});
typeof t === typeof {} || (t = {});

t.have_prereqs = ( async function () {
  const mgr = globalThis.fw.moduleManager;
  s.lib ||= {};

  /* stuff if needed here */

  return true
})().catch(console.error);

t.script_loaded = ( async function () {
  await t.have_prereqs;

  /* stuff if needed here */

  return true
})().catch(console.error);


export const asInstalled = async function  ({mgr}) {
  await t.script_loaded;

  /* shape what to return if needed here */

  return {}
};
