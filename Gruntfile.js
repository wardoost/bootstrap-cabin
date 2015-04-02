// -------------
// **** NEW ****
// -------------

var websiteUrl = 'www.gruntgeneratedbootstrapcabin.be';

// -------------
// ** END NEW **
// -------------

module.exports = function (grunt) {

  require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // HTML
    pages: {
      posts: {
        src: 'src/posts',
        dest: 'dist',
        layout: 'src/layouts/post.jade',
        url: 'posts/:title/',
        options: {
          pageSrc: 'src/pages',
          data: {
            baseUrl: '/',
            year: grunt.template.today('yyyy')
          },
          pagination: {
            postsPerPage: 2,
            listPage: 'src/pages/index.jade'
          }
        }
      }
    },

/*    // -------------
    // **** NEW ****
    // -------------

    favicons: {
      options: {
        trueColor: true,
        precomposed: false,
        appleTouchBackgroundColor: "#fff",
        coast: true,
        windowsTile: true,
        tileBlackWhite: true,
        tileColor: "#000",
        androidHomescreen: true,
        html: 'dist/index.html', // Favicons only get added to the index.html page. This NEEDS work!
        HTMLPrefix: "/img/icons/"
      },
      icons: {
        src: 'src/img/favicon.png',
        dest: 'dist/img/icons'
      }
    },*/

    relativeRoot: {
      yourTarget: {
        options: {
          root: 'dist'
        },
        files: [{
          expand: true,
          cwd: '<%= relativeRoot.yourTarget.options.root %>',
          src: ['**/*.css', '**/*.html'],
          dest: 'dist'
        }]
      },
    },

    sitemap: {
      dist: {
          siteRoot: 'dist/',
          homepage: 'http://' + websiteUrl + '/',
          changefreq: 'weekly'
      }
    },

    robotstxt: {
      dist: {
        dest: 'dist/',
        policy: [
        {
          ua: '*',
          disallow: ['js/', 'css/']
        },
        {
          sitemap: 'http://' + websiteUrl + '/sitemap.xml'
        },
        {
          crawldelay: 100
        },
        {
          host: websiteUrl
        }
        ]
      }
    },

    // -------------
    // ** END NEW **
    // -------------

    htmlmin: {
      options: {
        removeComments: true,
        collapseWhitespace: true
      },
      files: {
        expand: true,
        cwd: 'dist',
        filter: 'isFile',
        src: ['**/*.html'],
        dest: 'dist'
      }
    },

    // Styles
    less: {
      compile: {
        files: {
          "dist/css/less.css": "src/less/style.less"
        }
      }
    },

    concat: {   
      css: {
        src: [
        'dist/css/less.css',
        'src/css/libs/*.css',
        'src/css/fonts/**/*.css'
        ],
        dest: 'dist/css/style.css',
      }
    },

    cssmin: {
      options: {
        keepSpecialComments: 0
      },
      css: {
        src: 'dist/css/style.css',
        dest: 'dist/css/style.min.css',
      }
    },

    // JS
    jshint: {
      all: ['src/js/*.js']
    },

    uglify: {
      options: {
        compress: false,
        beautify: true,
        mangle: false
      },
      js: {
        src: [
        	'src/js/libs/jquery*.js',
          'src/js/libs/*.js',
          'src/js/libs/bootstrap/collapse.js', // Bootstrap JS
          'src/js/libs/bootstrap/dropdown.js', // Bootstrap JS
          'src/js/libs/bootstrap/transition.js', // Bootstrap JS
          // 'src/js/libs/bootstrap/affix.js', // Bootstrap JS
          // 'src/js/libs/bootstrap/alert.js', // Bootstrap JS
          // 'src/js/libs/bootstrap/button.js', // Bootstrap JS
          // 'src/js/libs/bootstrap/carousel.js', // Bootstrap JS
          // 'src/js/libs/bootstrap/modal.js', // Bootstrap JS
          // 'src/js/libs/bootstrap/popover.js', // Bootstrap JS
          // 'src/js/libs/bootstrap/scrollspy.js', // Bootstrap JS
          // 'src/js/libs/bootstrap/tab.js', // Bootstrap JS
          // 'src/js/libs/bootstrap/tooltip.js' // Bootstrap JS
          'src/js/main.js',  // JS to initiate plugins and own code
          ],
        dest: 'dist/js/script.min.js'
      }
    },

    // Images
    responsive_images: {
      images: {
        options: {
          sizes: [{
            rename: false,
            width: '50%',
          },{
            rename: false,
            width: '100%',
            suffix: '@x2'
          }]
        },
        files: [{
          expand: true,
          src: ['*.{png,jpg,jpeg,gif}', '!favicon.png'],
          cwd: 'src/img/',
          dest: 'dist/img/'
        }]
      },
      posts: {
        options: {
          sizes: [{
            rename: false,
            width: 480,
          },{
            rename: false,
            width: 960,
            suffix: '@2x'
          }]
        },
        files: [{
          expand: true,
          src: ['**/*.{png,jpg,jpeg,gif}'],
          cwd: 'src/img/posts',
          dest: 'dist/img/posts'
        }]
      }
    },

    // Other
    copy: {
      files: {
        expand: true,
        cwd: 'src',
        src: ['css/fonts/**/*.{eot,svg,ttf,woff}', '.htaccess'],
        dest: 'dist',
        filter: 'isFile'
      }
    },

    devUpdate: {
      main: {
        options: {
          updateType: 'prompt'
        }
      }
    },

    watch: {
      options: {
        cwd: 'src',
        livereload: true
      },
      html: {
        files: [
        '../posts/**.md',
        'layouts/**.jade',
        'pages/**.jade'
        ],
        tasks: ['pages', 'relativeRoot', 'htmlmin']
      },
      styles: {
        files: ['less/**/*.less', 'css/**/*.css'],
        tasks: ['less', 'concat:css', 'cssmin:css', 'clean:css']
      },
      js: {
        files: ['js/*.js', 'js/libs/**/*.js'],
        tasks: ['jshint', 'uglify:js', 'clean:js']
      },
      images: {
        files: ['img/**/*.{png,jpg,jpeg,gif}'],
        tasks: ['responsive_images', 'imagemin']
      },
      files: {
        files: ['.htaccess'],
        tasks: ['copy:files']
      }
    },

    connect: {
      dist: {
        options: {
          hostname: '*',
          port: 8000,
          base: '',
          livereload: true
        }
      }
    },

    open: {
      dist: {
        // Gets the port from the connect configuration
        path: 'http://<%= grunt.option("ipAddress") %>:<%= connect.dist.options.port%>/dist',
        app: 'Google Chrome'
      }
    },

    clean: {
      dist: 'dist',
      js: ["dist/js/**/*.js", "!dist/js/*.min.js"],
      css: ["dist/css/**/*.css", "!dist/css/*.min.css"]
    },

    // Parallel tasks
    concurrent: {
      target1: ['html', 'css', 'js', 'responsive_images'],
      target2: ['sitemap', 'robotstxt', 'copy']
    },
  });

  grunt.option('projectDir', process.cwd().split("/").pop()); // Project name according to the root directory name

  // Lookup and save IP address in grunt option
  var ifaces = require('os').networkInterfaces();
  Object.keys(ifaces).forEach(function (ifname) {
    ifaces[ifname].forEach(function (iface) {
      if ('IPv4' !== iface.family || iface.internal !== false) { return; } // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      grunt.option('ipAddress', iface.address); // Save in Grunt option
    });
  });

  // Display project name and ip address
  grunt.log.subhead((" " + grunt.option("projectDir") + " (" + grunt.option("ipAddress") + ") ").green.inverse);
  
  // Group sequenced tasks
  grunt.registerTask('html', [
    'pages', 
    //'favicons', 
    'relativeRoot', 
    'htmlmin'
  ]);
  grunt.registerTask('css', [
    'less', 
    'concat:css', 
    'cssmin'
  ]);
  grunt.registerTask('js', [
    'jshint', 
    'uglify'
  ]);
  grunt.registerTask('build', [
    'clean:dist', 
    'concurrent:target1', 
    'concurrent:target2', 
    'sitemap', 
    'robotstxt', 
    'copy'
  ]);
  grunt.registerTask('server', [
    'connect',
    'open',
    'watch'
  ]);
  grunt.registerTask('default', [
    'devUpdate',
    'build',
    'server'
  ]);

  require('load-grunt-tasks')(grunt);
};
