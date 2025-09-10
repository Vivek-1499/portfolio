import React, { useEffect, useMemo, useRef, useState } from "react";
import { pageAtom, pages } from "./UI";
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
import { useNavigate } from "react-router-dom";
import { projectsData } from "../../data/projectsData";

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

const projectButtonLayout = {
  details: { x: 80, y: 620, width: 864, height: 80 },
  demo: { x: 80, y: 720, width: 864, height: 80 },
  github: { x: 80, y: 820, width: 864, height: 80 },
};

const contactLayout = {
  email: { y: 350 - 32, height: 32, url: "mailto:vivek.pandit1499@gmail.com" },
  linkedin: {
    y: 410 - 32,
    height: 32,
    url: "https://www.linkedin.com/in/vivek-pandit-368b012a7/",
  },
  github: { y: 470 - 32, height: 32, url: "https://github.com/Vivek-1499" },
  portfolio: {
    y: 530 - 32,
    height: 32,
    url: "https://vivek1499-portfolio.vercel.app",
  },
};

// Function to load and draw image on canvas
const loadImageOnCanvas = (ctx, imagePath, x, y, width, height) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      try {
        ctx.drawImage(img, x, y, width, height);
        resolve(true);
      } catch (error) {
        console.log('Error drawing image:', error);
        // Draw placeholder if image fails
        drawImagePlaceholder(ctx, x, y, width, height, imagePath);
        resolve(false);
      }
    };
    
    img.onerror = () => {
      console.log('Failed to load image:', imagePath);
      // Draw placeholder if image fails to load
      drawImagePlaceholder(ctx, x, y, width, height, imagePath);
      resolve(false);
    };
    
    img.src = imagePath;
  });
};

// Function to draw image placeholder
const drawImagePlaceholder = (ctx, x, y, width, height, title = "Project Image") => {
  // Placeholder background
  ctx.fillStyle = "#4a5568";
  ctx.fillRect(x, y, width, height);
  ctx.strokeStyle = "#718096";
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, width, height);

  // Placeholder text
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 24px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Project Screenshot", x + width / 2, y + height / 2 - 10);
  
  ctx.fillStyle = "#a0aec0";
  ctx.font = "18px Arial";
  const projectTitle = title.replace('/images/', '').replace('.png', '').replace('.jpg', '');
  ctx.fillText(projectTitle, x + width / 2, y + height / 2 + 20);
};

