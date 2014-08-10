/*global define*/
"use strict";

define(['backbone'], function(Backbone) {

  var TaskModel = Backbone.Model.extend({
    defaults: {
      title: '',
      description: '',
      picture: null
    },

    initialize: function () {
      if( this.isNew() ) {
        this.set('created_at', Date.now());
      }

      this.on('change', function(model) {
        model.set('updated_at', Date.now(), {silent: true});
      });
    }
  });


  return TaskModel;

});
