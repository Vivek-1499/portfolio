import React, { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { ContactShadows, Environment } from "@react-three/drei";
import { Avatar } from "./Avatar";
import ProjectBook from "./ProjectBook";
import * as THREE from "three";

export const Experience = ({ section }) => {
  const avatarRef = useRef();
  const bookRef = useRef();

  // State to manage the avatar's animation sequence
  const [animation, setAnimation] = useState("Waving");

  // On first load, wave for 2 seconds, then switch to Standing.
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimation("Standing");
    }, 2000);
    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, []);

  // Determine the correct animation based on state and scroll section
  const sectionAnimation = section === 2 ? "Reading" : "Standing";
  const finalAnimation = animation === "Waving" ? "Waving" : sectionAnimation;

  useFrame(() => {
    const avatar = avatarRef.current;
    const book = bookRef.current;

    if (!avatar || !book) return;

    if (section === 2) {
      // Projects section: Avatar moves left, book appears right
      avatar.position.x = THREE.MathUtils.lerp(avatar.position.x, -1.5, 0.05);
      book.position.y = THREE.MathUtils.lerp(book.position.y, 0, 0.05);
      book.position.x = THREE.MathUtils.lerp(book.position.x, 1.5, 0.05);
      book.rotation.y = THREE.MathUtils.lerp(book.rotation.y, -Math.PI / 8, 0.05);
    } else {
      // Other sections: Avatar is centered, book is hidden
      avatar.position.x = THREE.MathUtils.lerp(avatar.position.x, 0, 0.05);
      book.position.y = THREE.MathUtils.lerp(book.position.y, -3, 0.05);
      book.position.x = THREE.MathUtils.lerp(book.position.x, 0, 0.05);
      book.rotation.y = THREE.MathUtils.lerp(book.rotation.y, 0, 0.05);
    }
  });

  return (
    <>
      <ambientLight intensity={2} />
      <directionalLight position={[-5, 5, 5]} intensity={1.5} castShadow />
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1, 0]}
        receiveShadow
      >
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

        <group ref={avatarRef}>
          <Avatar animation={finalAnimation} />
        </group>

        <group ref={bookRef} position-y={-5}>
          <ProjectBook />
        </group>
      </group>
    </>
  );
};