import { Lesson, LessonBuilder } from './classes/Lesson';
import { Section } from './classes/Section';
import { Cam, CamAnimation } from './classes/Cam';
import { Models, ModelBuilder, ModelDirector } from './classes/Model';
import { Universe } from './classes/Universe';
import { writeFileSync } from "fs";

/**
 * BUGS:
 * 
 *  If a section doesn't have a model, an empty array is added. There should be nothing added at all.
 * 
 *  The the position vector3's of the camera seem to be way off for the z-dimension.
 * 
 *  GLTFLoader doesn't seem to work in a Node environment as it depends on the fetch API.
 * 
 * 
 */

/**
 * Lesson Build Steps: 
 * 
 * 0. List out all assets or import them as lists
 * 1. Initialize a Universe
 * 2. Define all the camera animations you want to use. How you want to move through the universe.
 * 3. Instantiate and initialize Camera
 * 4. Build 3D models -- still need to create model AnimationClips
 * 5. Loop, instantiate, and initialize all Sections
 *
*/


/**
 * To Do:
 * 
 * 2. Write tests to confirm that the data is indeed correct.
 * 3. If all data correct, incorporate new re-factored architecture back into project.
 * 4. Get home screen working again. 
 * 5. Build out Diamond lesson. 
 * 6. Write up a back-end ?
 * 
*/



/** 
 * Step-0. List out assets or import them as lists
*/ 

// This should be turned into a get/set method on Lesson

console.log("EXECUTING CLIENT");

const numberOfSections = 6

const textOfEntireLesson = [

  [""],
  [
    "In 1985, chemists were studying how molecules form in outer space when they began vaporizing graphite rods in an atmosphere of Helium gas..."
  ],
  [
    "Firing lazers at graphite rods in a supersonic helium beam, produced novel cage-like molecules composed of 60 carbon atoms, joined together to form a hollow sphere.",
    "The largest and most symmetrical form of pure carbon ever discovered.", 
    "This molecule would go on to be named Buckminsterfullerene."
  ],
  [
    "The carbon atoms arrange themselves as hexagons and pentagons (highlighted in red), like the seams of a soccer ball.", 
    "Fullerenes are exceedingly rugged and are even capable of surviving the extreme temperatures of outer space.", 
    "And because they are essentially hollow cages, they can be manipulated to make materials never before known."
  ],
  [
    "For example, when a buckyball is 'doped' via inserting potassium or cesium into its cavity, it becomes the best organic superconductor known.", 
    "These molecules are presently being studied for use in many other applications, such as new polymers and catalysts, as well as novel drug delivery systems.",
    "Scientists have even turned their attention to Buckminsterfullerene in their quest for a cure for AIDS."
  ],
  [
    "How can Buckminsterfullerene help cure AIDS?",
    "An enzyme (HIV-1-Protease) that is required for HIV to replicate, exhibits a non-polar pocket in its three-dimensional structure.",
    "On the protein model in front of you, notice how the non-polar Fullerene fits the exact diameter of the enzyme's binding pocket.",
    "If this pocket is blocked, the production of virus ceases. Because buckyballs are nonpolar, and have approximately the same diameter as the pocket of the enzyme, they are being considered as possible HIV-1-Protease inhibitors."
  ]

];

const musicPathsOfEntireLesson = [ "/audio/music/fullerene3.mp3" ];

const voicePathsOfEntireLesson = [

  "/audio/voices/fiona/voice0.mp3", // 0
  "/audio/voices/fiona/voice0.mp3", // 1
  "/audio/voices/fiona/voice1.mp3", // 2
  "/audio/voices/fiona/voice1.mp3", // 3
  "/audio/voices/fiona/voice1.mp3", // 4

];



/** 
 * Step-1: Initialize a universe:
*/ 
const universe = new Universe( "fullerene-universe", 25000, 5 );

console.log( "Step 1 Complete" );




/** 
 * Step-2: Define all the camera animations you want to use 
 * How should we move through this universe? 
*/ 
const camAnimations = [

  new CamAnimation( "zoom-in", 4 ),

  new CamAnimation( "zoom-out-rotate-up", 1, Math.PI / 4 ),

  new CamAnimation( "zoom-in-rotate-down", 3, Math.PI / 4 ),

  new CamAnimation( "circle-cw", Math.PI / 2, -Math.PI / 2 ), // IS THIS NAME CORRECT ?

  new CamAnimation( "zoom-out", 4 ),

  new CamAnimation( "corkscrew-up", 2, Math.PI / 2 )

];

