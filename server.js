var express = require('express'),
	bodyParser = require('body-parser'),
	app = express();

app.use(bodyParser.urlencoded());


function log(req, res, next){
	console.log('executed before app.all');
	next();
}

// my useless middleware

app.use(function(req, res, next){
	console.log('Testing a middleware piece of software!');
	next();
});

var names = [];

// my route functions

app.all('/', log, function(req, res, next){
	console.log('all');
	next();
});

app.get('/', function(req, res){
	console.log('get');
	//res.send('Hello Expres's);
	//res.render('index.jade', {
	res.render('index.jade', {
		title: 'Hello Express & Jade',
		names: names
	});
});

app.post('/', function(req, res){
	console.log('post');
	names.push(req.body.name);
	res.redirect('/');
});

app.listen(3000, function(){
	console.log('listening on port 3000');
});