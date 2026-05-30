import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';

function GlitterCloud() {
  const data = useMemo(() => {
    const p: number[] = [];
    const c: number[] = [];
    const color = new THREE.Color();
    const layers = [
      { r: 2.25, y: -0.62, h: 0.76, n: 2800 },
      { r: 1.58, y: 0.08, h: 0.62, n: 2200 },
      { r: 1.02, y: 0.66, h: 0.5, n: 1700 }
    ];

    for (const layer of layers) {
      for (let i = 0; i < layer.n; i++) {
        const angle = Math.random() * Math.PI * 2;
        const onSide = Math.random() < 0.42;
        const radius = onSide ? layer.r * (0.92 + Math.random() * 0.08) : layer.r * Math.sqrt(Math.random());
        p.push(Math.cos(angle) * radius, layer.y + (Math.random() - 0.5) * layer.h, Math.sin(angle) * radius);
        color.setHSL(0.53 + Math.random() * 0.1, 0.9, 0.72 + Math.random() * 0.18);
        c.push(color.r, color.g, color.b);
      }
    }

    // 外圈不做圆环，只做轻薄的漂浮星尘，像一座发光小岛周围的雾。
    for (let i = 0; i < 1200; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 2.55 + Math.random() * 1.55;
      p.push(Math.cos(angle) * radius, -0.48 + Math.random() * 1.75, Math.sin(angle) * radius);
      color.setHSL(0.56 + Math.random() * 0.08, 0.95, 0.76 + Math.random() * 0.18);
      c.push(color.r, color.g, color.b);
    }

    return { p: new Float32Array(p), c: new Float32Array(c) };
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[data.p, 3]} />
        <bufferAttribute attach="attributes-color" args={[data.c, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.034} vertexColors transparent opacity={0.82} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

function SoftLayer({ radius, height, y, color }: { radius: number; height: number; y: number; color: string }) {
  return (
    <group position={[0, y, 0]}>
      <mesh>
        <cylinderGeometry args={[radius, radius, height, 120]} />
        <meshStandardMaterial color={color} roughness={0.52} metalness={0.02} transparent opacity={0.88} />
      </mesh>
      <mesh position={[0, height / 2 + 0.022, 0]}>
        <cylinderGeometry args={[radius * 1.025, radius * 1.025, 0.065, 120]} />
        <meshStandardMaterial color="#effcff" emissive="#9cecff" emissiveIntensity={0.2} transparent opacity={0.96} />
      </mesh>
    </group>
  );
}

function Flame({ index }: { index: number }) {
  const ref = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    const s = 1 + Math.sin(clock.elapsedTime * 8 + index) * 0.14;
    ref.current.scale.set(s, 1.25 + (s - 1), s);
  });
  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[0.16, 24, 24]} />
        <meshBasicMaterial color="#ffbf35" transparent opacity={0.92} />
      </mesh>
      <mesh position={[0, 0.05, 0]}>
        <sphereGeometry args={[0.082, 18, 18]} />
        <meshBasicMaterial color="#fff3aa" transparent opacity={0.9} />
      </mesh>
      <pointLight color="#ffc247" intensity={0.82} distance={2.2} />
    </group>
  );
}

export default function CakeModel() {
  const group = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    group.current.rotation.y = clock.elapsedTime * 0.1;
    group.current.position.y = -0.2 + Math.sin(clock.elapsedTime * 0.8) * 0.035;
  });
  const candles = [-1.05, -0.35, 0.35, 1.05];
  return (
    <group ref={group} rotation={[0.18, 0.25, 0]}>
      <SoftLayer radius={2.22} height={0.78} y={-0.72} color="#5bcfff" />
      <SoftLayer radius={1.58} height={0.66} y={-0.04} color="#8ee6ff" />
      <SoftLayer radius={1.04} height={0.52} y={0.56} color="#c8f8ff" />
      <GlitterCloud />
      <Text position={[0, 1.18, 0.04]} fontSize={0.3} color="#ffffff" anchorX="center" anchorY="middle" outlineWidth={0.012} outlineColor="#4aa3c7">20</Text>
      {candles.map((x, i) => (
        <group key={x} position={[x, 1.12, i % 2 ? -0.16 : 0.16]}>
          <mesh>
            <cylinderGeometry args={[0.07, 0.07, 0.68, 22]} />
            <meshStandardMaterial color="#effbff" emissive="#7dd3fc" emissiveIntensity={0.48} roughness={0.34} transparent opacity={0.9} />
          </mesh>
          <group position={[0, 0.48, 0]}><Flame index={i} /></group>
        </group>
      ))}
    </group>
  );
}
