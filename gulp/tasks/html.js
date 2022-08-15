import fileInclude from "gulp-file-include";
import webpHtmlNosvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number";

/**
    Функция берет файлы из папки ./src/html
    И переносит их в ./dist
 */
    export const html = () => {
        return app.gulp.src(app.path.src.components) // Исходные файлы из ./src/layout - можем изменить название папки html
            .pipe(app.plugins.plumber(
                app.plugins.notify.onError({
                    title: "HTML",
                    message: "Error <%= error.message %>"
                })
            ))
            .pipe(fileInclude())
            .pipe(app.plugins.replace(/@img\//g, 'img/'))
            .pipe(
                app.plugins.ifPlugin(
                    app.isBuild,
                    webpHtmlNosvg()
                )
            )
            .pipe(
            // для css и js файлов делаем ключ чтобы кеширование в браузере тоже обновлялось и не показывало все из кеша
                app.plugins.ifPlugin(
                    app.isBuild,
                    versionNumber({
                        'value': '%DT%',
                        'append': {
                            'key': '_v',
                            'cover': 0,
                            'to': [
                                'css',
                                'js'
                            ]
                        },
                        'output': {
                            'file': 'gulp/version.json'
                        }
                    })
                )
            )
            .pipe(app.gulp.dest(app.path.build.html)) // ./dist
            .pipe(app.plugins.browsersync.stream()); 
    }