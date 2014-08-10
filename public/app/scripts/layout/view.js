/*global define*/
/*jslint vars:true*/
'use strict';

define([
  'app',
  'marionette',
  'underscore',
  'jquery',
  'text!layout/layout.tpl'
], function(App, Marionette, _, $, layoutTemplate) {

  var KEY_ESC = 27;

  var LayoutView = Marionette.Layout.extend({
    el: 'body',
    template: _.template(layoutTemplate),

    regions: {
      header: '.tasks-header',
      main: '#main'
    },

    events: {
      'click #updateListButton': 'onUpdateListButtonClick'
    },

    render: function() {
      if( !this.isRendered ) {
        this.$el.html( this.template );
        this.onRender();
      }

      return this;
    },

    onRender: function() {
      $('body').addClass('loading');
      this.$el.on('keyup', $.proxy(this.onKeyUp, this));
      this.isRendered = true;
    },

    onKeyUp: function(e) {
      var $header = $(this.regions.header, this.$el);

      if( e.keyCode === KEY_ESC ) {
        $header.removeClass('adding-task');
      }
    },

    onUpdateListButtonClick: function() {
      App.vent.trigger('tasklist:fetch');
    }
  });

  return new LayoutView();

});
