import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls, Stars } from '@react-three/drei';

function Particles({ count = 2000 }) {
  const mesh = useRef();
  const particlesGeometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }
    return new THREE.BufferAttribute(positions, 3);
  }, [count]);

  useFrame(({ clock, mouse }) => {
    if (!mesh.current) return;
    
    // Animate particles
    const time = clock.getElapsedTime() * 0.25;
    const positions = mesh.current.geometry.attributes.position;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions.array[i3] += Math.sin(time + i) * 0.001;
      positions.array[i3 + 1] += Math.cos(time + i) * 0.001;
    }
    
    positions.needsUpdate = true;
    
    // Rotate based on mouse position
    mesh.current.rotation.x = mouse.y * 0.1;
    mesh.current.rotation.y = mouse.x * 0.1;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesGeometry.count}
          array={particlesGeometry.array}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.02} 
        color="#8a2be2"
        transparent 
        opacity={0.8}
        sizeAttenuation={true}
      />
    </points>
  );
}

function FloatingShapes() {
  const group = useRef();
  
  useFrame(({ clock, mouse }) => {
    if (!group.current) return;
    
    // Gentle floating animation
    const time = clock.getElapsedTime();
    group.current.rotation.x = time * 0.1;
    group.current.rotation.y = time * 0.05;
    
    // Slight movement based on mouse position
    group.current.rotation.x += (mouse.y - group.current.rotation.x) * 0.01;
    group.current.rotation.y += (mouse.x - group.current.rotation.y) * 0.01;
  });

  return (
    <group ref={group}>
      <mesh position={[1, 0, 0]}>
        <icosahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial 
          color="#00f7ff" 
          transparent 
          opacity={0.6} 
          wireframe 
          wireframeLinewidth={1}
        />
      </mesh>
      <mesh position={[-1, 1, -1]} rotation={[1, 1, 0]}>
        <torusGeometry args={[0.3, 0.1, 16, 32]} />
        <meshStandardMaterial 
          color="#ff2d75" 
          transparent 
          opacity={0.6} 
          wireframe 
          wireframeLinewidth={1}
        />
      </mesh>
      <mesh position={[0, -1, 1]} rotation={[0, 0.5, 0.5]}>
        <octahedronGeometry args={[0.4, 0]} />
        <meshStandardMaterial 
          color="#8a2be2" 
          transparent 
          opacity={0.6} 
          wireframe 
          wireframeLinewidth={1}
        />
      </mesh>
    </group>
  );
}

export default function ThreeDBackground() {
  return (
    <div className="three-bg">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -1,
          background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)'
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <Particles count={2000} />
        <FloatingShapes />
        <Stars 
          radius={100} 
          depth={50} 
          count={1000} 
          factor={4} 
          saturation={0} 
          fade 
          speed={0.5} 
        />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          enableRotate={false} 
        />
      </Canvas>
    </div>
  );
}
