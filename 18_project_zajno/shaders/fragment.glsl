uniform sampler2D uTexture;
varying vec2 vUv;
uniform vec2 uMouse; // Mouse position passed from JavaScript

void main() {
    float blocks = 20.0;

    vec2 blockUv = floor(vUv*blocks)/blocks;
    float distance = length(blockUv - uMouse);
    float effect = smoothstep(0.4, 0.0, distance); // Effect based on distance to mouse
    vec2 distortion = vec2(0.03) * effect; // Distortion strength
    
    vec4 color = texture2D(uTexture, vUv+distortion);
    
gl_FragColor = color;
}
