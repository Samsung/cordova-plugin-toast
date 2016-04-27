SceneManager.TwoPlayersGameStart  = (function () {
	/**Current stage. */
	var stage 			= false;
    /**Coin level per player. */
	var	levels 			= [ ];
    /**Game element (i.e. coin) */
	var	element 		= false;
    /**Instance of Game Logic per player. */
	var	gameEngine 		= [ ];
    /**Offset for all elements. */
	var	offsetGeneralX 	= 55; 
    /**Offset for all elements. */
	var	offsetGeneralY 	= 20;
    /**Represns player 1. */
	var	player1 		= 0;
    /**Represents player 2. */
	var	player2			= 1;
    /**Clock counter. */
	var	secondCounter	= 0;
    /**Senconds remaining. */
	var	seconds			= false;
    /**Flag to stop the clock. */
	var	stopCount		= false;
    /**Monkey position for each player. */
	var	monkey 			= [{row: 0, column: 0}, 
						   {row: 0,	column: 0}];
	/**
     * When the transition goes to this State, this will do initializations.
	 * @param  {string} event Name of the event was fired.
	 * @param  {string} from From which state came.
	 * @param  {string} to Name of the actual state.
	 * @param  {any} message Some data for the state.
	 */	
	SceneManager.onTwoPlayersGameStart = function (event, from, to, msg) {		
		msg = msg || { stageIndex: 0, levelIndex: 0};
		msg.restart = msg.restart === undefined ? false : msg.restart;
		pauseGame(false);
		if (from === "TwoPlayersGameEnd" || from === "MainMenu" || msg.restart || from === "none") {
			levels = [ ];
			gameEngine = [ ];
			seconds	= false,
			stopCount = false,
			monkey = [ { row: 0, column: 0 }, { row: 0, column: 0 } ];
			tutorial.restart = msg.restart;
			createjs.Tween.removeAllTweens();
			var gameConfig = new GameConfig(msg.stageIndex, msg.levelIndex,2);
			levels.push(gameConfig.getCurrentLevel());
			levels[player1].coins = 0;
			levels[player1].arrows = new Arrows(player1);
			levels.push(gameConfig.getCurrentLevel());
			levels[player2].coins = 0;
			levels[player2].arrows = new Arrows(player2);
			gameEngine.push(new GameEngine());
			gameEngine[player1].canPress = true;
			gameEngine.push(new GameEngine());
			gameEngine[player2].canClick = true;
			element = gameEngine[player1].getElement();					
			$("<div>").load("app/htmls/TwoPlayersGameStart.html", function() {
				if (!$("#SceneTwoPlayersGameStart").length)
					$("#canvasdiv").prepend($(this).html());
			});			
			setTimeout(function(){
				player.play(sounds.stage_01_bg_sound,true);
				prepareCanvas();
				drawStage();
				restartCoconut(player1);
				restartCoconut(player2);
				Timer.draw();
				gameEngine[player1].start(levels[player1]);
				gameEngine[player2].start(levels[player2]);				
				// Language strings
				Scene.text = TwoPlayersGameStartText;
				Scene.text();				
				$("#canvasdiv").addClass("TwoPlayersGame");
				GameStartAnimations.in();				
			},100);
		}
		else {
			setTimeout(function(){
				Scene.keys = tutorial.isOpen() ? tutorial.keys : TwoPlayersGameStartKeys;
				Scene.keys();
				if (from === "GamePause") {
					if (seconds <= 0 || !seconds){
						seconds = false;
						finishGame("time");
					}
					else if (levels[player1].coins >= 8)
						finishGame(player1);
					else if (levels[player2].coins >= 8)
						finishGame(player2);
				}
			}, 100);
		}
	};
	/**
     * When occurs a transition and this state will be left.
	 * @param  {string} event Name of the event was fired.
	 * @param  {string} from Name of this state.
	 * @param  {string} to Name the next state.
	 * @param  {string} message Some messages for the next state.
	 */
	SceneManager.onleaveTwoPlayersGameStart = function (event, from, to, message) {
		message = message || { };
		message.clearCanvas = clearCanvas;
		pauseGame(true);
	};
	/**
     * Contains animations when this state is involved in transitions.
     * @typ {Object}
     */		
	var GameStartAnimations = {		
		in: function(){
			$("#canvasdiv").addClass("visible");			
			animation("#canvasdiv ", "fade-in", function(){			
				setTimeout(function(){
					if (tutorial.restart)
						GameStartAnimations.readyPopupIn();
					else
						tutorial.show();
				},500);				
			}, config.FADE_IN_DURATION, true);
		},		
		readyPopupIn: function(){		
			var popUpAnimation;			
			// Checks if the TV set is 2012 to add custom animation
			if (!$("body").hasClass("YEAR_2012")) {
				popUpAnimation = "ready-popup-in";
			} else {
				popUpAnimation = "ready-popup-in-2012";
			}			
			$("#ready-message").addClass("visible");
			animation("#ready-message", popUpAnimation, function() {				
				setTimeout(function(){
					GameStartAnimations.readyPopupChange();
				}, 1500);				
			}, 250);
		},		
		readyPopupChange: function(){		
			var popUpAnimation;			
			// Checks if the TV set is 2012 to add custom animation
			if (!$("body").hasClass("YEAR_2012")) {
				popUpAnimation = "ready-popup-change";
			} else {
				popUpAnimation = "ready-popup-change-2012";
			}		
			$("#ready-message .text-ready").html(text[LANGUAGE.current].go);
			animation("#ready-message", popUpAnimation, function() {
				setTimeout(function(){
					GameStartAnimations.readyPopupOut();
				},250);			
			}, 250);
		},		
		readyPopupOut: function(){		
			var popUpAnimation;			
			// Checks if the TV set is 2012 to add custom animation
			if (!$("body").hasClass("YEAR_2012")) {
				popUpAnimation = "ready-popup-out";
			} else {
				popUpAnimation = "ready-popup-out-2012";
			}		
			animation("#ready-message", popUpAnimation, function() {
				$("#ready-message").removeClass("visible");				
				initGame();				
			}, 250);
		}
	}
	/**
     * Bind the behavior for keydown in this state for the stages.
	 */
	function TwoPlayersGameStartKeys () {
		unbind_keys();
		$(document).keydown(function(e){
			switch (e.keyCode) {
				case tvKey.KEY_LEFT:
					if (gameEngine[player1].getState() == "move" && gameEngine[player1].canPress) {
						gameEngine[player1].canPress = false;
						var coconut = gameEngine[player1].moveCoconut("left");
						monkey[player1].column = coconut.currentPosition.column;
						drawMonkey(player1);
						levels[player1].arrows.draw();
						drawCoconut(coconut,player1);
					}
					break;
				case tvKey.KEY_UP:
					break;
				case tvKey.KEY_DOWN:
					break;
				case tvKey.KEY_RIGHT:
					if (gameEngine[player1].getState() == "move" && gameEngine[player1].canPress) {
						gameEngine[player1].canPress = false;
						var coconut = gameEngine[player1].moveCoconut("right");
						monkey[player1].column = coconut.currentPosition.column;
						drawMonkey(player1);
						levels[player1].arrows.draw();
						drawCoconut(coconut,player1);
					}
					break;
				case tvKey.KEY_ENTER:
					if (gameEngine[player1].getState() == "move" && gameEngine[player1].canPress) {
						gameEngine[player1].canPress = false;
						gameEngine[player1].throwCoconut();
						levels[player1].coconuts++;
						levels[player1].arrows.remove();
						drawCoconut(gameEngine[player1].step(),player1);
					}
					break;
				case tvKey.KEY_RETURN:
						SceneManager.TwoPlayersGameStartToTwoPlayersGamePause( { clearCanvas: clearCanvas } );
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
	function TwoPlayerGameClicks(){
		$("#SceneTwoPlayersGameStart #column-c1").click(function() {
			if (gameEngine[player2].canClick == true){
				gameEngine[player2].canClick = false;
				gameEngine[player2].moveTo = 0;
				moveMonkey(gameEngine[player2].moveTo);
			}
		});
		$("#SceneTwoPlayersGameStart #column-c2").click(function() {
			if (gameEngine[player2].canClick == true){
				gameEngine[player2].canClick = false;
				gameEngine[player2].moveTo = 2;
				moveMonkey(gameEngine[player2].moveTo);
			}
		});
		$("#SceneTwoPlayersGameStart #column-c3").click(function() {
			if (gameEngine[player2].canClick == true){
				gameEngine[player2].canClick = false;
				gameEngine[player2].moveTo = 4;
				moveMonkey(gameEngine[player2].moveTo);
			}
		});
		$("#SceneTwoPlayersGameStart #column-c4").click(function() {
			if (gameEngine[player2].canClick == true){
				gameEngine[player2].canClick = false;
				gameEngine[player2].moveTo = 6;
				moveMonkey(gameEngine[player2].moveTo);
			}
		});
		$("#SceneTwoPlayersGameStart #column-c5").click(function() {
			if (gameEngine[player2].canClick == true){
				gameEngine[player2].canClick = false;
				gameEngine[player2].moveTo = 8;
				moveMonkey(gameEngine[player2].moveTo);
			}
		});
	}
	/**
     * Set start values.
     */
	function initGame(){
		Scene.keys = TwoPlayersGameStartKeys;
		Scene.keys();
		TwoPlayerGameClicks();
		seconds = 99;
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
		createjs.Ticker.addEventListener("tick", tick);
	}
    /**
     * Draw the stage with its assets.
     */	
	function drawStage () {
		var x = y = 0, centerFixBranch = 12, centerFixSwitch = 3, offsetX = 50, offsetY = 0 ;//offsetX = 49, offsetY = 43 ;
		var coins = [ ];

		var name = "floorWood";
		var image = stage.getChildByName(name) || new createjs.Bitmap(imageArray.getItem(name).src);
		image.x = 0;
	    image.y = 620;
		image.name = name;
		if (!stage.getChildByName(name))
			stage.addChild(image);
		auxiliarX = [0,627]; // <-----
		for (var players = 0; players < levels.length; players++){
			y = 93;
			x = auxiliarX[players];
			levels[players].matrix.forEach(function(row,i) {
				row.forEach(function(column,j) {
					x += !j ? 0 : ((j+1)%2) ? 122 * (0.8) : 12 * (0.8); // <----- .8?
					var valueTranslate = column, wasCoin = false;
					if (column == 40)
						console.log();
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
						var name = element[""+valueTranslate] + i + j + players;
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
						image.scaleX = image.scaleY = 0.8;
						if (!stage.getChildByName(name))
							stage.addChild(image);
						if (wasCoin) {
							name = element[""+column] + i + j + players;
							image = stage.getChildByName(name) || new createjs.Sprite(spriteGenerator.getSprite("coin"));
							image.name = name;
							image.scaleX = image.scaleY = 0.8;
							if (column == element.vCoin) {
								image.x = xPosition - 37;
								image.y = yPosition - 20;
							}
							else if (column == element.hCoin) {
								image.x = xPosition + 11;
								image.y = yPosition - 37;
							}
							else if (column == element.floorCoin) {
								image.x = xPosition - 35;
								image.y = yPosition - 20;
							}
							if (!stage.getChildByName(name))
								coins.push(image);
						}
					}
				});
				y += 51 * (0.8);
				x = auxiliarX[players];;
			});
		}
		coins.forEach(function(coin) { stage.addChild(coin); coin.gotoAndPlay("idle")});
	}
    /**
     * Draws the different types of coconuts in the game.
     */	
	function drawCoconut (coconut,player,init) {		
		var name  = "coconut";
		var offsetX = [57,683];
		var offsetY = 71;
		var image = stage.getChildByName(name + player) || new createjs.Sprite(spriteGenerator.getSprite(name));
		image.name = name + player;
		image.scaleX = image.scaleY = 0.8;
		checkElements(coconut, player);		
		switch(coconut.state){
			case "move":
			case "normal":
				image.gotoAndStop("coconut");
			break;
			case "metal":
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
			var x = offsetGeneralX + offsetX[player] + (image.column * 67 * (0.8));
			if (init)
				image.x = x;
			else{
				var rotate = 360;
				if (coconut.flow == "left")
					rotate = -rotate;
				createjs.Tween.get(image).to({x: x, rotation: rotate}, 150).call(function(){image.x = x; image.rotation = 0; checkState(coconut.state,player); });
			}
		}
		if(image.row != coconut.currentPosition.row) {
			image.row = coconut.currentPosition.row;
			var y = image.row * (image.row == 1 ? 80 * (0.8) : 51 * (0.8));
			y = offsetGeneralY + offsetY + (image.row > 1 ?  (y+29) : y);
			if (init)
				image.y = y;
			else{
				var rotate = 360;
				if (coconut.flow == "up")
					rotate = -rotate;
				createjs.Tween.get(image).to({y: y, rotation: rotate }, 150).call(function(){image.y = y; image.rotation = 0; checkState(coconut.state,player); });
			}
		}
		if (!stage.getChildByName(name)){
			stage.addChild(image);
		}
		
	}
    /**
     * Checks game state.
     */
	function checkState (state, numPlayer) {
		if (state != "move" && state != "endGame") {
			drawCoconut(gameEngine[numPlayer].step(),numPlayer);
		}
		else if (state == "endGame") {
			var image = stage.getChildByName("coconut" + numPlayer);
			image.gotoAndPlay(image.currentAnimation +"broken");
			player.play(sounds.coconut_break);
			image.addEventListener("animationend", function(e) {
       			stage.removeChild(image);
				restartCoconut(numPlayer);
        	});
		}
	}
    /**
     * Restore coconut position to monkey.
     */
	function restartCoconut (player) {
		if (levels[player].coins >= 8) {
			finishGame(player);
		}
		else {
			gameEngine[player].restartCoconut(monkey[player].column);
			var coconut = {currentPosition: {row:0, column: monkey[player].column}, state: "move", flow: "down"};
			drawMonkey(player,"first");
			levels[player].arrows.draw("first");
			drawCoconut(coconut,player,"first");
			if (player == player2){
				gameEngine[player2].canClick = true;
			}
		}
	}
    /**
     * Draw monkey position.
     */	
	function drawMonkey (player,init) {		
		var name  = "monkey";
		var image = stage.getChildByName(name + player) || new createjs.Sprite(spriteGenerator.getSprite(name));
		image.name = name + player;
		image.scaleX = image.scaleY = 0.8;
		offsetX = [19, 646];
		var offsetY = 0 ;
		if(image.column != monkey[player].column) {
			image.column = monkey[player].column;
			image.y = offsetGeneralY + offsetY;
			var x = offsetGeneralX + offsetX[player] + (image.column * 67 * (0.8));
			if (init)
				image.x = x;
			else
				createjs.Tween.get(image).to({x: x}, 150).call(function() { 
					image.x = x; 
					if (player == player2){
						setTimeout(function(){
							moveMonkey(gameEngine[player2].moveTo);
						},150);
					}
					else
						gameEngine[player].canPress = true; 
				});
		}
		else
			gameEngine[player].canPress = true;
		if (!stage.getChildByName(name)){
			stage.addChild(image);
			image.gotoAndPlay("idle");
			if (player == player2){
				image.on("click", function(event) {
					if (event.nativeEvent.button == 0){
						if (gameEngine[player2].getState() == "move" && seconds != false) {
							levels[player2].arrows.remove();
							gameEngine[player2].throwCoconut();
							levels[player2].coconuts++;
							drawCoconut(gameEngine[player2].step(),player2);
						}
					}
				});
			}
			
		}
	}
	/**
     * Animate monkey displacement.
     */	
	function moveMonkey(column){
		if (monkey[player2].column == column){
			if (gameEngine[player2].canClick == false){
				levels[player2].arrows.remove();
				gameEngine[player2].throwCoconut();
				levels[player2].coconuts++;
				drawCoconut(gameEngine[player2].step(),player2);
				gameEngine[player2].canClick = false;
			}
		}
		else{
			if (monkey[player2].column < column){
				var coconut = gameEngine[player2].moveCoconut("right");
			}
			else if (monkey[player2].column > column){
				var coconut = gameEngine[player2].moveCoconut("left");
			}
			monkey[player2].column = coconut.currentPosition.column;
			drawMonkey(player2);
			levels[player2].arrows.draw();
			drawCoconut(coconut,player2);
		}
	}
    /**
     * Defines arrows behavior to know monkey's displacement.
     * @type {Object}
     */
	function Arrows(p) {
		var player = p;
        /**
         * Draw the arrows for monkey directions and label instructions.
         */
		function draw (init) {
			var offsetX = [23, 810], offsetY = 33 ;
			var name  = "arrowLeft" + player;
			var image = stage.getChildByName(name) || new createjs.Bitmap(imageArray.getItem("arrowMonkey").src);
			image.visible = true;
			image.name = name;
			image.scaleX = image.scaleY = 0.8;
			name  = "arrowRight" + player;
			image2 = stage.getChildByName(name) || new createjs.Bitmap(imageArray.getItem("arrowMonkey").src);
			image2.visible = true;
			image2.name = name;
			image2.scaleX = image2.scaleY = 0.8;
			image2.rotation = 180;
			if(image.column != monkey[player].column) {
				image.column = monkey[player].column;
				image.y = (offsetGeneralY + offsetY + 20) * (0.8);
				image2.y = (offsetGeneralY + offsetY + 41 - 20) * (0.8);
				var x = (offsetGeneralX + offsetX[player] + (image.column * 69)  + 15 - 40) * (0.8);
				var x2 = (offsetGeneralX + offsetX[player] + (image.column * 69) + 183 - 15 - 31) * (0.8);
				if (init) {
					image.x = x;
					image.regX = 15;
					image.regY = 27;
					animateArrow(image,5);
					image2.x = x2;
					image2.regX = 15;
					image2.regY = 27;
					animateArrow(image2,-5);
					if(player == player1) {
						$("#info-p" + (player+1)).removeClass("hide");
						$("#info-p" + (player+1)).css("left", getLeftInfo(x) + 'px');
					}
				}
				else {
					createjs.Tween.get(image,{override:true}).to({x: x}, 150).call(function() { image.x = x; animateArrow(image,5) });
					createjs.Tween.get(image2,{override:true}).to({x: x2}, 150).call(function() { image2.x = x2; animateArrow(image2,-5) });
					if(player == player1)
						$("#info-p" + (player+1)).css("left", getLeftInfo(x) + 'px');
				}
			}
			if (!stage.getChildByName(name))
				stage.addChild(image, image2);
			if (monkey[player].column < 1)
				stage.getChildByName(image.name).visible = false;
			if (monkey[player].column > 7)
				stage.getChildByName(image2.name).visible = false;
		}
        /**
         * Puts Info label with monkey controls.
         * @param {number} value Monkey position
         */
		function getLeftInfo (value) {
			var left = value;
			if (player == player1) {
				if (LANGUAGE.current == LANGUAGE.ENG)
					left = value <= 151 ? value+147 : value-187;
				else
					left = value <= 151 ? value+147 : value-233;
			}
			else if (player == player2) {
				if (LANGUAGE.current == LANGUAGE.ENG)
					left = value <= 780 ? value+147 : value-187;
				else
					left = value <= 891 ? value+147 : value-233;
			}
			return left;
		}
        /**
         * Remove an arrow if the monkey can not move right or left.
         */
		function remove () {
			var name  = "arrowLeft" + player;
			if (stage.getChildByName(name))
				stage.getChildByName(name).visible = false;
			name  = "arrowRight" + player;
			if (stage.getChildByName(name))
				stage.getChildByName(name).visible = false;

			$("#info-p" + (player+1)).addClass("hide");
		}
       /**
         * Moves arrows for the monkey.
         */
		function animateArrow (arrow, offset) {
			createjs.Tween.get(arrow,{loop:true})
			.to({x: arrow.x + offset},300)
			.to({x: arrow.x },300);
		}		
		return { draw: draw, remove: remove };
	}
    /**
     * Checks what kind of element colides with coconut.
     * @param {Object} coconut
     */	
	function checkElements (coconut, player) {
		switch (levels[player].matrix[coconut.currentPosition.row][coconut.currentPosition.column]) {
			case element.floorCoin:
					removeCoin(coconut.currentPosition.row, coconut.currentPosition.column, element.floor, player, coconut);
				break
			case element.vCoin:
					removeCoin(coconut.currentPosition.row, coconut.currentPosition.column, element.vBranch, player);
			break;
			case element.hCoin:
					removeCoin(coconut.currentPosition.row, coconut.currentPosition.column, element.hBranch, player);
			break;
			case element.thinBranch:
					removeBranch(coconut.currentPosition.row, coconut.currentPosition.column, element.empty, player);
			break;
		}
	}
	/**
     * Removes a captured coin.
	 * @param  {number} row Coin location.
	 * @param  {number} column Coin location.
	 * @param  {number} newNumber New value in the matrix.
	 */	
	function removeCoin (row, column, newNumber, player, coconut) {
		var name = element[""+levels[player].matrix[row][column]] + row + column + player;
		if (stage.getChildByName(name)) {
			levels[player].coins++;
			var direction = player ? 450 : 1;
			var table = player ? "scorebar-2p" : "scorebar-1p";
			createjs.Tween.get(stage.getChildByName(name)).wait(100).to({x:450,alpha:0}, 500).call(function(){
				stage.removeChild(stage.getChildByName(name));
				$("#"+table+" li:not(.show)").first().addClass('showCoinAnimation');
				setTimeout(function() { $("#"+table+" li.showCoinAnimation").addClass('show').removeClass("showCoinAnimation"); }, 250);
				addCoin(coconut.currentPosition.column,player);
			});
			levels[player].matrix[row][column] = newNumber;
		}
		

	}
	/**
     * Add a coin in random position for specific player.
     * @param {coconutColumn} Column.
     * @param {player} player Id of player.
     */
	function addCoin(coconutColumn,player){
		var row = 13;
		var columns = [0, 2, 4, 6, 8];
		columns.sort(function() {return 0.5 - Math.random()})
		
		for (i=0; i<columns.length; i++){
			if (levels[player].matrix[row][columns[i]] != element.floorCoin && columns[i] != coconutColumn){
				levels[player].matrix[row][columns[i]] = element.floorCoin;
				i = columns.length;			
			}
		}
		drawStage();
	}
	/**
     * Generates a random number into a range.
     * @param {number} min Value for the range.
     * @param {number} max Value for the range.
     */
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}
	/**
     * Removes a broken branch.
	 * @param  {number} row Where is located the branch.
	 * @param  {number} column Branch location.
	 * @param  {number} newNumber To delete branch from the matrix.
	 */	
	function removeBranch (row, column, newNumber, player) {
		var name = element[""+levels[player].matrix[row][column]] + row + column + player;
		var image = stage.getChildByName(name);
		if (image) {
			levels[player].matrix[row][column] = newNumber;
			createjs.Tween.get(image).wait(500).call(function(){image.gotoAndStop("breakBranch")});
		}
	}
	/**
     * Update the canvas for every tick.
	 * @param  {Object} event Createjs event.
	 */	
	function tick(event){
        if (!event.paused) {
            stage.update();
            Timer.update();
        }
	}
    /**
     * Manage the timer (clock) for the game.
     */
	var Timer = {
		draw: function () {
			var name = "timerWood";
			if (!stage.getChildByName(name)) {

				var image = new createjs.Bitmap(imageArray.getItem("timerWood").src);
				image.name = "timerWood";
				image.x = 588;
				image.y = 5;

				var txtTime = new createjs.Text(text[LANGUAGE.current].time.toUpperCase() , "27px Grobold", "#5f3a1c");
				txtTime.name = "timerText";
				txtTime.x = LANGUAGE.current == LANGUAGE.ENG ? 608 : 592;
				txtTime.y = 10;

				var txt = new createjs.Text("99" , "67px Grobold", "#FFFFFF");
				txt.name = "timerNumber";
				txt.x = 603;
				txt.y = 40;
				txt.shadow = new createjs.Shadow("#845a34", 0, 5, 0);
				stage.addChild(image, txtTime, txt);


			}
		},
		update: function () {
			var txt = stage.getChildByName("timerNumber");
			if (stopCount == false && seconds != false && seconds > 0 && txt){
				if (secondCounter++ >= Math.round(createjs.Ticker.getMeasuredFPS())){
					txt.text = addCero(--seconds);
					secondCounter = 0;
					if (seconds <= 0){
						seconds = false;
						finishGame("time");
					}
				}
			}
		}

	};
    /**
     * Determine who won.
     * @param {number} Player winner.
     */
	function finishGame (winner) {
		var msg = { winner: 0 };
		if (winner == player1 || winner == player2)
			msg.winner = winner + 1;
		else if (winner === "time") {
			if (levels[player1].coins > levels[player2].coins)
				msg.winner = 1;
			else if (levels[player1].coins < levels[player2].coins)
				msg.winner = 2;
		}
		SceneManager.TwoPlayersGameStartToTwoPlayersGameEnd( msg );
	}
    /**
     * Function to suspend game to support multitask on Tizen TVs.
     * @param  {boolean} suspend Game status.
     */
    function suspendGame(suspend) {        
        if(suspend && window.suspending) {
            window.suspending = false;
            clearTimeout(createjs.Ticker._timerId);
        } else if(window.resumming) {
            window.resumming = false;
            stopCount = true;
            createjs.Ticker._handleSynch();
            setTimeout(function() { stopCount = false},1500);
        }        
    }    
    /**
     * Send pause signal to tick.
     */    
	function pauseGame (val) {
        console.log(seconds);
		if (val === undefined)
			console.log("%c** pauseGame needs a param (true:false) **",'color:red');
		else {			
			createjs.Ticker.setPaused(val);            
            stopCount = val;
            suspendGame(val);
		}
	}
	/**
     * Clear canvas.
	 */
	function clearCanvas () {
		stage.removeAllChildren();
	}
	/**
     * Force a number to have two digits.
	 * @param  {number} x A number.
     * @return {string} Nuber with format 0X.
	 */
	function addCero (x) {
		x = x < 10 ? '0' + x : x;
		return x;
	}
	/**
     * Sets the label depending TV language.
	 * @param  {number} language_id
	 */		
	function TwoPlayersGameStartText(language_id){
		LANGUAGE.current = language_id || LANGUAGE.current;		
		$(".text-time").html(text[LANGUAGE.current].time);
		$(".text-ready").html(text[LANGUAGE.current].ready);
		$(".enter-info").html(text[LANGUAGE.current].info_press_enter);
		$("#info-p2 .enter-info").html(text[LANGUAGE.current].info_press_coconut);
		$(".arrow-info").html(text[LANGUAGE.current].info_press_arrows);
		$(".message-to-play").html(text[LANGUAGE.current].info_press_play);

	}
    /**
     * Close tutorial popup.
     */    
    function closeTutorial() {
        return tutorial.forceClose();
    }    
    /**
     * Tutorial popup.
     */
	var tutorial = (function(){
        /**Flag to know if tutorial is open */
		var open = false;
        /**Flag to know if tutorial has to restart */
		var restart = false;
        /**
         * Shows a tutorial.
         * @param {string} image Name of image for the stage.
         */
		function show () {
			if (LANGUAGE.current == LANGUAGE.ESP)
				$("#tutorial .title").css("background", "url(resources/images/game/tutorial/2P_tuto_controls_text_ES.png) center no-repeat");
			else
				$("#tutorial .title").css("background", "url(resources/images/game/tutorial/2P_tuto_controls_text_EN.png) center no-repeat");
			$("#tutorial .tutorial-size").css("background", "url(resources/images/game/tutorial/2P_tuto_controls.png) center no-repeat");
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
			unbind_keys();			
			setTimeout(function () {
				open = false;
				GameStartAnimations.readyPopupIn();
				$("#tutorial .tutorial-size").attr("class", "tutorial-size");
			},600);
		}
        /**
         * Forces the tutorial to close.
         */        
        function forceClose() {
            if(open == false) return;
			$("#tutorial").css("opacity",0);
            unbind_keys();
            open = false;
            $("#tutorial .tutorial-size").attr("class", "tutorial-size");         
            initGame();
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
			restart: restart,
            forceClose: forceClose
		}
	})();
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
