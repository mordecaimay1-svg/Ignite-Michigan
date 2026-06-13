const sharp = require("sharp");
const path = require("path");

const assetsDir =
  "C:/Users/maym14/.cursor/projects/c-Users-maym14-Desktop-Website-IM/assets";

const logoSrc = path.join(
  assetsDir,
  "c__Users_maym14_AppData_Roaming_Cursor_User_workspaceStorage_a6e2fefb98f10a3f144f17f9934c02f3_images_A6CB6AE1-5E13-49C9-A348-086D31C5B0D3-50b23bd6-3c4b-4e66-bd16-e2626c9e1321.png"
);

const founderSrc = path.join(
  assetsDir,
  "c__Users_maym14_AppData_Roaming_Cursor_User_workspaceStorage_a6e2fefb98f10a3f144f17f9934c02f3_images_IMG_0812-39010aa4-d5f3-4067-b182-4c7cb001fdfd.png"
);

const logoOut = path.join(__dirname, "../public/logo.png");
const founderOut = path.join(__dirname, "../public/founder-david-lambright.jpg");

function isCheckerboardPixel(r, g, b) {
  const maxDiff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));
  if (maxDiff > 18) return false;
  const avg = (r + g + b) / 3;
  return avg >= 70 && avg <= 210;
}

/** Background pixels: white/near-white or checkerboard — safe to remove via edge flood-fill. */
function isRemovableBackground(r, g, b) {
  if (isCheckerboardPixel(r, g, b)) return true;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  // Pure or near-white outer background
  if (min >= 235 && max - min <= 24) return true;
  // Soft off-white JPEG fringe
  if (min >= 220 && max - min <= 18) return true;
  return false;
}

function removeBackgroundViaFloodFill(pixels, width, height) {
  const visited = new Uint8Array(width * height);
  const queue = [];

  const pushIfBackground = (x, y) => {
    const idx = y * width + x;
    if (visited[idx]) return;
    const i = idx * 4;
    if (!isRemovableBackground(pixels[i], pixels[i + 1], pixels[i + 2])) return;
    visited[idx] = 1;
    queue.push(idx);
  };

  for (let x = 0; x < width; x++) {
    pushIfBackground(x, 0);
    pushIfBackground(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    pushIfBackground(0, y);
    pushIfBackground(width - 1, y);
  }

  while (queue.length > 0) {
    const idx = queue.pop();
    const x = idx % width;
    const y = (idx - x) / width;
    const i = idx * 4;
    pixels[i + 3] = 0;

    if (x > 0) pushIfBackground(x - 1, y);
    if (x < width - 1) pushIfBackground(x + 1, y);
    if (y > 0) pushIfBackground(x, y - 1);
    if (y < height - 1) pushIfBackground(x, y + 1);
  }
}

async function processLogo() {
  const { data, info } = await sharp(logoSrc)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = new Uint8Array(data);
  removeBackgroundViaFloodFill(pixels, info.width, info.height);

  await sharp(pixels, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .trim({ threshold: 1 })
    .png({ compressionLevel: 9 })
    .toFile(logoOut);

  const meta = await sharp(logoOut).metadata();
  console.log("Logo saved:", logoOut, `${meta.width}x${meta.height}`);
}

async function processFounder() {
  await sharp(founderSrc)
    .resize(800, 1000, { fit: "cover", position: "top" })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(founderOut);

  console.log("Founder photo saved:", founderOut);
}

Promise.all([processLogo(), processFounder()]).catch(console.error);
