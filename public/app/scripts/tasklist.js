/*global TasksApp */
'use strict';

TasksApp.module('TaskList', function (TaskList, App, Backbone, Marionette, $, _) {
  // TaskList Controller
  TaskList.Controller = function () {
    this.taskList = new App.Tasks.TaskList();
  };

  _.extend(TaskList.Controller.prototype, {
    start: function () {
      this.showHeader(this.taskList);
      this.showTaskList(this.taskList);
      this.taskList.fetch();
    },

    showHeader: function (taskList) {
      var header = new App.Layout.Header({
        collection: taskList
      });
      App.header.show(header);
    },

    showTaskList: function (taskList) {
      var listView = new TaskList.Views.ListView({
        collection: taskList
      });

      listView.listenTo(listView.collection, 'sort', listView.render);

      App.main.show(listView);
    }
  });

  // TaskList Initializer
  TaskList.addInitializer(function () {
    var controller = new TaskList.Controller();

    controller.start();
  });
});
