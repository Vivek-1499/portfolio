import { Float, Html, RoundedBox } from "@react-three/drei";
import { useState } from "react";

// Switched to Lucide React icons for stability in the preview environment
import {
  Atom,
  Code2,
  Coffee,
  Database,
  FileCode,
  GitBranch,
  PenTool,
  Server,
  Wind
} from "lucide-react";

const SkillItem = ({ position, icon: Icon, name, color }) => {
  const [hovered, setHover] = useState(false);

  return (
    <Float
      speed={2} // Animation speed
      rotationIntensity={1.5} // Floating rotation (approx 5-10 degrees)
      floatIntensity={2} // Floating range
    >
      <group position={position}>
        <mesh
          onPointerOver={() => {
            document.body.style.cursor = "pointer";
            setHover(true);
          }}
          onPointerOut={() => {
            document.body.style.cursor = "auto";
            setHover(false);
          }}
          scale={hovered ? 1.2 : 1} // Scale up on hover
        >
          {/* CHAMFERED CUBE (RoundedBox) */}
          <RoundedBox args={[1.3, 1.3, 1.3]} radius={0.1} smoothness={4}>
            <meshStandardMaterial
              color={hovered ? "#6366f1" : "#1e293b"} // Indigo on hover, SlateDark on idle
              roughness={0.3}
              metalness={0.8}
            />
          </RoundedBox>

          {/* HTML Overlay for Icon & Text */}
          <Html
            transform
            distanceFactor={1.5}
            position={[0, 0, 0.66]} // Slightly in front of the cube face
            style={{ pointerEvents: "none" }} // Allow clicks to pass through to mesh
          >
            <div className="flex flex-col items-center justify-center select-none text-center">
              <Icon size={40} color={color || "white"} />
              <p className="text-xs font-bold mt-1 text-white opacity-90 whitespace-nowrap">
                {name}
              </p>
            </div>
          </Html>
        </mesh>
      </group>
    </Float>
  );
};

export const Skills = () => {
  // Define your skills data here
  const skills = [
    { name: "React", icon: Atom, position: [-2, 2, 0], color: "#61dafb" },
    { name: "Node.js", icon: Server, position: [0, 2, 0], color: "#339933" },
    { name: "Java", icon: Coffee, position: [2, 2, 0], color: "#e76f00" },
    { name: "Python", icon: Code2, position: [-2, 0, 0], color: "#3776ab" },
    { name: "Tailwind", icon: Wind, position: [0, 0, 0], color: "#38b2ac" },
    { name: "HTML", icon: FileCode, position: [2, 0, 0], color: "#e34f26" },
    { name: "MongoDB", icon: Database, position: [-2, -2, 0], color: "#47a248" },
    { name: "Figma", icon: PenTool, position: [0, -2, 0], color: "#f24e1e" },
    { name: "Git", icon: GitBranch, position: [2, -2, 0], color: "#f05032" },
  ];

  return (
    <group position={[0, -0.5, 0]}> 
      {skills.map((skill, index) => (
        <SkillItem
          key={index}
          position={skill.position}
          icon={skill.icon}
          name={skill.name}
          color={skill.color}
        />
      ))}
    </group>
  );
};