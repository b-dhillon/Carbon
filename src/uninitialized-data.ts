// File Description:
/**
 * This object contains an array of all uninititalized, hard-coded data of the App. Data needed to render each page of the app.
 *
 * Hard Coded:
 *   Camera positions and rotations
 *   Which animations each model will have access too. i.e. Model's AnimationClips
 *   Model paths and Voice paths
 */
import { useDispatch } from 'react-redux';
import { UninitializedData, UninitializedPage } from './types/types';
import { TranslateRotate } from './components/animations/TranslateRotate';
import { AnimationClip } from 'three';
import ScaleXYZ from './components/animations/ScaleXYZ';
import { spinY } from './components/animations/spin-y';
import { suspend } from './components/animations/suspend';
import { TranslateCircle } from './components/animations/TranslateCircle';
import { getVectorOnCircle } from './utility-functions/get-vector-on-circle';

interface RotationInfo {
  axis: string, 
  rotationsEqual: boolean
}


export const uninitializedData: UninitializedData = {

  textChimePath: '/audio/sound-effects/chime-0.mp3',

  pages: [
    {
      id: 'test-page',
      title: 'Buckminsterfullerene',
      section: 0,
      maxSection: 5, //including section0, total sections => sections.length === 6.
      thumbnail: "url('./lessonThumbnails/fullereneTile.png')",

      universe: {
        id: 'fullereneUniverse',
        starCount: 25000,
        radius: 5,
      },

      camera: {

        /** Instead of hard-coded, this array could be generated
         *  programatically by checking models[section].newModelLocation
         *  if true: TranslateRotate, else: TranslateCircle
        */
        animationTypes: [
          TranslateRotate, // -1 --> 0
          TranslateRotate, //  0 --> 1
          TranslateRotate, //  1 --> 2
          TranslateCircle, //  2 --> 3
          TranslateRotate, //  3 --> 4
          TranslateRotate, //  4 --> 5
        ],

        positions: [
          [0.00, 0.00, 5.00], 
          // -1 

          [0.00, 0.00, 0.00], 
          // section0 final, section1 initial Opening position, section 0

          [0.00, 0.00, 1.00], 
          // section1 final, section2 initial ..1985

          [0.75, 0.00,-2.00], 
          // section2 final, section3 initial ..most symmetrical form

          getVectorOnCircle( [0.75, 0.00,-2.00], Math.PI/2 ), // left side of circle: [ -0.25, 0, -3 ]
          // section3 final, section4 inital ...soccer ball 
          
          // pullOut animation for camera after quarter circle turn: 
          getVectorOnCircle( [0.75, 0.00,-2.00], Math.PI/2 ).map( (pos, i) => i === 0 ? pos - 4 : pos ), // [ -4.25, 0, -3 ]
          // section4 final, section5 inital

          [ -3.25, 2.00, -3.00 ] 
          // section5 final
        ],

        rotations: [
          [0.00, 0.00, 0.00], // -1

          [0.00, 0.00, 0.00], // section 0 - Opening position

          [0.66, 0.00, 0.00], // section 1 - 1985

          [0.00, 0.00, 0.00], // section 2 - Most symmetrical form

          [0.00, -(Math.PI/2), 0.00], // section 3 ..soccer ball pattern
          
          [0.00, -(Math.PI/2), 0.00], // section 4 ..doped

          [0.00, 0.00, 0.00], // section 5 ..HIV-1-Protease
        ],

        createAnimationDS(): number[][][] {
          const animationData: number[][][] = [];
          for (let i = 0; i < this.positions.length - 1; i++) {
            const initialPosition: number[] = this.positions[i];
            const finalPosition: number[] = this.positions[i + 1];
            const initialRotation: number[] = this.rotations[i];
            const finalRotation: number[] = this.rotations[i + 1];
            animationData.push([
              initialPosition,
              finalPosition,
              initialRotation,
              finalRotation,
            ]);
          }
          return animationData;
        },

        createAnimationClips( animationDS: any, page: UninitializedPage, modelPositions: number[][], rotationInfos: RotationInfo[] ): AnimationClip[][] {

          const modelInNewPosArr = page.models.map( (model) => model.newModelLocation )

          const AnimationClips = animationDS.map((animationData: [][], section: number) => {

            let modelInNewPos = modelInNewPosArr[section]
            
            // let _axisData = modelInNewPos ? findRotationAxis( animationData ) : findRotationAxis( animationDS[ section-1 ] )

            // FindRotationAxis(animationData),
            let ClipConstructor = this.animationTypes[section]

            return [
              ClipConstructor({
                // duration: 4,
                duration: 1,
                initialPosition: animationData[ 0 ],
                finalPosition: animationData[ 1 ],
                initialAngle: animationData[ 2 ],
                finalAngle: animationData[ 3 ],

                rotationInfo: rotationInfos[ section ],

                modelPosition: modelPositions[ section ],

                easingType: section === 0 ? 'out' : 'inOut',
                _page: page,
                _i: section,
                _modelInNewPos: modelInNewPos
              }),
            ];
          })
          return AnimationClips;
        }
      },

      models: [
        {
          id: '0',
          name: 'model0',
          path: '/fullerene/models/m0.glb',
          visible: false,
          newModelLocation: true,
          scale: 0.18,
          yOffsetForText: 0,

          zoomInOnReverse: false,
          animationClips: [
            suspend( 90 ),
            ScaleXYZ({
              duration: 1,
              iScale: [0.18, 0.18, 0.18],
              fScale: [0, 0, 0],
            }),
          ],
        },
        {
          id: '1',
          name: 'model1',
          // path: '', //falsy path for future re-write
          path: '/fullerene/models/m1.glb',
          visible: false,
          newModelLocation: true,
          scale: 0,
          yOffsetForText: 0.15,
          zoomInOnReverse: false,
          animationClips: [
            spinY({
              duration: 50,
              axis: 'y',
              iRot: 0,
              fRot: Math.PI * 2, // this is supposed to be radians...?
            }),
            ScaleXYZ({
              duration: 1,
              iScale: [0, 0, 0],
              fScale: [0.0, 0.0, 0.0],
            }),
          ],
        },
        {
          id: '2',
          name: 'model2',
          path: '/fullerene/models/m0.glb',
          visible: false,
          newModelLocation: true,
          scale: 0,
          yOffsetForText: 0.15,
          zoomInOnReverse: false,
          animationClips: [
            spinY({
              duration: 50,
              axis: 'y',
              iRot: 0,
              fRot: Math.PI * 2, // this is supposed to be radians...?
            }),
            ScaleXYZ({
              duration: 1,
              iScale: [0.18, 0.18, 0.18],
              fScale: [0.0, 0.0, 0.0],
            }),
          ],
        },
        {
          id: '3',
          name: 'model3',
          path: '/fullerene/models/m2.glb',
          visible: false,
          newModelLocation: false,
          scale: 0.18,
          yOffsetForText: 0.15,
          zoomInOnReverse: false,
          animationClips: [
            spinY({
              duration: 50,
              axis: 'y',
              iRot: 0,
              fRot: Math.PI * 2, // this is supposed to be radians...?
            }),
            ScaleXYZ({
              duration: 1,
              iScale: [0.18, 0.18, 0.18],
              fScale: [0.0, 0.0, 0.0],
            })
          ]
        },
        {
          id: '4',
          name: 'model4',
          path: '/fullerene/models/m3.glb',
          visible: false,
          newModelLocation: true,
          scale: 0,
          yOffsetForText: 0.15,
          zoomInOnReverse: true,
          animationClips: [
            spinY({
              duration: 50,
              axis: 'y',
              iRot: 0,
              fRot: Math.PI * 2
            }),
            ScaleXYZ({
              duration: 1,
              iScale: [0.18, 0.18, 0.18],
              fScale: [0.0, 0.0, 0.0],
            }),
            spinY({
              duration: 1500,
              axis: 'x',
              iRot: 0,
              fRot: 360,
            }),
          ],
        },
        {
          id: '5',
          name: 'model5',
          path: '/fullerene/models/m4.glb',
          visible: false,
          newModelLocation: true,
          scale: 0,
          yOffsetForText: 0.07,
          zoomInOnReverse: false,
          animationClips: [
            spinY({
              duration: 4000,
              axis: 'y',
              iRot: 0,
              fRot: 180,
            }),
            //hiv protease
            ScaleXYZ({
              duration: 1,
              iScale: [0.055, 0.055, 0.055],
              fScale: [0.0, 0.0, 0.0],
            }),
            //buckyball
            ScaleXYZ({
              duration: 1.6, //higher number is slower
              iScale: [0.045, 0.045, 0.045],
              fScale: [0.070, 0.070, 0.070],
            }),
          ],
        },
      ],

      text: [
        [''],
        [
          'In 1985, chemists were studying how molecules form in outer space when they began vaporizing graphite rods in an atmosphere of Helium gas...'
        ],
        [
          'Firing lazers at graphite rods in a supersonic helium beam, produced novel cage-like molecules composed of 60 carbon atoms, joined together to form a hollow sphere.',
          'The largest and most symmetrical form of pure carbon ever discovered.', 
          'This molecule would go on to be named Buckminsterfullerene.'
        ],
        [
          'The carbon atoms arrange themselves as hexagons and pentagons (highlighted in red), like the seams of a soccer ball.', 
          'Fullerenes are exceedingly rugged and are even capable of surviving the extreme temperatures of outer space.', 
          'And because they are essentially hollow cages, they can be manipulated to make materials never before known.'
        ],
        [
          'For example, when a buckyball is "doped" via inserting potassium or cesium into its cavity, it becomes the best organic superconductor known.', 
          'These molecules are presently being studied for use in many other applications, such as new polymers and catalysts, as well as novel drug delivery systems.',
          'Scientists have even turned their attention to Buckminsterfullerene in their quest for a cure for AIDS.'
        ],
        [
          'How can Buckminsterfullerene help cure AIDS?',
          'An enzyme (HIV-1-Protease) that is required for HIV to replicate, exhibits a non-polar pocket in its three-dimensional structure.', 
          "On the protein model in front of you, notice how the non-polar Fullerene fits the exact diameter of the enzyme's binding pocket.",
          'If this pocket is blocked, the production of virus ceases. Because buckyballs are nonpolar, and have approximately the same diameter as the pocket of the enzyme, they are being considered as possible HIV-1-Protease inhibitors.'
        ]
      ],
      
      textPlacement: [
        '',
        'center',
        'bottom',
        'bottom',
        'bottom',
        'bottom'
      ],

      music: ['/audio/music/fullerene3.mp3'],

      voices: [
        '/audio/voices/fiona/voice0.mp3', // 0
        '/audio/voices/fiona/voice0.mp3', // 1
        '/audio/voices/fiona/voice1.mp3', // 2
        '/audio/voices/fiona/voice1.mp3', // 3
        '/audio/voices/fiona/voice1.mp3', // 4
      ],
      //                0     1     2     3     4
      // loadedVoices: [null, null, null, null, null],

      dispatch: useDispatch,
    },
  ],
};

