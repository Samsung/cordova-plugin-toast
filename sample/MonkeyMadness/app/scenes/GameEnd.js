/**Controller for GameEnd state */
SceneManager.GameEnd = (function () { 
    /**Transition time for popup fade */
	var POPUP_ANIMATION_DURATION = 500;
    /**For stars animation */
	var	STARS_IN_DELAY = 500;
    /**How long is gonna wait to show the score. */
	var	CALIFICATION_IN_DELAY = 1000;
    /**Delay to show the stars animation. */
	var	STAR_DELAY = 300;
    /**Transition time for score. */
	var	CALIFICATION_IN_DURATION = 250;
    /**
     * List manager for this menu.
     * @type {ListFocusManager}
     */
	var	gameEndList	= null;
    /**Method to clear game canvas */
	var	clearCanvas;
    /**Stars won. */
	var	stars;
    /**Stage index */
	var	stageIndex;
    /**Level index */
	var	levelIndex;
	/**
     * When the transition goes to this State, this will do initializations.
	 * @param  {string} event Name of the event was fired.
	 * @param  {string} from From which state came.
	 * @param  {string} to Name of the actual state.
	 * @param  {any} message Some data for the state.
	 */
	SceneManager.onGameEnd = function (event, from, to, msg) {		
		clearCanvas = msg.clearCanvas;
		stars = msg.stars;
		stageIndex = msg.stageIndex;
		levelIndex = msg.levelIndex;
		
		$("<div>").load("app/htmls/GameEnd.html", function() {
			if (!$("#SceneGameEnd").length) {
				$("#canvasdiv").append($(this).html());				
				gameEndList = new ListFocusManager({
					id: "score-menu",
					infinite: true
				});				
				$("#score-menu .focus").removeClass("focus");
			}			
			// Language strings
			Scene.text = GameEndText;
			Scene.text();
		});

		setTimeout(function(){
			GameEndAnimations.in();
		}, 100);
	};
	/**
     * When occurs a transition and this state will be left.
	 * @param  {string} event Name of the event was fired.
	 * @param  {string} from Name of this state.
	 * @param  {string} to Name the next state.
	 * @param  {string} message Some messages for the next state.
	 */
	SceneManager.onleaveGameEnd = function (event, from, to, msg) {
		GameEndAnimations.out(SceneManager.transition);		
		return StateMachine.ASYNC;
	};
	/**
     * Stop sounds on transition to ArcadeLevels.
	 * @param  {string} event Name of the event was fired.
	 * @param  {string} from Name of this state.
	 * @param  {string} to Name the next state.
	 * @param  {string} message Some messages for the next state.
	 */
	SceneManager.onBackToArcadeLevels = function (event, from, to, msg) {
		player.stopAll();
	};
	/**
     * Contains animations when this state is involved in transitions.
     * @typ {Object}
     */	
	var GameEndAnimations = {
		in: function(){
			$("#SceneGameEnd").addClass("visible");
			animation("#SceneGameEnd", "fade-in", function(){
				
				GameEndAnimations.popupIn();
			}, config.FADE_IN_DURATION);
		},		
		popupIn: function(){
			$("#score-popup").addClass("visible");
			
			// Checks if the TV set is 2012 to skip animation
			if (!$("body").hasClass("YEAR_2012")) {
				animation("#score-popup", "players-in", function(){
				
					setTimeout(function(){
					
						if (stars) {
							GameEndAnimations.starsIn(stars);
						} else {
							GameEndAnimations.calificationIn(stars);
						}
					}, STARS_IN_DELAY);
				
				}, POPUP_ANIMATION_DURATION);
			} else {
				setTimeout(function(){
					if (stars) {
						GameEndAnimations.starsIn(stars);
					} else {
						GameEndAnimations.calificationIn(stars);
					}
				}, STARS_IN_DELAY);
			
			}
		},		
		starsIn: function(stars){			
			var j = 1;
			var	i;
			var	starsAnimation;		
			// Checks if the TV set is 2012 to add custom animation
			if (!$("body").hasClass("YEAR_2012")) {
				starsAnimation = "star-obtain";
			} else {
				starsAnimation = "star-obtain-2012";
			}					
			for (i = 1; i <= stars; i++) {
				setTimeout(function(){
					player.play(sounds.star_sound);
					$(".star-" + j).addClass("visible");
					animation({
						id: 		".star-" + j + " > div",
						steps:		10,
						duration:	300,
						transitionClass: starsAnimation,
					});					
					if (j === stars) {
						setTimeout(function(){
							GameEndAnimations.calificationIn(stars);
						}, CALIFICATION_IN_DELAY);
					}					
					j++;					
				}, (i - 1) * STAR_DELAY);
			}
		},		
		calificationIn: function(stars){		
			var element = $("#calification");
			var	calificationAnimation;		
			switch(stars){
				case 0:
					element.addClass("failed");
					player.play(sounds.lose_game);
					break;
				case 1:
					element.addClass("good");
					break;
				case 2:
					element.addClass("great");
					break;
				case 3:
					element.addClass("perfect");
					break;
			}			
			// Checks if the TV set is 2012 to add custom animation
			if (!$("body").hasClass("YEAR_2012")) {
				calificationAnimation = "ready-popup-in";
			} else {
				calificationAnimation = "ready-popup-in-2012";
			}						
			element.addClass("visible");
			animation("#calification", calificationAnimation, function() {
				player.play(sounds.floor_break);
				setTimeout(function(){
					gameEndList.setIndex(0);					
					$(".palm-header-in").removeClass("palm-header-in");					
					Scene.keys = GameEndKeys;
					Scene.keys();
				}, 500);				
			}, CALIFICATION_IN_DURATION);
		},		
		out: function(transition){
			animation("#canvasdiv", "fade-out", function(){
				clearCanvas();
				$("#canvasdiv").attr("class", "scene");
				$("#canvasdiv > section").remove();
				transition();
			}, config.FADE_IN_DURATION);
		}
	};
	/**
     * Bind the behavior for keydown in this state for the stages.
	 */	
	function GameEndKeys () {
		unbind_keys();
        $('li').click(function() { 
            gameEndList.setIndex($(this).index());
            triggerKey(tvKey.KEY_ENTER);
        });
		$(document).keydown(function(e){
			switch (e.keyCode) {
				case tvKey.KEY_ENTER:
					player.play(sounds.select_option);
					switch(gameEndList.getIndex()){
						case 0:
							SceneManager.BackToArcadeLevels();
							break;
						case 1:
							SceneManager.GameEndToGameStart({
								restart: true,
								stageIndex: stageIndex,
								levelIndex: levelIndex
							});
							break;
					}
					break;
				case tvKey.KEY_RETURN:
					player.play(sounds.select_option);
					SceneManager.BackToArcadeLevels();
					break;
				case tvKey.KEY_EXIT:
					popupExit.show();
					break;
				case tvKey.KEY_UP:
					player.play(sounds.menu_move);
					gameEndList.up();
					break;
				case tvKey.KEY_DOWN:
					player.play(sounds.menu_move);
					gameEndList.down();
					break;
			}
		});

	}
	/**
     * Sets the label depending TV language.
	 * @param  {number} language_id
	 */
	function GameEndText (language_id) {
		LANGUAGE.current = language_id || LANGUAGE.current;		
		$(".text-next-level").html(text[LANGUAGE.current].next_level);
		$(".text-replay").html(text[LANGUAGE.current].replay);
		$(".text-level-menu").html(text[LANGUAGE.current].level_menu);
	}

})();