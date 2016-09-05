/**Controller for this state */
SceneManager.GameStart = (function () {
    /**Current stage. */
	var stage = false;
    /**Current level. */
	var currentLevel = false;
    /**Game element (i.e. coin) */
	var element	= false;
    /**Instance of Game Logic. */
	var gameEngine = false;
    /**Represntation of monkey. */
	var monkey = { row: 0, column: 0 };
    /**Offset for all elements. */
	var offsetGeneralX = 132;
    /**Offset for all elements. */
    var offsetGeneralY = 20;
    /**Flag to know if user can press a key. */
	var canPress = true;
	/**
     * When the transition goes to this State, this will do initializations.
	 * @param  {string} event Name of the event was fired.
	 * @param  {string} from From which state came.
	 * @param  {string} to Name of the actual state.
	 * @param  {any} message Some data for the state.
	 */
	SceneManager.onGameStart = function (event, from, to, msg) {
		prepareCanvas();
		pauseGame(false);
		msg = msg || { levelIndex: 0, stageIndex: 0 };
		msg.restart = msg.restart === undefined ? false : msg.restart;
		if (from === "ArcadeLevels" || from === "GameEnd" || from === "none" || msg.restart) {
			monkey = { row: 0, column: 0 };
			canPress = true;
			var gameConfig = new GameConfig(msg.stageIndex, msg.levelIndex);
			currentLevel = gameConfig.getCurrentLevel();
			gameEngine = new GameEngine();
			gameEngine.moveTo = false;
			element = gameEngine.getElement(); 
			createjs.Tween.removeAllTweens();
			$("<div>").load("app/htmls/GameStart.html", function() {
				if (!$("#SceneGameStart").length) {
					$("#canvasdiv").append($(this).html());
					$("#canvasdiv").addClass("game-start-background-"+gameConfig.getStage().environment);
					$("#SceneGameStart").addClass(gameConfig.getStage().environment);
				}
				else
					$("#SceneGameStart .top .info").removeClass("hide");
			});
			setTimeout(function(){
				player.play(sounds["stage_0"+(currentLevel.stageIndex+1)+"_bg_sound"],true);
				Scene.text = GameStartText;
				Scene.text();
				drawStage();
				restartCoconut();
				GameStartAnimations.in();
				gameEngine.start(currentLevel);
			},100);
			if (StageConfig.getLevelInfo(msg.stageIndex,msg.levelIndex).status != "available")
				StageConfig.setLevelStatus(msg.stageIndex,msg.levelIndex, "available");
		} 
		else {
			setTimeout(function() {
				Scene.keys = tutorial.isOpen() ? tutorial.keys : GameStartKeys;
				Scene.keys();
				if (from === "GamePause") {
					if (!currentLevel.coins)
						SceneManager.GameStartToGameEnd({ stageIndex: currentLevel.stageIndex, levelIndex: currentLevel.index, 
                                                            stars: calcStars(), clearCanvas: clearCanvas });
					else if (!currentLevel.coconuts)
						SceneManager.GameStartToGameEnd({ stageIndex: currentLevel.stageIndex, levelIndex: currentLevel.index, 
                                                            stars: 0, clearCanvas: clearCanvas });
				}
			}, 100);
		}
	};
	/**
     * Transition from this state to GamePause.
	 * @param  {string} event Name of the event was fired.
	 * @param  {string} from Name of this state.
	 * @param  {string} to Name the next state.
	 * @param  {string} message Some messages for the next state.
	 */
	SceneManager.onGameStartToGamePause = function (event, from, to, message) {
		pauseGame(true);
	};
	/**
     * Contains animations when this state is involved in transitions.
     * @typ {Object}
     */		
	var GameStartAnimations = {		
		in: function(){
			$("#canvasdiv").addClass("visible");
			animation("#canvasdiv", "fade-in", function(){
				Scene.keys = GameStartKeys;
				if (currentLevel.tutorial !== undefined)
					tutorial.show(currentLevel.tutorial);
				else{
					Scene.keys();
					OnePlayerGameClicks();
				}
			}, config.FADE_IN_DURATION, true);
		}		
	}
	/**
     * Bind the behavior for keydown in this state for the stages.
	 */
	function GameStartKeys () {
		unbind_keys();
		$(document).keydown(function(e){
			switch (e.keyCode) {
				case tvKey.KEY_LEFT:
					if (gameEngine.getState() == "move" && canPress) {
						canPress = false;
						var coconut = gameEngine.moveCoconut("left");
						monkey.column = coconut.currentPosition.column;
						drawMonkey();
						Arrows.draw();
						drawCoconut(coconut);
					}
					break;
				case tvKey.KEY_RIGHT:
					if (gameEngine.getState() == "move" && canPress) {
						canPress = false;
						var coconut = gameEngine.moveCoconut("right");
						monkey.column = coconut.currentPosition.column;
						drawMonkey();
						Arrows.draw();
						drawCoconut(coconut);
					}
					break;
				case tvKey.KEY_ENTER:
					if (gameEngine.getState() == "move" && canPress) {
						canPress = false;
						gameEngine.throwCoconut();
						Arrows.remove();
						drawCoconut(gameEngine.step());
					}
					break;
				case tvKey.KEY_RETURN:
					player.play(sounds.select_option);
					SceneManager.GameStartToGamePause({ 
						stageIndex: currentLevel.stageIndex, 
						levelIndex: currentLevel.index, 
						clearCanvas: clearCanvas 
					});
					break;
				case tvKey.KEY_EXIT:
					pauseGame(true);
					popupExit.show();
					break;
			}
		});
	}
	/**
     * Bind click function to allow use the mouse.
     */
	function OnePlayerGameClicks(){
		$("#SceneGameStart #column-c1").click(function() {
			if (canPress == true){
				canPress = false;
				gameEngine.moveTo = 0;
				moveMonkey(gameEngine.moveTo);
			}
		});
		$("#SceneGameStart #column-c2").click(function() {
			if (canPress == true){
				canPress = false;
				gameEngine.moveTo = 2;
				moveMonkey(gameEngine.moveTo);
			}
		});
		$("#SceneGameStart #column-c3").click(function() {
			if (canPress == true){
				canPress = false;
				gameEngine.moveTo = 4;
				moveMonkey(gameEngine.moveTo);
			}
		});
		$("#SceneGameStart #column-c4").click(function() {
			if (canPress == true){
				canPress = false;
				gameEngine.moveTo = 6;
				moveMonkey(gameEngine.moveTo);
			}
		});
		$("#SceneGameStart #column-c5").click(function() {
			if (canPress == true){
				canPress = false;
				gameEngine.moveTo = 8;
				moveMonkey(gameEngine.moveTo);
			}
		});
		$("#SceneGameStart #column-c6").click(function() {
			if (canPress == true){
				canPress = false;
				gameEngine.moveTo = 10;
				moveMonkey(gameEngine.moveTo);
			}
		});
		$("#SceneGameStart #column-c7").click(function() {
			if (canPress == true){
				canPress = false;
				gameEngine.moveTo = 12;
				moveMonkey(gameEngine.moveTo);
			}
		});
	}
    /**
     * Tutorial popup.
     */
	var tutorial = (function(){
        /**Flag to know if tutorial is open */	
		var open = false;
        /**
         * Shows a tutorial.
         * @param {string} image Name of image for the stage.
         */
		function show (image) {
			$("#tutorial .tutorial-size").css("background", "url(resources/images/game/tutorial/tuto_img_0"+image+".png) center no-repeat");
			$("#tutorial").css("opacity",1);
			Scene.keys = keys;
			Scene.keys();
			open = true;
		}
        /**
         * Hides the tutorial.
         */
		function hide () {
			$("#tutorial").css("opacity",0);
			setTimeout(function () {
				open = false;
				Scene.keys = GameStartKeys;
				Scene.keys();
				OnePlayerGameClicks();
				$("#tutorial .tutorial-size").attr("class", "tutorial-size");
			},600);
		}        
        /**
         * Forces the tutorial to close.
         */
        function forceClose() {
            if(open == false) return;
			$("#tutorial").css("opacity",0);
            open = false;
            Scene.keys = GameStartKeys;
            Scene.keys();
            OnePlayerGameClicks();
            $("#tutorial .tutorial-size").attr("class", "tutorial-size");         
        }
        /**
         * To know if tutorial is open.
         * @return {boolean} True if tutorial is open.
         */
		function isOpen () {
			return open;
		}
        /**
         * Bind keys behavior for this popup.
         */
		function keys () {
			unbind_keys();
            $(document).click(function() {
                triggerKey(tvKey.KEY_ENTER);
            });
			$(document).keydown(function(e){
				switch (e.keyCode) {
					case tvKey.KEY_ENTER:
						player.play(sounds.select_option);
						tutorial.hide();
					break;
				}
			});
		}
		return {
			show: show,
			hide: hide,
			keys: keys,
			isOpen: isOpen,
            forceClose: forceClose
		}
	})();
    /**
     * Close tutorial popup.
     */
    function closeTutorial() {
        return tutorial.forceClose();
    }
    /**
     * Prepare canvas element for the game.
     */
	function prepareCanvas () {
		if (!stage) {
			var canvas = document.getElementById('canvas');
			ctx = canvas.getContext('2d');
			stage = stage || new createjs.Stage(canvas);
		}
		createjs.Ticker.setFPS(30);
		createjs.Ticker.addEventListener("tick", stage);
	}
    /**
     * Checks what kind of element colides with coconut.
     * @param {Object} coconut
     */
	function checkElements (coconut) {
		switch (currentLevel.matrix[coconut.currentPosition.row][coconut.currentPosition.column]) {
			case element.floorCoin:
					removeCoin(coconut.currentPosition.row, coconut.currentPosition.column, element.floor);
				break
			case element.vCoin:
					removeCoin(coconut.currentPosition.row, coconut.currentPosition.column, element.vBranch);
			break;
			case element.hCoin:
					removeCoin(coconut.currentPosition.row, coconut.currentPosition.column, element.hBranch);
			break;
			case element.thinBranch:
					removeBranch(coconut.currentPosition.row, coconut.currentPosition.column, element.empty);
			break;
		}
	}
	/**
     * Removes a captured coin.
	 * @param  {number} row Coin location.
	 * @param  {number} column Coin location.
	 * @param  {number} newNumber New value in the matrix.
	 */
	function removeCoin (row, column, newNumber) {
		var name = element[""+currentLevel.matrix[row][column]] + row + column;
		if (stage.getChildByName(name)) {
			currentLevel.coins--;
			createjs.Tween.get(stage.getChildByName(name)).wait(100).to({x:930,alpha:0}, 500).call(function(){
				stage.removeChild(stage.getChildByName(name));
				$("#SceneGameStart #coin-wood .coin:not(.show)").first().addClass('showCoinAnimation');
				setTimeout(function() { $("#SceneGameStart #coin-wood .coin.showCoinAnimation").addClass('show').removeClass("showCoinAnimation"); }, 250);
			});
			currentLevel.matrix[row][column] = newNumber;
		}
	}    
	/**
     * Removes a broken branch.
	 * @param  {number} row Where is located the branch.
	 * @param  {number} column Branch location.
	 * @param  {number} newNumber To delete branch from the matrix.
	 */
	function removeBranch (row, column, newNumber) {
		var name = element[""+currentLevel.matrix[row][column]] + row + column;
		var image = stage.getChildByName(name);
		if (image) {
			currentLevel.matrix[row][column] = newNumber;
			createjs.Tween.get(image).wait(500).call(function(){ 
				player.play(sounds.branch_break); 
				image.gotoAndPlay("breakBranch");
				image.addEventListener("animationend", function(e) { stage.removeChild(image); });
			});
		}
	}
    /**
     * Draw the stage with its assets.
     */
	function drawStage(){
		var x = y = 0, centerFixBranch = 16, centerFixSwitch = 4, offsetX = 105, offsetY = 115 ;
		var coins = [ ];
		var name = "floorWood";
		var image = stage.getChildByName(name) || new createjs.Bitmap(imageArray.getItem(name).src);
		image.x = 0;
	    image.y = 621;
		image.name = name;
		if (!stage.getChildByName(name))
			stage.addChild(image);
		for(var i=0, row; row = currentLevel.matrix[i]; i++) {
            var len = row.length;
            for(var j=0, column; j<len; j++) {
                column = row[j];
				x += !j ? 0 : ((j+1)%2) ? 122 : 12;
				var valueTranslate = column, wasCoin = false;
	    		if (column >= 20 && column <= 29) { // check if coin
	    			wasCoin = true;
	    			switch (column) {
	    				case element.vCoin:
	    					valueTranslate = element.vBranch;
	    				break;
	    				case element.hCoin:
	    					valueTranslate = element.hBranch;
	    				break;
	    				case element.floorCoin:
	    					valueTranslate = element.floor;
	    				break;
	    			}
	    		}
				if (valueTranslate) {
					var name = element[""+valueTranslate] + i + j;
					if (valueTranslate == element.thinBranch)
						var image = stage.getChildByName(name) || new createjs.Sprite(spriteGenerator.getSprite("branch"));
					else if (valueTranslate == element.upBranch){
						var image = stage.getChildByName(name) || new createjs.Sprite(spriteGenerator.getSprite("upBranch"));
						image.gotoAndPlay("idle");
					}
					else
						var image = stage.getChildByName(name) || new createjs.Bitmap(imageArray.getItem(element[""+valueTranslate]).src);
					var xPosition = x + offsetX + offsetGeneralX;
					var yPosition = y + offsetY + offsetGeneralY;
					if ((j%2)) {
						switch (valueTranslate) {
							case element.sSwitch:
							case element.rSwitch:
							case element.gSwitch:
								yPosition += centerFixSwitch;
							break;
							case element.hBranch:
							case element.thinBranch:
							case element.upBranch:
							case element.rBranch:
							case element.gBranch:
								yPosition += centerFixBranch;
							break;
						}
					}
					image.x = xPosition;
					image.y = yPosition;
					image.name = name;
					if (!stage.getChildByName(name))
						stage.addChild(image);
					if (wasCoin) {
						name = element[""+column] + i + j;
						image = stage.getChildByName(name) || new createjs.Sprite(spriteGenerator.getSprite("coin"));
						image.name = name;
						if (column == element.vCoin) {
							image.x = xPosition - 43;
							image.y = yPosition - 31;
						}
						else if (column == element.hCoin) {
							image.x = xPosition + 7;
							image.y = yPosition - 47;
						}
						else if (column == element.floorCoin) {
							image.x = xPosition - 40;
							image.y = yPosition - 33;
						}
						if (!stage.getChildByName(name))
							coins.push(image);
					}
				}
			}
			y += 51;
			x = 0;
		}
        for(var it=0, coin; coin=coins[it]; it++) {
            stage.addChild(coin);
            coin.gotoAndPlay("idle");
        }
	}
    /**
     * Defines arrows behavior to know monkey's displacement.
     * @type {Object}
     */
	var Arrows =(function () {
        /**
         * Draw the arrows for monkey directions and label instructions.
         */
		function draw (init) {
			var offsetX = 20, offsetY = 20 ;
			var name  = "arrowLeft";
			var image = stage.getChildByName(name) || new createjs.Bitmap(imageArray.getItem("arrowMonkey").src);
			image.name = name;
			image.visible = true;
			name  = "arrowRight";
			image2 = stage.getChildByName(name) || new createjs.Bitmap(imageArray.getItem("arrowMonkey").src);
			image2.name = name;
			image2.visible = true;
			image2.rotation = 180;
			if(image.column != monkey.column) {
				image.column = monkey.column;
				image.y = offsetGeneralY + offsetY + 27;
				image2.y = offsetGeneralY + offsetY + 55 - 27;
				var x = offsetGeneralX + offsetX + (image.column * 67)  + 15;
				var x2 = offsetGeneralX + offsetX + (image.column * 67) + 183 - 15;
				if (LANGUAGE.current == LANGUAGE.ENG)
					var left = x <= 168 ? x+173 : x-193;
				else
					var left = x <= 168 ? x+173 : x-240;
				if (init) {
					image.x = x;
					image.regX = 15;
					image.regY = 27;
					animateArrow(image,5);
					image2.x = x2;
					image2.regX = 15;
					image2.regY = 27;
					animateArrow(image2,-5);
					$("#SceneGameStart .top .info").css("left", left + 'px');
				}
				else {
					createjs.Tween.get(image,{override:true}).to({x: x}, 150).call(function() { image.x = x; animateArrow(image,5) });
					if (monkey.column <12)
						createjs.Tween.get(image2,{override:true}).to({x: x2}, 150).call(function() { image2.x = x2; animateArrow(image2,-5) });
					$("#SceneGameStart .top .info").css("left", left + 'px');
				}
			}
			if (!stage.getChildByName(name))
				stage.addChild(image, image2);
			if (monkey.column <1)
				stage.getChildByName(image.name).visible = false;
			if (monkey.column >11)
				stage.getChildByName(image2.name).visible = false;
		}
        /**
         * Remove an arrow if the monkey can not move right or left.
         */
		function remove () {
			var name  = "arrowLeft";
			$("#SceneGameStart .top .info").addClass("hide");
			if (stage.getChildByName(name))
				stage.removeChild(stage.getChildByName(name));
			name  = "arrowRight";
			if (stage.getChildByName(name))
				stage.removeChild(stage.getChildByName(name));
		}
        /**
         * Moves arrows for the monkey.
         */
		function animateArrow (arrow, offset) {
			createjs.Tween.get(arrow,{loop:true})
			.to({x: arrow.x + offset},300)
			.to({x: arrow.x },300);
		}

		return {
			draw: draw,
			remove: remove
		}
	})();
    /**
     * Draw monkey position.
     */
	function drawMonkey (init) {
		var offsetX = 68, offsetY = -3;
		var name  = "monkey";
		var image = stage.getChildByName(name) || new createjs.Sprite(spriteGenerator.getSprite(name));
		image.name = name;
		if(image.column != monkey.column) {
			image.column = monkey.column;
			image.y = offsetGeneralY + offsetY;
			var x = offsetGeneralX + offsetX + (image.column * 67);
			if (init)
				image.x = x;
			else
				createjs.Tween.get(image).to({x: x}, 150).call(function() { 
				image.x = x;
				if (gameEngine.moveTo !== false){
					setTimeout(function(){
						moveMonkey(gameEngine.moveTo);
					},150);
				}
				else
					canPress = true; 
				});
		}
		else 
			canPress = true;
		if (!stage.getChildByName(name)){
			stage.addChild(image);
			image.gotoAndPlay("idle");
		}
	}
	/**
     * Animate monkey displacement.
     */
	function moveMonkey(column){
		if (monkey.column == column){
			if (canPress == false){
				Arrows.remove();
				gameEngine.throwCoconut();
				drawCoconut(gameEngine.step());
				gameEngine.moveTo = false;
			}
		}
		else{
			if (monkey.column < column){
				var coconut = gameEngine.moveCoconut("right");
			}
			else if (monkey.column > column){
				var coconut = gameEngine.moveCoconut("left");
			}
			monkey.column = coconut.currentPosition.column;
			drawMonkey();
			Arrows.draw();
			drawCoconut(coconut);
		}
	}
    /**
     * Draws the different types of coconuts in the game.
     */
	function drawCoconut (coconut,init) {
		var offsetX = 113, offsetY = 87 ;
		var name  = "coconut";
		var image = stage.getChildByName(name) || new createjs.Sprite(spriteGenerator.getSprite(name));
		image.name = name;
		var speed = 1;
		checkElements(coconut);	
		switch(coconut.state){
			case "move":
			case "normal":
				image.gotoAndStop("coconut");
			break;
			case "metal":
				speed = .6;
				image.gotoAndStop("sCoconut");
			break;
			case "red":
				image.gotoAndStop("rCoconut");
			break;
			case "green":
				image.gotoAndStop("gCoconut");
			break;
		}
		if(image.column != coconut.currentPosition.column) {
			image.column = coconut.currentPosition.column;
			var x = offsetGeneralX + offsetX + (image.column * 67);
			if (init)
				image.x = x;
			else{
				var rotate = 360;
				if (coconut.flow == "left")
					rotate = -rotate;
				createjs.Tween.get(image).to({x: x, rotation: rotate}, 150).call(function(){image.x = x; image.rotation = 0; checkState(coconut.state); });
			}
		}
		if(image.row != coconut.currentPosition.row) {
			image.row = coconut.currentPosition.row;
			var y = image.row * (image.row == 1 ? 80 : 51);
			y = offsetGeneralY + offsetY + (image.row > 1 ?  (y+29) : y);
			if (init)
				image.y = y;
			else{
				var rotate = 360;
				if (coconut.flow == "up")
					rotate = -rotate;
				createjs.Tween.get(image).to({y: y, rotation: rotate }, 150 * speed).call(function(){image.y = y; image.rotation = 0; checkState(coconut.state); });
			}
		}
		if (!stage.getChildByName(name))
			stage.addChild(image);			
	}
    /**
     * Checks game state.
     */
	function checkState (state) {
		if (state != "move" && state != "endGame") {
			drawCoconut(gameEngine.step());
		}
		else if (state == "endGame") {
			var image = stage.getChildByName("coconut");
			image.gotoAndPlay(image.currentAnimation +"broken");
			if (image.currentAnimation == "sCoconutbroken")
				player.play(sounds.floor_break);
			else
				player.play(sounds.coconut_break);
			image.addEventListener("animationend", function(e) {
       			stage.removeChild(image);
				restartCoconut();
        	});
		}
	}
    /**
     * Restore coconut position to monkey.
     */
	function restartCoconut () {
		$(".coconuts-number").html(addCero(currentLevel.coconuts));
		if (currentLevel.coconuts && currentLevel.coins) {
			gameEngine.restartCoconut(monkey.column);
			var coconut = {currentPosition: {row:0, column: monkey.column}, state: "move", flow: "down"};
			drawMonkey("first");
			Arrows.draw("first");
			drawCoconut(coconut,"first");
		}
		else if (!currentLevel.coins)
			SceneManager.GameStartToGameEnd({ stageIndex: currentLevel.stageIndex, levelIndex: currentLevel.index, stars: calcStars(), clearCanvas: clearCanvas });
		else
			SceneManager.GameStartToGameEnd({ stageIndex: currentLevel.stageIndex, levelIndex: currentLevel.index, stars: 0, clearCanvas: clearCanvas });
	}
	/**
     * Determines number of stars for the score.
     * @return {number} Stars score.
	 */
	function calcStars(){
		var rank = Math.round( (currentLevel.maxCoconuts - currentLevel.bestCoconuts) / 2);
		var usedCoconuts = currentLevel.maxCoconuts - currentLevel.coconuts;
		var stars = 0;		
		if (usedCoconuts <= currentLevel.bestCoconuts)
			stars = 3;
		else if (usedCoconuts > currentLevel.bestCoconuts && usedCoconuts <= (currentLevel.bestCoconuts + rank))
			stars = 2;
		else if (usedCoconuts > (currentLevel.bestCoconuts + rank))
			stars = 1;
		StageConfig.setLevelStars(currentLevel.stageIndex, currentLevel.index, stars);
		return stars;
	}
	/**
     * Clear canvas.
	 */
	function clearCanvas(){
		stage.removeAllChildren();
	}    
    /**
     * Function to suspend game to support multitask on Tizen TVs.
     * @param  {boolean} suspend Game status.
     */
    function suspendGame(suspend) {        
        if(suspend && window.suspending) {
            window.suspending = false;
            clearTimeout(createjs.Ticker._timerId);
            createjs.Ticker.removeEventListener("tick", stage);
        } else if(window.resumming) {
            window.resumming = false;
            createjs.Ticker._handleSynch();
        }        
    }
    /**
     * Send pause signal to tick.
     */
	function pauseGame(val){
		if (val === undefined)
			logger.log("%c** pauseGame needs a param (true:false) **",'color:red');
		else {
            createjs.Ticker.setPaused(val);
            suspendGame(val);
        }
	}
	/**
     * Update the canvas for every tick.
	 * @param  {Object} event Createjs event.
	 */
	function tick(event){
        if (!event.paused) {
		      stage.update();
        }
	}	
	/**
     * Force a number to have two digits.
	 * @param  {number} x A number.
     * @return {string} Nuber with format 0X.
	 */
	function addCero(x){
		x = x < 10 ? '0' + x : x;
		return x;
	}
	/**
     * Remove queue for all canvas animations.
     * @override
	 */
	createjs.Tween.removeAllTweens = function() { 
        var tweens = createjs.Tween._tweens; 
        for (var i=tweens.length-1; i>=0; i--) { 
            tweens[i]._paused = true; 
            tweens.splice(i,1); 
        } 
    };
	/**
     * Sets the label depending TV language.
	 * @param  {number} language_id
	 */	
	function GameStartText(language_id){
		LANGUAGE.current = language_id || LANGUAGE.current;
		$(".stage-number").html(text[LANGUAGE.current].stage + " " + addCero(currentLevel.stageIndex + 1));
		$(".level-number").html(text[LANGUAGE.current].level + " " + addCero(currentLevel.index + 1));
		$(".txt-coconuts").html(text[LANGUAGE.current].coconuts);
		$(".enter-info").html(text[LANGUAGE.current].info_press_enter);
		$(".arrow-info").html(text[LANGUAGE.current].info_press_arrows);
		$(".message-to-play").html(text[LANGUAGE.current].info_press_play);
	}
	/**
     * Available methods.
     * @public
     */	
	return {
		clearCanvas: clearCanvas,
		pauseGame: pauseGame,
        closeTutorial: closeTutorial
	}
})();
