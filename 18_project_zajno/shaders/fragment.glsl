uniform sampler2D uTexture;
varying vec2 vUv;
uniform vec2 uMouse;
uniform float uHover;

void main() {
    float blocks = 20.0;

    vec2 blockUv = floor(vUv * blocks) / blocks;
    float distance = length(blockUv - uMouse);

    float effect = smoothstep(0.4, 0.0, distance);
    effect *= uHover; // <-- important

    vec2 distortion = vec2(0.03) * effect;

    vec4 color = texture2D(uTexture, vUv + distortion);

    gl_FragColor = color;
}