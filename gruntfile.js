module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  var chrome = ('linux' === process.platform) ? 'google-chrome' : 'Google Chrome',
    bowerPath = 'bower_components/',
    googleCdn = 'https://ajax.googleapis.com/ajax/libs/',
    cloudflareCdn = 'https://cdnjs.cloudflare.com/ajax/libs/',
    lib,
    libs = {
      'jquery': { path: 'jquery/dist/', src: 'jquery.js', min: 'jquery.min.js', cdn: googleCdn + 'jquery/1.11.1/jquery.min.js'},
      'lodash': { path: 'lodash/dist/', src: 'lodash.js', min: 'lodash.min.js', cdn: googleCdn + 'lodash.js/2.4.1/lodash.min.js'},
      'moment': { path: 'moment/', src: 'moment.js', min: 'min/moment.min.js', cdn: cloudflareCdn + 'moment.js/2.7.0/moment.min.js'},
      //'modernizr': { path: 'modernizr/', src : 'modernizr.js', min: 'modernizr.js', cdn: cloudflareCdn + 'modernizr/2.8.2/modernizr.js'},
      'angular': { path: 'angular/', src: 'angular.js', min: 'angular.min.js', cdn: googleCdn + 'angular/angular.min.js'},
      'angular-ui-router': { path: 'angular-ui-router/release/', src: 'angular-ui-router.js', min: 'angular-ui-router.min.js', cdn: cloudflareCdn + 'angular-ui-router/0.2.10/angular-ui-router.min.js'},
      'angular-sanitize': { path: 'angular-sanitize/', src: 'angular-sanitize.js', min: 'angular-sanitize.min.js', cdn: googleCdn + 'angular/angular-sanitize.min.js'},
      'angular-animate': { path: 'angular-animate/', src: 'angular-animate.js', min: 'angular-animate.min.js', cdn: googleCdn + 'angular/angular-animate.min.js'},
      'angular-mocks': { path: 'angular-mocks/', src: 'angular-mocks.js', min: 'angular-mocks.min.js', cdn: googleCdn + 'angular/angular-mocks.min.js'},
      'restangular': { path: 'restangular/dist/', src: 'restangular.js', min: 'restangular.min.js', cdn: cloudflareCdn + 'restangular/1.4.0/restangular.min.js'},
      'angular-strap': { path: 'angular-strap/dist/', src: 'angular-strap.js', min: 'angular-strap.min.js', cdn: cloudflareCdn + 'angular-strap/2.0.0/angular-strap.min.js'},
      'angular-strap.tpl': { path: 'angular-strap/dist/', src: 'angular-strap.tpl.js', min: 'angular-strap.tpl.min.js', cdn: cloudflareCdn + 'angular-strap/2.0.0/angular-strap.tpl.min.js'},
      'mousetrap': { path: 'mousetrap/', src: 'mousetrap.js', min: 'mousetrap.min.js', cdn: cloudflareCdn + 'mousetrap/1.4.6/mousetrap.min.js'},
      'angular-hotkeys': { path: 'angular-hotkeys/', src: 'src/hotkeys.js', min: 'build/hotkeys.min.js', cdn: ''},
      'highcharts': { path: 'highcharts/', src: 'index.js', min: 'index.js', cdn: 'highcharts/4.0.1/highcharts.min.js'},
      'highcharts-ng': { path: 'highcharts-ng/dist/', src: 'highcharts-ng.js', min: 'highcharts-ng.min.js', cdn: ''},
      'ng-wig': { path: 'ng-wig/dist/', src: 'ng-wig.js', min: 'ng-wig.min.js', cdn: '' },
      'ng-biscuit': { path: 'ng-biscuit/dist/', src: 'ng-biscuit.js', min: 'ng-biscuit.min.js', cdn: '' },
      'angular-growl-2': { path: 'angular-growl-2/build/', src: 'angular-growl.js', min: 'angular-growl.min.js', cdn: '' }
    },
    copyFiles = [],
    linkerFiles = [],
    targetPath = 'build/target/',
    sourcePath = 'public/';

  for (lib in libs) {
    copyFiles.push({
      src: bowerPath + libs[lib].path + libs[lib].src,
      dest: sourcePath + 'javascript/libs/' + lib + '.js'
    });
    linkerFiles.push(sourcePath + 'javascript/libs/' + lib + '.js');
  }

  copyFiles.push({src: sourcePath + 'index.src.html', dest: sourcePath + 'index.html'});
  copyFiles.push({src: bowerPath + 'ng-wig/dist/css/ng-wig.css', dest: sourcePath + 'css/ng-wig.css'});

  linkerFiles.push(sourcePath + 'javascript/app/templates.js');
  linkerFiles.push(sourcePath + 'javascript/app/mocks.js');
  linkerFiles.push(sourcePath + 'javascript/app/ui/**/*.js');
  linkerFiles.push(sourcePath + 'javascript/app/!(admin)/*.js');
  linkerFiles.push(sourcePath + 'javascript/app/admin/*.js');
  linkerFiles.push('!' + sourcePath + 'javascript/app/admin/config.stag.js');
  linkerFiles.push('!' + sourcePath + 'javascript/app/admin/config.prod.js');
  linkerFiles.push('!' + sourcePath + 'javascript/app/**/tests/*.js');

  grunt.initConfig({
    express: {
      source: {
        options: {
          server: 'server.js',
          livereload: true
        }
      },
      dist: {
        options: {
          bases: 'build/target'
        }
      }
    },
    open: {
      report: {
        path: 'http://localhost:3000/report',
        app: chrome
      }
    },
    copy: {
      index: {
        files: [
          { src: 'public/index.src.html', dest: 'public/index.html'}
        ]
      },
      dev: {
        files: copyFiles
      },
      prod: {
        files: [
          { src: 'public/index.src.html', dest: 'build/target/index.html'},
          { cwd: 'public/images/', src: '**', dest: 'build/target/images/', expand: true },
          { src: bowerPath + libs['angular-hotkeys'].path + libs['angular-hotkeys'].min, dest: targetPath + 'javascript/libs/angular-hotkeys.min.js' },
          { src: bowerPath + libs['highcharts-ng'].path + libs['highcharts-ng'].min, dest: targetPath + 'javascript/libs/highcharts-ng.min.js' },
          { src: bowerPath + libs['ng-wig'].path + libs['ng-wig'].min, dest: targetPath + 'javascript/libs/ng-wig.min.js' },
          { src: bowerPath + libs['ng-biscuit'].path + libs['ng-biscuit'].min, dest: targetPath + 'javascript/libs/ng-biscuit.min.js' },
          { src: bowerPath + libs['angular-growl-2'].path + libs['angular-growl-2'].min, dest: targetPath + 'javascript/libs/angular-growl.min.js' }
        ]
      }
    },
    jslinker: {
      dev: {
        options: {
          target: sourcePath + 'index.html',
          relative_to: 'public'
        },
        src: linkerFiles
      }
    },
    replace: {
      css_path: {
        options: {
          patterns: [
            { match: /\/css\/main\.css/, replacement: '/css/main.min.css'},
            { match: /\/css\/ng\-wig\.css/, replacement: '/css/ng-wig.min.css'}
          ]
        },
        files: [
          {expand: true, flatten: true, src: [targetPath + '/index.html'], dest: 'build/target/'}
        ]
      }
    },
    clean: {
      bower: ['bower_components'],
      icons: ['svg-icons-out/**/*'],
      target: ['build/target/**'],
      prod: [ targetPath + '/css/main.css', targetPath + '/javascript/app']
    },
    html2js: {
      options: {
        base: 'public/javascript/app/',
        module: 'app-templates'
      },
      templates: {
        src: [sourcePath + 'javascript/app/**/views/**/*.html'],
        dest: sourcePath + 'javascript/app/templates.js'
      }
    },
    json: {
      main: {
        options: {
          namespace: 'mocks'
        },
        src: ['build/api/resources/*.json'],
        dest: sourcePath + 'javascript/app/mocks.js'
      }
    },
    compass: {
      dev: {
        options: {
          sassDir: 'public/scss',
          cssDir: 'public/css'
        }
      },
      dist: {
        options: {
          sassDir: 'public/scss',
          cssDir: 'build/target/css'
        }
      }
    },
    watch: {
      index: {
        files: ['public/index.src.html'],
        tasks: ['copy:index', 'jslinker:dev']
      },
      templates: {
        files: ['public/javascript/app/**/views/**/*.html'],
        tasks: ['html2js']
      },
      js: {
        files: ['public/javascript/app/**/*.js', targetPath + 'javascript/app/templates.js', targetPath + 'javascript/app/mocks.js'],
        tasks: ['ngAnnotate'],
        options: {
          livereload: true
        }
      },
      css: {
        files: ['public/scss/**/*.scss'],
        tasks: ['compass:dev'],
        options: {
          livereload: true
        }
      },
      json: {
        files: ['buils/api/resourses/*.json'],
        tasks: ['json']
      }
    },
    ngAnnotate: {
      stag: {
        files: {
          'build/target/javascript/app.js': [
              sourcePath + '/javascript/app/ui/**/*.js',
              sourcePath + '/javascript/app/!(admin)/*.js',
              sourcePath + '/javascript/app/admin/*.js',
              sourcePath + '/javascript/app/templates.js',
              sourcePath + '/javascript/app/mocks.js',
            '!public/javascript/app/admin/config.dev.js',
            '!public/javascript/app/**/*Spec.js',
            '!public/javascript/app/admin/config.prod.js'
          ]
        }
      },
      prod: {
        files: {
          'build/target/javascript/app.js': [
              sourcePath + '/javascript/app/ui/**/*.js',
              sourcePath + '/javascript/app/!(admin)/*.js',
              sourcePath + '/javascript/app/admin/*.js',
              sourcePath + '/javascript/app/templates.js',
              sourcePath + '/javascript/app/mocks.js',
            '!public/javascript/app/admin/config.dev.js',
            '!public/javascript/app/**/*Spec.js',
            '!public/javascript/app/admin/config.stag.js'
          ]
        }
      }
    },
    grunticon: {
      icons: {
        files: [
          {
            expand: true,
            cwd: 'svg-icons-src',
            src: ['*.svg'],
            dest: 'svg-icons-out'
          }
        ],
        options: {}
      }
    },
    jshint: {
      all: {
        src: ['public/javascript/app/**/*.js',
          '!public/javascript/app/templates.js',
          '!public/javascript/app/mocks.js'],
        options: {
          jshintrc: true
        }
      }
    },
    complexity: {
      generic: {
        src: ['public/javascript/app/**/*.js'],
        exclude: [
          'public/javascript/app/mocks/*.js',
          'public/javascript/app/**/*Value.js',
          'public/javascript/app/templates.js',
          'public/javascript/app/mocks.js',
          'public/javascript/app/**/_*.js'
        ],
        options: {
          breakOnErrors: true,
          errorsOnly: false,
          maintainability: 100,
          hideComplexFunctions: true
        }
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },
    uglify: {
      prod: {
        files: {
          'build/target/javascript/app.min.js': ['build/target/javascript/app.js']
        }
      }
    },
    cssmin: {
      prod: {
        files: {
          'build/target/css/main.min.css': [sourcePath + 'css/main.css'],
          'build/target/css/ng-wig.min.css': [sourcePath + 'css/ng-wig.css']
        }
      }
    }
  });


  grunt.registerTask('icons', ['clean:icons', 'grunticon']);
  grunt.registerTask('default', ['start']);

  grunt.registerTask('start', 'Starting server...', function(targetOption) {
    var target = ['source', 'dist'].indexOf(targetOption) !== -1 ? targetOption : 'source';

    grunt.task.run(['express:' + target, 'watch', 'express-keepalive']);
  });

  grunt.registerTask('test', ['jshint', 'complexity', 'karma:unit']);
  grunt.registerTask('coverage', ['karma:unit', 'express', 'open:report', 'express-keepalive']);
  grunt.registerTask('install', ['copy:dev', 'clean:bower', 'compass:dev', 'html2js', 'json', 'jslinker:dev']);
  grunt.registerTask('build-staging', ['clean:target', 'copy:prod', 'clean:bower', 'compass:dist', 'html2js', 'json', 'ngAnnotate:stag', 'uglify', 'cssmin', 'replace:css_path', 'clean:prod']);
  grunt.registerTask('build-production', ['clean:target', 'copy:prod', 'clean:bower', 'compass:dist', 'html2js', 'json', 'ngAnnotate:prod', 'uglify', 'cssmin', 'replace:css_path', 'clean:prod']);

};