"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ---------------------------------------------------------------------------
// 1. Shimmering Golden Stardust River & Pollen Drift
// ---------------------------------------------------------------------------
function GoldenStardustRiver({ count = 120 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!);

  const [positions, scales, speeds, offsets] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sca = new Float32Array(count);
    const spd = new Float32Array(count);
    const off = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Spread across ribbon width
      pos[i * 3 + 0] = (Math.random() - 0.5) * 26;
      // Height band matching ribbon & hanging charms
      pos[i * 3 + 1] = (Math.random() - 0.5) * 2.8;
      // Depth
      pos[i * 3 + 2] = (Math.random() - 0.5) * 3;

      sca[i] = Math.random() * 0.9 + 0.3;
      spd[i] = Math.random() * 0.5 + 0.2;
      off[i] = Math.random() * Math.PI * 2;
    }

    return [pos, sca, spd, off];
  }, [count]);

  // Generate radial glowing circular particle texture
  const stardustTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, "rgba(255, 252, 245, 1)");
    grad.addColorStop(0.3, "rgba(235, 222, 205, 0.7)");
    grad.addColorStop(0.7, "rgba(215, 198, 178, 0.2)");
    grad.addColorStop(1, "rgba(215, 198, 178, 0)");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);

    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const idx = i * 3;

      // Slow organic horizontal drift
      array[idx] -= delta * speeds[i] * 0.75;

      // Infinite wrap around
      if (array[idx] < -13) {
        array[idx] = 13;
      }

      // Vertical harmonic breathing float
      array[idx + 1] += Math.sin(time * 1.8 + offsets[i]) * 0.0035;
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
        size={0.18}
        map={stardustTexture || undefined}
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ---------------------------------------------------------------------------
// 2. Instanced 3D Tumbling Metallic Gold Leaf Flecks
// ---------------------------------------------------------------------------
function TumblingGoldFlecks({ count = 28 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Initialize randomized position, rotational speeds, and scales
  const flecks = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 24,
      y: (Math.random() - 0.5) * 2.4,
      z: (Math.random() - 0.5) * 2.5,
      rotX: Math.random() * Math.PI,
      rotY: Math.random() * Math.PI,
      rotZ: Math.random() * Math.PI,
      speedX: -(Math.random() * 0.4 + 0.15),
      spinX: (Math.random() - 0.5) * 1.2,
      spinY: (Math.random() - 0.5) * 1.4,
      spinZ: (Math.random() - 0.5) * 1.0,
      scale: Math.random() * 0.07 + 0.04,
    }));
  }, [count]);

  // Curved organic petal geometry
  const petalGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -0.6);
    shape.bezierCurveTo(0.45, -0.2, 0.55, 0.35, 0, 0.75);
    shape.bezierCurveTo(-0.55, 0.35, -0.45, -0.2, 0, -0.6);
    return new THREE.ShapeGeometry(shape, 8);
  }, []);

  useFrame((_state, delta) => {
    if (!meshRef.current) return;

    for (let i = 0; i < count; i++) {
      const f = flecks[i];

      // Drift horizontally
      f.x += f.speedX * delta;
      if (f.x < -13) {
        f.x = 13;
      }

      // Rotate in 3D space (tumbling in air)
      f.rotX += f.spinX * delta;
      f.rotY += f.spinY * delta;
      f.rotZ += f.spinZ * delta;

      dummy.position.set(f.x, f.y, f.z);
      dummy.rotation.set(f.rotX, f.rotY, f.rotZ);
      dummy.scale.set(f.scale, f.scale * 1.4, f.scale);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[petalGeometry, undefined, count]}
    >
      <meshStandardMaterial
        color="#EADDCB"
        roughness={0.35}
        metalness={0.7}
        side={THREE.DoubleSide}
        transparent
        opacity={0.75}
      />
    </instancedMesh>
  );
}

// ---------------------------------------------------------------------------
// Main Canvas Wrapper
// ---------------------------------------------------------------------------
export default function TickerParticlesCanvas() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 opacity-70">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[4, 5, 3]} intensity={1.4} color="#FFF8EF" />
        <pointLight position={[-3, -2, 2]} intensity={0.6} color="#E8DEC8" />
        <GoldenStardustRiver count={110} />
        <TumblingGoldFlecks count={24} />
      </Canvas>
    </div>
  );
}
