module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';',
        stripBanners: true
      },
      app: {
        files: {
          'public/js/app.concat.js': ['app/*.js', 'app/**/*.js', 'app/**/**/*.js', 'app/**/**/**/*.js']
        }
      }
    },
    ngtemplates:  {
      app:        {
        cwd:      'app',
        src:      ['**/*.html', '**/**/*.html', '**/**/**/*.html', '**/**/**/**/*.html'],
        dest:     'public/js/app.templates.js',
        options:    {
          htmlmin:  { collapseWhitespace: true, collapseBooleanAttributes: true }
        }
      }
    },
    cssmin: {
      combine: {
        files: {
          'public/styles/style.min.css': [
            'bower/toastr/toastr.min.css',
            'bower/animate.css/animate.min.css',
            'bower/angular-hotkeys/build/hotkeys.min.css',
            'bower/angular-loading-bar/build/loading-bar.min.css',
            'bower/bootstrap/less/bootstrap.css',
            'bower/font-awesome/less/font-awesome.css',
            'bower/select2/select2.css',
            'bower/select2-bootstrap3-css/select2-bootstrap.css',
            'bower/angular-ui-select2/docs/styles.css',
            'bower/angular-block-ui/angular-block-ui.min.css',
            'less/style.css'
          ]
        }
      }
    },
    uglify: {
      vendor_header: {
        src: ['bower/modernizr/modernizr.js'],
        dest: 'public/js/vendor-header.js'
      },
      vendor_body: {
        src: [
          'bower/jquery/dist/jquery.min.js',
          'bower/lodash/dist/lodash.min.js',
          'bower/momentjs/min/moment.min.js',
          'bower/stringjs/lib/string.min.js',
          'bower/toastr/toastr.min.js',
          'bower/angular/angular.min.js',
          'bower/angular-i18n/angular-locale_en-gb.js',
          'bower/angular-animate/angular-animate.min.js',
          'bower/angular-cookies/angular-cookies.min.js',
          'bower/angular-resource/angular-resource.min.js',
          'bower/angular-socket-io/socket.min.js',
          'bower/angular-ui-utils/ui-utils.min.js',
          'bower/angular-ui-router/release/angular-ui-router.min.js',
          'bower/angular-bootstrap/ui-bootstrap-tpls.min.js',
          'bower/greensock/src/minified/TweenMax.min.js',
          'bower/ng-Fx/dist/ngFx.min.js',
          'bower/angular-loading-bar/build/loading-bar.min.js',
          'bower/angular-hotkeys/build/hotkeys.min.js',
          'bower/angular-local-storage/angular-local-storage.min.js',
          'bower/signalr/jquery.signalR.min.js',
          'bower/select2/select2.min.js',
          'bower/angular-ui-select2/src/select2.js',
          'bower/angular-block-ui/dist/angular-block-ui.min.js'
        ],
        dest: 'public/js/vendor-body.js'
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
        files: {
          "bower/bootstrap/less/bootstrap.css": "bower/bootstrap/less/bootstrap.less",
          "bower/font-awesome/less/font-awesome.css": "bower/font-awesome/less/font-awesome.less",
          "less/style.css": "less/style.less"
        }
      }
    },
    watch: {
      grunt: {
        files: 'Gruntfile.js',
        tasks: ['jshint', 'ngtemplates', 'concat:app', 'uglify', 'less:app', 'copy', 'cssmin'],
        options: {
          interrupt: true,
          livereload: true
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
          'public/index.html', 'app/*.html', 'app/**/*.html', 'app/**/**/*.html', 'app/**/**/**/*.html'
        ],
        tasks: ['ngtemplates'],
        options: {
          interrupt: true,
          livereload: true
        }
      },
      vendor_header: {
        files: '<%= uglify.vendor_header.src %>',
        tasks: ['uglify:vendor_header'],
        options: {
          interrupt: true,
          livereload: true
        }
      },
      vendor_body: {
        files: '<%= uglify.vendor_body.src %>',
        tasks: ['uglify:vendor_body'],
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

  grunt.registerTask('default', ['jshint', 'ngtemplates', 'concat:app', 'uglify', 'less:app', 'copy', 'cssmin', 'watch']);
};