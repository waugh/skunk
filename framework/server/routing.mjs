let module_manager;
const framework_global = globalThis.fw;
let framework_symbol;
let not_found_mod;

const suf_hndl = {
  "":   "framework/server/route_html.mjs",
  txt:  "framework/server/route_txt.mjs",
  json: "framework/server/route_json.mjs",
  css:  "framework/server/route_css.mjs",
  js:   "framework/server/route_js.mjs",
  mjs:  "framework/server/route_js.mjs",
  jpg:  "framework/server/route_jpeg.mjs",
  jpeg: "framework/server/route_jpeg.mjs",
  png:  "framework/server/route_png.mjs",
  ico:  "framework/server/route_ico.mjs"
}

const handle = (req, res) => {
  console.log("frameworks/server/routing.mjs");
  console.log("typeof res.setHeader", typeof res.setHeader);
  const {url} = req;  /* It's a string. */
  console.log(url);
  const on_slash = url.split("/");
  const final_name = on_slash[on_slash.length - 1];
  const on_dot = final_name.split(".");
  const suf = on_dot.length < 2 ? "" : on_dot[on_dot.length - 1];
  console.log("suffix", JSON.stringify(suf));
  const mgr = module_manager;
  const modpath = suf_hndl[suf];
  const fail = reason => {
    console.error(reason);
    req[framework_symbol] ||= {};
    req[framework_symbol].whyNotFound =
`The server has failed, due to erroneous computer programming.
Contact Jack Waugh <8cbad6rezv@liamekaens.com>, +1 (703) 863-3200.
Please outline what it takes to reproduce this failure.
Thanks, and sorry.
Guru meditation phrase: ${reason}.
`;
    not_found_mod.handle(req, res)
  };
  res[framework_symbol] = {fail};
  if (! modpath) {
    req[framework_symbol] ||= {};
    const qfix = JSON.stringify(`.${suf}`);
    req[framework_symbol].whyNotFound = `Unknown suffix: ${qfix}.`;
    setTimeout(not_found_mod.handle, 0, req, res);
    return
  };
  module_manager.find(modpath).catch(fail).then( mod => {
    try {
      mod.handle(req, res)
    } catch (err) {
      fail(err)
    }
  }).catch(fail);
}

export const asInstalled = async function ({mgr}) {
  module_manager = mgr;
  not_found_mod = await 
    mgr.find("framework/server/404.mjs").catch(console.error);
  framework_symbol = framework_global.symbol;
  return {handle}
}
