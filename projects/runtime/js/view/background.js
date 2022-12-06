var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        // ANIMATION VARIABLES HERE:
        
     
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO: 2 - Part 2
            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.rect(canvasWidth,canvasHeight, 'blue');
            background.addChild(backgroundFill);
            
            // TODO: 3 - Add a moon and starfield
              
            for (var stars = 0; stars <= 1000; stars++){
                var circle = draw.circle(0.5, "white", "LightGray", 2);
                circle.x = canvasWidth * Math.random();
                circle.y = groundY * Math.random();
                background.addChild(circle);
            }

            var deathstar = draw.bitmap("img/deathstar.png");
                deathstar.x = 800;
                deathstar.y = 0.5;
                deathstar.scaleX = 1.5;
                deathstar.scaleY = 1.5;
                background.addChild(deathstar);

          
            
            // TODO 5: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            
            for (var i = 0; i < 5; ++i) {
                var buildingHeight = 300 * Math.random();
                var building = draw.bitmap("img/sithbuilding.png");
                //draw.rect(75, buildingHeight, "Gray", "white", 1);
                //= 
                building.x = 200 * i;
                building.y = groundY - buildingHeight;
                background.addChild(building);
                buildings.push(building);
              }
            
            // TODO 4: Part 1 - Add a tree
            falcon = draw.bitmap("img/falcon.png");
            falcon.x = 10;
            falcon.y = 100;
            background.addChild(falcon);
            
        } // end of render function - DO NOT DELETE

            var falcon
            var buildings = [];
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 4: Part 2 - Move the tree!
            
            falcon.x = falcon.x - 1;

            if (falcon.x < -200) {
                falcon.x = canvasWidth;
            }
            
            // TODO 5: Part 2 - Parallax

            for( var i = 0; i < buildings.length; i++) {
                var eachElement = buildings[i];
                eachElement.x = eachElement.x - 1.7;

                if (eachElement.x < -200) {
                    eachElement.x = canvasWidth
                }
            }
        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
