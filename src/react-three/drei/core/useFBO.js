import * as React from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';

// 👇 uncomment when TS version supports function overloads
// export function useFBO(settings?: FBOSettings)
function useFBO(width, height, settings) {
  const {
    gl,
    size,
    viewport
  } = useThree();

  const _width = typeof width === 'number' ? width : size.width * viewport.dpr;

  const _height = typeof height === 'number' ? height : size.height * viewport.dpr;

  const _settings = (typeof width === 'number' ? settings : width) || {};

  const {
    samples,
    ...targetSettings
  } = _settings;
  const target = React.useMemo(() => {
    let target;
    target = new THREE.WebGLRenderTarget(_width, _height, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      encoding: gl.outputEncoding,
      type: THREE.HalfFloatType,
      ...targetSettings
    });
    target.samples = samples;
    return target;
  }, []);
  React.useLayoutEffect(() => {
    target.setSize(_width, _height);
    if (samples) target.samples = samples;
  }, [samples, target, _width, _height]);
  React.useEffect(() => {
    return () => target.dispose();
  }, []);
  return target;
}

export { useFBO };
