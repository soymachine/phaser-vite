import GlobalEvents from '../core/GlobalEvents.js'
import Constants from '../helpers/Constants.js'

class Orientation {

    constructor(initObj) {
        //console.log(this)
        console.log("Constructor de Orientation")
        
        this.updateOrientation()

        const globalevents = GlobalEvents.getInstance()
        const that = this
        window.onresize = function (){
            that.updateOrientation()
            globalevents.notify(GlobalEvents.ON_ORIENTATION_CHANGED, {orientation:that.orientation})
        };
    }

    updateOrientation(){
        if(window.innerWidth > window.innerHeight){
            // landscape    
            this.orientation = Constants.LANDSCAPE
        }
        else{
            // portrait
            this.orientation = Constants.PORTRAIT
        }
    }

    

}

Orientation.myInstance = null
Orientation.getInstance = (initObj)=>{
    if(Orientation.myInstance == null){
        Orientation.myInstance = new Orientation(initObj)   
    }
    
    return Orientation.myInstance
}

export default Orientation;