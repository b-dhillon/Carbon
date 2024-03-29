import * as React from 'react';
import { useThree, useFrame } from '@react-three/fiber';

function useHelper(object3D, helperConstructor, ...args) {
  const helper = React.useRef();
  const scene = useThree(state => state.scene);
  React.useEffect(() => {
    if (object3D) {
      if (helperConstructor && object3D != null && object3D.current) {
        helper.current = new helperConstructor(object3D.current, ...args);

        if (helper.current) {
          scene.add(helper.current);
        }
      }
    }
    /**
     * Dispose of the helper if no object 3D is passed
     */


    if (!object3D && helper.current) {
      scene.remove(helper.current);
    }

    return () => {
      if (helper.current) {
        scene.remove(helper.current);
      }
    };
  }, [scene, helperConstructor, object3D, ...args]);
  useFrame(() => {
    var _helper$current;

    if ((_helper$current = helper.current) != null && _helper$current.update) {
      helper.current.update();
    }
  });
  return helper;
}

export { useHelper };
