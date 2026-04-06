varying vec2 vUv;

void main() {
    float num = clamp((vUv.x*12), 0., 1. );
    vec4 color = vec4(num, num, num, 1.);
    
	gl_FragColor = color;
}