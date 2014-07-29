/*global TasksApp */
'use strict';

TasksApp.module('Tasks', function (Tasks, App, Backbone) {
  // Task Model
  // ----------
  Tasks.Task = Backbone.Model.extend({
    defaults: {
      title: '',
      description: '',
      picture: null,
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

    url: '/api/v1/tasks',

    comparator: 'created'
  });
});
