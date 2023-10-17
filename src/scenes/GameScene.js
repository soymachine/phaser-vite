import BackgroundScene from './BackgroundScene.js';
import Screen from '../helpers/Screen.js';
import Constants from '../helpers/Constants.js';
import GlobalEvents from '../globalevents.js';
import Logger from '../helpers/Logger.js';
import Orientation from '../helpers/Orientation.js';
import {setText} from '../helpers/TextHelper.js'

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
        console.log("preload")
        this.orientationHelper = Orientation.getInstance()
        this.firstRunPortrait = (this.orientationHelper.orientation == Constants.PORTRAIT) ? true: false;
        this.orientation = this.orientationHelper.orientation
        console.log(`[preload] this.firstRunPortrait:${this.firstRunPortrait}`)
        console.log(`[preload] this.orientationHelper.orientation:${this.orientationHelper.orientation}`)
        console.log(`[preload] this.orientation:${this.orientation}`)

        Screen.H = this.scale.gameSize.height
        Screen.W = this.scale.gameSize.width
        console.log(Screen.W + " " + Screen.H)
        
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
        console.log("create")
        this.sections = []
        this.currentNode = undefined
        this.safeArea = 20
        // SECTIONS
        this.presentation1 = this.scene.get('Presentation1')
        this.addSection({
            section:this.presentation1,
            position: Constants.BOTTOM
        })
        
        this.backgroundScene = this.scene.get('BackgroundScene')
        this.backgroundScene.start(this)        
        
        this.globalevents = GlobalEvents.getInstance()
        
        
        // Ojo, esto descomentado!!
        // this.gotoNode('Presentation1')

        this.globalevents.subscribe(GlobalEvents.ON_ORIENTATION_CHANGED, (params)=>{this.onOrientationChange2(params)})

        // TESTING
        this.testImg = this.add.image(0, 0, 'image_2').setOrigin(0, 0)
        
        const x = (Screen.W * .5) - (this.testImg.width * .5)
        const y = (Screen.H * .5) - (this.testImg.height * .5)
        console.log(`this.testImg.width:${this.testImg.width}`)
        this.testImg.x = x
        this.testImg.y = y
        Screen.fitToScreen(this.testImg)

        // Left Button
        this.leftButton = this.add.image(0, 0, 'goBack_button').setOrigin(0, 0)
        this.rightButton = this.add.image(0, 0, 'continue_button').setOrigin(0, 0)
        
        const offset = 62
        this.leftButton.x = offset
        this.leftButton.y = Screen.H - this.leftButton.height - offset

        this.rightButton.x = Screen.W - this.rightButton.width - offset
        this.rightButton.y = Screen.H - this.rightButton.height - offset

        
        var style = { font: "bold 32px Arial", fill: "#fff"};
        
        
        //this.presentationText = this.add.rexBBCodeText(0, 0, 'She logs onto a website and sees the first selection step', { fontFamily: 'Arial', fontSize: 50, color: '#FFFFFF' });
        const maxW = 735
        this.presentationText =  this.add.text(0, 0, 'She logs onto a website and sees the first selection step', {
            fixedWidth: maxW,
            fontSize: '50px',
            fontFamily: 'Arial',
            align: 'center',
            wordWrap: {
                width: maxW,
                useAdvancedWrap: true
            },
        })
        
        this.presentationText.x = Screen.W * .5 - (this.presentationText.width * .5)
        this.presentationText.y = Screen.H - (this.presentationText.height) - offset

        // Log texts
        this.logText = this.add.text(0, 0, "", {align:"left", fontSize:30})
        this.logText.x = this.safeArea
        this.logText.y = 20
        this.logger = Logger.getInstance({
            text:this.logText
        })
        this.logger.log(`innerWidth:${window.innerWidth} innerHeight:${window.innerHeight}`)
        this.logger.log(`prop:${window.innerWidth / window.innerHeight}`)
        this.logger.log(`Screen.W:${Screen.W} Screen-H:${Screen.H}`)

        this.versionText = this.add.text(0, 0, `v${Constants.version }`, {align:"right", fontSize:30})
        this.versionText.x = Screen.W - (this.versionText.width) - this.safeArea
        this.versionText.y = 10

        this.dimensions = this.add.text(0, 0, `ddsdasdsdasdsadsda`, {align:"right", fontSize:30})
        this.dimensions.y = 200
        this.dimensions.setText(`window.innerWidth:${window.innerWidth} window.innerHeight${window.innerHeight}`)
        this.dimensions.x = (Screen.W * .5) - (this.dimensions.width  * .5)
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

    addSection = ({section, position})=> {
        
        section.setPosition(position)
        section.start({
            game: this, 
            position: position
        })

        this.sections.push(section)
    }

    getSection = (nodeID) =>{
        return this.sections.find(node => node.id == nodeID)
    }

    gotoNode = (nextNodeID)=>{
        const nextNode = this.getSection(nextNodeID)
        
        if(this.currentNodeID != undefined){
            // Recogemos el nodo actual
            const currentNode = this.getSection(this.currentNodeID)
            // Calculamos a dónde se ha de mover el actual (depende de donde esté el siguiente)
            const outPosition = this.getOutPosition(nextNode.getPosition(), this.currentNodeID)
            // Movemos al actual fuera de la pantalla
            console.log(`move started, currentNode:${this.currentNodeID}`)
            const nodeOutID = this.currentNodeID
            this.move(this.currentNodeID, outPosition.top, outPosition.left, ()=>{
                this.globalevents.notify(GlobalEvents.ON_NODE_END_OUT, nodeOutID);
            })
            // Actualizamos la posición del actual
            currentNode.setPosition(outPosition.positionResult)
        }

        // console.log(`nextNodeID: ${nextNodeID}`)

        // Notificamos los inicios: qué nodo se va a ir y qué nodo va a entrar
        
        this.globalevents.notify(GlobalEvents.ON_NODE_START_IN, nextNodeID);

        this.globalevents.notify(GlobalEvents.ON_NODE_START_OUT, this.currentNodeID);
        
        // Movemos al siguiente dentro de la pantalla
        this.move(nextNodeID, 0, 0, ()=>{
            this.globalevents.notify(GlobalEvents.ON_NODE_END_IN, this.currentNodeID);
        })
        
        // Actualizamos los valores del current node
        this.currentNodeID = nextNodeID
        //Nodes.currentNodeID = nextNodeID // Info general de dónde estamos exactamente

        // Enviamos evento de que hemos movido nodos
        
        //console.log(nextNode)

        this.globalevents.notify(GlobalEvents.ON_NODE_CHANGE, this.reversePosition(nextNode.getPosition()));

        // Actualizamos la posición del siguiente
        nextNode.setPosition(Constants.CENTER)

    }

    move = (targetID, x, y, callback) =>{
        
        const target = this.getSection(targetID)
        // console.log(`target x:${x} y:${y}`)

        target.moveTo(x, y, callback)
        
    }

    handler (gameObject)
    {
        gameObject.setTint(0xff0000);
    }
    
    update ()
    {
        var loop = this.sys.game.loop;
    
        //this.FPStext.text = `FPS:${loop.actualFps}`;
        this.dimensions.setText(`window.innerWidth:${window.innerWidth} window.innerHeight${window.innerHeight}`)
        this.dimensions.x = (Screen.W * .5) - (this.dimensions.width  * .5)
    }

    getOutPosition = (positionPush, currentNodeID)=>{
        let left = 0
        let top = 0
        let positionResult = Constants.LEFT
        let nodeOffset = 0
        switch(positionPush){
            case Constants.LEFT:
                left = this.W + nodeOffset
                positionResult = Constants.RIGHT
                break;
            case Constants.RIGHT:
                left = -(this.W + nodeOffset)
                positionResult = Constants.LEFT
                break;
            case Constants.TOP:
                top = this.H + nodeOffset
                positionResult = Constants.BOTTOM
                break;
            case Constants.BOTTOM:
                top = -(this.H + nodeOffset)
                positionResult = Constants.TOP                
                break;
        }

        return {top, left, positionResult}
    }

    reversePosition = (currentPosition)=>{
        switch(currentPosition){
            case Constants.LEFT:
                return  Constants.RIGHT
            case Constants.RIGHT:
                return  Constants.LEFT
            case Constants.TOP:
                return  Constants.BOTTOM
            case Constants.BOTTOM:
                return  Constants.TOP
        }
    }

}

export default GameScene;