import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Loader, Scroll, ScrollControls } from "@react-three/drei";
import Interface from "./components/Interface";
import { Suspense, useState } from "react";
import ScrollManager from "./components/ScrollManager";
import Menu from "./components/Menu";

function App() {
  const [section, setSection] = useState(0);
  return (
    <>
      <Menu onSectionChange={setSection} section={section} />

      <Canvas
        shadows
        gl={{ antialias: true }}
        camera={{ position: [0, 2, 5], fov: 30 }}>
        <color attach="background" args={["#1a1a1a"]} />
        <ScrollControls pages={4} damping={0.1}>
          <ScrollManager section={section} onSectionChange={setSection} />
          <Experience section={section} />
          <Scroll html>
            <Interface section={section} />
          </Scroll>
        </ScrollControls>
      </Canvas>
      <Loader />
    </>
  );
}

export default App;
