"use client";

import { Environment, Lightformer, PerformanceMonitor, RoundedBox } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { cursorGeometry, gearGeometry, nutGeometry, wrenchHeadGeometry } from "./geometries";
import { heroState } from "./heroState";
import type { QualityTier } from "./quality";

type V3 = [number, number, number];
type MatKind = "clay" | "gloss" | "glass" | "metal";
type ShapeKind = "gear" | "wrench" | "cube" | "capsule" | "torus" | "nut" | "cursor" | "sphere";

type Item = {
  kind: ShapeKind;
  mat: MatKind;
  color: string;
  scale: number;
  /** Resting cluster position */
  cluster: V3;
  /** Exploded position mid-scroll (some fly past the camera) */
  scatter: V3;
  spin: V3;
  /** Included on low-power devices */
  lite?: boolean;
};

const ACCENT = "#d4ff3a";
const VIOLET = "#7c5cff";
const ORANGE = "#ff8a3d";
const BONE = "#efece4";

const ITEMS: Item[] = [
  { kind: "gear", mat: "gloss", color: ACCENT, scale: 1.05, cluster: [0.1, 0.35, 0], scatter: [0.6, 0.9, -3.5], spin: [0.1, 0.25, 0.35], lite: true },
  { kind: "wrench", mat: "metal", color: "#c9c9d6", scale: 1, cluster: [-1.35, -0.85, 0.7], scatter: [-4.6, -2.6, 2.4], spin: [0.2, 0.35, 0.15], lite: true },
  { kind: "cube", mat: "clay", color: VIOLET, scale: 0.9, cluster: [1.45, -0.8, 0.45], scatter: [4.4, -2.2, 3], spin: [0.3, 0.2, 0.1], lite: true },
  { kind: "capsule", mat: "gloss", color: ORANGE, scale: 0.95, cluster: [-1.05, 1.3, -0.4], scatter: [-3.9, 3.1, 1], spin: [0.15, 0.1, 0.4], lite: true },
  { kind: "torus", mat: "glass", color: "#ffffff", scale: 1, cluster: [1.35, 1.35, -0.6], scatter: [4.1, 3.3, -1.4], spin: [0.25, 0.3, 0.05] },
  { kind: "nut", mat: "clay", color: "#ff4d6d", scale: 0.9, cluster: [0.15, -1.65, -0.3], scatter: [0.4, -3.9, 2], spin: [0.35, 0.15, 0.2] },
  { kind: "cursor", mat: "gloss", color: BONE, scale: 0.75, cluster: [-0.25, -0.3, 1.5], scatter: [-1.1, 0.4, 6], spin: [0.1, 0.4, 0.08], lite: true },
  { kind: "sphere", mat: "gloss", color: VIOLET, scale: 0.55, cluster: [2.25, 0.15, -1.3], scatter: [5.2, 0.6, -3.2], spin: [0.1, 0.1, 0.1] },
];

const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

function Material({ kind, color, tier }: { kind: MatKind; color: string; tier: QualityTier }) {
  if (tier !== "high") {
    return (
      <meshStandardMaterial
        color={color}
        roughness={kind === "metal" ? 0.28 : kind === "clay" ? 0.6 : 0.35}
        metalness={kind === "metal" ? 0.85 : 0.05}
        transparent={kind === "glass"}
        opacity={kind === "glass" ? 0.55 : 1}
      />
    );
  }
  switch (kind) {
    case "glass":
      // Iridescent pearl rather than true transmission: reads as glass on a dark page
      // and skips the extra render pass MeshTransmissionMaterial needs.
      return (
        <meshPhysicalMaterial
          color={color}
          metalness={0.25}
          roughness={0.12}
          clearcoat={1}
          clearcoatRoughness={0.05}
          iridescence={1}
          iridescenceIOR={1.7}
          iridescenceThicknessRange={[200, 800]}
        />
      );
    case "metal":
      return <meshPhysicalMaterial color={color} metalness={1} roughness={0.2} clearcoat={0.4} />;
    case "gloss":
      return <meshPhysicalMaterial color={color} roughness={0.28} metalness={0.05} clearcoat={1} clearcoatRoughness={0.06} />;
    default:
      return <meshPhysicalMaterial color={color} roughness={0.7} metalness={0} clearcoat={0.25} clearcoatRoughness={0.5} sheen={0.4} sheenColor="#ffffff" />;
  }
}

