var _ = require('lodash')

var blah = {
	a: 'a',
	b: 'b',
	c: [
		{ published: true }
	]
}

_.merge(blah, {
	c: [{ published: false }],
	a: 'd',
	e: 5
})

console.log(blah)