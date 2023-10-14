import GlobalEvents from '../globalevents.js';

class Swipe{

    constructor(container){
        var listener = SwipeListener(container); // https://www.npmjs.com/package/swipe-listener

        container.addEventListener('swipe', function (e) {
            var directions = e.detail.directions;
            var x = e.detail.x;
            var y = e.detail.y;
            let events = GlobalEvents.getInstance();
          
            if (directions.left) {
              events.notify(GlobalEvents.ON_SWIPE_GESTURE, Swipe.LEFT);
            }
          
            if (directions.right) {
              events.notify(GlobalEvents.ON_SWIPE_GESTURE, Swipe.RIGHT);
            }
          
            if (directions.top) {
              events.notify(GlobalEvents.ON_SWIPE_GESTURE, Swipe.UP);
            }
          
            if (directions.bottom) {
              events.notify(GlobalEvents.ON_SWIPE_GESTURE, Swipe.DOWN);
            }
           
          });
    }
    
}

Swipe.LEFT = "left"
Swipe.RIGHT = "right"
Swipe.UP = "up"
Swipe.DOWN = "down"

export default Swipe;