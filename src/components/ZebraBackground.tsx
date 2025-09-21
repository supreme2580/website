import { useEffect, useRef } from "react";
import * as THREE from "three";

const fragmentShader = `
uniform float u_time;
uniform vec2 u_resolution;

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    uv = uv * 1.1 - 0.05;

    float t = u_time * 0.1;

    // Abstract, wavy, thin lines using sin and fract for contour effect
    float v = sin(uv.y * 8.0 + sin(uv.x * 4.0 + t) * 2.0 + t * 0.5)
            + cos(uv.x * 12.0 + uv.y * 2.0 + t * 1.2) * 0.7;

    // Make thin lines using fract (creates a contour effect)
    float lines = smoothstep(0.01, 0.03, abs(fract(v * 2.0) - 0.5));

    vec3 bg = vec3(0.10, 0.10, 0.10);
    vec3 line = vec3(0.01, 0.01, 0.01);
    vec3 color = mix(bg, line, lines);

    gl_FragColor = vec4(color, 1.0);
}
`;

const vertexShader = `
void main() {
    gl_Position = vec4(position, 1.0);
}
`;

export default function ZebraBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const width = mountRef.current?.offsetWidth || window.innerWidth;
    const height = mountRef.current?.offsetHeight || window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x0b0b0b);

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const scene = new THREE.Scene();

    const uniforms = {
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2(width, height) },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    let animationId: number;
    const animate = () => {
      uniforms.u_time.value = performance.now() / 1000;
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      const w = mountRef.current?.offsetWidth || window.innerWidth;
      const h = mountRef.current?.offsetHeight || window.innerHeight;
      renderer.setSize(w, h);
      uniforms.u_resolution.value.set(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    />
  );
}
