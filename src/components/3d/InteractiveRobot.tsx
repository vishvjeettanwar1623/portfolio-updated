"use client";

import { useRef, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, Bounds, Center, PresentationControls, Float, useProgress, Html } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";


function NeuralScanLoader() {
  const { progress, active } = useProgress();
  const [displayProgress, setDisplayProgress] = useState(0);
  
  useEffect(() => {
    
    
    const timer = setTimeout(() => {
      if (displayProgress < 60) {
        setDisplayProgress(prev => Math.min(60, prev + (60 - prev) * 0.15));
      }
    }, 50);

    
    
    if (progress > displayProgress) {
        setDisplayProgress(progress);
    }

    return () => clearTimeout(timer);
  }, [progress, displayProgress]);

  return (
    <Html center>
      <div className="flex flex-col items-center justify-center w-64 md:w-80">
        <div className="relative w-full h-[2px] bg-white/5 overflow-hidden">
          {}
          <div 
            className="absolute inset-0 bg-primary/20 blur-sm transition-all duration-300"
            style={{ width: `${displayProgress}%` }}
          />
          {}
          <div 
            className="absolute inset-0 bg-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.8)] transition-all duration-200"
            style={{ width: `${displayProgress}%` }}
          />
          {}
          <div 
            className="absolute h-full w-8 bg-white/40 blur-md translate-x-[-100%]"
            style={{ left: `${displayProgress}%` }}
          />
        </div>
        
        <div className="mt-4 flex flex-col items-center gap-1">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary animate-pulse">
            Neural Network Initialization
          </span>
          <div className="flex items-center gap-2 text-[8px] font-mono text-white/40 uppercase tracking-widest">
            <span>Buffer: {Math.round(displayProgress)}%</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>Ready for Input</span>
          </div>
        </div>
      </div>
    </Html>
  );
}


function FallbackBox() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta;
      mesh.current.rotation.y += delta;
    }
  });
  return (
    <mesh ref={mesh}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="cyan" wireframe />
    </mesh>
  );
}

function RobotModel() {
  const { scene } = useGLTF("/assets/model.glb");
  return (
    <Center>
      <primitive object={scene} />
    </Center>
  );
}

export function InteractiveRobot() {
  return (
    <div className="w-full h-full cursor-grab active:cursor-grabbing pointer-events-auto">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={2} />
        <directionalLight position={[10, 10, 5]} intensity={2} />
        <Environment preset="city" />
        <Suspense fallback={<NeuralScanLoader />}>
          <PresentationControls 
            global={false} 
            cursor={true}  
            snap={false} 
            speed={1.5}
            zoom={1.2}     
            rotation={[0.1, -0.2, 0]} 
            polar={[-Infinity, Infinity]} 
            azimuth={[-Infinity, Infinity]} 
          >
            <Float 
              speed={2.5} 
              rotationIntensity={0.25} 
              floatIntensity={0.6} 
              floatingRange={[-0.1, 0.1]}
            >
              <group scale={2.6}>
                <Bounds fit clip margin={0.8}>
                  <RobotModel />
                </Bounds>
              </group>
            </Float>
          </PresentationControls>
        </Suspense>
      </Canvas>
    </div>
  );
}
