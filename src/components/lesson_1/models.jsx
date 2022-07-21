import { useSelector } from 'react-redux';
import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
// import Model0 from '../../models/Model0'

export default function Models() {
    const counter = useSelector(state => state.counter);

    if(counter === 0){
        return <Model0 />
    }

    else if(counter > 0){
        return (
            null
        )
    }

}

function Model0({ ...props })
{
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/Model0-transformed.glb')
  const { actions } = useAnimations(animations, group)

  useEffect(() =>
  {
    console.log(actions);
    actions['animation-emptyAction'].play();
    // actions['carbon-atomsAction'].play();

  })

  return (
    <group ref={group} {...props} dispose={null} scale={0.075}>
      <group name="Scene">
        <group name="animation-empty" >
          <mesh name="carbon-atoms" geometry={nodes['carbon-atoms'].geometry} material={materials.Carbon} position={[1.02, 3.01, 1.45]} scale={0.23} />
          <mesh name="carbon-bonds" geometry={nodes['carbon-bonds'].geometry} material={materials.Carbon} position={[2.9, 1.01, -1.53]} rotation={[-0.42, 1.23, -2.44]} />
          <mesh name="soccer-pattern" geometry={nodes['soccer-pattern'].geometry} material={materials.Carbon} position={[0.18, 1.66, 3.07]} scale={0.23} />
        </group>
      </group>
    </group>
  )
}