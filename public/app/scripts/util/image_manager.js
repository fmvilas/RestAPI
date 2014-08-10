/*global define, FileReader, Image*/
"use strict";

define(function() {

  var ImageManager = {};

  ImageManager.fileInputToBase64 = function(fileInput, callback) {
    var fr = new FileReader();

    fr.onload = function(e) {
      var img = new Image();

      img.onload = function() {
        var c = document.createElement("canvas"),
            w = this.width,
            h = this.height,
            r = 700 / Math.max(this.width, this.height),
            base64;

        w = Math.round(w*r);
        h = Math.round(h*r);

        c.width = w;
        c.height = h;
        c.getContext("2d").drawImage(this, 0, 0, w, h);

        base64 = c.toDataURL();

        if( typeof callback === 'function') {
          callback(base64);
        }
      };

      img.src = e.target.result;
    };

    fr.readAsDataURL(fileInput.files[0]);
  };


  return ImageManager;

});