// old createModelPosition method:
/*
  createModelPosition( 
    cameraPosition: number[],
    cameraRotation: number[],
    axisData: [string, boolean],
    yOffsetForText: number ): number[] {
    
    let rotationAxis = axisData[0];
    // console.log('camera rotation', cameraRotation);

    // rotate X-axis, re-position model on Y axis.
    if ( rotationAxis === 'x' || rotationAxis === 'z' ) {
      const rotationAngle = cameraRotation[0];
      const x = cameraPosition[0];
      const y = cameraPosition[1] + rotationAngle + yOffsetForText
      const z = cameraPosition[2] - 1;
      return [x, y, z];
    }


    // rotate Y-axis, need to re-position model on X axis AND Z axis. --> Really, Z axis needed? Not just X axis??
    if (rotationAxis === 'y' && cameraRotation[1] !== 0) {
      const rotationAngle = cameraRotation[1]; // -1.58
      // console.log(rotationAngle);
      const offset = rotationAngle * -1;  // 1.58
      if (rotationAngle > 0) {

        const x = cameraPosition[0] - 1;
        const y = cameraPosition[1] + yOffsetForText;
        const z = cameraPosition[2] //+ offset;
        return [x, y, z];

      } else {

        const x = cameraPosition[0] + 1;
        const y = cameraPosition[1] + yOffsetForText;
        const z = cameraPosition[2];
        return [x, y, z];

      }
    } // If there is a delta, because the prev section had a rotation, but the 
      // new section rotates to zero. If the prev section rotation was on the y-axis
      // then y-block is triggered, but since we are finishing at zero, we want the x-bloxk
      // logic which is the default --> cameraPosition.z - 1.
      else if( rotationAxis === 'y' && cameraRotation[1] === 0 ) {
      // normal x-block here:
      const rotationAngle = cameraRotation[0];
      const x = cameraPosition[0];
      const y = cameraPosition[1] + rotationAngle + yOffsetForText;
      const z = cameraPosition[2] - 1;
      return [x, y, z]; 
    }

    // // rotate on Z-axis, don't need to do anything to the model.
    // // we can combine both blocks below. They are the same code.
    // if (rotationAxis === 'z') {
    //   const rotationAngle = cameraRotation[2];
    //   const x = cameraPosition[0];
    //   const y = cameraPosition[1] + yOffsetForText;
    //   const z = cameraPosition[2] - 1;
    //   return [x, y, z];
    // } 
    else {
      const x = cameraPosition[0];
      const y = cameraPosition[1] + yOffsetForText;
      const z = cameraPosition[2] - 1;
      return [x, y, z];
    }
  },
*/


