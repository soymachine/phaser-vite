import Constants from './Constants.js'
import Screen from './Screen.js'

class Version {

    constructor(initObj) {
        console.log("Constructor de Version")        
        const {scene, position} = initObj

        if(position == Constants.LEFT){
            this.versionText = scene.add.text(0, 0, `v${Constants.version }`, {align:"left", fontSize:30})
            this.versionText.x = Constants.safeAreaa
        }else{
            this.versionText = scene.add.text(0, 0, `v${Constants.version }`, {align:"right", fontSize:30})
            this.versionText.x = Screen.W - (this.versionText.width) - Constants.safeArea
        }
        this.versionText.y = 10
    }

    

}

Version.myInstance = null
Version.getInstance = (initObj)=>{
    if(Version.myInstance == null){
        Version.myInstance = new Version(initObj)   
    }
    
    return Version.myInstance
}

export default Version;