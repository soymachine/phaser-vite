class TextButton
{
    constructor ({text, game, view, width=100, height=100, x = 0, y = 0, spriteName = 'bgButton', fontFamily ='"Roboto", "Roboto-Bold", serif', color ='white', fontSize = 18, callback = undefined })
    {
        this.callback = callback
        this.button = game.add.container();  
        this.image = game.make.nineslice({
            x: 0,
            y: 0,
            key: spriteName,
            // frame: '',
            width: width,
            height: height,
            leftWidth: 0,
            rightWidth: 0,
            topHeight: 0,
            bottomHeight: 0,
            // angle: 0,
            // alpha: 1,
            // scale : {
            //    x: 1,
            //    y: 1
            //},
            //origin: {x: 0.5, y: 0.5},
            add: true
        });
        console.log(this.image)
        //this.image.setTintFill(buttonColor);

        this.text = game.add.rexBBCodeText(0, 0, text, { fontFamily, fontSize, color }).setInteractive();
        //this.text.anchor.setTo(0.5); 
        this.button.add(this.image)
        this.button.add(this.text)
        
        this.button.x = x
        this.button.y = y

        view.add(this.button)

       // this.button.width = width
        this.displayWidth = width
        //this.button.height = height
        this.displayHeight = height

        const that = this
        this.text.on('pointerdown', function () {
            that.onClick()
        });
        
    }

    onClick(){
        this.callback?.()
    }


    
}

export default TextButton;