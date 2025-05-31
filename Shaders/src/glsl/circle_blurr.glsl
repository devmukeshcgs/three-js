// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
    vec2 st=gl_FragCoord.xy/u_resolution;
    float pct=0.;
    
    // a. The DISTANCE from the pixel to the center
    pct=distance(st,vec2(.5));//Center Center
    
    // pct=distance(st,vec2(0,1)); //Top Left
    // pct=distance(st,vec2(0,0.5)); //Center Left
    // pct=distance(st,vec2(0)); //Bottom Left
    
    // pct=distance(st,vec2(1,0));//Bottom right
    // pct=distance(st,vec2(0.5,0)); //Center Bottom
    // pct=distance(st,vec2(1));//Top right
    
    // b. The LENGTH of the vector
    //    from the pixel to the center
    // vec2 toCenter = vec2(0.5)-st;
    // pct = length(toCenter);
    
    // c. The SQUARE ROOT of the vector
    //    from the pixel to the center
    // vec2 tC = vec2(0.5)-st;
    // pct = sqrt(tC.x*tC.x+tC.y*tC.y);
    
    vec3 color=vec3(pct);
    
    gl_FragColor=vec4(color,1.);
}