module.exports = function(grunt) {

	grunt.initConfig({


		// Компиляция Stylus в CSS
		stylus: {
			compile: {
				options: {
					compress: false,
					paths: ['styl/']
				},
				files: {
					'css/app.css': 'ppc/styl/app.styl',
				}
			}
		},

		// Компиляция Jade в HTML
		jade: {
			compile: {
				options: {
					pretty: true,
					data: {
						debug: false
					}
				},
				files: {
					"index.html": "ppc/jade/index.jade",
					"views/404.html": "ppc/jade/views/404.jade",
					"views/index.html": "ppc/jade/views/index.jade",

				}
			}
		},

		// Компиляция coffee-скриптов в js
		coffee: {

			compileBare: {
			
				options: {
       		bare: true
       	},
			
       	files: {
       		'js/app.js': 'ppc/coffee/app.coffee',
       		'js/app.router.js': 'ppc/coffee/app.router.coffee',
     			'js/app.controllers.js': 'ppc/coffee/app.controllers.coffee',
	    		'js/app.directives.js': 'ppc/coffee/app.directives.coffee',
	    		'js/app.services.js': 'ppc/coffee/app.services.coffee',
	    	}
    	}
		},

		// Склеивание js-файлов
		concat: {
			
			js: {
				src: [
					'js/app.js',
					'js/app.router.js',
					'js/app.controllers.js',
					'js/app.directives.js',
					'js/app.services.js',
				],
				dest: 'js/project.js'
			},
			libs: {
				src: [
					'js/libs/jquery-1.11.1.min.js',
					'js/libs/underscore-min.js',
					'js/libs/json2.min.js',

					// 'js/libs/popup.js',
					// 'js/libs/fileuploader.js',
					// 'js/libs/form.js',

					'js/libs/angular.min.js',
					'js/libs/angular-route.min.js',
					'js/libs/angular-cookies.min.js',
				],
				dest: 'js/libs/lib.js'
			},
			css: {
				src: [
					'css/app.css'
				],
				dest: 'css/project.css'
			},
		},

		// Минификация
		uglify: {
			options: {
	      mangle: false
	    },
			js: {
				files: {
					'js/project.min.js': 'js/project.js',
					'js/libs/lib.min.js': 'js/libs/lib.js'
				}
			}
		},


		// Наблюдение за изменениями
		watch: {
			options: {
				livereload: 777,
				dateFormat: function(time) {
					grunt.log.writeln('______ The watch finished in ' + time + 'ms at' + (new Date()).toString());
					grunt.log.writeln('______ Waiting for more changes...');
				},
			},

			// Перекомпиляция стилей при изменении styl-файлов
			stylus: {

				files: [
					'ppc/styl/*.styl',
				],
				tasks: ['stylus']
			},
			// Перекомпиляция html при изменении jade-файлов
			jade: {
				files: [
					'ppc/jade/*.jade',
					'ppc/jade/includes/*.jade',
					'ppc/jade/views/*.jade',
				],
				tasks: ['jade']
			},
			// Перекомпиляция js при изменении coffee-файлов
			coffee: {
				files: [
					'ppc/coffee/*.coffee',
					'ppc/coffee/libs/*.coffee',
				],
				tasks: ['coffee']
			},

			// Пересобирание стилей при изменении исходных css-файлов
			css: {
				files: [
					'css/*.css',
					'!css/project.css'
				],
				tasks: ['concat:css']
			},
			// Пересобирание скриптов при изменении исходных js-файлов
			js: {
				files: [

					'js/*.js',
					'js/project.js',
					'!js/project.min.js',

					'js/libs/*.js',
					'js/libs/lib.js',
					'!js/libs/lib.min.js',
					
				],
				tasks: ['concat:js','uglify:js']
			},
			
		},
	});
	
	// Загрузка библиотек
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-coffee');

	// Сервер
	grunt.registerTask('_server', 'Start web server', function() {
		port = 8888
		grunt.log.writeln('SERVER started on port ' + port);
		require('./server/server.js')(port)
	});

	// Сервер + ppc
	grunt.registerTask('server', ['_server','coffee', 'stylus', 'jade', 'concat', 'uglify', 'watch']);

	
	// Объявление тасков
	grunt.registerTask('default', ['coffee', 'stylus', 'jade', 'concat', 'uglify', 'watch']);

};