/* Took a hint from
https://www.digitalocean.com/community/tutorials/how-to-create-a-web-server-in-node-js-with-the-http-module
*/

/* Decided against HTTP/2, at least for now. */

let config;
import http from "http";

const init = function (handle) {
  this.http_server = http.createServer(handle);
  let {port, host} = config;
  this.http_server.listen( port, host, () => {
    console.log(`Listening on http://${host}:${port}`)
  })
};

export async function asInstalled (env) {
  config  = await env.mgr.find("config/overt.mjs");
  return {init}
}

