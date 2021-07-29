const sharp = require("sharp");
async function main() {
  const b1 = sharp("./srcFile.png", { sequentialRead: true }).tiff();
}
main();
