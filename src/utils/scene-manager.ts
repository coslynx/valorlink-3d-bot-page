import * as THREE from 'three';
 import { disposeMaterial } from 'src/utils/three-helpers';
 

 interface SceneManagerInterface {
  addScene(sceneIdentifier: string): void;
  removeScene(sceneIdentifier: string): void;
  getActiveScene(): THREE.Scene | undefined;
  setActiveScene(sceneIdentifier: string): void;
 }
 

 class SceneManager implements SceneManagerInterface {
  private static instance: SceneManager | null = null;
  private scene: THREE.Scene | undefined;
  private sceneName: string | undefined;
 

  private constructor() {
  // Private constructor to enforce singleton pattern
  }
 

  public static getInstance(): SceneManager {
  if (!SceneManager.instance) {
  SceneManager.instance = new SceneManager();
  }
  return SceneManager.instance;
  }
 

  /**
  * Adds a new Three.js scene, removing the previously stored scene if it exists.
  * @param sceneIdentifier - A unique identifier for the scene (string).
  * @throws {TypeError} If sceneIdentifier is not a string.
  */
  public addScene(sceneIdentifier: string): void {
  try {
  if (typeof sceneIdentifier !== 'string') {
  throw new TypeError('Scene identifier must be a string.');
  }
 

  if (this.scene) {
  this.removeSceneInternal();
  }
 

  this.scene = new THREE.Scene();
  this.sceneName = sceneIdentifier;
  this.scene.name = sceneIdentifier;
 

  } catch (error: any) {
  console.warn(`Error adding scene ${sceneIdentifier}: `, error.message);
  }
  }
 

  /**
  * Removes a scene by its identifier.
  * @param sceneIdentifier - The identifier of the scene to remove (string).
  * @throws {Error} If the scene with the given identifier is not found.
  */
  public removeScene(sceneIdentifier: string): void {
  if (typeof sceneIdentifier !== 'string') {
  throw new TypeError('Scene identifier must be a string.');
  }
 

  if (this.sceneName !== sceneIdentifier) {
  throw new Error(`Scene "${sceneIdentifier}" not found`);
  }
  this.removeSceneInternal();
  }
 

  /**
  * Internal method to remove the active scene and dispose of its resources.
  * This helps to prevent memory leaks.
  */
  private removeSceneInternal(): void {
  if (!this.scene) return;
 

  // Dispose of resources attached to the scene
  this.scene.traverse((object: any) => {
  if (object.isMesh) {
  object.geometry.dispose();
  if (object.material) {
  disposeMaterial(object.material)
  }
  }
 

  if(object.isLight){
  object.dispose()
  }
  });
 

  this.scene = undefined;
  this.sceneName = undefined;
  }
 

  /**
  * Retrieves the currently active scene.
  * @returns The active Three.js scene, or undefined if no scene is active.
  */
  public getActiveScene(): THREE.Scene | undefined {
  return this.scene;
  }
 

  /**
  * Sets the active scene.
  * @param sceneIdentifier - The identifier of the scene to set as active (string).
  * @throws {TypeError} If sceneIdentifier is not a string.
  * @throws {Error} If the scene with the given identifier is not found.
  */
  public setActiveScene(sceneIdentifier: string): void {
  if (typeof sceneIdentifier !== 'string') {
  const error = new TypeError('Scene identifier must be a string.');
  error.name = "SM_INVALID_INPUT"
  throw error
  }
 

  if (this.sceneName !== sceneIdentifier) {
  const error = new Error(`Scene "${sceneIdentifier}" not found`);
  error.name = "SM_INVALID_INPUT"
  throw error;
  }
 

  if (!this.scene) {
  console.warn(`Scene "${sceneIdentifier}" not found, can't set active scene.`);
  }
  }
 }
 

 export const sceneManager = SceneManager.getInstance();