console.log("Step 2 Complete");


/** 
 * Step-3: Instantiate and initialize camera: 
*/ 
const camera = new Cam();

camera.setStartPosition( 0, 0, 5 );
camera.setStartRotation( 0, 0, 0 ); // this can be handled automatically as a default. 

camera.setCamAnimations( camAnimations );

camera.createPosRots();

camera.createAnimConfigs();

camera.createAnimClips();

console.log( "Step 3 Complete" );


/**
 * Step-4. Build models
 * 
 * This can be looped 
 * 
 * We will need a hasModel property on the sections to determine assignedSection
 * loop fn can take in:
 *  list of paths
 *  list of names
 *  
*/
const modelBuilder = new ModelBuilder();

const modelDirector = new ModelDirector( modelBuilder );

const posRots = camera.getClonedPosRots();

modelDirector.addDependencies( camAnimations, textOfEntireLesson, posRots );

modelDirector.constructProduct({
  section: 0,
  path: "/fullerene/models/m0.glb",
  name: "floating-fullerene",
  animNames: { 
    enter: "",
    main: "suspend",
    exit: "scale-down",
    nested: "",
  },
});

const m0 = modelBuilder.getProduct();


modelDirector.constructProduct({
  section: 2,
  path: "/fullerene/models/m0.glb",
  name: "no-soccer-pattern",
  animNames: {},
});

const m2 = modelBuilder.getProduct();


modelDirector.constructProduct({
  section: 3,
  path: "/fullerene/models/m2.glb",
  name: "soccer-pattern",
  animNames: {},
});

const m3 = modelBuilder.getProduct();


modelDirector.constructProduct({
  section: 4,
  path: "/fullerene/models/m3.glb",
  name: "doped-fullerene",
  animNames: {},
});

const m4 = modelBuilder.getProduct();


modelDirector.constructProduct({
  section: 5,
  path: "/fullerene/models/m4.glb",
  name: "protease-with-fullerene",
  animNames: {},
});

const m5 = modelBuilder.getProduct();


const models = new Models( [ m0, m2, m3, m4, m5 ] );

models.groupBySection( numberOfSections );

console.log("Step 4 Complete");


/** 
 * Step-5: Loop and instantiate sections:
*/ 
const sections: Section[] = [];

for( let i = 0; i < numberOfSections; i++ ) {

  const section = new Section({
    section: i,
    camAnimation: camAnimations[ i ],
    posRot: posRots[ i ],
    models: models.groupedBySection[ i ],
    text: textOfEntireLesson[ i ],
    voicePath: voicePathsOfEntireLesson[ i ],
  }); 
  
  sections[ i ] = section;

};

console.log( "Step 5 Complete" );


/** 
 * Step-6: Build lesson with builder: 
*/ 
const lessonBuilder = new LessonBuilder();

lessonBuilder.addTitle( "Buckminsterfullerene" );
lessonBuilder.addNumberOfSections( numberOfSections );
lessonBuilder.addThumbnail( "url('./lesson-thumbnails/fullerene.png')" );
lessonBuilder.addUniverse( universe );
lessonBuilder.addCamera( camera );
lessonBuilder.setModels( models.groupedBySection );
lessonBuilder.setTexts( textOfEntireLesson );
lessonBuilder.addMusics( musicPathsOfEntireLesson );
lessonBuilder.addVoices( voicePathsOfEntireLesson );
lessonBuilder.setSections( sections );
lessonBuilder.extractSections();

const lesson = lessonBuilder.build();


console.log( "Step 6 Complete" );
console.log( "LESSON BUILT" );


printLesson( lesson, lesson.title! );

function printLesson( lesson: Lesson, fileName: string ) {

  console.log( "Saving lesson..." );

  const jsonData = JSON.stringify( lesson, null, 2 );

  writeFileSync( `${ fileName.toLowerCase() }.json`, jsonData, "utf-8" );

  console.log( "Lesson saved." );

};





/**
 * What are we missing? What is not initialized?
 * 
 * What about data validation for your setters/adders on your builders?
 * What about error-handling?
 * 
 * After all that, time to write tests and finish this "pro" back-end re-factor.
 * 
 * Construct lessons and push to server.
*/