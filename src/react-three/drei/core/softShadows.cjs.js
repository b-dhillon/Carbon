"use strict";function e(e){if(e&&e.__esModule)return e;var n=Object.create(null);return e&&Object.keys(e).forEach((function(a){if("default"!==a){var i=Object.getOwnPropertyDescriptor(e,a);Object.defineProperty(n,a,i.get?i:{enumerable:!0,get:function(){return e[a]}})}})),n.default=e,Object.freeze(n)}Object.defineProperty(exports,"__esModule",{value:!0});var n=e(require("three"));let a=!1;exports.softShadows=e=>{if(!a){a=!0;let i=n.ShaderChunk.shadowmap_pars_fragment;i=i.replace("#ifdef USE_SHADOWMAP","#ifdef USE_SHADOWMAP\n"+(({frustum:e=3.75,size:n=.005,near:a=9.5,samples:i=17,rings:r=11}={})=>`#define LIGHT_WORLD_SIZE ${n}\n#define LIGHT_FRUSTUM_WIDTH ${e}\n#define LIGHT_SIZE_UV (LIGHT_WORLD_SIZE / LIGHT_FRUSTUM_WIDTH)\n#define NEAR_PLANE ${a}\n\n#define NUM_SAMPLES ${i}\n#define NUM_RINGS ${r}\n#define BLOCKER_SEARCH_NUM_SAMPLES NUM_SAMPLES\n#define PCF_NUM_SAMPLES NUM_SAMPLES\n\nvec2 poissonDisk[NUM_SAMPLES];\n\nvoid initPoissonSamples(const in vec2 randomSeed) {\n  float ANGLE_STEP = PI2 * float(NUM_RINGS) / float(NUM_SAMPLES);\n  float INV_NUM_SAMPLES = 1.0 / float(NUM_SAMPLES);\n  float angle = rand(randomSeed) * PI2;\n  float radius = INV_NUM_SAMPLES;\n  float radiusStep = radius;\n  for (int i = 0; i < NUM_SAMPLES; i++) {\n    poissonDisk[i] = vec2(cos(angle), sin(angle)) * pow(radius, 0.75);\n    radius += radiusStep;\n    angle += ANGLE_STEP;\n  }\n}\n\nfloat penumbraSize(const in float zReceiver, const in float zBlocker) { // Parallel plane estimation\n  return (zReceiver - zBlocker) / zBlocker;\n}\n\nfloat findBlocker(sampler2D shadowMap, const in vec2 uv, const in float zReceiver) {\n  float searchRadius = LIGHT_SIZE_UV * (zReceiver - NEAR_PLANE) / zReceiver;\n  float blockerDepthSum = 0.0;\n  int numBlockers = 0;\n  for (int i = 0; i < BLOCKER_SEARCH_NUM_SAMPLES; i++) {\n    float shadowMapDepth = unpackRGBAToDepth(texture2D(shadowMap, uv + poissonDisk[i] * searchRadius));\n    if (shadowMapDepth < zReceiver) {\n      blockerDepthSum += shadowMapDepth;\n      numBlockers++;\n    }\n  }\n  if (numBlockers == 0) return -1.0;\n  return blockerDepthSum / float(numBlockers);\n}\n\nfloat PCF_Filter(sampler2D shadowMap, vec2 uv, float zReceiver, float filterRadius) {\n  float sum = 0.0;\n  for (int i = 0; i < PCF_NUM_SAMPLES; i++) {\n    float depth = unpackRGBAToDepth(texture2D(shadowMap, uv + poissonDisk[ i ] * filterRadius));\n    if (zReceiver <= depth) sum += 1.0;\n  }\n  for (int i = 0; i < PCF_NUM_SAMPLES; i++) {\n    float depth = unpackRGBAToDepth(texture2D(shadowMap, uv + -poissonDisk[ i ].yx * filterRadius));\n    if (zReceiver <= depth) sum += 1.0;\n  }\n  return sum / (2.0 * float(PCF_NUM_SAMPLES));\n}\n\nfloat PCSS(sampler2D shadowMap, vec4 coords) {\n  vec2 uv = coords.xy;\n  float zReceiver = coords.z; // Assumed to be eye-space z in this code\n  initPoissonSamples(uv);\n  float avgBlockerDepth = findBlocker(shadowMap, uv, zReceiver);\n  if (avgBlockerDepth == -1.0) return 1.0;\n  float penumbraRatio = penumbraSize(zReceiver, avgBlockerDepth);\n  float filterRadius = penumbraRatio * LIGHT_SIZE_UV * NEAR_PLANE / zReceiver;\n  return PCF_Filter(shadowMap, uv, zReceiver, filterRadius);\n}`)({...e})),i=i.replace("#if defined( SHADOWMAP_TYPE_PCF )","\nreturn PCSS(shadowMap, shadowCoord);\n#if defined( SHADOWMAP_TYPE_PCF )"),n.ShaderChunk.shadowmap_pars_fragment=i}};