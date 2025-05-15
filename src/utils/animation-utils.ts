import gsap from 'gsap';
import * as THREE from 'three';
import { ThreeTypes } from 'src/types/three-types.d';
import { MutableRefObject } from 'react';

type AnimationTarget =
  | THREE.Object3D
  | { [key: string]: any }
  | { current: THREE.Object3D }
  | { current: { [key: string]: any } };

interface AnimationConfig {
  target: AnimationTarget | null;
  property: string;
  startValue: number | string | THREE.Color | THREE.Vector3 | THREE.Quaternion;
  endValue: number | string | THREE.Color | THREE.Vector3 | THREE.Quaternion;
  duration?: number;
  easing?: string;
}

const isValidEasing = (easing: string): boolean => {
  try {
    return gsap.parseEase(easing) !== null;
  } catch (e: any) {
    return false;
  }
};

const setNestedProperty = (object: any, path: string, value: any): void => {
  if (!object) {
    console.warn(`Object is null or undefined, cannot set property.`);
    return;
  }

  const pathParts = path.split('.');
  let current = object;

  for (let i = 0; i < pathParts.length - 1; i++) {
    const part = pathParts[i];
    if (current && typeof current === 'object' && current !== null && Object.prototype.hasOwnProperty.call(current, part)) {
      current = current[part];
    } else {
      console.warn(`Intermediate nested property "${part}" is undefined in path "${path}". Skipping.`);
      return;
    }
  }

  const finalPart = pathParts[pathParts.length - 1];
  if (current && typeof current === 'object' && current !== null && Object.prototype.hasOwnProperty.call(current, finalPart)) {
    try {
      current[finalPart] = value;
    } catch (e: any) {
      console.error(`Failed to set property "${path}" to value "${value}".`, e);
    }
  } else {
    console.warn(`Final nested property "${finalPart}" is undefined in path "${path}". Skipping.`);
  }
};

const animateValue = async (config: AnimationConfig, onUpdate?: (value: any) => void): Promise<void> => {
  if (!config) {
    console.warn('Animation config is null or undefined. Skipping animation.');
    return;
  }

  if (!config.target || (('current' in config.target) && config.target.current === null)) {
    console.warn('Target is null. Skipping animation.');
    return;
  }

  let easing = config.easing && isValidEasing(config.easing) ? config.easing : 'power3.inOut';

  if (!isValidEasing(easing) && config.easing) {
    console.warn(`Invalid easing function "${config.easing}" provided. Using default easing 'power3.inOut'.`);
  }

  const duration = config.duration || 1;
  const target = ('current' in config.target) ? config.target.current : config.target;
  const property = config.property;
  const startValue = config.startValue;
  const endValue = config.endValue;

  try {
    await gsap.to(target, {
      [property]: endValue,
      duration: duration,
      ease: easing,
      onUpdate: () => {
        try {
          if (typeof target === 'object' && target !== null) {
             setNestedProperty(target, property, (target as any)[property]);

            if (onUpdate) {
              onUpdate((target as any)[property]);
            }
          }
        } catch (e: any) {
          console.error(`Error during animation update for property "${property}":`, e);
        }
      },
    });
  } catch (error: any) {
    console.error(`GSAP animation failed for property "${property}":`, error);
  }
};

export { isValidEasing, animateValue };