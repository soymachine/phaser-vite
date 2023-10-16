
import GameScene from './scenes/GameScene.js'
import BackgroundScene from './scenes/BackgroundScene.js'
import Presentation1 from './scenes/Presentation1.js'
import Presentation2 from './scenes/Presentation2.js'

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

/*
game.scale.forceOrientation(true, false);
game.scale.enterIncorrectOrientation.add(handleIncorrect);
game.scale.leaveIncorrectOrientation.add(handleCorrect);

function handleIncorrect(){
  console.log("handleIncorrect")
  if(!game.device.desktop){
    document.getElementById("turn").style.display="block";
  }
}

function handleCorrect(){
  console.log("handleCorrect")
  if(!game.device.desktop){
    document.getElementById("turn").style.display="none";
  }
}
*/