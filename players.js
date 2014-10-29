var player = require('express').Router();

var player_names = [];

player.use(function(req, res, next){
	console.log('Router specific middleware')
	next();
});

player.all('/', function(req, res, next){
	console.log('(Using Router) all');
	next();
});

player.get('/', function(req, res){
	console.log('get');
	res.render('players.jade', {
		title: 'Player',
		names: player_names
	});
});

// inspecting the response object
player.post('/', function(req, res){
	console.log('(Using Router)  post');
	backURL = req.header('Referer') || '/';
	console.log(backURL);
	player_names.push(req.body.name);
	//res.status(200);
	//res.redirect(backURL);
	//res.json(player_names);
	res.jsonp(200, player_names);
});

// inspecting the request object
player.get('/request-info', function(req, res){
	console.log(req.param('attr')); //req.params.attr, req.body.attr, req.query.attr
	console.log(req.originalUrl);
	res.render('players.jade', {
		title: 'Player',
		names: player_names
	});
})

// playing with the format response object
player.get('/format', function(req, res){
	res.format({
		'text/plain': function(){
			res.send('text/plain Response!');
		},
		'text/html': function(){
			res.render('players_test.jade');
		},
		'application/json': function(){
			res.json({json_obj: 'Testing format!'});
		}
	});
})

module.exports = player;