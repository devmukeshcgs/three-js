precision highp float;

uniform float time;

uniform float progress;
uniform sampler2D texture1;
uniform vec4 resolution;
uniform vec2 vUv;
varying vec3 vPosition;
float PI=3.14150265389793238;
void main(){
    // gl_FragColor=vec4(vUv,1.,0)
    gl_FragColor=vec4(1,0.,0.,0.);
}