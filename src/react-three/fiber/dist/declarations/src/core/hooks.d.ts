import * as THREE from 'three';
import * as React from 'react';
import { StateSelector, EqualityChecker } from 'zustand';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { RootState, RenderCallback } from './store';
import { ObjectMap } from './utils';
import { LoadingManager } from 'three';
import { LocalState } from './renderer';
export interface Loader<T> extends THREE.Loader {
    load(url: string, onLoad?: (result: T) => void, onProgress?: (event: ProgressEvent) => void, onError?: (event: ErrorEvent) => void): unknown;
}
export declare type Extensions = (loader: THREE.Loader) => void;
export declare type LoaderResult<T> = T extends any[] ? Loader<T[number]> : Loader<T>;
export declare type ConditionalType<Child, Parent, Truthy, Falsy> = Child extends Parent ? Truthy : Falsy;
export declare type BranchingReturn<T, Parent, Coerced> = ConditionalType<T, Parent, Coerced, T>;
export declare function useInstanceHandle<O>(ref: React.MutableRefObject<O>): React.MutableRefObject<LocalState>;
export declare function useStore(): import("zustand").UseBoundStore<RootState, import("zustand").StoreApi<RootState>>;
export declare function useThree<T = RootState>(selector?: StateSelector<RootState, T>, equalityFn?: EqualityChecker<T>): T;
export declare function useFrame(callback: RenderCallback, renderPriority?: number): null;
export declare function useGraph(object: THREE.Object3D): ObjectMap;
export declare function useLoader<T, U extends string | string[]>(Proto: new (manager?: LoadingManager) => LoaderResult<T>, input: U, extensions?: Extensions, onProgress?: (event: ProgressEvent<EventTarget>) => void): U extends any[] ? BranchingReturn<T, GLTF, GLTF & ObjectMap>[] : BranchingReturn<T, GLTF, GLTF & ObjectMap>;
export declare namespace useLoader {
    var preload: <T, U extends string | string[]>(Proto: new () => LoaderResult<T>, input: U, extensions?: Extensions | undefined) => undefined;
    var clear: <T, U extends string | string[]>(Proto: new () => LoaderResult<T>, input: U) => void;
}
