/*global TasksApp */
'use strict';

TasksApp.module('Tasks', function (Tasks, App, Backbone) {
  // Task Model
  // ----------
  Tasks.Task = Backbone.Model.extend({
    defaults: {
      title: '',
      description: '',
      created: 0
    },

    initialize: function () {
      if(this.isNew()) {
        this.set('created', Date.now());
      }
    }
  });

  // Task Collection
  // ---------------
  Tasks.TaskList = Backbone.Collection.extend({
    model: Tasks.Task,

    //localStorage: new Backbone.LocalStorage('tasks-backbone-marionette'),
    url: '/api/v1/tasks',

    comparator: 'created'
  });
});
