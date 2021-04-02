/**
 * Created by mac on 16/7/6.
 */
module.exports = function (grunt) {
    //项目配置。
    grunt.initConfig({
        watch: {
            jade: {
                files: ['views/**'], //jsde模板 ， 视图文件
                options: {
                    livereload: true  // 文件出现改动重启服务
                }
            },
            js: {
                //监听 这些目录下的js文件
                files: ['public/js/**', 'models/**', 'schemas/**', 'config/**', 'controllers/**'],
                options: {
                    livereload: true  // 文件出现改动重启服务
                }
            },
            //监听less文件
            less: {
                files: ['public/less/**/*.less'],  //// public 目录下的 less 文件夹 所有 less 文件
                tasks: ['less'],  //添加 一个 less 任务
                options: {
                    spawn: false,
                }
            }
        },

        //less任务 ， 编译成css
        less :{
            main: {
                expand: true,
                cwd: 'public/less/',  // public 目录下的 less 文件
                src: ['**/*.less'],   //所有的less文件
                dest: 'public/css/',  // 目标是 ， public 目录下 css文件
                ext: '.css' }         //后缀名为 .css
        },

        //压缩js文件
        uglify: {
            my_target: {
                files: {
                    // bootstrap.js 依赖于jquery.js 。利用个小技巧 ，在jquery 前面加个 a 变成ajquery 排在文件夹的第一个。打包先打jquery ？ 解决了这个保存  Bootstrap's JavaScript requires jQuery
                    'public/build/js/app.js': ['public/js/**/*.js']
                }
            }
        },

        //压缩css文件
        cssmin: {
            my_target: {
                files: {
                    'public/build/css/style.css': ['public/css/*.css']
                }
            }
        },

        //实时监听 ， 监听app.js 。 自动重置
        nodemon: {
            dev: {
                options: {
                    file : 'app.js',
                    args: [],
                    ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
                    watchedExtensions: ['js'],
                    watchedFolders: ['/'],
                    debug: true,
                    delayTime: 1,
                    env: {
                        PORT: 3005  //端口
                    },
                    cwd: __dirname
                },
                script: './app.js' , //指定app.js, 监听app.js
            }
        },

        //这个任务还可以加任务
        concurrent: {
            tasks: ['nodemon', 'watch' ,'less', 'uglify', 'cssmin'/*'jshint'*/],
            options: {
                logConcurrentOutput: true
            }
        }

    });

    //任务插件

    //watch 可以监控特定的文件，在添加文件、修改文件、或者删除文件的时候自动执行自定义的任务，比如 livereload 等等。
    grunt.loadNpmTasks('grunt-contrib-watch');
    //实时监听 ， 监听app.js 。 自动重置
    grunt.loadNpmTasks('grunt-nodemon');
    //grunt运行并发任务
    grunt.loadNpmTasks('grunt-concurrent');
    //less任务
    grunt.loadNpmTasks('grunt-contrib-less');
    //压缩js文件
    grunt.loadNpmTasks('grunt-contrib-uglify');
    //压缩css文件
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.option('force', true);

    //注册任务
    grunt.registerTask('default', ['concurrent']);
};