/*
animationDS: [
  //  initial position      final position        initial rotation       final rotation
  [ [ 0.00, 0.00, 3.00 ], [ 0.00, 0.00, 0.00 ],  [ 0.00, 0.00, 0.00 ], [ 0.00, 0.00, 0.00 ] ], // 0 
  [ [ 0.00, 0.00, 0.00 ], [ 0.75, 0.00, 1.00 ],  [ 0.00, 0.00, 0.00 ], [ 0.66, 0.00, 0.00 ] ], // 1
  [ [ 0.75, 0.00, 1.00 ], [ 0.75, 0.00,-2.00 ],  [ 0.66, 0.00, 0.00 ], [ 0.00, 0.00, 0.00 ] ], // 2
  [ [ 0.75, 0.00,-2.00 ], [ 0.00, 0.00, 0.00 ],  [ 0.00, 0.00, 0.00 ], [-0.66, 0.00, 0.00 ] ], // 3
  [ [ 0.00, 0.00, 0.00 ], [ 0.00, 0.00,-2.00 ],  [-0.66, 0.00, 0.00 ], [ 0.00, 0.00, 0.00 ] ], // 4
],
*/


// original position of camera for section-4 // [0.75, 0.00, 1.00], //  4 ..doped



/* Original Positions before TranslateCircle
positions: [
  [0.00, 0.00, 5.00], // -1 
  [0.00, 0.00, 1.00], //  0 Opening position, section 0 <-- Change z back to 0 after testing TranslateCircle
  [0.00, 0.00, 1.00], //  1 ..1985
  [0.75, 0.00,-2.00], //  2 ..most symmetrical form
  [0.75, 0.00,-2.00], //  3 ..soccer ball pattern
  [0.75, 0.00, 1.00], //  4 ..doped
  [1.00, 2.00, 0.00], //  5 ..HIV-1-Protease
],
*/

