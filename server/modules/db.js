var low = require('lowdb')
var storage = require('lowdb/file-sync')
var fs = require('fs')

var dataPath = __dirname + '/../../content/data/'
var dataFile = dataPath + 'data.json'
var dataTemplate = dataPath + 'data_template.json'

var exists = fs.existsSync(dataFile)


if(!exists) {
	var tpl = fs.readFileSync(dataTemplate, {encoding: 'utf8'})
	fs.writeFileSync(dataFile, tpl)
}

module.exports = low(dataFile, { storage: storage })