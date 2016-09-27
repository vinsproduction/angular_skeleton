

var gulp    = require('gulp');
var gutil   = require('gulp-util');
var fs      = require("fs");
var glob    = require("glob");
var coffee  = require('gulp-coffee');
var pug     = require('gulp-pug');
var stylus  = require('gulp-stylus');
var concat  = require('gulp-concat');
var header  = require('gulp-header');
var changed = require('gulp-changed');
var cleanCSS = require('gulp-clean-css');
var uglify  = require('gulp-uglify');
var rename  = require('gulp-rename');
var replace = require('gulp-replace');
var ngAnnotate = require('gulp-ng-annotate');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();

// BUILD!
// В массивах указывается порядок подключения (опционально)
// По умолчанию собирается неотсортированный массив из директории файлов
// path с префиксом (!) - не подключаeтся автоматически из директории

var build = {

  css: {
    main: [
      'css/app/app.css'
    ],
    base: [],
    views: [],
    components: [],
    libs: [],
  },

  js: {
    main: [
      'js/app/app.js',
    ],
    base: [],
    views: [],
    components: [],
    libs: [
      '!js/libs/html5shiv.js',

      'js/libs/jquery-1.12.3.js',
      'js/libs/underscore.js',
      'js/libs/angular.js',
    ],
  }

};

var css = {}, js  = {};


var compiled = {

  coffee: [
    './ppc/coffee/**/*.coffee'
  ],

  stylus: [
    './ppc/styl/**/*.styl',
    '!**/requires/**',
  ],
  stylusExtends: [
    '**/requires/**',
  ],
  stylusComponents: [
    './ppc/coffee/app/components/**/*.styl',
    '!**/requires/**',
  ],

  pug: [
    './ppc/pug/**/*.pug',
  ],
  pugIndex: [
    './ppc/pug/views/home.pug',
  ],
  pugViews: [
    './ppc/pug/views/**/*.pug'
  ],
  pug_views_with_extends: [
    './ppc/pug/views/**/*.pug'
  ],
  pugBase: [
    './ppc/pug/base/**/*.pug',
  ],
  pugComponents: [
    './ppc/coffee/app/components/**/*.pug',
  ]

}

gulp.task('coffee', function(cb) {
  gulp.src(compiled.coffee)
    .pipe(changed('./js/', {extension: '.js'}))
    .pipe(coffee({
      bare: true
    }).on('error', gutil.log))
    .pipe(gulp.dest('./js/'))
    .on('end',function(){
      cb(null);
    });
});

gulp.task('coffee_all', function(cb) {
  gulp.src(compiled.coffee)
    .pipe(coffee({
      bare: true
    }).on('error', gutil.log))
    .pipe(gulp.dest('./js/'))
    .on('end',function(){
      cb(null);
    });
});


gulp.task('stylus', function(cb) {

  gulp.src(compiled.stylus)
    .pipe(changed('./css/', {extension: '.css'}))
    .pipe(stylus({
      compress: false
    }).on('error', gutil.log))
    .pipe(gulp.dest('./css/'))
    .on('end',function(){  
      cb(null);
    });
});

gulp.task('stylus_all', function(cb) {

  gulp.src(compiled.stylus)
    .pipe(stylus({
      compress: false
    }).on('error', gutil.log))
    .pipe(gulp.dest('./css/'))
    .on('end',function(){  
      cb(null);
    });
});

gulp.task('stylus_components', function(cb) {

  gulp.src(compiled.stylusComponents)
    .pipe(changed('./js/app/components/', {extension: '.css'}))
    .pipe(stylus({
      compress: false
    }).on('error', gutil.log))
    .pipe(gulp.dest('./js/app/components/'))
    .on('end',function(){  
      cb(null);
    });

});

gulp.task('pug_index', function(cb) {

  gulp.src(compiled.pugIndex)
    .pipe(header('extends ../base/layout\r\n'))
    .pipe(pug({
      pretty: true
    })
    .on('error', gutil.log))
    .pipe(rename("index.html"))
    .pipe(gulp.dest('./html'))
    .on('end',function(){  
      cb(null);
    });

});

gulp.task('pug_base', function(cb) {

  gulp.src(compiled.pugBase)
    .pipe(changed('./html/base/', {extension: '.html'}))
    .pipe(pug({
      pretty: true
    })
    .on('error', gutil.log))
    .pipe(gulp.dest('./html/base'))
    .on('end',function(){  
      cb(null);
    });

});

