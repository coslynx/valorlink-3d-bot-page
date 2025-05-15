import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { ModelLoader } from 'src/components/3d/ModelLoader';
import 'src/types/three-types.d.ts';

interface RadianiteCrateProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  materialProperties?: {
    color?: string;
    roughness?: number;
    metalness?: number;
  };
}

const RadianiteCrate: React.FC<RadianiteCrateProps> = React.memo(
  ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = [1, 1, 1], materialProperties }) => {
    const [model, setModel] = useState<THREE.Group | null>(null);
    const crateRef = useRef<THREE.Mesh>(null);
    const [loadingError, setLoadingError] = useState<Error | null>(null);
    const [lod, setLod] = useState(false);

    const onError = useCallback((error: Error) => {
      setLoadingError(error);
    }, []);

    useEffect(() => {
      if (model) {
        crateRef.current = model.children[0] as THREE.Mesh;
      }
    }, [model]);

    useEffect(() => {
      if (crateRef.current && materialProperties) {
        try {
          const material = new THREE.MeshStandardMaterial({
            color: materialProperties.color ? materialProperties.color : '#FFFFFF',
            roughness: materialProperties.roughness !== undefined ? materialProperties.roughness : 0.5,
            metalness: materialProperties.metalness !== undefined ? materialProperties.metalness : 0.5,
          });

          crateRef.current.material = material;
        } catch (err) {
          console.error('Failed to apply material properties:', err);
        }
      }
    }, [model, materialProperties]);

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
    }, []);

    return (
      <group position={position} rotation={rotation} scale={scale} aria-label="Radianite Crate">
        <ModelLoader
          path="public/models/agent_model.glb"
          onError={onError}
          position={[0,0,0]}
          rotation={[0,0,0]}
          scale={[0.01, 0.01, 0.01]}
        />
        {loadingError && (
          <div style={{ color: 'red' }}>Error loading Radianite Crate.</div>
        )}
      </group>
    );
  }
);

RadianiteCrate.displayName = 'RadianiteCrate';

export default RadianiteCrate;