/*global TasksApp */
'use strict';

TasksApp.module('TaskList.Views', function (Views, App, Backbone, Marionette, $) {
  // Todo List Item View
  Views.ItemView = Marionette.ItemView.extend({
    tagName: 'li',
    template: '#template-taskItemView',

    ui: {
      edit: '#edit-task',
      editTitle: '.edit-title',
      editDescription: '.edit-description',
      editPicture: '.edit-picture'
    },

    className: 'list-group-item',

    events: {
      'click .destroy': 'destroy',
      'click .edit': 'onStartEditing',
      'change .edit-picture': 'onTaskPictureChange',
      'click .save-edited-task': 'onSaveEditedTaskClick',
      'click .cancel-edit-task': 'onCancelEditTaskClick'
    },

    modelEvents: {
      'change': 'render'
    },

    onRender: function() {
      $(this.ui.editPicture).bootstrapFileInput();
    },

    destroy: function () {
      this.model.destroy();
    },

    onStartEditing: function() {
      this.$el.addClass('editing');
      this.ui.editTitle.focus();
    },

    onSaveEditedTaskClick: function (e) {
      var taskTitle = this.ui.editTitle.val().trim(),
          taskDescription = this.ui.editDescription.val().trim(),
          taskPicture = this.ui.editPicture.data('base64');

      if( !taskPicture || !taskPicture.length ) {
        taskPicture = null;
      }

      if( taskTitle ) {
        this.model.set('title', taskTitle).save();
        this.model.set('picture', taskPicture).save();
        this.model.set('description', taskDescription).save();
        this.$el.removeClass('editing');
      } else {
        alert("Task's title can't be empty!");
      }
    },

    onCancelEditTaskClick: function() {
      this.ui.editTitle.val(this.model.get('title'));
      this.ui.editDescription.val(this.model.get('description'));
      this.$el.removeClass('editing');
    },

    onTaskPictureChange: function(e) {
      App.ImageUploader.fileInputToBase64(e.target, function(base64) {
        $(e.target).data('base64', base64);
      });
    }
  });

  // Item List View
  Views.ListView = Backbone.Marionette.CompositeView.extend({
    template: '#template-taskListCompositeView',
    itemView: Views.ItemView,
    itemViewContainer: '#task-list'
  });
});
