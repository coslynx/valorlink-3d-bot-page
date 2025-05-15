import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  ReactNode,
 } from 'react';
 import { useFrame } from '@react-three/fiber';
 import { RadianiteCrate } from 'src/components/3d/Models/RadianiteCrate';
 import { Environment } from 'src/components/3d/Environment';
 import { useScrollAnimation } from 'src/hooks/useScrollAnimation';
 import { sceneManager } from 'src/utils/scene-manager';
 import * as THREE from 'three';
 import { useThree } from '@react-three/fiber';
 import 'src/styles/components/scroll-scene.css';
 import { use3DInteraction } from 'src/hooks/use3DInteraction';
 

 interface ScrollSceneProps {
  children: ReactNode;
 }
 

 const ScrollScene: React.FC<ScrollSceneProps> = React.memo(({ children }) => {
  const [sceneLoaded, setSceneLoaded] = useState(false);
  const { camera } = useThree();
  const crateRef = useRef<THREE.Mesh>(null);
 

  const animationConfigs = [
  {
  target: crateRef,
  property: 'position.y',
  startScroll: 0,
  endScroll: 500,
  startValue: 0,
  endValue: 5,
  easing: 'power2.out',
  },
  {
  target: crateRef,
  property: 'rotation.x',
  startScroll: 0,
  endScroll: 500,
  startValue: 0,
  endValue: Math.PI * 2,
  easing: 'linear',
  },
  ];
 

  const scrollValues = useScrollAnimation(animationConfigs);
 

  useEffect(() => {
  sceneManager.addScene(ScrollScene);
  setSceneLoaded(true);
  return () => {
  sceneManager.removeScene(ScrollScene);
  };
  }, []);
 

  const { onHover } = use3DInteraction();
 

  useFrame((state, delta) => {
  if (crateRef.current) {
  if (scrollValues && scrollValues[0]) {
  crateRef.current.position.y = THREE.MathUtils.lerp(
  crateRef.current.position.y,
  scrollValues[0].value as number,
  delta
  );
  }
  if (scrollValues && scrollValues[1]) {
  crateRef.current.rotation.x = THREE.MathUtils.lerp(
  crateRef.current.rotation.x,
  scrollValues[1].value as number,
  delta
  );
  }
 

  }
  });
 

  try {
  return (
  <group aria-label="Scroll Scene">
  {sceneLoaded && <Environment />}
  <RadianiteCrate ref={crateRef} onPointerOver={(e) => { if (crateRef.current) onHover(crateRef.current)}} />
  {children}
  </group>
  );
  } catch (error) {
  console.error('Error rendering ScrollScene:', error);
  return (
  <section className="py-12 bg-black text-white">
  <div className="container mx-auto">
  <p className="text-center">
  An error occurred while rendering the scroll scene. Please try again
  later.
  </p>
  </div>
  </section>
  );
  }
 });
 

 ScrollScene.displayName = 'ScrollScene';
 

 export default React.memo(ScrollScene);
 ```

```tsx
 import { useRef, useEffect, useCallback } from 'react';
 import gsap from 'gsap';
 import { ScrollTrigger } from 'gsap/ScrollTrigger';
 

 gsap.registerPlugin(ScrollTrigger);
 

 interface AnimationConfig {
  target: React.MutableRefObject<any>;
  property: string;
  startScroll: number;
  endScroll: number;
  startValue: number;
  endValue: number;
  easing: string;
 }
 

 export const useScrollAnimation = (animationConfigs: AnimationConfig[]) => {
  const scrollValues = useRef(
  animationConfigs.map(() => ({ value: 0 }))
  ).current;
  const scrollTriggers = useRef<GSAPScrollTrigger[]>([]);
 

  useEffect(() => {
  scrollTriggers.current = [];
  animationConfigs.forEach((config, index) => {
  if (!config.target.current) {
  console.warn(`Target is null for animationConfig at index ${index}`);
  return;
  }
 

  const trigger = ScrollTrigger.create({
  trigger: "body",
  scroller: window,
  start: `top+=${config.startScroll} top`,
  end: `top+=${config.endScroll} top`,
  scrub: true,
  invalidateOnRefresh: true,
  onUpdate: self => {
  if (!config.target.current) return;
 

  const progress = self.progress;
  const newValue = gsap.utils.interpolate(
  config.startValue,
  config.endValue,
  progress
  );
 

  const [propertyPart1, propertyPart2] = config.property.split('.');
 

  if (propertyPart2) {
  config.target.current[propertyPart1][propertyPart2] = newValue;
  } else {
  config.target.current[propertyPart1] = newValue;
  }
  scrollValues[index].value = newValue;
  },
  });
  scrollTriggers.current.push(trigger);
  });
 

  return () => {
  scrollTriggers.current.forEach(trigger => {
  trigger.kill();
  });
  };
  }, [animationConfigs]);
 

  return scrollValues;
 };
 ```

```css
 /* src/styles/components/scroll-scene.css */
 /* Add any specific styling for the ScrollScene component here */
 .scroll-scene {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
 }
 ```

```tsx
 import React from 'react';
 import { Vector3, Color } from 'three';
 import { useThree } from '@react-three/fiber';
 

 export interface EnvironmentProps {
  bgColorTop?: string;
  bgColorBottom?: string;
  sunPosition?: [number, number, number];
 }
 

 const Environment: React.FC = ({
  bgColorTop = '#87CEEB',
  bgColorBottom = '#FFFFFF',
  sunPosition = [10, 10, 10],
 }) => {
  const { scene } = useThree();
 

  // Set background color with a gradient
  useEffect(() => {
  scene.background = new THREE.Color(bgColorBottom);
  return () => {
  scene.background = null;
  };
  }, [scene, bgColorBottom]);
 

  // Add a directional light to simulate sunlight
  useEffect(() => {
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(...sunPosition);
  scene.add(directionalLight);
 

  return () => {
  scene.remove(directionalLight);
  directionalLight.dispose();
  };
  }, [scene, sunPosition]);
 

  return null; // This component doesn't render anything
 };
 

 export default Environment;