# Pixel Counter
---
Just a small script that counts the total amount of pixels.
We use it in http://aerolab.co/culture <3

First of all... download dependencies.
> npm install

Second step.. COUNT!
> node count.js

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
node count.js -d /Users/sbehrends/Desktop/ -f png,jpg,jpeg
```

Count amount of pixels in funny cat videos GIFs
```
node count.js -d /Users/sbehrends/Documents/gifs/cats --gif
```