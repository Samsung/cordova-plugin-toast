/**Controller for this state */
SceneManager.TwoPlayersGameEnd = (function(){
    /**Time of an animation */
	var RESULT_ANIM_DUR		= 500;
    /**Delay for animations */
	var	MENUIN_DELAY		= 500;
    /**Flag for draw */
	var	isDraw				= false;
    /**
     * List manager for this menu.
     * @type {ListFocusManager}
     */    
	var	twoPlayersEndMenu	= null;
    /**Method to clear game canvas */        
	var	clearCanvas;
	/**
     * When the transition goes to this State, this will do initializations.
	 * @param  {string} event Name of the event was fired.
	 * @param  {string} from From which state came.
	 * @param  {string} to Name of the actual state.
	 * @param  {any} message Some data for the state.
	 */
	SceneManager.onTwoPlayersGameEnd = function (event, from, to, msg) {		
		clearCanvas = msg.clearCanvas;		
		$("<div>").load("app/htmls/TwoPlayersGameEnd.html", function() {
			if (!$("#SceneTwoPlayersGameEnd").length) {
				$("#canvasdiv").append($(this).html());
			}			
			// Language strings
			Scene.text = TwoPlayersGameEndText;
			Scene.text();			
			twoPlayersEndMenu = new ListFocusManager({
				id: "two-players-end-menu",
				infinite: true
			});
		});		
		setTimeout(function(){
			if (msg.winner !== 0) {
				$("#player-results .player-" + msg.winner).addClass("winner");
				isDraw = false;
			} else {
				isDraw = true;
			}		
			TwoPlayersGameEndAnimations.in();
		}, 100);
	};
	/**
     * Stop sounds on transition to ArcadeLevels.
	 * @param  {string} event Name of the event was fired.
	 * @param  {string} from Name of this state.
	 * @param  {string} to Name the next state.
	 * @param  {string} message Some messages for the next state.
	 */
	SceneManager.onleaveTwoPlayersGameEnd = function (event, from, to, message) {
		TwoPlayersGameEndAnimations.out(SceneManager.transition);
		
		return StateMachine.ASYNC;
	};
	/**
     * Contains animations when this state is involved in transitions.
     * @typ {Object}
     */		
	var TwoPlayersGameEndAnimations = {
		in: function(){
			$("#SceneTwoPlayersGameEnd").addClass("visible");
			animation("#SceneTwoPlayersGameEnd", "fade-in", function(){
				TwoPlayersGameEndAnimations.playersIn();
			}, config.FADE_IN_DURATION);
		},		
		playersIn: function(){
			$("#player-results").addClass("visible");
			animation("#player-results", "players-in", function(){
				setTimeout(function(){					
					if (isDraw) {
						TwoPlayersGameEndAnimations.drawIn();
					} else {
						TwoPlayersGameEndAnimations.menuIn();
					}
				}, MENUIN_DELAY);
			}, RESULT_ANIM_DUR);
		},		
		menuIn: function(){		
			$("#two-players-end-menu").addClass("visible");
			animation("#two-players-end-menu", "fade-in-from-bottom", function(){
				Scene.keys = TwoPlayersGameEndKeys;
				Scene.keys();
			}, RESULT_ANIM_DUR);
		},		
		drawIn: function(){
			$("#draw-banner").addClass("visible");
			animation("#draw-banner", "ready-popup-in", function(){
				setTimeout(function(){
					TwoPlayersGameEndAnimations.menuIn();
				}, MENUIN_DELAY);
			}, RESULT_ANIM_DUR);
		},		
		out: function(transition){
			animation("#canvasdiv", "fade-out", function(){
				player.stopAll();
				clearCanvas();
				$("#canvasdiv").removeClass("TwoPlayersGame").removeClass("visible");
				$("#canvasdiv > section").remove();
				transition();
			}, config.FADE_IN_DURATION);
		}
	}
	/**
     * Bind the behavior for keydown in this state for the stages.
	 */	
	function TwoPlayersGameEndKeys(){ 
		unbind_keys();
        $('li').click(function() {
            twoPlayersEndMenu.setIndex($(this).index());
            triggerKey(tvKey.KEY_ENTER);
        });
		$(document).keydown(function(e){
			switch (e.keyCode) {
				case tvKey.KEY_UP:
					twoPlayersEndMenu.up();
					break;
				case tvKey.KEY_DOWN:
					twoPlayersEndMenu.down();
					break;
				case tvKey.KEY_ENTER:
					switch(twoPlayersEndMenu.getIndex()){
						case 0:
							SceneManager.TwoPlayersGameEndToTwoPlayersGameStart();
							break;
						case 1:
							SceneManager.BackToMainMenu();
							break;
					}
					break;
				case tvKey.KEY_RETURN:
					SceneManager.BackToMainMenu();
					break;
				case tvKey.KEY_EXIT:
					popupExit.show();
					break;
			}
		});
	}
	/**
     * Sets the label depending TV language.
	 * @param  {number} language_id
	 */
	function TwoPlayersGameEndText (language_id) {
		LANGUAGE.current = language_id || LANGUAGE.current;		
		$(".text-play-again").html(text[LANGUAGE.current].play_again);
		$(".text-main-menu").html(text[LANGUAGE.current].main_menu);
	}
})();