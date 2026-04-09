uniform float uTime;
uniform float uColor;
varying vec2 vUv;
varying vec3 vElevation;


void main() {
vec4 c1 = vec4(1.0, 0.3, 0.6, 1.0); 
vec4 c2 = vec4(1.0, 0.75, 0.85, 1.0);

vec4 c3 = vec4(0.2, 0.8, 0.4, 1.0); 
vec4 c4 = vec4(0.7, 1.0, 0.8, 1.0);
    
    float color = smoothstep(0.1, -0.2, vElevation.y*1.9);
    vec4 color1 = mix(c1, c2, color) ;
    vec4 color2 = mix(c3, c4, color) ;

    vec4 finalColor = mix(color1,color2,uColor);
    
	gl_FragColor = finalColor;
}