gulp.task('pug_views', function(cb) {

  gulp.src(compiled.pugViews)
    .pipe(changed('./html/views/', {extension: '.html'}))
    .pipe(pug({
      pretty: true
    })
    .on('error', gutil.log))
    .pipe(gulp.dest('./html/views/'))
    .on('end',function(){  
      cb(null);
    });

});

gulp.task('pug_views_with_extends', function(cb) {

   gulp.src(compiled.pug_views_with_extends)
    .pipe(changed('./html/', {extension: '.html'}))
    .pipe(header('extends ../base/layout\r\n'))
    .pipe(pug({
      pretty: true
    })
    .on('error', gutil.log))
    .pipe(gulp.dest('./html/'))
    .on('end',function(){  
      cb(null);
    });

});

gulp.task('pug_views_with_extends_all', function(cb) {

   gulp.src(compiled.pug_views_with_extends)
    .pipe(header('extends ../base/layout\r\n'))
    .pipe(pug({
      pretty: true
    })
    .on('error', gutil.log))
    .pipe(gulp.dest('./html/'))
    .on('end',function(){  
      cb(null);
    });

});

gulp.task('pug_components', function(cb) {

  gulp.src(compiled.pugComponents)
    .pipe(changed('./js/app/components/', {extension: '.html'}))
    .pipe(pug({
      pretty: true
    }).on('error', gutil.log))
    .pipe(gulp.dest('./js/app/components/'))
    .on('end',function(){  
      cb(null);
    });


});


