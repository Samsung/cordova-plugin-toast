/**
 * Class with the main logic.
 * @constructor
 */
function GameEngine() {
	/**
     * Properties of current level.
     * @type {Object}
     */
	var currentLevel = false;
    /**
     * Representation of coconut in the game.
     * @type {Object}
     */
	var coconut = {currentPosition: {row:0, column:0}, state: "normal", flow: "down"};
    /**
     * Flag to know if coconut has to change its flow.
     * @type {boolean}
     */
	var changeFlowNow = false;
    /**
     * Flag to know if coconut is gonna change its flow.
     * @type {boolean}
     */
    var changeFlowNextTurn = false;
    /**
     * Flag to know if coconut has to change its state (red, green, solid).
     * @type {boolean}
     */
	var changeStateNow = false;
    /**
     * Flag to know if coconut is gonna change its state.
     * @type {boolean}
     */
    var changeStateNextTurn = false;
    /**
     * Flag to know if stage of the matrix has to change.
     * @typ {boolean}
     */
	var changeMatrixNow = false;
    /**
     * Flag to know if stage of the matrix is gonna change.
     * @typ {boolean}
     */    
    var changeMatrixNextTurn = false;
    /**
     * Flag to know if matrix's position has to change.
     * @typ {boolean}
     */    
    var changeMatrixPosition = false;	
    /**
     * Here are all elements of the game to be manipulated.
     * @type {Object}
     */
	var element = {
		empty: 0, "0": "empty",
		vBranch: 10, "10": "vBranch",
		hBranch: 11, "11": "hBranch",
		topBranch: 12, "12": "topBranch",
		thinBranch: 13, "13": "thinBranch",
		breakBranch: 132, "132": "breakBranch",
		upBranch: 14, "14": "upBranch",
		rBranch: 15, "15": "rBranch",
		gBranch: 16, "16": "gBranch",
		sSwitch: 17, "17": "sSwitch",
		rSwitch: 18, "18" : "rSwitch",
		gSwitch: 19, "19" : "gSwitch",
		coin: 20, "20": "coin",
		vCoin: 21, "21": "vCoin",
		hCoin: 22, "22": "hCoin",
		floorCoin: 23, "23" : "floorCoin",
		coconut: 30, "30": "coconut",
		rCoconut: 31, "31": "rCoconut",
		gCoconut: 32, "32": "gCoconut",
		sCoconut: 33, "33": "sCoconut",
		floor: 40, "40" : "floor",
	};
	/**
     * Initialize flags and set the level.
	 * @param  {Object} Properties of the current level.
	 */
	function start(level) {
		currentLevel = level;
		coconut = {currentPosition: {row:0, column:0}, state: "move", flow: "down"};
		changeFlowNow = false; changeFlowNextTurn = false;
		changeStateNow = false; changeStateNextTurn = false;
		changeMatrixNow = false; changeMatrixNextTurn = false; changeMatrixPosition = false;
	};
	
	function getElement(){
		return element;
	}
	
	function getState(){
		return coconut.state;
	}	
	/**
     * Update coconuts count and play the sound effect.
	 */
	function throwCoconut(){
		coconut.state = "normal";
		currentLevel.coconuts--;
		player.play(sounds.coconut_release);
	};	
	/**
     * Get back the coconut to original position (in the hands of the monkey).
	 * @param  {number} column Column position of the monkey.
	 */
	function restartCoconut(column){
		coconut = {currentPosition: {row:0, column:column}, state: "move", flow: "down"};
	};	
	/**
     * Calculate direction and position to move the coconut.
	 * @param  {string} direction Direction (left or right).
	 */
	function moveCoconut(direction){
		if (coconut.state == "move"){
			if (direction == "right" && coconut.currentPosition.column < currentLevel.matrix[0].length - 1){
				player.play(sounds.monkey_move);
				coconut.currentPosition.column += 2;
			}
			else if (direction == "left" && coconut.currentPosition.column > 0){
				player.play(sounds.monkey_move);
				coconut.currentPosition.column -= 2;
			}	
		}
		return coconut;
	};
	/**
     * Game logic for coconut behavior when is dropped by the monkey.
	 */
	function step(){
		if (coconut.state != "endGame"){
			if (changeStateNow){
				coconut.state = changeStateNow;
				changeStateNow = false;
			}
			if (changeFlowNow){
				coconut.flow = changeFlowNow;
				changeFlowNow = false;
			}
			else if (coconut.state != "metal"){
				//check for elements on top, bottom, left, and right and change coconut.flow
				//left
				if (coconut.currentPosition.column > 0 && 
                        currentLevel.matrix[coconut.currentPosition.row][coconut.currentPosition.column - 1] != element.empty && coconut.flow != "right"){
					switch(coconut.state){
						case "normal":
							if (currentLevel.matrix[coconut.currentPosition.row][coconut.currentPosition.column - 1] != element.vBranch && 
                                    currentLevel.matrix[coconut.currentPosition.row][coconut.currentPosition.column - 1] != element.rBranch && 
                                        currentLevel.matrix[coconut.currentPosition.row][coconut.currentPosition.column - 1] != element.gBranch)
								coconut.flow = "left";
						break;
						case "red":
							if (currentLevel.matrix[coconut.currentPosition.row][coconut.currentPosition.column - 1] != element.vBranch && 
                                    currentLevel.matrix[coconut.currentPosition.row][coconut.currentPosition.column - 1] != element.gBranch)
								coconut.flow = "left";
						break;
						case "green":
							if (currentLevel.matrix[coconut.currentPosition.row][coconut.currentPosition.column - 1] != element.vBranch && 
                                    currentLevel.matrix[coconut.currentPosition.row][coconut.currentPosition.column - 1] != element.rBranch)
								coconut.flow = "left";
						break;
					}
					
				}
				//right
				else if (coconut.currentPosition.column < currentLevel.matrix[0].length - 1 && 
                            currentLevel.matrix[coconut.currentPosition.row][coconut.currentPosition.column + 1] != element.empty && coconut.flow != "left"){
					switch(coconut.state){
						case "normal":
							if (currentLevel.matrix[coconut.currentPosition.row][coconut.currentPosition.column + 1] != element.vBranch && 
                                    currentLevel.matrix[coconut.currentPosition.row][coconut.currentPosition.column + 1] != element.rBranch && 
                                        currentLevel.matrix[coconut.currentPosition.row][coconut.currentPosition.column + 1] != element.gBranch)
								coconut.flow = "right";
						break;
						case "red":
							if (currentLevel.matrix[coconut.currentPosition.row][coconut.currentPosition.column + 1] != element.vBranch && 
                                    currentLevel.matrix[coconut.currentPosition.row][coconut.currentPosition.column + 1] != element.gBranch)
								coconut.flow = "right";
						break;
						case "green":
							if (currentLevel.matrix[coconut.currentPosition.row][coconut.currentPosition.column + 1] != element.vBranch && 
                                    currentLevel.matrix[coconut.currentPosition.row][coconut.currentPosition.column + 1] != element.rBranch)
								coconut.flow = "right";
						break;
					}
				} 
				//bottom
				else if (coconut.currentPosition.row < currentLevel.matrix.length - 1 && 
                            currentLevel.matrix[coconut.currentPosition.row + 1][coconut.currentPosition.column] != element.empty && coconut.flow != "up"){
					if (currentLevel.matrix[coconut.currentPosition.row + 1][coconut.currentPosition.column] != element.hBranch)
						coconut.flow = "down";
				}
				//top
				else if (coconut.currentPosition.row > 0 && 
                            currentLevel.matrix[coconut.currentPosition.row - 1][coconut.currentPosition.column] != element.empty && coconut.flow != "down"){
					if (currentLevel.matrix[coconut.currentPosition.row - 1][coconut.currentPosition.column] != element.hBranch) {
						coconut.flow = "up";
					}
				}
			}
			//move coconut
			switch (coconut.flow){
				case "down":
					coconut.currentPosition.row++;
				break;
				case "up":
					coconut.currentPosition.row--;
				break;
				case "left":
					coconut.currentPosition.column--;
				break;
				case "right":
					coconut.currentPosition.column++;
				break;
			}
			if (changeFlowNextTurn){
				changeFlowNow = changeFlowNextTurn;
				changeFlowNextTurn = false;
			}
			
			if (changeStateNextTurn){
				changeStateNow = changeStateNextTurn;
				changeStateNextTurn = false;
			}

			//check for current position
			if (coconut.currentPosition.row >= 0 && coconut.currentPosition.row <= currentLevel.matrix.length - 1 && 
                    coconut.currentPosition.column >= 0 && coconut.currentPosition.column <= currentLevel.matrix[0].length - 1)
                switch(currentLevel.matrix[coconut.currentPosition.row][coconut.currentPosition.column]){
                    case element.vCoin:
                    case element.hCoin:
                        player.play(sounds.coin);
                    break;
                    case element.upBranch:
                        player.play(sounds.up_element);
                        changeFlowNextTurn = "up";
                    break;
                    case element.floorCoin:
                        player.play(sounds.coin);
                    case element.floor:
                        coconut.state = "endGame";
                    break;
                    case element.sSwitch:
                        player.play(sounds.metal_ball);
                        changeStateNow = "metal";
                        changeFlowNextTurn = "down";
                    break;
                    case element.rSwitch:
                        player.play(sounds.coconut_color);
                        changeStateNow = "red";
                    break;
                    case element.gSwitch:
                        player.play(sounds.coconut_color);
                        changeStateNow = "green";
                    break;
                }
		}
		return coconut;
	};
	
	return {
		start: start,
		throwCoconut: throwCoconut,
		moveCoconut: moveCoconut,
		getElement: getElement,
		step: step,
		getState: getState,
		restartCoconut: restartCoconut
	}
}