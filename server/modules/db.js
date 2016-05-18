var low = require('lowdb')
var storage = require('lowdb/file-sync')

var db = low(__dirname + '/../../content/data/data.json', { storage: storage })

module.exports = db