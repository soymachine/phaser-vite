import Constants from '../helpers/Constants.js';
import Screen from '../helpers/Screen.js';
import GlobalEvents from '../core/GlobalEvents.js';

class SectionController 
{
    constructor (mainScene)
    {
        this.create(mainScene)
    }
    
    create (mainScene)
    {
        this.mainScene = mainScene
        this.globalevents = GlobalEvents.getInstance()
        this.sections = []
        this.currentNode = undefined
        
        this.safeArea = 20

        // SECTIONS
        this.presentation1 = this.mainScene.scene.get(Constants.PRESENTATION_1)
        this.addSection({
            section:this.presentation1,
            position: Constants.RIGHT
        })

        this.presentation2 = this.mainScene.scene.get(Constants.PRESENTATION_2)
        this.addSection({
            section:this.presentation2,
            position: Constants.RIGHT
        })
        
        // Ojo, esto descomentado!!
        this.gotoNode(Constants.PRESENTATION_1)

        this.globalevents.subscribe(GlobalEvents.ON_ORIENTATION_CHANGED, (params)=>{this.onOrientationChange2(params)})
        this.globalevents.subscribe(GlobalEvents.ON_REQUEST_NEW_NODE, (params) =>{this.onRequestNewNode(params)});
    }

    onRequestNewNode = (params)=>{
        const {requestedNodeID} = params

        this.gotoNode(requestedNodeID)
    }

    addSection = ({section, position})=> {
        
        section.setPosition(position)
        section.start({
            game: this.mainScene, 
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
            const nodeOutID = this.currentNodeID
            this.move(this.currentNodeID, outPosition.x, outPosition.y, ()=>{
                this.globalevents.notify(GlobalEvents.ON_NODE_END_OUT, nodeOutID);
            })
            // Actualizamos la posición del actual
            currentNode.setPosition(outPosition.positionResult)
        }

        // Notificamos los inicios: qué nodo se va a ir y qué nodo va a entrar        
        this.globalevents.notify(GlobalEvents.ON_NODE_START_IN, nextNodeID);

        this.globalevents.notify(GlobalEvents.ON_NODE_START_OUT, this.currentNodeID);
        
        // Movemos al siguiente dentro de la pantalla
        this.move(nextNodeID, 0, 0, ()=>{
            this.globalevents.notify(GlobalEvents.ON_NODE_END_IN, this.currentNodeID);
        })
        
        // Actualizamos los valores del current node
        this.currentNodeID = nextNodeID
        // TODO Nodes.currentNodeID = nextNodeID // Info general de dónde estamos exactamente

        // Enviamos evento de que hemos movido nodos
        this.globalevents.notify(GlobalEvents.ON_NODE_CHANGE, this.reversePosition(nextNode.getPosition()));

        // Actualizamos la posición del siguiente
        nextNode.setPosition(Constants.CENTER)

    }

    move = (targetID, x, y, callback) =>{
        
        const target = this.getSection(targetID)
        // console.log(`target x:${x} y:${y}`)

        target.moveTo(x, y, callback)
        
    }

    getOutPosition = (positionPush, currentNodeID)=>{
        let x = 0
        let y = 0
        let positionResult = Constants.LEFT
        let nodeOffset = 0
        switch(positionPush){
            case Constants.LEFT:
                x = Screen.W + nodeOffset
                positionResult = Constants.RIGHT
                break;
            case Constants.RIGHT:
                x = -(Screen.W + nodeOffset)
                positionResult = Constants.LEFT
                break;
            case Constants.TOP:
                y = Screen.H + nodeOffset
                positionResult = Constants.BOTTOM
                break;
            case Constants.BOTTOM:
                y = -(Screen.H + nodeOffset)
                positionResult = Constants.TOP                
                break;
        }

        return {y: y, x: x, positionResult}
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

export default SectionController;