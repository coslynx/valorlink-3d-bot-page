interface SampleModel {
  name: string;
  path: string;
}

/**
 * Returns a hardcoded array of objects, each representing a sample 3D model.
 * @returns An array of SampleModel objects.
 */
const getSampleModelPaths = (): SampleModel[] => {
  const models: SampleModel[] = [
    {
      name: 'Agent Model',
      path: 'public/models/agent_model.glb',
    },
    {
      name: 'Radianite Crate',
      path: 'public/models/radianite_crate.glb',
    },
    {
      name: 'Discord Logo',
      path: 'public/models/discord_logo.glb',
    },
  ];

  if (!models || models.length === 0) {
    console.warn('No sample model paths found.');
    return [];
  }

  for (const model of models) {
    if (!model.path) {
      console.warn('A sample model path is missing.');
      return [];
    }
  }

  return models;
};

/**
 * Logs the model error message to the console.
 * @param error - The error object.
 */
const handleModelError = (error: Error): void => {
  console.error(`Error loading model: ${error.message}`);
};

export const sampleModelHelper = { getSampleModelPaths, handleModelError };