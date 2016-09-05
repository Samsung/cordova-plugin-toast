/**
 * Provides functions to load sprites and select to be animated.
 * @Object
 */
var spriteGenerator = (function () {
        /** 
         * SpriteSheet collection.
         * @type {Object}
         * @protected
        */
        var sprites = { };
        /**
         * This initialize and load all sprites that will be animated.
         */
        function load () {
            var spriteSheet = {
                "animations": { "coconut": [0], "rCoconut": [1], "gCoconut": [2], "sCoconut": [3], 
                                "coconutbroken": [4,11,"coconut",0.5], "rCoconutbroken": [12,19,"coconut",0.5], 
                                "gCoconutbroken": [20,27,"coconut",0.5], "sCoconutbroken": [28,34,"coconut",0.5] 
                },
                "images": [ imageArray.getItem("coconut").src, imageArray.getItem("rCoconut").src, imageArray.getItem("gCoconut").src, 
                            imageArray.getItem("sCoconut").src, imageArray.getItem("coconutBroken").src, imageArray.getItem("rCoconutBroken").src, 
                            imageArray.getItem("gCoconutBroken").src, imageArray.getItem("sCoconutBroken").src
                ],
                "frames": [
                           [0,0,59,57,0,29,29],
                           [0,0,59,57,1,29,29],
                           [0,0,59,57,2,29,29],
                           [0,0,59,57,3,29,29],

                           [0,0,135,77,4,67,39],
                           [269,0,135,77,4,67,39],
                           [404,0,135,77,4,67,39],
                           [539,0,135,77,4,67,39],
                           [673,0,135,77,4,67,39],
                           [808,0,135,77,4,67,39],
                           [943,0,135,77,4,67,39],
                           [1077,0,135,77,4,67,39],

                           [0,0,135,77,5,67,39],
                           [269,0,135,77,5,67,39],
                           [404,0,135,77,5,67,39],
                           [539,0,135,77,5,67,39],
                           [673,0,135,77,5,67,39],
                           [808,0,135,77,5,67,39],
                           [943,0,135,77,5,67,39],
                           [1077,0,135,77,5,67,39],

                           [0,0,135,77,6,67,39],
                           [269,0,135,77,6,67,39],
                           [404,0,135,77,6,67,39],
                           [539,0,135,77,6,67,39],
                           [673,0,135,77,6,67,39],
                           [808,0,135,77,6,67,39],
                           [943,0,135,77,6,67,39],
                           [1077,0,135,77,6,67,39],

                           [0,0,339,59,7,169,29],
                           [339,0,339,59,7,169,29],
                           [677,0,339,59,7,169,29],
                           [1016,0,339,59,7,169,29],
                           [1355,0,339,59,7,169,29],
                           [1693,0,339,59,7,169,29],
                           [2032,0,339,59,7,169,29]
                          ]
                };
            sprites.coconut = new createjs.SpriteSheet(spriteSheet);

            var spriteSheet = {
                "animations": { "thinBranch": [0], "breakBranch": [1,5,"remove",0.6], "remove": [5] },
                "images": [ imageArray.getItem("thinBranch").src, imageArray.getItem("breakBranch").src ], 
                "frames": [
                           [0,0,125,8,0,0,0],
                           [0,0,127,92,1,0,0],
                           [127,0,127,92,1,0,0],
                           [253,0,127,92,1,0,0],
                           [380,0,127,92,1,0,0],
                           [507,0,127,92,1,0,0]
                          ]
                };
            sprites.branch = new createjs.SpriteSheet(spriteSheet);
			
			var spriteSheet = {
                "animations": { "idle": [0,2,true,0.1] },
                "images": [ imageArray.getItem("upBranch").src], 
                "frames": {width:125.32, height:41}
                };
            sprites.upBranch = new createjs.SpriteSheet(spriteSheet);

            var spriteSheet = {
                "animations": { "idle": { frames: [0,1,2,3,4,5], next: true, speed: 0.3} },
                "images": [ imageArray.getItem("gameMonkey").src ], 
                "frames": { width:90.6, height:93 }
                };
            sprites.monkey = new createjs.SpriteSheet(spriteSheet);

            var spriteSheet = {
                "animations": { "idle": [0,15,true,0.3] },
                "images": [ imageArray.getItem("coin").src ], 
                "frames": {width:102.6, height:103}
                };
            sprites.coin = new createjs.SpriteSheet(spriteSheet);

            spriteGenerator["load"] = null;
        }
        /**
         * Provides a specific SpriteSheet.
         * @param  {string} name Sprite's name.
         * @return {SpriteSheet} SpriteSheet with the animations.
         * @see http://createjs.com/docs/easeljs/classes/SpriteSheet.html
         */
        function getSprite (name) {
            return sprites[name];
        }
        
        return {
            load: load,
            getSprite: getSprite
        }
})();