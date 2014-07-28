/*global TasksApp */
'use strict';

TasksApp.module('TaskList', function (TaskList, App, Backbone, Marionette, $, _) {
    // TaskList Router
    // ---------------
    //
    // Handle routes to show the active vs complete task items
    TaskList.Router = Marionette.AppRouter.extend({
        appRoutes: {
            '*filter': 'filterItems'
        }
    });

    // TaskList Controller (Mediator)
    // ------------------------------
    //
    // Control the workflow and logic that exists at the application
    // level, above the implementation detail of views and models
    TaskList.Controller = function () {
        this.taskList = new App.Tasks.TaskList();
    };

    _.extend(TaskList.Controller.prototype, {
        // Start the app by showing the appropriate views
        // and fetching the list of task items, if there are any
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
            App.main.show(new TaskList.Views.ListView({
                collection: taskList
            }));
        },

        // Set the filter to show complete or all items
        filterItems: function (filter) {
            //App.vent.trigger('taskList:filter', (filter && filter.trim()) || '');
        }
    });

    // TaskList Initializer
    // --------------------
    //
    // Get the TaskList up and running by initializing the mediator
    // when the the application is started, pulling in all of the
    // existing Task items and displaying them.
    TaskList.addInitializer(function () {
        var controller = new TaskList.Controller();
        controller.router = new TaskList.Router({
            controller: controller
        });

        controller.start();
    });
});
