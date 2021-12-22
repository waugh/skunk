let s, t;

typeof s === typeof {} || (s = {});
typeof t === typeof {} || (t = {});

import {readdir} from 'fs/promises';

s.handle = (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.writeHead(200);
  res.end(
`<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" 
      content="width=device-width, initial-scale=1"
    >
    <title>Under Construction</title>
  </head>
  <body>
    <h1>Under Construction</h1>
    <p>Pardon our dust.</p>
  </body>
</html>`
  )
};

t.have_prereqs = ( async function () {
  const mgr = globalThis.fw.moduleManager;
  s.lib ||= {};

  t.reading_dir = readdir("app/views").catch(console.error);
  s.filenames = await t.reading_dir;
  console.log("filenames", s.filenames)

  return true
})().catch(console.error);

t.script_loaded = ( async function () {
  await t.have_prereqs;

  /* stuff if needed here */

  return true
})().catch(console.error);


export const asInstalled = async function  ({mgr}) {
  await t.script_loaded;

  return {
    name: "route_html",
    handle: s.handle
  }
};
