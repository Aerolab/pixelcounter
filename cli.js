var	stdio = require('stdio'),
	pixelCounter = require('./count.js');

var printMsg = function(msg,enter) {
	if (enter) {
		process.stdout.write('\n');
	}
	process.stdout.clearLine();
	process.stdout.cursorTo(0);
	process.stdout.write(msg);
}

var availableFormats = pixelCounter.availableFormats(),
	scanFormats = [],
	pixels = 0,
	availableCommands = {
		'dir': {key: 'd', description: 'Directory', args: 1},
		'formats': {key: 'f', description: 'Image extensions separated with comma', args: 1}
	};

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

var showProgress = function(fileName, filePixels, partialCount) {
	printMsg(partialCount+" pixels and counting");
}
var onEnd = function(totalPixels) {
	if (totalPixels != 0) {
		printMsg("Total pixels counted: "+totalPixels);
		printMsg('', true);
	} else {
		printMsg("No valid images found :(");
		printMsg('', true);
	}
}

printMsg("Counting pixels...", true);
pixelCounter.start(directory, scanFormats, showProgress, onEnd);