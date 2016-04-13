module.exports = function(grunt) {

	var css = {
		app: [
			'css/app/app.css',
			'css/app/popup.css'
		],
		libs: [
			'css/libs/normalize.css',
			
		],
		media: [
			'css/media/media.css'
		]
	};

	var js = {

		app: [
			'js/app/app.js',
			// 'js/app/router.js',
			'js/app/controllers.js',
			'js/app/directives.js',
			'js/app/services.js',
		],
		libs: [
			// 'js/libs/bfbs.js',
			'js/libs/jquery-1.11.1.js',
			'js/libs/underscore.js',
			'js/libs/json2.js',
			// 'js/libs/jquery.tinyscrollbar.min.js',
			// 'js/libs/jquery.maskedinput.min.js',
			// 'js/libs/jquery.jcarousel.js',
			// 'js/libs/fileuploader.js',
			'js/libs/popup.js',
			'js/libs/form.js',

			'js/libs/angular.js',
			'js/libs/angular-cookies.js',
			// 'js/libs/angular-route.js',
		]

	};

	grunt.initConfig({


		// Компиляция Stylus в CSS
		stylus: {
			compile: {
				options: {
					compress: false,
				},
				files: [
					{
	          cwd: "ppc/styl/app",
	          src: "**/*.styl",
	          dest: "css/app/",
	          expand: true,
	          ext: ".css"
	        },
	        {
	          cwd: "ppc/styl/libs",
	          src: "**/*.styl",
	          dest: "css/libs/",
	          expand: true,
	          ext: ".css"
	        },
	        {
	          cwd: "ppc/styl/media",
	          src: "**/*.styl",
	          dest: "css/media/",
	          expand: true,
	          ext: ".css"
	        }
        ]
			}
		},

		// Компиляция Jade в HTML
		jade: {
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

   						css.media.forEach(function(src) {
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
				files: [ {
          cwd: "ppc/jade",
          src: "**/*.jade",
          dest: ".",
          expand: true,
          ext: ".html"
        } ]
			}
		},

		// Компиляция coffee-скриптов в js
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

		// Склеивание js-файлов
		concat: {
			app_css: {
				src: css.app,
				dest: 'css/project/app.css'
			},
			libs_css: {
				src: css.libs,
				dest: 'css/project/libs.css'
			},
			media_css: {
				src: css.media,
				dest: 'css/project/media.css'
			},
			project_css: {
				src: [
					'css/project/libs.css',
					'css/project/app.css',
					'css/project/media.css'
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

		// Минификация
		uglify: {
			options: {
	      mangle: false
	    },
	    app_js: {
				files: {
					'js/project/app.min.js': 'js/project/app.js',
				}
			},
			libs_js: {
				files: {
					'js/project/libs.min.js': 'js/project/libs.js',
				}
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
				tasks: ['jade']
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
					'css/app/*.css',
				],
				tasks: ['concat:app_css']
			},
			libs_css: {
				files: [
					'css/libs/*.css',
				],
				tasks: ['concat:libs_css']
			},
			media_css: {
				files: [
					'css/media/*.css',
				],
				tasks: ['concat:media_css']
			},
			project_css: {
				files: [
					'css/project/app.css',
					'css/project/libs.css',
					'css/project/media.css',
				],
				tasks: ['concat:project_css']
			},

			// Concat js

			app_js: {
				files: [
					'js/app/*.js',
				],
				tasks: ['concat:app_js']
			},

			libs_js: {
				files: [
					'js/libs/*.js',
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

			uglify_app_js: {
				files: [
					'js/project/app.js',
				],
				tasks: ['uglify:app_js']
			},

			uglify_libs_js: {
				files: [
					'js/project/libs.js',
				],
				tasks: ['uglify:libs_js']
			},

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
		      'ppc/styl/mixins/*.styl',
		      '*.html',
		      'css/project/project.css',
		      'js/project/project.min.js',
	      ],
			}
		}
	});
	
	// Загрузка npm
	grunt.file.expand('node_modules/grunt-*/tasks').forEach(grunt.loadTasks);


	// Сервер
	grunt.registerTask('server', 'Start web server', function() {
		port = 8888
		grunt.log.writeln('SERVER started on port ' + port);
		require('./server/server.js')(port)
	});


	// Объявление тасков
	grunt.registerTask('default', ['server','coffee', 'stylus', 'jade', 'concat', 'uglify', 'watch']);

};