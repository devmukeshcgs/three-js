#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

float circleShape(vec2 position, float radius ){
    return step(radius, length(position-vec2(0.5)) );
}

void main(){

vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    uv.x *= u_resolution.x / u_resolution.y;

    vec2 position = gl_FragCoord.xy/u_resolution;
 
    vec3 color = vec3(1.0, 1.0, 1.0);
 
    float circle = circleShape(uv, 0.2);
 
    color = vec3(circle );
 
    gl_FragColor=vec4(color,1.);
    
}