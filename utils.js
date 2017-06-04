
// tries to traverse an object to a given path
// example: $(myObj, ['foo', 'bar', 'baz'])
function $get (obj, path, ...more) {
  return more.length && obj[path] ? $get(obj[path], ...more) : obj[path]
}
// sets a nested value at a given path that is delimited by '›'
// example: $set({}, 'foo›bar›baz', 123)
// output: { foo: { bar: { baz: 123}}}
function $set (target, path, value) {
  var parts = path.split('›')
  if (parts.length === 2) parts.splice(1, 0, '')

  var obj = target
  var last = parts.pop()

  parts.forEach(function (prop) {
    if (!obj[prop]) obj[prop] = {}
    obj = obj[prop]
  })

  obj[last] = value
}
const replacements = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;'
}

module.exports = {
  $get,
  $set,
  // The structure of the testers.json data focused on keeping it simple
  // if looking at the raw file, but it isn't too useful programmatically.
  // This utility opens it and transforms it in to an object tree.
  objectifiedTesters: function () {
    var testers = {}
    var _testers = require('./data/testers.json')
    Object.keys(_testers).forEach((ssmlVersion) => {
      testers[ssmlVersion] = {}
      Object.keys(_testers[ssmlVersion]).forEach((path) =>
        $set(testers[ssmlVersion], path, {path: path, code: _testers[ssmlVersion][path]})
      )
    })
    return testers
  },
  $escape: (str) => str.replace(/[&<>"'\/]/g, (x) => replacements[x])
}