module.exports = function (grunt) {
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

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
                'package.json',
                'bower.json',
                '.bowerrc'
            ]
        },

        watch: {
            js: {
                files: [
                    'src/js/**/*.js',
                    'src/js/views/**/*.html',
                    'Gruntfile.js',
                    'server.js',
                    '*.json',
                    '.bowerrc'
                ],
                tasks: ['lint']
            },

            json: {
                files: [
                    'package.json',
                    'bower.json',
                    '.bowerrc'
                ],
                tasks: ['lint']
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jsonlint');

    grunt.registerTask('lint', ['jsonlint', 'jshint']);
};
