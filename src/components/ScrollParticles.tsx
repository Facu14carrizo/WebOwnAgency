import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function ScrollController() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state) => {
    state.camera.position.y = -scrollY * 0.05;
    state.camera.position.z = 300 + scrollY * 0.02;
  });

  return null;
}

function FloatingParticles() {
  const ref = useRef<THREE.Points>(null);
  const particlesCount = 3000;
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 800;
      pos[i + 1] = (Math.random() - 0.5) * 800;
      pos[i + 2] = (Math.random() - 0.5) * 200;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.05 + scrollY * 0.0008;
      ref.current.rotation.y = state.clock.elapsedTime * 0.08 + scrollY * 0.0005;
      ref.current.rotation.z = scrollY * 0.0002;

      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] += Math.sin(state.clock.elapsedTime + i) * 0.1;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00ff88"
        size={1.5}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function FloatingSphere({ position, color, speed }: { position: [number, number, number]; color: string; speed: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 30 + scrollY * 0.03;
      ref.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * speed * 0.5) * 20;
      ref.current.rotation.x += 0.01 + scrollY * 0.00001;
      ref.current.rotation.y += 0.01 + scrollY * 0.00001;
    }
  });

  return (
    <Sphere ref={ref} args={[15, 32, 32]} position={position}>
      <meshPhongMaterial
        color={color}
        transparent
        opacity={0.2}
        wireframe
        emissive={color}
        emissiveIntensity={0.3}
      />
    </Sphere>
  );
}

function FloatingRing({ position, speed }: { position: [number, number, number]; speed: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * speed + scrollY * 0.001;
      ref.current.rotation.y = state.clock.elapsedTime * speed * 0.7;
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 20;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <torusGeometry args={[40, 8, 16, 100]} />
      <meshPhongMaterial
        color="#ff00ff"
        transparent
        opacity={0.25}
        wireframe
        emissive="#ff00ff"
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

function AnimatedHelix() {
  const ref = useRef<THREE.Group>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const spheres = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 20; i++) {
      arr.push({
        id: i,
        radius: 50,
        angle: (i / 20) * Math.PI * 4,
        height: i * 15 - 150,
      });
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.3 + scrollY * 0.001;
      ref.current.position.y = -scrollY * 0.05;
    }
  });

  return (
    <group ref={ref}>
      {spheres.map((sphere) => (
        <Sphere key={sphere.id} args={[5, 16, 16]} position={[
          Math.cos(sphere.angle) * sphere.radius,
          sphere.height,
          Math.sin(sphere.angle) * sphere.radius
        ]}>
          <meshPhongMaterial
            color="#00ffff"
            transparent
            opacity={0.6}
            emissive="#00ffff"
            emissiveIntensity={0.5}
          />
        </Sphere>
      ))}
    </group>
  );
}

export default function ScrollParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas camera={{ position: [0, 0, 300], fov: 75 }}>
        <ScrollController />
        <ambientLight intensity={0.3} />
        <pointLight position={[100, 100, 100]} color="#00ff88" intensity={0.8} />
        <pointLight position={[-100, -100, 100]} color="#ff00ff" intensity={0.8} />
        <pointLight position={[0, 0, 200]} color="#00ffff" intensity={0.5} />

        <FloatingParticles />

        <FloatingSphere position={[-150, 50, -50]} color="#00ff88" speed={0.5} />
        <FloatingSphere position={[150, -50, -80]} color="#ff00ff" speed={0.7} />
        <FloatingSphere position={[0, 100, -100]} color="#ffff00" speed={0.6} />

        <FloatingRing position={[-100, -80, -50]} speed={0.4} />
        <FloatingRing position={[120, 60, -80]} speed={0.3} />

        <AnimatedHelix />
      </Canvas>
    </div>
  );
}
