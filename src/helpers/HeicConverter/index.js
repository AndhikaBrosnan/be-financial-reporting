const { promisify } = require('util')
const fs = require('fs')
const convert = require('heic-convert')

module.exports = class HEICConverter {
  static async convertToJpg (path) {
    const inputBuffer = await promisify(fs.readFile)(path)
    const outputBuffer = await convert({
      buffer: inputBuffer, // the HEIC file buffer
      format: 'JPEG', // output format
      quality: 1 // the jpeg compression quality, between 0 and 1
    })

    await promisify(fs.writeFile)(path, outputBuffer)
  }
}
