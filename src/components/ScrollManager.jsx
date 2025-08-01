import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";

const ScrollManager = ({ onSectionChange }) => {
  const data = useScroll();
  const lastSection = useRef(0);

  useFrame(() => {
    const current = data.scroll.current;
    const currentSection = Math.floor(current * data.pages);

    if (currentSection !== lastSection.current) {
      lastSection.current = currentSection;
      onSectionChange(currentSection);
    }
  });

  return null;
};

export default ScrollManager;
  