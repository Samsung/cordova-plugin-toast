/**
 * Utilities and configurator for tthe stages.
 * {Object}
 */
var StageConfig = (function () {
    /**
     * Object array for stages
     * @type {Array}
     */
	var stages = [ ];
    /**
     * Object array for two players stage.
     * @type {Array}
     */
	var stagesP2 = [ ];
    /**
     * Cookie manager instance.
     * @type {Cookie}
     */
	var cookie = false;
    /**
     * Initialize the cookie instance.
     */
	(function() {
		cookie = new Cookie("MonkeyMadness");
		if (!cookie.getValue("stages")) {
			cookie.addValue("stages", [ ]);
			cookie.save();
		}
	})();
	/**
     * Add a stage to the array and recover data from the cookie.
	 * @param  {Object} stage Stage of the scene.
	 */
	function addStage (stage) {
		modifyIndex(stage);
		stages.push(stage);
		var cookieStages = cookie.getValue("stages");
		if (!cookieStages[stages.length - 1]) {
			cookieStages[stages.length - 1] = { };
			cookieStages[stages.length - 1].levelsInfo = [ ];
			stages[stages.length - 1].levels.forEach(function(level,i) {
				cookieStages[stages.length - 1].levelsInfo[i] = { };
				cookieStages[stages.length - 1].levelsInfo[i].stars = 0;
				cookieStages[stages.length - 1].levelsInfo[i].status = (i === 0 && (stages.length - 1) === 0) ? "available" : "unavailable";
			});
			cookieStages[stages.length - 1].stageInfo = { };
			cookieStages[stages.length - 1].stageInfo.status = (stages.length - 1) === 0 ?  "available" : "unavailable"; 
		}
		if (!cookie.getValue("totalStars"))
			cookie.addValue("totalStars",0);
		cookie.addValue("stages", cookieStages);
		cookie.save();
	}
	/**
     * Modifies index property for an Stage.
	 * @param  {Object} stage Stage of the scene.
	 */
	function modifyIndex(stage) {
		stage.index = stages.length;
		stage.levels.forEach(function(level,i){
			level.index = i;
			level.stageIndex = stage.index;
			level.maxCoconuts = (level.bestCoconuts * 2) + 1;
			level.coconuts = level.maxCoconuts;
			level.coins = 3;
			if (!level.neededStars) {
				level.neededStars = (level.index * 2) + (stage.index * 10);
				level.neededStars += stage.index > 0 ? (15 * stage.index) : 0;
			}
		});
	}

	function addStageP2 (stage) {
		stagesP2.push(stage);
	}

	function getStage (index, p) {
		return p ? randomize(stagesP2[index]) : stages[index];
	}

	function getTotalStages(){
		return stages.length;
	}	
	/**
     * Provides the status for a specific stage and level.
	 * @param  {number} indexStage Index of the current stage.
	 * @param  {number} indexLevel Index of the current level.
     * @return {string} Level info status. 
	 */
	function getLevelInfo (indexStage, indexLevel) {
		var cookieStages = cookie.getValue("stages");
		cookieStages[indexStage].levelsInfo[indexLevel].neededStars = stages[indexStage].levels[indexLevel].neededStars;
		return cookieStages[indexStage].levelsInfo[indexLevel];
	}
	/**
     * Change the status of specific stage and level.
	 * @param  {number} indexStage Index of the current stage.
	 * @param  {number} indexLevel Index of the current level.
	 */
	function updateLevelStatus (indexStage, indexLevel) {
		var totalStars = cookie.getValue("totalStars");
		var cookieStages = cookie.getValue("stages");
		for(var index = indexLevel; index < stages[indexStage].levels.length; index++ ) {
			if (stages[indexStage].levels[index].neededStars <= totalStars)
				if (cookieStages[indexStage].levelsInfo[index].status !== "available")
					setLevelStatus(indexStage, index, "new");
				else
					continue;
			else
				break;
		}
		updateStageStatus(indexStage+1);
	}
	/**
     * Set the total amount of stars in a stage.
	 * @param  {number} indexStage Index of the current stage.
	 * @param  {number} indexLevel Index of the current level.
	 * @param  {number} stars Amount of the stars for the level.
	 */
	function setLevelStars (indexStage, indexLevel, stars) {
		var cookieStages = cookie.getValue("stages");
		if (cookieStages[indexStage].levelsInfo[indexLevel].stars) {
			if(cookieStages[indexStage].levelsInfo[indexLevel].stars < stars) {
				var dif = stars - cookieStages[indexStage].levelsInfo[indexLevel].stars;
				updateTotalStars(dif);
				updateLevelStatus(indexStage, indexLevel);
				cookieStages[indexStage].levelsInfo[indexLevel].stars = stars;
			}
		}
		else {
			cookieStages[indexStage].levelsInfo[indexLevel].stars = stars;
			updateTotalStars(stars);
			updateLevelStatus(indexStage, indexLevel);
		}
		cookie.addValue("stages", cookieStages);
		cookie.save();
	}
	/**
     * Set the status of specific stage and level.
	 * @param  {number} indexStage Index of the current stage.
	 * @param  {number} indexLevel Index of the current level.
     * @param  {string} status New status.
	 */	
	function setLevelStatus (indexStage, indexLevel, status) {		
		var cookieStages = cookie.getValue("stages");
		cookieStages[indexStage].levelsInfo[indexLevel].status = status;
		cookie.addValue("stages", cookieStages);
		cookie.save();
	}
	/**
     * Provides the status for a specific stage.
	 * @param  {number} indexStage Index of the current stage.
     * @return {string} Stage info status. 
	 */	
	function getStageInfo (indexStage) {
		var cookieStages = cookie.getValue("stages");
		return cookieStages[indexStage].stageInfo;
	}
	/**
     * Update the status for a specific stage.
	 * @param  {number} indexStage Index of the stage.
	 */
	function updateStageStatus (indexStage) {
		var totalStars = cookie.getValue("totalStars");
		for(var index = indexStage; index < stages.length; index++ ) {
			if (stages[index].levels[0].neededStars <= totalStars) {
				setStageStatus(index, "available");
				updateLevelStatus(index,0);
			}
			else
				break;
		}
	}	
	/**
     * Set a status for a specific stage.
	 * @param  {number} indexStage Index of the stage.
	 * @param  {string} status New status.
	 */
	function setStageStatus (indexStage, status) {
		var cookieStages = cookie.getValue("stages");
		cookieStages[indexStage].stageInfo.status = status;
		cookie.addValue("stages", cookieStages);
		cookie.save();
	}
	/**
     * Update the amount of stars plus the parameter in current level.
	 * @param  {number} number Total amount of stars.
     * @return {numer} new stars number.
	 */
	function updateTotalStars (number) {
		var totalStars = cookie.getValue("totalStars");
		totalStars += number;
		cookie.addValue("totalStars", totalStars);
		cookie.save();
		return totalStars;
	}
	/**
     * Provides total number of stars available on current level.
     * @return {number} Total amount of stars for current level.
	 */
	function getTotalStars () {
		var totalStars = cookie.getValue("totalStars");
		return totalStars;
	}	
	/**
     * Build a stage fo two players scene.
	 * @param  {Object} stageP2 Current stage.
     * @return {Object} New stage.
	 */
	function randomize(stageP2){
		var copy = jQuery.extend(true, {}, stageP2);
		var matrix = copy.levels[0].matrix;
		var numberofBranches = 0;
		var hBranch = 11;
		var floorCoin = 23
		var empty = 0;
		var floor = 40;
		numberofBranches = getRandomInt(10,15);
		var numberofCoins = 2;
		for (var i=0; i<numberofBranches; i++){
			var row = getRandomInt(1,12);
			var column = getRandomInt(0,4) * 2 + 1;
			if (matrix[row][column] == empty)
				if ((matrix[row][column-2] == empty || column == 1) && (matrix[row][column+2] == empty || column == 7))
					matrix[row][column] = hBranch;
			else 
				i--;
		}
		for (var i=0; i<numberofCoins; i++){
			var row = 13
			var column = getRandomInt(0,5) * 2;
			if (matrix[row][column] == floor)
				matrix[row][column] = floorCoin;
			else 
				i--;
		}
		return copy;
	}	
	/**
     * Generates a random number into a range.
	 * @param  {any} min Min value for the random number.
	 * @param  {any} max Limit for the random number.
     * @return {number} Integer number.
	 */
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	return {
		addStage: 		addStage,
		addStageP2: 	addStageP2,
		getTotalStages: getTotalStages,
		getStage: 		getStage,
		getLevelInfo:	getLevelInfo,
		setLevelStars:	setLevelStars,
		setLevelStatus:	setLevelStatus,
		getStageInfo:	getStageInfo,
		setStageStatus:	setStageStatus,
		getTotalStars: getTotalStars
	}
	
})();