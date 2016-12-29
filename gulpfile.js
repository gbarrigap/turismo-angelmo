// include gulp
var gulp = require('gulp');

// include plug-ins
var jshint = require('gulp-jshint');

var concat = require('gulp-concat');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var clean_css = require('gulp-clean-css');

var js_lib_files = [
        'bower_components/jquery/dist/jquery.js',
        // 'bower_components/jquery-ui/jquery-ui.js',
        'bower_components/bootstrap/dist/js/bootstrap.js',
        //'bower_components/datatables.net/js/jquery.dataTables.js',
        //'bower_components/datatables.net-buttons/js/dataTables.buttons.js',
        //'bower_components/jquery.inputmask/dist/jquery.inputmask.bundle.js',
        // 'bower_components/iCheck/icheck.js',
        // 'bower_components/pnotify/dist/pnotify.js'
];

var js_custom_files = [
    // 'Scripts/Custom/Clientes/Contactos.js',
    // 'Scripts/Custom/Clientes/Monitor.js'
];

var css_lib_files = [
    'bower_components/jquery-ui/themes/smoothness/jquery-ui.css',
    'bower_components/bootstrap/dist/css/bootstrap.css',
    // 'bower_components/datatables.net-dt/css/jquery.dataTables.css',
    // 'bower_components/datatables.net-buttons-dt/css/buttons.dataTables.css',
    // 'bower_components/font-awesome/css/font-awesome.css',
    // 'bower_components/iCheck/skins/all.css',
    // 'bower_components/pnotify/dist/pnotify.css'
];

var css_custom_files = [
    'Content/site.css',
    'Content/Navbar.scss',
    'Content/Contactos.scss',
];

// JS hint task
gulp.task('jshint', function() {
  gulp.src('./src/scripts/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Concatenate JS files
gulp.task('lib_js', function () {
    return gulp.src(js_lib_files)
        .pipe(concat('lib.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
});

// Concatenate custom JS files
gulp.task('custom_js', function () {
    return gulp.src(js_custom_files)
        .pipe(concat('custom.js'))
        .pipe(gulp.dest('build/js'));
});

gulp.task('lib_css', function () {
    return gulp.src(css_lib_files)
        .pipe(concat('lib.min.css'))
        .pipe(clean_css({ compatibility: 'ie8', processImport: false }))
        .pipe(gulp.dest('build/css'));
})

gulp.task('custom_css', function () {
    return gulp.src(css_custom_files)
        .pipe(concat('custom.css'))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('build/css'));
});

gulp.task('watch', function () {
    gulp.watch(js_custom_files, ['custom_js']);
    gulp.watch(css_custom_files, ['custom_css']);
})

// Default task
gulp.task('default', [
    'lib_js',
    // 'custom_js',
    'lib_css',
    // 'custom_css',
    // 'icons',
    // 'images'
]);
