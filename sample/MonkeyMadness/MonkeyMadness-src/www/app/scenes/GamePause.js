/**Controller for GamePause state */
SceneManager.GamePause = (function() {
    /**
     * List manager for this menu.
     * @type {ListFocusManager}
     */	
    var gamePauseList = null;
    /**Reference to method to clear game canvas */
	var	clearCanvas;
    /**
     * Info of the current level (index, stage).
     * @type {Object}
     */
	var	levelInfo = { };
	/**
     * When the transition goes to this State, this will do initializations.
	 * @param  {string} event Name of the event was fired.
	 * @param  {string} from From which state came.
	 * @param  {string} to Name of the actual state.
	 * @param  {any} message Some data for the state.
	 */
	SceneManager.onGamePause = function (event, from, to, message) {
		$("<div>").load("app/htmls/GamePause.html", function() {
			if (!$("#SceneGamePause").length) {
				$("#canvasdiv").append($(this).html());
			}			
			gamePauseList = new ListFocusManager({
				id: "game-pause-list",
				infinite: true
			});			
			// Language strings
			Scene.text = GamePauseText;
			Scene.text();        
            Scene.keys = GamePauseKeys;
            Scene.keys();            
		});
		clearCanvas = message.clearCanvas;
		levelInfo.stageIndex = message.stageIndex;
		levelInfo.levelIndex = message.levelIndex;
	};
	/**
     * When occurs a transition and this state will be left.
	 * @param  {string} event Name of the event was fired.
	 * @param  {string} from Name of this state.
	 * @param  {string} to Name the next state.
	 * @param  {string} message Some messages for the next state.
	 */
	SceneManager.onleaveGamePause = function (event, from, to, msg) {
		if (to === "GameStart" && typeof msg !== "object") {
			$("#SceneGamePause").remove();
			SceneManager.transition();
		} else {
			GamePauseAnimations.out(SceneManager.transition)
		}
		
		return StateMachine.ASYNC;
	};
	/**
     * Contains animations when this state is involved in transitions.
     * @typ {Object}
     */		
	var GamePauseAnimations = {
		in: function(){
			$("#SceneGamePause").addClass("visible");
		},
		
		out: function(transition){
			animation("#canvasdiv", "fade-out", function(){
				player.stopAll();
				// player.stop(sounds.in_game);
				clearCanvas();
				$("#canvasdiv").attr("class", "scene");
				$("#canvasdiv > section").remove();
				transition();
			}, config.FADE_IN_DURATION);
		}
	}
	/**
     * Bind the behavior for keydown in this state for the stages.
	 */	
	function GamePauseKeys(){
		unbind_keys();
        $('li').click(function() {
            console.log($(this).index());
            gamePauseList.setIndex($(this).index());
            triggerKey(tvKey.KEY_ENTER);
        });
		$(document).keydown(function(e){
			switch (e.keyCode) {		
				case tvKey.KEY_EXIT:
				case tvKey.KEY_RETURN:
					player.play(sounds.select_option);
					SceneManager.GamePauseToGameStart();
					break;
				case tvKey.KEY_ENTER:
					player.play(sounds.select_option);
					switch(gamePauseList.getIndex()) {
						case 0:
							SceneManager.GamePauseToGameStart();
							break;
						case 1:
							SceneManager.GamePauseToGameStart({
								restart: true,
								stageIndex: levelInfo.stageIndex,
								levelIndex: levelInfo.levelIndex
							});
							break;
						case 2:
							SceneManager.BackToMainMenu();
							break;
					}
					break;
				case tvKey.KEY_UP:
					player.play(sounds.menu_move);
					gamePauseList.up();
					break;
				case tvKey.KEY_DOWN:
					player.play(sounds.menu_move);
					gamePauseList.down();
					break;
			}
		});
	}
	/**
     * Sets the label depending TV language.
	 * @param  {number} language_id
	 */
	function GamePauseText(language_id){
		LANGUAGE.current = language_id || LANGUAGE.current;
		$(".text-pause-title").html(text[LANGUAGE.current].pause_title);
		$(".text-continue").html(text[LANGUAGE.current].continue);
		$(".text-restart").html(text[LANGUAGE.current].restart);
		$(".text-main-menu").html(text[LANGUAGE.current].main_menu);

	}

})();