#ifdef GL_ES
precision mediump float;
#endif

const float PI = 3.1415926535;

uniform vec2 u_resolution;

float polygoneShape(vec2 position, float radius, float sides){
    position =  position * 2.0 - 1.0;
    float angle = atan(position.x, position.y);
    float slice = PI *2.0 / sides;

    return step(radius, cos(floor(0.5 + angle/slice) * slice - angle ) * length(position) );
}

void main(){
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    uv.x *= u_resolution.x / u_resolution.y;

    // vec2 position = gl_FragCoord.xy/u_resolution.xy;
 
    vec3 color = vec3(1.0, 0.0, 0.0);

    float polygon = polygoneShape(uv, 0.1,6.0);
    
    color = vec3( polygon);
 
 
    gl_FragColor=vec4(color,1.);
    
}