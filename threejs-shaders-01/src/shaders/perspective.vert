#ifdef GL_ES
precision mediump float;
#endif

attribute vec3 aPosition;
attribute vec3 aNormal;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat3 normalMatrix;

varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  // Transform the normal vector
  vNormal = normalize(normalMatrix * aNormal);

  // Calculate the position in world space
  vec4 worldPosition = uModelViewMatrix * vec4(aPosition, 1.0);
  vPosition = worldPosition.xyz;

  // Set the position for the vertex
  gl_Position = uProjectionMatrix * worldPosition;
}
