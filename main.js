import './style.css'
import Phaser from 'phaser'
import GameScene from './src/scenes/GameScene'
import BackgroundScene from './src/scenes/BackgroundScene'
import Presentation1 from './src/scenes/Presentation1'
import Presentation2 from './src/scenes/Presentation2'

const config = {
  type: Phaser.CANVAS,
  backgroundColor: '#000000',
  scale: {
      mode: Phaser.Scale.RESIZE,
      parent: 'phaser-example',
      width: window.innerWidth,
      height: window.innerHeight,
  }, // , BackgroundScene, Presentation2
  scene: [ GameScene, BackgroundScene, Presentation1, Presentation2 ], // , BackgroundScene, Presentation2

};

const game = new Phaser.Game(config);