
app = module.exports = function (port){

	var express = require('express')
	  , http 	= require('http')
	  , fs 		= require('fs')
	  , path 	= require('path');

	var app = express();
	var router = express.Router();

	app.set('port', port);

	app.use(router);

	app.use('/', express.static(path.resolve( './')));
	// app.use('/static', express.static(path.resolve( './')));

	router.use(function(req, res, next) {
	  // console.log('[SERVER %s %s] %s', req.method, req.url, req.path);
	  // console.log('[SERVER %s %s] %s', req.method, res.statusCode, req.url);
	  next();
	});

	app.use(function(req, res, next) {
		debug = (req.query.debug && req.query.debug == 'api');
		// res.header("Access-Control-Allow-Origin", "*");
		// res.header("Access-Control-Allow-Headers", "X-Requested-With");
		// res.contentType('text/plain'); // For stupid ie
		next();

	})

	// Api
	router.route('/api/user/current').get(function(req, res){
		// if (debug){
			var json = {"status":"success","data":{username: 'vins'}}
			res.json(json);
		// }
	});
	
	router.route('/api/*').all(function(req, res){
		// if (debug){
			res.send("Hello Api! I'm Node server");
		// }
	});

	// VIEWS

	var views = path.resolve( './html/');

	// app.get("/static/html/*", function(req, res){

	// 	var template;
	// 	if(req.path == '/html/'){
	// 		template = 'index';
	// 	}else{
	// 		template = req.path.replace('/static/html/','');
	// 	}

	// 	template = views + '/' + template;
		
	// 	fs.stat(template, function(err, stat) {
	// 		if (err == null) { 
	// 			res.sendFile(template)
	// 		}else{
	//     	res.send(template + " not found");
	// 		}
	// 	});
	// });

	app.get("*", function(req, res){

		var template;
		if(req.path == '/'){
			template = 'index';
		}else{
			template = req.path.replace('/','');
		}

		template = views + '/' + template + '.html';
		
		fs.stat(template, function(err, stat) {
			if (err == null) { 
				res.sendFile(template)
			}else{
	    	res.send(template + " not found");
			}
		});
	});


	http.createServer(app).listen(port, function(){
		console.log('\r\n' + 'Express server listening on port ' + port + '\r\n');
	})

	return app;

}