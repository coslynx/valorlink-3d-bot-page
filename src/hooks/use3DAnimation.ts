import { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface AnimationConfig {
  target: React.MutableRefObject<THREE.Object3D | null>;
  property: string;
  keyframes: {
    [time: number]: any;
  };
  duration?: number;
  easing?: string;
}

const isValidEasing = (easing: string): boolean => {
  try {
    return gsap.parseEase(easing) !== null;
  } catch (e) {
    return false;
  }
};

const setNestedProperty = (object: any, path: string, value: any) => {
  const pathParts = path.split('.');
  let current = object;

  for (let i = 0; i < pathParts.length - 1; i++) {
    const part = pathParts[i];
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      console.warn(`Intermediate nested property "${part}" is undefined in path "${path}".`);
      return;
    }
  }

  const finalPart = pathParts[pathParts.length - 1];
  if (current && typeof current === 'object' && finalPart in current) {
    try {
      current[finalPart] = value;
    } catch (e) {
      console.error(`Failed to set property "${path}" to value "${value}".`, e);
    }
  } else {
    console.warn(`Final nested property "${finalPart}" is undefined in path "${path}".`);
  }
};

const use3DAnimation = (animationConfigs: AnimationConfig[]): void => {
  const timelines = useRef<gsap.core.Timeline[]>([]);

  useEffect(() => {
    try {
      timelines.current.forEach((timeline) => {
        timeline.kill();
      });
      timelines.current = [];

      animationConfigs.forEach((config, index) => {
        if (!config.target.current) {
          console.warn(`Target is null for animationConfig at index ${index}. Skipping animation.`);
          return;
        }

        const target = config.target.current;
        const property = config.property;
        const keyframes = config.keyframes;
        const duration = config.duration || 1;
        const easing = config.easing && isValidEasing(config.easing) ? config.easing : 'power3.inOut';

        if (!isValidEasing(easing) && config.easing) {
          console.warn(`Invalid easing function "${config.easing}" provided. Using default easing 'power3.inOut'.`);
        }

        const timeline = gsap.timeline({
          paused: true,
          onComplete: () => { },
          onUpdate: () => { }
        });

        const sortedTimes = Object.keys(keyframes)
          .map(Number)
          .sort((a, b) => a - b);

        sortedTimes.forEach((time, i) => {
          const value = keyframes[time];
          const nextTime = sortedTimes[i + 1] !== undefined ? sortedTimes[i + 1] : null;
          const endTime = nextTime !== null ? nextTime * duration : duration;
          const startTime = time * duration;

          timeline.to(
            target,
            {
              [property]: value,
              duration: endTime - startTime,
              ease: easing,
              onUpdate: () => { },
              onComplete: () => { }
            },
            startTime
          );
        });

        timeline.invalidate().play();
        timelines.current.push(timeline);
      });

      return () => {
        timelines.current.forEach((timeline) => {
          timeline.kill();
        });
      };
    } catch (error) {
      console.error('Error initializing 3D animations:', error);
    }
  }, [animationConfigs]);
};

export default use3DAnimation;