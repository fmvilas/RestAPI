/*global define*/
/*jslint vars:true*/
'use strict';

define([
  'app',
  'layout/view',
  'tasks-header/view',
  'tasks/collection',
  'tasks/view'
], function(App, layoutView, TasksHeaderView, TasksCollection, TasksView) {

  var index = function() {
    layoutView.render();


    var tasksCollection = new TasksCollection(),
        listHeaderView = new TasksHeaderView({
          collection: tasksCollection
        }),
        listView = new TasksView({
          collection: tasksCollection
        }),
        timeoutRender;


    // Re-render when order changes
    // Tip: the timeout prevents rendering multiple times in a
    // short period of time.
    listView.listenTo(tasksCollection, 'sort', function() {
      if( timeoutRender ) {
        clearTimeout(timeoutRender);
      }

      timeoutRender = setTimeout(listView.render.bind(listView), 500);
    });

    // Sort the collection when it changes
    listView.listenTo(tasksCollection, 'change add remove', function() {
      tasksCollection.sort();
    });

    // Render header view and fecth the collection
    listHeaderView.render();
    tasksCollection.fetch({
      success: function(col) {
        if( col.length === 0 ) {
          App.vent.trigger('tasklist:empty');
        }
      },
      error: function() {
        App.vent.trigger('tasklist:empty');
        alert('Something went wrong. Try again in a few minutes.');
      }
    });
  };

  return {
    index: index
  };

});
