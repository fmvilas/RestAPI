/*global define*/
"use strict";

define([
  'marionette',
  'underscore',
  'util/image_manager',
  'text!task/task.tpl',
  'showdown',
  'moment'
], function(Marionette, _, ImageManager, taskTemplate, Showdown, moment) {

  var TaskView = Marionette.ItemView.extend({
      tagName: 'div',
      template: _.template(taskTemplate),

      ui: {
        editTitle: '.input-title',
        editDescription: '.input-description',
        editPicture: '.edit-picture',
        picturePreview: '.picture-preview',
        viewDescription: '.view-description',
        taskDateTime: '.task-datetime',
        selectedDateTime: '.selected-date-time',
        buttonSave: '.button-save',
        buttonCancel: '.button-cancel'
      },

      className: 'task card paper-shadow-bottom-z-1',

      events: {
        'click .button-destroy': 'onButtonDestroyClick',
        'click .button-edit': 'onButtonEditClick',
        'change .edit-picture': 'onTaskPictureChange',
        'click .button-picture-remove': 'onTaskPictureRemove',
        'click .button-picture': 'onButtonPictureClick',
        'click .button-color': 'onButtonColorClick',
        'click .color-selector-item': 'onColorSelectorItemClick',
        'click .button-time': 'onButtonTimeClick',
        'click .button-date-remove': 'onButtonClearDateTimeClick',
        'click .button-save': 'onButtonSaveClick',
        'click .button-cancel': 'onButtonCancelClick'
      },

      modelEvents: {
        'change': 'render'
      },

      onBeforeRender: function() {
        var model = this.model;
        model.attributes.formatted_created_at = moment(model.get('created_at')).format('MMMM Do YYYY, HH:mm:ss');
        model.attributes.formatted_updated_at = moment(model.get('updated_at')).format('MMMM Do YYYY, HH:mm:ss');

        if( model.attributes.date ) {
          model.attributes.formatted_date = moment(model.get('date')).format('MMMM Do YYYY, HH:mm:ss');
        }
      },

      onRender: function() {
        var markdown = new Showdown.converter(),
            desc = markdown.makeHtml(this.model.get('description'));

        this.ui.viewDescription.html(desc);

        delete this.model.attributes.formatted_created_at;
        delete this.model.attributes.formatted_updated_at;
        if( this.model.attributes.formatted_date ) {
          delete this.model.attributes.formatted_date;
        }

        this.$el.attr('data-color', this.model.get('color') || 'white');
        this.$el.attr('data-id', this.model.get('id'));
        this.$el.attr('data-order', this.model.get('order') || 0);
        this.ui.editPicture.data('base64', this.model.get('picture'));

        $('.task-datetime', this.$el).datetimepicker({
          minDate: new Date()
        }).on('dp.change dp.show', $.proxy(this.onDateTimeChange, this));
      },

      onButtonDestroyClick: function () {
        this.model.destroy();
      },

      onButtonEditClick: function() {
        this.$el.addClass('editing');
        this.ui.editTitle.focus();
      },

      onButtonSaveClick: function () {
        this.ui.buttonSave.focus();

        var taskTitle = this.ui.editTitle.val().trim(),
            taskDescription = this.ui.editDescription.val().trim(),
            taskPicture = this.ui.editPicture.data('base64') || null,
            taskColor = this.$el.attr('data-color') || 'white',
            taskDate = this.ui.selectedDateTime.attr('data-date') || null;


        if( taskTitle ) {
          this.model.set('title', taskTitle);
          this.model.set('description', taskDescription);
          this.model.set('picture', taskPicture);
          this.model.set('color', taskColor);
          this.model.set('date', taskDate);
          this.model.set('order', this.$el.attr('data-order') || 0);

          this.model.save();

          this.$el.removeClass('editing');
        } else {
          alert("Task's title can't be empty!");
        }
      },

      onButtonCancelClick: function() {
        this.ui.editTitle.val(this.model.get('title'));
        this.ui.editDescription.val(this.model.get('description'));
        this.$el.removeClass('editing');
      },

      onTaskPictureChange: function(e) {
        ImageManager.fileInputToBase64(e.target, function(base64) {
          var $input = $(e.target),
              $parent = $input.parent();

          $parent.addClass('has-picture');

          $('.picture-preview', $parent).css({
            'background-image': 'url(' + base64 + ')'
          });

          $input.data('base64', base64);
        });
      },

      onTaskPictureRemove: function() {
        $('.has-picture', this.$el).removeClass('has-picture');
        this.ui.editPicture.removeData('base64');
        this.ui.picturePreview.css('background-image', 'none');
      },

      onButtonPictureClick: function() {
        this.$el.toggleClass('adding-picture');
      },

      onButtonColorClick: function() {
        this.$el.toggleClass('selecting-color');
      },

      onColorSelectorItemClick: function(e) {
        var color = $(e.target).data('color');

        if( color ) {
          this.$el.attr('data-color', color);
        }
      },

      onButtonTimeClick: function() {
        this.ui.taskDateTime.focus();
      },

      onDateTimeChange: function(ev) {
        var datetime = $('.datetime', this.ui.selectedDateTime);

        datetime.html(ev.date.format('MMMM Do YYYY, HH:mm:ss'));
        this.ui.selectedDateTime.removeClass('hidden').attr('data-date', ev.date.format());
      },

      onButtonClearDateTimeClick: function() {
        this.ui.selectedDateTime.addClass('hidden').removeAttr('data-date');
      }
    });


    return TaskView;

});
