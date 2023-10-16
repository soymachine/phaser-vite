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