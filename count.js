var fs = require('fs'),
	stdio = require('stdio'),
	sizeOf = require('image-size'),
	path = require('path'),
	walk = require('walk');


var availableFormats = ['bmp', 'gif', 'jpg', 'jpeg', 'png', 'psd', 'tiff', 'webp', 'svg'],
	scanFormats = [],
	pixels = 0,
	availableCommands = {
    'dir': {key: 'd', description: 'Directory', args: 1},
    'formats': {key: 'f', description: 'Image extensions separated with comma', args: 1}
}
for (i = 0; i < availableFormats.length; i++) {
	availableCommands[availableFormats[i]] = {description: 'Count any ' + availableFormats[i] + ' file'};
}

var options = stdio.getopt(availableCommands);

var directory = options.dir;
if (!directory) {
	// Set defautl folder in script path
  directory = process.cwd();
}

var formats = options.formats;
if (formats) {
	var inputFormats = formats.split(',');
	for (i = 0; i < inputFormats.length; i++) {
		if (availableFormats.indexOf(inputFormats[i]) > 0) {
			scanFormats.push(inputFormats[i]);
		}
	}
}

for (i = 0; i < availableFormats.length; i++) {
	if (options[availableFormats[i]]) {
		if (scanFormats.indexOf(availableFormats[i]) == -1) {
			scanFormats.push(availableFormats[i]);
		}
	}
}


if (scanFormats.length == 0) {
	// If no format defined use all available
	scanFormats = availableFormats;
}

printMsg('', true);
printMsg("Starting to count pixels on:");
printMsg(directory, true);
printMsg('', true);
printMsg("Image format to count: " + scanFormats.join(', '), true);
printMsg('', true);

var walker  = walk.walk(directory, { followLinks: true });

printMsg("Counting pixels...", true);
walker.on('file', function(root, stat, next) {
    var ext = path.extname(stat.name).split('.');
    var ext = ext[ext.length - 1];

    if (scanFormats.indexOf(ext.toLowerCase()) > 0) {

      sizeOf(root + '/' + stat.name, function (err, dimensions) {
        if (!err && typeof dimensions.width == "number" && typeof dimensions.height == "number") {
          var filePixelsArea = dimensions.width*dimensions.height;
          pixels += filePixelsArea;
          printMsg(pixels+" pixels and counting");
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
	if (pixels != 0) {
	    printMsg("Total pixels counted: "+pixels);
	    printMsg('', true);
	} else {
		printMsg("No valid images found :(");
		printMsg('', true);
	}
});

function printMsg(msg,enter) {
	if (enter) {
		process.stdout.write('\n');
	}
	process.stdout.clearLine();
	process.stdout.cursorTo(0);
	process.stdout.write(msg);
}