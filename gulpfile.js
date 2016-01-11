var gulp = require('gulp'),
    concat = require('gulp-concat'),
    babel = require('gulp-babel'),
    connect = require('gulp-connect');
    
gulp.task('default', ['build']);

gulp.task('build', ['vendor', 'js', 'html']);
gulp.task('serve', ['build', 'watch'], function(){
    connect.server({
        livereload: true,
        fallback: 'index.html',
        port: 6700,
        root: 'public'
    });
});

gulp.task('html', function(){
   return gulp.src('src/*.html').pipe(gulp.dest('public')); 
});
gulp.task('js', function(){
    return gulp.src([
            'src/tools/*.js',
            'src/engine/*.js',
            'src/components/*.js',
            'src/default.js'
        ])
        .pipe(concat('app.js'))
        .pipe(babel())
        .pipe(gulp.dest('public'));
});
gulp.task('vendor', function(){
    return gulp.src([
        'bower_components/d3/d3.min.js',
        'bower_components/paper/dist/paper-full.min.js'
    ])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('public'));
});
gulp.task('watch', function(){
   gulp.watch('src/**/*.js', ['js']);
   gulp.watch('src/**/*.html', ['html']);
});