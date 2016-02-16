precision mediump float;

uniform float iGlobalTime;
uniform vec3  iResolution;

void main() {
  vec2 st = gl_FragCoord.xy / iResolution.xy - vec2(0.5);

  float tr = iGlobalTime / 2.0;
  float tg = tr + 8.0;
  float tb = tg + 10.0;

  float kx = 3.0;
  float ky = 2.0;

  float a = 0.8;
  float b = 0.8;

  vec2 str = vec2(a * cos(kx * tr),
                  b * sin(ky * tr));
  vec2 stg = vec2(a * cos(kx * tg),
                  b * sin(ky * tg));
  vec2 stb = vec2(a * cos(kx * tb),
                  b * sin(ky * tb));

  gl_FragColor.r = 1.0 - distance(str, st);
  gl_FragColor.g = 1.0 - distance(stg, st);
  gl_FragColor.b = 1.0 - distance(stb, st);
  gl_FragColor.a = 0.8;
}