function Shape({ item, tier }: { item: Item; tier: QualityTier }) {
  const geos = useMemo(() => {
    switch (item.kind) {
      case "gear":
        return { main: gearGeometry(tier === "high" ? 10 : 8) };
      case "nut":
        return { main: nutGeometry() };
      case "cursor":
        return { main: cursorGeometry() };
      case "wrench":
        return { main: wrenchHeadGeometry() };
      default:
        return {};
    }
  }, [item.kind, tier]);

  const mat = <Material kind={item.mat} color={item.color} tier={tier} />;
  const seg = tier === "high" ? 48 : 20;

  switch (item.kind) {
    case "wrench":
      return (
        <group rotation={[0, 0, 0.6]}>
          <mesh geometry={geos.main} position={[0.95, 0, 0]}>
            {mat}
          </mesh>
          <mesh position={[-0.05, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <capsuleGeometry args={[0.14, 1.5, 6, 16]} />
            {mat}
          </mesh>
          <mesh position={[-1.02, 0, 0]}>
            <torusGeometry args={[0.24, 0.12, 16, 36]} />
            {mat}
          </mesh>
        </group>
      );
    case "cube":
      return (
        <RoundedBox args={[1.1, 1.1, 1.1]} radius={0.22} smoothness={tier === "high" ? 5 : 3}>
          {mat}
        </RoundedBox>
      );
    case "capsule":
      return (
        <mesh rotation={[0, 0, 0.9]}>
          <capsuleGeometry args={[0.36, 0.95, 12, seg]} />
          {mat}
        </mesh>
      );
    case "torus":
      return (
        <mesh>
          <torusGeometry args={[0.62, 0.24, seg, seg * 2]} />
          {mat}
        </mesh>
      );
    case "sphere":
      return (
        <mesh>
          <sphereGeometry args={[0.7, seg, seg]} />
          {mat}
        </mesh>
      );
    default:
      return <mesh geometry={geos.main}>{mat}</mesh>;
  }
}

function Objects({ tier }: { tier: QualityTier }) {
  const items = useMemo(() => (tier === "high" ? ITEMS : ITEMS.filter((i) => i.lite)), [tier]);
  const root = useRef<THREE.Group>(null);
  const refs = useRef<(THREE.Group | null)[]>([]);
  const target = useMemo(() => new THREE.Vector3(), []);
  const ringPos = useMemo(() => new THREE.Vector3(), []);
  const scatterPos = useMemo(() => new THREE.Vector3(), []);
  const size = useThree((s) => s.size);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 1 / 30);
    const t = state.clock.elapsedTime;
    const p = heroState.progress;
    const { x: px, y: py } = heroState.pointer;

    const explode = smoothstep(0, 0.5, p); // cluster → scatter
    const regroup = smoothstep(0.5, 1, p); // scatter → orbit ring
    const aspect = size.width / size.height;
    const portrait = aspect < 1;

    items.forEach((it, i) => {
      const g = refs.current[i];
      if (!g) return;
      const a = (i / items.length) * Math.PI * 2 + t * 0.18;
      const R = portrait ? 1.7 : 2.6;
      ringPos.set(Math.cos(a) * R, Math.sin(a) * R * 0.62, Math.sin(a * 2) * 0.6);

      scatterPos.set(it.scatter[0], it.scatter[1], it.scatter[2]);
      target.set(it.cluster[0], it.cluster[1], it.cluster[2]).lerp(scatterPos, explode).lerp(ringPos, regroup);
      target.y += Math.sin(t * 0.8 + i * 1.7) * 0.12;
      // Per-object pointer parallax, stronger for objects closer to camera
      target.x += px * 0.18 * (1 + it.cluster[2] * 0.4);
      target.y += py * 0.12 * (1 + it.cluster[2] * 0.4);

      g.position.x = THREE.MathUtils.damp(g.position.x, target.x, 5, dt);
      g.position.y = THREE.MathUtils.damp(g.position.y, target.y, 5, dt);
      g.position.z = THREE.MathUtils.damp(g.position.z, target.z, 5, dt);

      const boost = 1 + explode * (1 - regroup) * 3;
      g.rotation.x += it.spin[0] * dt * boost;
      g.rotation.y += it.spin[1] * dt * boost;
      g.rotation.z += it.spin[2] * dt * boost * 0.5;
    });

    if (root.current) {
      const r = root.current;
      const offsetX = aspect > 1.15 ? 1.9 * (1 - regroup) : 0;
      const offsetY = portrait ? 1.6 * (1 - regroup) : 0;
      r.position.x = THREE.MathUtils.damp(r.position.x, offsetX, 3, dt);
      r.position.y = THREE.MathUtils.damp(r.position.y, offsetY, 3, dt);
      r.rotation.y = THREE.MathUtils.damp(r.rotation.y, px * 0.35, 3, dt);
      r.rotation.x = THREE.MathUtils.damp(r.rotation.x, -py * 0.22, 3, dt);
      r.rotation.z = THREE.MathUtils.damp(r.rotation.z, regroup * 0.25, 3, dt);
      const s = portrait ? 0.3 : aspect < 1.35 ? 0.8 : 1;
      r.scale.setScalar(THREE.MathUtils.damp(r.scale.x, s, 4, dt));
    }

    // Camera dolly: push in while things explode, pull back for the orbit
    const cam = state.camera;
    cam.position.z = THREE.MathUtils.damp(cam.position.z, 9 - explode * 2.6 + regroup * 3.2, 4, dt);
    cam.lookAt(0, 0, 0);
  });

  return (
    <group ref={root}>
      {items.map((it, i) => (
        <group
          key={it.kind}
          ref={(el) => {
            refs.current[i] = el;
          }}
          position={it.cluster}
          rotation={[i * 0.7, i * 1.1, i * 0.3]}
          scale={it.scale}
        >
          <Shape item={it} tier={tier} />
        </group>
      ))}
    </group>
  );
}

