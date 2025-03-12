#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;  // Canvas size (width,height)
uniform vec2 u_mouse;       // mouse position in screen pixels
uniform float u_time;       // Time in seconds since load
uniform float millis;       // Time in seconds since load
uniform sampler2D u_Texture;  // Image as texture
uniform bool u_UseTexture;   // Whether to use the texture
uniform float u_Rows;
uniform float u_Cols;
// get this from vertex file
varying vec2 pos;
varying vec2 v_TexCoord;

varying vec2 vUv;

#ifdef GL_ES
precision mediump float;
#endif

uniform vec3 lightDirection; // Light direction in world space
uniform vec3 baseColor;      // Base color for the model
varying vec3 vNormal;        // Normal vector passed from the vertex shader
varying vec3 vPosition;      // Position vector passed from the vertex shader

void main() {
  // Normalize the normal vector and light direction
  vec3 normal = normalize(vNormal);
  vec3 lightDir = normalize(lightDirection);

  // Calculate diffuse lighting
  float diffuse = max(dot(normal, lightDir), 0.0);

  // Add simple ambient lighting
  float ambient = 0.2;

  // Combine lighting with the base color
  vec3 color = baseColor * (ambient + diffuse);

  // Apply perspective-based variation
  float perspectiveEffect = abs(dot(normal, normalize(vPosition)));
  color += vec3(perspectiveEffect * 0.2);

  gl_FragColor = vec4(color, 1.0);
}
