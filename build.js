var pug = require('pug');
var utils = require('./utils.js');
var $escape = utils.$escape
var $get = utils.$get
var testers = utils.objectifiedTesters();

var platforms = {
}

var groups = require('./data/groups.json')
var headers = require('./data/platforms.json')
Object.keys(headers).forEach((header) => {
  platforms[header] = require(`./data/platforms/${header}.json`)
})

function requiresFlag (nodeVersion, esVersion, path) {
  var flagged = $get(results.flagged, nodeVersion, esVersion)
  var unflagged = $get(results.unflagged, nodeVersion, esVersion)
  return flagged && unflagged && flagged[path] === true && unflagged[path] !== true
}

function result (platform, version, path) {
  var result = $get(platforms[platform], version, path)

  var title = result === true ? 'Supported' : typeof result === 'string' ? result : 'Not supported'
  var classes = result === true ? 'ssml-yes' : typeof result === 'string' ? 'ssml-other' : result === undefined ? '' : 'ssml-no'
  result = result === true ? 'Yes' : typeof result === 'string' ? result : result === undefined ? '' : 'No'

  return {
    'tip': $escape(title),
    'text': result,
    'classes': classes
  }
}

var html = pug.renderFile('index.pug', {
  headers: headers,
  groups: groups,
  testers: testers,
  platforms: platforms,
  results: function (platform, version, path) {
    return result(platform, version, path)
  },
})

require('fs').writeFileSync('./index.html', html)