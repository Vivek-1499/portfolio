import React, { useEffect, useMemo, useRef, useState } from "react";
import { pageAtom, pages, projectsData } from "./UI";
import {
  Bone,
  BoxGeometry,
  Color,
  Float32BufferAttribute,
  MeshStandardMaterial,
  Skeleton,
  SkinnedMesh,
  SRGBColorSpace,
  Uint16BufferAttribute,
  Vector3,
  CanvasTexture,
  TextureLoader,
} from "three";
import { useCursor, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { degToRad } from "three/src/math/MathUtils.js";
import { useAtom } from "jotai";
import { easing } from "maath";
import { Html } from "@react-three/drei";

const easingFactor = 0.5;
const easingFactorFold = 0.3;
const insideCurveStrength = 0.15;
const outsideCurveStrength = 0.02;
const turningCurveStrength = 0.04;

const PAGE_WIDTH = 1.9;
const PAGE_HEIGHT = 2.11;
const PAGE_DEPTH = 0.003;
const PAGE_SEGMENTS = 30;
const SEGMENT_WIDTH = PAGE_WIDTH / PAGE_SEGMENTS;

const pageGeometry = new BoxGeometry(
  PAGE_WIDTH,
  PAGE_HEIGHT,
  PAGE_DEPTH,
  PAGE_SEGMENTS,
  2
);

pageGeometry.translate(PAGE_WIDTH / 2, 0, 0);
const position = pageGeometry.attributes.position;
const vertex = new Vector3();
const skinIndexes = [];
const skinWeights = [];

for (let i = 0; i < position.count; i++) {
  vertex.fromBufferAttribute(position, i);
  const x = vertex.x;

  const skinIndex = Math.max(0, Math.floor(x / SEGMENT_WIDTH));
  const skinWeight = (x % SEGMENT_WIDTH) / SEGMENT_WIDTH;

  skinIndexes.push(skinIndex, skinIndex + 1, 0, 0);
  skinWeights.push(1 - skinWeight, skinWeight, 0, 0);
}

pageGeometry.setAttribute(
  "skinIndex",
  new Uint16BufferAttribute(skinIndexes, 4)
);
pageGeometry.setAttribute(
  "skinWeight",
  new Float32BufferAttribute(skinWeights, 4)
);

const whiteColor = new Color("white");

const pageMaterials = [
  new MeshStandardMaterial({ color: whiteColor }),
  new MeshStandardMaterial({ color: "#111" }),
  new MeshStandardMaterial({ color: whiteColor }),
  new MeshStandardMaterial({ color: whiteColor }),
];

// Function to create text texture
const createTextTexture = (content, type, pageData) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 1024;
  canvas.height = 1024;

  // Dark background for all pages
  ctx.fillStyle = "#2d3748"; // Dark gray
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (type === "cover") {
    // Cover page design - darker
    ctx.fillStyle = "#1a202c";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Title
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 80px Arial";
    ctx.textAlign = "center";
    ctx.fillText("MY PROJECTS", canvas.width / 2, 300);

    // Subtitle
    ctx.fillStyle = "#a0aec0";
    ctx.font = "32px Arial";
    ctx.fillText("Interactive Portfolio", canvas.width / 2, 380);

    // Instructions
    ctx.fillStyle = "#718096";
    ctx.font = "24px Arial";
    ctx.textAlign = "left";
    const instructions = [
      "How to Navigate:",
      "• Click and drag to rotate",
      "• Click pages to flip",
      "• Each project has details & links",
    ];

    instructions.forEach((line, i) => {
      ctx.fillText(line, 150, 500 + i * 40);
    });
  } else if (
    type.startsWith("project-") &&
    type.includes("-info") &&
    pageData?.project
  ) {
    // Project info page (left side) - MORE DETAILED CONTENT
    const project = pageData.project;

    let yPos = 60;

    // Project title
    ctx.fillStyle = "#63b3ed";
    ctx.font = "bold 48px Arial";
    ctx.textAlign = "left";
    ctx.fillText(project.title, 60, yPos);
    yPos += 80;

    // Description
    ctx.fillStyle = "#ffffff";
    ctx.font = "26px Arial";
    const words = project.description.split(" ");
    let line = "";
    const maxWidth = canvas.width - 120;

    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + " ";
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;

      if (testWidth > maxWidth && i > 0) {
        ctx.fillText(line, 60, yPos);
        line = words[i] + " ";
        yPos += 38;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 60, yPos);
    yPos += 70;

    // Technologies
    ctx.fillStyle = "#9f7aea";
    ctx.font = "bold 32px Arial";
    ctx.fillText("Technologies:", 60, yPos);
    yPos += 55;

    ctx.fillStyle = "#e2e8f0";
    ctx.font = "24px Arial";
    project.technologies.forEach((tech, i) => {
      ctx.fillText(`• ${tech}`, 80, yPos);
      yPos += 40;
    });

    yPos += 30;

    // Key Features
    ctx.fillStyle = "#48bb78";
    ctx.font = "bold 32px Arial";
    ctx.fillText("Key Features:", 60, yPos);
    yPos += 55;

    ctx.fillStyle = "#e2e8f0";
    ctx.font = "24px Arial";
    project.features.forEach((feature, i) => {
      // Handle long features by wrapping text
      const words = feature.split(" ");
      let line = "";
      const maxWidth = canvas.width - 140;

      for (let j = 0; j < words.length; j++) {
        const testLine = line + words[j] + " ";
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;

        if (testWidth > maxWidth && j > 0) {
          ctx.fillText(`• ${line}`, 80, yPos);
          line = words[j] + " ";
          yPos += 35;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(`• ${line}`, 80, yPos);
      yPos += 35;
    });
  } else if (
    type.startsWith("project-") &&
    type.includes("-image") &&
    pageData?.project
  ) {
    // Project image page (right side) - SIMPLIFIED WITH JUST IMAGE AND LINKS
    const project = pageData.project;

    // Background
    ctx.fillStyle = "#2d3748";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Image placeholder area (larger)
    const imageArea = {
      x: 60,
      y: 60,
      width: canvas.width - 120,
      height: 500,
    };

    // Try to load actual image, fallback to placeholder
    ctx.fillStyle = "#4a5568";
    ctx.fillRect(imageArea.x, imageArea.y, imageArea.width, imageArea.height);
    ctx.strokeStyle = "#718096";
    ctx.lineWidth = 2;
    ctx.strokeRect(imageArea.x, imageArea.y, imageArea.width, imageArea.height);

    // Placeholder content
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 32px Arial";
    ctx.textAlign = "center";
    ctx.fillText(
      "Project Screenshot",
      canvas.width / 2,
      imageArea.y + imageArea.height / 2 - 20
    );

    ctx.fillStyle = "#a0aec0";
    ctx.font = "24px Arial";
    ctx.fillText(
      project.title,
      canvas.width / 2,
      imageArea.y + imageArea.height / 2 + 20
    );

    let yPos = imageArea.y + imageArea.height + 80;

    // Links section
    ctx.fillStyle = "#f56565";
    ctx.font = "bold 36px Arial";
    ctx.textAlign = "left";
    ctx.fillText("Project Links:", 60, yPos);
    yPos += 70;

    // GitHub link box
    const linkHeight = 90;
    const linkMargin = 20;

    ctx.fillStyle = "#4a5568";
    ctx.fillRect(60, yPos, canvas.width - 120, linkHeight);
    ctx.strokeStyle = "#718096";
    ctx.lineWidth = 2;
    ctx.strokeRect(60, yPos, canvas.width - 120, linkHeight);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 28px Arial";
    ctx.fillText("📁 View Source Code", 100, yPos + 35);
    ctx.font = "20px Arial";
    ctx.fillStyle = "#cbd5e0";
    ctx.fillText("GitHub Repository", 100, yPos + 65);
    yPos += linkHeight + linkMargin;

    // Live demo link box
    ctx.fillStyle = "#3182ce";
    ctx.fillRect(60, yPos, canvas.width - 120, linkHeight);
    ctx.strokeStyle = "#4299e1";
    ctx.lineWidth = 2;
    ctx.strokeRect(60, yPos, canvas.width - 120, linkHeight);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 28px Arial";
    ctx.fillText("🌐 Live Demo", 100, yPos + 35);
    ctx.font = "20px Arial";
    ctx.fillStyle = "#bee3f8";
    ctx.fillText("Visit Application", 100, yPos + 65);
  } else if (type === "back-cover") {
    // Back cover
    ctx.fillStyle = "#1a202c";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 64px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Thank You!", canvas.width / 2, 400);

    ctx.fillStyle = "#a0aec0";
    ctx.font = "32px Arial";
    ctx.fillText("For exploring my projects", canvas.width / 2, 480);
  } else if (type === "contact-info") {
    // Contact info
    ctx.fillStyle = "#2d3748";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0bc5ea";
    ctx.font = "bold 48px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Let's Connect!", canvas.width / 2, 250);

    ctx.fillStyle = "#ffffff";
    ctx.font = "32px Arial";
    ctx.textAlign = "left";
    const contactInfo = [
      "📧 vivek@example.com",
      "💼 linkedin.com/in/vivekpandit",
      "🐙 github.com/vivekpandit",
      "🌐 vivekpandit.dev",
    ];

    contactInfo.forEach((line, i) => {
      ctx.fillText(line, 150, 350 + i * 60);
    });
  } else if (type === "back-cover-final") {
    // Final back cover
    ctx.fillStyle = "#1a202c";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 64px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Portfolio", canvas.width / 2, 400);

    ctx.fillStyle = "#a0aec0";
    ctx.font = "32px Arial";
    ctx.fillText("Vivek Pandit", canvas.width / 2, 480);

    ctx.fillStyle = "#718096";
    ctx.font = "24px Arial";
    ctx.fillText("Full Stack Developer", canvas.width / 2, 520);
  }

  return new CanvasTexture(canvas);
};

// Function to create image texture from URL
const createImageTexture = (imageUrl, project) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 1024;
  canvas.height = 1024;

  // Dark background
  ctx.fillStyle = "#2d3748";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Try to load the image
  const img = new Image();
  img.crossOrigin = "anonymous";

  img.onload = () => {
    // Clear canvas
    ctx.fillStyle = "#2d3748";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Calculate image dimensions to fit nicely
    const imageArea = {
      x: 60,
      y: 60,
      width: canvas.width - 120,
      height: 500,
    };

    // Draw the image
    ctx.drawImage(
      img,
      imageArea.x,
      imageArea.y,
      imageArea.width,
      imageArea.height
    );

    // Add project info below image
    let yPos = imageArea.y + imageArea.height + 60;

    // Links section
    ctx.fillStyle = "#f56565";
    ctx.font = "bold 36px Arial";
    ctx.textAlign = "left";
    ctx.fillText("Project Links:", 60, yPos);
    yPos += 70;

    // GitHub link box
    const linkHeight = 90;
    const linkMargin = 20;

    ctx.fillStyle = "#4a5568";
    ctx.fillRect(60, yPos, canvas.width - 120, linkHeight);
    ctx.strokeStyle = "#718096";
    ctx.lineWidth = 2;
    ctx.strokeRect(60, yPos, canvas.width - 120, linkHeight);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 28px Arial";
    ctx.fillText("📁 View Source Code", 100, yPos + 35);
    ctx.font = "20px Arial";
    ctx.fillStyle = "#cbd5e0";
    ctx.fillText("GitHub Repository", 100, yPos + 65);
    yPos += linkHeight + linkMargin;

    // Live demo link box
    ctx.fillStyle = "#3182ce";
    ctx.fillRect(60, yPos, canvas.width - 120, linkHeight);
    ctx.strokeStyle = "#4299e1";
    ctx.lineWidth = 2;
    ctx.strokeRect(60, yPos, canvas.width - 120, linkHeight);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 28px Arial";
    ctx.fillText("🌐 Live Demo", 100, yPos + 35);
    ctx.font = "20px Arial";
    ctx.fillStyle = "#bee3f8";
    ctx.fillText("Visit Application", 100, yPos + 65);
  };

  img.onerror = () => {
    // Fallback to placeholder if image fails to load
    console.log("Failed to load image:", imageUrl);
  };

  // Set the source - this will trigger onload or onerror
  img.src = imageUrl;

  return new CanvasTexture(canvas);
};

