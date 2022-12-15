"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("@babel/runtime/helpers/extends"),t=require("@react-three/fiber"),r=require("react"),n=require("three-stdlib");function s(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}function o(e){if(e&&e.__esModule)return e;var t=Object.create(null);return e&&Object.keys(e).forEach((function(r){if("default"!==r){var n=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(t,r,n.get?n:{enumerable:!0,get:function(){return e[r]}})}})),t.default=e,Object.freeze(t)}var a=s(e),u=o(r);const c=u.forwardRef((({makeDefault:e,camera:r,regress:s,domElement:o,enableDamping:c=!0,onChange:i,onStart:f,onEnd:d,...l},m)=>{const b=t.useThree((e=>e.invalidate)),v=t.useThree((e=>e.camera)),h=t.useThree((e=>e.gl)),p=t.useThree((e=>e.events)),E=t.useThree((e=>e.set)),g=t.useThree((e=>e.get)),O=t.useThree((e=>e.performance)),j=r||v,T=o||p.connected||h.domElement,L=u.useMemo((()=>new n.OrbitControls(j)),[j]);return t.useFrame((()=>{L.enabled&&L.update()}),-1),u.useEffect((()=>(L.connect(T),()=>{L.dispose()})),[T,s,L,b]),u.useEffect((()=>{const e=e=>{b(),s&&O.regress(),i&&i(e)};return L.addEventListener("change",e),f&&L.addEventListener("start",f),d&&L.addEventListener("end",d),()=>{f&&L.removeEventListener("start",f),d&&L.removeEventListener("end",d),L.removeEventListener("change",e)}}),[i,f,d,L,b]),u.useEffect((()=>{if(e){const e=g().controls;return E({controls:L}),()=>E({controls:e})}}),[e,L]),u.createElement("primitive",a.default({ref:m,object:L,enableDamping:c},l))}));exports.OrbitControls=c;
