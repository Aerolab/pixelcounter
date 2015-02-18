# Pixel Counter
---
Just a small script that counts the total amount of pixels.
We use it in http://aerolab.co/culture <3

# Usage as Module

```
npm install pixelcounter --save
```

```
var pixelCounter = require('pixelcounter');
console.log(pixelCounter.availableFormats());
pixelCounter.start(directory, scanFormats, showProgress, onEnd);
```

**availableFormats()**: Will return avaiable image extensions to count

**start(**directory, formats, showProgress, onEnd**)**: Will start the process of counting pixels in a certain directory.

 - It requires a **directory**, where to scan images.
 - An array of **formats**, if null it will scan all formats.
 - A callback for each time a image is counted. It will return filename, amount of pixels in file, total pixels counted at the moment.
 - A callback when the process finishes counting. It returns the amount of pixels.
 
For an example implementation you can read cli.js


# Usage of CLI
We built in a small example to use it as cli (besides beeing a npm package)

First of all... download dependencies.
> npm install

Second step.. COUNT!
> node cli.js

By default it will get all images (with compatible extension) in current folder but you can set some custom parameters.

**The following options are supported:**
```
  -d, --dir <ARG1>      Directory
  -f, --formats <ARG1>  Image extensions separated with comma
  --bmp                 Count any bmp file
  --gif                 Count any gif file
  --jpg                 Count any jpg file
  --jpeg                Count any jpeg file
  --png                 Count any png file
  --psd                 Count any psd file
  --tiff                Count any tiff file
  --webp                Count any webp file
  --svg                 Count any svg file
```

# Example usage

Count PNG & JPG pixels in Desktop
```
node cli.js -d /Users/sbehrends/Desktop/ -f png,jpg,jpeg
```

Count amount of pixels in funny cat videos GIFs
```
node cli.js -d /Users/sbehrends/Documents/gifs/cats --gif
```