const Page = ({
  number,
  front,
  back,
  page,
  opened,
  bookClosed,
  pageData,
  ...props
}) => {
  const group = useRef();
  const turnedAt = useRef(0);
  const lastOpened = useRef(opened);
  const skinnedMeshRef = useRef();

  // Create textures based on page content
  const frontTexture = useMemo(() => {
    if (front.includes("-image") && pageData?.project) {
      return createImageTexture(pageData.project.image, pageData.project);
    }
    return createTextTexture(front, front, pageData);
  }, [front, pageData]);

  const backTexture = useMemo(() => {
    if (back.includes("-image") && pageData?.nextProject) {
      return createImageTexture(
        pageData.nextProject.image,
        pageData.nextProject
      );
    }
    return createTextTexture(back, back, {
      ...pageData,
      project: pageData?.nextProject || pageData?.project,
    });
  }, [back, pageData]);

  const manualSkinnedMesh = useMemo(() => {
    const bones = [];
    for (let i = 0; i <= PAGE_SEGMENTS; i++) {
      let bone = new Bone();
      bones.push(bone);
      bone.position.x = i === 0 ? 0 : SEGMENT_WIDTH;
      if (i > 0) {
        bones[i - 1].add(bone);
      }
    }
    const skeleton = new Skeleton(bones);
    const materials = [
      ...pageMaterials,
      new MeshStandardMaterial({
        color: whiteColor,
        map: frontTexture,
        roughness: 0.1,
      }),
      new MeshStandardMaterial({
        color: whiteColor,
        map: backTexture,
        roughness: 0.1,
      }),
    ];
    const mesh = new SkinnedMesh(pageGeometry, materials);
    mesh.receiveShadow = true;
    mesh.frustumCulled = false;
    mesh.add(bones[0]);
    mesh.bind(skeleton);
    return mesh;
  }, [frontTexture, backTexture]);

  useFrame((_, delta) => {
    if (!skinnedMeshRef.current) return;

    if (lastOpened.current !== opened) {
      turnedAt.current = +new Date();
      lastOpened.current = opened;
    }

    let turningTime = Math.min(400, new Date() - turnedAt.current) / 400;
    turningTime = Math.sin(turningTime * Math.PI);

    let targetRotation = opened ? -Math.PI / 2 : Math.PI / 2;
    if (!bookClosed) {
      targetRotation += degToRad(number * 0.8);
    }

    const bones = skinnedMeshRef.current.skeleton.bones;
    for (let i = 0; i < bones.length; i++) {
      const target = i === 0 ? group.current : bones[i];
      const insideCurveIntensity = i < 8 ? Math.sin(i * 0.2 + 0.25) : 0;
      const outsideCurveIntensity = i >= 8 ? Math.cos(i * 0.3 + 0.09) : 0;
      const turningIntensity =
        Math.sin(i * Math.PI * (1 / bones.length)) * turningTime;

      let rotationAngle =
        insideCurveStrength * insideCurveIntensity * targetRotation -
        outsideCurveStrength * outsideCurveIntensity * targetRotation +
        turningCurveStrength * turningIntensity * targetRotation;

      let foldRotationAngle = degToRad(Math.sign(targetRotation) * 2);
      if (bookClosed) {
        if (i === 0) {
          rotationAngle = targetRotation;
        } else {
          rotationAngle = 0;
        }
        foldRotationAngle = 0;
      }

      easing.dampAngle(
        target.rotation,
        "y",
        rotationAngle,
        easingFactor,
        delta
      );

      const foldIntensity =
        i > 8
          ? Math.sin(i * Math.PI * (1 / bones.length) - 0.5) * turningTime
          : 0;

      easing.dampAngle(
        target.rotation,
        "x",
        foldRotationAngle * foldIntensity,
        easingFactorFold,
        delta
      );
    }
  });

  const [_, setPage] = useAtom(pageAtom);
  const [highlighted, setHighLighted] = useState(false);
  useCursor(highlighted);

  return (
    <group
      {...props}
      ref={group}
      onPointerEnter={(e) => {
        e.stopPropagation();
        setHighLighted(true);
      }}
      onPointerLeave={(e) => {
        e.stopPropagation();
        setHighLighted(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        setPage(opened ? number : number + 1);
        setHighLighted(false);
      }}>
      <primitive
        object={manualSkinnedMesh}
        ref={skinnedMeshRef}
        position-z={-number * PAGE_DEPTH + page * PAGE_DEPTH}
      />

      {/* ✅ Add clickable links when this is an image page */}
      {front.includes("-image") && pageData?.project && (
        <Html
          transform
          distanceFactor={1.3}
          position={[0.95, -0.8, 0.01]} // adjust to align with page
          style={{ width: "250px", textAlign: "left" }}>
          <div className="flex flex-col gap-2 bg-black/70 p-3 rounded-lg">
            {pageData.project.id && (
              <a
                href={`/projects/${pageData.project.id}`}
                className="underline text-purple-400">
                📑 Details Page
              </a>
            )}
            {pageData.project.liveUrl && (
              <a
                href={pageData.project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-green-400">
                🌐 Live Demo
              </a>
            )}
          </div>
        </Html>
      )}
    </group>
  );
};

const ProjectBook = ({ ...props }) => {
  const [page] = useAtom(pageAtom);
  const [delayedPage, setDelayedPage] = useState(page);

  useEffect(() => {
    let timeout;
    const goToPage = () => {
      setDelayedPage((currentDelayedPage) => {
        if (page === currentDelayedPage) {
          return currentDelayedPage;
        }

        timeout = setTimeout(
          goToPage,
          Math.abs(page - currentDelayedPage) > 2 ? 50 : 150
        );

        if (page > currentDelayedPage) {
          return currentDelayedPage + 1;
        } else {
          return currentDelayedPage - 1;
        }
      });
    };

    goToPage();

    return () => {
      clearTimeout(timeout);
    };
  }, [page]);

  return (
    <group {...props} rotation-y={-Math.PI / 2}>
      {[...pages].map((pageData, index) => (
        <Page
          key={index}
          page={delayedPage}
          number={index}
          opened={delayedPage > index}
          pageData={pageData}
          {...pageData}
        />
      ))}
    </group>
  );
};
export default ProjectBook;