/* Testing TranslateCircle Positions 
positions: [
  [0.00, 0.00, 5.00], // -1 
  [0.00, 0.00, 1.00], //  0 Opening position, section 0 <-- Change z back to 0 after testing TranslateCircle
  getFinalPositionAfter90DegreeTurn([0, 0, 1]),
  // [0.00, 0.00, 1.00], //  1 ..1985
  [0.75, 0.00,-2.00], //  2 ..most symmetrical form


  // [0.75, 0.00,-2.00], //  3 ..soccer ball pattern
  getFinalPositionAfter90DegreeTurn([0.75, 0.00,-2.00]),

  
  [0.75, 0.00, 1.00], //  4 ..doped
  [1.00, 2.00, 0.00], //  5 ..HIV-1-Protease
],
*/



// text: [
//   '',
//   'In 1985, chemists were studying how molecules form in outer space when they began vaporizing graphite rods in an atmosphere of Helium gas...',
//   'Firing lazers at graphite rods in a supersonic helium beam, produced novel cage-like molecules composed of 60 carbon atoms, joined together to form a hollow sphere. The largest and most symmetrical form of pure carbon ever discovered. This molecule would go on to be named Buckminsterfullerene.',
//   'The carbon atoms arrange themselves as hexagons and pentagons (highlighted in red), like the seams of a soccer ball. Fullerenes are exceedingly rugged and are even capable of surviving the extreme temperatures of outer space. And because they are essentially hollow cages, they can be manipulated to make materials never before known.',
//   'For example, when a buckyball is "doped" via inserting potassium or cesium into its cavity, it becomes the best organic superconductor known. These molecules are presently being studied for use in many other applications, such as new polymers and catalysts, as well as novel drug delivery systems. Scientists have even turned their attention to Buckminsterfullerene in their quest for a cure for AIDS.',
//   "How can Buckminsterfullerene help cure AIDS? An enzyme (HIV-1-Protease) that is required for HIV to replicate, exhibits a non-polar pocket in its three-dimensional structure. On the protein model in front of you, notice how the non-polar Fullerene fits the exact diameter of the enzyme's binding pocket. If this pocket is blocked, the production of virus ceases. Because buckyballs are nonpolar, and have approximately the same diameter as the pocket of the enzyme, they are being considered as possible HIV-1-Protease inhibitors.",
// ],









//                      0                     1                      2                     3                    4                     5
// positions: [ [ 0.00, 0.00, 3.00 ], [ 0.00, 0.00, 0.00 ], [ 0.75, 0.00, 1.00 ], [ 0.75, 0.00,-2.00 ], [ 0.00, 0.00, 0.00 ], [ 0.00, 0.00,-2.00 ] ],







