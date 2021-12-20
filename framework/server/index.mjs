const s = {};
{
  const framework_global = globalThis.fw;
  framework_global.symbol ||= Symbol.for("framework");
}

const init = () => {
  setTimeout(s.websrv.init, 0, s.handle)
};

export const asInstalled = async function ({mgr}) {
  s.websrv = await mgr.find("framework/server/websrv.mjs").catch(console.error);
  const routing = await mgr.find("framework/server/routing.mjs").
    catch(console.error);
  s.handle = routing.handle;
  return {init}
}
