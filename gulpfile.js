// Adiciona os molulos requeridos nas function
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

/**
 * Functions
 */


// Js Plugins
function pluginJS(){
    return gulp
    .src([
        'node_module/jquery/dist/jquery.min.js'
    ])
    .pipe(concat('plugin.js'))
    .pipe(gulp.dest('js/'))
    .pipe(browserSync.stream())
}


// Função para copilar o Sass e adicionar os prefixos
function compilaSass(){
    return gulp
    .src('css/scss/*.scss')
    .pipe(sass({
        outputStyle: 'compressed'
    }))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.stream())
    
}

// Função para iniciar o browser
function browser(){
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
}

// Função de watch do Gulp
function watch(){
    gulp.watch('css/scss/*.scss', compilaSass);
    gulp.watch('js/main/*.js', gulpJs);
    gulp.watch([
        '*.html', 
        '*.php'
    ]).on('change', browserSync.reload);
}

// Função para Juntar o JS
function gulpJs(){
    return gulp.src('js/main/*.js')
    .pipe(concat('main.js'))
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('js/'))
    .pipe(browserSync.stream())
}


/**
 * Tasks
 */

// Tarefa de Gulp para função de SASS 
gulp.task('sass', compilaSass);

// Tarefa para iniciar o browser-sync
gulp.task('browser-sync', browser);

// Inicia a tarefa de watch
gulp.task('watch', watch);

gulp.task('mainjs', gulpJs);

gulp.task('otimizacaoImagem', otimizarImagem);

// Tarefa padrão do Gulp, que inicia watch e browser-sync
gulp.task('default', gulp.parallel([
    'watch',
    'browser-sync',
    'sass',
    'mainjs'
]));

// Tarefa de chamar plugin
gulp.task('pluginjs', pluginJS);
