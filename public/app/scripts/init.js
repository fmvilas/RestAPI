/*global requirejs, define*/
"use strict";

requirejs.config({
  baseUrl: 'app/scripts/',
  paths: {
    backbone: '../bower_components/backbone/backbone',
    'backbone.wreqr' : '../bower_components/backbone.wreqr/lib/amd/backbone.wreqr',
    'backbone.eventbinder' : '../bower_components/backbone.eventbinder/lib/amd/backbone.eventbinder',
    'backbone.babysitter' : '../bower_components/backbone.babysitter/lib/amd/backbone.babysitter',
    bootstrap: '../bower_components/bootstrap/dist/js/bootstrap.min',
    // Point to src due to bug with $.show() on Web Components
    'bootstrap.datetimepicker': '../bower_components/eonasdan-bootstrap-datetimepicker/src/js/bootstrap-datetimepicker',
    jquery: '../bower_components/jquery/dist/jquery',
    jqueryui: '../bower_components/jquery-ui/jquery-ui.min',
    marionette: '../bower_components/marionette/lib/core/amd/backbone.marionette',
    moment: '../bower_components/moment/min/moment.min',
    'moment.timezone': '../bower_components/moment-timezone/builds/moment-timezone.min',
    showdown: 'vendor/showdown',
    text: '../bower_components/requirejs-text/text',
    underscore: '../bower_components/lodash/lodash'
  },
  shim: {
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    bootstrap: {
      deps: ['jquery']
    },
    'bootstrap.datetimepicker': {
      deps: ['moment', 'bootstrap']
    },
    underscore: {
      exports: '_'
    },
    jqueryui: {
      deps: ['jquery']
    },
    showdown: {
      exports: 'Showdown'
    }
  }
});

require([
  'app',
  'backbone',
  'tasks/controller'
], function(App, Backbone, tasksController) {

  App.addInitializer(function() {
    var routes = new (Backbone.Router.extend({
      routes: {
        '': tasksController.index
      }
    }))();
  });

  App.on('initialize:after', function () {
    if (!Backbone.history.started) {
      Backbone.history.start();
    }
  });

  App.start();

});
