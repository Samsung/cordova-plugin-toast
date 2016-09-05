/**Controller for this state */
SceneManager.TwoPlayersGamePause = (function() {
    /**
     * List manager for this menu.
     * @type {ListFocusManager}
     */
	var twoGamePauseList = null;
    /**Method reference to clear game canvas */
	var	clearCanvas;
	/**
     * When the transition goes to this State, this will do initializations.
	 * @param  {string} event Name of the event was fired.
	 * @param  {string} from From which state came.
	 * @param  {string} to Name of the actual state.
	 * @param  {any} message Some data for the state.
	 */
	SceneManager.onTwoPlayersGamePause = function (event, from, to, message) {
		$("<div>").load("app/htmls/TwoPlayersGamePause.html", function() {
			if (!$("#SceneTwoPlayersGamePause").length) {
				$("#canvasdiv").append($(this).html());
			}			
			twoGamePauseList = new ListFocusManager({
				id: "two-game-pause-list",
				infinite: true
			});			
			// Language strings
			Scene.text = TwoPlayersGamePauseText;
			Scene.text();            
            Scene.keys = TwoPlayersGamePauseKeys;
            Scene.keys();            
		});
		clearCanvas = message.clearCanvas;

	};
	/**
     * When occurs a transition and this state will be left.
	 * @param  {string} event Name of the event was fired.
	 * @param  {string} from Name of this state.
	 * @param  {string} to Name the next state.
	 * @param  {string} message Some messages for the next state.
	 */
	SceneManager.onleaveTwoPlayersGamePause = function (event, from, to, msg) {
		if (to === "TwoPlayersGameStart" && typeof msg !== "object") {
			$("#SceneTwoPlayersGamePause").remove();
			SceneManager.transition();
		} else {
			TwoPlayersGamePauseAnimations.out(SceneManager.transition)
		}
		return StateMachine.ASYNC;
	};
	/**
     * Contains animations when this state is involved in transitions.
     * @typ {Object}
     */	
	var TwoPlayersGamePauseAnimations = {
		in: function(){
			$("#SceneTwoPlayersGamePause").addClass("visible");
		},		
		out: function(transition){
			animation("#canvasdiv", "fade-out", function(){
				player.stopAll();
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
	function TwoPlayersGamePauseKeys () {
		unbind_keys();
        $('li').click(function() { 
            twoGamePauseList.setIndex($(this).index());
            triggerKey(tvKey.KEY_ENTER);
        });
		$(document).keydown(function(e){
			switch (e.keyCode) {			
				case tvKey.KEY_EXIT:
				case tvKey.KEY_RETURN:
					player.play(sounds.select_option);
					SceneManager.TwoPlayersGamePauseToTwoPlayersGameStart();
					break;
				case tvKey.KEY_ENTER:
					player.play(sounds.select_option);
					switch(twoGamePauseList.getIndex()) {
						case 0:
							SceneManager.TwoPlayersGamePauseToTwoPlayersGameStart();
							break;
						case 1:
							SceneManager.TwoPlayersGamePauseToTwoPlayersGameStart({
								restart: true,
								stageIndex: 0,
								levelIndex: 0
							});
							break;
						case 2:
							SceneManager.BackToMainMenu();
							break;
					}
					break;
				case tvKey.KEY_UP:	
					player.play(sounds.menu_move);
					twoGamePauseList.up();
					break;
				case tvKey.KEY_DOWN:
					player.play(sounds.menu_move);
					twoGamePauseList.down();
					break;
			}
		});
	}
	/**
     * Sets the label depending TV language.
	 * @param  {number} language_id
	 */
	function TwoPlayersGamePauseText (language_id) {
		LANGUAGE.current = language_id || LANGUAGE.current;	
		$(".text-pause-title").html(text[LANGUAGE.current].pause_title);
		$(".text-continue").html(text[LANGUAGE.current].continue);
		$(".text-restart").html(text[LANGUAGE.current].restart);
		$(".text-main-menu").html(text[LANGUAGE.current].main_menu);
	}
})();