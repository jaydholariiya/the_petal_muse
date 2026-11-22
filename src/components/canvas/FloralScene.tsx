"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export type TimeOfDay = "dawn" | "morning" | "noon" | "sunset" | "night";

interface FloralSceneProps {
  timeOfDay?: TimeOfDay;
  mousePos?: { x: number; y: number };
}

// Luxury color profiles for the Living Atelier 4-Phase Scroll Journey
const COLOR_PROFILES: Record<
  TimeOfDay,
  { petal: THREE.Color; dust: THREE.Color; light: string; ambientIntensity: number }
> = {
  dawn: {
    // 1. Top Section (Hero & Bestsellers): Champagne Blush Pearl
    petal: new THREE.Color("#E8B0A2"), // Soft champagne blush rose
    dust: new THREE.Color("#E8A93B"), // Warm golden stardust
    light: "#FFF8F0",
    ambientIntensity: 1.9,
  },
  morning: {
    // 2. Middle Section 1 (Atelier Catalogs & Runway / #collections): Signature Mulberry Wine
    petal: new THREE.Color("#9E3564"), // Rich mulberry rose petals
    dust: new THREE.Color("#E5A2C0"), // Rose gold shimmer stardust
    light: "#FFEBF3",
    ambientIntensity: 2.0,
  },
  noon: {
    // 3. Middle Section 2 (Combos, Occasions & Reviews): Sunlit Honey Amber & 24K Gold
    petal: new THREE.Color("#D49438"), // Warm sunlit amber petals
    dust: new THREE.Color("#F7CF68"), // Sparkling 24K gold embers
    light: "#FFF8E6",
    ambientIntensity: 2.1,
  },
  sunset: {
    petal: new THREE.Color("#B84B72"),
    dust: new THREE.Color("#F4A58C"),
    light: "#FFF0EB",
    ambientIntensity: 1.85,
  },
  night: {
    // 4. Bottom Section (Services, Journal, Contact & Footer): Moonlight Orchid Night Garden
    petal: new THREE.Color("#D4B0CE"), // Translucent moonlight orchid
    dust: new THREE.Color("#F5C368"), // Twilight fireflies
    light: "#9A6088",
    ambientIntensity: 1.5,
  },
};

// Realistic organic curved botanical petal geometry
function createOrganicPetalGeometry() {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.bezierCurveTo(0.2, 0.25, 0.45, 0.6, 0.22, 1.0);
  shape.bezierCurveTo(0.08, 1.18, -0.08, 1.18, -0.22, 1.0);
  shape.bezierCurveTo(-0.45, 0.6, -0.2, 0.25, 0, 0);

  const geometry = new THREE.ShapeGeometry(shape, 16);

  // Sculpt curved bowl shape so petals catch 3D specular light organically
  const pos = geometry.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i);
    const x = pos.getX(i);
    const zOffset = Math.sin(y * 2.8) * 0.14 - (x * x) * 0.18;
    pos.setZ(i, zOffset);
  }
  geometry.computeVertexNormals();
  return geometry;
}

