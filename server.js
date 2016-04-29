
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
		if (debug){
			var json = {"status":"success","data":{"odnoklassniki_id":null,"id":12051680,"vet":null,"google_id":null,"contacts":[{"fias_region":null,"city_type":"г","house":"6","street":"ул Капитана Воронина","fias_settlement":null,"settlement":"","id":280665,"city":"г Санкт Петербург","apartment":"6","district":"","zipcode":"194100","fias_city":null,"city_parent":null,"fias_street":null,"settlement_type":null,"street_type":"","phone_home":"","building":"","contact_type":"general","country":{"system_name":"russia","id":1,"name":"Россия"},"region":"г Санкт Петербург","construction":"","phone_mobile":"","fias_district":null}],"register_date":"2016-03-20T14:44:16Z","version":1461684953,"last_login":"2016-03-20T14:44:16Z","facebook_id":null,"full_any_address":true,"type":{"system_name":"owner","name":"Владелец"},"email":"captain@ailove.ru","firstname":"Адмирал","middlename":"лол","lastname":"Воронин","phone":"+79999123143","birthday":"1906-11-02","phone_verified":"not_verified","send_email_permission":true,"instagram_id":null,"send_sms_permission":false,"gender":"male","age":109,"twitter_id":null,"avatar":null,"email_verified":"not_verified","breeder":null,"vkontakte_id":null}}
			res.json(json);
		}
	});
	
	router.route('/api/*').all(function(req, res){
		if (debug){
			res.send("Hello Api! I'm Node server");
		}
	});

	// Views

	var views = path.resolve( './html/');

	app.get("*", function(req, res){
		var template;
		if(req.path == '/'){
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