/*global Backbone */
'use strict';

// TasksApp is global for developing in the console
// and functional testing.
window.TasksApp = new Backbone.Marionette.Application();

TasksApp.addRegions({
  header: '#header',
  main: '#main'
});

TasksApp.on('initialize:after', function () {
  Backbone.history.start();
});
