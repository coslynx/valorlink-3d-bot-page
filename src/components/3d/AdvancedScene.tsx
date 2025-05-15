import React, { useRef, useEffect, ReactNode } from 'react';
 import {
  useFrame,
  useThree,
 } from '@react-three/fiber';
 import {
  EffectComposer,
  RenderPass,
  BloomPass,
 } from 'three-stdlib';
 import * as THREE from 'three';
 import ThreeScene from 'src/components/3d/ThreeScene';
 import 'src/types/three-types.d.ts';
 import 'src/utils/three-helpers.ts';
 import 'src/utils/scene-manager.ts';
 

 interface AdvancedSceneProps extends React.PropsWithChildren<{}> {
  bloomIntensity?: number;
  bloomThreshold?: number;
  bloomRadius?: number;
  ambientIntensity?: number;
 }
 

 const AdvancedScene: React.FC<AdvancedSceneProps> = React.memo(({
  children,
  bloomIntensity = 0.5,
  bloomThreshold = 0.8,
  bloomRadius = 0.4,
  ambientIntensity = 0.3,
 }) => {
  const composer = useRef<EffectComposer>(null);
  const bloomPass = useRef<BloomPass>(null);
  const { gl, scene, camera } = useThree();
 

  useEffect(() => {\n  try {\n  if (!gl) {\n  console.error('WebGLRenderer is not available.');\n  return;\n  }\n \n  const renderTarget = new THREE.WebGLRenderTarget(\n  gl.getSize(new THREE.Vector2()).width,\n  gl.getSize(new THREE.Vector2()).height,\n  {\n  format: THREE.RGBAFormat,\n  stencilBuffer: false,\n  depthBuffer: true,\n  type: THREE.HalfFloatType, // Prioritize rendering performance\n  }\n  );\n \n  if (!composer.current) {\n  composer.current = new EffectComposer(gl, renderTarget);\n  }\n\n  if (composer.current) {\n  composer.current.renderTarget = renderTarget;\n  composer.current.passes = [];\n\n  const renderPass = new RenderPass(scene, camera);\n  composer.current.addPass(renderPass);\n\n  bloomPass.current = new BloomPass(\n  bloomIntensity,\n  bloomThreshold,\n  bloomRadius\n  );\n\n  bloomPass.current.resolution = 256; // Limit resolution for performance\n  composer.current.addPass(bloomPass.current);\n  }\n\n\n  const cleanup = () => {\n  if (composer.current) {\n  composer.current.dispose();\n  composer.current.renderTarget.dispose();\n  composer.current.passes.forEach(pass => {\n  if (pass) {\n  pass.dispose();\n  }\n  });\n  }\n\n  if (renderTarget) {\n  renderTarget.dispose();\n  }\n\n\n  };\n\n\n  return cleanup;\n  } catch (error) {\n  console.error('Error initializing post-processing effects:', error);\n  return () => {};
  }
  }, [gl, scene, camera, bloomIntensity, bloomThreshold, bloomRadius]);
 

  const updateLighting = useCallback(() => {
  if (scene) {\
  scene.traverse((object) => {\
  if (object instanceof THREE.DirectionalLight) {\
  object.intensity = 1;\
  }\
  if (object instanceof THREE.AmbientLight) {\
  object.intensity = ambientIntensity;\
  }\
  });\
  }\
  }, [scene, ambientIntensity]);\
 \
  useEffect(() => {\
  updateLighting();\
  }, [updateLighting]);
 

  useFrame(() => {
  if (composer.current) {\
  composer.current.render();\
  }\
  });
 

  try {\
  return (\
  <group aria-label=\"Advanced Scene\">\
  <ThreeScene>{children}</ThreeScene>\
  </group>\
  );\
  } catch (error) {\
  console.error('Error rendering AdvancedScene:', error);\
  return (\
  <p className=\"text-red-500\">\
  An error occurred while rendering the advanced scene. Please try again\
  later.\
  </p>\
  );\
  }\
 });
 

 AdvancedScene.displayName = 'AdvancedScene';
 

 export default React.memo(AdvancedScene);