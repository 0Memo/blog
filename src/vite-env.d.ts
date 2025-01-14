/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_apiKey: string;
    readonly VITE_API_authDomain: string;
    readonly VITE_API_projectId: string;
    readonly VITE_API_storageBucket: string;
    readonly VITE_API_messagingSenderId: string;
    readonly VITE_API_appId: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}  