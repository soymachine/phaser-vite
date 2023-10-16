
import GameScene from './scenes/GameScene.js'
import BackgroundScene from './scenes/BackgroundScene.js'
import Presentation1 from './scenes/Presentation1.js'
import Presentation2 from './scenes/Presentation2.js'
import PreloadScene from './scenes/PreloadScene.js'
import GlobalEvents from './globalevents.js'
import Constants from './helpers/Constants.js'

const config = {
  type: Phaser.CANVAS,
  backgroundColor: '#000000',
  scale: {
      mode: Phaser.Scale.RESIZE,
      parent: 'phaser-example',
      width: window.innerWidth,
      height: window.innerHeight,
  }, // , BackgroundScene, Presentation2
  scene: [PreloadScene, GameScene, BackgroundScene, Presentation1, Presentation2 ], // , BackgroundScene, Presentation2

};


const globalevents = GlobalEvents.getInstance()

window.onresize = function (){
  if(window.innerWidth > window.innerHeight){
    // landscape
    globalevents.notify(GlobalEvents.ON_ORIENTATION_CHANGED, {orientation:Constants.LANDSCAPE});
  }
  else{
    // portrait
    globalevents.notify(GlobalEvents.ON_ORIENTATION_CHANGED, {orientation:Constants.PORTRAIT});
  }
};

const game = new Phaser.Game(config);


