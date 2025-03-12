#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;  // Canvas size (width,height)
uniform vec2 u_mouse;       // mouse position in screen pixels
uniform float u_time;       // Time in seconds since load
uniform float millis;       // Time in seconds since load
uniform sampler2D u_Texture;  // Image as texture
uniform bool u_UseTexture;   // Whether to use the texture

// get this from vertex file
varying vec2 pos;
varying vec2 vTexCoord;

void main() {
 
  gl_FragColor = vec4(1., 1., 1., 1.);


}