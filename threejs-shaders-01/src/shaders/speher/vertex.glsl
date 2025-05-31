varying vec2 v_uv;
varying vec3 v_position;
varying vec3 v_normal;

void main() {
  v_position = position;
  v_normal = normal;
  v_uv = uv;

  vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.);
  vec4 projectedPosition = projectionMatrix * modelViewPosition;
  gl_Position = projectedPosition;
}