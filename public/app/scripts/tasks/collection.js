/*global define*/
"use strict";

define(['backbone', 'task/model'], function(Backbone, TaskModel) {

  var TasksCollection = Backbone.Collection.extend({
    model: TaskModel,

    url: '/api/v1/tasks',

    comparator: function(a, b) {
      var aDate = new Date(a.get('updated_at')).valueOf(),
          bDate = new Date(b.get('updated_at')).valueOf(),
          aOrder = a.get('order'),
          bOrder = b.get('order'),
          ret;

      if( aOrder === bOrder ) {
        if( aDate > bDate ) {
          ret = -1;
        } else if( aDate < bDate ) {
          ret = 1;
        } else {
          ret = 0;
        }
      } else {
        ret = aOrder > bOrder ? 1 : -1;
      }

      return ret;
    }
  });


  return TasksCollection;

});
