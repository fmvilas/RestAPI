/*global Backbone */
'use strict';

window.TasksApp = new Backbone.Marionette.Application();

TasksApp.addRegions({
  header: '#header',
  main: '#main'
});

TasksApp.on('initialize:after', function () {
  Backbone.history.start();
});
