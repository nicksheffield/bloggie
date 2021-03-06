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
//  Route: Home
// --------------------------------------------------------------------------------
router.get('/', function(req, res) {
	var posts = _
		.cloneDeep(db.object.posts)
		.reduce(function(posts, post) {
			post.content = marked(post.content.substring(0, 50))
			posts.push(post)
			return posts
		}, [])
		.sort(function(post) {
			return new Date(post.published_at).valueOf()
		})
		.filter(function(post){
			return post.published_at
		})
	
	res.render('home', _.merge({}, config.theme_data, {
		posts: posts,
		bodyClass: 'home',
		pageTitle: 'Home',
		head: db.object.options.head,
		foot: db.object.options.foot
	}))
})


// --------------------------------------------------------------------------------
//  Route: Single
// --------------------------------------------------------------------------------
router.get('/:slug', function(req, res) {
	// var post = db('posts').find({slug: req.params.slug})

	var post = _.find(db.object.posts, function(post) {
		return post.slug == req.params.slug
	})

	post = _.cloneDeep(post)
	
	if(!post) {
		res.render('404', _.merge({}, config.theme_data, {
			slug: req.params.slug,
			bodyClass: 'error 404',
			pageTitle: '404 - ' + req.params.slug,
			head: db.object.options.head,
			foot: db.object.options.foot
		}))
		
		return
	}

	post.content = marked(post.content)
	
	var data = _.merge({}, config.theme_data, post, {
		bodyClass: 'single post-' + post.slug,
		pageTitle: post.title,
		head: db.object.options.head,
		foot: db.object.options.foot
	})
	
	res.render('single', data)
})


// --------------------------------------------------------------------------------
//  Export module
// --------------------------------------------------------------------------------
module.exports = router