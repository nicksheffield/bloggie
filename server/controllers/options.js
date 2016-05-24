"use strict"

// --------------------------------------------------------------------------------
//  Dependencies
// --------------------------------------------------------------------------------
var express = require('express')
var _ = require('lodash')
var config = require('../../config')
var db = require('../modules/db')
var marked = require('marked')
var router = express.Router()


// --------------------------------------------------------------------------------
//  Defaults
// --------------------------------------------------------------------------------
var Defaults = {
	head: '',
	foot: '',
	postsPerPage: 5
}


// --------------------------------------------------------------------------------
//  Route: get all options
// --------------------------------------------------------------------------------
router.get('/', function(req, res) {
	res.send(db.object.options)
})


// --------------------------------------------------------------------------------
//  Route: set options
// --------------------------------------------------------------------------------
router.post('/', function(req, res) {
	var options = db.object.options
	
	for(var prop in Defaults) {
		if(req.body[prop]) options[prop] = req.body[prop]
	}
	
	db.write()
	
	res.send(options)
})


// --------------------------------------------------------------------------------
//  Export module
// --------------------------------------------------------------------------------
module.exports = router