// anaimation_data is built programatically w-/ Init() + this.CreateAnimationDataFromPositionsRotations()
// camera.animationData: [
//     //  initial position      final poisition        initial rotation       final rotation
//     [ [ 0.00, 0.00, 3.00 ], [ 0.00, 0.00, 0.00 ],  [ 0.00, 0.00, 0.00 ], [ 0.00, 0.00, 0.00 ] ], // section === 0
//     [ [ 0.00, 0.00, 0.00 ], [ 0.75, 0.00, 1.00 ],  [ 0.00, 0.00, 0.00 ], [ 0.66, 0.00, 0.00 ] ], // section === 1
//     [ [ 0.75, 0.00, 1.00 ], [ 0.75, 0.00,-2.00 ],  [ 0.66, 0.00, 0.00 ], [ 0.00, 0.00, 0.00 ] ], // section === 2
//     [ [ 0.75, 0.00,-2.00 ], [ 0.00, 0.00, 0.00 ],  [ 0.00, 0.00, 0.00 ], [ 0.00, 0.75, 0.00 ] ], // section === 3
//     [ [ 0.00, 0.00, 0.00 ], [ 1.00, 2.00, 0.00 ],  [ 0.00, 0.75, 0.00 ], [ 0.00, 0.00, 0.00 ] ], // section === 4
//     //         0                      1                     2                       3
// ],
//                     0     1     2     3     4
// animationClips: [ null, null, null, null, null ],

