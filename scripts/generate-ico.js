const fs = require('fs');
const path = require('path');

const ICON_DIR = path.join(__dirname, '..', 'public', 'images');
const OUTPUT_PATH = path.join(__dirname, '..', 'public', 'favicon.ico');
const PNG_SOURCES = [
  { path: path.join(ICON_DIR, 'favicon_16.png'), width: 16, height: 16 },
  { path: path.join(ICON_DIR, 'favicon_32.png'), width: 32, height: 32 }
].filter((source) => fs.existsSync(source.path));

function createIco() {
  if (PNG_SOURCES.length === 0) {
    throw new Error('Missing PNG source files for favicon generation.');
  }

  const images = PNG_SOURCES.map((source) => {
    const data = fs.readFileSync(source.path);
    return { ...source, data };
  });

  // ICO Header (6 bytes)
  // 0-1: Reserved (0)
  // 2-3: Type (1 for icon)
  // 4-5: Number of images
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);

  let offset = 6 + (images.length * 16);
  const directory = Buffer.alloc(images.length * 16);
  const imageData = [];

  images.forEach((img, i) => {
    const size = img.data.length;

    // Directory Entry (16 bytes)
    // 0: Width (0 means 256)
    // 1: Height (0 means 256)
    // 2: Color count (0 if more than 256)
    // 3: Reserved (0)
    // 4-5: Color planes (1)
    // 6-7: Bits per pixel (32 for RGBA PNG)
    // 8-11: Size of image data
    // 12-15: Offset of image data
    const entry = directory.slice(i * 16, (i + 1) * 16);
    entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0);
    entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(size, 8);
    entry.writeUInt32LE(offset, 12);

    imageData.push(img.data);
    offset += size;
  });

  const finalIco = Buffer.concat([header, directory, ...imageData]);
  fs.writeFileSync(OUTPUT_PATH, finalIco);
  console.log(`SUCCESS: Generated transparent ICO at ${OUTPUT_PATH} (${finalIco.length} bytes)`);
}

try {
  createIco();
} catch (error) {
  console.error(`ERROR: ${error.message}`);
  process.exit(1);
}
