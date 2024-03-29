import * as React from 'react';
import { PositionalAudio as PositionalAudioImpl } from 'three';
export declare const PositionalAudio: React.ForwardRefExoticComponent<Pick<Omit<import("@react-three/fiber").ExtendedColors<import("@react-three/fiber").Overwrite<Partial<PositionalAudioImpl>, import("@react-three/fiber").NodeProps<PositionalAudioImpl, typeof PositionalAudioImpl>>>, import("@react-three/fiber").NonFunctionKeys<{
    position?: import("@react-three/fiber").Vector3 | undefined;
    up?: import("@react-three/fiber").Vector3 | undefined;
    scale?: import("@react-three/fiber").Vector3 | undefined;
    rotation?: import("@react-three/fiber").Euler | undefined;
    matrix?: import("@react-three/fiber").Matrix4 | undefined;
    quaternion?: import("@react-three/fiber").Quaternion | undefined;
    layers?: import("@react-three/fiber").Layers | undefined;
    dispose?: (() => void) | null | undefined;
}>> & {
    position?: import("@react-three/fiber").Vector3 | undefined;
    up?: import("@react-three/fiber").Vector3 | undefined;
    scale?: import("@react-three/fiber").Vector3 | undefined;
    rotation?: import("@react-three/fiber").Euler | undefined;
    matrix?: import("@react-three/fiber").Matrix4 | undefined;
    quaternion?: import("@react-three/fiber").Quaternion | undefined;
    layers?: import("@react-three/fiber").Layers | undefined;
    dispose?: (() => void) | null | undefined;
} & import("@react-three/fiber/dist/declarations/src/core/events").EventHandlers & {
    url: string;
    distance?: number | undefined;
    loop?: boolean | undefined;
}, "visible" | "attach" | "args" | "children" | "key" | "onUpdate" | "position" | "up" | "scale" | "rotation" | "matrix" | "quaternion" | "layers" | "dispose" | "type" | "id" | "uuid" | "name" | "parent" | "modelViewMatrix" | "normalMatrix" | "matrixWorld" | "matrixAutoUpdate" | "matrixWorldNeedsUpdate" | "castShadow" | "receiveShadow" | "frustumCulled" | "renderOrder" | "animations" | "userData" | "customDepthMaterial" | "customDistanceMaterial" | "isObject3D" | "onBeforeRender" | "onAfterRender" | "applyMatrix4" | "applyQuaternion" | "setRotationFromAxisAngle" | "setRotationFromEuler" | "setRotationFromMatrix" | "setRotationFromQuaternion" | "rotateOnAxis" | "rotateOnWorldAxis" | "rotateX" | "rotateY" | "rotateZ" | "translateOnAxis" | "translateX" | "translateY" | "translateZ" | "localToWorld" | "worldToLocal" | "lookAt" | "add" | "remove" | "removeFromParent" | "clear" | "getObjectById" | "getObjectByName" | "getObjectByProperty" | "getWorldPosition" | "getWorldQuaternion" | "getWorldScale" | "getWorldDirection" | "raycast" | "traverse" | "traverseVisible" | "traverseAncestors" | "updateMatrix" | "updateMatrixWorld" | "updateWorldMatrix" | "toJSON" | "clone" | "copy" | "addEventListener" | "hasEventListener" | "removeEventListener" | "dispatchEvent" | "onEnded" | keyof import("@react-three/fiber/dist/declarations/src/core/events").EventHandlers | "source" | "stop" | "context" | "gain" | "setFilter" | "getFilter" | "panner" | "getOutput" | "setRefDistance" | "getRefDistance" | "setRolloffFactor" | "getRolloffFactor" | "setDistanceModel" | "getDistanceModel" | "setMaxDistance" | "getMaxDistance" | "setDirectionalCone" | "listener" | "autoplay" | "buffer" | "detune" | "loop" | "loopStart" | "loopEnd" | "offset" | "duration" | "playbackRate" | "isPlaying" | "hasPlaybackControl" | "sourceType" | "filters" | "setNodeSource" | "setMediaElementSource" | "setMediaStreamSource" | "setBuffer" | "play" | "pause" | "connect" | "disconnect" | "setDetune" | "getDetune" | "getFilters" | "setFilters" | "setPlaybackRate" | "getPlaybackRate" | "getLoop" | "setLoop" | "setLoopStart" | "setLoopEnd" | "getVolume" | "setVolume" | "load" | "distance" | "url"> & React.RefAttributes<unknown>>;
