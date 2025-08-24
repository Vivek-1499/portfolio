import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";

const ScrollManager = ({ section, onSectionChange }) => {
  const data = useScroll();
  const lastSection = useRef(0);
  const isScrolling = useRef(false);

  useFrame(() => {
    if (!isScrolling.current) {
      const current = data.scroll.current;
      const currentSection = Math.floor(current * data.pages);

      if (currentSection !== lastSection.current) {
        lastSection.current = currentSection;
        onSectionChange(currentSection);
      }
    }
  });

  // Handle programmatic scrolling when section changes from menu
  useEffect(() => {
    if (section !== lastSection.current && data.el) {
      isScrolling.current = true;
      const targetScroll = section / data.pages;

      // Smooth scroll to target section
      data.el.scrollTo({
        top: targetScroll * data.el.scrollHeight,
        behavior: "smooth",
      });

      // Reset scrolling flag after animation
      setTimeout(() => {
        isScrolling.current = false;
        lastSection.current = section;
      }, 1000);
    }
  }, [section, data]);

  return null;
};

export default ScrollManager;