// Old DS
/*
    {
        id: 'test_page',
        pageTitle: 'Fullerenes',
        section: 0,
        maxSection: 6,
        thumbnail: "url('./lesson_thumbnails/fullereneTile.png')",

        universe: {
            id: 'fullerene universe',
            radius: 5,
            size: 25000,
            models: [],
        },

        camera: {
            //                     0                   1                      2                     3                    4                     5                  
            positions: [ [ 0.00, 0.00, 3.00 ], [ 0.00, 0.00, 0.00 ], [ 0.75, 0.00, 1.00 ], [ 0.75, 0.00,-2.00 ], [ 0.00, 0.00, 0.00 ], [ 0.00, 0.00,-2.00 ] ],
            rotations: [ [ 0.00, 0.00, 0.00 ], [ 0.00, 0.00, 0.00 ], [ 0.66, 0.00, 0.00 ], [ 0.00, 0.00, 0.00 ], [-0.66, 0.00, 0.00 ], [ 0.00, 0.00, 0.00 ] ],
            
            // this is built programmatically by Init() in App() 
            animationData: [
                //  initial position      final poisition        initial rotation       final rotation
                [ [ 0.00, 0.00, 3.00 ], [ 0.00, 0.00, 0.00 ],  [ 0.00, 0.00, 0.00 ], [ 0.00, 0.00, 0.00 ] ], // 0 
                [ [ 0.00, 0.00, 0.00 ], [ 0.75, 0.00, 1.00 ],  [ 0.00, 0.00, 0.00 ], [ 0.66, 0.00, 0.00 ] ], // 1
                [ [ 0.75, 0.00, 1.00 ], [ 0.75, 0.00,-2.00 ],  [ 0.66, 0.00, 0.00 ], [ 0.00, 0.00, 0.00 ] ], // 2
                [ [ 0.75, 0.00,-2.00 ], [ 0.00, 0.00, 0.00 ],  [ 0.00, 0.00, 0.00 ], [-0.66, 0.00, 0.00 ] ], // 3
                [ [ 0.00, 0.00, 0.00 ], [ 0.00, 0.00,-2.00 ],  [-0.66, 0.00, 0.00 ], [ 0.00, 0.00, 0.00 ] ], // 4
            ],

            animationClips: null,

            CreateAnimationDataFromPositionsRotations: function() {
                const animationData = [];
                for( let i = 0; i < this.positions.length - 1; i++ ) {
                    const initial_position: number[] = this.positions[ i ];
                    const final_position: number[] = this.positions[ i + 1 ];
                    const initial_rotation: number[] = this.rotations[ i ];
                    const final_rotation: number[] = this.rotations[ i + 1 ];
                    animationData.push( [ initial_position, final_position, initial_rotation, final_rotation ] );
                };
                return animationData;
            },

        },

        models: [
            {
                id: '0',
                name: 'model0',
                path: '/Fullerenes/models/instance0.glb',
                // loadedMeshes: null,
                // meshes: null,
                visible: true,
                scale: 0.18,
                // _positions: null,
                positions: [
                    { x: 0, y: 0, z: -1 },
                ],
                rotations: [
                    { _x: 0, _y: 0, _z: 0 }
                ],
                animationClips: [ 
                    SuspendInSolution( 90 ), 
                    ScaleXYZ( { duration: 1, initialScale: [ 0.18, 0.18, 0.18 ], fScale: [ 0, 0, 0 ] } )
                ],
            },
            {
                id: '1',
                name: 'model1',
                path: '/Fullerenes/models/instance2.glb',
                loadedMeshes: null,
                meshes: null,
                visible: true,
                scale: 0,
                positions: [
                    { x: 0.75, y: 0.71, z: 0 }
                ],
                rotations: [
                    { _x: 0, _y: 0, _z: 0 }
                ],
                animationClips: [
                    spinY( { duration: 5000, axis: 'y', initialAngle: 0, fRot: 360 } ),
                    ScaleXYZ( { duration: 1, initialScale: [ 0.18, 0.18, 0.18 ], fScale: [ 0, 0, 0 ] } )
                ]
            },
            {
                id: '2',
                name: 'model2',
                path: '/Fullerenes/models/instance2.glb',
                loadedMeshes: null,
                meshes: null,
                visible: true,
                scale: 0,
                positions: [
                    { x: 0.75, y: 0, z: -3 }
                ],
                rotations: [
                    { _x: 0, _y: 0, _z: 0 }
                ],
                animationClips: [
                    spinY( { duration: 5000, axis: 'y', initialAngle: 0, fRot: 360 } ),
                    ScaleXYZ( { duration: 1, initialScale: [ 0.18, 0.18, 0.18 ], fScale: [ 0, 0, 0 ] } )
                ]
            },
            {
                id: '3',
                name: 'model3',
                path: '/Fullerenes/models/___instance3.glb',
                loadedMeshes: null,
                meshes: null,
                visible: true,
                scale: 0,
                positions: [
                    { x: 0, y: -0.675, z: -1 },
                ],
                rotations: [
                    { _x: 0, _y: 0, _z: 0 }
                ],
                animationClips: [
                    spinY( { duration: 5000, axis: 'y', initialAngle: 0, fRot: 360 } ),
                    ScaleXYZ( { duration: 1, initialScale: [ 0.18, 0.18, 0.18 ], fScale: [ 0, 0, 0 ] } ),
                    spinY( { duration: 1500, axis: 'x', initialAngle: 0, fRot: 360 } ),
                ]
            },
            {
                id: '4',
                name: 'model4',
                path: '/Fullerenes/models/___instance4.glb',
                loadedMeshes: null,
                meshes: null,
                visible: true,
                scale: 0,
                positions: [
                    { x: 0, y: -0.1, z: -3 },
                ],
                rotations: [
                    { _x: 0, _y: 0, _z: 0 }
                ],
                animationClips: [
                    spinY( { duration: 5000, axis: 'y', initialAngle: 0, fRot: 360 } ),
                    ScaleXYZ( { duration: 1, initialScale: [ 0.10, 0.10, 0.10 ], fScale: [ 0, 0, 0 ] } ),
                    ScaleXYZ( { duration: 3, initialScale: [ 0.01, 0.01, 0.01 ], fScale: [ 0.075, 0.075, 0.075 ] } )
                ]
            }
            
        ],

        text: [
            '',
            'In 1985, chemists were studying how molecules form in outer space when they began vaporizing graphite rods in an atmosphere of Helium gas...',
            'The result? Novel cage-like molecules composed of 60 carbon atoms, joined together to form a hollow sphere. The largest and most symmetrical form of pure carbon ever discovered. This molecule would go on to be named Buckminsterfullerene. Often shortened to fullerene, and nicknamed Buckyball.',
            'Each molecule of Fullerene is composed of pure carbon. The carbon atoms arrange themselves as hexagons and pentagons (highlighted in red), like the seams of a soccer ball. Fullerenes are exceedingly rugged and are even capable of surviving the extreme temperatures of outer space. And because they are essentially hollow cages, they can be manipulated to make materials never before known.',
            'For example, when a buckyball is "doped" via inserting potassium or cesium into its cavity, it becomes the best organic superconductor known. These molecules are presently being studied for use in many other applications, such as new polymers and catalysts, as well as novel drug delivery systems. Scientists have even turned their attention to buckyballs in their quest for a cure for AIDS.',
            'How can buckyballs help cure aids? An enzyme (HIV-1-Protease) that is required for HIV to reproduce, exhibits a nonpolar pocket in its three-dimensional structure. On the model to the right, notice how the nonpolar Fullerene fits the exact diameter of the enzyme\'s binding pocket. If this pocket is blocked, the production of virus ceases. Because buckyballs are nonpolar, and have approximately the same diameter as the pocket of the enzyme, they are being considered as possible blockers.',
        ],

        textType: [
            'centered',
            'centered',
            'left',
            'left',
            'left',
            'left'
        ],

        music: [
            "/music/fullerene2.mp3"
        ],

        voices: [
            "/music/fullerene2.mp3", // 0
            "/music/fullerene2.mp3", // 1
            "/music/fullerene2.mp3", // 2
            "/music/fullerene2.mp3", // 3
            "/music/fullerene2.mp3", // 4
        ],

        loadedVoices: null,

        dispatch: useDispatch,
    },
*/

