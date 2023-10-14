import Section  from './Section.js'
import TextButton  from '../helpers/TextButton.js'
import Constants  from '../helpers/Constants.js'
import Screen  from '../helpers/Screen.js'
import GlobalEvents from '../globalevents.js';


class Presentation1 extends Section
{
    constructor ()
    {
        super("Presentation1");
    }

    start ({game, position}){
        super.create({
            position: position
        })

        this.game = game
        this.perfume = this.game.add.image(0, 0, 'perfume').setOrigin(0, 0).setInteractive();
        this.perfume.name = "perfume"
        
        this.view.add(this.perfume);
        console.log(`this.perfume:${this.perfume.displayWidth} this.sectionH:${this.sectionH}`)

        this.scaleImage({
            img: this.perfume, 
            type:"pixels",
            value: this.sectionH * .7,
            side: "height"
        })
        this.centerIMG(this.perfume)


        // Texto
        this.presentationText = this.add.rexBBCodeText(0, 0, 'PRESENTACIÓN [b]TÍTULO[/b]', { fontFamily: '"Roboto", "Roboto-Bold", serif', fontSize: 64, color: '#5656ee' });
        this.centerIMG(this.presentationText)

        this.textButton = new TextButton({
            game:this.game,
            text: 'SIGUIENTE',
            view:this.view,
            x:100,
            y:100,
            width:219,
            height:168,
            spriteName : 'bgButton',
            
        })

        var nineSlice = this.game.make.nineslice({
            x: 200,
            y: 500,
            key: 'splash',
            // frame: '',
        
            // width: 256,
            // height: 256,
            // leftWidth: 10,
            // rightWidth: 10,
            // topHeight: 0,
            // bottomHeight: 0,
        
            // angle: 0,
            // alpha: 1,
            // scale : {
            //    x: 1,
            //    y: 1
            //},
            // origin: {x: 0.5, y: 0.5},
        
            add: true
        });
        
        //console.log(`this.textButton.displayWidth:${this.textButton.width()}`)
        this.centerIMG(this.textButton)

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