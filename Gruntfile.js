module.exports = function (grunt) {
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        clean: {
            dist: ['dist/**/*'],
            src: ['src/index.html']
        },

        copy: {
            css: {
                files: [{
                    expand: false,
                    src: ['src/css/app.css'],
                    dest: 'dist/css/app.css'
                    
                }]
            },

            data: {
                expand: true,
                cwd: 'src/data',
                src: ['*'],
                flatten: true,
                dest: 'dist/data/'
            },
            
            fonts: {
                files: [{
                    expand: true,
                    cwd: 'src/fonts',
                    src: ['*'],
                    flatten: true,
                    dest: 'dist/fonts/'
                }]
            },

            images: {
                files: [{
                    expand: true,
                    cwd: 'src/images',
                    src: ['*'],
                    flatten: true,
                    dest: 'dist/images/'
                }]
            },

            templates: {
                files: [{
                    expand: true,
                    cwd: 'src/js/views',
                    src: ['*.html'],
                    flatten: false,
                    dest: 'dist/js/views'
                }]
            }
        },

        cssmin: {
            minify: {
                files: [{
                    expand: true,
                    cwd: 'src/css',
                    dest: 'dist/css',
                    src: ['app.css'],
                    ext: '.min.css'
                }]
            }
        },

        htmlangular: {
            options: {
                customattrs: [
                    'autocomplete'
                ],
                customtags: [
                    'card-info'
                ],
                tmplext: 'html'
            },

            files: {
                src: ['src/js/views/**/*.html']
            }
        },

        jshint: {
            all: {
                files: {
                    src: [
                        'Gruntfile.js',
                        'server.js',
                        'src/js/**/*.js'
                    ]
                }
            }
        },

        jsonlint: {
            all: [
                'src/data/*.json',
                'package.json',
                'bower.json',
                '.bowerrc'
            ]
        },

        less: {
            app: {
                files: {
                    'src/css/app.css': 'src/less/app.less'
                }
            }
        },

        preprocess: {
            dist: {
                options: {
                    context: {
                        NODE_ENV: 'prod'
                    }
                },
                src: 'src/templates/index.html',
                dest: 'dist/index.html'
            },
            src: {
                options: {
                    context: {
                        NODE_ENV: 'dev'
                    }
                },
                src: 'src/templates/index.html',
                dest: 'src/index.html'
            }
        },

        uglify: {
            concat: {
                options: {
                    compress: false,
                    preserveComments: true
                },
                files: {
                    'dist/js/app.js': [
                        'src/bower_modules/angular/angular.js',
                        'src/bower_modules/angular-sanitize/angular-sanitize.js',
                        'src/bower_modules/angular-resource/angular-resource.js',
                        'src/bower_modules/angular-route/angular-route.js',
                        'src/bower_modules/angular-bootstrap/ui-bootstrap-tpls.js',
                        'src/js/**/*.js'
                    ]
                }
            },

            minify: {
                files: {
                    'dist/js/app.min.js': ['dist/js/app.js']
                }
            }
        },

        watch: {
            js: {
                files: [
                    'src/js/**/*.js',
                    'src/js/views/**/*.html',
                    'Gruntfile.js',
                    'server.js',
                    'package.json',
                    'bower.json',
                    '.bowerrc'
                ],
                tasks: ['lint']
            },

            json: {
                files: [
                    'src/data/*.json',
                    'package.json',
                    'bower.json',
                    '.bowerrc'
                ],
                tasks: ['lint']
            },

            less: {
                files: 'src/less/app.less',
                tasks: ['less']
            },

            preprocess: {
                files: 'src/templates/*.html',
                tasks: ['preprocess']
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-html-angular-validate');
    grunt.loadNpmTasks('grunt-jsonlint');
    grunt.loadNpmTasks('grunt-preprocess');

    grunt.registerTask('build', [
        'lint', 'clean', 'preprocess', 'copy:data', 'copy:fonts',
        'copy:images', 'copy:templates', 'minify'
    ]);
    grunt.registerTask('minify', ['uglify:concat', 'uglify:minify', 'copy:css', 'cssmin']);
    grunt.registerTask('lint', ['jsonlint', 'jshint', 'htmlangular']);
};
