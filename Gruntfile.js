// -------------
// **** NEW ****
// -------------

var websiteUrl = 'www.gruntgeneratedbootstrapcabin.be';

// -------------
// ** END NEW **
// -------------

module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // HTML
    pages: {
      posts: {
        src: 'posts',
        dest: 'dist',
        layout: 'src/layouts/post.jade',
        url: 'posts/:title/',
        options: {
          pageSrc: 'src/pages',
          data: {
            baseUrl: '/',
            menu: [
              {name: 'Home', link: '',icon:'fa-home'},
              {name: 'About', link: 'about.html',icon:'fa-user'},
              {name: 'Archive', link: 'archive.html',icon:'fa-archive'},
              {name: 'Error', link: '404.html',icon:'fa-bell'},
              {name: 'Dropper', link: 'dropdown', icon:'fa-cubes',
                items: [
                  {name: 'Link', link: '404.html',icon:'fa-bomb'},
                  {name: 'Another link', link: '404.html',icon:'fa-link'},
                  {name: 'Yet another link', link: '404.html',icon:'fa-anchor'},
                  {type: 'divider'},
                  {name: 'Facebook', link: 'http://www.facebook.com', icon:'fa-facebook', link_external: true}
                ]
              }
            ],
            footermenu1: [
              {name: 'Contact', link: '404.html',icon:'fa-smile-o'},
              {name: 'Legal', link: '404.html',icon:'fa-legal'},
              {name: 'Archive', link: 'archive.html',icon:'fa-archive'}
            ],
            footermenu2: [
              {name: 'Nothing', link: 'index.html',icon:'fa-university'},
              {name: 'Something', link: '404.html',icon:'fa-paperclip'},
              {name: 'Other', link: '404.html',icon:'fa-tree'},
              {name: 'Google', link: 'http://www.google.com', icon:'fa-google', link_external: true}
            ]
          },
          pagination: {
            postsPerPage: 2,
            listPage: 'src/pages/index.jade'
          }
        }
      }
    },

    // -------------
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
    },

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
      js: {
        src: [
        	'src/js/libs/jquery-1.11.0.min.js',
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
        tasks: ['pages', 'favicons', 'relativeRoot', 'htmlmin']
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
        files: ['img/**/*.{png,jpg,jpeg,gif'],
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
          hostname: '0.0.0.0',
          port: 8888,
          base: '',
          livereload: true
        }
      }
    },

    open: {
      dist: {
        // Gets the port from the connect configuration
        path: 'http://localhost:<%= connect.dist.options.port%>/dist'
      }
    },

    clean: {
      dist: 'dist',
      js: ["dist/js/**/*.js", "!dist/js/*.min.js"],
      css: ["dist/css/**/*.css", "!dist/css/*.min.css"]
    },
  });

  grunt.registerTask('build', [
    'clean:dist',
    'pages',
    'favicons',
    'relativeRoot',
    //'htmlmin',
    'less',
    'concat:css',
    'cssmin',
    'jshint',
    'uglify',
    'responsive_images',
    'sitemap',
    'robotstxt',
    'copy'
  ]);

  

  grunt.registerTask('server', [
    'build',
    'connect',
    //'open',
    'watch'
  ]);

  grunt.registerTask('default', 'server');

  grunt.template.today('yyyy');

  require('load-grunt-tasks')(grunt);
};
