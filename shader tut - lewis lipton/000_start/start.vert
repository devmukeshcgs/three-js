#ifdef GL_ES
precision mediump float;
#endif

uniform mat4  projectionMatrix;
uniform mat4  viewMatrix;
uniform mat4  modelMatrix;
uniform vec2 u_resolution;

attribute vec3 position;
attribute vec2 uv;

const float PI = 3.1415926535;

void main(){
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);

}