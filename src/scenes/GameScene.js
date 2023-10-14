import BackgroundScene from './BackgroundScene.js';
import Screen from '../helpers/Screen.js';
import Constants from '../helpers/Constants.js';
import GlobalEvents from '../globalevents.js';

class GameScene extends Phaser.Scene
{
    constructor ()
    {
        super('GameScene');
        
    }

    preload ()
    {
        this.logs = []
        Screen.H = this.scale.gameSize.height
        Screen.W = this.scale.gameSize.width
        
        
        this.load.image('splash', '/public/splash.png');
        this.load.image('perfume', '/public/perfume.png');
        this.load.image('bgButton', '/public/buttons/bgButton.png');
        this.load.image('bg', '/public/background.jpg');
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);

        this.lockPortrait()
    }

    lockPortrait(){
        screen.orientation
        .lock("landscape")
        .then(() => {
            console.log("locked success")
            this.logs.push("locked success")
            
        })
        .catch((error) => {
            console.log(`locked error:${error}`)
            this.logs.push(`locked error:${error}`)
        });
    }

    create ()
    {
        this.globalevents = GlobalEvents.getInstance()
        
        this.sections = []
        this.currentNode = undefined

        // SECTIONS
        this.presentation1 = this.scene.get('Presentation1')
        this.addSection({
            section:this.presentation1,
            position: Constants.BOTTOM
        })
        
        this.backgroundScene = this.scene.get('BackgroundScene')
        this.backgroundScene.start(this)        
        
        // console.log(`w:${this.scale.gameSize.width} h:${this.scale.gameSize.height}`)

        // FPS Text
        this.FPStext = this.add.text(0, 0, "FPS:");
        this.versionText = this.add.text(0, 0, `v${Constants.version }`, {align:"right"})
        this.versionText.x = Screen.W - this.versionText.width

        // Log texts
        this.logText = this.add.text(0, 0, "", {align:"left"})
        this.logText.y = 30

        // this.add.image(400, 300, 'sky');
        //this.star = this.add.image(400, 300, 'star').setInteractive()
        //this.star.name = "star"
        
        /*
        this.input.on('gameobjectdown', (pointer, button) =>
        {
            console.log(`button.name:${button.name}`)
        });
        */
        
        this.gotoNode('Presentation1')
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
        
        console.log(nextNode)

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
    
        this.FPStext.text = `FPS:${loop.actualFps}`;

        // Logs
        this.logText.text = this.logs.join("\n")
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