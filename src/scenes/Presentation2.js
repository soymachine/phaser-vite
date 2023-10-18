import Section  from './Section.js'
import Screen  from '../helpers/Screen.js'
import Constants  from '../helpers/Constants.js'
import {fitTextInto} from '../helpers/TextHelper.js'

import GlobalEvents from '../core/GlobalEvents.js';

class Presentation2 extends Section
{
    constructor ()
    {
        super("Presentation2");
    }

    start({game, position}){
        
        const that = this

        super.create({
            position: position
        })

        let offset = 100
        const maxW = 500//735
        const maxH = 143
        this.game = game
        this.presentationText = fitTextInto(this, "She logs onto a website and sees the first selection step", maxW, maxH,  {
            fixedWidth: maxW,
            fontFamily:"Arial",
            align:"center",
            fontSize: 50,
            wrap: {
                mode: 'word',
                width: maxW
            },
        })

        this.view.add(this.presentationText);
        
        this.presentationText.x = Screen.W * .5 - (maxW * .5)
        this.presentationText.y = Screen.H - (this.presentationText.height) - offset


        this.leftButton = this.add.image(0, 0, 'goBack_button').setOrigin(0, 0).setInteractive();
        
        this.view.add(this.leftButton)
        offset = 62
        this.leftButton.x = offset
        this.leftButton.y = Screen.H - this.leftButton.height - offset
        
        this.leftButton.on('pointerdown', function (pointer)
        {
            that.globalevents.notify(GlobalEvents.ON_REQUEST_NEW_NODE, {requestedNodeID:Constants.PRESENTATION_1});
        });
        
    }
}

export default Presentation2;