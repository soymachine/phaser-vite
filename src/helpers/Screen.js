class Screen {
    
}

Screen.W = 0
Screen.H = 0

Screen.fitToScreen = (img)=>{

    const prop = window.innerWidth / window.innerHeight
    let width = 0
    let height = 0
    if(prop < 1.7){
        height = Screen.H 
        width = Screen.H  * (img.width / img.height)
    }else{
        width = Screen.W
        height = Screen.W  * (img.height / img.width)
    }
    
    img.setDisplaySize(width, height)
    const x = (Screen.W * .5) - (width * .5)
    const y = (Screen.H * .5) - (height * .5)
    
    img.x = x
    img.y = y
}

export default Screen;