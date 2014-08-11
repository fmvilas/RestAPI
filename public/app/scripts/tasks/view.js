/*global define*/
/*jslint vars:true*/
"use strict";

define([
  'app',
  'backbone',
  'underscore',
  'task/view',
  'bootstrap.datetimepicker',
  'jqueryui'
], function(App, Backbone, _, TaskView) {

  var TasksView = Backbone.Marionette.CollectionView.extend({
    el: '#task-list',
    itemView: TaskView,

    initialize: function() {
      var $body = $('body');

      App.vent.on('tasklist:empty', function() {
        $('body').addClass('empty');
        $body.removeClass('loading');
      }, this);

      App.vent.on('tasklist:notempty', function() {
        $('body').removeClass('empty');
      }, this);
    },

    onRender: function() {
      var $body = $('body');

      App.vent.on('tasklist:fetch', function() {
        if( this.collection.length === 0 ) {
          $('body').addClass('empty');
        }

        this.collection.fetch({
          reset: true
        });
      }, this);

      this.makeSortable();

      if( this.showUpdatedToast ) {
        document.getElementById('updatedToast').show();
      } else {
        this.showUpdatedToast = true;
      }

      $body.removeClass('empty');
      $body.removeClass('loading');
    },

    makeSortable: function() {
      if( !this.$el.sortable('instance') ) {
        var self = this;

        this.$el.sortable({
          distance: 12,
          forcePlaceholderSize: true,
          items: '.task',
          placeholder: 'card-sortable-placeholder task card',
          tolerance: 'pointer',

          start: function(event, ui) {
            ui.item.addClass('dragging').removeClass('task');
          },
          stop: function(event, ui) {
            ui.item.removeClass('dragging').addClass('task');
          },
          update: function(event, ui) {
            self.updateOrder();
          }
        });

      } else {
        this.$el.sortable('refresh');
        this.$el.sortable('refreshPositions');
      }
    },

    updateOrder: function() {
      var self = this;

      $('.card', this.$el).each(function(index, task) {
        var $task = $(task),
            id = $task.attr('data-id'),
            model = self.collection.get(id);

        $task.attr('data-order', index);

        // Request to server only if order has changed
        if( model.get('order') !== index ) {
          model.save({
            order: index
          }, {patch: true});
        }

      });
    }

  });

  return TasksView;

});
