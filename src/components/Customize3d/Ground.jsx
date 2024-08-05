import React from 'react';
import { useTexture } from '@react-three/drei';

function Ground() {
  const groundTexture = useTexture("/ground.jpg");
  const wallTexture = useTexture("/ground.jpg");

  return (
    <>
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -28.5, 0]} receiveShadow>
        <planeGeometry args={[1000, 1000]} />
        <meshStandardMaterial color="#3f3f3f" />
      </mesh>
    </>
  );
}

export default Ground;
