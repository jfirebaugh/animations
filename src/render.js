const triangle = require('a-big-triangle')
const Shader   = require('gl-shader')

const vert = `
  precision mediump float;
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 1, 1);
  }
`

module.exports = function(gl, frag) {
  const shader = Shader(gl, vert, frag)

  return function render(t) {
    const width  = gl.drawingBufferWidth
    const height = gl.drawingBufferHeight

    gl.viewport(0, 0, width, height)

    shader.bind()
    shader.uniforms.iGlobalTime = t
    shader.uniforms.iResolution = [width, height, 1]
    triangle(gl)
  }
}
