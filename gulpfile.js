var gulp = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    plumber = require( 'gulp-plumber'),
    size = require('gulp-size'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    minifyCss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    uglify = require('gulp-uglify'),
    packageJson = require('./package.json'),
    del = require('del'),
    clean = require('gulp-clean'),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector'),
    csso = require('gulp-csso');


gulp.task('clean', function() {
    return gulp.src('dist',{read:false})
    .pipe(clean());
});


gulp.task('rev',function(){
    return gulp.src(['rev/*.json', '*.html'])
    .pipe(revCollector({
        replaceReved: true
    })).
    pipe(gulp.dest('./'));

});


gulp.task('concat', ['clean'],function() {  
//- 创建一个名为 concat 的 task
    gulp.src(['./css/base.css'])    //- 需要处理的css文件，放到一个字符串数组里
        //.pipe(concat('base.min.css'))                            //- 合并后的文件名
        .pipe(minifyCss())                                      //- 压缩处理成一行
        .pipe(rev())                                            //- 文件名加MD5后缀
        .pipe(gulp.dest('./dist'))                               //- 输出文件本地
        .pipe(rev.manifest())                                   //- 生成一个rev-manifest.json
        .pipe(gulp.dest('./rev'));  
                          //- 将 rev-manifest.json 保存到 rev 目录内
});



gulp.task('watch', function () {
    gulp.watch(['./css/*.css'], ['concat']);
    gulp.watch(['./rev/*.json'], ['rev']);
});

gulp.task('default', ['clean','concat', 'rev']);