/*global TasksApp */
'use strict';

TasksApp.module('Layout', function (Layout, App, Backbone) {
  // Layout Header View
  Layout.Header = Backbone.Marionette.ItemView.extend({
    template: '#template-header',

    ui: {
      title: '#new-task',
      description: '#new-task-description',
      addTask: '#add-new-task'
    },

    events: {
      'click #add-new-task': 'onAddTaskClick'
    },

    onAddTaskClick: function() {
      var taskTitle = this.ui.title.val().trim(),
          taskDescription = this.ui.description.val();

      if( taskTitle ) {
        this.collection.create({
          title: taskTitle,
          description: taskDescription
        });
        this.ui.title.val('');
        this.ui.description.val('');
      } else {
        alert("Task's title can't be empty!");
      }
    }
  });
});
