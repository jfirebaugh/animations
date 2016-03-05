precision highp float;

uniform float iGlobalTime;
uniform vec3  iResolution;

void main(){
  vec2 st = gl_FragCoord.xy/iResolution.xy*2.-1.;
  float d = length(abs(st) + .5);
  float t = iGlobalTime + 1000.0;
  gl_FragColor = vec4(vec3(fract(d*t/10.)), 1.0);
}
