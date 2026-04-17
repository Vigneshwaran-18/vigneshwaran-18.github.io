import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, MeshDistortMaterial } from '@react-three/drei';
import { isMobile } from 'react-device-detect';
import { motion, useScroll, useTransform } from 'framer-motion';

const Shape = () => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} scale={isMobile ? 1.5 : 2.2}>
        <icosahedronGeometry args={[1, 0]} />
        <MeshDistortMaterial
          color="#3b82f6"
          envMapIntensity={0.8}
          clearcoat={1}
          clearcoatRoughness={0}
          metalness={0.8}
          roughness={0.2}
          distort={isMobile ? 0.2 : 0.4}
          speed={isMobile ? 1 : 2}
        />
      </mesh>
    </Float>
  );
};

const Scene3D = () => {
  const { scrollY } = useScroll();
  const yPos = useTransform(scrollY, [0, 1000], [0, 400]);

  return (
    <motion.div 
      style={{ y: yPos }}
      className="absolute inset-0 z-0 h-[100vh] w-full pointer-events-none"
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }} className="h-full w-full opacity-40">
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Shape />
        <Environment preset="city" />
      </Canvas>
    </motion.div>
  );
};

export default Scene3D;
