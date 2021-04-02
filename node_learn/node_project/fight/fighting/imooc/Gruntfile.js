/**
 * Created by mac on 16/7/2.
 */
module.exports = function(grunt) {

    //项目配置。
    grunt.initConfig({
        watch: {
            jade: {
                files: ['views/**'],  //jsde模板 ， 视图文件
                options: {
                    livereload: true  // 文件出现改动重启服务
                }
            },
            js: {        //js文件 public/js 下 ， models下 ， schemas下的 js
                files: ['public/js/**', 'models/**/*.js', 'schemas/**/*.js'],
                //tasks: ['jshint'],
                options: {
                    livereload: true// 文件出现改动重启服务
                }
            },

            uglify: {
                files: ['public/**/*.js'],
                //tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },

            styles: {
                files: ['public/**/*.less'],
                tasks: ['less'],
                options: {
                    nospawn: true
                }
            }
        },

        //压缩js文件
        uglify: {
            my_target: {
                files: {
                    'public/build/app.js': ['public/js/*.js']
                }
            }
        },


        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    'public/build/index.css': 'public/less/*.less'
                }
            }
        },

        //实时监听 ， 监听app.js 。 自动重置
        nodemon: {
            dev: {
                options: {
                    file: 'app.js',  //监听app.js
                    args: [],
                    ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
                    watchedExtensions: ['js'],
                    watchedFolders: ['./'],
                    debug: true,
                    delayTime: 1,
                    env: {
                        PORT: 3000  //端口
                    },
                    cwd: __dirname
                }
            }
        },

        concurrent: {
            //这个任务还可以加任务
            tasks: ['nodemon', 'watch', 'less', 'uglify', /*'jshint'*/],
            options: {
                logConcurrentOutput: true
            }
        }

    });

    //任务插件
    grunt.loadNpmTasks('grunt-contrib-watch');
    //实时监听 ， 监听app.js 。 自动重置
    grunt.loadNpmTasks('grunt-nodemon');
    //grunt运行并发任务
    grunt.loadNpmTasks('grunt-concurrent');
    //less任务
    grunt.loadNpmTasks('grunt-contrib-less');
    //压缩文件
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.option('force', true);

    //注册任务
    grunt.registerTask('default', ['concurrent']);
};