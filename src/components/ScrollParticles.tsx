import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Sphere, Line, Sparkles, Trail, Stars, MeshDistortMaterial } from '@react-three/drei';
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

function AuroraPlane() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  const fragmentShader = `
    varying vec2 vUv;
    uniform float uTime;

    vec3 palette(float t) {
      return mix(vec3(0.0, 0.1, 0.05), vec3(0.0, 1.0, 0.6), smoothstep(0.0, 1.0, t));
    }

    void main() {
      vec2 uv = vUv;
      uv.y += 0.05 * sin(uv.x * 10.0 + uTime * 0.25);
      uv.y += 0.05 * sin(uv.x * 30.0 - uTime * 0.6);
      float band1 = smoothstep(0.25, 0.75, uv.y);
      float band2 = smoothstep(0.2, 0.8, 1.0 - uv.y);
      float glow = 0.35 + 0.35 * sin(uTime * 0.8 + uv.x * 6.0);
      vec3 col = palette(band1) * band1 + palette(band2) * band2;
      col += vec3(0.2, 0.9, 0.6) * glow * 0.25;
      col = pow(col, vec3(1.2));
      gl_FragColor = vec4(col, 0.10);
    }
  `;

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  return (
    <mesh position={[0, 0, -250]}>
      <planeGeometry args={[1200, 800, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        transparent
        blending={THREE.NormalBlending}
        uniforms={{ uTime: { value: 0 } }}
      />
    </mesh>
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

function SwirlLines() {
  const groupRef = useRef<THREE.Group>(null);
  const lines = useMemo(() => {
    const arr: { points: THREE.Vector3[]; color: string }[] = [];
    for (let i = 0; i < 6; i++) {
      const pts: THREE.Vector3[] = [];
      const radius = 120 + i * 20;
      for (let a = 0; a <= Math.PI * 2; a += 0.2) {
        const x = Math.cos(a) * radius;
        const y = Math.sin(a * 1.5) * 30 + (i - 3) * 20;
        const z = Math.sin(a) * radius;
        pts.push(new THREE.Vector3(x, y, z - 120));
      }
      const color = i % 2 === 0 ? '#00ff88' : '#ff00ff';
      arr.push({ points: pts, color });
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {lines.map((l, idx) => (
        <Line key={idx} points={l.points} color={l.color} lineWidth={1} transparent opacity={0.3} />
      ))}
    </group>
  );
}

function ShootingStars() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 60;
  const velocities = useRef<number[]>([]);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    velocities.current = new Array(count).fill(0).map(() => 50 + Math.random() * 120);
  }, []);

  const resetStar = (i: number) => {
    const x = 500 + Math.random() * 300;
    const y = (Math.random() - 0.5) * 400;
    const z = -150 + Math.random() * -100;
    const s = 0.4 + Math.random() * 1.2;
    dummy.position.set(x, y, z);
    dummy.scale.set(s, s * 0.6, s);
    dummy.rotation.set(0, 0, Math.random() * Math.PI);
    dummy.updateMatrix();
    meshRef.current!.setMatrixAt(i, dummy.matrix);
  };

  useEffect(() => {
    if (!meshRef.current) return;
    for (let i = 0; i < count; i++) resetStar(i);
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [count]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    for (let i = 0; i < count; i++) {
      meshRef.current.getMatrixAt(i, dummy.matrix);
      dummy.position.setFromMatrixPosition(dummy.matrix);
      dummy.rotation.setFromRotationMatrix(dummy.matrix);
      const speed = velocities.current[i] * delta;
      dummy.position.x -= speed;
      dummy.position.y -= speed * 0.25;
      if (dummy.position.x < -550 || dummy.position.y < -300) {
        resetStar(i);
        continue;
      }
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined as unknown as THREE.BufferGeometry, undefined as unknown as THREE.Material, count]}>
      <coneGeometry args={[2, 12, 6]} />
      <meshBasicMaterial color={'#ffffff'} transparent opacity={0.8} blending={THREE.AdditiveBlending} />
    </instancedMesh>
  );
}

function WavyPlane() {
  return (
    <mesh position={[0, -120, -180]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[1200, 800, 64, 64]} />
      <MeshDistortMaterial color="#00ffff" transparent opacity={0.12} distort={0.25} speed={1.2} />
    </mesh>
  );
}

function Comet({ start, velocity, color = '#ffffff' }: { start: [number, number, number]; velocity: [number, number, number]; color?: string }) {
  const ref = useRef<THREE.Mesh>(null);
  const position = useRef(new THREE.Vector3(...start));
  const velocityVec = useRef(new THREE.Vector3(...velocity));

  useFrame((_, delta) => {
    position.current.addScaledVector(velocityVec.current, delta);
    // Respawn when out of bounds
    if (position.current.x < -650 || position.current.x > 650 || position.current.y < -350 || position.current.y > 350) {
      position.current.set(500 + Math.random() * 300, (Math.random() - 0.5) * 500, -120);
      velocityVec.current.set(-80 - Math.random() * 120, -10 - Math.random() * 30, 0);
    }
    if (ref.current) {
      ref.current.position.copy(position.current);
    }
  });

  return (
    <Trail width={4} color={color} length={12} decay={0.6} attenuation={(t) => t * t}>
      <mesh ref={ref} position={start}>
        <sphereGeometry args={[2.2, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.9} blending={THREE.AdditiveBlending} />
      </mesh>
    </Trail>
  );
}

export default function ScrollParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas camera={{ position: [0, 0, 300], fov: 75 }}>
        <ScrollController />
        <Stars radius={300} depth={100} count={2000} factor={8} saturation={0} fade speed={0.5} />
        <Sparkles count={80} scale={[900, 500, 200]} size={8} speed={0.4} opacity={0.25} color="#ffffff" position={[0, 0, -60]} />
        <WavyPlane />
        <ambientLight intensity={0.3} />
        <pointLight position={[100, 100, 100]} color="#00ff88" intensity={0.8} />
        <pointLight position={[-100, -100, 100]} color="#ff00ff" intensity={0.8} />
        <pointLight position={[0, 0, 200]} color="#00ffff" intensity={0.5} />

        <FloatingParticles />
        <ShootingStars />

        <Comet start={[450, 180, -120]} velocity={[-120, -15, 0]} color="#aaffff" />
        <Comet start={[520, -120, -100]} velocity={[-100, 10, 0]} color="#ffccff" />
        <Comet start={[400, 40, -90]} velocity={[-150, -5, 0]} color="#ffffff" />

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
