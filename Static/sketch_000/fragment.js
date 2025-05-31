let fragment = `uniform float u_time;
uniform float progress;
uniform sampler2D texture1;
uniform vec4 u_resolution;
varying vec2 vUv;
varying vec3 vPosition;
float PI=3.14150265389793238;

void main(){
    gl_FragColor=vec4(1.,1.,0.);
}`
export default fragment