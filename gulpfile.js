
const gulp = require('gulp'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    browserify = require('gulp-browserify'),
    webserver = require('gulp-webserver');

const src = './src',
    target = './dist'



gulp.task("html", function() {
    gulp.src(src + '/views/**/*.html')
        .pipe(gulp.dest( target ));
});

gulp.task("scss", function() {
    gulp.src(src + '/styles/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest( target + '/css'));
});

gulp.task('js', function() {
    gulp.src(src + '/scripts/**/*.js')
        .pipe(browserify({
            transform: 'reactify',
            debug: 'true'
        }))
        .on('error', function(err) {
            console.error('Error!', err.message)
        })
        .pipe(gulp.dest(target + '/js'))
});

gulp.task('watch', function() {
    gulp.watch( src + '/views/**/*.html', ['html'])
    gulp.watch( src + '/styles/**/*.scss', ['scss'])
    gulp.watch( src + '/scripts/**/*.js', ['js'])
})

gulp.task('webserver', function() {
    gulp.src( target + '/')
        .pipe(webserver({
            livereload: true,
            open: true
        }))
})

gulp.task('default', ['watch','html','scss','js'])