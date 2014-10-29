var express = require('express'),
	bodyParser = require('body-parser'),
	app = express(),
	player = require('./players');

app.use(bodyParser.urlencoded());

var names = [];

function log(req, res, next){
	console.log('executed before app.all');
	next();
}

// my useless middleware
app.use(function(req, res, next){
	console.log('Testing a middleware piece of software!');
	next();
});

// my route functions
app.route('/')
	.all(log, function(req, res, next){
		console.log('all');
		next();
	})
	.get(function(req, res){
		console.log('get');
		res.render('index.jade', {
			title: 'Hello Express & Jade',
			names: names
		});
	})
	.post(function(req, res){
		console.log('post');
		names.push(req.body.name);
		res.redirect('/');
	});

app.use('/players', player);

app.get('/route', function(req, res, next){
	res.send('This is another route!');
	next();
});

// route parameters
app.get('/names/:name', function(req, res){
	res.send('Your name is ' + req.params.name);
});

// built-in middleware
app.use(express.static('./public'));

app.listen(3000, function(){
	console.log('listening on port 3000');
});