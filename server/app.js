"use strict"

// --------------------------------------------------------------------------------
//  Dependencies
// --------------------------------------------------------------------------------
var express = require('express')
var bodyParser = require('body-parser')
var _ = require('lodash')
var fs = require('fs')
var path = require('path')
var config = require('../config')
var app = express()

var themeDir = __dirname + '/../content/themes/' + config.theme
var partialsDir = themeDir + '/partials'
var ip = require('os').networkInterfaces().en0[1].address


// --------------------------------------------------------------------------------
//  Templating engine
// --------------------------------------------------------------------------------
app.set('view engine', 'html')
app.set('views', folder('/content/themes/' + config.theme))
app.engine('html', require('hogan-express'))
// app.set('partials', {
// 	header: folder('content/themes/' + config.theme + '/partials/header.html'),
// 	footer: folder('content/themes/' + config.theme + '/partials/footer.html'),
// 	post:   folder('content/themes/' + config.theme + '/partials/post.html')
// })

fs.readdir(partialsDir, function(err, files) {
	app.set('partials', 
		files
			.filter(function(file) {
				return file != '.DS_Store'
			})
			.reduce(function(partials, file) {
				var name = path.basename(file, '.html')
				partials[name] = [partialsDir, '/', name, '.html'].join('')
				return partials
			}, {})
	)
})


// --------------------------------------------------------------------------------
//  Middleware
// --------------------------------------------------------------------------------
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/components', express.static('./components/'))
app.use('/assets', express.static(folder('content/themes/' + config.theme + '/assets')))
app.use('/admin', express.static('./admin/'))
app.use(function(req, res, next) {
	if(req.url != '/favicon.ico') console.log(req.method, req.url)
	next()
})


// --------------------------------------------------------------------------------
//  Start express
// --------------------------------------------------------------------------------
app.listen(config.port, function() {
	var msg = '| Bloggie running'
	var local = '|    local: http://localhost:'+config.port
	var pub = '| external: http://'+ip+':'+config.port
	var max = _.max([msg.length, local.length, pub.length])

	var dashes = repeat(max+2, '-')
	
	function rSpace(str, len) {
		var amount = len - str.length;
		var oStr = ''
		for(var i=0; i<amount; i++){oStr += ' '}
		return oStr
	}

	console.log('')
	console.log(dashes)
	console.log(msg + rSpace(msg, max) + ' |')
	console.log(local + rSpace(local, max) + ' |')
	console.log(pub + rSpace(pub, max) + ' |')
	console.log(dashes)
})

// --------------------------------------------------------------------------------
//  Controllers
// --------------------------------------------------------------------------------
app.use('/',            require('./controllers/misc'))
app.use('/api/post',    require('./controllers/post'))
app.use('/api/options', require('./controllers/options'))


// --------------------------------------------------------------------------------
//  Utilities
// --------------------------------------------------------------------------------
function folder(path) {
	return __dirname + '/../' + path
}

function repeat(n, str) {
	var oStr = ''
	for(var i=0; i<n; i++) {
		oStr += str
	}
	return oStr
}