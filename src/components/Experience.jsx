import {
  ContactShadows,
  Environment,
  OrbitControls,
  Sky,
} from "@react-three/drei";
import { Avatar } from "./Avatar";
import { useControls } from "leva";
import { useRef } from "react";

export const Experience = () => {
  const { animation } = useControls({
    animation: {
      value: "Waving",
      options: ["Waving", "Walking", "Bored", "Standing", "Reading"],
    },
  });
  const avatarRef = useRef();
  return (
    <>
      <ambientLight intensity={2} />
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}t5dxv
        position={[0, -1, 0]}
        position-y={-0.001}
        receiveShadow>
        <planeGeometry args={[20, 20]} />
        <shadowMaterial opacity={0.5} transparent color="#000000" />
      </mesh>
      <group position-y={-1}>
        <ContactShadows
          opacity={0.7}
          scale={10}
          blur={0.7}
          far={5}
          resolution={256}
          color="#000000"
        />
        <Avatar animation={animation} ref={avatarRef} />
      </group>
    </>
  );
};
