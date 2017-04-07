var gulp = require('gulp'),
  util = require('util'),
  watchify = require('watchify'),
  browserify = require('browserify'),
  babelify = require('babelify'),

  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  merge = require('utils-merge'),

  sourcemaps = require('gulp-sourcemaps'),
  replace = require('gulp-replace'),
  rename = require('gulp-rename'),
  connect = require('gulp-connect');

var 
  entries = './src/main.js',  //指定打包入口文件
  buildpath = './dist/',      //输出路径
  buildname = 'build.js';     //输出文件名

function bundle(watch) {
  var bundler = browserify(entries, {
    debug: true
  })
  //使用babel转换es6代码
  //此处babel的各配置项格式与.babelrc文件相同
  .transform(babelify.configure({
    compact: false,
    presets: [
      'es2015',  //转换es6代码
      'stage-2'  //指定转换es7代码的语法提案阶段
    ]}
  ));

  if (watch) {
    bundler = watchify(bundler);
    bundler.on('update', function() {
      util.log('-> rebundling...');
      rebundle(bundler);
    });
  }

  function rebundle(bundler) {
    return bundler
      .bundle()                           //合并打包
      .on('error', function(e) {
        util.log('Browserify Error', e);
      })
      .pipe(source(buildname))            //将常规流转换为包含Stream的vinyl对象，并且重命名
      .pipe(buffer())                     //将vinyl对象内容中的Stream转换为Buffer
      .pipe(replace(/Object\.defineProperty\(exports,\s*"__esModule",\s*\{\s*value:\s*true\s*\}\);/g,'exports.__esModule = true;'))
      // 可选项，如果你不需要 sourcemaps，就删除
      .pipe(sourcemaps.init({loadMaps: true}))// 在这里将变换操作加入管道
      .pipe(sourcemaps.write('./'))     // 写入 .map 文件
      .pipe(gulp.dest(buildpath))         //输出打包后的文件
      .on('end', function(){
        util.log('-> rebundled')
      });
  }

  return rebundle(bundler);
}

gulp.task('browserify', function() {
  bundle(false);
});

gulp.task('browserify-watch', function() {
  bundle(true);
});

gulp.task('serve', function() {
  connect.server({
    name: 'Dev App',
    host: 'kkupload.kankan.com',
    port: 80,
    //livereload: true
  });
});

gulp.task('dev', ['browserify-watch']);
gulp.task('build', ['browserify']);
