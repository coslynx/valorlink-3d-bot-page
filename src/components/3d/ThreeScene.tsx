import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  ReactNode,
  useMemo,
 } from 'react';
 import {
  Canvas,
  useFrame,
  useThree,
 } from '@react-three/fiber';
 import {
  OrbitControls,
  Stats,
 } from '@react-three/drei';
 import * as THREE from 'three';
 import { Environment } from 'src/components/3d/Environment';
 import 'src/styles/components/three-scene.css';
 import { ModelLoader } from 'src/components/3d/ModelLoader';
 import { ThreeTypes } from 'src/types/three-types.d';
 import { sceneManager } from 'src/utils/scene-manager';
 

 interface ThreeSceneProps extends React.PropsWithChildren<{}> {
  cameraPosition?: [number, number, number];
  orbitControls?: boolean;
  initialModelPath?: string;
  showStats?: boolean;
 }
 

 let OrbitControlsComponent: any;
 

 const ThreeScene: React.FC<ThreeSceneProps> = React.memo(({
  children,
  cameraPosition = [0, 0, 5],
  orbitControls = false,
  initialModelPath,
  showStats = false,
 }) => {
  const sceneRef = useRef<THREE.Scene>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const statsRef = useRef<Stats>();
 

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
 

  const setupCamera = useCallback((camera: THREE.PerspectiveCamera) => {
  camera.position.set(cameraPosition[0], cameraPosition[1], cameraPosition[2]);
  camera.lookAt(0, 0, 0);
  }, [cameraPosition]);
 

  const loadingAndRendering = useCallback(() => {
  if (statsRef.current) statsRef.current.update();
  },[]);
 

  useEffect(() => {
  sceneManager.addScene(ThreeScene);
 

  return () => {
  sceneManager.removeScene(ThreeScene);
  if (statsRef.current) {
  document.body.removeChild(statsRef.current.dom);
  }
  };
  }, []);
 

  useThree((state) => {
  const { gl, camera } = state;
  gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  gl.outputEncoding = THREE.sRGBEncoding;
  gl.shadowMap.enabled = true;
  setupCamera(camera)
  });
 

  useEffect(() => {
  if (showStats) {
  import('three/examples/jsm/libs/stats.module')
  .then((StatsModule) => {
  const Stats = StatsModule.default;
  statsRef.current = new Stats();
  statsRef.current.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
  document.body.appendChild(statsRef.current.dom);
  })
  .catch((err) => {
  console.error('Failed to load Stats module:', err);
  });
  }
  }, [showStats]);
 

  useFrame((state, delta) => {
  loadingAndRendering()
  });
 

  const gltfLoad = () => {
  if (initialModelPath) {
  return(
  <ModelLoader
  path={initialModelPath}
  onError={(error) => {
  console.error('Failed to load 3D model:', error);
  setError(error);
  }}
  />
  )
  }
  }
  try {
  return (
  <group aria-label="Three.js Scene" >
  {orbitControls ? <OrbitControls makeDefault /> : null}
  <Environment/>
  {children}
  {gltfLoad()}
  </group>
  );
  } catch (err) {
  console.error('Error rendering ThreeScene:', err);
  return (
  <section className="py-12 bg-black text-white">
  <div className="container mx-auto">
  <p className="text-center">
  An error occurred while rendering the 3D scene. Please try again later.
  </p>
  </div>
  </section>
  );
  }
 });
 

 ThreeScene.displayName = 'ThreeScene';
 

 export default React.memo(ThreeScene);