/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_API_KEY: string;
  // boshqa env o'zgaruvchilarni shu yerga qo'shing
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
