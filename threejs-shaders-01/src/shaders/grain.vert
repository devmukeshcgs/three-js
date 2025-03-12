#ifdef GL_ES
// precision mediump float;
precision highp float;
#endif
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix; 

attribute vec3 aPosition; //world position of vertex
attribute vec2 aTexCoord; //holds coordinates of texture

//this will pass to fragment shader
varying vec2 pos;
varying vec2 vTexCoord;

void main() {
  vec4 position = vec4(aPosition, 1.0);
  position.y += sin(position.x * 8.)/8.;
  gl_Position = uProjectionMatrix * uModelViewMatrix * position;
}
