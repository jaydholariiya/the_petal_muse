"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ---------------------------------------------------------------------------
// Runway Stardust & Golden Fireflies (Auto-Magic Atmospheric Depth)
// ---------------------------------------------------------------------------
function RunwayFireflies({ count = 85 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!);

  const [positions, speeds, offsets] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    const off = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Spread across the entire runway section width
      pos[i * 3 + 0] = (Math.random() - 0.5) * 22;
      // Height band covering cards
      pos[i * 3 + 1] = (Math.random() - 0.5) * 9;
      // Depth behind and around the cards
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5 - 1;

      spd[i] = Math.random() * 0.35 + 0.15;
      off[i] = Math.random() * Math.PI * 2;
    }

    return [pos, spd, off];
  }, [count]);

  // Soft glowing champagne stardust texture
  const stardustTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, "rgba(255, 252, 245, 1)");
    grad.addColorStop(0.3, "rgba(235, 222, 205, 0.75)");
    grad.addColorStop(0.7, "rgba(215, 198, 178, 0.18)");
    grad.addColorStop(1, "rgba(215, 198, 178, 0)");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);

    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current || !pointsRef.current.geometry) return;
    const posAttr = pointsRef.current.geometry.attributes?.position as THREE.BufferAttribute | undefined;
    if (!posAttr || !posAttr.array) return;
    const array = posAttr.array as Float32Array;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const idx = i * 3;

      // Gentle horizontal drift
      array[idx] -= delta * speeds[i] * 0.4;
      if (array[idx] < -11) {
        array[idx] = 11;
      }

      // Harmonic vertical undulating wave (breathing stardust)
      array[idx + 1] += Math.sin(time * 1.4 + offsets[i]) * 0.005;
    }

    posAttr.needsUpdate = true;
  });

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
        size={0.22}
        map={stardustTexture || undefined}
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ---------------------------------------------------------------------------
// 2. Tumbling 3D Botanical Silk Petals (Ethereal Movement Behind Cards)
// ---------------------------------------------------------------------------
function RunwayPetalFlecks({ count = 24 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const flecks = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 22,
      y: (Math.random() - 0.5) * 8,
      z: (Math.random() - 0.5) * 3 - 0.5,
      rotX: Math.random() * Math.PI,
      rotY: Math.random() * Math.PI,
      rotZ: Math.random() * Math.PI,
      speedX: -(Math.random() * 0.28 + 0.12),
      speedY: -(Math.random() * 0.14 + 0.05),
      spinX: (Math.random() - 0.5) * 0.7,
      spinY: (Math.random() - 0.5) * 0.8,
      spinZ: (Math.random() - 0.5) * 0.6,
      scale: Math.random() * 0.08 + 0.05,
    }));
  }, [count]);

  const petalGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -0.6);
    shape.bezierCurveTo(0.45, -0.2, 0.55, 0.35, 0, 0.75);
    shape.bezierCurveTo(-0.55, 0.35, -0.45, -0.2, 0, -0.6);
    return new THREE.ShapeGeometry(shape, 8);
  }, []);

  useFrame((_state, delta) => {
    if (!meshRef.current || !meshRef.current.instanceMatrix) return;
    for (let i = 0; i < count; i++) {
      const f = flecks[i];
      f.x += f.speedX * delta;
      f.y += f.speedY * delta;
      if (f.x < -12) f.x = 12;
      if (f.y < -4.5) f.y = 4.5;

      f.rotX += f.spinX * delta;
      f.rotY += f.spinY * delta;
      f.rotZ += f.spinZ * delta;

      dummy.position.set(f.x, f.y, f.z);
      dummy.rotation.set(f.rotX, f.rotY, f.rotZ);
      dummy.scale.set(f.scale, f.scale * 1.35, f.scale);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[petalGeometry, undefined, count]}>
      <meshStandardMaterial
        color="#8B3A62" // Mulberry wine petal tone
        roughness={0.45}
        metalness={0.15}
        side={THREE.DoubleSide}
        transparent
        opacity={0.32}
      />
    </instancedMesh>
  );
}

// ---------------------------------------------------------------------------
// Main Canvas Component (SSR-safe, low-power GPU)
// ---------------------------------------------------------------------------
export default function RunwayParticlesCanvas() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-70">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={1.5} color="#FFF8F0" />
        <directionalLight position={[4, 6, 4]} intensity={1.2} color="#FFF5EB" />
        <RunwayFireflies count={80} />
        <RunwayPetalFlecks count={26} />
      </Canvas>
    </div>
  );
}
