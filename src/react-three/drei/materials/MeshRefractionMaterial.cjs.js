"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var r=require("three"),e=require("../core/shaderMaterial.cjs.js"),n=require("three-mesh-bvh");function i(r){if(r&&r.__esModule)return r;var e=Object.create(null);return r&&Object.keys(r).forEach((function(n){if("default"!==n){var i=Object.getOwnPropertyDescriptor(r,n);Object.defineProperty(e,n,i.get?i:{enumerable:!0,get:function(){return r[n]}})}})),e.default=r,Object.freeze(e)}var o=i(r);const t=e.shaderMaterial({envMap:null,bounces:3,ior:2.4,correctMips:!0,aberrationStrength:.01,fresnel:0,bvh:new n.MeshBVHUniformStruct,color:new o.Color("white"),resolution:new o.Vector2},"\n  #ifndef USE_COLOR\n    uniform vec3 color;\n  #endif\n  varying vec3 vWorldPosition;  \n  varying vec3 vNormal;\n  varying mat4 projectionMatrixInv;\n  varying mat4 viewMatrixInv;\n  varying vec3 viewDirection;\n  varying mat4 vInstanceMatrix;\n  varying vec3 vColor;\n  \n  void main() {        \n    vec4 transformedNormal = vec4(normal, 0.0);\n    vec4 transformedPosition = vec4(position, 1.0);\n    #ifdef USE_INSTANCING\n      vInstanceMatrix = instanceMatrix;\n      transformedNormal = instanceMatrix * transformedNormal;\n      transformedPosition = instanceMatrix * transformedPosition;\n    #else\n      vInstanceMatrix = mat4(1.0);\n    #endif\n\n    vColor = color;\n    #ifdef USE_INSTANCING_COLOR\n      vColor *= instanceColor.rgb;\n    #endif\n  \n    projectionMatrixInv = inverse(projectionMatrix);\n    viewMatrixInv = inverse(viewMatrix);\n  \n    vWorldPosition = (modelMatrix * transformedPosition).xyz;    \n    vNormal = (viewMatrixInv * vec4(normalMatrix * transformedNormal.xyz, 0.0)).xyz;\n    viewDirection = normalize(vWorldPosition - cameraPosition);\n    gl_Position = projectionMatrix * viewMatrix * modelMatrix * transformedPosition;\n  }",`\n  #define ENVMAP_TYPE_CUBE_UV\n  precision highp isampler2D;\n  precision highp usampler2D;\n  varying vec3 vWorldPosition;\n  varying vec3 vNormal;\n    \n  #ifdef ENVMAP_TYPE_CUBEM\n    uniform samplerCube envMap;\n  #else\n    uniform sampler2D envMap;\n  #endif\n    \n  uniform float bounces;\n  ${n.shaderStructs}\n  ${n.shaderIntersectFunction}\n  uniform BVH bvh;\n  uniform float ior;\n  uniform bool correctMips;\n  uniform vec2 resolution;\n  uniform float fresnel;\n  uniform mat4 modelMatrix;\n    \n  uniform float aberrationStrength;\n  varying mat4 projectionMatrixInv;\n  varying mat4 viewMatrixInv;\n  varying vec3 viewDirection;  \n  varying mat4 vInstanceMatrix;\n  varying vec3 vColor;\n  \n  float fresnelFunc(vec3 viewDirection, vec3 worldNormal) {\n    return pow( 1.0 + dot( viewDirection, worldNormal), 10.0 );\n  }\n    \n  vec3 totalInternalReflection(vec3 ro, vec3 rd, vec3 normal, float ior, mat4 modelMatrixInverse) {\n    vec3 rayOrigin = ro;\n    vec3 rayDirection = rd;\n    rayDirection = refract(rayDirection, normal, 1.0 / ior);\n    rayOrigin = vWorldPosition + rayDirection * 0.001;\n    rayOrigin = (modelMatrixInverse * vec4(rayOrigin, 1.0)).xyz;\n    rayDirection = normalize((modelMatrixInverse * vec4(rayDirection, 0.0)).xyz);\n    for(float i = 0.0; i < bounces; i++) {\n      uvec4 faceIndices = uvec4( 0u );\n      vec3 faceNormal = vec3( 0.0, 0.0, 1.0 );\n      vec3 barycoord = vec3( 0.0 );\n      float side = 1.0;\n      float dist = 0.0;\n      bvhIntersectFirstHit( bvh, rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist );\n      vec3 hitPos = rayOrigin + rayDirection * max(dist - 0.001, 0.0);      \n      vec3 tempDir = refract(rayDirection, faceNormal, ior);\n      if (length(tempDir) != 0.0) {\n        rayDirection = tempDir;\n        break;\n      }\n      rayDirection = reflect(rayDirection, faceNormal);\n      rayOrigin = hitPos + rayDirection * 0.01;\n    }\n    rayDirection = normalize((modelMatrix * vec4(rayDirection, 0.0)).xyz);\n    return rayDirection;\n  }\n    \n  #include <common>\n  #include <cube_uv_reflection_fragment>\n    \n  #ifdef ENVMAP_TYPE_CUBEM\n    vec4 textureGradient(samplerCube envMap, vec3 rayDirection, vec3 directionCamPerfect) {\n      return textureGrad(envMap, rayDirection, dFdx(correctMips ? directionCamPerfect: rayDirection), dFdy(correctMips ? directionCamPerfect: rayDirection));\n    }\n  #else\n    vec4 textureGradient(sampler2D envMap, vec3 rayDirection, vec3 directionCamPerfect) {\n      vec2 uvv = equirectUv( rayDirection );\n      vec2 smoothUv = equirectUv( directionCamPerfect );\n      return textureGrad(envMap, uvv, dFdx(correctMips ? smoothUv : uvv), dFdy(correctMips ? smoothUv : uvv));\n    }\n  #endif\n  \n  void main() {\n    mat4 modelMatrixInverse = inverse(modelMatrix * vInstanceMatrix);\n    vec2 uv = gl_FragCoord.xy / resolution;\n    vec3 directionCamPerfect = (projectionMatrixInv * vec4(uv * 2.0 - 1.0, 0.0, 1.0)).xyz;\n    directionCamPerfect = (viewMatrixInv * vec4(directionCamPerfect, 0.0)).xyz;\n    directionCamPerfect = normalize(directionCamPerfect);\n    vec3 normal = vNormal;\n    vec3 rayOrigin = cameraPosition;\n    vec3 rayDirection = normalize(vWorldPosition - cameraPosition);\n    vec3 finalColor;\n    #ifdef CHROMATIC_ABERRATIONS\n      vec3 rayDirectionG = totalInternalReflection(rayOrigin, rayDirection, normal, max(ior, 1.0), modelMatrixInverse);\n      #ifdef FAST_CHROMA \n        vec3 rayDirectionR = normalize(rayDirectionG + 1.0 * vec3(aberrationStrength / 2.0));\n        vec3 rayDirectionB = normalize(rayDirectionG - 1.0 * vec3(aberrationStrength / 2.0));\n      #else\n        vec3 rayDirectionR = totalInternalReflection(rayOrigin, rayDirection, normal, max(ior * (1.0 - aberrationStrength), 1.0), modelMatrixInverse);\n        vec3 rayDirectionB = totalInternalReflection(rayOrigin, rayDirection, normal, max(ior * (1.0 + aberrationStrength), 1.0), modelMatrixInverse);\n      #endif\n      float finalColorR = textureGradient(envMap, rayDirectionR, directionCamPerfect).r;\n      float finalColorG = textureGradient(envMap, rayDirectionG, directionCamPerfect).g;\n      float finalColorB = textureGradient(envMap, rayDirectionB, directionCamPerfect).b;\n      finalColor = vec3(finalColorR, finalColorG, finalColorB) * vColor;\n    #else\n      rayDirection = totalInternalReflection(rayOrigin, rayDirection, normal, max(ior, 1.0), modelMatrixInverse);\n      finalColor = textureGradient(envMap, rayDirection, directionCamPerfect).rgb;    \n      finalColor *= vColor;\n    #endif\n    float nFresnel = fresnelFunc(viewDirection, normal) * fresnel;\n    gl_FragColor = vec4(mix(finalColor, vec3(1.0), nFresnel), 1.0);      \n    #include <tonemapping_fragment>\n    #include <encodings_fragment>\n  }`);exports.MeshRefractionMaterial=t;
