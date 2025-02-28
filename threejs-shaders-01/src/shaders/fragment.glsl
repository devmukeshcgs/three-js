varying vec2 vUv;

void main()
{
    // each particals gradiant
    float d = length(gl_PointCoord.xy - 0.5)*2.;
    gl_FragColor = vec4(vec3(d) , 1.);
    
    // all particals gradiant
    // gl_FragColor = vec4(vUv.xy, 1.0, 1.0);
}