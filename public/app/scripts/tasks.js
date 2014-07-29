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
        this.set('created_at', Date.now());
      }
    }
  });

  // Task Collection
  // ---------------
  Tasks.TaskList = Backbone.Collection.extend({
    model: Tasks.Task,

    url: '/api/v1/tasks',

    comparator: function(a, b) {
      var aDate = new Date(a.get('updated_at')).valueOf(),
          bDate = new Date(b.get('updated_at')).valueOf(),
          ret;

      if( aDate > bDate ) {
        ret = -1;
      } else if( aDate < bDate ) {
        ret = 1;
      } else {
        ret = 0;
      }

      return ret;
    }
  });
});
