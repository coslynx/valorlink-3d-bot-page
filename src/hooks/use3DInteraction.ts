import { useState, useCallback, useRef } from 'react';
import * as THREE from 'three';

interface use3DInteractionType {
  onHover: (object: THREE.Object3D) => void;
  onPointerOut: () => void;
}

export const use3DInteraction = (): use3DInteractionType => {
  const [hoveredObject, setHoveredObject] = useState<THREE.Object3D | null>(null);
  const originalEmissiveColors = useRef(new Map<THREE.Material, THREE.Color | null>());
  const originalEmissiveIntensities = useRef(new Map<THREE.Material, number | null>());

  const onHover = useCallback((object: THREE.Object3D) => {
    if (!object) {
      console.warn('use3DInteraction: onHover - Object is null.');
      return;
    }

    if (!object.material) {
      console.warn('use3DInteraction: Object does not have a material.');
      return;
    }

    let material: THREE.Material;

    if (object.material instanceof THREE.Material) {
      material = object.material;
    } else if ((object.material as THREE.MeshStandardMaterial).emissive) {
      material = object.material as THREE.Material;
    }
    else {
        console.warn('use3DInteraction: Object does not have an emissive material.');
        return;
    }

    if (!(material instanceof THREE.MeshStandardMaterial) || !material.emissive) {
      console.warn('use3DInteraction: Object does not have emissive properties or is not MeshStandardMaterial.');
      return;
    }

    setHoveredObject(object);

    originalEmissiveColors.current.set(material, material.emissive.clone());
    originalEmissiveIntensities.current.set(material, material.emissiveIntensity);

    material.emissive.setHex(0xFF4655);
    material.emissiveIntensity = 0.2;
  }, []);

  const onPointerOut = useCallback(() => {
    if (hoveredObject) {
      if (!hoveredObject.material) {
        console.warn('use3DInteraction: Object does not have a material.');
        return;
      }

      let material: THREE.Material;

      if (hoveredObject.material instanceof THREE.Material) {
        material = hoveredObject.material;
      } else if ((hoveredObject.material as THREE.MeshStandardMaterial).emissive) {
        material = hoveredObject.material as THREE.Material;
      }
      else {
          console.warn('use3DInteraction: Object does not have an emissive material.');
          return;
      }

      if (!(material instanceof THREE.MeshStandardMaterial) || !material.emissive) {
        console.warn('use3DInteraction: Object does not have emissive properties or is not MeshStandardMaterial.');
        return;
      }

      const originalColor = originalEmissiveColors.current.get(material) || new THREE.Color(0x000000);
      const originalIntensity = originalEmissiveIntensities.current.get(material) || 0;

      material.emissive.copy(originalColor);
      material.emissiveIntensity = originalIntensity;
      setHoveredObject(null);

      originalEmissiveColors.current.delete(material);
      originalEmissiveIntensities.current.delete(material);
    }
  }, [hoveredObject]);

  return { onHover, onPointerOut };
};

export default use3DInteraction;