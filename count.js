'use strict';

var fs     = require('fs'),
    sizeOf = require('image-size'),
    path   = require('path'),
    walk   = require('walk');

var availableFormats = function() {
  return ['bmp', 'gif', 'jpg', 'jpeg', 'png', 'psd', 'tiff', 'webp', 'svg'];
};

var startCounter = function(dir, scanFormats, onCount, onEnd) {
  var walker;
  var pixels = 0;
  var dirsProcessed = 0;

  // If no format defined use all available
  if (scanFormats.length == 0) {
    scanFormats = availableFormats();
  }

  // Set defautl folder in script path
  if (!dir) {
    dir = process.cwd();
  }
  // If dir is not array, create one
  if ( !Array.isArray(dir) ) {
    dir = [dir];
  }

  // For Array dir
  dir.forEach(function (file) {

    walker  = walk.walk(file, { followLinks: true });

    // File
    walker.on('file', function(root, stat, next) {
      var ext = path.extname(stat.name).split('.');
          ext = ext.pop();

      if (scanFormats.indexOf(ext.toLowerCase()) >= 0) {
        sizeOf(root + '/' + stat.name, function (err, dimensions) {
          if (!err && typeof dimensions.width == "number" && typeof dimensions.height == "number") {
            var filePixelsArea = dimensions.width*dimensions.height;
            pixels += filePixelsArea;

            // Partial counting
            onCount(root + '/' + stat.name, filePixelsArea, pixels);

            // Go next file
            next();
          } else {
            next();
          }
        });

      } else {
        next();
      }

    });

    // On end
    walker.on('end', function() {
      dirsProcessed++;
      if ( dirsProcessed >= dir.length ) {
        onEnd(pixels);
      }
    });

  });

};

module.exports = {
  availableFormats: availableFormats,
  start: startCounter
};
