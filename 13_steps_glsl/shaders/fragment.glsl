varying vec2 vUv;

void main() {
    vec4 c1 = vec4(1.,0.,0.,1.);
    vec4 c2 = vec4(0.,1.,0.,1.);

    float num = step(.5, vUv.y);

    vec4 color = mix(c1, c2, num);
    
    
	gl_FragColor = color;
}