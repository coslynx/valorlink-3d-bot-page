import * as THREE from 'three';
 

 export namespace ThreeTypes {
  /**
  * Represents the structure of a GLTF result, compatible with @react-three/drei and three.
  */
  export type GLTFResult = {
  scene: THREE.Scene;
  animations?: THREE.AnimationClip[];
  nodes?: { [name: string]: THREE.Mesh };
  materials?: { [name: string]: THREE.Material };
  };
 

  /**
  * Mirrors the structure of Three.js fonts.
  */
  export interface Font {
  data: any;
  textures: any[];
  }
 

  /**
  * Represents a union type that can be either a THREE.Texture or a GLTFResult.
  */
  export type LoaderResult = THREE.Texture | GLTFResult;
 

  /**
  * Type definition for custom properties added to THREE.Object3D instances.
  */
  export interface Object3DProps {
  [key: string]: any;
  }
 }
 

 declare module 'three' {
  interface Object3D extends ThreeTypes.Object3DProps {}
  export interface GLTF extends ThreeTypes.GLTFResult {}
  export class Font implements ThreeTypes.Font {
  constructor(data: any, textures: any[]);
  data: any;
  textures: any[];
  }
 }
 

 // Validate imported three.js objects to confirm they come from 'three' version `0.176.0`
 try {
  if (typeof THREE.Scene !== 'function' || typeof THREE.Mesh !== 'function' || typeof THREE.Vector3 !== 'function' || typeof THREE.Color !== 'function') {
  throw new Error('THREE core components are missing or invalid.');
  }
 

  if (THREE.REVISION !== '176') {
  console.warn(`THREE.js version mismatch: Expected 0.176.0, but found ${THREE.REVISION}. This might lead to compatibility issues.`);
  }
 } catch (e: any) {
  console.warn('Failed to validate THREE.js installation or version:', e.message);
 }