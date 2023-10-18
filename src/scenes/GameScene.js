import SectionController from '../core/SectionController.js';
import Screen from '../helpers/Screen.js';
import Constants from '../helpers/Constants.js';
import GlobalEvents from '../core/GlobalEvents.js';
import Logger from '../helpers/Logger.js';
import Version from '../helpers/Version.js';
import Orientation from '../helpers/Orientation.js';
import {setText, fitTextInto} from '../helpers/TextHelper.js'

class GameScene extends Phaser.Scene
{
    constructor ()
    {
        super({
            key:'GameScene',
            active:false
        });    
        
    }

    preload ()
    {
        Screen.H = this.scale.gameSize.height
        Screen.W = this.scale.gameSize.width

        this.orientationHelper = Orientation.getInstance()
        this.firstRunPortrait = (this.orientationHelper.orientation == Constants.PORTRAIT) ? true: false;
        this.orientation = this.orientationHelper.orientation
        
        // Esto puede ir en el PreloadScene?
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true)
        
        this.showDisplayMode()
    }

    onOrientationChange2(params)
    {
        this.orientation = params.orientation
        //console.log(`[onOrientationChange2] newOrientation:${this.orientation}`)
        this.showDisplayMode()
    }

    create ()
    {
        // Global Events
        this.globalevents = GlobalEvents.getInstance()
        this.globalevents.subscribe(GlobalEvents.ON_ORIENTATION_CHANGED, (params)=>{this.onOrientationChange2(params)})

        // STATIC SECTIONS        
        this.backgroundScene = this.scene.get('BackgroundScene')
        this.backgroundScene.start(this)   
        
        
        // DYNAMIC SECTIONS
        this.sectionController = new SectionController(this)


        // TESTING
        /*
        this.testImg = this.add.image(0, 0, 'image_2').setOrigin(0, 0)
        const x = (Screen.W * .5) - (this.testImg.width * .5)
        const y = (Screen.H * .5) - (this.testImg.height * .5)
        this.testImg.x = x
        this.testImg.y = y
        Screen.fitToScreen(this.testImg)
        */

        
        // Para testeo
        // this.square  = this.add.rectangle(0, 0, maxW , maxH, '0x00FF00').setOrigin(0, 0);

        // Log texts
        this.logText = this.add.text(0, 0, "", {align:"left", fontSize:30})
        this.logText.x = Constants.safeArea
        this.logText.y = 20
        this.logger = Logger.getInstance({
            text:this.logText
        })
        this.logger.log(`innerWidth:${window.innerWidth} innerHeight:${window.innerHeight}`)
        this.logger.log(`prop:${window.innerWidth / window.innerHeight}`)
        this.logger.log(`Screen.W:${Screen.W} Screen-H:${Screen.H}`)

        // Numero de versión
        Version.getInstance({
            scene:this,
            position:Constants.RIGHT
        })
    }

    showDisplayMode(){
        console.log(`showDisplayMode:${this.orientation}`)
        if(this.orientation == Constants.LANDSCAPE){
            // Correct
            document.getElementById("turn").style.display="none";

            if(this.firstRunPortrait){
                this.cleanScenes()
            }

        }else{
            // Incorrect
            document.getElementById("turn").style.display="block";
        }
    }

    cleanScenes = ()=>{
        window.location.reload()
        /*
        Logger.myInstance = null
        this.globalevents.unsubscribe(GlobalEvents.ON_ORIENTATION_CHANGED, (params)=>{this.onOrientationChange2(params)})
        this.scale.off("orientationchange", this.onOrientationChange, this);          
        this.presentation1.scene.restart()
        this.backgroundScene.scene.restart()
        this.scene.restart("GameScene")
        */
    }


    update ()
    {
        // LOOP, para cuando lo necesitemos
        /*
        var loop = this.sys.game.loop;
        this.FPStext.text = `FPS:${loop.actualFps}`;
        */
        
    }

}

export default GameScene;