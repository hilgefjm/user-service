module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      files: ['Gruntfile.js', 'lib/*.js', 'routes/*.js','!node_modules/**/*.js'],
      options: {
		    reporter: require('jshint-stylish'),
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    uglify: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'static/dist/js/app.min.js': 'static/dist/js/app.js'
        }
      }
    },
    watch: {
  		options: {
  			interval: 1000,
  			spawn: true
  		},
  		js: {
  			files: ['**/*.js', '!node_modules/**/*.js'],
  			options: { livereload: true },
        tasks: ['uglify']
  		}
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  
  grunt.registerTask('build', ['jshint', 'uglify']);
  grunt.registerTask('default', ['build', 'watch']);

};
