/**
 * Control the behavior on stage ArcadeLevels.
 */
SceneManager.ArcadeLevels = (function () {
	/**
     * List manager for stages (3 stages).
     * type {ListFocusManager}
     */
    var stageList = null;
    /**
     * Prefix for stage available class on css.
     * @type {string}
     */
	var STAGE_CLASS_AVAILABLE = "available";
    /**
     * 
     */
	var	STAGE_CLASS_NEW = "new";
	/**
     * List manager for levels (10 levels per stage).
     * type {ListFocusManager}
     */    
	var	levelsGrid = null;
	/**
     * When the transition goes to this State, this will do initializations.
	 * @param  {string} event Name of the event was fired.
	 * @param  {string} from From which state came.
	 * @param  {string} to Name of the actual state.
	 * @param  {any} message Some data for the state.
	 */
	SceneManager.onArcadeLevels = function (event, from, to, message) {
		if (from === "MainMenu") {			
			// Appends the stage and levels on the ArcadeLevels scene.
			if (!$("#stages-list ul").length) {
				SceneManager.ArcadeLevels.appendStagesList();
			}		
			// Language strings
			Scene.text = ArcadeLevelsText;
			Scene.text();
			Scene.keys = SelectLevelsKeys;
			Scene.keys();			
			stageList = new ListFocusManager("stages-list");
			checkStageArrows();			
			levelsGrid = new GridFocusManager({
				id: "stages-list ul", 
				elements_per_row: 5
			});			
			setStageListWidth();			
		} else {
			ArcadeLevelsAnimations.inFromGame();
		}
	};	
	/**
     * When occurs a transition and this state will be left.
	 * @param  {string} event Name of the event was fired.
	 * @param  {string} from Name of this state.
	 * @param  {string} to Name the next state.
	 * @param  {string} message Some messages for the next state.
	 */
	SceneManager.onleaveArcadeLevels = function (event, from, to, message) {		
		if (to === "MainMenu") {
			ArcadeLevelsAnimations.outToMainMenu(SceneManager.transition);
		} else if (to === "GameStart") {
			ArcadeLevelsAnimations.outToGameStart(SceneManager.transition);
		}		
		$("#stages-list .focus").removeClass("focus");		
		return StateMachine.ASYNC;
	};
	/**
     * Contains animations when this state is involved in transitions.
     * @typ {Object}
     */
	var ArcadeLevelsAnimations = {
		/**
         * Animations when transition came from Game.
		 */
		inFromGame: function(){
			$("<div>").load("app/htmls/MainMenu.html", function() {
				player.play(sounds.game_menu,true);

				if (!$("#SceneMainMenu").length) {
					$("body").append($(this).html());
				}
				
				// Appends the stage and levels on the ArcadeLevels scene.
				if (!$("#stages-list ul").length) {
					SceneManager.ArcadeLevels.appendStagesList();
					$("#current-stars").html(StageConfig.getTotalStars());
				}
				
			});			
			setTimeout(function(){			
				restoreStageListToPosition(stageList.getIndex());
				setStageListWidth();				
				stageList.setIndex(stageList.getIndex());
				levelsGrid.setIndex(levelsGrid.getIndex());								
				// Language strings
				Scene.text = SceneManager.MainMenu.MainMenuText;
				Scene.text();				
				Scene.text = ArcadeLevelsText;
				Scene.text();				
				$("#SceneArcadeLevels, #options-container").addClass("visible");
				animation("#options-container", "fade-in", function(){				
					Scene.keys = SelectLevelsKeys;
					Scene.keys();			
				}, config.FADE_IN_DURATION);
				checkStageArrows();
			},100);
		},		
		/**
         * Animations for transition Curret to Game.
		 * @param  {function} transition Transition function of the State Machine.
		 */
		outToGameStart: function(transition){
			animation("#options-container", "fade-out", function(){
				player.stop(sounds.game_menu);
				$("#options-container").remove();
				transition();
			}, config.FADE_IN_DURATION);
		},
		/**
         * Animations for transition Curret to MainMenu.
		 * @param  {function} transition Transition function of the State Machine.
		 */	
		outToMainMenu: function(transition){
			animation({
				id: "#SceneArcadeLevels", 
				transitionClass: "to-right", 
				duration: config.SLIDE_DURATION,
				
				callback: function(){
					$("#SceneArcadeLevels").removeClass("visible");

					// Removes the 'stars left' message.
					$('#level-status-popup').removeClass("visible").data("active", false);
				}
				
			});			
			$("#SceneMainMenu, #logo, #options-menu > li").addClass("visible");
			animation({
				id: "#SceneMainMenu", 
				transitionClass: "from-left", 
				duration: config.SLIDE_DURATION,
								
				callback: function(){
					transition();
				}
				
			});
		}
	}		
	/**
     * Bind the behavior for keydown in this state for grid levels.
	 */
	function SelectLevelsKeys(){ 
		unbind_keys();        
        $('li.available').click(function() {
            levelsGrid.setIndex($(this).index());
            triggerKey(tvKey.KEY_ENTER);
        });                
        $("#stage-selector-left-arrow").click(function() {
            levelsGrid.setIndex(0);
            triggerKey(tvKey.KEY_LEFT);
        });
        $("#stage-selector-right-arrow").click(function() {
            levelsGrid.setIndex(4);
            triggerKey(tvKey.KEY_RIGHT);
        });        
		$(document).keydown(function(e){		
			var gridIndex 	= levelsGrid.getIndex();
			switch (e.keyCode) {
				case tvKey.KEY_RETURN:
					SceneManager.BackToMainMenu();
					break;
				case tvKey.KEY_LEFT:
					if (levelsGrid.getColumn() >=1 && levelsGrid.getColumn() <=4)
						player.play(sounds.menu_move);
					levelsGrid.left(function(){
						stageListSelector.prev();
					});
					levelAvailability.checkAvailabilityByCoordenate(stageList.getIndex(), levelsGrid.getColumn(), levelsGrid.getRow());
					break;
				case tvKey.KEY_RIGHT:
					if (levelsGrid.getColumn() >=0 && levelsGrid.getColumn() <=3)
						player.play(sounds.menu_move);
					levelsGrid.right(function(){
						stageListSelector.next();
					});
					if (stageListSelector.checkStageAvailability()) {
						levelAvailability.checkAvailabilityByCoordenate(stageList.getIndex(), levelsGrid.getColumn(), levelsGrid.getRow());
					}
					break;
				case tvKey.KEY_UP:
					if (levelsGrid.getRow() === 1)
						player.play(sounds.menu_move);
					levelsGrid.up();
					levelAvailability.checkAvailabilityByCoordenate(stageList.getIndex(), levelsGrid.getColumn(), levelsGrid.getRow());
					break;
				case tvKey.KEY_DOWN:
					if (levelsGrid.getRow() === 0) {
						player.play(sounds.menu_move);
						levelsGrid.down();
					}
					levelAvailability.checkAvailabilityByCoordenate(stageList.getIndex(), levelsGrid.getColumn(), levelsGrid.getRow());
					break;
				case tvKey.KEY_ENTER:
					if ($("#stage-" + (stageList.getIndex() + 1) + " ul li:nth-child(" + (levelsGrid.getIndex() + 1) + ")").hasClass(STAGE_CLASS_AVAILABLE)) {
						player.play(sounds.select_option);
						SceneManager.ArcadeLevelsToGameStart({
							levelIndex: levelsGrid.getIndex(),
							stageIndex: stageList.getIndex()
						});
					}
					break;
				case tvKey.KEY_EXIT:
					popupExit.show();
					break;
			}
		});
	}
	/**
     * Bind the behavior for keydown in this state for the stages.
	 */	
	function SelectStagesKeys(){
		unbind_keys();
        $("#stage-selector-left-arrow").click(function() {
            triggerKey(tvKey.KEY_LEFT);
        });
        $("#stage-selector-right-arrow").click(function() {   
            triggerKey(tvKey.KEY_RIGHT);
        });         
		$(document).keydown(function(e){	
			switch (e.keyCode) {
				case tvKey.KEY_RETURN:
					SceneManager.BackToMainMenu();
					break;
				case tvKey.KEY_LEFT:
					stageListSelector.prev();
					break;
				case tvKey.KEY_RIGHT:
					stageListSelector.next();
					break;
				case tvKey.KEY_EXIT:
					popupExit.show();
					break;
			}
		});
	}
	/**
     * Reset position to an index of the stage list.
	 * @param  {number} index Stage index.
	 */
	function restoreStageListToPosition(index){
		$("#stages-list").removeClass("transition").attr("style","");		
		if (!$("#stages-list").length) {
			setStageListWidth();
		}		
		$("#stages-list").css("-webkit-transform", "translateX(-" + (index * config.WINDOW_WIDTH) +"px)");		
		setTimeout(function(){
			$("#stages-list").addClass("transition");
		},250);
	}
	/**
     * Set the width of the #stage-list element according to the number of children it has.
	 */
	function setStageListWidth(){
		$("#stages-list").css("width", (stageList.length() * config.WINDOW_WIDTH) + "px");
	}
    /**
     * Navigates the stages modules.
     * @type {Object}
     */
	var stageListSelector = {	
		/**
         * Moves the stage dashboard.
		 */
		stageSelectorMove: function(){
			$("#stages-list").css("-webkit-transform", "translateX(-" + (stageList.getIndex() * config.WINDOW_WIDTH) +"px)");
		},		
		/**
         * Bind properly keys when user is navigating on levels and stages.
		 */
		setKeys: function(){
			if (this.checkStageAvailability()) {			
				Scene.keys = SelectLevelsKeys;
				Scene.keys();
				levelsGrid.setIndexByCoordenate((levelsGrid.getColumn() === 4 ? 0 : 4), levelsGrid.getRow());				
			} else {
				Scene.keys = SelectStagesKeys;
				Scene.keys();				
				levelsGrid.setIndexByCoordenate((levelsGrid.getColumn() === 4 ? 0 : 4), levelsGrid.getRow());
			}
		},		
		/**
         * Checks if exists more stages.
         * @return {boolean} True if there is another stage available false if not.
		 */
		checkStageAvailability: function(){
			if ($("#stage-" + (stageList.getIndex() + 1)).hasClass(STAGE_CLASS_AVAILABLE)) {
				return true;
			} else {
				return false;
			}
		},		
		/**
         * Transition to next stage.
		 */
		next: function(){
			if ((stageList.getIndex() < stageList.length() - 1)) {
				player.play(sounds.stage_change);				
				stageList.down();
				this.stageSelectorMove();												
				this.setKeys();				
				if (!this.checkStageAvailability()) {
					levelAvailability.hideMessage();
				} else {
					levelAvailability.checkAvailabilityByCoordenate(stageList.getIndex(), levelsGrid.getColumn(), levelsGrid.getRow());
				}				
				checkStageArrows();
			}
		},
		/**
         * Transition to previous stage.
		 */        	
		prev: function() {			
			if (stageList.getIndex() > 0) {
				stageList.up();
				this.stageSelectorMove();				
				this.setKeys();
				player.play(sounds.stage_change);				
				if (!this.checkStageAvailability()) {
					levelAvailability.hideMessage();
				} else {
					levelAvailability.checkAvailabilityByCoordenate(stageList.getIndex(), levelsGrid.getColumn(), levelsGrid.getRow());
				}				
				checkStageArrows();
			}
		}
	}
	/**
     * Visibility logic for rows.
     * If exists a next state, appears a row on the right.
     * If exists a previous state, appears a row on the left.
	 */
	function checkStageArrows(){				
		if (stageList.getIndex() != 0){
			$("#stage-selector-left-arrow").css("visibility","visible");
			var stageCounter = stageList.getIndex() - 1;
			stage = StageConfig.getStage(stageCounter);
			var addNew = false;
			for (levelCounter = 0; levelCounter < stage.levels.length ; levelCounter++) {
				if (StageConfig.getLevelInfo(stageCounter, levelCounter).status == "new"){
					addNew = true;
				}
			}
			if (addNew == true){
				$("#stage-selector-left-arrow").addClass("new");
			}
			else{
				$("#stage-selector-left-arrow").removeClass("new");
			}
		}
		else {
			$("#stage-selector-left-arrow").css("visibility","hidden");
		}		
		if (stageList.getIndex() != stageList.length() - 1){
			$("#stage-selector-right-arrow").css("visibility","visible");
			var stageCounter = stageList.getIndex() + 1;
			stage = StageConfig.getStage(stageCounter);
			var addNew = false;
			for (levelCounter = 0; levelCounter < stage.levels.length ; levelCounter++) {
				if (StageConfig.getLevelInfo(stageCounter, levelCounter).status == "new"){
					addNew = true;
				}
			}
			if (addNew == true){
				$("#stage-selector-right-arrow").addClass("new");
			}
			else{
				$("#stage-selector-right-arrow").removeClass("new");
			}
		}
		else {
			$("#stage-selector-right-arrow").css("visibility","hidden");
		}
	}
    /**
     * Checks if the next level to navigate in the LevelGrid is available to play.
     */
	var levelAvailability = {	
		/**
         * Provides the amount of stars needed per level.
		 * @param  {number} stageIndex
		 * @param  {number} levelIndex
         * @return {number} Stars needed.
		 */
		getStarsNeeded: function(stageIndex, levelIndex){			
			var levelInfo 	= StageConfig.getLevelInfo(stageIndex,levelIndex);			
			return levelInfo.neededStars;
		},		
		/**
         * Render respective message per level. 
		 */
		showMessage: function(){		
			var starsNeeded;		
			if ($('#level-status-popup').data("active") !== true) {				
				$('#level-status-popup').addClass("visible").data("active", true);
				animation("#level-status-popup", "fade-in-from-bottom", '', config.POPUP_FADE_IN_DURATION);
			}			
			starsNeeded = this.getStarsNeeded(stageList.getIndex(), levelsGrid.getIndex());
			$("#level-stars-needed").html(starsNeeded);			
		},		
		/**
         * Hide a message per level.
		 */
		hideMessage: function(){
			if ($('#level-status-popup').data("active") === true) {
				animation("#level-status-popup", "fade-out-to-bottom", function(){
					$('#level-status-popup').removeClass("visible").data("active", false);
				}, config.POPUP_FADE_IN_DURATION);
			}
		},		
		/**
         * Set a level as available or unavailable.
		 * @param  {number} stageIndex
		 * @param  {number} x Coordinate x.
		 * @param  {number} y Coordinate y.
		 */
		checkAvailabilityByCoordenate: function(stageIndex, x, y){			
			var row = x + 1;
			var	column = y * 5;
			var	nthChild = column + row;			
			if (!$("#stage-" + (stageIndex + 1) + " ul li:nth-child(" + nthChild + ")").hasClass(STAGE_CLASS_AVAILABLE)) {
				this.showMessage();
			} else {
				this.hideMessage();
			}
		}
	}
	/**
     * Creates the mark-up for the stages and levels.
	 */
	function appendStagesList(){	
		var stage;
		var	stageCounter;
		var	stageInfo;
		var	stageStatus;
		var	levelCounter;
		var	levelInfo;
		var	levelStars;	
		for (stageCounter = 0; stageCounter < StageConfig.getTotalStages(); stageCounter++) {			
			stageInfo = StageConfig.getStageInfo(stageCounter);			
			if (stageInfo.status === "available") {
				stageStatus = STAGE_CLASS_AVAILABLE;
			} else {
				stageStatus = "unavailable";
			}			
			$("#stages-list").append(
				'<li>' +
					'<div id="stage-' + (stageCounter + 1) + '" class="levels-list ' + stageStatus + '">' +
						'<header>' +
							'<span>' + text[LANGUAGE.current].stage + ' ' + (stageCounter + 1) + '</span>' +
						'</header>' +
						'<ul></ul>' +
						(stageStatus !== STAGE_CLASS_AVAILABLE ? 
							'<div class="unavailable-message">' +
								'<p><span>' + levelAvailability.getStarsNeeded(stageCounter, 0) + '</span></p>' + 
							'</div>' 
							: "")   +
					'</div>' +
				'</li>'
			);		
			stage = StageConfig.getStage(stageCounter);			
			for (levelCounter = 0; levelCounter < stage.levels.length ; levelCounter++) {			
				levelInfo = StageConfig.getLevelInfo(stageCounter, levelCounter);
				switch (levelInfo.stars) {
					case 1:
						levelStars = "one-star";
					break;
					case 2:
						levelStars = "two-stars";
					break;
					case 3:
						levelStars = "three-stars";
					break;
					default:
						levelStars = "";
				}			
				$("#stage-" + (stageCounter + 1) + " ul").append(
					'<li class="' + levelInfo.status + " " + (levelInfo.status === "new" ? "available" : "") + ' ' + levelStars + '"><div><span>' + (levelCounter + 1) + '</span>'+
					(levelInfo.status === "new" ? '<div id="new-label"></div>' : "") + '</div></li>'
				);
			}
		}
	}	
	/**
     * Sets the label depending TV language.
	 * @param  {number} language_id
	 */
	function ArcadeLevelsText (language_id) {
		LANGUAGE.current = language_id || LANGUAGE.current;		
		$(".text-level-stars-needed").html(text[LANGUAGE.current].level_stars_needed);
		$(".text-choose-level").html(text[LANGUAGE.current].level_choose_level);
		$(".text-press-play").html(text[LANGUAGE.current].press_play);
	}	    	
	/**
     * Available methods.
     * @public
     */
	return {
		appendStagesList			: appendStagesList,
		restoreStageListToPosition 	: restoreStageListToPosition
	}

})();