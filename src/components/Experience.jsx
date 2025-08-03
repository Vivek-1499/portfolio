import {
  ContactShadows,
  Environment,
  OrbitControls,
  Sky,
} from "@react-three/drei";
import { Avatar } from "./Avatar";
import { useControls } from "leva";
import { useEffect, useRef, useState } from "react";
import { ProjectBook } from "./ProjectBook";

export const Experience = () => {
  const { animation } = useControls({
    animation: {
      value: "Waving",
      options: ["Waving", "Walking", "Bored", "Standing", "Reading"],
    },
  });
  const avatarRef = useRef();
  const [currentAnimation, setCurrentAnimation] = useState("Waving");
  useEffect(() => {
    let timeoutId;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const newScrollY = window.scrollY;

      if (newScrollY !== lastScrollY) {
        setCurrentAnimation("Walking");

        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setCurrentAnimation("Standing");
        }, 2000); // After 2s of no scroll, switch to bored
      }

      lastScrollY = newScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    // Start with waving, then switch to bored after 5s
    const wavingTimer = setTimeout(() => {
      setCurrentAnimation("Standing");
    }, 2000);

    return () => {
      clearTimeout(wavingTimer);
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <ambientLight intensity={2} />
      <directionalLight position={[-5, 5, 5]} intensity={1.5} castShadow />
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}t5dxv
        position={[0, -1, 0]}
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
        <Avatar animation={currentAnimation} ref={avatarRef} />
        <ProjectBook position={[3, 0, 0]}/>
      </group>
    </>
  );
};
