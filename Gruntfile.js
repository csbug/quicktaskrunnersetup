module.exports = function(grunt) {

    // ===========================================================================
    // CONFIGURE GRUNT ===========================================================
    // ===========================================================================
    grunt.initConfig({

        // get the configuration info from package.json ----------------------------
        // this way we can use things like name and version (pkg.name)
        pkg: grunt.file.readJSON('package.json'),

        // concat all js to main js -----------------------------------
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: ['src/js/*.js'], // User files order by sequece of use
                dest: 'resources/js/main.js',
            },
        },

        // configure uglify to minify js files -------------------------------------
        uglify: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                files: {
                    'resources/js/main.min.js': 'resources/js/main.js'
                }
            }
        },

        // compile sass stylesheets to css -----------------------------------------
        sass: {
            dist: {
                files: {
                    'resources/css/style.css': 'src/scss/style.scss'
                }
            }
        },
        // minify stylesheets -----------------------------------------
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'resources/css/',
                    src: ['*.css', '!*.min.css'],
                    dest: 'resources/css',
                    ext: '.min.css'
                }]
            }
        },

        // configure watch to auto update ------------------------------------------
        watch: {
            stylesheets: {
                files: ['src/**/*.scss'],
                tasks: ['sass', 'cssmin']
            },
            scripts: {
                files: ['src/**/*.js'],
                tasks: ['concat','uglify']
            }
        }

    });

    // ===========================================================================
    // LOAD GRUNT PLUGINS ========================================================
    // ===========================================================================
    // Javascript
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // Stylesheet
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    // watcher
    grunt.loadNpmTasks('grunt-contrib-watch');

    // ===========================================================================
    // CREATE TASKS ==============================================================
    // ===========================================================================
    grunt.registerTask('default', ['concat', 'uglify', 'sass', 'cssmin']);

};