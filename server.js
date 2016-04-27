
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

	var views = path.resolve( './html/');

	app.get('*', function(req, res){
		// console.log(req.route.params);
		var template;
		if(!req.route.params){
			template = 'index';
		}else{
			template = req.route.params[0];
		}
		template = template.replace('/','');
		res.sendFile(template + '.html', {root: views})
	});


	http.createServer(app).listen(port, function(){
		console.log('Server listening on port ' + port);
	});

	return app;

}