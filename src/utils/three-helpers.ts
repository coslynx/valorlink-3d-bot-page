import * as THREE from 'three';

 /**
  * Converts a THREE.Color instance to a THREE.Vector3.
  * @param color The THREE.Color instance to convert.
  * @returns A THREE.Vector3 representing the color, or a default (0,0,0) Vector3 if an error occurs.
  * @throws {TypeError} If the input is not a THREE.Color instance.
  */
 const colorToVector3 = (color: THREE.Color): THREE.Vector3 => {
  try {
  if (!(color instanceof THREE.Color)) {
  throw new TypeError('Invalid input: color must be a THREE.Color instance.');
  }
  return new THREE.Vector3(color.r, color.g, color.b);
  } catch (error) {
  console.warn('Error converting color to Vector3:', error);
  return new THREE.Vector3(0, 0, 0);
  }
 };
 

 /**
  * Creates and configures a THREE.DirectionalLight.
  * @param color The color of the light.
  * @param intensity The intensity of the light.
  * @param position The position of the light. Defaults to (1, 1, 1).
  * @returns A configured THREE.DirectionalLight.
  * @throws {TypeError} If the color is not a THREE.Color or the intensity is not a positive number.
  */
 const createDirectionalLight = (color: THREE.Color, intensity: number, position: THREE.Vector3 = new THREE.Vector3(1, 1, 1)): THREE.DirectionalLight => {
  try {
  if (!(color instanceof THREE.Color)) {
  throw new TypeError('Invalid input: color must be a THREE.Color instance.');
  }
  if (typeof intensity !== 'number' || intensity <= 0) {
  throw new TypeError('Invalid input: intensity must be a positive number.');
  }
  if (!(position instanceof THREE.Vector3)) {
  throw new TypeError('Invalid input: position must be a THREE.Vector3 instance.');
  }
 

  const light = new THREE.DirectionalLight(color, intensity);
  light.position.copy(position);
  light.castShadow = true;
  return light;
  } catch (error) {
  console.warn('Error creating directional light:', error);
  return new THREE.DirectionalLight(0xffffff, 1);
  }
 };
 

 /**
  * Safely disposes of a Three.js material or an array of materials to prevent memory leaks.
  * @param material The THREE.Material or an array of THREE.Material to dispose.
  */
 const disposeMaterial = (material: THREE.Material | THREE.Material[]): void => {
  try {
  if (Array.isArray(material)) {
  material.forEach(mat => {
  if (!(mat instanceof THREE.Material)) {
  console.warn('Invalid material: item must be an instance of THREE.Material.');
  return;
  }
  if (mat.map) {
  mat.map.dispose();
  mat.map = null as any;
  }
  mat.dispose();
  });
  } else {
  if (!(material instanceof THREE.Material)) {
  console.warn('Invalid material: item must be an instance of THREE.Material.');
  return;
  }
  if (material.map) {
  material.map.dispose();
  material.map = null as any;
  }
  material.dispose();
  }
  } catch (error) {
  console.warn('Error disposing material:', error);
  }
 };
 

 /**
  * Generates a THREE.BoxGeometry with the specified dimensions.
  * @param width The width of the box.
  * @param height The height of the box.
  * @param depth The depth of the box.
  * @returns A THREE.BoxGeometry with the specified dimensions.
  * @throws {TypeError} If any of the dimensions are not finite positive numbers.
  */
 const generateBoxGeometry = (width: number, height: number, depth: number): THREE.BoxGeometry => {
  try {
  if (typeof width !== 'number' || !Number.isFinite(width) || width <= 0) {
  throw new TypeError('Invalid input: width must be a finite positive number.');
  }
  if (typeof height !== 'number' || !Number.isFinite(height) || height <= 0) {
  throw new TypeError('Invalid input: height must be a finite positive number.');
  }
  if (typeof depth !== 'number' || !Number.isFinite(depth) || depth <= 0) {
  throw new TypeError('Invalid input: depth must be a finite positive number.');
  }
 

  return new THREE.BoxGeometry(width, height, depth);
  } catch (error) {
  console.warn('Error generating BoxGeometry:', error);
  return new THREE.BoxGeometry(1, 1, 1);
  }
 };
 

 export { colorToVector3, createDirectionalLight, disposeMaterial, generateBoxGeometry };