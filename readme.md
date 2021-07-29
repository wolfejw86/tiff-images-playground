## To Run

MacOS only for now.

### Initial Setup in terminal

```sh
npm install;
npm run setup;
```

1. notice the two src image files - we're going to combine them into a multi-page .tiff image
2. run `node make-multipage-tiff.js` (breeze through the code - it's basically just using the `convert` utility from `libtiff` binary to do the operation)

   - notice the `joined.tiff` image file is created! (if you set everything up correctly)

3. to decompose the multi page tiff you generated into 2 separate images run `node separate-multipage-tiff.js`

## Credits

https://imagemagick.org/script/download.php#macosx

https://sharp.pixelplumbing.com/
