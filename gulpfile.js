"use strict";

var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var mqpacker = require("css-mqpacker"); //Для сортировки медиа запросов.
var minify = require("gulp-csso");
var rename = require("gulp-rename"); //Для перемеинования CSS файла.
var imagemin = require("gulp-imagemin");
var svgmin = require("gulp-svgmin");
var svgstore = require("gulp-svgstore");
var del = require("del");
var uglify = require("gulp-uglify");
var server = require("browser-sync");
var run = require("run-sequence"); //Для запуска build

gulp.task("clean", function() {
    return del("build");
})

gulp.task("copy", function() {
    return gulp.src([
            "img/**/*",
            "js/**",
            "fonts/**/*.{woff, woff2}",
            "*.html"
        ], {
            base: "." //Родительский каталог откуда копировать
        })
        .pipe(gulp.dest("build"))
})

gulp.task("clean-icons-folder", function() {
    return del("build/img/icons");
})



gulp.task("style", function() {
    gulp.src("less/style.less")
        .pipe(plumber())
        .pipe(less())
        .pipe(postcss([
            autoprefixer({
                browsers: [
                    ">2%",
                    "last 1 version",
                    "last 2 Chrome versions",
                    "last 2 Firefox versions",
                    "last 2 Opera versions",
                    "last 2 Edge versions"
                ]
            }),
            mqpacker({
                sort: true
            })
        ]))
        .pipe(gulp.dest("build/css"))
        .pipe(minify())
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest("build/css"))
        .pipe(server.stream());
});

gulp.task("html-watch", function() {
    gulp.src("*.html")
        .pipe(gulp.dest("build"));
});

gulp.task("uglifyjs", function() {
    gulp.src("build/js/script.js")
        .pipe(uglify())
        .pipe(rename("script.min.js"))
        .pipe(gulp.dest("build/js"))
});

gulp.task("watch-js", function() {
    gulp.src("js/script.js")
        .pipe(uglify())
        .pipe(rename("script.min.js"))
        .pipe(gulp.dest("build/js"))
});

gulp.task("images", function() {
    return gulp.src("build/img/**/*.{png,jpg,gif}")
        .pipe(imagemin([
            imagemin.optipng({ optimizationlevel: 3 }),
            imagemin.jpegtran({ progressive: true })
        ]))
        .pipe(gulp.dest("build/img"));
})

gulp.task("svg-min", function() {
    return gulp.src("build/img/*.svg")
        .pipe(svgmin())
        .pipe(gulp.dest("build/img"));
})

gulp.task("symbols", function() {
    return gulp.src("build/img/icons/*.svg")
        .pipe(svgmin())
        .pipe(svgstore({
            inlineSvg: true
        }))
        .pipe(rename("symbols.svg"))
        .pipe(gulp.dest("build/img"));
})

gulp.task("serve", function() {
    server.init({
        server: "build"
    });

    gulp.watch("less/**/*.less", ["style"]);
    gulp.watch("js/**/*.js", ["watch-js"]);
    gulp.watch("*.html", ["html-watch"]).on("change", server.reload);
});

gulp.task("build", function(fn) {
    run(
        "clean",
        "copy",
        "style",
        "images",
        "svg-min",
        "symbols",
        "clean-icons-folder",
        "uglifyjs",
        fn
    );
});