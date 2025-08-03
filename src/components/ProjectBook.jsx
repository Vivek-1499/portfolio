import React, { useState } from "react";
import { motion } from 'framer-motion';
import { Html, useTexture } from "@react-three/drei";
import { useDrag } from "@use-gesture/react";
import * as THREE from "three";
import {projects} from "../../data/projectData"

// HTML content for a project page
const ProjectInfoPage = ({ project }) => (
  <div className="w-full h-full bg-slate-100 p-6 md:p-8 overflow-y-auto pointer-events-auto select-text">
    <div className="text-gray-800">
      <h2 className="text-xl md:text-3xl font-bold mb-4 text-indigo-700">{project.title}</h2>
      <p className="text-sm md:text-base mb-6">{project.description}</p>
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors text-sm md:text-base"
        onClick={(e) => e.stopPropagation()} // Prevents parent handlers from firing
      >
        View on GitHub
      </a>
    </div>
  </div>
);

// Texture for an image page
const ProjectImagePage = ({ imageSrc }) => {
  const texture = useTexture(imageSrc);
  texture.flipY = false;
  return <meshStandardMaterial map={texture} side={THREE.FrontSide} />;
};

export const ProjectBook = (props) => {
  const [currentPage, setCurrentPage] = useState(-1); // -1: closed, 0: cover, 1+: pages
  const pageCount = projects.length;

  const handlePageTurn = (direction) => {
    const newPage = Math.max(-1, Math.min(pageCount, currentPage + direction));
    setCurrentPage(newPage);
  };

  const bind = useDrag(
    ({ swipe: [swipeX], down }) => {
      if (currentPage !== -1 && !down) {
        handlePageTurn(-swipeX); // swipe left (-1) -> next, swipe right (1) -> prev
      }
    },
    { axis: "x", swipe: { distance: 40, duration: 250, velocity: 0.5 } }
  );

  return (
    <group {...props} {...bind()} scale={0.5} rotation-y={0.25} position-y={1.8}>
      {/* Invisible click/swipe areas for page turning */}
      {currentPage > -1 && (
        <>
          <mesh onClick={() => handlePageTurn(-1)} position={[-5.5, 0, 0]}>
            <planeGeometry args={[5, 8]} />
            <meshBasicMaterial transparent opacity={0} />
          </mesh>
          <mesh onClick={() => handlePageTurn(1)} position={[5.5, 0, 0]}>
            <planeGeometry args={[5, 8]} />
            <meshBasicMaterial transparent opacity={0} />
          </mesh>
        </>
      )}

      {/* Back Cover */}
      <group position-x={0.1}>
        <mesh>
          <boxGeometry args={[5.2, 7.2, 0.2]} />
          <meshStandardMaterial color="#282361" />
        </mesh>
      </group>

      {/* Pages */}
      {projects.map((project, index) => (
        <motion.group
          key={index}
          position-x={0.1}
          animate={{ rotateY: currentPage > index ? -Math.PI : 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        >
          <group position-x={2.5}>
            <mesh>
              <planeGeometry args={[5, 7]} />
              <Html transform position-z={0.01} className="w-[490px] h-[690px] pointer-events-none select-none">
                <ProjectInfoPage project={project} />
              </Html>
            </mesh>
            <mesh rotation-y={Math.PI}>
              <planeGeometry args={[5, 7]} />
              <ProjectImagePage imageSrc={project.image} />
            </mesh>
          </group>
        </motion.group>
      ))}

      {/* Front Cover */}
      <motion.group
        position-x={-0.1}
        onClick={() => currentPage === -1 && setCurrentPage(0)}
        animate={{ rotateY: currentPage > -1 ? -Math.PI : 0 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
      >
        <group position-x={2.5}>
          <mesh>
            <boxGeometry args={[5.2, 7.2, 0.2]} />
            <meshStandardMaterial color="#3730a3" />
            <Html transform position-z={0.11} className="w-[520px] h-[720px] pointer-events-none">
              <div className="flex flex-col items-center justify-center h-full text-white text-center p-4">
                <h1 className="text-6xl font-bold">Projects</h1>
                <p className="mt-4 text-lg">Click to open</p>
                <p className="mt-2 text-sm">(Swipe or click sides to turn pages)</p>
              </div>
            </Html>
          </mesh>
          <mesh rotation-y={Math.PI}>
            <planeGeometry args={[5, 7]} />
            <ProjectImagePage imageSrc={"/images/image4.png"} />
          </mesh>
        </group>
      </motion.group>
    </group>
  );
};