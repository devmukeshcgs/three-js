#ifdef GL_ES
precision mediump float;
#endif

uniform mat4  projectionMatrix;
uniform mat4  viewMatrix;
uniform mat4  modelMatrix;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform vec2 uv;

const float PI = 3.1415926535;

void main(){

    vec2 position = gl_FragCoord.xy/u_resolution;
    
    // Pattern 6
    // float strenth = 1.0- position.y;
    // Pattern 7
    // float strenth = position.y * 10.0;
    // Pattern 8
    // float strenth = mod(position.y * 10.0, 1.0);
    // Pattern 9
    // float strenth = mod(position.y * 10.0, 1.0);
    // strenth = step(0.5, strenth);
    // Pattern 10
    // float strenth = mod(position.y * 10.0, 1.0);
    // strenth = step(0.4, strenth);
    // Pattern 11
    // float strenth = mod(position.x * 10.0, 1.0);
    // strenth = step(0.8, strenth);
    // Pattern 12
    // float strenth = mod(position.y * 10.0, 1.0);
    // strenth = step(0.8, strenth);
    // Pattern 12
    float strenth = mod(position.y * 10.0, 1.0);
    float strenth2 = mod(position.x * 10.0, 1.0);

    strenth = step(0.8, strenth) *step(0.8, strenth2);

    gl_FragColor=vec4(vec3(strenth), 1.0);
    
}