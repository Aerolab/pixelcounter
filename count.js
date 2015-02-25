var fs = require('fs'),
	sizeOf = require('image-size'),
	path = require('path'),
	walk = require('walk');


var availableFormats = function() {
	return ['bmp', 'gif', 'jpg', 'jpeg', 'png', 'psd', 'tiff', 'webp', 'svg'];
}

var startCounter = function(dir, scanFormats, onCount, onEnd) {
	var pixels = 0;
	if (scanFormats.length == 0) {
		// If no format defined use all available
		scanFormats = availableFormats();
	}
	if (!dir) {
		// Set defautl folder in script path
		dir = process.cwd();
	}

	var walker  = walk.walk(dir, { followLinks: true });

	walker.on('file', function(root, stat, next) {
		var ext = path.extname(stat.name).split('.');
		var ext = ext[ext.length - 1];

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

	walker.on('end', function() {
		onEnd(pixels);
	});
}

module.exports = {
	availableFormats: availableFormats,
	start: startCounter
}
