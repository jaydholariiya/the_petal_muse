"use client";

import React, { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export type TimeOfDay = "dawn" | "morning" | "noon" | "sunset" | "night";

interface FloralSceneProps {
  timeOfDay?: TimeOfDay;
  mousePos?: { x: number; y: number };
}

// Section color profiles: soft, porcelain, translucent pastel tones (never dark muddy brown)
const COLOR_PROFILES: Record<
  TimeOfDay,
  { petal: THREE.Color; dust: THREE.Color; light: string; intensity: number }
> = {
  dawn: {
    petal: new THREE.Color("#FFF3F0"), // Soft champagne blush
    dust: new THREE.Color("#E8A93B"),
    light: "#FFF8F0",
    intensity: 1.4,
  },
  morning: {
    petal: new THREE.Color("#F3F7F2"), // Soft sage & porcelain
    dust: new THREE.Color("#FBF4E6"),
    light: "#FFFFFF",
    intensity: 1.5,
  },
  noon: {
    petal: new THREE.Color("#FFFDF5"), // Warm sunlit ivory
    dust: new THREE.Color("#E8A93B"),
    light: "#FFFDF7",
    intensity: 1.6,
  },
  sunset: {
    petal: new THREE.Color("#FFF0F3"), // Delicate pale rose
    dust: new THREE.Color("#F4B9A0"),
    light: "#FFF0EB",
    intensity: 1.4,
  },
  night: {
    petal: new THREE.Color("#F7EEF5"), // Translucent moonlight orchid
    dust: new THREE.Color("#E8A93B"),
    light: "#6A385E",
    intensity: 1.0,
  },
};

// Refined, delicate organic petal geometry (dainty proportion)
function createPetalGeometry() {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.bezierCurveTo(0.12, 0.2, 0.25, 0.45, 0.12, 0.7);
  shape.bezierCurveTo(0.04, 0.85, -0.04, 0.85, -0.12, 0.7);
  shape.bezierCurveTo(-0.25, 0.45, -0.12, 0.2, 0, 0);

  const geometry = new THREE.ShapeGeometry(shape, 12);

  // Subtle curvature so petals catch specular highlights gracefully
  const pos = geometry.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i);
    const x = pos.getX(i);
    pos.setZ(i, Math.sin(y * 2.5) * 0.08 - Math.abs(x) * 0.05);
  }
  geometry.computeVertexNormals();
  return geometry;
}

// 1. Instanced Drifting Petals — Feather-light 3D petals with responsive tuning
function DriftingPetals({
  timeOfDay = "dawn",
  mouseX = 0,
  mouseY = 0,
}: {
  timeOfDay: TimeOfDay;
  mouseX: number;
  mouseY: number;
}) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
  const count = isMobile ? 12 : 30;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const petalGeo = useMemo(() => createPetalGeometry(), []);

  // Initialize petals strictly deep in background (z: -4 to -8), never right in front of camera
  const petals = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * (isMobile ? 8 : 16),
      y: (Math.random() - 0.5) * 14 - 1.5,
      z: -4 - Math.random() * 4, // Deep in background so it never covers buttons or text
      rx: Math.random() * Math.PI * 2,
      ry: Math.random() * Math.PI * 2,
      rz: Math.random() * Math.PI * 2,
      vx: (Math.random() - 0.5) * 0.003,
      vy: -0.004 - Math.random() * 0.005, // Slow ethereal drift
      vrx: (Math.random() - 0.5) * 0.006,
      vry: (Math.random() - 0.5) * 0.006,
      vrz: (Math.random() - 0.5) * 0.005,
      scale: isMobile ? 0.2 + Math.random() * 0.18 : 0.25 + Math.random() * 0.25, // Dainty, subtle, delicate scale
      oscSpeed: 1 + Math.random() * 1.2,
      oscOffset: Math.random() * Math.PI * 2,
    }));
  }, [count, isMobile]);

  const currentColor = useRef(new THREE.Color(COLOR_PROFILES.dawn.petal));

  useFrame((state) => {
    if (!meshRef.current) return;

    // Smooth color transition
    const targetColor = COLOR_PROFILES[timeOfDay]?.petal || COLOR_PROFILES.dawn.petal;
    currentColor.current.lerp(targetColor, 0.03);

    const time = state.clock.getElapsedTime();

    petals.forEach((p, i) => {
      p.y += p.vy;
      p.x += p.vx + Math.sin(time * p.oscSpeed + p.oscOffset) * 0.003;
      p.z += Math.cos(time * 0.6 + p.oscOffset) * 0.002;

      const mouseParallaxX = mouseX * 0.5;
      const mouseParallaxY = -mouseY * 0.5;

      p.rx += p.vrx;
      p.ry += p.vry;
      p.rz += p.vrz;

      if (p.y < -8) {
        p.y = 7;
        p.x = (Math.random() - 0.5) * (isMobile ? 8 : 16);
      }
      const xBound = isMobile ? 4.5 : 9;
      if (p.x < -xBound) p.x = xBound;
      if (p.x > xBound) p.x = -xBound;

      dummy.position.set(p.x + mouseParallaxX, p.y + mouseParallaxY, p.z);
      dummy.rotation.set(p.rx, p.ry, p.rz);
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();

      meshRef.current?.setMatrixAt(i, dummy.matrix);
      meshRef.current?.setColorAt(i, currentColor.current);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[petalGeo, undefined, count]}
      frustumCulled={false}
    >
      <meshStandardMaterial
        color="#FFF0ED"
        roughness={0.2}
        metalness={0.02}
        side={THREE.DoubleSide}
        transparent
        opacity={isMobile ? 0.22 : 0.28} // Ethereal and faint
        depthWrite={false}
      />
    </instancedMesh>
  );
}

// 2. Twinkling Golden Dust & Fireflies
function GoldDustParticles({ timeOfDay = "dawn" }: { timeOfDay: TimeOfDay }) {
  const pointsRef = useRef<THREE.Points>(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
  const count = isMobile ? 45 : 90;

  const [positions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * (isMobile ? 10 : 18);
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14 - 1;
      pos[i * 3 + 2] = -2 - Math.random() * 6;
    }
    return [pos];
  }, [count, isMobile]);

  const currentDustColor = useRef(new THREE.Color(COLOR_PROFILES.dawn.dust));

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();

    const targetColor = COLOR_PROFILES[timeOfDay]?.dust || COLOR_PROFILES.dawn.dust;
    currentDustColor.current.lerp(targetColor, 0.04);

    const pos = pointsRef.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      let y = pos.getY(i) - 0.003;
      if (y < -7) y = 7;
      pos.setY(i, y);
      pos.setX(i, pos.getX(i) + Math.sin(time * 0.8 + i) * 0.002);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#E8A93B"
        transparent
        opacity={timeOfDay === "night" ? 0.85 : 0.45}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function FloralScene({
  timeOfDay = "dawn",
  mousePos = { x: 0, y: 0 },
}: FloralSceneProps) {
  const lightConfig = COLOR_PROFILES[timeOfDay] || COLOR_PROFILES.dawn;

  return (
    <>
      <ambientLight color={lightConfig.light} intensity={lightConfig.intensity * 0.8} />
      <directionalLight
        position={[4, 6, 4]}
        intensity={lightConfig.intensity}
        color={lightConfig.light}
      />
      <pointLight position={[-3, -2, 1]} color="#F4B9A0" intensity={0.6} />

      <DriftingPetals
        timeOfDay={timeOfDay}
        mouseX={mousePos.x}
        mouseY={mousePos.y}
      />

      <GoldDustParticles timeOfDay={timeOfDay} />
    </>
  );
}
