import Constants from '../helpers/Constants.js';
import GlobalEvents from '../globalevents.js';


class BackgroundScene extends Phaser.Scene
{
    gameScene;
    layer;

    constructor ()
    {
        super({
            key:'BackgroundScene',
            active:true
        });        

        this.offset = 250

        const events = GlobalEvents.getInstance()
        events.subscribe(GlobalEvents.ON_NODE_CHANGE, this.onChange)
    }

    start(game){
        this.game = game

        this.view = this.game.add.image(0, 0, 'bg').setOrigin(0, 0)

        this.view.x = -1000
        this.view.y = -1000

        this.x = this.view.x
        this.y = this.view.y

        // console.log(`w:${bg.width}`)
    }

    onChange = (positionResult)=>{
        console.log(`nos hemos de mover a ${positionResult}`)
        // movemos el background según este cambio
        
        switch(positionResult){
            case Constants.LEFT:
                this.x -= this.offset
                break;
            case Constants.RIGHT:
                this.x += this.offset
                break;
            case Constants.TOP:
                this.y -= this.offset
                break;
            case Constants.BOTTOM:
                this.y += this.offset
                break;
        }

        this.tweens.add({
            targets: this.view,
            x: this.x,
            y: this.y,
            duration: 1000,
            ease: Constants.easing,
            callbackScope: this,
            onComplete: function(){
            }
        });
    }

    create ()
    {
        console.log(`create bg`)
        const width = this.scale.gameSize.width;
        const height = this.scale.gameSize.height;
    }
    
}

export default BackgroundScene;