// 1. Interactive 3D Drifting & Swirling Petals
function InteractivePetals({
  timeOfDay = "dawn",
  mouseX = 0,
  mouseY = 0,
}: {
  timeOfDay: TimeOfDay;
  mouseX: number;
  mouseY: number;
}) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
  const count = isMobile ? 22 : 45;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const petalGeo = useMemo(() => createOrganicPetalGeometry(), []);

  // Smooth mouse coordinates in 3D world space
  const smoothMouse = useRef({ x: 0, y: 0 });

  // Initialize petals in visible 3D space with natural tumbling properties
  const petals = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * (isMobile ? 10 : 20),
      y: (Math.random() - 0.5) * 16,
      z: -2 + (Math.random() - 0.5) * 4, // Distributed from z: -4 to 0 (clearly visible)
      baseZ: -2 + (Math.random() - 0.5) * 4,
      rx: Math.random() * Math.PI * 2,
      ry: Math.random() * Math.PI * 2,
      rz: Math.random() * Math.PI * 2,
      vx: (Math.random() - 0.5) * 0.004,
      vy: -0.005 - Math.random() * 0.007, // Gentle downward drift
      vz: (Math.random() - 0.5) * 0.002,
      vrx: (Math.random() - 0.5) * 0.012,
      vry: (Math.random() - 0.5) * 0.014,
      vrz: (Math.random() - 0.5) * 0.008,
      scale: isMobile ? 0.45 + Math.random() * 0.35 : 0.65 + Math.random() * 0.55, // Full, luscious luxury scale
      swirlForceX: 0,
      swirlForceY: 0,
    }));
  }, [count, isMobile]);

  const currentColor = useRef(new THREE.Color(COLOR_PROFILES.dawn.petal));

  useFrame((state) => {
    if (!meshRef.current) return;

    // Smooth color blending across day cycles
    const targetColor = COLOR_PROFILES[timeOfDay]?.petal || COLOR_PROFILES.dawn.petal;
    currentColor.current.lerp(targetColor, 0.05);

    const time = state.clock.getElapsedTime();

    // Lerp mouse coordinates
    const targetWorldMouseX = mouseX * (isMobile ? 5 : 9);
    const targetWorldMouseY = mouseY * (isMobile ? 4 : 7);
    smoothMouse.current.x += (targetWorldMouseX - smoothMouse.current.x) * 0.08;
    smoothMouse.current.y += (targetWorldMouseY - smoothMouse.current.y) * 0.08;

    petals.forEach((p, i) => {
      // 1. Natural oscillation
      p.y += p.vy;
      p.x += p.vx + Math.sin(time * 0.8 + i) * 0.004;
      p.z += p.vz + Math.cos(time * 0.6 + i) * 0.002;

      // 2. Interactive Cursor Swirl & Repulsion
      const dx = p.x - smoothMouse.current.x;
      const dy = p.y - smoothMouse.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 3.5) {
        const force = (1 - dist / 3.5) * 0.035;
        p.swirlForceX += (dx / dist) * force;
        p.swirlForceY += (dy / dist) * force;
        // Spin faster when disturbed by cursor
        p.rx += p.vrx * 3.5;
        p.ry += p.vry * 3.5;
      }

      // Apply and decay swirl force
      p.x += p.swirlForceX;
      p.y += p.swirlForceY;
      p.swirlForceX *= 0.92;
      p.swirlForceY *= 0.92;

      // Natural rotation
      p.rx += p.vrx;
      p.ry += p.vry;
      p.rz += p.vrz;

      // Wrap around bounds
      if (p.y < -9) {
        p.y = 9;
        p.x = (Math.random() - 0.5) * (isMobile ? 10 : 20);
      }
      const xBound = isMobile ? 5.5 : 11;
      if (p.x < -xBound) p.x = xBound;
      if (p.x > xBound) p.x = -xBound;

      dummy.position.set(p.x, p.y, p.z);
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
        color="#FFFFFF"
        roughness={0.28}
        metalness={0.15}
        side={THREE.DoubleSide}
        transparent
        opacity={isMobile ? 0.65 : 0.82} // Clearly visible, rich living botanical petals
        depthWrite={false}
      />
    </instancedMesh>
  );
}

// 2. Golden Firefly Embers & Stardust (Twinkling ambient light points)
function GoldenStardust({ timeOfDay = "dawn" }: { timeOfDay: TimeOfDay }) {
  const pointsRef = useRef<THREE.Points>(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
  const count = isMobile ? 60 : 120;
  const currentDustColor = useRef(new THREE.Color(COLOR_PROFILES.dawn.dust));

  const [positions, initialY] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const iy = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * (isMobile ? 12 : 24);
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 2] = -1 - Math.random() * 5;
      iy[i] = pos[i * 3 + 1];
    }
    return [pos, iy];
  }, [count, isMobile]);

  useFrame((state) => {
    if (!pointsRef.current || !pointsRef.current.geometry) return;
    const pos = pointsRef.current.geometry.attributes?.position;
    if (!pos) return;

    const time = state.clock.getElapsedTime();

    // Smooth color blending for stardust embers
    const targetDust = COLOR_PROFILES[timeOfDay]?.dust || COLOR_PROFILES.dawn.dust;
    currentDustColor.current.lerp(targetDust, 0.05);
    const mat = pointsRef.current.material as THREE.PointsMaterial | undefined;
    if (mat && "color" in mat && mat.color && typeof mat.color.copy === "function") {
      mat.color.copy(currentDustColor.current);
    }

    for (let i = 0; i < count; i++) {
      let y = pos.getY(i) - 0.005;
      if (y < -9) y = 9;
      pos.setY(i, y);
      pos.setX(i, pos.getX(i) + Math.sin(time * 0.9 + i) * 0.003);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={isMobile ? 0.09 : 0.14}
        color="#F3D082"
        transparent
        opacity={timeOfDay === "night" ? 0.9 : 0.72}
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
      <ambientLight color={lightConfig.light} intensity={lightConfig.ambientIntensity} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.8}
        color={lightConfig.light}
      />
      <pointLight position={[-4, -2, 2]} color="#E8A93B" intensity={1.2} />
      <pointLight position={[4, 3, 1]} color="#F4B9A0" intensity={0.9} />

      {/* 1. Interactive 3D Drifting & Swirling Petals */}
      <InteractivePetals
        timeOfDay={timeOfDay}
        mouseX={mousePos.x}
        mouseY={mousePos.y}
      />

      {/* 2. Twinkling Golden Stardust Embers */}
      <GoldenStardust timeOfDay={timeOfDay} />
    </>
  );
}
