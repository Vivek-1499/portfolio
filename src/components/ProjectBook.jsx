import React, { useRef } from "react";
import { pages } from "./UI";

const Page = ({ number, front, back, ...props }) => {
  const group = useRef();
  return (
    <group {...props} ref={group}>
      <mesh scale={0.5} position={[0, 1, 0]}>
        <boxGeometry args={[2, 3, 0.3]}/>
        <meshBasicMaterial color="red" />
      </mesh>
    </group>
  );
};

const ProjectBook = ({ ...props }) => {
  return (
    <group {...props} >
      {[...pages].map((pageData, index) => (
        <Page key={index} number={index} {...pageData} />
      ))}
    </group>
  );
};

export default ProjectBook;
