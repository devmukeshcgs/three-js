#ifdef GL_ES
// precision mediump float;
precision highp float;
#endif
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

attribute vec3 aPosition;//world position of vertex
attribute vec2 aTexCoord;//holds coordinates of texture

//this will pass to fragment shader
varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vTexCoord;

void main() {
  vec4 position = vec4(aPosition, 1.);
  position.y+=sin(position.x*8.)/8.;
  gl_Position=uProjectionMatrix*uModelViewMatrix*position;

  // gl_Position=uProjectionMatrix*uModelViewMatrix*vec4(position,1.);
  // vNormal=normalize(normalMatrix*normal);
  // vPosition=vec3(uModelViewMatrix*vec4(position,1.));
}
