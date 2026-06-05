const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const FULL_DIR = "images/fulls";
const THUMB_DIR = "images/thumbs";

const SIZE = 600; // thumbnail width

if (!fs.existsSync(THUMB_DIR)) {
  fs.mkdirSync(THUMB_DIR, { recursive: true });
}

fs.readdirSync(FULL_DIR).forEach(file => {
  const inputPath = path.join(FULL_DIR, file);
  const outputPath = path.join(THUMB_DIR, file);

  // skip non-images
  if (!/\.(jpg|jpeg|png)$/i.test(file)) return;

  sharp(inputPath)
    .resize({ width: SIZE })
    .jpeg({ quality: 80 })
    .toFile(outputPath)
    .then(() => console.log("Generated:", file))
    .catch(err => console.error("Error:", file, err));
});