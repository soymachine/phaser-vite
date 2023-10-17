
import GameScene from './scenes/GameScene.js'
import BackgroundScene from './scenes/BackgroundScene.js'
import Presentation1 from './scenes/Presentation1.js'
import Presentation2 from './scenes/Presentation2.js'
import PreloadScene from './scenes/PreloadScene.js'
import GlobalEvents from './globalevents.js'
import Constants from './helpers/Constants.js'
import Orientation from './helpers/Orientation.js'

console.log("Version: " + Constants.version)

const innerWidth = window.innerWidth
const innerHeight = window.innerHeight
const h = 1080
const w = h * (innerWidth / innerHeight)

console.log(`w:${w} h:${h}`)

const config = {
  type: Phaser.CANVAS,
  backgroundColor: '#000000',
  scale: {
      mode: Phaser.Scale.NO_SCALE, // RESIZE  Phaser.Scale.RESIZE/ NO_SCALE
      parent: 'phaser-example',
      //*
      width: w,
      height: h,
      //*/
      
      /*
      width: window.innerWidth,
      height: window.innerHeight,
      */
  }, // , BackgroundScene, Presentation2
  scene: [PreloadScene, GameScene, BackgroundScene, Presentation1, Presentation2 ], // , BackgroundScene, Presentation2

};


Orientation.getInstance()

const game = new Phaser.Game(config);


