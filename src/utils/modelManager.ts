import * as THREE from 'three';
 

 /**
  * A class that manages a cache of loaded 3D models using Three.js.
  */
 export class ModelManager {
  private modelCache: Map<string, THREE.Object3D> = new Map();
 

  /**
  * Initializes the internal `Map`.
  */
  constructor() {
  this.modelCache = new Map<string, THREE.Object3D>();
  }
 

  /**
  * Adds a model to the cache, associating it with the given path.
  * @param {string} path - The path to the model. Must be a non-empty string.
  * @param {THREE.Object3D} model - The loaded Three.js object. Must be an instance of THREE.Object3D.
  * @throws {Error} If the path is an empty string or the model is not a THREE.Object3D.
  */
  setModel(path: string, model: THREE.Object3D): void {
  try {
  if (typeof path !== 'string' || path.trim() === '') {
  throw new Error('Invalid path: Path must be a non-empty string.');
  }
  if (!(model instanceof THREE.Object3D)) {
  throw new Error('Invalid model: Model must be an instance of THREE.Object3D.');
  }
 

  this.modelCache.set(path, model);
  } catch (error: any) {
  console.error(`Failed to set model for path "${path}":`, error);
  throw error;
  }
  }
 

  /**
  * Retrieves a model from the cache by its path.
  * @param {string} path - The path to the model. Must be a non-empty string.
  * @returns {THREE.Object3D | undefined} The loaded Three.js object, or `undefined` if the model is not in the cache or the path is invalid.
  */
  getModel(path: string): THREE.Object3D | undefined {
  try {
  if (typeof path !== 'string' || path.trim() === '') {
  console.warn('Invalid path: Path must be a non-empty string.');
  return undefined;
  }
 

  return this.modelCache.get(path);
  } catch (error) {
  console.error(`Failed to get model for path "${path}":`, error);
  return undefined;
  }
  }
 

  /**
  * Removes a model from the cache by its path.
  * @param {string} path - The path to the model. Must be a non-empty string.
  * @returns {boolean} `true` if the model was successfully removed; otherwise, `false`.
  */
  removeModel(path: string): boolean {
  try {
  if (typeof path !== 'string' || path.trim() === '') {
  console.warn('Invalid path: Path must be a non-empty string.');
  return false;
  }
 

  const model = this.modelCache.get(path);
  if (model) {
  this.disposeModel(model);
  this.modelCache.delete(path);
  return true;
  }
  return false;
  } catch (error) {
  console.error(`Failed to remove model for path "${path}":`, error);
  return false;
  }
  }
 

  /**
  * Clears the entire cache.
  */
  clear(): void {
  try {
  this.modelCache.forEach((model) => {
  this.disposeModel(model);
  });
  this.modelCache.clear();
  } catch (error) {
  console.error('Failed to clear model cache:', error);
  }
  }
 

  /**
  * Disposes of the resources (geometry and material) of a given Three.js object to prevent memory leaks.
  * @param {THREE.Object3D} model - The Three.js object to dispose.
  */
  private disposeModel(model: THREE.Object3D): void {
  try {
  model.traverse((object: any) => {
  if (object.isMesh) {
  object.geometry.dispose();
  if (object.material) {
  if (Array.isArray(object.material)) {
  object.material.forEach(material => {
  material.dispose();
  });
  } else {
  object.material.dispose();
  }
  }
  }
  });
  } catch (error) {
  console.error('Failed to dispose model:', error);
  }
  }
 }
 

 export { ModelManager };