export default function HeroScene({
  tier,
  active,
  onReady,
  onLost,
}: {
  tier: Exclude<QualityTier, "off">;
  active: boolean;
  onReady: () => void;
  /** WebGL context lost (GPU reset / memory pressure): parent swaps back to the static fallback. */
  onLost: () => void;
}) {
  const maxDpr = tier === "high" ? 1.75 : 1.25;
  const [dpr, setDpr] = useState(Math.min(maxDpr, typeof window !== "undefined" ? window.devicePixelRatio : 1));

  return (
    <Canvas
      dpr={dpr}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, 9], fov: 35, near: 0.1, far: 60 }}
      gl={{ antialias: tier === "high", alpha: true, powerPreference: "high-performance", stencil: false }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
        gl.domElement.addEventListener(
          "webglcontextlost",
          (e) => {
            e.preventDefault();
            onLost();
          },
          { once: true },
        );
        // Wait two frames so shaders are compiled before we fade out the fallback
        requestAnimationFrame(() => requestAnimationFrame(onReady));
      }}
      aria-hidden="true"
    >
      <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(maxDpr)} flipflops={3} onFallback={() => setDpr(1)} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 5]} intensity={2.2} />
      <pointLight position={[-5, -2, 3]} intensity={25} color={VIOLET} />
      <pointLight position={[5, -3, 2]} intensity={15} color={ACCENT} />

      {/* Procedural studio environment, rendered once, no HDR download */}
      <Environment resolution={tier === "high" ? 256 : 64} frames={1}>
        <Lightformer form="rect" intensity={3} position={[0, 5, -2]} scale={[10, 3, 1]} />
        <Lightformer form="rect" intensity={2} color={VIOLET} position={[-6, 0, 2]} rotation-y={Math.PI / 2} scale={[8, 4, 1]} />
        <Lightformer form="rect" intensity={1.5} color={ACCENT} position={[6, -1, 1]} rotation-y={-Math.PI / 2} scale={[6, 3, 1]} />
        <Lightformer form="ring" intensity={2.5} position={[2, 2, 6]} scale={3} />
      </Environment>

      <Objects tier={tier} />
    </Canvas>
  );
}
