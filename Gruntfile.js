module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
    sass: {
      dist:{
        files: {
          'style.css' : 'style.scss'
        }
      }
    },
    concat: {
      app: {
        src: ['app.js', 'directives/**/*.js', '!Gruntfile.js', '!app-build.js'],
        dest: 'app-build.js'
      }
    },
    watch: {
      files: ['<%= concat.app.src %>', '*.scss'],
      tasks: ['concat:app', 'sass']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

};
