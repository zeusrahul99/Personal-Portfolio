import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";

function createTechCanvasTexture(
  mainText: string,
  subText: string,
  bgColor: string,
  accentColor: string,
  textColor: string = "#ffffff"
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Deep radial background gradient
  const gradient = ctx.createRadialGradient(256, 256, 40, 256, 256, 250);
  gradient.addColorStop(0, bgColor);
  gradient.addColorStop(0.85, "#16181e");
  gradient.addColorStop(1, "#0a0b0e");

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(256, 256, 248, 0, Math.PI * 2);
  ctx.fill();

  // Glowing Outer Accent Ring
  ctx.lineWidth = 14;
  ctx.strokeStyle = accentColor;
  ctx.shadowColor = accentColor;
  ctx.shadowBlur = 25;
  ctx.beginPath();
  ctx.arc(256, 256, 235, 0, Math.PI * 2);
  ctx.stroke();
  ctx.shadowBlur = 0; // reset shadow

  // Main Tech Symbol/Acronym
  ctx.fillStyle = textColor;
  ctx.font = "900 110px Inter, Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(mainText, 256, 215);

  // Subtitle / Label
  ctx.fillStyle = accentColor;
  ctx.font = "700 42px Inter, Arial, sans-serif";
  ctx.fillText(subText, 256, 315);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

const techItems = [
  { mainText: "PYTHON", subText: "3.12+", bgColor: "#1e3a5f", accentColor: "#ffd43b", textColor: "#3776ab" },
  { mainText: "REACT", subText: "18.3", bgColor: "#0d2b3a", accentColor: "#61dafb", textColor: "#61dafb" },
  { mainText: "NEXT", subText: ".JS 14", bgColor: "#111827", accentColor: "#38bdf8", textColor: "#ffffff" },
  { mainText: "TS", subText: "TYPESCRIPT", bgColor: "#1e293b", accentColor: "#3178c6", textColor: "#3178c6" },
  { mainText: "JS", subText: "JAVASCRIPT", bgColor: "#3f3f0e", accentColor: "#f7df1e", textColor: "#f7df1e" },
  { mainText: "SQL", subText: "SQLITE / DB", bgColor: "#0f3742", accentColor: "#00758f", textColor: "#f29111" },
  { mainText: "FAST", subText: "API", bgColor: "#064e3b", accentColor: "#10b981", textColor: "#10b981" },
  { mainText: "GIT", subText: "GITHUB", bgColor: "#27272a", accentColor: "#f05032", textColor: "#ffffff" }
];

const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);

const spheres = [...Array(30)].map(() => ({
  scale: [0.7, 1, 0.8, 1, 1][Math.floor(Math.random() * 5)],
}));

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!isActive) return;
    delta = Math.min(0.1, delta);
    const impulse = vec
      .copy(api.current!.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(
          -50 * delta * scale,
          -150 * delta * scale,
          -50 * delta * scale
        )
      );

    api.current?.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
}

type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

function Pointer({ vec = new THREE.Vector3(), isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current?.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const threshold = document
        .getElementById("work")!
        .getBoundingClientRect().top;
      setIsActive(scrollY > threshold);
    };
    document.querySelectorAll(".header a").forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", () => {
        const interval = setInterval(() => {
          handleScroll();
        }, 10);
        setTimeout(() => {
          clearInterval(interval);
        }, 1000);
      });
    });
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const materials = useMemo(() => {
    return techItems.map((item) => {
      const texture = createTechCanvasTexture(
        item.mainText,
        item.subText,
        item.bgColor,
        item.accentColor,
        item.textColor
      );
      return new THREE.MeshPhysicalMaterial({
        map: texture,
        emissive: item.accentColor,
        emissiveMap: texture,
        emissiveIntensity: 0.4,
        metalness: 0.3,
        roughness: 0.2,
        clearcoat: 0.8,
        clearcoatRoughness: 0.1,
      });
    });
  }, []);

  return (
    <div className="techstack">
      <h2> My Techstack</h2>

      <Canvas
        shadows
        gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
        className="tech-canvas"
      >
        <ambientLight intensity={1} />
        <spotLight
          position={[20, 20, 25]}
          penumbra={1}
          angle={0.2}
          color="white"
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <directionalLight position={[0, 5, -4]} intensity={2} />
        <Physics gravity={[0, 0, 0]}>
          <Pointer isActive={isActive} />
          {spheres.map((props, i) => (
            <SphereGeo
              key={i}
              {...props}
              material={materials[Math.floor(Math.random() * materials.length)]}
              isActive={isActive}
            />
          ))}
        </Physics>
        <Environment
          files="/models/char_enviorment.hdr"
          environmentIntensity={0.5}
          environmentRotation={[0, 4, 2]}
        />
        <EffectComposer enableNormalPass={false}>
          <N8AO color="#0f002c" aoRadius={2} intensity={1.15} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default TechStack;