// Other pages:
/*
{
    id: 'nanotube',
    title: 'Nanotubes',
    thumbnail: "url('./lesson_thumbnails/nanotube.png')",
    speach: null,
    text: null,
    models: [
        {
            id: "model0", 
            path: '/lesson3_models/model0.glb', 
            meshes: null
        }
    ],
},

{
    id: 'diamond',
    title: 'Diamonds',
    thumbnail: "url('./lesson_thumbnails/diamond.png')",
    speach: null,
    text: null,
    models: [
        {
            id: "model0", 
            path: '/lesson3_models/model0.glb', 
            meshes: null
        }
    ],
},

{
    id: 'graphenes',
    title: 'Graphenes',
    thumbnail: "url('./lesson_thumbnails/graphene.png')",
    speach: null,
    text: null,
    models: [
        {
            id: "model0", 
            path: '/lesson3_models/model0.glb', 
            meshes: null
        }
    ],
},

{
    id: 'chirality',
    title: 'Chirality',
    thumbnail: "url('./lesson_thumbnails/chirality.png')",
    speach: null,
    text: null,
    models: [
        {
            id: "model0", 
            path: '/lesson3_models/model0.glb', 
            meshes: null
        }
    ],
}
*/

// Old TranslateRotate_x
/*
TranslateRotate_x: function ( duration: number, initial_position: number[], final_position: number[], axis: string, initialAngle: number[], fAngle: number[] ) {
    // console.log( 'positions', this.positions );

    const times_Position = [ 0, duration ];
    const values_Position = [ ...initial_position, ...final_position ];
    const trackName_Position = '.position';
    const track_Position = new VectorKeyframeTrack( trackName_Position, times_Position, values_Position, InterpolateLinear );

    const times_Rotation = [ 0, duration ];

    let values_Rotation: number[];
    values_Rotation = [ initialAngle[ 0 ], fAngle[ 0 ] ];

    // Control flow for rotation axis assignment
    
    if( axis === 'x' ) {
        console.log('break before values asignment');
        values_Rotation = [ initialAngle[ 0 ], fAngle[ 0 ] ];
        console.log('break after values asignment, X');
    };
    if( axis === 'y' ) {
        values_Rotation = [ initialAngle[ 1 ], fAngle[ 1 ] ];
        console.log('break after values asignment, Y');
    };
    if( axis === 'z' ) values_Rotation = [ initialAngle[ 2 ], fAngle[ 2 ] ];
    
    
    const trackName_Rotation = '.rotation[' + axis + ']';
    const track_Rotation = new NumberKeyframeTrack( trackName_Rotation, times_Rotation, values_Rotation );
    return new AnimationClip( 'TranslateRotateCamera', duration, [ track_Position, track_Rotation  ] );
}
/*

// Old animation ds
/*

animations: [
    [ Translate( 3, [ 0, 0, 3 ], [ 0, 0, 0 ] ),  spinY( 0, 'x', 0, 0) ],
    [ Translate( 3, [ 0, 0, 0 ], [ 0.75, 0, 1 ] ), spinY( 3, 'x', 0, 0.66 ) ], 
    [ Translate( 3, [ 0.75, 0, 1 ], [ 0.75, 0, -2 ] ), spinY( 3, 'x', 0.66, 0 ) ], // favorite animation, rotates down and translates z
    [ Translate( 3, [ 0.75, 0, -2 ], [ 0, 0, 0 ] ), spinY( 3, 'x', 0, -0.66 ) ], 
    [ Translate( 3, [ 0, 0, 0 ], [ 0, 0, -2 ] ), spinY( 3, 'x', -0.66, 0 ) ],
    // [ Translate( 0, [ 0.75, 0, -2 ], [ 0.75, 0, -2 ] ), spinY( 3, 'y', 0, 1.5 ) ], 
],

animations: [
    [ TranslateRotateCamera( 3, [ 0, 0, 3 ], [ 0, 0, 0 ], 'x', 0, 0 ) ],
    [ TranslateRotateCamera( 3, [ 0, 0, 0 ], [ 0.75, 0, 1 ], 'x', 0, 0.66 ) ],
    [ TranslateRotateCamera( 3, [ 0.75, 0, 1 ], [ 0.75, 0, -2 ], 'x', 0.66, 0 ) ],
    [ TranslateRotateCamera( 3, [ 0.75, 0, -2 ], [ 0, 0, 0 ], 'x', 0, -0.66 ) ],
    [ TranslateRotateCamera( 3, [ 0, 0, 0 ], [ 0, 0, -2 ], 'x', -0.66, 0 ) ],
],

positions: [
    { x: 0, y: 0, z: 0 },
    { x: 0.5, y: 0, z: 1 },
    { x: 1, y: 0, z: 1.5 },
    { x: 0, y: 0, z: 0 },
    { x: 0, y: 0, z: 0 },
    { x: 0, y: 0, z: 0 },
],

animationData: [
    //   position            rotation 
    [ [ 0.00, 0.00, 3.00 ], [ 0.00, 0.00, 0.00 ] ],
    [ [ 0.00, 0.00, 0.00 ], [ 0.00, 0.00, 0.00 ] ],
    [ [ 0.75, 0.00, 1.00 ], [ 0.66, 0.00, 0.00 ] ],
    [ [ 0.75, 0.00,-2.00 ], [ 0.00, 0.00, 0.00 ] ],
    [ [ 0.00, 0.00, 0.00 ], [-0.66, 0.00, 0.00 ] ],
    [ [ 0.00, 0.00,-2.00 ], [ 0.00, 0.00, 0.00 ] ],
],

*/

