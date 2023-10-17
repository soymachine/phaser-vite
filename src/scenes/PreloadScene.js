class PreloadScene extends Phaser.Scene
{
    constructor ()
    {
        super('PreloadScene');
        
    }

    preload ()
    {
        this.load.image('splash', '/splash.png')
        this.load.image('perfume', '/perfume.png')
        this.load.image('bgButton', '/buttons/bgButton.png')
        this.load.image('bg', '/background.jpg')
        this.load.image('image_1', '/960x540.png')
        this.load.image('image_2', '/1920x1080.png')
        this.load.image('goBack_button', '/goBack_button.png')
        this.load.image('continue_button', '/continue_button.png')
        //this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true)
    }

    create ()
    {
        console.log("Preloaded finished")
        // this.gameScene = this.scene.get('GameScene')
        this.scene.switch("GameScene")

    }

}

export default PreloadScene;