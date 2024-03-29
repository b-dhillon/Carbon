import { ReactThreeFiber } from '@react-three/fiber';
import * as React from 'react';
import * as THREE from 'three';
import { TransformControls as TransformControlsImpl } from 'three-stdlib';
export declare type TransformControlsProps = ReactThreeFiber.Object3DNode<TransformControlsImpl, typeof TransformControlsImpl> & JSX.IntrinsicElements['group'] & {
    object?: THREE.Object3D | React.MutableRefObject<THREE.Object3D>;
    enabled?: boolean;
    axis?: string | null;
    domElement?: HTMLElement;
    mode?: string;
    translationSnap?: number | null;
    rotationSnap?: number | null;
    scaleSnap?: number | null;
    space?: string;
    size?: number;
    showX?: boolean;
    showY?: boolean;
    showZ?: boolean;
    children?: React.ReactElement<THREE.Object3D>;
    camera?: THREE.Camera;
    onChange?: (e?: THREE.Event) => void;
    onMouseDown?: (e?: THREE.Event) => void;
    onMouseUp?: (e?: THREE.Event) => void;
    onObjectChange?: (e?: THREE.Event) => void;
    makeDefault?: boolean;
};
export declare const TransformControls: React.ForwardRefExoticComponent<Pick<TransformControlsProps, "object" | "visible" | "attach" | "args" | "children" | "key" | "onUpdate" | "position" | "up" | "scale" | "rotation" | "matrix" | "quaternion" | "layers" | "dispose" | "type" | "isGroup" | "id" | "uuid" | "name" | "parent" | "modelViewMatrix" | "normalMatrix" | "matrixWorld" | "matrixAutoUpdate" | "matrixWorldNeedsUpdate" | "castShadow" | "receiveShadow" | "frustumCulled" | "renderOrder" | "animations" | "userData" | "customDepthMaterial" | "customDistanceMaterial" | "isObject3D" | "onBeforeRender" | "onAfterRender" | "applyMatrix4" | "applyQuaternion" | "setRotationFromAxisAngle" | "setRotationFromEuler" | "setRotationFromMatrix" | "setRotationFromQuaternion" | "rotateOnAxis" | "rotateOnWorldAxis" | "rotateX" | "rotateY" | "rotateZ" | "translateOnAxis" | "translateX" | "translateY" | "translateZ" | "localToWorld" | "worldToLocal" | "lookAt" | "add" | "remove" | "removeFromParent" | "clear" | "getObjectById" | "getObjectByName" | "getObjectByProperty" | "getWorldPosition" | "getWorldQuaternion" | "getWorldScale" | "getWorldDirection" | "raycast" | "traverse" | "traverseVisible" | "traverseAncestors" | "updateMatrix" | "updateMatrixWorld" | "updateWorldMatrix" | "toJSON" | "clone" | "copy" | "addEventListener" | "hasEventListener" | "removeEventListener" | "dispatchEvent" | "onChange" | "onMouseDown" | "onMouseUp" | keyof import("@react-three/fiber/dist/declarations/src/core/events").EventHandlers | "camera" | "size" | "space" | "reset" | "enabled" | "connect" | "update" | "setSize" | "axis" | "domElement" | "makeDefault" | "isTransformControls" | "detach" | "getMode" | "setMode" | "setTranslationSnap" | "setRotationSnap" | "setScaleSnap" | "setSpace" | "onObjectChange" | "mode" | "translationSnap" | "rotationSnap" | "scaleSnap" | "showX" | "showY" | "showZ"> & React.RefAttributes<TransformControlsImpl<THREE.Camera>>>;
