import Constants from '../helpers/Constants.js'
import Screen from '../helpers/Screen.js';
import GlobalEvents from '../globalevents.js';

class Section extends Phaser.Scene
{
    constructor (name)
    {
        super({
            key:name,
            active:true
        });

        this.id = name
        this.globalevents = GlobalEvents.getInstance()
    }

    create ({margin = 0, position = Constants.LEFT}){
        this.position = position
        this.sectionW = (Screen.W) - (margin * 2)
        this.sectionH = (Screen.H) - (margin * 2)
        this.view = this.add.container();     
        
        switch(position){
            case Constants.LEFT:
                this.view.x = -(Screen.W  + margin)
                break;
            case Constants.RIGHT:
                this.view.x = (Screen.W  + margin)
                break;
            case Constants.TOP:
                this.view.y = -(Screen.H  + margin)
                break;
            case Constants.BOTTOM:
                this.view.y = (Screen.H  + margin)
                break;
        }
    }

    getPosition()
    {
        return this.position
    }

    setPosition(newPosition)
    {
        this.position = newPosition
    }

    show()
    {
        this.tweens.add({
            targets: this.view,
            x: 0,
            y: 0,
            duration: 1000,
            ease: Constants.easing,
            callbackScope: this,
            onComplete: function(){
            }
        });
    }

    moveTo(x, y, callback){

        /*
        this.view.x = x
        this.view.y = y
        //*/
        //*
        this.tweens.add({
            targets: this.view,
            x: x,
            y: y,
            duration: 1000,
            ease: Constants.easing,
            callbackScope: this,
            onComplete: function(){
                callback?.()
            }
        });
        //*/
    }

    scaleImage({type, value, side, img}){
        const imageW = img.width
        const imageH = img.height
        const proportionW = imageW / imageH
        const proportionH = imageH / imageW

        let w = 0
        let h = 0
        if(type == "percent"){
            // Percent
            if(side == "width"){
                w = imageW * value
                h = proportionH * w
            }else{
                h = imageH * value
                w = proportionW * h
            }
        }else{
            // Pixels
            if(side == "width"){
                w = value
                h = proportionH * w
            }else{
                h = value
                w = proportionW * h
            }
        }
        
        img.displayWidth = w
        img.displayHeight = h
        
        
    }

    centerIMG(img){
        
        const imageW = img.displayWidth
        const imageH = img.displayHeight
        
        //console.log(`centerImg imageW:${imageW} imageH:${imageH}`)
        const x = (this.scale.gameSize.width * .5) - (imageW * .5)
        const y = (this.scale.gameSize.height * .5) - (imageH * .5)

        img.x = x
        img.y = y

        return {
            x:x,
            y:y
        }
    }
}

export default Section;