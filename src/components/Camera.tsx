// @ts-nocheck
import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, useHelper } from '@react-three/drei';

/** FN Description
 * 
 * Creates React Three Camera,
 * Creates all AnimationActions for camera transitions 
 * Creates and calls an AnimationController() that:
 *   Plays the correct Animation, based on section.
 *   Updates the animation mixer.
 * Renders cameraHelper when called.
 * 
*/ 

/**
 * 
 * Figure out how to hook/pass increment vs. decrement.
 *  A. We can use document.querySelector to figure out what button was clicked...
 *  B. We can take a delta. const delta: number = prevSection - currSection 
 *    If delta negative --> section increased --> forwardsNavigation
 *    If delta positive --> section decreased --> backwardsNavigation
 * 
 * 
 * 
 * 
 * 
 * 
 * On decrement. trigger the backwards block. trigger the animationActions[section + 1]
 * For mixers, 
 *  on decrement, trigger the backwards block and animationActions[section + 1]._mixer
 *  on increment, trigger the forwards block and animationActions[section]._mixer
 *  Will also need to add control flow for first and last sections. 
 * 
 * 
 * 
 * 
 * 
 * 
 */








// Just need to figure out how to set up increment vs decrement. 
// And if the decrement will need the section, or section-1, or section+1 to reverse?



// animationData --> animationClips --> animationActions --> animationController


export function Camera( { initializedPage, section }: any ): JSX.Element {
  
  const [ AnimationActions, setAnimationActions ] = useState([]);
  const camera = initializedPage.camera;
  const ref = useRef();

  const prevSection = useRef();








  
  
  
  
  
  
  
  
  
  
  
  
  // Creates AnimationActions for each camera rotation and translation via looping camera.animationClips[]
  useEffect(() => {

    createAnimationActions(ref.current, camera.animationClips);

    function createAnimationActions( ref: any, animationClips: [][] ) {

      function createAnimationAction( clip: THREE.AnimationClip ): THREE.AnimationAction {
        const mixer = new THREE.AnimationMixer(ref);
        const animationAction = mixer.clipAction(clip);
        animationAction.loop = THREE.LoopOnce;
        animationAction.clampWhenFinished = true;
        return animationAction;
      };

      const animationActions = animationClips.map((animationClip: []) => createAnimationAction(animationClip[0]) ); //why is index hard-coded 0?? --> because theres only one animation per section

      setAnimationActions(animationActions);
    };

  }, []);

  // AnimationController --> Plays the AnimationAction based on section
  useEffect(() => {

    animationController();

    function animationController() {
      if (AnimationActions.length) {
        // if (section !== 1) 
        // AnimationActions[section].play().warp(1, 0.01, 7.8); // .warp( 1.3, 0.01, 4.6 );






        // This is needed for the first animation before the start-button is clicked.
        if( section === 0 ) {
          console.log("ORIGIN block!", section);
          AnimationActions[0].reset();
          AnimationActions[0].timeScale = 1;
          AnimationActions[0].play();
          prevSection.current = 0;
        }

        if (prevSection.current !== undefined && section !== 0) {
          console.log('prevSection', prevSection.current);
          console.log('section', section);

          const forwardsNavigation: boolean = (prevSection.current - section) < 0;
          const backwardsNavigation: boolean = (prevSection.current - section) > 0;

          if (forwardsNavigation) {
            console.log("FORWARDS!", section);
            AnimationActions[section].reset();
            AnimationActions[section].timeScale = 1;
            AnimationActions[section].play();
            prevSection.current = section;
          }

          else if(backwardsNavigation) {
            console.log("BACKWARDS!", section);
            AnimationActions[section + 1].reset();
            AnimationActions[section + 1].time = camera.animationClips[section - 1][0].duration
            AnimationActions[section + 1].timeScale = -1;
            AnimationActions[section + 1].play();
            prevSection.current = section;

          }
        }


      }
    }

  }, [AnimationActions, section]);

  // Updates the animation via the mixer
  useFrame((_, delta) => {
    if (AnimationActions.length) {

      // This needs to be cleaned up and written better. 
      if (section===0) AnimationActions[0]._mixer.update(delta)
      AnimationActions[section]._mixer.update(delta)
      if (section!==0)AnimationActions[section+1]._mixer.update(delta)


    };
    // AnimationActions[1]._mixer.update(delta);
  });

  useHelper( ref, THREE.CameraHelper );


  // Setting the scene's camera. There are two. Perspective and Development.
  const set = useThree((state) => state.set);
  // useEffect(() => set({ camera: ref.current }));

  return (
    <>
      <PerspectiveCamera
        ref={ref}
        position={[camera.initialPosition]}
        fov={45}
        near={0.25}
        far={7}
      />
    </>
  );
}



















// import { CameraHelper } from "three"; <-- Not needed if THREE is already imported with *


// function SetCamera(cam): void {
//   set({ camera: cam });
// }


{
  /* < UpdateCamera _ref={ref} section={ section } camera_data={ camera_data } /> */
}
{
  /* < PerspectiveCamera ref={ref} position={ page.camera._animation_data[ 0 ][ 0 ] } fov={ 45 } near={ 0.15 } far={ 8 } /> */
}