// Function to create text texture with embedded clickable areas
const createTextTexture = async (content, type, pageData) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 1024;
  canvas.height = 1024;

  // Dark background for all pages
  ctx.fillStyle = "#050709";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (type === "cover") {
    // Cover page design - darker
    ctx.fillStyle = "#050709";
    ctx.fillRect(0, 0, canvas.width, canvas.width);

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
      "• Click and drag to rotate book",
      "• Click pages to flip through projects",
      "• Click project buttons for details/links",
      "• Each project has embedded interactions",
    ];

    instructions.forEach((line, i) => {
      ctx.fillText(line, 100, 500 + i * 40);
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
    // Project image page (right side) - WITH ACTUAL IMAGE AND INTERACTIVE BUTTONS
    const project = pageData.project;

    // Background
    ctx.fillStyle = "#050709";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Image area
    const imageArea = {
      x: 60,
      y: 60,
      width: canvas.width - 120,
      height: 400,
    };

    // Try to load actual project image
    if (project.image) {
      try {
        await loadImageOnCanvas(ctx, project.image, imageArea.x, imageArea.y, imageArea.width, imageArea.height);
      } catch (error) {
        console.log('Error loading project image:', error);
        drawImagePlaceholder(ctx, imageArea.x, imageArea.y, imageArea.width, imageArea.height, project.title);
      }
    } else {
      drawImagePlaceholder(ctx, imageArea.x, imageArea.y, imageArea.width, imageArea.height, project.title);
    }

    let yPos = imageArea.y + imageArea.height + 80;

    // Interactive Buttons Section - EMBEDDED IN CANVAS
    ctx.fillStyle = "#f56565";
    ctx.font = "bold 36px Arial";
    ctx.textAlign = "left";
    ctx.fillText("🎯 Interactive Links:", 60, yPos);
    yPos += 80;

    // View Details Button
    const detailsButton = projectButtonLayout.details;

    // Button background with gradient effect
    const gradient1 = ctx.createLinearGradient(
      detailsButton.x,
      detailsButton.y,
      detailsButton.x,
      detailsButton.y + detailsButton.height
    );
    gradient1.addColorStop(0, "#4c51bf");
    gradient1.addColorStop(1, "#553c9a");
    ctx.fillStyle = gradient1;
    ctx.fillRect(
      detailsButton.x,
      detailsButton.y,
      detailsButton.width,
      detailsButton.height
    );

    // Button border
    ctx.strokeStyle = "#667eea";
    ctx.lineWidth = 3;
    ctx.strokeRect(
      detailsButton.x,
      detailsButton.y,
      detailsButton.width,
      detailsButton.height
    );

    // Button text
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 28px Arial";
    ctx.textAlign = "center";
    ctx.fillText("📑 View Full Details", canvas.width / 2, yPos + 35);
    ctx.font = "18px Arial";
    ctx.fillStyle = "#cbd5e0";
    ctx.fillText(
      "Complete project breakdown",
      canvas.width / 2,
      detailsButton.y + 60
    );

    // Live Demo Button
    if (project.liveUrl) {
      const demoButton = projectButtonLayout.demo;

      const gradient2 = ctx.createLinearGradient(
        demoButton.x,
        demoButton.y,
        demoButton.x,
        demoButton.y + demoButton.height
      );
      gradient2.addColorStop(0, "#48bb78");
      gradient2.addColorStop(1, "#38a169");
      ctx.fillStyle = gradient2;
      ctx.fillRect(
        demoButton.x,
        demoButton.y,
        demoButton.width,
        demoButton.height
      );

      ctx.strokeStyle = "#68d391";
      ctx.lineWidth = 3;
      ctx.strokeRect(
        demoButton.x,
        demoButton.y,
        demoButton.width,
        demoButton.height
      );

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 28px Arial";
      ctx.fillText("🌐 Live Demo", canvas.width / 2, demoButton.y + 35);
      ctx.font = "18px Arial";
      ctx.fillStyle = "#f0fff4";
      ctx.fillText("Try the application", canvas.width / 2, demoButton.y + 60);
    }

    // GitHub Button
    if (project.githubUrl) {
      const githubButton = projectButtonLayout.github;

      const gradient3 = ctx.createLinearGradient(
        githubButton.x,
        githubButton.y,
        githubButton.x,
        githubButton.y + githubButton.height
      );
      gradient3.addColorStop(0, "#4a5568");
      gradient3.addColorStop(1, "#2d3748");
      ctx.fillStyle = gradient3;
      ctx.fillRect(
        githubButton.x,
        githubButton.y,
        githubButton.width,
        githubButton.height
      );

      ctx.strokeStyle = "#718096";
      ctx.lineWidth = 3;
      ctx.strokeRect(
        githubButton.x,
        githubButton.y,
        githubButton.width,
        githubButton.height
      );

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 28px Arial";
      ctx.fillText("📁 Source Code", canvas.width / 2, githubButton.y + 35);
      ctx.font = "18px Arial";
      ctx.fillStyle = "#e2e8f0";
      ctx.fillText("GitHub Repository", canvas.width / 2, githubButton.y + 60);
    }
  } else if (type === "back-cover") {
    // Back cover
    ctx.fillStyle = "#050709";
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
    ctx.fillStyle = "#050709";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0bc5ea";
    ctx.font = "bold 48px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Let's Connect!", canvas.width / 2, 250);

    ctx.fillStyle = "#ffffff";
    ctx.font = "32px Arial";
    ctx.textAlign = "left";
    const contactInfo = [
      "📧 vivek.pandit1499@gmail.com",
      "💼 linkedin.com/in/vivek1499",
      "🐙 github.com/Vivek-1499",
      "🌐 vivek1499-portfolio.vercel.app",
    ];

    contactInfo.forEach((line, i) => {
      ctx.fillText(line, 100, 350 + i * 60);
    });
  } else if (type === "back-cover-final") {
    // Final back cover
    ctx.fillStyle = "#050709";
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

  const texture = new CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
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
  const navigate = useNavigate();
  const [highlighted, setHighLighted] = useState(false);
  const [texturesLoaded, setTexturesLoaded] = useState(false);

  const frontTexture = useMemo(() => {
    let texturePromise;
    if (front.includes("-image")) {
      texturePromise = createTextTexture(front, front, pageData);
    } else {
      texturePromise = Promise.resolve(createTextTexture(front, front, pageData));
    }
    
    texturePromise.then(() => setTexturesLoaded(true));
    return texturePromise;
  }, [front, pageData]);

  const backTexture = useMemo(() => {
    let texturePromise;
    if (back.includes("-image")) {
      texturePromise = createTextTexture(back, back, {
        ...pageData,
        project: pageData?.nextProject || pageData?.project,
      });
    } else {
      texturePromise = Promise.resolve(createTextTexture(back, back, {
        ...pageData,
        project: pageData?.nextProject || pageData?.project,
      }));
    }
    
    return texturePromise;
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
    
    // Create materials with promises for textures
    const materials = [
      ...pageMaterials,
      new MeshStandardMaterial({
        color: whiteColor,
        roughness: 0.1,
      }),
      new MeshStandardMaterial({
        color: whiteColor,
        roughness: 0.1,
      }),
    ];

    // Load textures asynchronously
    Promise.all([frontTexture, backTexture]).then(([front, back]) => {
      materials[4].map = front;
      materials[5].map = back;
      materials[4].needsUpdate = true;
      materials[5].needsUpdate = true;
    });

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
  useCursor(highlighted);

  const handlePageClick = (e) => {
    e.stopPropagation();

    const uv = e.uv;
    if (!uv) {
      setPage(opened ? number : number + 1);
      return;
    }

    // Flip coordinates to match canvas drawing
    const canvasX = (1 - uv.x) * 1024;
    const canvasY = (1 - uv.y) * 1024;

    // --- INTERACTION LOGIC FOR PROJECT PAGES (RIGHT SIDE) ---
    if (front.endsWith("-image") && !opened && pageData?.project) {
      const { details, demo, github } = projectButtonLayout;

      // Details Button Click
      if (
        canvasY >= details.y &&
        canvasY <= details.y + details.height &&
        canvasX >= details.x &&
        canvasX <= details.x + details.width
      ) {
        navigate(`/project/${pageData.project.id}`);
        return; // Prevent page turn
      }

      // Live Demo Button Click
      if (
        pageData.project.liveUrl &&
        canvasY >= demo.y &&
        canvasY <= demo.y + demo.height &&
        canvasX >= demo.x &&
        canvasX <= demo.x + demo.width
      ) {
        window.open(pageData.project.liveUrl, "_blank", "noopener,noreferrer");
        return; // Prevent page turn
      }

      // GitHub Button Click
      if (
        pageData.project.githubUrl &&
        canvasY >= github.y &&
        canvasY <= github.y + github.height &&
        canvasX >= github.x &&
        canvasX <= github.x + github.width
      ) {
        window.open(
          pageData.project.githubUrl,
          "_blank",
          "noopener,noreferrer"
        );
        return; // Prevent page turn
      }
    }

    // --- INTERACTION LOGIC FOR CONTACT PAGE (LEFT SIDE, INSIDE BACK COVER) ---
    if (front === "contact-info" && !opened) {
      for (const key in contactLayout) {
        const link = contactLayout[key];
        if (canvasY >= link.y && canvasY <= link.y + link.height) {
          window.open(link.url, "_blank", "noopener,noreferrer");
          return; // Prevent page turn
        }
      }
    }

    // If no button/link was clicked, turn the page
    setPage(opened ? number : number + 1);
    setHighLighted(false);
  };
  
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
      onClick={handlePageClick}>
      <primitive
        object={manualSkinnedMesh}
        ref={skinnedMeshRef}
        position-z={-number * PAGE_DEPTH + page * PAGE_DEPTH}
      />
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