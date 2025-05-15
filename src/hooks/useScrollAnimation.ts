import { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

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

interface ScrollValue {
  value: number;
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
      if (typeof value === 'number') {
        current[finalPart] = value;
      } else {
        console.warn(`Value is not a number`);
      }
    } catch (e) {
      console.error(`Failed to set property "${path}" to value "${value}".`, e);
    }
  } else {
    console.warn(`Final nested property "${finalPart}" is undefined in path "${path}".`);
  }
};

/**
 * A hook for creating scroll-triggered animations using GSAP's ScrollTrigger.
 * @param animationConfigs An array of AnimationConfig objects.
 * @returns An array of objects with interpolated values.
 */
export const useScrollAnimation = (animationConfigs: AnimationConfig[]): ScrollValue[] => {
  const scrollValues = useRef<ScrollValue[]>(
    animationConfigs.map(() => ({ value: 0 }))
  ).current;

  const scrollTriggers = useRef<ScrollTrigger[]>([]);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    try {
      scrollTriggers.current.forEach(trigger => {
        trigger.kill();
      });
      scrollTriggers.current = [];

      const safeAnimationConfigs = animationConfigs.map(config => ({...config}));

      safeAnimationConfigs.forEach((config, index) => {
        if (!config.target?.current) {
          console.warn(`Target is null for animationConfig at index ${index}. Skipping animation.`);
          scrollValues[index].value = 0;
          return;
        }

        const easing = config.easing && isValidEasing(config.easing) ? config.easing : 'power3.out';

        if (!isValidEasing(easing) && config.easing) {
          console.warn(`Invalid easing function "${config.easing}" provided. Using default easing 'power3.out'.`);
        }

        const trigger = ScrollTrigger.create({
          trigger: "body",
          scroller: window,
          start: `top+=${config.startScroll} top`,
          end: `top+=${config.endScroll} top`,
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: self => {
            if (!config.target.current) {
              console.warn(`Target became null during animation for config at index ${index}. Skipping update.`);
              return;
            }

            const progress = self.progress;
            const newValue = gsap.utils.interpolate(
              config.startValue,
              config.endValue,
              progress
            );

            if(typeof newValue !== 'number'){
                console.warn(`newValue is not a number skipping animation update`)
                return
            }

            setNestedProperty(config.target.current, config.property, newValue);
            scrollValues[index].value = newValue;
          },
        });
        scrollTriggers.current.push(trigger);
      });

      setInitialized(true);

      return () => {
        scrollTriggers.current.forEach(trigger => {
          trigger.kill();
        });
      };
    } catch (error) {
      console.error('Error initializing scroll animations:', error);
    }
  }, [animationConfigs]);

  useEffect(() => {
    if (!initialized) return;

    scrollValues.forEach((_, index) => {
      if (animationConfigs[index]?.target?.current === null) {
        scrollValues[index].value = 0;
      }
    });
  }, [initialized, animationConfigs, scrollValues]);

  return scrollValues;
};