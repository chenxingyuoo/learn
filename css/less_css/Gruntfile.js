module.exports = function (grunt) {
    // 项目配置

    var cp = 'static/compiled/';
    var cpc = cp+'css/';
    grunt.initConfig({
        /*clean: {
            dest: ['dist/!**!/!*','static/compiled/!**!/!*'],
            cp: [cp],
        },
        transport: {
            options: {
                paths: ['static/js'],
                debug: false
            },
            js: {
                files: [
                    {
                        cwd: 'static/js',
                        src: ['**!/!*.js','!debug/!*.js','!seajs/sea.js'],
                        dest: 'static/compiled/',
                        expand: true
                    }
                ]
            },
            tpl: {
                files: [ dd
                    {
                        cwd: 'static/',
                        src: [
                            'tpl/!**!/!*.html',
                            '!tpl/index.html'
                        ],
                        dest: 'static/js/',
                        expand: true
                    }
                ]
            }
        },
        uglify: {
            my_target: {
                files: {
                    'dist/static/js/app.js': ['static/js/seajs/sea.js',cp + '**!/!*.js']
                }
            }
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['static/img/!**!/!*'],
                        dest: 'dist/static/img/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['static/fonts/!**!/!*'],
                        dest: 'dist/static/fonts/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['*.php'],
                        dest: 'dist/'
                    },
                    {expand: false, src: ['index_fn.html'], dest: 'dist/index.html'},


                    // includes files within path and its sub-directories
                    /!*{expand: true, src: ['path*!//!**'], dest: 'dest/'},

                 // makes all src relative to cwd
                 {expand: true, cwd: 'path/', src: ['**'], dest: 'dest/'},

                 // flattens results to a single level
                 {expand: true, flatten: true, src: ['path*!//!**'], dest: 'dest/', filter: 'isFile'}*!/
                ]
            }
        },*/
        less: {
            development: {
                files: [{
                    expand: true,
                    cwd: 'static/less',
                    src: ['**/*.less'],
                    dest: 'static/css',
                    ext: '.css'
                }]
            }
        },
        concat: {
            //css文件合并
            css: {
                //当前grunt项目中路径下的src/css目录下的所有css文件
                src: [
                    cpc+'reset.css',
                    cpc+'lc.css',
                    cpc+'common.css',
                    cpc+'*.css',
                ],
                //生成到grunt项目路径下的dist文件夹下为all.css
                dest: 'dist/static/css/style.css'
            }

        },

        cssmin: {
            css: {
                files: [
                    {
                        expand: true,
                        cwd: 'static/css/',
                        src: ['**/*.css'],
                        dest: 'static/compiled/css'
                    },

                ]
            }
        },
        watch: {
            tpl: {
                files: ['static/tpl/**/*.html'],
                tasks: ['transport:tpl']
            },
            less: {
                files: ['static/less/**/*.less'],
                tasks: ['less'],
                options: {
                    spawn: false,
                }
            }
        }
    });
    // 加载任务的插件
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-cmd-transport');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');

    // 默认任务
    grunt.registerTask('default', ['clean','transport','cssmin','concat','uglify','copy']);
}