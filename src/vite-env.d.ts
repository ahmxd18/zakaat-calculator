/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOLD_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
