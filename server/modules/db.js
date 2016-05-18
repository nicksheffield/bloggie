var low = require('lowdb')
var storage = require('lowdb/file-sync')
var fs = require('fs')

var dataPath = __dirname + '/../../content/data/data.json'

var exists = fs.existsSync(dataPath)

if(!exists) {
	fs.writeFileSync(dataPath, '{"posts":[]}', 'utf8')
}

module.exports = low(dataPath, { storage: storage })