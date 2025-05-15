/// <reference types="vite/client" />

interface ImportMetaEnv extends Record<string, any> {
  /**
   * The base URL for the API, configured in .env files and exposed by Vite.
   */
  readonly VITE_API_BASE_URL: string;
  /**
   * The name of the bot, configured in .env files and exposed by Vite.
   */
  readonly VITE_BOT_NAME: string;
}

interface ImportMeta {
  /**
   * The environment variables exposed by Vite.
   */
  readonly env: ImportMetaEnv;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}

declare module '*.glb' {
  const content: string;
  export default content;
}

declare module '*.gltf' {
  const content: string;
  export default content;
}