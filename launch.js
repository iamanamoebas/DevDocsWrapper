// Open a new chome app window with default dimension, most of this script is just a way to remember
// at what size the user left the window after closing, so the next time the app launches the new
// dimensions will be loaded instead
// taken from my tokenizator (arosemena/tokenizator) project

chrome.app.runtime.onLaunched.addListener(function() {
    chrome.storage.local.get('bounds', function(o){
        var bounds = {width: 800, height: 600, top: 20, left: 20};
        if(typeof o.bounds !== 'undefined') {
            if(typeof o.bounds.width  === 'number' &&
                typeof o.bounds.height === 'number' &&
                typeof o.bounds.top    === 'number' &&
                typeof o.bounds.left   === 'number') {
                // assign values directly to avoid injection
                bounds = {width  : o.bounds.width,
                    height : o.bounds.height,
                    top    : o.bounds.top,
                    left   : o.bounds.left}
            }
        }
        chrome.app.window.create('wrapper.htm', {
            bounds: bounds,
            minWidth: 800,
            minHeight: 600
        }, function(w){
            w.onClosed.addListener(function(){
                chrome.storage.local.set({'bounds': w.getBounds()});
            })
        });
    });

});