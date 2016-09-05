/**
 * Class with game config.
 * @param  {number} initStage Number of stage.
 * @param  {number} initLevel Number of level.
 * @param  {any} player
 */
function GameConfig (initStage, initLevel, player) {
    
	var currentStage = 0;
	var currentLevel = 0;
	var stage = false;
	/**
	 * @constructor
	 */
	(function () {
		currentStage = initStage;
		currentLevel = initLevel;
		stage = StageConfig.getStage(currentStage,player);
	})(stage, currentStage, currentLevel, initStage, initLevel);	

	this.getStage = function () {
		return stage;
	}

	this.getCurrentLevel = function () {
		return jQuery.extend(true, {}, stage.levels[currentLevel]);
	}

	this.changeLevel = function (level) {
		currentLevel = level;
	}

	this.changeStage = function (index) {
		currentStage = index;
		stage = StageConfig.getStage(currentStage);
	}	
}