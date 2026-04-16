/* eslint-disable no-console */
/**
 * Converts a PNG (colorType=2 RGB, 8-bit, non-interlaced) to RGBA (colorType=6)
 * by adding an opaque alpha channel (255) to every pixel.
 *
 * This is used to satisfy Next.js image decoding requirements for favicon ICO
 * (the embedded PNGs must be RGBA).
 */
const fs = require('fs')
const zlib = require('zlib')

const PNG_SIG = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])

function crc32(buf) {
  let crc = 0xffffffff
  for (let i = 0; i < buf.length; i++) {
    crc ^= buf[i]
    for (let j = 0; j < 8; j++) {
      const mask = -(crc & 1)
      crc = (crc >>> 1) ^ (0xedb88320 & mask)
    }
  }
  return (crc ^ 0xffffffff) >>> 0
}

function readChunks(buffer) {
  let offset = PNG_SIG.length
  const chunks = []
  while (offset + 8 <= buffer.length) {
    const length = buffer.readUInt32BE(offset)
    const type = buffer.slice(offset + 4, offset + 8).toString('ascii')
    const dataStart = offset + 8
    const dataEnd = dataStart + length
    const crc = buffer.readUInt32BE(dataEnd)
    const data = buffer.slice(dataStart, dataEnd)
    chunks.push({ length, type, data, crc })
    offset = dataEnd + 4
    if (type === 'IEND') break
  }
  return chunks
}

function buildChunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii')
  const lenBuf = Buffer.alloc(4)
  lenBuf.writeUInt32BE(data.length, 0)
  const crcBuf = Buffer.alloc(4)
  const crcVal = crc32(Buffer.concat([typeBuf, data]))
  crcBuf.writeUInt32BE(crcVal, 0)
  return Buffer.concat([lenBuf, typeBuf, data, crcBuf])
}

function convertRgbToRgbaPng(inputPath, outputPath) {
  const src = fs.readFileSync(inputPath)
  if (!src.slice(0, 8).equals(PNG_SIG)) {
    throw new Error(`Not a PNG: ${inputPath}`)
  }

  const chunks = readChunks(src)
  const ihdr = chunks.find((c) => c.type === 'IHDR')
  if (!ihdr) throw new Error(`Missing IHDR: ${inputPath}`)

  const width = ihdr.data.readUInt32BE(0)
  const height = ihdr.data.readUInt32BE(4)
  const bitDepth = ihdr.data.readUInt8(8)
  const colorType = ihdr.data.readUInt8(9)
  const compression = ihdr.data.readUInt8(10)
  const filter = ihdr.data.readUInt8(11)
  const interlace = ihdr.data.readUInt8(12)

  if (bitDepth !== 8 || colorType !== 2 || interlace !== 0) {
    throw new Error(
      `Unsupported PNG (need 8-bit RGB, non-interlaced). Got bitDepth=${bitDepth} colorType=${colorType} interlace=${interlace} for ${inputPath}`
    )
  }
  if (compression !== 0 || filter !== 0) {
    // These are always 0 in normal PNGs; treat as unsupported to keep converter simple.
    throw new Error(`Unsupported PNG header flags for ${inputPath}`)
  }

  const idatData = Buffer.concat(chunks.filter((c) => c.type === 'IDAT').map((c) => c.data))
  const inflated = zlib.inflateSync(idatData)

  const inStride = width * 3
  const outStride = width * 4
  const out = Buffer.alloc(height * (1 + outStride))

  let inOffset = 0
  let outOffset = 0

  for (let y = 0; y < height; y++) {
    const filterByte = inflated.readUInt8(inOffset)
    out.writeUInt8(filterByte, outOffset)
    inOffset += 1
    outOffset += 1

    const row = inflated.slice(inOffset, inOffset + inStride)
    inOffset += inStride

    for (let x = 0; x < width; x++) {
      const r = row[x * 3 + 0]
      const g = row[x * 3 + 1]
      const b = row[x * 3 + 2]
      out[outOffset++] = r
      out[outOffset++] = g
      out[outOffset++] = b
      out[outOffset++] = 0xff
    }
  }

  const newIhdr = Buffer.from(ihdr.data)
  newIhdr.writeUInt8(6, 9) // colorType RGBA

  const deflated = zlib.deflateSync(out)

  // Rebuild PNG: signature + IHDR + (optional) ancillary chunks except IDAT + new IDAT + IEND
  const outChunks = []
  outChunks.push(PNG_SIG)

  outChunks.push(buildChunk('IHDR', newIhdr))

  for (const c of chunks) {
    if (c.type === 'IHDR' || c.type === 'IDAT' || c.type === 'IEND') continue
    outChunks.push(buildChunk(c.type, c.data))
  }

  outChunks.push(buildChunk('IDAT', deflated))
  outChunks.push(buildChunk('IEND', Buffer.alloc(0)))

  fs.writeFileSync(outputPath, Buffer.concat(outChunks))
}

const input = process.argv[2]
const output = process.argv[3] || input

if (!input) {
  console.error('Usage: node scripts/png-rgb-to-rgba.js <input.png> [output.png]')
  process.exit(1)
}

try {
  convertRgbToRgbaPng(input, output)
  console.log(`OK: ${input} -> ${output}`)
} catch (err) {
  console.error(`ERROR: ${err.message}`)
  process.exit(1)
}

