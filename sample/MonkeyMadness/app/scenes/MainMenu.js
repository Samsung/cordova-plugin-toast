/**Controller for MainMenu state */
SceneManager.MainMenu = (function () {
	var MENU_IN_DURATION = 250;
	var	DELAY_BETWEEN_LIST = 150;
	var	BETWEEN_LIST_EASE = "ease-in-out";
    /**
     * List manager for this menu.
     * @type {ListFocusManager}
     */    
	var	optionsList	= null;
    /**Properties to get the secret game. */
	var	EasterEgg = {code: [tvKey.KEY_UP, tvKey.KEY_UP, 
                            tvKey.KEY_DOWN, tvKey.KEY_DOWN, 
                            tvKey.KEY_LEFT, tvKey.KEY_RIGHT, 
                            tvKey.KEY_LEFT, tvKey.KEY_RIGHT, tvKey.KEY_ENTER],
                    index: 0};
	/**
     * When the transition goes to this State, this will do initializations.
	 * @param  {string} event Name of the event was fired.
	 * @param  {string} from From which state came.
	 * @param  {string} to Name of the actual state.
	 * @param  {any} message Some data for the state.
	 */
	SceneManager.onMainMenu = function (event, from, to, message) {		
		EasterEgg.index = 0;		
		$("#stage-selector-right-arrow, #stage-selector-left-arrow").attr("style","");		
		if (from !== "ArcadeLevels" && from !== "EasterEgg") {		
			$("<div>").load("app/htmls/MainMenu.html", function() {
				if (!$("#SceneMainMenu").length) {
					$("body").append($(this).html());
					optionsList = new ListFocusManager({
						id: "options-menu",
						infinite: true
					});
				}			
				// Appends the stage and levels on the ArcadeLevels scene.
				if (!$("#stages-list ul").length) {
					SceneManager.ArcadeLevels.appendStagesList();
				}			
				$("#current-stars").html(StageConfig.getTotalStars());			
			});			
			setTimeout(function(){
				Scene.text = MainMenuText;
				Scene.text();				
				MainMenuAnimations.in();
			},100);
			if (from !== "Title")
				player.play(sounds.game_menu,true);			
		} else {
			Scene.text = MainMenuText;
			Scene.text();
			optionsList.setIndex(optionsList.getIndex());
			Scene.keys = MainMenuKeys;
			Scene.keys();
		}
	};
	/**
     * When occurs a transition and this state will be left.
	 * @param  {string} event Name of the event was fired.
	 * @param  {string} from Name of this state.
	 * @param  {string} to Name the next state.
	 * @param  {string} message Some messages for the next state.
	 */
	SceneManager.onleaveMainMenu = function (event, from, to, message) {
		EasterEgg.index = 0;
		if (to != "EasterEgg"){
			if (to === "ArcadeLevels") {
				MainMenuAnimations.outToArcadeLevels(SceneManager.transition);
			} else {
				MainMenuAnimations.outToTwoPlayersGameStart(SceneManager.transition);
			}
			return StateMachine.ASYNC;
		}		
	};	
	/**
     * Contains animations when this state is involved in transitions.
     * @typ {Object}
     */	    
	var MainMenuAnimations = {		
		in: function(){
			$("#SceneMainMenu, #options-container, #logo").addClass("visible");
			animation("#options-container", "fade-in", function(){
			
				MainMenuAnimations.menuIn();
			
			}, config.FADE_IN_DURATION);
		},		
		menuIn: function(){
			$("#options-menu > li:first-child").addClass("visible");
			animation({
					id: "#options-menu > li:first-child", 
					transitionClass: "option-menu-in",
					duration: MENU_IN_DURATION,
					timingFunction: BETWEEN_LIST_EASE
			});			
			setTimeout(function(){
				$("#options-menu > li:last-child").addClass("visible");
				animation({
						id: "#options-menu > li:last-child", 
						transitionClass: "option-menu-in",
						duration: MENU_IN_DURATION,
						timingFunction: BETWEEN_LIST_EASE,
						
						callback: function(){
							Scene.keys = MainMenuKeys;
							Scene.keys();
						}
				});
			}, DELAY_BETWEEN_LIST);
		},		
		outToArcadeLevels: function(transition){		
			// Reset the position of the stages list before changing to the ArcadeLevels scene.
			SceneManager.ArcadeLevels.restoreStageListToPosition(0);		
			animation({
				id: "#SceneMainMenu", 
				transitionClass: "to-left",
				duration: config.SLIDE_DURATION,				
				callback: function(){
					$("#SceneMainMenu, #logo, #options-menu > li").removeClass("visible");	
				},	
			});			
			$("#SceneArcadeLevels").addClass("visible");
			animation({
				id: "#SceneArcadeLevels", 
				transitionClass: "from-right", 
				duration: config.SLIDE_DURATION,				
				callback: function(){
					transition();
				}
				
			});
		},		
		outToTwoPlayersGameStart: function(transition){
			animation("#options-container", "fade-out", function(){
				player.stop(sounds.game_menu);			
				$("#options-container").remove();
				transition();			
			}, config.FADE_IN_DURATION);
		}
	};
	/**
     * Bind the behavior for keydown in this state for the stages.
	 */	
	function MainMenuKeys() {
		unbind_keys();        
        $('li').click(function() {
            optionsList.setIndex($(this).index());
            triggerKey(tvKey.KEY_ENTER);
        });        
		$(document).keydown(function(e){
			switch (e.keyCode) {
				case tvKey.KEY_UP:
					player.play(sounds.menu_move);
					optionsList.up();
					break;					
				case tvKey.KEY_DOWN:
					player.play(sounds.menu_move);
					optionsList.down();
					break;			
				case tvKey.KEY_ENTER:
					player.play(sounds.select_option);
					if(EasterEgg.index != (EasterEgg.code.length-1)) {
						switch(optionsList.getIndex()){
							case 0:
								SceneManager.MainMenuToArcadeLevels();
							break;
							case 1:
								SceneManager.MainMenuToTwoPlayersGameStart();
							break;
						}
					}
					break;
				case tvKey.KEY_EXIT:
                    event.preventDefault();
					popupExit.show();
					break;
				case tvKey.KEY_RETURN:
					Scene.isReturn = true;
					popupExit.show();
					break;
			}			
			if (e.keyCode == tvKey.KEY_UP || e.keyCode == tvKey.KEY_DOWN) {
				$("#options-menu").addClass("animate-menu");
			}
			EasterEgg.index = EasterEgg.code[EasterEgg.index] == e.keyCode ? (EasterEgg.index + 1) : 0;
			if (EasterEgg.index >= EasterEgg.code.length) {
				EasterEgg.index = 0;
				SceneManager.MainMenuToEasterEgg();
			}
		});
	}
	/**
     * Sets the label depending TV language.
	 * @param  {number} language_id
	 */
	function MainMenuText(language_id){
		LANGUAGE.current = language_id || LANGUAGE.current;		
		$(".text-arcade").html(text[LANGUAGE.current].arcade);
		$(".text-two-players").html(text[LANGUAGE.current].two_players);
		$(".text-choose-level").html(text[LANGUAGE.current].level_choose_level);
		$(".text-press-play").html(text[LANGUAGE.current].press_play);
	}
	/**
     * Available methods.
     * @public
     */	
	return {
		MainMenuText: MainMenuText
	}
	
})();