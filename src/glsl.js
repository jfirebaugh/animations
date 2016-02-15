const Context  = require('gl-context')
const triangle = require('a-big-triangle')
const Shader   = require('gl-shader')
const now      = require('right-now')

const start = now()
const vert  = `
  precision mediump float;
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 1, 1);
  }
`

const canvas = document.querySelector('canvas')
const frag   = document.querySelector('script[type="glsl-fragment-shader"]').textContent
const gl     = Context(canvas, render)
const shader = Shader(gl, vert, frag)

function render() {
  const width  = gl.drawingBufferWidth
  const height = gl.drawingBufferHeight

  gl.viewport(0, 0, width, height)

  shader.bind()
  shader.uniforms.iGlobalTime = (now() - start) / 1000
  shader.uniforms.iResolution = [width, height, 1]
  triangle(gl)
}
