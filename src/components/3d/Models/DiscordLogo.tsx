import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { ModelLoader } from 'src/components/3d/ModelLoader';
import 'src/types/three-types.d.ts';

interface DiscordLogoProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  materialProperties?: {
    color?: string;
    roughness?: number;
    metalness?: number;
  };
}

const DiscordLogo: React.FC<DiscordLogoProps> = React.memo(
  ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = [1, 1, 1], materialProperties }) => {
    const [model, setModel] = useState<THREE.Group | null>(null);
    const logoRef = useRef<THREE.Mesh>(null);
    const [loadingError, setLoadingError] = useState<Error | null>(null);

    const onError = useCallback((error: Error) => {
      setLoadingError(error);
    }, []);

    useEffect(() => {
      if (model) {
        logoRef.current = model.children[0] as THREE.Mesh;
      }
    }, [model]);

    useEffect(() => {
      if (logoRef.current && materialProperties) {
        try {
          const material = new THREE.MeshStandardMaterial({
            color: materialProperties.color ? materialProperties.color : '#FFFFFF',
            roughness: materialProperties.roughness !== undefined ? materialProperties.roughness : 0.5,
            metalness: materialProperties.metalness !== undefined ? materialProperties.metalness : 0.5,
          });

          logoRef.current.material = material;
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

    useEffect(() => {
      return () => {
        if (model) {
          disposeMeshes(model);
        }
      };
    }, [model, disposeMeshes]);

    return (
      <group position={position} rotation={rotation} scale={scale} aria-label="Discord Logo">
        <ModelLoader
          path="public/models/discord_logo.glb"
          onError={onError}
          position={[0,0,0]}
          rotation={[0,0,0]}
          scale={[1, 1, 1]}
        />
        {loadingError && (
          <div style={{ color: 'red' }}>Error loading Discord Logo.</div>
        )}
      </group>
    );
  }
);

DiscordLogo.displayName = 'DiscordLogo';

export default DiscordLogo;