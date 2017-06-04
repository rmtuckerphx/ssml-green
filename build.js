var pug = require('pug');
var utils = require('./utils.js');
var $escape = utils.$escape
var $get = utils.$get
var testers = utils.objectifiedTesters();

var platforms = {
}

// const engine = 'v8'
//var headers = require('./versions.js')(engine)
var headers = require('./data/ssml-platforms.json')
Object.keys(headers).forEach((header) => {
  platforms[header] = require(`./data/platforms/${header}.json`)

  //convert to the actual headers view model
  // headers[header] = {
  //   super: '',
  //   name: platforms[header].name,
  //   ssmlLink: platforms[header].ssmlLink,
  //   includes: ''
  // }
})

function requiresFlag (nodeVersion, esVersion, path) {
  var flagged = $get(results.flagged, nodeVersion, esVersion)
  var unflagged = $get(results.unflagged, nodeVersion, esVersion)
  return flagged && unflagged && flagged[path] === true && unflagged[path] !== true
}

function result (platform, version, path) {
  //var result = $get(platforms, platform, version)
  //if (result === undefined) return {}
  var result = $get(platforms[platform], version, path)

  var title = result === true ? 'Supported' : typeof result === 'string' ? result : 'Not supported'
  var classes = result === true ? 'bg-success' : typeof result === 'string' || result === undefined ? '' : 'bg-danger'
  result = result === true ? 'Yes' : typeof result === 'string' || result === undefined ? 'Unknown' : 'No'

  return {
    'tip': $escape(title),
    'text': result,
    'classes': classes
  }

  // var flaggd = type === 'flagged'
  // var flagRequired = flaggd && requiresFlag(nodeVersion, esVersion, path)
  // var title = result === true ? (flagRequired ? 'Yes, but requires --harmony flag' : 'Test passed') : typeof result === 'string' ? result : 'Test failed'
  // result = result === true ? 'Yes' : typeof result === 'string' ? 'Error' : 'No'
  // return `<div class="${result} ${type} ${flagRequired ? 'required' : ''}" title="${$escape(title)}">${result === 'Yes' && flagRequired ? 'Flag' : result}</div>`
}

var html = pug.renderFile('index.pug', {
  headers: headers,
  testers: testers,
  platforms: platforms,
  results: function (platform, version, path) {
    return result(platform, version, path)
  },
})

require('fs').writeFileSync('./index.html', html)