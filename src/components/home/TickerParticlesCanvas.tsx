"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function FloatingPollenParticles({ count = 120 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!);

  // Generate random particles along a wide horizontal ribbon
  const [positions, scales, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sca = new Float32Array(count);
    const spd = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Wide horizontal spread: -12 to +12
      pos[i * 3 + 0] = (Math.random() - 0.5) * 24;
      // Vertical band: -1.2 to +1.2
      pos[i * 3 + 1] = (Math.random() - 0.5) * 2.4;
      // Slight depth: -2 to +2
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;

      sca[i] = Math.random() * 0.8 + 0.4;
      spd[i] = Math.random() * 0.4 + 0.2;
    }

    return [pos, sca, spd];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      // Drift slowly horizontally
      array[idx] -= delta * speeds[i] * 0.8;

      // Wrap around seamlessly
      if (array[idx] < -12) {
        array[idx] = 12;
      }

      // Gentle vertical floating sine oscillation (like floral dust in breeze)
      array[idx + 1] += Math.sin(time * 1.5 + array[idx]) * 0.003;
    }

    posAttr.needsUpdate = true;
  });

  // Create a soft radial particle texture
  const particleTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, "rgba(255, 235, 175, 1)");
    grad.addColorStop(0.3, "rgba(232, 169, 59, 0.8)");
    grad.addColorStop(0.7, "rgba(232, 169, 59, 0.2)");
    grad.addColorStop(1, "rgba(232, 169, 59, 0)");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.16}
        map={particleTexture || undefined}
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function TickerParticlesCanvas() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 opacity-70">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
        style={{ width: "100%", height: "100%" }}
      >
        <FloatingPollenParticles count={100} />
      </Canvas>
    </div>
  );
}

