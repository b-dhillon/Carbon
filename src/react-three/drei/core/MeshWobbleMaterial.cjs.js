"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("@babel/runtime/helpers/extends"),t=require("react"),r=require("three"),a=require("@react-three/fiber");function i(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}function o(e){if(e&&e.__esModule)return e;var t=Object.create(null);return e&&Object.keys(e).forEach((function(r){if("default"!==r){var a=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(t,r,a.get?a:{enumerable:!0,get:function(){return e[r]}})}})),t.default=e,Object.freeze(t)}var n=i(e),s=o(t);class c extends r.MeshStandardMaterial{constructor(e={}){super(e),this.setValues(e),this._time={value:0},this._factor={value:1}}onBeforeCompile(e){e.uniforms.time=this._time,e.uniforms.factor=this._factor,e.vertexShader=`\n      uniform float time;\n      uniform float factor;\n      ${e.vertexShader}\n    `,e.vertexShader=e.vertexShader.replace("#include <begin_vertex>","float theta = sin( time + position.y ) / 2.0 * factor;\n        float c = cos( theta );\n        float s = sin( theta );\n        mat3 m = mat3( c, 0, s, 0, 1, 0, -s, 0, c );\n        vec3 transformed = vec3( position ) * m;\n        vNormal = vNormal * m;")}get time(){return this._time.value}set time(e){this._time.value=e}get factor(){return this._factor.value}set factor(e){this._factor.value=e}}const u=s.forwardRef((({speed:e=1,...t},r)=>{const[i]=s.useState((()=>new c));return a.useFrame((t=>i&&(i.time=t.clock.getElapsedTime()*e))),s.createElement("primitive",n.default({object:i,ref:r,attach:"material"},t))}));exports.MeshWobbleMaterial=u;
