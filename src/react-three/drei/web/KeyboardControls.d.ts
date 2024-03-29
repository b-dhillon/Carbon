import * as React from 'react';
import { StateSelector } from 'zustand';
declare type KeyboardControlsState = {
    [key: string]: boolean;
};
declare type KeyboardControlsEntry = {
    name: string;
    keys: string[];
    up?: boolean;
};
declare type KeyboardControlsProps = {
    map: KeyboardControlsEntry[];
    children: React.ReactNode;
    onChange?: (name: string, pressed: boolean, state: KeyboardControlsState) => void;
    domElement?: HTMLElement;
};
export declare function KeyboardControls({ map, children, onChange, domElement }: KeyboardControlsProps): JSX.Element;
export declare function useKeyboardControls(sel?: StateSelector<KeyboardControlsState, any>): any;
export {};
