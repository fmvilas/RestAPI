/*global define*/
/*jslint vars:true*/
"use strict";

define([
  'app',
  'marionette',
  'underscore',
  'text!tasks-header/header.tpl',
  'text!tasks-header/datetime.tpl',
  'util/image_manager',
  'bootstrap.datetimepicker'
], function(App, Marionette, _, tasksHeaderTemplate, datetimeTemplate, ImageManager) {

  var TasksHeaderView = Marionette.ItemView.extend({
    el: '.tasks-header',
    template: _.template(tasksHeaderTemplate),

    ui: {
      header: '.task-add-container',
      title: '.input-title',
      description: '.input-description',
      picture: '.new-task-picture',
      picturePreview: '.picture-preview',
      addTask: '.button-add',
      selectedDateTime: '#selected-date-time',
      taskDateTime: '.task-datetime'
    },

    events: {
      'focus .title-wrapper .input': 'onTitleInputFocus',
      'click .button-picture': 'onButtonPictureClick',
      'click .button-add': 'onAddTaskClick',
      'change .new-task-picture': 'onNewTaskPictureChange',
      'click .button-picture-remove': 'onButtonPictureRemoveClick',
      'click .button-color': 'onButtonColorClick',
      'click .color-selector-item': 'onColorSelectorItemClick',
      'click .button-time': 'onButtonTimeClick',
      'click .button-clear-datetime': 'onButtonClearDateTimeClick'
    },

    onRender: function() {
      $('.task-datetime', this.ui.header).datetimepicker({
        minDate: new Date()
      }).on('dp.change dp.show', $.proxy(this.onDateTimeChange, this));
    },

    onTitleInputFocus: function() {
      this.$el.addClass('adding-task');
    },

    onButtonPictureClick: function() {
      this.$el.addClass('adding-task');
      this.$el.toggleClass('adding-picture');
    },

    onButtonPictureRemoveClick: function() {
      var $parent = this.ui.picturePreview.parent();

      this.ui.picturePreview.css({
        'background-image': 'none'
      });

      $parent.removeClass('has-picture');
      this.$el.removeClass('adding-picture');
      this.ui.picture.removeData('base64');
    },

    onButtonColorClick: function() {
      this.$el.toggleClass('selecting-color');
    },

    onColorSelectorItemClick: function(e) {
      var color = $(e.target).data('color');

      if( color ) {
        this.ui.header.attr('data-color', color);
      }
    },

    onButtonTimeClick: function() {
      this.ui.taskDateTime.focus();
    },

    onDateTimeChange: function(ev) {
      var html = _.template(datetimeTemplate, {
            day: ev.date.date(),
            month: ev.date.format('MMM'),
            year: ev.date.year(),
            hour: ev.date.format('HH'),
            minute: ev.date.format('mm')
          });

      this.ui.selectedDateTime.html(html).removeClass('no-date').data('date', ev.date);
    },

    onButtonClearDateTimeClick: function() {
      this.ui.selectedDateTime.addClass('no-date').removeData('date');
    },

    onAddTaskClick: function() {
      var taskTitle = this.ui.title.val().trim(),
          taskDescription = this.ui.description.val(),
          taskPicture = this.ui.picture.data('base64'),
          taskDateTime = this.ui.selectedDateTime.data('date');

      if( taskTitle ) {
        this.collection.create({
          title: taskTitle,
          picture: taskPicture && taskPicture.length ? taskPicture : null,
          description: taskDescription,
          color: this.ui.header.attr('data-color'),
          date: taskDateTime ? taskDateTime.format() : null,
          order: 0
        });
        this.resetTask();
        App.vent.trigger('tasklist:notempty');
      } else {
        alert("Task's title can't be empty!");
      }
    },

    resetTask: function() {
      this.ui.title.val('');
      this.ui.description.val('');
      this.$el.removeClass('adding-task');
      this.$el.removeClass('adding-picture');
      this.ui.picturePreview.css({
        'background-image': 'none'
      });
      this.ui.picturePreview.parent().removeClass('has-picture');
      this.$el.removeClass('selecting-color');
      this.ui.header.attr('data-color', 'white');
      this.ui.selectedDateTime.html('').addClass('no-date').removeData('date');
      this.ui.picture.removeData('base64');
      $('body').focus();
    },

    onNewTaskPictureChange: function(e) {
      ImageManager.fileInputToBase64(e.target, function(base64) {
        var $input = $(e.target),
            $parent = $input.parent();

        $parent.addClass('has-picture');

        $('.picture-preview', $parent).css({
          'background-image': 'url(' + base64 + ')'
        });

        $input.data('base64', base64);
      });
    }
  });

  return TasksHeaderView;

});
