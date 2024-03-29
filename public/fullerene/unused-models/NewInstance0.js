/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/newInstance0-transformed.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.fullereneModel.geometry} material={materials.carbonMaterial} rotation={[-Math.PI, 0, 0]} scale={0.07} />
    </group>
  )
}

useGLTF.preload('/newInstance0-transformed.glb')
