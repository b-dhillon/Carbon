import * as THREE from 'three';
import * as React from 'react';
import { AttachType, Instance, InstanceProps, LocalState } from './renderer';
import { Dpr, RootState, Size } from './store';
export declare type Camera = THREE.OrthographicCamera | THREE.PerspectiveCamera;
export declare const isOrthographicCamera: (def: Camera) => def is THREE.OrthographicCamera;
export declare const isRef: (obj: any) => obj is React.MutableRefObject<unknown>;
export declare const useIsomorphicLayoutEffect: typeof React.useLayoutEffect;
export declare function useMutableCallback<T>(fn: T): React.MutableRefObject<T>;
export declare type SetBlock = false | Promise<null> | null;
export declare type UnblockProps = {
    set: React.Dispatch<React.SetStateAction<SetBlock>>;
    children: React.ReactNode;
};
export declare function Block({ set }: Omit<UnblockProps, 'children'>): null;
export declare class ErrorBoundary extends React.Component<{
    set: React.Dispatch<Error | undefined>;
    children: React.ReactNode;
}, {
    error: boolean;
}> {
    state: {
        error: boolean;
    };
    static getDerivedStateFromError: () => {
        error: boolean;
    };
    componentDidCatch(err: Error): void;
    render(): React.ReactNode;
}
export declare const DEFAULT = "__default";
export declare type DiffSet = {
    memoized: {
        [key: string]: any;
    };
    changes: [key: string, value: unknown, isEvent: boolean, keys: string[]][];
};
export declare const isDiffSet: (def: any) => def is DiffSet;
export declare type ClassConstructor = {
    new (): void;
};
export declare type ObjectMap = {
    nodes: {
        [name: string]: THREE.Object3D;
    };
    materials: {
        [name: string]: THREE.Material;
    };
};
export declare function calculateDpr(dpr: Dpr): number;
export declare const getRootState: (obj: THREE.Object3D) => RootState | undefined;
export declare type EquConfig = {
    arrays?: 'reference' | 'shallow';
    objects?: 'reference' | 'shallow';
    strict?: boolean;
};
export declare const is: {
    obj: (a: any) => boolean;
    fun: (a: any) => a is Function;
    str: (a: any) => a is string;
    num: (a: any) => a is number;
    boo: (a: any) => a is boolean;
    und: (a: any) => boolean;
    arr: (a: any) => boolean;
    equ(a: any, b: any, { arrays, objects, strict }?: EquConfig): boolean;
};
export declare function buildGraph(object: THREE.Object3D): ObjectMap;
export declare function dispose<TObj extends {
    dispose?: () => void;
    type?: string;
    [key: string]: any;
}>(obj: TObj): void;
export declare function prepare<T = THREE.Object3D>(object: T, state?: Partial<LocalState>): T;
export declare function attach(parent: Instance, child: Instance, type: AttachType): void;
export declare function detach(parent: Instance, child: Instance, type: AttachType): void;
export declare function diffProps(instance: Instance, { children: cN, key: kN, ref: rN, ...props }: InstanceProps, { children: cP, key: kP, ref: rP, ...previous }?: InstanceProps, remove?: boolean): DiffSet;
export declare function applyProps(instance: Instance, data: InstanceProps | DiffSet): Instance;
export declare function invalidateInstance(instance: Instance): void;
export declare function updateInstance(instance: Instance): void;
export declare function updateCamera(camera: Camera & {
    manual?: boolean;
}, size: Size): void;
export declare function setDeep(obj: any, value: any, keys: string[]): any;
