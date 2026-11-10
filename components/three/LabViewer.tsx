"use client";

import { Float, MeshDistortMaterial, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useReducedMotion } from "motion/react";
import { LabFallback } from "@/components/three/LabFallback";
import { useMediaQuery } from "@/lib/use-media-query";
import type { ModelShape } from "@/types";

type LabViewerProps = {
  shape: ModelShape;
  fallbackLabel: string;
};

function Study({ shape, primary, secondary }: {
  shape: ModelShape;
  primary: string;
  secondary: string;
}) {
  return (
    <group>
      <Float speed={1.2} rotationIntensity={0.35} floatIntensity={0.7}>
        {shape === "icosahedron" ? (
          <group>
            <mesh>
              <icosahedronGeometry args={[1.45, 1]} />
              <meshBasicMaterial color={primary} wireframe transparent opacity={0.85} />
            </mesh>
            <mesh scale={1.06}>
              <icosahedronGeometry args={[1.45, 2]} />
              <meshBasicMaterial color={secondary} wireframe transparent opacity={0.24} />
            </mesh>
          </group>
        ) : null}

        {shape === "torusKnot" ? (
          <group>
            <mesh>
              <torusKnotGeometry args={[0.95, 0.3, 200, 24]} />
              <meshBasicMaterial color={primary} wireframe transparent opacity={0.8} />
            </mesh>
            <mesh rotation={[0.35, 0.85, 0]}>
              <torusGeometry args={[1.45, 0.015, 8, 140]} />
              <meshBasicMaterial color={secondary} transparent opacity={0.35} />
            </mesh>
          </group>
        ) : null}

        {shape === "blob" ? (
          <group>
            <mesh>
              <icosahedronGeometry args={[1.4, 5]} />
              <MeshDistortMaterial
                color={primary}
                wireframe
                transparent
                opacity={0.8}
                distort={0.35}
                speed={1.2}
                roughness={0.35}
                metalness={0.25}
              />
            </mesh>
            <mesh scale={1.12}>
              <sphereGeometry args={[1.4, 24, 16]} />
              <meshBasicMaterial color={secondary} wireframe transparent opacity={0.16} />
            </mesh>
          </group>
        ) : null}
      </Float>
    </group>
  );
}

export default function LabViewer({ shape, fallbackLabel }: LabViewerProps) {
  const reduce = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (reduce || !isDesktop) {
    return <LabFallback label={fallbackLabel} />;
  }

  const primary = "#1a1714";
  const secondary = "#5b6c9d";

  return (
    <Canvas
      className="h-full w-full"
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5.2], fov: 42 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.7} />
      <pointLight position={[4, 4, 4]} intensity={20} color={secondary} distance={14} />
      <Study shape={shape} primary={primary} secondary={secondary} />
      <OrbitControls
        makeDefault
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.65}
        rotateSpeed={0.7}
        minPolarAngle={Math.PI / 3.2}
        maxPolarAngle={Math.PI / 1.55}
      />
    </Canvas>
  );
}
