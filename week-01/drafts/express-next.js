'use strict';

var express = require('express'),
	app = express(),
	port = 8081;

function before(req, res, next){
	console.log('before');
	next();
}

function after(req, res){
	console.log('after');
}

app.route('/').get(before, function(req, res, next){
	res.send('/');
	console.log('/');
	next();
}, after);

app.listen(port);
console.log('started on ' + port);