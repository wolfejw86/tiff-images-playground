//@ts-check
const spawn = require("child_process").spawn;
const path = require("path");
const fs = require("fs-extra");
const uuidv4 = require("uuid").v4;

fs.mkdirpSync("./tmp");

// setup a tmp dir for intermediate images
const tempDir = path.join(__dirname, "./tmp");

// setup env variables for shell script instance to be able to use `convert` from `libtiff` correctly
const MAGICK_HOME = path.join(__dirname, "ImageMagick-7.0.10");
const DYLD_LIBRARY_PATH = path.join(MAGICK_HOME, "lib/");
const CONVERT_EXECUTABLE = path.join(
  __dirname,
  "ImageMagick-7.0.10/bin/convert"
);

// simulated incoming base64 images
// if we needed to we could use sharp to turn these into .tiff files
// it's not necessary since libtiff can handle this for us anyways
const simulatedBase64Image1 = fs
  .readFileSync("./srcFile.png")
  .toString("base64");

const simulatedBase64Image2 = fs
  .readFileSync("./srcFile2.png")
  .toString("base64");

async function main() {
  // unique tmp naming convention to avoid intermediate image filename conflicts
  const userIdentifier = "29304029";
  const uniqueValueAssociation = uuidv4();

  // write files to tempdir
  await Promise.all([
    fs.writeFile(
      `${tempDir}/${userIdentifier}-${uniqueValueAssociation}-1.png`,
      Buffer.from(simulatedBase64Image1, "base64")
    ),
    fs.writeFile(
      `${tempDir}/${userIdentifier}-${uniqueValueAssociation}-2.png`,
      Buffer.from(simulatedBase64Image2, "base64")
    ),
  ]);

  // join into a multipage tiff with convert binary
  const imageprocessing = spawn(
    CONVERT_EXECUTABLE,
    [
      `${tempDir}/${userIdentifier}-${uniqueValueAssociation}*.png`, // uses wildcard to match
      `joined.tiff`, // output multipage tiff
    ],
    {
      env: {
        MAGICK_HOME,
        DYLD_LIBRARY_PATH,
      },
    }
  );

  imageprocessing.on("error", console.log);

  // wait for image processing to be finished
  await new Promise((resolve) => {
    imageprocessing.on("close", resolve);
  });

  // remove intermediate images
  await Promise.all([
    fs.rm(`${tempDir}/${userIdentifier}-${uniqueValueAssociation}-1.png`),
    fs.rm(`${tempDir}/${userIdentifier}-${uniqueValueAssociation}-2.png`),
  ]);

  console.log("inspect the new `joined.tiff` file!");
}

main();
