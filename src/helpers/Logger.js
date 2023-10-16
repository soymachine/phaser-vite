class Logger {

    constructor(initObj) {
        //console.log(this)
        console.log("Constructor de Logger")
        this.logs = []
        this.label = initObj.text
    }

    log(str){
        this.logs.unshift(this.getNum() + " " + str)
        //console.log(`join en logger es ${this.logs.join("\n")}`)
        console.log(this.label)
        this.label.text = this.logs.join("\n")
    }
    
    getNum(){
        return this.logs.length + 1;
    }

}

Logger.myInstance = null
Logger.getInstance = (initObj)=>{
    if(Logger.myInstance == null){
        Logger.myInstance = new Logger(initObj)   
    }
    
    return Logger.myInstance
}

export default Logger;