var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var connect = require('gulp-connect');
//var copyf= require('gulp');

//Copy images 
gulp.task('copyfile', function(){
gulp.src('src/assets/images/**.{jpg,png,gif,svg}').pipe(gulp.dest('dist/assets/images'))
.pipe(connect.reload());
console.log("Images copied!");
});

gulp.task('copyaudios', function(){
gulp.src('src/audio/**.{mp3,wav,mp4,wv}').pipe(gulp.dest('dist/assets/audio'))
.pipe(connect.reload());
console.log("Audios copied!");
});

// gulp.task('copyjs', function(){
// gulp.src('src/js/**.js').pipe(gulp.dest('dist/js'))
// .pipe(connect.reload());
// console.log("copy!!!");
// });

gulp.task('copyjson', function(){
gulp.src('src/data/**.json').pipe(gulp.dest('dist/data/'))
.pipe(connect.reload());
console.log("json data copied!");
});

gulp.task('sass',function(){
  return gulp.src('src/sass/style.{scss,sass}')
  .pipe(sass()).pipe(gulp.dest('dist/css'))
  .pipe(connect.reload());s
});

// ['dependance task'] always is launch first.
gulp.task('start_watch',function(){
gulp.watch('src/sass/*.{scss,sass}', ['sass']);
gulp.watch('src/pug/*.pug', ['convert']);
gulp.watch('src/js/*.js', ['browserify']);
gulp.watch('src/data/**.json', ['copyjson']);
gulp.watch('src/assets/images/**.{png,jpg,svg,gif}', ['copyfile']);
gulp.watch('src/assets/audio/**.{mp3,wav,mp4,wv}', ['copyaudios'])
});

gulp.task('convert', function(){
  return gulp.src('src/pug/index.pug')
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('dist/'))
  .pipe(connect.reload());
});

 gulp.task('browserify', function() {
    return browserify('src/js/index.js').bundle()
        // vinyl-source-stream makes the bundle compatible with gulp
        .pipe(source('index.js')) // Desired filename
        // Output the file
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
});

 gulp.task('connect', function(){
  connect.server({
    name: "profile_material_design", 
    root: 'dist/',
    port: '5000',
    livereload: true,
  });
 });

gulp.task('default', ['connect','start_watch','copyfile','copyaudios']);
gulp.task('load', ['start_watch','copyfile','copyaudios']);
