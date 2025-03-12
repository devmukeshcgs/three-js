#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;  // Canvas size (width,height)
uniform vec2 u_mouse;       // mouse position in screen pixels
uniform float u_time;       // Time in seconds since load
uniform float millis;       // Time in seconds since load
uniform sampler2D u_Texture;  // Image as texture
uniform bool u_UseTexture;   // Whether to use the texture
uniform float u_Rows;
uniform float u_Cols;
// get this from vertex file
varying vec2 pos;
varying vec2 v_TexCoord;

varying vec2 vUv;


float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
    vec2 pos = gl_FragCoord.xy / u_resolution.xy;

  // Generate grain using random values
  float grain = random(pos + u_time);

  // Adjust grain intensity
  grain = grain * 0.2 - 0.1;

  // Base color (white background with grain overlay)
  vec3 color = vec3(0.21) + vec3(grain);

  gl_FragColor = vec4(color, 1.0);
//   gl_FragColor = vec4(color, 1.0);
}