import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
 } from 'react';
 import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
 import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
 import * as THREE from 'three';
 import { useThree } from '@react-three/fiber';
 import { useLoadingManager } from 'src/hooks/useLoadingManager';
 import { ModelManager } from 'src/utils/modelManager';
 import 'src/styles/components/model-loader.css';
 import { sampleModelHelper } from 'src/utils/sampleModelHelper';
 

 interface ModelLoaderProps extends React.PropsWithChildren<{}> {
  path: string;
  type?: 'GLTF' | 'GLB';
  onError?: (error: Error) => void;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
 }
 

 const ModelLoader: React.FC<ModelLoaderProps> = React.memo(({
  path,
  type = 'GLTF',
  onError,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
 }) => {
  const [model, setModel] = useState<THREE.Group | null>(null);
  const [loadingError, setLoadingError] = useState<Error | null>(null);
  const { setLoadingProgress } = useLoadingManager();
  const gltfLoaderRef = useRef<GLTFLoader | null>(null);
  const scene = useThree((state) => state.scene);
  const modelManager = useMemo(() => new ModelManager(), []);
  const dracoLoader = useRef<DRACOLoader | null>(null)

  const loadModel = useCallback(async (modelPath: string) => {
  try {
  setLoadingError(null);
  setLoadingProgress(0);
 

  let gltf = modelManager.getModel(modelPath) as GLTF | null;
 

  if (!gltf) {
  if (!gltfLoaderRef.current) {
  gltfLoaderRef.current = new GLTFLoader();
   dracoLoader.current = new DRACOLoader();
   dracoLoader.current.setDecoderPath('/draco/');
   gltfLoaderRef.current.setDRACOLoader(dracoLoader.current);
  }
 

  const loader = gltfLoaderRef.current

  if (!loader) {
  throw new Error('GLTFLoader is not available.');
  }
 

  loader.load(
  modelPath,
  (loadedGltf) => {
  gltf = loadedGltf
  modelManager.setModel(modelPath, loadedGltf);
  setModel(loadedGltf.scene);
  setLoadingProgress(100);
  },
  (xhr) => {
  const progress = (xhr.loaded / xhr.total) * 100;
  setLoadingProgress(progress);
  },
  (error) => {
  console.error('An error occurred while loading the GLTF model:', error);
  setLoadingError(error);
  onError?.(error);
  }
  );
  }
  if (gltf) {
    setModel(gltf.scene);
   }
  } catch (error: any) {
  console.error('Failed to load 3D model:', error);
  setLoadingError(error);
  onError?.(error);
  } finally {
  setLoadingProgress(100);
  }
  }, [onError, setLoadingProgress, modelManager]);
 

  useEffect(() => {
  if (!path) {
  console.warn('Model path is missing.');
  return;
  }
 

  loadModel(path);
 

  return () => {
    if(model){
    disposeMeshes(model);
    }
  
  };
  }, [path, loadModel]);
 

  useEffect(() => {
  if (model) {
  model.position.set(position[0], position[1], position[2]);
  model.rotation.set(rotation[0], rotation[1], rotation[2]);
  model.scale.set(scale[0], scale[1], scale[2]);
  }
  }, [model, position, rotation, scale]);
 

  const disposeMeshes = useCallback((scene: THREE.Group | null) => {
  if (!scene) return;
 

  scene.traverse((object: any) => {
  if (object.isMesh) {
  object.geometry.dispose();
  if (object.material.isMaterial) {
  object.material.dispose();
  } else {
  for (const materialKey in object.material) {
  if (object.material[materialKey].isMaterial) {
  object.material[materialKey].dispose();
  }
  }
  }
  }
  });
  }, [])
 

  if (loadingError) {
  return (
  <div className="model-loader-error">
  Error loading model: {loadingError.message}
  </div>
  );
  }
  return model ? <primitive object={model} dispose={null} /> : null;
 });
 

 ModelLoader.displayName = 'ModelLoader';
 

 export { ModelLoader };