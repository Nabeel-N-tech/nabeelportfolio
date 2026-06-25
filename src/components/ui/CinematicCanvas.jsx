"use client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { getQRModules } from "./QRFormation";

export default function CinematicCanvas({ activePhase, onPhaseTransition }) {
  const containerRef = useRef(null);
  const activePhaseRef = useRef(activePhase);

  useEffect(() => {
    activePhaseRef.current = activePhase;
  }, [activePhase]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // prefers-reduced-motion check
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      onPhaseTransition(4);
      return;
    }

    const isMobile = window.innerWidth < 768;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 24;
    camera.position.y = 0;

    // Disable antialias for performance, cap pixel ratio on mobile
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Group to apply interactive parallax
    const sceneGroup = new THREE.Group();
    scene.add(sceneGroup);

    // 2. Setup Particles & Geometry Attributes (Mobile gets 800, Desktop 1400)
    const particleCount = isMobile ? 800 : 1400;
    const geometry = new THREE.BufferGeometry();

    // Particle texture (soft circular glow dot)
    const createCircleTexture = () => {
      const c = document.createElement("canvas");
      c.width = 32;
      c.height = 32;
      const ctx = c.getContext("2d");
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(0.3, "rgba(255, 255, 255, 0.8)");
      grad.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 32, 32);
      return new THREE.CanvasTexture(c);
    };
    const texture = createCircleTexture();

    // Precalculate QR Target
    const qrTarget = [];
    const qrModules = getQRModules(280); // Width of QR code in pixels
    const qrScale = 0.038;
    for (let i = 0; i < particleCount; i++) {
      const mod = qrModules[i % qrModules.length];
      const ox = (Math.random() - 0.5) * mod.size * 0.85;
      const oy = (Math.random() - 0.5) * mod.size * 0.85;
      const oz = (Math.random() - 0.5) * mod.size * 0.5;

      qrTarget.push({
        x: (mod.x + ox) * qrScale,
        y: -(mod.y + oy) * qrScale,
        z: oz * qrScale
      });
    }

    // Precalculate Typography Targets
    const sampleText = (text, size) => {
      const offscreen = document.createElement("canvas");
      offscreen.width = 1000;
      offscreen.height = 300;
      const oCtx = offscreen.getContext("2d");
      if (!oCtx) return [];

      oCtx.fillStyle = "white";
      oCtx.textAlign = "center";
      oCtx.textBaseline = "middle";
      oCtx.font = `900 ${size}px Syne, sans-serif`;
      oCtx.fillText(text, 500, 150);

      const imgData = oCtx.getImageData(0, 0, 1000, 300);
      const data = imgData.data;
      const pts = [];

      for (let y = 0; y < 300; y += 4) {
        for (let x = 0; x < 1000; x += 4) {
          const idx = (y * 1000 + x) * 4;
          if (data[idx] > 200) {
            pts.push({
              x: (x - 500) * 0.024,
              y: (150 - y) * 0.024,
              z: (Math.random() - 0.5) * 0.4
            });
          }
        }
      }
      return pts;
    };

    // Precalculate Initials "NN"
    const initialsTarget = [];
    const initialsPts = sampleText("NN", 160);
    for (let i = 0; i < particleCount; i++) {
      if (initialsPts.length > 0) {
        const pt = initialsPts[i % initialsPts.length];
        const offset = 0.04;
        initialsTarget.push({
          x: pt.x + (Math.random() - 0.5) * offset,
          y: pt.y + (Math.random() - 0.5) * offset,
          z: pt.z
        });
      } else {
        initialsTarget.push({
          x: (Math.random() - 0.5) * 6,
          y: (Math.random() - 0.5) * 4,
          z: (Math.random() - 0.5) * 0.5
        });
      }
    }

    // Precalculate Full Name "NABEEL N"
    const nameTarget = [];
    const namePts = sampleText("NABEEL N", 125);
    for (let i = 0; i < particleCount; i++) {
      if (namePts.length > 0) {
        const pt = namePts[i % namePts.length];
        const offset = 0.04;
        nameTarget.push({
          x: pt.x + (Math.random() - 0.5) * offset,
          y: pt.y + (Math.random() - 0.5) * offset,
          z: pt.z
        });
      } else {
        nameTarget.push({
          x: (Math.random() - 0.5) * 12,
          y: (Math.random() - 0.5) * 4,
          z: (Math.random() - 0.5) * 0.5
        });
      }
    }

    // Populate buffers
    const qrArr = new Float32Array(particleCount * 3);
    const initialsArr = new Float32Array(particleCount * 3);
    const nameArr = new Float32Array(particleCount * 3);
    const randomSpeedArr = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      qrArr[i * 3] = qrTarget[i].x;
      qrArr[i * 3 + 1] = qrTarget[i].y;
      qrArr[i * 3 + 2] = qrTarget[i].z;

      initialsArr[i * 3] = initialsTarget[i].x;
      initialsArr[i * 3 + 1] = initialsTarget[i].y;
      initialsArr[i * 3 + 2] = initialsTarget[i].z;

      nameArr[i * 3] = nameTarget[i].x;
      nameArr[i * 3 + 1] = nameTarget[i].y;
      nameArr[i * 3 + 2] = nameTarget[i].z;

      randomSpeedArr[i] = Math.random() * 0.8 + 0.2; // individual floating speeds
    }

    // Set initial position attribute to origin (Scene 1)
    const startArr = new Float32Array(particleCount * 3); // starts at (0,0,0)
    geometry.setAttribute("position", new THREE.BufferAttribute(startArr, 3));
    geometry.setAttribute("aQR", new THREE.BufferAttribute(qrArr, 3));
    geometry.setAttribute("aInitials", new THREE.BufferAttribute(initialsArr, 3));
    geometry.setAttribute("aText", new THREE.BufferAttribute(nameArr, 3));
    geometry.setAttribute("aRandomSpeed", new THREE.BufferAttribute(randomSpeedArr, 1));

    // 3. Custom Shader Material Setup (100% GPU-Driven Animation)
    const uniforms = {
      uTime: { value: 0.0 },
      uProgressScanner: { value: 0.0 },
      uProgressQR: { value: 0.0 },
      uProgressInitials: { value: 0.0 },
      uProgressName: { value: 0.0 },
      uProgressDrift: { value: 0.0 },
      uScanningProgress: { value: -1.2 }, // Sweeping scanner line from -1.2 to 1.2
      uTexture: { value: texture },
      uMouse: { value: new THREE.Vector2(0, 0) },
    };

    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: uniforms,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexShader: `
        uniform float uTime;
        uniform float uProgressScanner;
        uniform float uProgressQR;
        uniform float uProgressInitials;
        uniform float uProgressName;
        uniform float uProgressDrift;
        uniform float uScanningProgress;
        uniform vec2 uMouse;

        attribute vec3 aQR;
        attribute vec3 aInitials;
        attribute vec3 aText;
        attribute float aRandomSpeed;

        varying vec3 vColor;
        varying float vAlpha;

        // Anti-gravity upward drift with screen wrapping (buoyant math simulation)
        vec3 drift(vec3 pos, float time, float speed) {
            float lift = time * 1.5 * speed;
            float rawY = pos.y + lift;
            
            // Wrap Y coordinate between -12.0 and 12.0 in camera view space
            float minY = -12.0;
            float maxY = 12.0;
            float range = maxY - minY;
            pos.y = minY + mod(rawY - minY, range);
            
            pos.x += sin(time * 0.6 + pos.y * 0.5) * 0.6;
            pos.z += cos(time * 0.4 + pos.x * 0.3) * 0.3;
            return pos;
        }

        void main() {
            // Scene 1 & 2: Single particle expands to a horizontal scanner line
            float normIdx = aRandomSpeed;
            vec3 laserPos = vec3((normIdx - 0.5) * 16.0, 0.0, 0.0);
            
            // Interpolate from single point (0,0,0) to scanner line
            vec3 pos = mix(vec3(0.0), laserPos, uProgressScanner);

            // Scene 3: Scanner sweeps and reveals the QR pattern
            if (uProgressQR > 0.0) {
                pos = mix(pos, aQR, uProgressQR);
            }

            // Scanning highlights
            float scannerY = uScanningProgress * 6.0;
            float distanceToScanner = abs(aQR.y - scannerY);
            vec3 particleColor = vec3(1.0); // Base white
            float scanGlow = 0.0;

            if (uProgressQR > 0.05 && uProgressInitials < 0.05) {
                if (distanceToScanner < 0.5) {
                    scanGlow = (1.0 - distanceToScanner / 0.5) * 2.0;
                    particleColor = mix(vec3(1.0), vec3(0.1, 0.98, 0.45), scanGlow / 2.0); // Emerald green laser glow
                } else if (aQR.y < scannerY) {
                    particleColor = vec3(0.8, 1.0, 0.9); // scanned elements show subtle green hue
                }
            }

            // Scene 4: QR Code transforms into initials "NN" + 3D Y-axis flip
            if (uProgressInitials > 0.0) {
                float angle = uProgressInitials * 3.14159265;
                float cosA = cos(angle);
                float sinA = sin(angle);

                vec3 target = mix(aQR, aInitials, uProgressInitials);

                // Rotate around Y-axis
                float rx = target.x * cosA - target.z * sinA;
                float rz = target.x * sinA + target.z * cosA;

                pos = vec3(rx, target.y, rz);
                particleColor = mix(particleColor, vec3(1.0), uProgressInitials);
            }

            // Scene 5: Initials "NN" transform into full name "NABEEL N"
            if (uProgressName > 0.0) {
                float angleVal = 3.14159265; // keep it rotated from previous flip
                float cosA = cos(angleVal);
                float sinA = sin(angleVal);

                vec3 initialFlipped = aInitials;
                initialFlipped.x = aInitials.x * cosA - aInitials.z * sinA;
                initialFlipped.z = aInitials.x * sinA + aInitials.z * cosA;

                vec3 nameFlipped = aText;
                nameFlipped.x = aText.x * cosA - aText.z * sinA;
                nameFlipped.z = aText.x * sinA + aText.z * cosA;

                pos = mix(initialFlipped, nameFlipped, uProgressName);
            }

            // Scene 6 & 7: Name dissolves into anti-gravity particles drifting upwards
            float alpha = 1.0;
            if (uProgressDrift > 0.0) {
                // Apply rotation transform to base text coordinates so they match the flipped name
                float angleVal = 3.14159265;
                float cosA = cos(angleVal);
                float sinA = sin(angleVal);

                vec3 textFlipped = aText;
                textFlipped.x = aText.x * cosA - aText.z * sinA;
                textFlipped.z = aText.x * sinA + aText.z * cosA;

                // Calculate drifting path (floating upwards)
                vec3 driftedPos = drift(textFlipped, uTime, aRandomSpeed);
                pos = mix(pos, driftedPos, uProgressDrift);

                // GPU Mouse proximity repulsion (forces particles away from cursor)
                vec3 mousePos = vec3(uMouse.x * 12.0, uMouse.y * 7.0, 0.0);
                float dist = distance(pos.xy, mousePos.xy);
                if (dist < 3.5) {
                    float force = (1.0 - dist / 3.5) * 0.85 * uProgressDrift;
                    vec2 dir = normalize(pos.xy - mousePos.xy + vec2(0.001));
                    pos.xy += dir * force;
                }

                // Fade out particles as they float up, but maintain a beautiful minimum twinkling background opacity
                float driftHeight = driftedPos.y - textFlipped.y;
                float fadeOut = clamp(1.0 - (driftHeight * 0.05), 0.0, 1.0);
                alpha = mix(0.24 + sin(uTime * 0.6 + aRandomSpeed * 6.28) * 0.1, 1.0, fadeOut);
            }

            vColor = particleColor;
            vAlpha = alpha;

            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_Position = projectionMatrix * mvPosition;

            // Size calculation with distance attenuation & scanner highlight scale boost
            float sizeMultiplier = 1.0 + scanGlow * 1.5;
            if (uProgressDrift > 0.0) {
                sizeMultiplier *= (1.0 - uProgressDrift * 0.4); // dissolve size shrinkage
            }
            gl_PointSize = (15.0 / -mvPosition.z) * sizeMultiplier * (0.8 + aRandomSpeed * 0.4);
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
            vec4 texColor = texture2D(uTexture, gl_PointCoord);
            if (texColor.a < 0.01 || vAlpha < 0.01) discard;

            gl_FragColor = vec4(vColor, texColor.a * vAlpha);
        }
      `
    });

    const pointsMesh = new THREE.Points(geometry, shaderMaterial);
    sceneGroup.add(pointsMesh);

    // Mouse movement parallax setup
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e) => {
      mouse.targetX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      mouse.targetY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // 4. GSAP Entry Animation Timeline (Compressed to 1.3 Seconds Total)
    const tl = gsap.timeline();

    // Scene 1 & 2: Single particle appears and expands into laser line (0.3s)
    tl.to(uniforms.uProgressScanner, {
      value: 1.0,
      duration: 0.3,
      ease: "power2.out",
      onStart: () => onPhaseTransition(1)
    });

    // Scene 3: Scanner sweeps and reveals QR Code (0.25s)
    tl.to(uniforms.uProgressQR, {
      value: 1.0,
      duration: 0.25,
      ease: "power2.out"
    }, "+=0.05");

    tl.to(uniforms.uScanningProgress, {
      value: 1.2,
      duration: 0.3,
      ease: "sine.inOut"
    }, "-=0.25");

    // Camera zooms close during scan
    tl.to(camera.position, {
      z: 12.0,
      y: 0.5,
      duration: 0.3,
      ease: "power2.inOut"
    }, "-=0.3");

    // Scene 4: QR morphs into initials "NN" + Y-axis flip (0.25s)
    tl.to(uniforms.uProgressInitials, {
      value: 1.0,
      duration: 0.25,
      ease: "power3.inOut",
      onStart: () => onPhaseTransition(2)
    });

    tl.to(camera.position, {
      z: 13.5,
      y: 0.2,
      duration: 0.25,
      ease: "power3.inOut"
    }, "-=0.25");

    // Scene 5: Initials morph to full name "NABEEL N" (0.25s)
    tl.to(uniforms.uProgressName, {
      value: 1.0,
      duration: 0.25,
      ease: "power3.inOut"
    });

    tl.to(camera.position, {
      z: 14.5,
      y: 0.0,
      duration: 0.25,
      ease: "power3.inOut"
    }, "-=0.25");

    // Scene 6 & 7: Name dissolves into anti-gravity particles (0.25s)
    tl.to(uniforms.uProgressDrift, {
      value: 1.0,
      duration: 0.25,
      ease: "power2.inOut",
      onStart: () => onPhaseTransition(3) // trigger portfolio text fade-in
    });

    tl.to(camera.position, {
      z: 16.0,
      duration: 0.25,
      ease: "sine.inOut"
    }, "-=0.25");

    // Seamlessly finish preloader
    tl.to({}, {
      duration: 0.01,
      onStart: () => onPhaseTransition(4) // unlock scroll and mark fully loaded
    });

    // 5. Render Tick Loop
    let clock = new THREE.Clock();
    let animId;

    const tick = () => {
      // If the preloader has finished and phase is 4, stop loop to save GPU
      if (activePhaseRef.current === 4) {
        renderer.render(scene, camera);
        return;
      }

      const elapsedTime = clock.getElapsedTime();

      // Feed time uniform to shader for upward drifting math
      uniforms.uTime.value = elapsedTime;

      // Mouse interactive parallax lerping
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      sceneGroup.rotation.y = mouse.x * 0.18;
      sceneGroup.rotation.x = -mouse.y * 0.12;

      // Lerp mouse uniform for GPU interaction
      uniforms.uMouse.value.x += (mouse.targetX - uniforms.uMouse.value.x) * 0.05;
      uniforms.uMouse.value.y += (-mouse.targetY - uniforms.uMouse.value.y) * 0.05;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(tick);
    };

    tick();

    // Clean up on unmount
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      tl.kill();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      shaderMaterial.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
