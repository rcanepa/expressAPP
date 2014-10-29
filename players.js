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

player.post('/', function(req, res){
	console.log('(Using Router)  post');
	backURL = req.header('Referer') || '/';
	console.log(backURL);
	player_names.push(req.body.name);
	res.redirect(backURL);
});

module.exports = player;