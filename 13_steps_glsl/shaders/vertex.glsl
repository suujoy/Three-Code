varying vec2 vUv;

uniform float uTime;

void main() {
    vUv = uv;

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // wave animation
    modelPosition.z += sin(modelPosition.x*3. + uTime) * 0.3;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
}