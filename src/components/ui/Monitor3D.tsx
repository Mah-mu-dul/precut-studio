import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows, useTexture } from '@react-three/drei';
import { MotionValue } from 'framer-motion';
import * as THREE from 'three';
import logoUrl from '../../assets/image.png';

// ── CONSTANTS ──────────────────────────────────────────────────────────────
const ROTATE_END = 0.25;
const ZOOM_ENTRY_END = 0.45;

function Model(props: any) {
  const { scene } = useGLTF('/monitor/scene.gltf');
  return <primitive object={scene} {...props} />;
}

function ScreenLogo() {
  const texture = useTexture(logoUrl);
  return (
    <mesh position={[0, 0, 0.05]} scale={[0.8, 0.45, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        map={texture}
        transparent={true}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
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

    // PHASE 1: ROTATION (0 to 0.25)
    const pRotate = Math.min(sp / ROTATE_END, 1);

    // PHASE 1-2: Model Transform
    if (modelRef.current) {
      const s = 12.0 + 3.0 * pRotate;
      modelRef.current.scale.set(s, s, s);
      
      // Transitions from very low (Image 1) to centered (Image 2) - Shifted up slightly
      let yPos = -3.8 * (1 - pRotate) + (-1.0 * pRotate);
      
      if (sp > ROTATE_END) {
        const pZoom = Math.min((sp - ROTATE_END) / (ZOOM_ENTRY_END - ROTATE_END), 1);
        yPos += 0.1 * pZoom; 
      }
      
      modelRef.current.position.y = yPos;
    }

    // PHASE 1: Camera Transition (Bottom Left POV to Centered Frontal)
    const camX = -6.0 * (1 - pRotate) + 0 * pRotate;
    const camY = -5.0 * (1 - pRotate) + (-1.0 * pRotate);
    const camZ = 10.0 * (1 - pRotate) + 6.5 * pRotate;
    
    state.camera.position.set(camX, camY, camZ);

    // Dynamic lookAt target: Lifted to keep monitor centered and visible
    const targetYStart = -0.5; 
    const targetYEnd = -1.0;
    const currentTargetY = targetYStart * (1 - pRotate) + targetYEnd * pRotate;

    // PHASE 2: DEEP ZOOM (0.25 to 0.45)
    if (sp > ROTATE_END) {
      const pZoom = Math.min((sp - ROTATE_END) / (ZOOM_ENTRY_END - ROTATE_END), 1);

      const startZ = 6.5; 
      const endZ = 3.3; 

      state.camera.position.z = startZ - (startZ - endZ) * pZoom;
      state.camera.position.x = 0;
      state.camera.position.y = -1.0; 

      const cam = state.camera as THREE.PerspectiveCamera;
      cam.fov = 45 - 15 * pZoom; 
      cam.updateProjectionMatrix();
      
      state.camera.lookAt(0, -1.0, 0);
    } else {
      const cam = state.camera as THREE.PerspectiveCamera;
      cam.fov = 45;
      cam.updateProjectionMatrix();
      state.camera.lookAt(0, currentTargetY, 0);
    }
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