gulp.task('app_css', function(cb) {

  gulp.src(css.main.concat(css.base))
    .pipe(concat('app.css'))
    .pipe(replace(/\"(.*)\/img/g, '"../../img'))
    .pipe(gulp.dest('./css/project/'))
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./css/project/'))
    .on('end', function(){
      cb(null);
    }) 

});


gulp.task('views_css', function(cb) {

  gulp.src(css.views)
    .pipe(concat('app.views.css'))
    .pipe(replace(/\"(.*)\/img/g, '"../../img'))
    .pipe(gulp.dest('./css/project/'))
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./css/project/'))
    .on('end', function(){
      cb(null);
    }) 

});


gulp.task('components_css', function(cb) {

  gulp.src(css.components)
    .pipe(concat('app.components.css'))
    .pipe(replace(/\"(.*)\/img/g, '"../../img'))
    .pipe(gulp.dest('./css/project/'))
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./css/project/'))
    .on('end', function(){
      cb(null);
    }) 

});

gulp.task('libs_css', function(cb) {

  gulp.src(css.libs)
    .pipe(concat('libs.css'))
    .pipe(replace(/\"(.*)\/img/g, '"../../img'))
    .pipe(gulp.dest('./css/project/'))
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./css/project/'))
    .on('end', function(){
      cb(null);
    }) 

});


gulp.task('project_css', function(cb) {

  gulp.src([

      './css/project/libs.min.css',
      './css/project/app.min.css',
      './css/project/app.views.min.css',
      './css/project/app.components.min.css',
    ])
    .pipe(concat('project.css'))
    .pipe(gulp.dest('./css/project/'))
    .on('end', function(){
      cb(null);
    }) 
});

gulp.task('app_js', function(cb) {

  gulp.src(js.main.concat(js.base))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./js/project/'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./js/project/'))
    .on('end', function(){
      cb(null);
    }) 

});

gulp.task('views_js', function(cb) {

  gulp.src(js.views)
    .pipe(concat('app.views.js'))
    .pipe(gulp.dest('./js/project/'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./js/project/'))
    .on('end', function(){
      cb(null);
    }) 

});

gulp.task('components_js', function(cb) {

  gulp.src(js.components)
    .pipe(concat('app.components.js'))
    .pipe(gulp.dest('./js/project/'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./js/project/'))
    .on('end', function(){
      cb(null);
    }) 

});

gulp.task('libs_js', function(cb) {

  gulp.src(js.libs)
    .pipe(concat('libs.js'))
    .pipe(gulp.dest('./js/project/'))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./js/project/'))
    .on('end', function(){
      cb(null);
    }) 
});


gulp.task('project_js', function(cb) {

  gulp.src([

      './js/project/libs.min.js',
      './js/project/app.min.js',
      './js/project/app.views.min.js',
      './js/project/app.components.min.js',

    ])
    .pipe(concat('project.js'))
    .pipe(gulp.dest('./js/project/'))
    .on('end', function(){
      cb(null);
    }) 

});


gulp.task('buildit', function(cb) {

  function order(arr,source){

    var files = glob.sync(source);
    var list  = [];

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

  css.libs  = order(build.css.libs,"css/libs/**/*.css");

  css.main  = order(build.css.main,"css/app/*.js");
  css.base  = order(build.css.base,"css/app/base/**/*.css");
  css.views = order(build.css.views,"css/app/views/**/*.css");
  css.components = order(build.css.components,"js/app/components/**/*.css");


  css.app =
    css.main
    .concat(css.base)
    .concat(css.views)
    .concat(css.components);

  css.list = css.libs.concat(css.app);

  // JS

  js.libs   = order(build.js.libs,"js/libs/**/*.js");

  js.main   = order(build.js.main,"js/app/*.js");
  js.base   = order(build.js.base,"js/app/base/**/*.js");
  js.views  = order(build.js.views,"js/app/views/**/*.js");
  js.components = order(build.js.components,"js/app/components/**/*.js");

  js.app =
    js.main
    .concat(js.base)
    .concat(js.views)
    .concat(js.components);

  js.list = js.libs.concat(js.app);

  // CREATE build JS

  var buildContent = "window.build=";
  buildContent += JSON.stringify({js:js,css:css});
  fs.writeFileSync('./build-list.js',buildContent);

  cb(null);

});

gulp.task('structure', function() {

  console.log('\r');
  console.log('============== APP ================');

  css.app.forEach(function(src, i) {
    console.log(src);
  });
  js.app.forEach(function(src, i) {
    console.log(src);
  });

  console.log('\r');
  console.log('============== LIBS ===============');

  css.libs.forEach(function(src, i) {
    console.log(src);
  });
  js.libs.forEach(function(src, i) {
    console.log(src);
  });

  console.log('\r');
  console.log('============= PROJECT =============');

  glob.sync("css/project/*.css").forEach(function(src, i) {
    console.log(src);
  });

  glob.sync("js/project/*.js").forEach(function(src, i) {
    console.log(src);
  });

  console.log('===================================');
  console.log('\r');

});

gulp.task('server', function() {
  port = 8888;
  require('./server.js')(port);
});



gulp.task('watch', function() {

  browserSync.init({
    open: false,
    proxy: "localhost:8888"
  });

  gulp.watch(compiled.coffee, ['coffee']);

  gulp.watch(js.main.concat(js.base),{interval:2000}, ['app_js']);
  gulp.watch(js.views,{interval:2000}, ['views_js']);
  gulp.watch(js.components,{interval:2000}, ['components_js']);
  gulp.watch(js.libs,{interval:2000}, ['libs_js']);
  gulp.watch([

    './js/project/app.min.js',
    './js/project/app.views.min.js',
    './js/project/app.components.min.js',
    './js/project/libs.min.js'

    ], {interval:2000}, ['project_js']);

  gulp.watch(compiled.stylus, ['stylus']);
  gulp.watch(compiled.stylusExtends, ['stylus_all']);
  gulp.watch(compiled.stylusComponents, ['stylus_components']);

  gulp.watch(css.app, {interval:2000}, ['app_css']);
  gulp.watch(css.views,{interval:2000}, ['views_css']);
  gulp.watch(css.components,{interval:2000}, ['components_css']); 
  gulp.watch(css.libs,{interval:2000}, ['libs_css']);
  gulp.watch([

    './css/project/app.min.css',
    './css/project/app.views.min.css',
    './css/project/app.components.min.css',
    './css/project/libs.min.css'

    ], {interval:2000}, ['project_css']);

  gulp.watch(compiled.pugIndex, ['pug_index']);
  gulp.watch(compiled.pugBase, ['pug_index','pug_base','pug_views_with_extends_all']);
  gulp.watch(compiled.pugViews, ['pug_views','pug_views_with_extends']);
  gulp.watch(compiled.pugComponents, ['pug_components']);

  gulp.watch([

    './css/app/**/*.css',
    './css/libs/**/*.css',

    './js/app/**/*.js',
    './js/app/**/*.css',
    './js/app/**/*.html',

    './js/libs/**/*.js',

    './html/**/*',


  ], function(event){
    console.log('[' + event.type +'] ' + event.path);
    browserSync.reload();
  });


});


gulp.task('build', function(callback) {

  runSequence(

    ['coffee_all','stylus_all','stylus_components','pug_index', 'pug_base','pug_views','pug_views_with_extends','pug_components'],
    'buildit',
    ['libs_js','app_js', 'views_js', 'components_js'],
    'project_js',
    ['libs_css','app_css', 'views_css', 'components_css'],
    'project_css',
    'structure',
    // 'copy',

    callback
  );


});




gulp.task('default', ['build'], function(){
  gulp.start('server');
  gulp.start('watch');
});




