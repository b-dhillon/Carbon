"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("react"),r=require("@react-three/fiber");function t(e){if(e&&e.__esModule)return e;var r=Object.create(null);return e&&Object.keys(e).forEach((function(t){if("default"!==t){var u=Object.getOwnPropertyDescriptor(e,t);Object.defineProperty(r,t,u.get?u:{enumerable:!0,get:function(){return e[t]}})}})),r.default=e,Object.freeze(r)}var u=t(e);exports.useHelper=function(e,t,...n){const c=u.useRef(),a=r.useThree((e=>e.scene));return u.useEffect((()=>(e&&t&&null!=e&&e.current&&(c.current=new t(e.current,...n),c.current&&a.add(c.current)),!e&&c.current&&a.remove(c.current),()=>{c.current&&a.remove(c.current)})),[a,t,e,...n]),r.useFrame((()=>{var e;null!=(e=c.current)&&e.update&&c.current.update()})),c};
