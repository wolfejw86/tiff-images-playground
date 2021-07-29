const sharp = require("sharp");

sharp("./joined.tiff", {
  page: 0,
})
  .png()
  .toFile("./decomposed-tiff-page1.png");

sharp("./joined.tiff", {
  page: 1,
})
  .png()
  .toFile("./decomposed-tiff-page2.png");
