import Section  from './Section.js'
import TextButton  from '../helpers/TextButton.js'
import Constants  from '../helpers/Constants.js'
import Screen  from '../helpers/Screen.js'
import GlobalEvents from '../core/GlobalEvents.js';


class Presentation1 extends Section
{
    constructor ()
    {
        super("Presentation1");
    }

    start ({game, position}){
        
        const that = this
        
        super.create({
            position: position
        })

        this.game = game
        this.perfume = this.game.add.image(0, 0, 'perfume').setOrigin(0, 0)
        this.perfume.name = "perfume"
        
        this.view.add(this.perfume);
        
        this.scaleImage({
            img: this.perfume, 
            type:"pixels",
            value: this.sectionH * .7,
            side: "height"
        })
        
        this.centerIMG(this.perfume)

        this.leftButton = this.add.image(0, 0, 'goBack_button').setOrigin(0, 0).setInteractive();
        this.rightButton = this.add.image(0, 0, 'continue_button').setOrigin(0, 0).setInteractive();
        
        this.view.add(this.leftButton)
        this.view.add(this.rightButton)

        const offset = 62
        this.leftButton.x = offset
        this.leftButton.y = Screen.H - this.leftButton.height - offset

        this.rightButton.x = Screen.W - this.rightButton.width - offset
        this.rightButton.y = Screen.H - this.rightButton.height - offset      
        
        this.rightButton.on('pointerdown', function (pointer)
        {
            that.globalevents.notify(GlobalEvents.ON_REQUEST_NEW_NODE, {requestedNodeID:Constants.PRESENTATION_2});
        });
        
        this.game.input.on('gameobjectdown', (pointer, button) =>
        {
            if( button.name == "perfume"){

                this.moveRandom()
                this.globalevents.notify(GlobalEvents.ON_NODE_CHANGE, Constants.BOTTOM);
            }
        });
    }

    moveRandom() {
        const randX = Phaser.Math.Between(this.perfume.displayWidth, Screen.W - this.perfume.displayWidth);
        const randY = Phaser.Math.Between(this.perfume.displayHeight, Screen.H - this.perfume.displayHeight);
        this.tweens.add({
            targets: this.perfume,
            x: randX,
            y: randY,
            duration: 1000,
            ease: Constants.easing,
            callbackScope: this,
            onComplete: function(){
            }
        });

    } 
}

export default Presentation1;