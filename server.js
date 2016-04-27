
app = module.exports = function (port){

	var express = require('express')
	  , http 	= require('http')
	  , fs 		= require('fs')
	  , path 	= require('path');

	var app = express();

	app.set('port', port);

	app.use('/', express.static(path.resolve( './')));

	// app.use(function(req, res, next) {
	// 	res.header("Access-Control-Allow-Origin", "*");
	// 	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	// 	res.contentType('text/plain'); // For stupid ie
	// 	next();
	// });
	
	app.get('/api/*', function(req, res){
		res.send("Hello Api! I'm Node server");
	});


	var views = path.resolve( './html/');

	app.get('*', function(req, res){
		// console.log(req.path);
		var template;
		if(!req.path){
			template = 'index';
		}else{
			template = req.path.replace('/','');
		}
		res.sendFile(template + '.html', {root: views})
	});


	http.createServer(app).listen(port, function(){
		console.log('Server listening on port ' + port);
	});

	return app;

}