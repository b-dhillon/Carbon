/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/newInstance4-transformed.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.proteaseModel.geometry} material={materials.proteaseMaterial} position={[0, 0.83, 0]} rotation={[Math.PI, -1.38, Math.PI]} scale={0.17} />
      <mesh geometry={nodes.fullereneModel.geometry} material={materials.carbonMaterial} position={[0.2, 0.17, 0.96]} rotation={[-0.46, 0, -Math.PI / 2]} scale={0.07} />
    </group>
  )
}

useGLTF.preload('/newInstance4-transformed.glb')
