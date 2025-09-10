import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Loader, Scroll, ScrollControls } from "@react-three/drei";
import Interface from "./components/Interface";
import { Suspense, useState } from "react";
import ScrollManager from "./components/ScrollManager";
import Menu from "./components/Menu";
import { useAtom } from "jotai";
import { pageAtom } from "./components/UI";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProjectDetails from "./components/ProjectDetails";
import SaveiorDetails from "./components/SaveiorDetails";
import SoMoDetails from "./components/SoMoDetsils";
import CodeGeniusDetails from "./components/CodeGeniusDetails";
import DashboardDetails from "./components/DashboardDetails";

// Add global CSS for smooth scrolling
const globalStyles = `
  html {
    scroll-behavior: smooth;
  }
  
  body {
    overflow-x: hidden;
  }
  
  /* Custom scrollbar for project detail pages */
  .project-detail-page::-webkit-scrollbar {
    width: 8px;
  }
  
  .project-detail-page::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }
  
  .project-detail-page::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
  }
  
  .project-detail-page::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
  }
`;

// Inject global styles
if (typeof document !== "undefined") {
  const existingStyle = document.getElementById("global-app-styles");
  if (!existingStyle) {
    const style = document.createElement("style");
    style.id = "global-app-styles";
    style.textContent = globalStyles;
    document.head.appendChild(style);
  }
}

function Home() {
  const [section, setSection] = useState(0);
  const [page] = useAtom(pageAtom);

  return (
    <>
      <Menu onSectionChange={setSection} section={section} />   


      <Canvas
        shadows
        gl={{ antialias: true }}
        camera={{ position: [0, 2, 5], fov: 30 }}
      >
        <color attach="background" args={["#1a1a1a"]} />
        <ScrollControls pages={4} damping={0.1}>
          <ScrollManager section={section} onSectionChange={setSection} />
          <Experience section={section} currentPage={page}  />
          <Scroll html>
            <Interface section={section} />
          </Scroll>
        </ScrollControls>
      </Canvas>

      <Loader />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/1" element={<SaveiorDetails />} />
        <Route path="/project/2" element={<SoMoDetails />} />
        <Route path="/project/3" element={<CodeGeniusDetails />} />
        <Route path="/project/4" element={<DashboardDetails />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
      </Routes>
    </Router>
  );
}

export default App;