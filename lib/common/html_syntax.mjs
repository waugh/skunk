let s;

typeof s === typeof {} || (s = {});

s.entity_names_by_character = {
  /*
    https://www-archive.mozilla.org/newlayout/testcases/layout/entities.html
  */
  '"': "quot",
  '&': "amp",
  '<': "lt",
  '>': "gt"
};

s.sanitize = a_string =>
  Array.from(a_string).
    map( char => {
      const name = s.entity_names_by_character[char];
      return name ? `&${name};` : char
    }).join('');

if (
  s.sanitize("Jack Waugh <jack@jackwaugh.com>") !==
    "Jack Waugh &lt;jack@jackwaugh.com&gt;"
) throw Error("Unit test failed.");

export const asInstalled = async function ({mgr}) {
  return {sanitize: s.sanitize}
}
