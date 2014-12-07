module.exports = function (grunt) {

  var vendor_body = [
    'bower/jquery/dist/jquery.min.js',
    'bower/lodash/dist/lodash.min.js',
    'bower/momentjs/min/moment.min.js',
    'bower/stringjs/lib/string.min.js',
    'bower/bootstrap/dist/js/bootstrap.min.js',
    'bower/angular/angular.js',
    'bower/angular-i18n/angular-locale_en-gb.js',
    'bower/angular-animate/angular-animate.min.js',
    'bower/angular-cookies/angular-cookies.min.js',
    'bower/angular-resource/angular-resource.min.js',
    'bower/angular-ui-utils/ui-utils.min.js',
    'bower/angular-ui-router/release/angular-ui-router.min.js',
    'bower/angular-bootstrap/ui-bootstrap-tpls.min.js',
    'bower/greensock/src/minified/TweenMax.min.js',
    'bower/ng-Fx/dist/ngFx.min.js',
    'bower/angular-loading-bar/build/loading-bar.min.js',
    'bower/angular-hotkeys/build/hotkeys.min.js',
    'bower/angular-local-storage/dist/angular-local-storage.min.js',
    'bower/select2/select2.min.js',
    'bower/angular-ui-select2/src/select2.js',
    'bower/angular-block-ui/dist/angular-block-ui.min.js',
    'bower/angular-toastr/dist/angular-toastr.min.js'
  ];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        separator: ';\n',
        stripBanners: true
      },
      app: {
        files: {
          'public/js/app.concat.js': [
            'app/modules/lodash/*.module.js',
            'app/modules/momentjs/*.module.js',
            'app/modules/stringjs/*.module.js',
            'app/modules/mongodb/*.module.js',
            'app/modules/infrastructure/*.module.js',
            'app/modules/auth/*.module.js',
            'app/modules/bootstrap-widgets/*.module.js',
            'app/modules/handy-widgets/*.module.js',
            'app/modules/**/*.js',
            'app/modules/**/**/*.js',
            'app/features/**/*.module.js',
            'app/features/**/*.js',
            'app/app.module.js',
            'app/*.js',
            'app/**/*.module.js',
            'app/**/*.js',
            'app/**/**/*.js',
            'app/**/**/**/*.js']
        }
      },
      // remember - use the MINIFIED versions of the files
      vendor_body: {
        files: {
          'public/js/vendor-body.js': vendor_body
        }
      },
      vendor_header: {
        files: {
          'public/js/vendor-header.js': [
            'bower/modernizr/modernizr.js'
          ]
        }
      }
    },
    ngtemplates: {
      app: {
        src: [
          'app/*.html',
          'app/**/*.html',
          'app/**/**/*.html',
          'app/**/**/**/*.html'
        ],
        dest: 'public/js/app.templates.js',
        options: {
          htmlmin: { collapseWhitespace: true, collapseBooleanAttributes: true }
        }
      }
    },
    cssmin: {
      combine: {
        files: {
          'public/styles/style.min.css': [
            'bower/animate.css/animate.min.css',
            'bower/angular-hotkeys/build/hotkeys.min.css',
            'bower/angular-loading-bar/build/loading-bar.min.css',
            'bower/bootstrap/less/bootstrap.css',
            'bower/font-awesome/less/font-awesome.css',
            'bower/select2/select2.css',
            'bower/select2-bootstrap3-css/select2-bootstrap.css',
            'bower/angular-ui-select2/docs/styles.css',
            'bower/angular-block-ui/dist/angular-block-ui.min.css',
            'bower/angular-toastr/dist/angular-toastr.min.css',
            'less/style.css'
          ]
        }
      }
    },
    copy: {
      fonts: {
        files: [
          {
            expand: true,
            cwd: 'bower/font-awesome/fonts/',
            src: ['**'],
            dest: 'public/fonts/',
            flatten: true,
            filter: 'isFile'
          },
          {
            expand: true,
            cwd: 'bower/bootstrap/dist/fonts/',
            src: ['**'],
            dest: 'public/fonts/',
            flatten: true,
            filter: 'isFile'
          }
        ]
      },
      select2_images: {
        files: [
          {
            expand: true,
            cwd: 'bower/select2',
            src: ['**/*.png', '**/*.gif'],
            dest: 'public/styles/',
            flatten: false,
            filter: 'isFile'
          }
        ]
      }
    },
    jshint: {
      // define the files to lint
      files: ['app/*.js', 'app/**/*.js', 'app/**/**/*.js', 'app/**/**/**/*.js'],
      // configure JSHint (documented at http://www.jshint.com/docs/)
      options: {
        // more options here if you want to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true
        }
      }
    },
    less: {
      app: {
        options: {
          paths: ['bower/bootstrap/less', 'less']
        },
        files: {
          "bower/bootstrap/less/bootstrap.css": "bower/bootstrap/less/bootstrap.less",
          "bower/font-awesome/less/font-awesome.css": "bower/font-awesome/less/font-awesome.less",
          "less/style.css": "less/style.less"
        }
      }
    },
    concurrent: {
      preFlight: {
        tasks: ['jshint', 'less:app'],
        options: {
          logConcurrentOutput: true
        }
      },
      liftOff: {
        tasks: ['copy', 'cssmin', 'concat:vendor_header', 'concat:vendor_body', 'concat:app', 'ngtemplates'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    fileExists : {
      scripts : vendor_body
    },
    express: {
      options: {
        // Override defaults here
      },
      dev: {
        options: {
          script: 'server.js',
          debug : true
        }
      },
      prod: {
        options: {
          script: 'server.js',
          node_env: 'production'
        }
      },
      test: {
        options: {
          script: 'server.js'
        }
      }
    },
    watch: {
      grunt: {
        files: 'Gruntfile.js',
        tasks: ['concurrent:preFlight', 'concurrent:liftOff'],
        options: {
          interrupt: true,
          livereload: true
        }
      },
      express: {
        files:  [ 'server.js' ],
        tasks:  [ 'express:dev' ],
        options: {
          spawn: false // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions. Without this option specified express won't be reloaded
        }
      },
      app: {
        files: '<%= jshint.files %>',
        tasks: ['jshint', 'concat:app'],
        options: {
          interrupt: true,
          livereload: true
        }
      },
      html: {
        files: [
          'public/index.html',
          'app/*.html',
          'app/**/*.html',
          'app/**/**/*.html',
          'app/**/**/**/*.html'
        ],
        tasks: ['ngtemplates'],
        options: {
          interrupt: true,
          livereload: true
        }
      },
      vendor_header: {
        files: '<%= concat.vendor_header.files %>',
        tasks: ['concat:vendor_header'],
        options: {
          interrupt: true,
          livereload: true
        }
      },
      vendor_body: {
        files: '<%= concat.vendor_body.files %>',
        tasks: ['concat:vendor_body'],
        options: {
          interrupt: true,
          livereload: true
        }
      },
      less: {
        files: ['bower/bootstrap/less/*.less', 'less/*.less'],
        tasks: ['less:app', 'cssmin'],
        options: {
          interrupt: true,
          livereload: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-file-exists');
  grunt.loadNpmTasks('grunt-express-server');

  grunt.registerTask('default', ['fileExists', 'concurrent:preFlight', 'concurrent:liftOff', 'watch']);
  grunt.registerTask('defaultWithExpress', ['fileExists', 'concurrent:preFlight', 'concurrent:liftOff', 'express:dev', 'watch']);
  grunt.registerTask('defaultWatchless', ['fileExists', 'concurrent:preFlight', 'concurrent:liftOff']);
};