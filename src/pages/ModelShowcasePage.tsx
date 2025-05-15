import React, { ReactNode, memo } from 'react';
 import MinimalLayout from 'src/components/layout/MinimalLayout';
 import { ModelLoader } from 'src/components/3d/ModelLoader';
 import 'src/styles/pages/model-showcase.css';
 

 interface ModelData {\n  name: string;\n  path: string;\n }\n \n
 const ModelShowcasePage: React.FC = React.memo(() => {\n  const models: ModelData[] = [\n  {\n  name: 'Agent Model',\n  path: 'public/models/agent_model.glb',\n  },\n  {\n  name: 'Radianite Crate',\n  path: 'public/models/radianite_crate.glb',\n  },\n  {\n  name: 'Discord Logo',\n  path: 'public/models/discord_logo.glb',\n  },\n  ];\n \n
  try {\n  return (\n  <div aria-label=\"3D Model Showcase Page\">\n  <MinimalLayout>\n  <h1 className=\"text-3xl font-bold text-center mb-8 font-exo-2 text-red-500\">\n  3D Model Showcase\n  </h1>\n  <div className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6\">\n  {models.map((model, index) => (\n  <div key={index} className=\"text-center\">\n  <h2 className=\"font-roboto text-white\">{model.name}</h2>\n  <ModelLoader path={model.path} />\n  </div>\n  ))}\n  </div>\n  </MinimalLayout>\n  </div>\n  );\n  } catch (error:any) {\n  console.error('Error rendering ModelShowcasePage:', error);\n  return (\n  <div className=\"text-red-500 font-roboto\" aria-live=\"assertive\">\n  An error occurred while rendering the model showcase page.\n  </div>\n  );\n  }\n });\n \n
 ModelShowcasePage.displayName = 'ModelShowcasePage';\n \n
 export default ModelShowcasePage;