class GlobalEvents {

    constructor() {
        // Para los eventos
        this.events = {};

    }

    // TODO Suscribirse a un evento con una función
    // Ahora: suscribirse con una función
    subscribe(event = "", func) {
        if(this.events[event] == undefined){
            this.events[event] = []
        }

        this.events[event].push(func)
    }
     
    // TODO Desuscribirse a un evento con una función
    // Ahora: desuscribirse con una función
    unsubscribe(event = "", func) {
        if(this.events[event] != undefined){
            this.events[event] = this.events[event].filter((observer) => observer !== func)
        }
    }
     
    // Ahora: notifica siempre a todos los suscritores, no admite distinción del evento
    notify(event = "", data) {
        // Cuidado! No podemos notificar si no hay nadie escuchando este evento
        this.events[event]?.forEach((observer) => observer(data));
    }

}

GlobalEvents.myInstance = null
GlobalEvents.getInstance = ()=>{
    if(GlobalEvents.myInstance == null){
        GlobalEvents.myInstance = new GlobalEvents()   
    }
    
    return GlobalEvents.myInstance
}

GlobalEvents.ON_NODE_CHANGE = "ON_NODE_CHANGE"
GlobalEvents.ON_DOORS_OPENED = "ON_DOORS_OPENED"
GlobalEvents.ON_DOORS_START_OPENING = "ON_DOORS_START_OPENING"
GlobalEvents.ON_NODE_START_IN = "ON_NODE_START_IN" 
GlobalEvents.ON_NODE_END_IN = "ON_NODE_END_IN" 
GlobalEvents.ON_NODE_START_OUT = "ON_NODE_START_OUT" 
GlobalEvents.ON_NODE_END_OUT = "ON_NODE_END_OUT"
GlobalEvents.ON_SWIPE_GESTURE = "ON_SWIPE_GESTURE"
GlobalEvents.ON_REQUEST_NEW_NODE = "ON_REQUEST_NEW_NODE"
GlobalEvents.ON_PROGRESS_LOADING = "ON_PROGRESS_LOADING"
GlobalEvents.ON_LOADING_COMPLETED = "ON_LOADING_COMPLETED"

export default GlobalEvents;