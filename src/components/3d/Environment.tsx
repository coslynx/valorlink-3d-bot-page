import React, { useEffect, useCallback } from 'react';
 import { Vector3, Color, DirectionalLight, AmbientLight } from 'three';
 import { useThree } from '@react-three/fiber';
 

 export interface EnvironmentProps {\n  bgColorTop?: string;\n  bgColorBottom?: string;\n  sunPosition?: [number, number, number];\n  ambientIntensity?: number;
 }
 

 const Environment: React.FC<EnvironmentProps> = React.memo(({
  bgColorTop = '#87CEEB',
  bgColorBottom = '#FFFFFF',
  sunPosition = [10, 10, 10],
  ambientIntensity = 0.3,
 }) => {
  const { scene } = useThree();
 

  const setBackgroundColor = useCallback(
  (colorBottom: string) => {
  try {
  const isValidColor = /^#([0-9A-Fa-f]{3}){1,2}$/.test(colorBottom);
  if (isValidColor) {
  scene.background = new Color(colorBottom);
  } else {
  console.error('Invalid bgColorBottom value. Using default #FFFFFF.');
  scene.background = new Color('#FFFFFF');
  }
  } catch (error) {
  console.error('Error setting background color:', error);
  scene.background = new Color('#FFFFFF');
  }
  },
  [scene]
  );
 

  useEffect(() => {
  setBackgroundColor(bgColorBottom);
  return () => {
  scene.background = null;
  };
  }, [scene, bgColorBottom, setBackgroundColor]);
 

  const setSunlight = useCallback(
  (position: [number, number, number]) => {
  const isValidPosition =
  Array.isArray(position) &&
  position.length === 3 &&
  position.every((val) => typeof val === 'number');
 

  const safeSunPosition: [number, number, number] = isValidPosition
  ? position
  : [10, 10, 10];
  if (!isValidPosition) {
  console.error('Invalid sunPosition value. Using default [10, 10, 10].');
  }
 

  const directionalLight = new DirectionalLight(0xffffff, 1);
  directionalLight.position.set(...safeSunPosition);
  scene.add(directionalLight);
 

  return () => {
  scene.remove(directionalLight);
  directionalLight.dispose();
  };
  },
  [scene]
  );
 

  useEffect(() => {\n  const cleanupSunlight = setSunlight(sunPosition);\n  return () => {\n  cleanupSunlight();\n  };\n  }, [scene, sunPosition, setSunlight]);
 

  useEffect(() => {\n  if (scene) {\n  const ambientLight = new AmbientLight(0xffffff, ambientIntensity);\n  scene.add(ambientLight);\n  return () => {\n  scene.remove(ambientLight);\n  ambientLight.dispose();\n  };\n  }\n  }, [scene, ambientIntensity]);
 

  return null;
 });
 

 Environment.displayName = 'Environment';
 

 export default Environment;