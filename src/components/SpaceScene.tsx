import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function CameraController() {
  useFrame((state) => {
    state.camera.position.x = state.mouse.x * 100;
    state.camera.position.y = state.mouse.y * 100;
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const particlesCount = 5000;

  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 1000;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x += 0.0005;
      ref.current.rotation.y += 0.0005;
      ref.current.position.x = state.mouse.x * 50;
      ref.current.position.y = -state.mouse.y * 50;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00ff88"
        size={2}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function GeometricShape({ position, type }: { position: [number, number, number]; type: 'torus' | 'icosahedron' | 'octahedron' }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x += 0.01;
      ref.current.rotation.y += 0.01;
      ref.current.rotation.z += 0.005;
    }
  });

  const geometry = useMemo(() => {
    switch (type) {
      case 'torus':
        return <torusGeometry args={[100, 30, 16, 100]} />;
      case 'icosahedron':
        return <icosahedronGeometry args={[80, 0]} />;
      case 'octahedron':
        return <octahedronGeometry args={[70, 0]} />;
    }
  }, [type]);

  const color = useMemo(() => {
    switch (type) {
      case 'torus':
        return '#ff00ff';
      case 'icosahedron':
        return '#00ff88';
      case 'octahedron':
        return '#ffff00';
    }
  }, [type]);

  return (
    <mesh ref={ref} position={position}>
      {geometry}
      <meshPhongMaterial color={color} wireframe transparent opacity={0.3} />
    </mesh>
  );
}

export default function SpaceScene() {
  return (
    <div className="absolute inset-0 z-1">
      <Canvas camera={{ position: [0, 0, 500], fov: 75 }}>
        <CameraController />
        <ambientLight intensity={0.5} />
        <pointLight position={[200, 200, 200]} color="#00ff88" intensity={1} />
        <pointLight position={[-200, -200, 200]} color="#ff00ff" intensity={1} />
        <Particles />
        <GeometricShape position={[-200, 100, 0]} type="torus" />
        <GeometricShape position={[200, -100, 0]} type="icosahedron" />
        <GeometricShape position={[0, 150, 0]} type="octahedron" />
      </Canvas>
    </div>
  );
}
