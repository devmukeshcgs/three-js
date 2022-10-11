#ifdef GL_ES
precision mediump float;
#endif

const float PI = 3.1415926535;

uniform vec2 u_resolution;

float circleShape(vec2 position, float radius ){
    return step(radius, length(position-vec2(0.5)) );
}
 
void main(){

    vec2 coord = gl_FragCoord.xy/u_resolution;
    vec2 translate = vec2(1.0,0.0 );
    coord += translate*0.0;
 
    vec3 color = vec3(1.0, 0.0, 0.0);
 
    float circle = circleShape(coord, 0.2);
 
    color += vec3(circle );
 
    gl_FragColor=vec4(color,1.);
    
}