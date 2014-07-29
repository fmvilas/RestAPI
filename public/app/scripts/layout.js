/*global TasksApp */
'use strict';

TasksApp.module('Layout', function (Layout, App, Backbone) {
  // Layout Header View
  Layout.Header = Backbone.Marionette.ItemView.extend({
    template: '#template-header',

    ui: {
      title: '#new-task',
      description: '#new-task-description',
      picture: '#new-task-picture',
      addTask: '#add-new-task'
    },

    events: {
      'click #add-new-task': 'onAddTaskClick',
      'change #new-task-picture': 'onNewTaskPictureChange'
    },

    onRender: function() {
      this.ui.picture.bootstrapFileInput();
    },

    onAddTaskClick: function() {
      var taskTitle = this.ui.title.val().trim(),
          taskDescription = this.ui.description.val(),
          taskPicture = this.ui.picture.data('base64');

      if( taskTitle ) {
        this.collection.create({
          title: taskTitle,
          picture: taskPicture && taskPicture.length ? taskPicture : null,
          description: taskDescription
        });
        this.ui.title.val('');
        this.ui.description.val('');
      } else {
        alert("Task's title can't be empty!");
      }
    },

    onNewTaskPictureChange: function(e) {
      App.ImageManager.fileInputToBase64(e.target, function(base64) {
        $(e.target).data('base64', base64);
      });
    }
  });
});
