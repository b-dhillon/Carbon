"use strict";function e(e){if(e&&e.__esModule)return e;var r=Object.create(null);return e&&Object.keys(e).forEach((function(t){if("default"!==t){var u=Object.getOwnPropertyDescriptor(e,t);Object.defineProperty(r,t,u.get?u:{enumerable:!0,get:function(){return e[t]}})}})),r.default=e,Object.freeze(r)}Object.defineProperty(exports,"__esModule",{value:!0});var r=e(require("react"));exports.useCursor=function(e,t="pointer",u="auto"){r.useEffect((()=>{if(e)return document.body.style.cursor=t,()=>{document.body.style.cursor=u}}),[e])};