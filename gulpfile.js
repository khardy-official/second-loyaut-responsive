const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
// const imagemin = require('gulp-imagemin');

// Static server
gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('styles', function () {
    return gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(rename({prefix: "", suffix: ".min",}))
        .pipe(autoprefixer({cascade: false }))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

gulp.task('watch', function () {
    gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel("styles"));
    gulp.watch("src/*.html").on('change', gulp.parallel('html'));
});

gulp.task('html', function () {
    return gulp.src("src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("dist/"));
});

gulp.task('scripts', function () {
    return gulp.src("src/js/**/*.js")
        .pipe(gulp.dest("dist/js"));
});

gulp.task('icons', function () {
    return gulp.src("src/icons/**/*")
        // .pipe(imagemin())
        .pipe(gulp.dest("dist/icons"));
});

gulp.task('img', function () {
    return gulp.src("src/img/**/*")
        // .pipe(imagemin())
        .pipe(gulp.dest("dist/img"));
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'scripts', 'icons', 'img', 'html'));