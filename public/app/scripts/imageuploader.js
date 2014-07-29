/*global TasksApp */
'use strict';

TasksApp.module('ImageUploader', function (ImageUploader, App, Backbone) {
  ImageUploader.fileInputToBase64 = function(fileInput, callback) {
    var MAXWidthHeight = 700,
        fr = new FileReader();

    fr.onload = function(e) {
      var img = new Image();

      img.onload = function(){
        var r = MAXWidthHeight / Math.max(this.width,this.height),
            w = Math.round(this.width*r),
            h = Math.round(this.height*r),
            c = document.createElement("canvas"),
            base64;

        c.width = w;
        c.height = h;
        c.getContext("2d").drawImage(this,0,0,w,h);

        base64 = c.toDataURL();

        if( typeof callback === 'function') {
          callback(base64);
        }
      }

      img.src = e.target.result;
    }

    fr.readAsDataURL(fileInput.files[0]);
  };
});
