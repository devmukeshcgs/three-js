#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;  // Canvas size (width,height)
uniform vec2 u_mouse;       // mouse position in screen pixels
uniform float u_time;       // Time in seconds since load
uniform float millis;       // Time in seconds since load
uniform sampler2D u_Texture;  // Image as texture
uniform bool u_UseTexture;   // Whether to use the texture
uniform float u_rows;
uniform float u_cols;
// get this from vertex file
varying vec2 pos;
varying vec2 v_TexCoord;

varying vec2 vUv;

void main() {
    vec2 uv = gl_PointCoord;
    uv.y =1.;
    uv /= vec2(u_cols, u_rows);
    float texOffsetU = v_TexCoord.x / u_cols;
    float texOffsetV = v_TexCoord.y / u_rows;
    uv += vec2 (texOffsetU, texOffsetV);
    uv =+ vec2(0.5, 0.5);
    vec4 texture = texture2D(u_Texture, uv);
    gl_FragColor = texture;
  if (u_UseTexture) {
  // vec2 pos = v_TexCoord;
    // vec4 texColor = texture2D(u_Texture, pos);
    // gl_FragColor = vec4(texColor);
  } else {
  //singlw color
//   gl_FragColor = vec4(1., 1., 1., 1.);

  //1D color
  // gl_FragColor = vec4(pos.x, 0., 1., 1.);

  //1D color
  // gl_FragColor = vec4(pos, 1., 1.);

  //custom colors using mix
    // vec4 c1 = vec4(0.5, 0.1, 0.9, 1.);
    // vec4 c2 = vec4(0.1, 0.8, 0.7, 1.);
    // vec4 c = mix(c1, c2, pos.x);
  // gl_FragColor = vec4(c);

  // repeating pattern
  // vec2 newPos = fract(pos);
  // multiply by 10.
    // vec2 newPos = fract(pos * 10.);
  // gl_FragColor = vec4(newPos, 1.,1.);

  // sine wave
  // float sinColor = sin(pos.x * 16.);
  // float sinColor = (sin(pos.x * 16.)+1.)/2.;
    // float sinColor = (sin(pos.x * 16. + millis / 1000.) + 1.) / 2.;
    // gl_FragColor = vec4(sinColor, 0., 1., 1.);

  }
    // vec2 pos = v_TexCoord;
    // vec4 texColor = texture2D(u_Texture, pos);
    // gl_FragColor = vec4(texColor);
    // gl_FragColor = vec4(0.76, 0.0, 0.0, 1.0);
    // gl_FragColor = texture2D(u_Texture, v_TexCoord);
    if(gl_FragColor.r < 0.1) discard;
    // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);

}