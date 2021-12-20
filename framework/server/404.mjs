const framework_global = globalThis.fw;
let framework_symbol;
let s;

typeof s === typeof {} || (s = {});

const handle = (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.writeHead(404);
  let reason = undefined;
  const framework_msg = req[framework_symbol];
  if (framework_msg) reason = framework_msg.whyNotFound;
  const reason_html = reason ? `<p>${s.lib.sanitize(reason)}</p>` : "";
  res.end(
`<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" 
      content="width=device-width, initial-scale=1"
    >
    <title>404 Not Found</title>
  </head>
  <body>
    <h1>404</h1>
    <p>Not found.</p>
    ${reason_html}
  </body>
</html>`
  )
}

export const asInstalled = async function ({mgr}) {
  framework_symbol = framework_global.symbol;
  s.lib ||= {};
  const tax = await
    mgr.find("lib/common/html_syntax.mjs").catch(console.error);
  s.lib.sanitize = tax.sanitize;
  return {handle}
}
