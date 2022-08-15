/**
    Функция берет файлы из папки ./src
    И переносит их в ./dist
 */
export const copy = () => {
    return app.gulp.src(app.path.src.files) // Исходные файлы из src 
        .pipe(app.gulp.dest(app.path.build.files)); // ./dist
}