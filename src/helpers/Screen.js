class Screen {
    
}

Screen.W = 0
Screen.H = 0

Screen.fitToScreen = (img)=>{
    const width = Screen.W
    const height = Screen.W  * (img.height / img.width)
    img.setDisplaySize(width, height)
    const x = (Screen.W * .5) - (width * .5)
    const y = (Screen.H * .5) - (height * .5)
    
    img.x = x
    img.y = y

    console.log(`img w:${img.width} h:${img.height}`)
}

export default Screen;