// Old SuspendInSolution() with useFrame()
/*
function Levitate( ref ) {
    useFrame( (state, delta ) => {
    // const t = state.clock.getElapsedTime();
    const t = state.clock.elapsedTime;
    ref.current.position.y = (0.75 + Math.sin(t / 1.5 )) / 4 // sin up and down 
    ref.current.rotation.y += (delta / 12) // continous rotation
    ref.current.rotation.x = Math.cos( t / 4 ) / 2 // cos wobble 
    })
};

*/

// Unused fns: myLerp() & preCalculateAllTimesAndValues()
/*
function myLerp( o: number, n: number, s: number ) {
    const r = (1 - s) * o + s * n;
    return Math.abs(o - n) < 0.005 ? n : r;
};


function preCalulateAllTimesAndAllValues( _duration: number, _initial: number, _final: number ) {
    const delta = .008
    const allTimes = [], allValues = [];
    const animationTime = _duration;
    const numberSteps = animationTime / delta;
    const initial = _initial;; 
    const final = _final;

    for (let i = 0; i < numberSteps; i++) {
        allTimes.push( i * delta ); // refresh rate. 
        allValues.push( myLerp( initial, final, i / numberSteps ) );
    };

    return [ allTimes, allValues ];
}
*/

// Old AnimationClip constructors
/*
    Scale( 1, [ 0.18, 0.18, 0.18 ], [ 0, 0, 0 ] )

    spinY( 5000, 'y', 0, 360 ),
    Scale( 1, [ 0.18, 0.18, 0.18 ], [ 0, 0, 0 ] )

    spinY( 5000, 'y', 0, 360 ),
    Scale( 1, [ 0.18, 0.18, 0.18 ], [ 0, 0, 0 ] )

    spinY( 5000, 'y', 0, 360 ),
    Scale( 1, [ 0.18, 0.18, 0.18 ], [ 0, 0, 0 ] ),
    spinY( 2500, 'x', 0, 360 ),
    spinY( 4000, 'y', 0, 360 ),
    Scale( 1, [ 0.1, 0.1, 0.1 ], [ 0, 0, 0 ] ),
    Scale( 3, [ 0.01, 0.01, 0.01 ], [ 0.075, 0.075, 0.075 ] ),
*/

// Old DS'
/*
const positionsData = [
    { x: 0, y: 0, z: 0 },
    { x: 0.5, y: 0, z: 1 },
    { x: 1, y: 0, z: 1.5 },
    { x: 0, y: 0, z: 0 },
    { x: 0, y: 0, z: 0 },
    { x: 0, y: 0, z: 0 },
];

const rotations = [
    { _x: 0, _y: 0, _z: 0 },
    { _x: 0.5, _y: 0, _z: 0 },
    { _x: 1, _y: 0, _z: 0 },
    { _x: 0, _y: 0, _z: 0 },
    { _x: 0, _y: 0, _z: 0 },
    { _x: 0, _y: 0, _z: 0 },
]
*/
