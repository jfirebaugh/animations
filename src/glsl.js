const now    = require('right-now')
const canvas = document.querySelector('canvas')
const frag   = document.querySelector('script[type="glsl-fragment-shader"]').textContent
const gl     = canvas.getContext('webgl') ||
               canvas.getContext('experimental-webgl')
const render = require('./render')(gl, frag)
const start  = now()

window.requestAnimationFrame(tick)

function tick() {
  render((now() - start) / 1000)
  window.requestAnimationFrame(tick)
}
