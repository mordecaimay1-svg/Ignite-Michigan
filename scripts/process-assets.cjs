const sharp = require("sharp");
const path = require("path");

const assetsDir =
  "C:/Users/maym14/.cursor/projects/c-Users-maym14-Desktop-Website-IM/assets";

const logoSrc = path.join(
  assetsDir,
  "c__Users_maym14_AppData_Roaming_Cursor_User_workspaceStorage_a6e2fefb98f10a3f144f17f9934c02f3_images_ChatGPT_Image_May_28__2026__12_44_28_PM-e2214008-6762-464f-8707-3e2843a76275.png"
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
  // Typical Photoshop checkerboard grays
  return avg >= 70 && avg <= 210;
}

async function processLogo() {
  const { data, info } = await sharp(logoSrc)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = new Uint8Array(data);
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    if (isCheckerboardPixel(r, g, b)) {
      pixels[i + 3] = 0;
    }
  }

  await sharp(pixels, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png({ compressionLevel: 9 })
    .toFile(logoOut);

  console.log("Logo saved:", logoOut, `${info.width}x${info.height}`);
}

async function processFounder() {
  await sharp(founderSrc)
    .resize(800, 1000, { fit: "cover", position: "top" })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(founderOut);

  console.log("Founder photo saved:", founderOut);
}

Promise.all([processLogo(), processFounder()]).catch(console.error);
