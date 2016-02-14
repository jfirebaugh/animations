#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.y) -
          smoothstep( pct, pct+0.2, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;

    float y = 0.5 + 0.5 * sin(u_time * 0.2 + (u_time * 0.001 + 10000.0) * st.x);
    vec3 color = vec3(y);

    color = plot(st,y) * vec3(st.x, st.y, abs(sin(u_time * 0.3)));

    gl_FragColor = vec4(color,1.0);
}
