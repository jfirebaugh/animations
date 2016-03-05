const PNG = require('pngjs').PNG

module.exports = function (frag) {
  const width  = 500
  const height = 500
  const gl     = require('gl')(width, height, { preserveDrawingBuffer: true })
  const render = require('./render')(gl, frag)

  render(0)

  var pixels = new Uint8Array(width * height * 4)
  gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels)

  var data = new Buffer(pixels);

  // Flip the scanlines.
  var stride = width * 4
  var tmp = new Buffer(stride)
  for (var i = 0, j = height - 1; i < j; i++, j--) {
    var start = i * stride
    var end = j * stride
    data.copy(tmp, 0, start, start + stride)
    data.copy(data, start, end, end + stride)
    tmp.copy(data, end)
  }

  const png = new PNG({width, height})
  png.data = data

  return PNG.sync.write(png)
}
