/* GULP CONFIG STRUCTURE
    #1 Connect extented modules
    #2 Production mode necessary tasks
        #2.1 SASS COMPILATION
        #2.2 AUTOPRIFEXIR
        #2.3 BROWSER SYNC
        #2.4 WATCHER
    #3 Build tasks
        #3.1 CSS / JS BEATYFIER
        #3.2 CSS / JS MINIDICATION
        #3.3 WEBP IMAGE CONVERTER
        #3.4 SVG SPRITE
*/

const gulp       = require('gulp'),
    sassGlob = require('gulp-sass-glob'),
    sass         = require('gulp-sass'), //Подключаем Sass пакет,
    browserSync  = require('browser-sync'), // Подключаем Browser Sync
    concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
    cache        = require('gulp-cache'), // Подключаем библиотеку кеширования
    autoprefixer = require('gulp-autoprefixer'),// Подключаем библиотеку для автоматического добавления префиксов
    gutil        = require('gulp-util'),
    plumber      = require('gulp-plumber'), // Подключаем plumber (SCSS выдает ошибки типа @import)
    webp         = require('gulp-webp'),
    svgSprite    = require('gulp-svg-sprite');

//----------------------------------------------------------------------

const browserSyncer =   browserSync({
          server: {
          baseDir: "./"
          },
          notify: false,

  });

function runScss(cb){
  return gulp.src('app/scss/style.scss')


      .pipe(autoprefixer(['last 25 versions', '> 0.25%', 'ie 8', 'ie 7'], { cascade: true }))
      .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(gulp.dest('./'))
      .pipe(browserSyncer.reload({stream: true}))
      cb();
}

gulp.task('sass', gulp.series(runScss)); // Создаем таск Sass


function watchFiles(cb){

  gulp.watch('app/scss/**/*.scss',runScss); // Наблюдение за sass файлами в папке sass
  gulp.watch('*.html', browserSyncer.reload);
  gulp.watch('app/js/**/*.js', browserSyncer.reload);   // Наблюдение за JS файлами в папке js
  cb();
}
gulp.task('watch', gulp.parallel(watchFiles))
// WEB-P IMAGE CONVERT TASK
function doWebp(cb){

      gulp.src('assets/img/**/*')
      .pipe(webp())
      .pipe(gulp.dest(function (file) {
          return file.base;
      }));
      console.log('Images have been converted')
      cb();



}
gulp.task('convert', gulp.series(doWebp));

// SVG sprite maker
const svgConfig = {
   shape: {
     dimension: { // Set maximum dimensions
       maxWidth: 132,
       maxHeight: 132
     },
     spacing: { // Add padding
       padding: 10
     }

   },
   mode: {
     view: { // Activate the «view» mode
       bust: false,
       render: {
         scss: true // Activate Sass output (with default options)
       }
     },
     symbol: true // Activate the «symbol» mode
   }
 };
 function makeSprite(cb){

     gulp.src('app/images/**/*.svg')
       .pipe(svgSprite(svgConfig))
       .pipe(gulp.dest('app/img/sprites'));
      cb();
 }

gulp.task('spriter', gulp.series(makeSprite));



gulp.task('default', gulp.parallel(['watch']));


exports.doWebp = doWebp;
