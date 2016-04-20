module.exports = function(grunt) {

	var css, js;

	// BUILD!

	// В массивах указывается порядок подключения
	// По умолчанию собирается неотсортированный массив из директории файлов
	// (!) - не подключаются в автоматически из директории 

	var css = {
		base: [],
		views: [],
		libs: [],
	};

	var js = {
		main: [
			'js/app/app.js'
		],
		base: [],
		views: [],
		components: [],
		libs: [
			'js/libs/jquery-1.11.1.min.js',
			'js/libs/underscore-min.js',
			'js/libs/json2.min.js',
			'js/libs/angular.js',

			'!js/libs/helpers.js',
			'!js/libs/html5shiv.js'
		],
	};


	var order = function(arr,source){

		var files = grunt.file.expand(source);
		var list 	= [];

		arr.forEach(function(src, i) {
			if( src.indexOf('!') < 0 ){
				list.push(src);
			}
		});

		files.forEach(function(src, i) {
			if( arr.indexOf(src) < 0 && arr.indexOf('!' + src) < 0 && src.indexOf('!') < 0 ){
				list.push(src);
			}
		});

		return list;
	}

	// CSS

	css.libs 	= order(css.libs,"css/libs/**/*.css");
	css.base 	= order(css.base,"css/app/base/**/*.css");
	css.views = order(css.views,"css/app/views/**/*.css");

	css.app = css.base.concat(css.views);

	// JS

	js.libs 	= order(js.libs,"js/libs/**/*.js");
	js.main 	= order(js.main,"js/app/*.js");
	js.base 	= order(js.base,"js/app/base/**/*.js");
	js.views 	= order(js.views,"js/app/views/**/*.js");
	js.components = order(js.components,"js/app/components/**/*.js");

	js.app = js.main.concat(js.base).concat(js.views).concat(js.components);


	grunt.initConfig({


		stylus: {
			compile: {
				options: {
					compress: false,
				},
				files: [
					{
	          cwd: "ppc/styl/app",
	          src: [ 
	          	'**/*.styl',
	          	'!**/requires/**',
	          	'!mixins.styl'
	          ],
	          dest: "css/app/",
	          expand: true,
	          rename: function(dest, src){
			      	return dest + src.replace('.styl', '.css')
			      },
	        },
	        {
	          cwd: "ppc/styl/libs",
	          src: [ 
	          	'**/*.styl',
	          	'!**/requires/**',
	          	'!mixins.styl'
	          ],
	          dest: "css/libs/",
	          expand: true,
	          rename: function(dest, src){
			      	return dest + src.replace('.styl', '.css')
			      },
	        },
	        {
	          cwd: "ppc/coffee/app/components",
	          src: [ 
	          	'**/*.styl',
	          	'!**/requires/**',
	          	'!mixins.styl'
	          ],
	          dest: 'js/app/components/',
	          expand: true,
	          rename: function(dest, src){
			      	return dest + src.replace('.styl', '.css')
			      },
	        }
        ]
			}
		},


		pug: {
			compile: {
				options: {
					pretty: true,
					data: {
						debug: true,
					},
					filters: {

						includeCssProd: function(block) {
							var line;
   						line = '$$.includeCSS("css/project/project.css");';
   						return "\n" + line + "\n";
	   				},

   					includeJsProd: function(block) {
   						var line;
   						line = '$$.includeJS("js/project/project.min.js");';
   						return "\n" + line + "\n";
	   				},


						includeCssDev: function(block) {
   						var lines = [], line;

   						css.libs.forEach(function(src) {
   							line = '$$.includeCSS("' + src + '");';
   							lines.push("\n" + line + "\n");
   						});

   						css.app.forEach(function(src) {
   							line = '$$.includeCSS("' + src + '");';
   							lines.push("\n" + line + "\n");
   						});

   						return lines.join("");
	   				},

   					includeJsDev: function(block) {
   						var lines = [], line;

   						js.libs.forEach(function(src) {
   							line = '$$.includeJS("' + src + '");';
   							lines.push("\n" + line + "\n");
   						});

   						js.app.forEach(function(src) {
   							line = '$$.includeJS("' + src + '");';
   							lines.push("\n" + line + "\n");
   						});

   						return lines.join("");
	   				}
   				}
				},
				files: [
					{
	          cwd: "ppc/jade",
	          src: "**/*.jade",
	          dest: ".",
	          expand: true,
	          ext: ".html"
	        },
	        {
	          cwd: "ppc/coffee/app/components",
	          src: "**/*.jade",
	          dest: 'js/app/components',
	          expand: true,
	          ext: ".html"
	        }
        ]
			}
		},


		coffee: {

	  	compile: {
		    options: {
		      bare: true
		    },
		    files: [
		    	{
			      expand: true,
			      cwd: 'ppc/coffee/app',
			      src: '**/*.coffee',
			      dest: 'js/app/',
			      rename: function(dest, src){
			      	return dest + src.replace('.coffee', '.js')
			      },
			    },
			    {
			      expand: true,
			      cwd: 'ppc/coffee/libs',
			      src: '**/*.coffee',
			      dest: 'js/libs/',
			      rename: function(dest, src){
			      	return dest + src.replace('.coffee', '.js')
			      },
			    }
		    ]
			},

		},


		concat: {
			app_css: {
				src: css.app,
				dest: 'css/project/app.css'
			},
			libs_css: {
				src: css.libs,
				dest: 'css/project/libs.css'
			},
			project_css: {
				src: [
					'css/project/libs.css',
					'css/project/app.css',
				],
				dest: 'css/project/project.css'
			},


			app_js: {
				src: js.app,
				dest: 'js/project/app.js'
			},
			libs_js: {
				src: js.libs,
				dest: 'js/project/libs.js'
			},
			project_js: {
				src: [
					'js/project/libs.js',
					'js/project/app.js'
				],
				dest: 'js/project/project.js'
			},
		},


		uglify: {
			options: {
	      mangle: false
	    },
			project_js: {
				files: {
					'js/project/project.min.js': 'js/project/project.js',
				}
			},
		},


		watch: {
			options: {
				dateFormat: function(time) {
					grunt.log.writeln("\n>> Waiting for more changes... >>\n");
				},
			},

			// Compile styl

			stylus: {

				files: [
					'ppc/styl/**/*.styl',
				],
				tasks: ['stylus']
			},

			// Compile jade 

			jade: {
				files: [
					'ppc/jade/**/*.jade',
				],
				tasks: ['pug']
			},

			// Compile coffee

			coffee: {
				files: [
					'ppc/coffee/**/*.coffee',
				],
				tasks: ['coffee']
			},

			// Concat css

			app_css: {
				files: [
					'css/app/**/*.css',
				],
				tasks: ['concat:app_css']
			},


			libs_css: {
				files: [
					'css/libs/**/*.css',
				],
				tasks: ['concat:libs_css']
			},
			project_css: {
				files: [
					'css/project/app.css',
					'css/project/libs.css',
				],
				tasks: ['concat:project_css']
			},

			// Concat js

			app_js: {
				files: [
					'js/app/**/*.js',
				],
				tasks: ['concat:app_js']
			},

			libs_js: {
				files: [
					'js/libs/**/*.js',
				],
				tasks: ['concat:libs_js']
			},

			project_js: {
				files: [
					'js/project/app.js',
					'js/project/libs.js',
				],
				tasks: ['concat:project_js']
			},

			// Uglify 

			uglify_project_js: {
				files: [
					'js/project/project.js',
				],
				tasks: ['uglify:project_js']
			},



			livereload: {
	      options: { livereload: true },
	      files: [
		      'js/libs/helpers.js',
		      'ppc/styl/**/mixins.styl',
		      'ppc/styl/**/requires/**/*.styl',
		      '*.html',
		      'css/app/**/*.css',
		      'css/libs/**/*.css',
		      'js/app/**/*.js',
		      'js/libs/**/*.js',
	      ],
			}
		}
	

	});
	
	// load npm
	grunt.file.expand('node_modules/grunt-*/tasks').forEach(grunt.loadTasks);


	grunt.registerTask('build_log', 'Build log', function() {

		console.log('\n============== APP ================');
		css.app.forEach(function(src, i) {
			console.log(src);
		});
		js.app.forEach(function(src, i) {
			console.log(src);
		});
		console.log('===================================');

		console.log('============== LIBS ===============');
		css.libs.forEach(function(src, i) {
			console.log(src);
		});
		js.libs.forEach(function(src, i) {
			console.log(src);
		});
		console.log('===================================\n');


	});


	// server
	grunt.registerTask('server', 'Start web server', function() {
		port = 8888
		require('./server/server.js')(port)
	});

	grunt.registerTask('build', ['coffee', 'stylus', 'pug', 'concat', 'uglify', 'build_log']);
	
	grunt.registerTask('default', ['build', 'server', 'watch']);

};