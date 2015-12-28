var gulp = require('gulp');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');

var jsFiles = ['*.js', 'src/**/*.js'];

gulp.task('style', () => {
    return gulp.src(jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe(jscs())
        .pipe(jscs.reporter());
});

gulp.task('inject', () => {
    var wiredep = require('wiredep').stream;
    var wiredepSrc = './src/views/*.html';
    var wiredepOptions = {
        bowerJson: require('./bower.json'),
        directory: './public/lib',
        ignorePath: '../../public'
    };

    var gulpDest = './src/views';

    var inject = require('gulp-inject');
    var injectSrc = gulp.src(['./public/css/*.css',
                              './public/js/*.js'], {
        read: false
    });
    var injectOptions = {
        ignorePath: '/public'
    };

    return gulp.src(wiredepSrc)
        .pipe(wiredep(wiredepOptions))
        .pipe(inject(injectSrc, injectOptions))
        .pipe(gulp.dest(gulpDest));
});

gulp.task('serve', ['style', 'inject'], () => {
    var options = {
        script: 'app.js',
        delayTime: 1,
        env: {
            'PORT': 5000
        },
        watch: jsFiles
    };
    return nodemon(options)
        .on('restart', (ev) => {
            console.log('Restarting');
        });
});