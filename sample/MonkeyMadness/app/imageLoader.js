/**
 * Load images resources of the game
 * {Object}
 */
var imageArray = (function () {
    /**
     * Contains an array of images to be loaded for the game.
     * @type {Array}
     */
	var array = [
		{src:"resources/images/game/pillar_piece.png", id:"vBranch"},
		{src:"resources/images/game/pillar_top_piece.png", id:"topBranch"},
		{src:"resources/images/game/track_line.png", id:"hBranch"},
		{src:"resources/images/game/track_up_anim.png", id:"upBranch"},
		{src:"resources/images/game/track_metal.png", id:"sSwitch"},
		{src:"resources/images/game/track_green.png", id:"gSwitch"},
		{src:"resources/images/game/track_red.png", id:"rSwitch"},
		{src:"resources/images/game/track_line_red.png", id:"rBranch"},
		{src:"resources/images/game/track_line_green.png", id:"gBranch"},
		{src:"resources/images/game/track_weak.png", id:"thinBranch"},
		{src:"resources/images/game/track_weak_break.png", id:"breakBranch"},
		{src:"resources/images/game/coconut.png", id:"coconut"},
		{src:"resources/images/game/broken_coconut.png", id:"coconutBroken"},
		{src:"resources/images/game/coconut_red.png", id:"rCoconut"},
		{src:"resources/images/game/broken_coconut_red.png", id:"rCoconutBroken"},
		{src:"resources/images/game/coconut_green.png", id:"gCoconut"},
		{src:"resources/images/game/broken_coconut_green.png", id:"gCoconutBroken"},
		{src:"resources/images/game/broken_coconut_silver.png", id:"sCoconutBroken"},
		{src:"resources/images/game/coconut_metal.png", id:"sCoconut"},
		{src:"resources/images/game/floor.png", id:"floor"},
		{src:"resources/images/game/floorWood.png", id:"floorWood"},
		{src:"resources/images/game/coin_anim.png", id:"coin"},
		{src:"resources/images/game/monkey_cursor_anim.png", id:"gameMonkey"},
		{src:"resources/images/game/arrowGame.png", id:"arrowMonkey"},
		{src:"resources/images/game/time_center.png", id:"timerWood"}

	];
	/**
     * This load the images of the game.
	 */
	function load () {
		var x = new createjs.LoadQueue();
		x.loadManifest(array);
		imageArray = x;
		spriteGenerator.load();
	}

	return { load: load };
})();