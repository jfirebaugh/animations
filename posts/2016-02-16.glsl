precision mediump float;

uniform float iGlobalTime;
uniform vec3  iResolution;

#define PI 3.1415926535897932384626433832795

void main() {
  vec2 st = gl_FragCoord.xy / iResolution.xy;
  float f = 2.0 / 3.0;

  vec3 t = vec3(step(f, st.y) * (0.25+0.25*sin(st.x*PI+iGlobalTime)));
  vec3 m = vec3((1.-step(f, st.y))*(1.-step(f, 1.-st.y))*(0.25+0.25*sin(st.x*PI-iGlobalTime+PI*2./3.)));
  vec3 b = vec3(step(f, 1.-st.y)*(0.25+0.25*sin(st.x*PI+iGlobalTime+PI*4./3.)));
  vec3 p = vec3(step(f, st.x) * (0.25+0.25*cos(st.y*PI-iGlobalTime)));
  vec3 q = vec3((1.-step(f, st.x))*(1.-step(f, 1.-st.x))*(0.25+0.25*cos(st.y*PI+iGlobalTime+PI*2./3.)));
  vec3 r = vec3(step(f, 1.-st.x)*(0.25+0.25*cos(st.y*PI-iGlobalTime+PI*4./3.)));

  gl_FragColor.rbg = t + m + b + p + q + r;
  gl_FragColor.a = 1.;
}
