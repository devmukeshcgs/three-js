#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;// Canvas size (width,height)
uniform vec2 u_mouse;// mouse position in screen pixels
uniform float u_time;// Time in seconds since load
uniform float millis;// Time in seconds since load
uniform sampler2D u_Texture;// Image as texture
uniform bool u_UseTexture;// Whether to use the texture

uniform vec3 lightDirection;
uniform vec3 lightColor;
uniform vec3 ambientColor;

// get this from vertex file
varying vec3 vNormal;
varying vec3 vPosition;varying vec2 vTexCoord;

void main(){
  vec3 lightDir=normalize(lightDirection);
  float diffuse=max(dot(vNormal,lightDir),0.);
  vec3 color=ambientColor+lightColor*diffuse;
  gl_FragColor=vec4(color,1.);
  
  // gl_FragColor=vec4(1.,1.,1.,1.);
}