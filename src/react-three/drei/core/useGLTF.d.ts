import { GLTFLoader } from 'three-stdlib';
export declare function useGLTF<T extends string | string[]>(path: T, useDraco?: boolean | string, useMeshOpt?: boolean, extendLoader?: (loader: GLTFLoader) => void): T extends any[] ? (import("three/examples/jsm/loaders/GLTFLoader").GLTF & import("@react-three/fiber").ObjectMap)[] : import("three/examples/jsm/loaders/GLTFLoader").GLTF & import("@react-three/fiber").ObjectMap;
export declare namespace useGLTF {
    var preload: (path: string | string[], useDraco?: string | boolean, useMeshOpt?: boolean, extendLoader?: ((loader: GLTFLoader) => void) | undefined) => undefined;
    var clear: (input: string | string[]) => void;
}
