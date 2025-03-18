uniform sampler2D screenTexture;
uniform vec2 resolution;
uniform float opacity;
uniform float blurRadius;
uniform float u_radius;

varying vec2 v_uv;
varying vec3 v_position;
varying vec3 v_normal;

void main(){
  // gl_FragColor= vec4(v_position,1.);
  // gl_FragColor = vec4(v_uv,0., 1.);
  // gl_FragColor = vec4(v_uv.xxx, 1.);
  // gl_FragColor = vec4(vec3(step(0.5,v_uv.x)), 1.);
  // smoothstep
  // gl_FragColor=vec4(vec3(smoothstep(.25, .50, v_uv.x)),1);
  //length of the vector
  // gl_FragColor=vec4(vec3(length(v_uv)),1);
  //updating uv
  // vec2 uv = v_uv;
  // uv -= vec2(0.5);
  // uv *= 2.;
  // gl_FragColor = vec4(vec3(length(uv )),1);
  
  // vec2 uv=v_uv;
  // uv-=vec2(.5);
  // uv*=2.;
  // const float RADIUS = .5 ;
  // gl_FragColor=vec4(step(u_radius,vec3(length(uv))),1);
  
  vec2 uv=v_uv;
  uv-=vec2(.5);
  uv*=2.;
  const float RADIUS=.5;
  // FRACT()
  // gl_FragColor=vec4(vec3(fract( v_uv.x * 10. )),1);
  // STEP + FRACT
  // gl_FragColor=vec4(vec3(step(0.5,fract( v_uv.x * 10. ))),1);
  //  STEP + MOD
  // gl_FragColor=vec4(vec3(step(0.5,mod( v_uv.x * 10.,3. ))),1);
  // MIX / LERP
  // gl_FragColor=vec4(vec3( mix( 0.5, 1.0, v_uv.x)),1);
  // DOT
  // vec3 A = vec3(1.,0.,0.);
  // vec3 B = vec3(0.,1.,0.);
  // float dotProduct = dot(A,B);
  // gl_FragColor=vec4(vec3(dotProduct),1);

  // vec3 viewDirection = normalize(cameraPosition - v_position);
  //  gl_FragColor=vec4(viewDirection,1);

  vec3 viewDirection = normalize(cameraPosition - v_position);
  float fresnel = dot(viewDirection, v_normal);
  // fresnel = pow(fresnel, 2.0);
   gl_FragColor=vec4( vec3(fresnel),1);

}