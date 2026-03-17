import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows, useTexture } from '@react-three/drei';
import { MotionValue } from 'framer-motion';
import * as THREE from 'three';
import logoUrl from '../../assets/image.png';

// ── CONSTANTS ──────────────────────────────────────────────────────────────
const PHASE1_END = 0.15; // Rotated to front-facing
const PHASE2_END = 0.30; // Small to large
const ZOOM_ENTRY_END = 0.45; // Deep zoom

function Model(props: any) {
  const { scene } = useGLTF('/monitor/scene.gltf');
  return <primitive object={scene} {...props} />;
}

function ScreenLogo() {
  const texture = useTexture(logoUrl);
  return (
    <group position={[0, 0, 0.051]}>
      {/* The Black Screen Content */}
      <mesh scale={[0.8, 0.44, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial
          map={texture}
          transparent={true}
          emissive="#ffffff"
          emissiveIntensity={0.05}
          roughness={0.15}
          metalness={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Glass Overlay for Realism/Reflection */}
      <mesh scale={[0.8, 0.44, 1]} position={[0, 0, 0.005]}>
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#000000"
          transparent={true}
          opacity={0.15}
          roughness={0.05}
          metalness={0.9}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload('/monitor/scene.gltf');
useTexture.preload(logoUrl);

interface SceneContentProps {
  scrollProgress: MotionValue<number>;
}

const SceneContent = ({ scrollProgress }: SceneContentProps) => {
  const modelRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const sp = scrollProgress.get();

    // Progress 0->1 for each phase
    const p1 = Math.min(Math.max(sp / PHASE1_END, 0), 1);
    const p2 = Math.min(Math.max((sp - PHASE1_END) / (PHASE2_END - PHASE1_END), 0), 1);
    const p3 = Math.min(Math.max((sp - PHASE2_END) / (ZOOM_ENTRY_END - PHASE2_END), 0), 1);

    if (modelRef.current) {
      const s = 12.0;
      modelRef.current.scale.set(s, s, s);
      modelRef.current.position.y = -1.0; 
    }

    // Step 1: Rotate to front
    const startRadius = 9.5; // zoomed out more so the monitor is smaller initially
    const endRadius = 8.5;
    const currentRadius = startRadius * (1 - p1) + endRadius * p1;

    const startAngle = -Math.PI / 8; // less tilted (was -Math.PI / 4)
    const currentAngle = startAngle * (1 - p1);

    const camX = Math.sin(currentAngle) * currentRadius;
    let baseZ = Math.cos(currentAngle) * currentRadius;

    const startCamY = -2.5; // adjust bottom pov for new zoom
    const endCamY = -1.0;
    let camY = startCamY * (1 - p1) + endCamY * p1;

    const startTargetY = 0.2; // look slightly higher to cut the stand
    const endTargetY = -1.0;
    let targetY = startTargetY * (1 - p1) + endTargetY * p1;

    // Step 2 & 3: Zoom / Scale up
    let camZ = baseZ;
    const zPhase2End = 5.0; // "Large front face monitor"
    const zPhase3End = 3.3; // Deep zoom

    if (p2 > 0) {
      camZ = baseZ - (baseZ - zPhase2End) * p2;
      // move the monitor down during Phase 2
      camY = endCamY + 0.5 * p2; // camera moves up to push monitor down
      targetY = endTargetY + 0.5 * p2;
    }
    if (p3 > 0) {
      camZ = zPhase2End - (zPhase2End - zPhase3End) * p3;
    }

    // FOV logic for deep zoom
    if (p3 > 0) {
       const cam = state.camera as THREE.PerspectiveCamera;
       cam.fov = 45 - 15 * p3;
       cam.updateProjectionMatrix();
       camY = -1.0 - 0.5 * p3; // Shift Y down to focus on screen center
       targetY = -1.0 - 0.5 * p3;
    } else {
       const cam = state.camera as THREE.PerspectiveCamera;
       cam.fov = 45;
       cam.updateProjectionMatrix();
    }

    state.camera.position.set(camX, camY, camZ);
    state.camera.lookAt(0, targetY, 0);
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.2} />
      <Suspense fallback={null}>
        <group ref={modelRef}>
          <Model rotation={[0, -Math.PI / 2, 0]} />
          <ScreenLogo />
        </group>
        <Environment preset="city" />
        <ContactShadows position={[0, -2.2, 0]} opacity={0.4} scale={15} blur={2.5} far={6} />
      </Suspense>
    </>
  );
};

interface Monitor3DProps {
  scrollProgress: MotionValue<number>;
}

const Monitor3D: React.FC<Monitor3DProps> = ({ scrollProgress }) => {
  return (
    <div className="w-full h-full pointer-events-none relative">
      <Canvas camera={{ position: [-6, -4.0, 7], fov: 45 }}>
        <SceneContent scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
};

export default Monitor3D;
