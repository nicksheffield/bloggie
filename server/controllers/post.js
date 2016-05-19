"use strict"

// --------------------------------------------------------------------------------
//  Dependencies
// --------------------------------------------------------------------------------
var express = require('express')
var _ = require('lodash')
var slug = require('slug')
var uuid = require('uuid')
var router = express.Router()
var db = require('../modules/db')


// --------------------------------------------------------------------------------
//  Schema
// --------------------------------------------------------------------------------
var Schema = {
	title: null,
	content: null,
	published_at: null,
	created_at: null,
	css: null
}


// --------------------------------------------------------------------------------
//  Route: get many
// --------------------------------------------------------------------------------
router.get('/', function(req, res) {
	var docs = db.object.posts

	res.send(docs)
})


// --------------------------------------------------------------------------------
//  Route: get one
// --------------------------------------------------------------------------------
router.get('/:id', function(req, res) {
	var doc = db('posts').find({_id: req.params.id})

	res.send(doc)
})


// --------------------------------------------------------------------------------
//  Route: create one
// --------------------------------------------------------------------------------
router.post('/', function(req, res) {
	var doc = _.cloneDeep(Schema)

	for(var prop in req.body) {
		if(doc[prop] == null) doc[prop] = req.body[prop]
	}
	
	doc._id = uuid()

	doc.slug = slug(doc.title.toLowerCase())

	db.object.posts.push(doc)

	db.write()
	
	res.send(doc)
})


// --------------------------------------------------------------------------------
//  Route: update one
// --------------------------------------------------------------------------------
router.put('/:id', function(req, res) {
	var doc = _.find(db.object.posts, function(post) {
		return post._id == req.params.id
	})

	for(var prop in req.body) {
		if(Schema[prop] == null) doc[prop] = req.body[prop]
	}

	doc.slug = slug(doc.title.toLowerCase())

	db.write()
	
	res.send(doc)
})


// --------------------------------------------------------------------------------
//  Route: delete one
// --------------------------------------------------------------------------------
router.delete('/:id', function(req, res) {
	var doc = db('posts').find({_id: req.params.id})

	db.object.posts = _.reject(db.object.posts, function(post) {
		return post._id == req.params.id
	})

	db.write()

	res.send(doc)
})


// --------------------------------------------------------------------------------
//  Export module
// --------------------------------------------------------------------------------
module.exports = router