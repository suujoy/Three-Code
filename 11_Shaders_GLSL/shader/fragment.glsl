varying vec2 vUv;
uniform float uTime;

void main() {
    vec4 color1 = vec4(1.0, 0.0, 0.0, 1.0); 
    vec4 color2 = vec4(0.0, 0.0, 1.0, 1.0);
    vec4 color3 = vec4(0.0, 1.0, 0.0, 1.0);
    vec4 color4 = vec4(1.0, 1.0, 0.0, 1.0);

    vec4 color5 = mix(color1, color2, vUv.x*sin(uTime));
    vec4 color6 = mix(color3, color4, vUv.x*sin(uTime));

    vec4 finalColor = mix(color5, color6, vUv.y*sin(uTime)); 
    
    gl_FragColor = finalColor;
}
