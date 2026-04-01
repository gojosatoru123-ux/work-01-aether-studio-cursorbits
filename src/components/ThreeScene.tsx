import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Particles({ count = 2000 }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 20;
      p[i * 3 + 1] = (Math.random() - 0.5) * 20;
      p[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return p;
  }, [count]);

  const ref = useRef<THREE.Points>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.05;
    ref.current.rotation.x = t * 0.02;
  });

  return (
    <Points ref={ref} positions={points} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#D4AF37"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.4}
      />
    </Points>
  );
}

function AbstractShape({ position, color, speed, distort, radius }: any) {
  const mesh = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.x = Math.cos(t / 4) / 2;
    mesh.current.rotation.y = Math.sin(t / 4) / 2;
    mesh.current.rotation.z = Math.sin(t / 4) / 2;
    mesh.current.position.y = position[1] + Math.sin(t * speed) * 0.3;
  });

  return (
    <Float speed={speed} rotationIntensity={1} floatIntensity={1}>
      <Sphere ref={mesh} args={[radius, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          speed={speed}
          distort={distort}
          radius={radius}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.6}
        />
      </Sphere>
    </Float>
  );
}

function Rig() {
  useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.mouse.x * 3, 0.03);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.mouse.y * 3, 0.03);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function ThreeScene() {
  const shapes = useMemo(() => [
    { position: [-6, 3, -8], color: '#E8E4DE', speed: 1.2, distort: 0.3, radius: 1.2 },
    { position: [6, -3, -10], color: '#D4AF37', speed: 1, distort: 0.2, radius: 1.8 },
    { position: [0, 0, -15], color: '#F5F2ED', speed: 0.6, distort: 0.4, radius: 2.5 },
    { position: [-8, -5, -12], color: '#0a0a0a', speed: 1.5, distort: 0.1, radius: 0.8 },
  ], []);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-cream">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <fog attach="fog" args={['#F5F2ED', 5, 25]} />
        <ambientLight intensity={0.4} />
        <spotLight position={[15, 15, 15]} angle={0.2} penumbra={1} intensity={1.5} color="#D4AF37" />
        <pointLight position={[-15, -15, -15]} intensity={0.8} color="#F5F2ED" />
        
        <Particles count={3000} />
        
        {shapes.map((shape, i) => (
          <AbstractShape key={i} {...shape} />
        ))}
        
        <Rig />
      </Canvas>
    </div>
  );
}
