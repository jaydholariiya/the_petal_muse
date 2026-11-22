"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Sparkles, RotateCw } from "lucide-react";

export default function FramelessBotanicalSculpture3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let animId: number;
    let width = container.clientWidth || 360;
    let height = container.clientHeight || 460;

    // 1. Scene & Camera (Transparent, Frameless)
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 7.5);

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 3. Luxury Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffecd2, 3.0);
    keyLight.position.set(5, 7, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xf4b9a0, 1.8);
    fillLight.position.set(-5, -3, 3);
    scene.add(fillLight);

    const goldPoint = new THREE.PointLight(0xf59e0b, 4.0, 10);
    goldPoint.position.set(0, 0, 1.5);
    scene.add(goldPoint);

    // 4. Floating Kinetic Sculpture Group
    const sculptureGroup = new THREE.Group();
    scene.add(sculptureGroup);

    // Materials
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.92,
      roughness: 0.18,
    });

    const champagneMaterial = new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      metalness: 0.88,
      roughness: 0.22,
    });

    const velvetMaterial = new THREE.MeshStandardMaterial({
      color: 0x4a1f3d,
      metalness: 0.45,
      roughness: 0.35,
      side: THREE.DoubleSide,
    });

    // Ring 1: Outer Celestial Astrolabe Ring
    const ring1Geom = new THREE.TorusGeometry(2.1, 0.032, 20, 120);
    const ring1 = new THREE.Mesh(ring1Geom, goldMaterial);
    sculptureGroup.add(ring1);

    // Ring 2: Tilted Middle Gimbal Ring
    const ring2Geom = new THREE.TorusGeometry(1.7, 0.028, 20, 100);
    const ring2 = new THREE.Mesh(ring2Geom, champagneMaterial);
    ring2.rotation.x = Math.PI / 3;
    sculptureGroup.add(ring2);

    // Ring 3: Inner Fast Gyroscope Ring
    const ring3Geom = new THREE.TorusGeometry(1.3, 0.024, 20, 90);
    const ring3 = new THREE.Mesh(ring3Geom, goldMaterial);
    ring3.rotation.y = Math.PI / 4;
    sculptureGroup.add(ring3);

    // Central Multi-Petal Living Rose Core
    const coreGroup = new THREE.Group();
    sculptureGroup.add(coreGroup);

    // Procedural Layered Petals around the core
    const petalShape = new THREE.Shape();
    petalShape.moveTo(0, 0);
    petalShape.bezierCurveTo(0.18, 0.25, 0.35, 0.55, 0.15, 0.85);
    petalShape.bezierCurveTo(0.05, 1.0, -0.05, 1.0, -0.15, 0.85);
    petalShape.bezierCurveTo(-0.35, 0.55, -0.18, 0.25, 0, 0);

    const petalGeom = new THREE.ShapeGeometry(petalShape, 12);

    // Curve the petals in Z
    const pos = petalGeom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const x = pos.getX(i);
      pos.setZ(i, -0.25 * Math.sin(y * Math.PI) * (1 - Math.abs(x)));
    }
    petalGeom.computeVertexNormals();

    const layerConfigs = [
      { count: 5, radius: 0.25, scale: 0.7, tilt: 0.4 },
      { count: 7, radius: 0.48, scale: 0.9, tilt: 0.7 },
      { count: 9, radius: 0.75, scale: 1.1, tilt: 1.0 },
    ];

    layerConfigs.forEach((layer, layerIdx) => {
      const step = (Math.PI * 2) / layer.count;
      for (let i = 0; i < layer.count; i++) {
        const angle = i * step + (layerIdx * 0.4);
        const petalMesh = new THREE.Mesh(
          petalGeom,
          layerIdx % 2 === 0 ? velvetMaterial : goldMaterial
        );
        petalMesh.scale.setScalar(layer.scale);
        petalMesh.position.set(
          Math.cos(angle) * layer.radius,
          Math.sin(angle) * layer.radius,
          -layerIdx * 0.12
        );
        petalMesh.rotation.z = angle - Math.PI / 2;
        petalMesh.rotation.x = layer.tilt;
        coreGroup.add(petalMesh);
      }
    });

    // Central Golden Seed / Monogram Stamen
    const seedGeom = new THREE.IcosahedronGeometry(0.28, 2);
    const seedMesh = new THREE.Mesh(seedGeom, champagneMaterial);
    seedMesh.position.z = 0.1;
    coreGroup.add(seedMesh);

    // 5. Floating 3D Stardust Vortex
    const particleCount = 140;
    const particleGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const r = 0.8 + Math.random() * 2.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      particleSpeeds[i] = 0.005 + Math.random() * 0.015;
    }

    particleGeom.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Canvas circular glow texture
    const glowCanvas = document.createElement("canvas");
    glowCanvas.width = 64;
    glowCanvas.height = 64;
    const ctx = glowCanvas.getContext("2d");
    if (ctx) {
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(0.3, "rgba(251, 191, 36, 0.9)");
      grad.addColorStop(0.8, "rgba(232, 169, 59, 0.2)");
      grad.addColorStop(1, "rgba(232, 169, 59, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
    }
    const particleTex = new THREE.CanvasTexture(glowCanvas);

    const particleMat = new THREE.PointsMaterial({
      size: 0.16,
      map: particleTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeom, particleMat);
    sculptureGroup.add(particles);

    // 6. Ground Shadow on the floor (Levitation indicator)
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext("2d");
    if (sCtx) {
      const sGrad = sCtx.createRadialGradient(64, 64, 0, 64, 64, 60);
      sGrad.addColorStop(0, "rgba(40, 19, 38, 0.25)");
      sGrad.addColorStop(0.5, "rgba(40, 19, 38, 0.08)");
      sGrad.addColorStop(1, "rgba(40, 19, 38, 0)");
      sCtx.fillStyle = sGrad;
      sCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeom = new THREE.PlaneGeometry(3.6, 1.4);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeom, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2.3;
    shadowMesh.position.set(0, -2.4, -0.5);
    scene.add(shadowMesh);

    // 7. Interactive Drag & Spin Physics
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let velX = 0.005;
    let velY = 0.003;
    let pulseScale = 1.0;
    let targetPulse = 1.0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      setIsInteracting(true);
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
      velX = 0;
      velY = 0;
      targetPulse = 1.15; // Click bloom pulse
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      velX = deltaX * 0.006;
      velY = deltaY * 0.006;

      sculptureGroup.rotation.y += velX;
      sculptureGroup.rotation.x += velY;
    };

    const onPointerUp = () => {
      isDragging = false;
      targetPulse = 1.0;
      setTimeout(() => setIsInteracting(false), 2000);
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 360;
      height = container.clientHeight || 460;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // 8. 60 FPS Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gentle Levitation Breathing
      const levitate = Math.sin(elapsedTime * 1.6) * 0.14;
      sculptureGroup.position.y = levitate;
      shadowMesh.scale.setScalar(1 - levitate * 0.8);
      shadowMat.opacity = 0.28 - levitate * 0.5;

      // Pulse physics
      pulseScale += (targetPulse - pulseScale) * 0.08;
      coreGroup.scale.setScalar(pulseScale);

      // Gyroscopic Counter-Rotations
      ring1.rotation.z += 0.008;
      ring2.rotation.y += 0.012;
      ring3.rotation.x -= 0.015;
      coreGroup.rotation.z += 0.006;

      // Inertia & Continuous gentle spin
      if (!isDragging) {
        velX *= 0.95;
        velY *= 0.95;
        sculptureGroup.rotation.y += velX + 0.004;
        sculptureGroup.rotation.x += velY + Math.sin(elapsedTime * 0.8) * 0.001;
      }

      // Particle helix swirling
      particles.rotation.y = elapsedTime * 0.08;
      particles.rotation.z = Math.sin(elapsedTime * 0.5) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      renderer.dispose();
      ring1Geom.dispose();
      ring2Geom.dispose();
      ring3Geom.dispose();
      petalGeom.dispose();
      seedGeom.dispose();
      particleGeom.dispose();
      shadowGeom.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="relative w-full aspect-[3/4] max-w-[340px] sm:max-w-[420px] mx-auto flex flex-col items-center justify-center select-none"
    >
      {/* Frameless: Completely Transparent Ambient Glow in Open Space */}
      <div className="absolute inset-4 bg-gradient-to-tr from-marigold-glow/20 via-mulberry-wine/15 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* 3D WebGL Canvas (Frameless, Zero Border, Zero Card) */}
      <div className="relative z-10 w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center">
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Floating Minimalist Hint */}
        <div
          className={`absolute bottom-2 px-3 py-1 rounded-full bg-mulberry-wine/10 border border-mulberry-wine/15 text-[8.5px] sm:text-[9.5px] font-sans uppercase tracking-[0.22em] text-mulberry-wine transition-opacity duration-500 pointer-events-none flex items-center gap-1.5 ${
            isInteracting ? "opacity-0" : "opacity-80"
          }`}
        >
          <RotateCw className="w-2.5 h-2.5 text-marigold-glow animate-spin-slow" />
          <span>Interactive 3D Living Flora • Drag to Spin</span>
        </div>
      </div>
    </div>
  );
}
