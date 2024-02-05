import { LessonBuilder } from './classes/Lesson';
import { Section } from './classes/Section';
import { Cam, CamAnimation } from './classes/Cam';
import { Models, ModelBuilder, ModelDirector } from './classes/Model';
import { Universe } from './classes/Universe';





/** 
 * Step-0. List out assets or import them as lists
*/ 
const modelPaths = [

  ['path1'], // section 0

  ['path2'], // section 1

  ['path3', 'path4'],

  [],

  [],

  [],

];

const textsOfEntireLesson = [ [], ['', ''], [''], ['', ''], [''], [''] ]; // each index is textOfSection

const musicPathsOfEntireLesson = ['', ''];

const voicePathsOfEntireLesson = ['', '', '', ''];


/** 
 * Step-1: Initialize a universe:
*/ 
const universe = new Universe('fullerene-universe', 25000, 5);


/** 
 * Step-2: Define all the camera animations you want to use 
 * How should we move through this universe? 
*/ 
const camAnimations = [

  new CamAnimation( 'zoom-in', 4 ),

  new CamAnimation( 'zoom-out-rotate-up', 2, Math.PI / 4 ),

  new CamAnimation( 'zoom-in-rotate-down', 2, Math.PI / 4 ),

  new CamAnimation( 'circle-model', Math.PI / 2, -Math.PI / 2 ),

  new CamAnimation( 'zoom-out', 3 ),

  new CamAnimation( 'corkscrew-up', 2, Math.PI / 2 ),

];

// This should be turned into a get method on Lesson
const numberOfSections = camAnimations.length



/** 
 * Step-3: Instantiate and initialize camera: 
*/ 
const camera = new Cam({});
camera.setStartPosition( 0, 0, 5 ); 
camera.setCamAnimations( camAnimations );
camera.init();
const posRots = camera.getPosRots();




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

modelDirector.addDependencies( camAnimations, textsOfEntireLesson, posRots );




/**
 * 
 * Wait, currently I now want this anims approach in the dream client. 
 * I like defining model animations as a list of objects, key is the type, 
 * and value is the kind of animation.
 * 
 * In an init function the strings can be converted into Keyframes.
 * 
 * Think of it like that. Write functions that do this conversion functionally, 
 * place them in a file.
 * 
 * Then call these functions in the init function. 
 * 
 * No more need for design patterns beyond that i believe. I like this combo'ed with 
 * strategy pattern for getting the times and values.
 * 
 */
modelDirector.constructProduct({
  section: 0,
  path: "/fullerene/models/m0.glb",
  name: "floating-cage",
  anims: {
    enter: "scale-in",
    main: "spin-y",
    exit: "scale-out",
    nested: "suspend-in-solution" 
  },
}); 

const m0 = modelBuilder.getProduct();






modelDirector.constructProduct({
  section: 2,
  path: '/fullerene/models/m0.glb',
  name: 'no-soccer-pattern',
  anims: {},
}); 
const m2 = modelBuilder.getProduct();

modelDirector.constructProduct({
  section: 3,
  path: '/fullerene/models/m2.glb',
  name: 'soccer-pattern',
  anims: {},
});
const m3 = modelBuilder.getProduct();

modelDirector.constructProduct({
  section: 4,
  path: '/fullerene/models/m3.glb',
  name: 'doped-cage',
  anims: {},
});
const m4 = modelBuilder.getProduct();

modelDirector.constructProduct({
  section: 5,
  path: '/fullerene/models/m3.glb',
  name: 'doped-cage',
  anims: {},
});
const m5 = modelBuilder.getProduct();

const models = new Models( [ m0, m2, m3, m4, m5 ] );

models.groupBySection( numberOfSections );


/** 
 * Step-6: Loop and instantiate sections:
*/ 
const sections: Section[] = [];

for( let i = 0; i < numberOfSections; i++ ) {

  const section = new Section({
    section: i,
    camAnimation: camAnimations[i],
    posRot: posRots[i],
    models: models.groupedBySection[i],
    text: textsOfEntireLesson[i],
    voicePath: voicePathsOfEntireLesson[i],
  }); sections[i] = section;

};

/** 
 * Step-7: Build lesson with builder: 
*/ 
const lessonBuilder = new LessonBuilder();
lessonBuilder.addTitle('Buckminsterfullerene')
             .addThumbnail("url('./lesson-thumbnails/fullerene.png')")
             .addUniverse(universe)
             .addCamera(camera)
             .setModels(models.groupedBySection)
             .setTexts(textsOfEntireLesson)
             .addMusics(musicPathsOfEntireLesson)
             .addVoices(voicePathsOfEntireLesson)
             .setSections(sections)
             .extractSections() // need to move implmentation from Lesson to LessonBuilder
;

const buckminsterfullerene = lessonBuilder.build();

export default buckminsterfullerene;





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
 * What are we missing? What is not initialized?
 *  
 * Re-think model animation clip construction anti-pattern
 * 
 * What about data validation for your setters/adders on your builders?
 * What about error-handling?
 * 
 * After all that, time to write tests and finish this "pro" back-end re-factor.
 * 
 * Construct lessons and push to server.
*/