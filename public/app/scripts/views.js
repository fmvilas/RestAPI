/*global TasksApp */
'use strict';

TasksApp.module('TaskList.Views', function (Views, App, Backbone, Marionette, $) {
    // Todo List Item View
    // -------------------
    //
    // Display an individual todo item, and respond to changes
    // that are made to the item, including marking completed.
    Views.ItemView = Marionette.ItemView.extend({
        tagName: 'li',
        template: '#template-taskItemView',

        ui: {
            edit: '#edit-task',
            editTitle: '.edit-title',
            editDescription: '.edit-description'
        },

        events: {
            'click .destroy': 'destroy',
            'click .edit': 'onStartEditing',
            'click .save-edited-task': 'onSaveEditedTaskClick',
            'click .cancel-edit-task': 'onCancelEditTaskClick'
        },

        modelEvents: {
            'change': 'render'
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
                taskDescription = this.ui.editDescription.val().trim();

            if( taskTitle ) {
                this.model.set('title', taskTitle).save();
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
        }
    });

    // Item List View
    // --------------
    //
    // Controls the rendering of the list of items, including the
    // filtering of activs vs completed items for display.
    Views.ListView = Backbone.Marionette.CompositeView.extend({
        template: '#template-taskListCompositeView',
        itemView: Views.ItemView,
        itemViewContainer: '#task-list',

        collectionEvents: {
            'all': 'update'
        },

        onRender: function () {
            this.update();
        }
    });
});
