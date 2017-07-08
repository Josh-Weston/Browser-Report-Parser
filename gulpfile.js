var gulp = require('gulp');
var browserSync = require('browser-sync').create();

/* Create a new task for watching if desired, or see below.
gulp.task('watch:css', function() {
gulp.watch('css/*.css', function() {
browserSync.reload();
});
});
*/

//Point of entry
gulp.task('default', function() {

    browserSync.init({
        server: {
            baseDir:"./"
        }
    });

/* Could view all files in all directories */
//gulp.watch('./**/*.*', function() {
//     browserSync.reload();
//});

    //Specific files and directories
    gulp.watch(['styles.css', 'index.html', 'index.js'], function() {
         browserSync.reload();
    });

});
