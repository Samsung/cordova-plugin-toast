// Namespace. Contains data of the current Scene.
var Scene = {
    keys: false,
    text: false,
    isReturn: false
};
/**
 * List of the menu options (li).
 * @type {ListFocusManager}
 */
var optionsList;
/**
 * Popup to ask user what wanna do before exit.
 * @type {PopUpManager}
 */
var	popupExit;
/**
 * General config values.
 * @type {Object}
 */
var config = {
	FADE_IN_DURATION: 850,
	SLIDE_DURATION: 500,
	POPUP_FADE_IN_DURATION: 250,
	WINDOW_WIDTH: 1280
};
/**
 *  Manage player and sounds.
 *  @author Gerardo Reyes, g.reyes@samsung.com.
 */
var sounds = (function () {
    /**
     * List with sounds name that are gonna be played.
     * @type {Array}
     * @private    
     */
	var list = ["branch_break", "coconut_break", "coconut_color", "coconut_release", "coin", "floor_break", "game_menu", 
				"lose_game", "menu_move", "metal_ball", "metal_ball_hit", "monkey_move", "select_option", "stage_01_bg_sound",
				"stage_02_bg_sound", "stage_03_bg_sound", "stage_change", "star_sound", "up_element"];
    /** 
     * Object with the sound effect name and index.
     * @type {Object}
     * @protected
     */                    
	var content = { list: list };
	/**
     * Initialize the content.
     */
	(function(){	
		list.forEach(function(element,i){
			content[element] = i;
		});

	})();
	return content;
})();
/**
 * Instance of native client player.
 */
var player;
/**
 * Event handler when native client sends a message.
 * @param  {string} msg Recived message from the native client.
 */
function playerCallback (msg) {
	switch (msg) {
		case "Player init":
			player.load(sounds.list);
		break;
		case "All sounds loaded":
			window.setOffScreenSaver();
			SceneManager.TitleToMainMenu();
			player.gain(sounds.menu_move,.3);
			player.gain(sounds.metal_ball,.5);
			player.play(sounds.game_menu,true);
		break
	}
}
/**
 *	Clears all the keys events and adds the common keys for TV usage. Blocks the RETURN and EXIT event 
 *	from the TV. Use this function when entering a new scene or before binding a new set of keys.
 *	@author Gerardo Reyes, g.reyes@samsung.com
 */
function unbind_keys(){

	$(document).unbind('keydown');
    $(document).unbind('click');
    $('li').unbind('click');
    $("#stage-selector-left-arrow").unbind('click');
    $("#stage-selector-right-arrow").unbind('click');

	$(document).keydown(function(e) {
		switch(e.keyCode){
			case tvKey.KEY_RETURN:
                event.preventDefault();
				break;
			case tvKey.KEY_EXIT:
				event.preventDefault();
			break;
			case tvKey.KEY_MUTE:
				player.stopAll();
			break;
		}

	});

}
/**
 *  Trigger keypress in the document, function is used to support click button on menu options.
 *  @param {number} keyCode Key code to be triggered.
 */
function triggerKey(keyCode) {
        var e = jQuery.Event('keydown');
        e.which = keyCode; 
        e.keyCode = keyCode;
        $(document).trigger(e);
}
/**
 *	Adds an animation keyframe class with custom properties and a callback at the animation ends event.
 *	@param {string|object} options The ID for the element or an object with all the animation options.
 *	@param {string} animationClass The keyframe class with the animation to apply.
 *	@param {number} [duration=300] Specifies how milliseconds an animation takes to complete one cycle.
 *	@param {string} [timingFunction=ease] Describes how the animation will progress over one cycle of its duration.
 *	@param {number} [delay=0] Specifies when the animation will start.
 *	@param {number} [iterations=1] Specifies the number of times an animation is played.
 *	@param {number} [direction=normal] Specifies whether or not the animation should play in reverse on alternate cycles.
 *	@param {string} [fillMode=forwards] Specifies what values are applied by the animation outside the time it is execution.
 *	@param {function} [callback] Specifies function to be call when the animation ends.
 *
 *	@author Cristian Valladares, cristian.v@samsung.com
 */
function animation(options, animationClass, callback, duration_ms, canvasTrick){
	var animationDuration_ms,
		timingFunction,
		delay_ms,
		iterations,
		direction,
		fillMode,
		endCallback,
		element,
		transitionClass;
	// Reassign variables depending if the functions recives multiple parameters or an object.
	if (typeof options === "object") {
		if (typeof options.id === "string" && typeof options.transitionClass === "string") {
			element			= $(options.id);
			transitionClass = options.transitionClass;
		} else {
		
			// Fail if the functions does not receive a selector and a keyframe class.  
			throw new Error("TRANSITION: Element does not exist");
		}
	} else {
		if (typeof options === "string" && typeof animationClass === "string") {
			element			= $(options);
			transitionClass = animationClass;
			options 		= {
								callback: callback,
								duration: duration_ms
							};
		} else {
			
			// Fail if the functions does not receive a selector and a keyframe class.  
			throw new Error("TRANSITION: Element does not exist");
		}
	}
	animationDuration_ms = options.duration || 300,
	timingFunction 	= options.timingFunction || "ease",
	delay_ms 		= options.delay || 0,
	iterations	 	= options.iterations || 1,
	direction		= options.direction || "normal",
	fillMode		= options.fillMode || "forwards",
	steps			= options.steps || 0,
	endCallback 	= options.callback || "";
	if (steps > 0) {
		steps = "steps(" + options.steps + ")";
		timingFunction = "";
	} else {
		steps = "";
	}		
	// Add the CSS animation properties received.
	if (canvasTrick) {
		setTimeout(function() {
			element
				.css("-webkit-animation", "")
				.off();
		
			if (typeof endCallback === "function") {
				endCallback();
			}
		}, animationDuration_ms + 500);
	}
	else {
		element
			.css(
				"-webkit-animation", 	transitionClass + " " + 
										animationDuration_ms + "ms " + 
										steps + " " +
										timingFunction + " " +
										delay_ms + "ms " +
										iterations + " " +
										direction + " " +
										fillMode
			)			
			// When the animation is complete, remove the properties and execute the callback.
			.on("webkitAnimationEnd", function(){								
				element
					.css("-webkit-animation", "")
					.off();			
				if (typeof endCallback === "function") {
					endCallback();
				}
			});
	}
}
/**
 *	Manages the focus on a generic list. The elements of the list must be place within a parent container.
 *	@param {string|object} options The ID for the list container element or an object with all the list options.
 *	@param {string} list_id A selector with the ID of the list container. 
 * 	@param {boolean} [infinite=true] Makes the navigation through the list infinite, without edge. Default 'true'.
 *  @param {string} [focus_class='focus'] Name of the class to add to the focused element in the list. Default 'focus'.
 *  @param {string} [element_list='li'] Selector for the lines of the list container. Default 'li'.
 *	@author Cristian Valladares, cristian.v@samsung.com
 */
function ListFocusManager(options){	
	if (typeof options == "object") {
		var list_id = '#' + options.id;
	} else {
		var list_id = '#' + options;
		options = {};
	}	
	var temp_selected;
	var focus_class = options.focus_class || 'focus';
	var element_list = options.element_list || 'li';
	var infinite = options.infinite || false;
	var index = 0;		
	$(list_id + ' > ' + element_list + ':first-child').addClass(focus_class);	
	return {		
		/**
		 *	Move the focus one element before.
		 *	@param {function} [callback] Function to be call when the focus gets to the edge of the list.
		 */
		up: function(callback){
			temp_selected = $(list_id + ' > .' + focus_class);
			if (temp_selected.index() > 0) {
				temp_selected.removeClass(focus_class).prev().addClass(focus_class);
				index--;
			} else {
				if (infinite) {
					temp_selected.removeClass(focus_class);
					$(list_id + ' > ' + element_list + ':last-child').addClass(focus_class);
					index = $(list_id + ' > ' + element_list).length - 1;
				}
				if (typeof callback === 'function') {
					callback();
				};
			}
		},		
		/**
		 *	Move the focus one element after.
		 *	@param {function} [callback] Function to be call when the focus gets to the edge of the list.
		 */
		down: function(callback){
			temp_selected = $(list_id + ' > .' + focus_class);
			if ((temp_selected.index()+1) < $(list_id + ' > ' + element_list).length) {
				temp_selected.removeClass(focus_class).next().addClass(focus_class);
				index++;

			} else {
				if (infinite) {
					temp_selected.removeClass(focus_class);
					$(list_id + ' > ' + element_list + ':first-child').addClass(focus_class);
					index = 0;
				}
				if (typeof callback === 'function') {
					callback();
				}
			}
		},		
		/**
		 *	@returns {number} Returns the position of the focus in the list.
		 */
		getIndex: function(){
			return index;
		},		
		/**
		 *	Sets a new index in the list.
		 *	@param {number} The index of the focus.
		 */
		setIndex: function(value){
			if ((value < $(list_id + ' > ' + element_list).length)||(value > 0)) {
				$(list_id + ' > .' + focus_class).removeClass(focus_class);
				$(list_id + ' > ' + element_list + ':nth-child(' + (value+ 1) + ')').addClass(focus_class);
				index = value;
			}
		},		
		/**
		 *	@returns {number} Returns the length of the list.
		 */
		length: function(){
			return $(list_id + ' > ' + element_list).length;
		}
	}
} Object.freeze(ListFocusManager);
/**
 *	Manages the focus on a generic grid system. The elements of the list must be place within a parent container.
 *	@param {string|object} options The ID for the list container element or an object with all the list options.
 *	@param {string} grid_id A selector with the ID of the grid container.
 *	@param {number} elements_per_row The number of elements per row in the grid. 
 * 	@param {boolean} [infinite=false] Makes the navigation through the grid infinite, without edge. Both horizontally and vertically. Default 'false'.
 * 	@param {boolean} [infinite_x=false] Makes the horizontally navigation through the grid infinite, without edge. Default 'false'.
 * 	@param {boolean} [infinite_y=false] Makes the vertically navigation through the grid infinite, without edge. Default 'false'.
 *  @param {string} [focus_class='focus'] Name of the class to add to the focused element in the grid. Default 'focus'.
 *  @param {string} [element_list='li'] Selector for the lines of the list container. Default 'li'.
 *	@author Cristian Valladares, cristian.v@samsung.com
 */
function GridFocusManager(options, elements_per_row){
	if (typeof options == "object") {
		var grid_id 		= '#' + options.id,
			elementsPerRow 	= options.elements_per_row;
	} else {
		var grid_id 		= '#' + options,
			elementsPerRow 	= elements_per_row,
			options = {};
	}	
	var focus_class = options.focus_class || 'focus';
	var element_list = options.element_list || 'li';
	var infinite_x = options.infinite_x || false;
	var infinite_y = options.infinite_y || false;
	var index = 0;	
	if (options.infinite != undefined) {
		infinite_x = true;
		infinite_y = true;
	}		
	var	elements_length = $(grid_id + ' > ' + element_list).length,
		temp_selected;
						
	$(grid_id + ' > ' + element_list + ':first-child').addClass(focus_class);	
	return {		
		/**
		 *	Move the focus to the right in the grid.
		 *	@param {function} [callback] Function to be call when the focus gets to the edge of the list.
		 */
		right: function(callback){
			temp_selected = $(grid_id + ' > .' + focus_class);
			temp_selected_index = temp_selected.index()+1;			
			if ((temp_selected_index)%elementsPerRow != 0 && (temp_selected_index) < elements_length) {
				temp_selected.removeClass(focus_class).next().addClass(focus_class);
				index++;
			} else {
				if (infinite_x) {
					temp_selected.removeClass(focus_class);
					if (elements_length == temp_selected_index && elements_length % elementsPerRow !=0) {
						index = (elements_length - ((elements_length % elementsPerRow) - 1)) - 1;
						$(grid_id + ' > ' + element_list + ':nth-child(' + (index + 1)  + ')').addClass(focus_class);
						
					} else {
						index = (temp_selected.index() - (elementsPerRow - 2)) - 1;
						$(grid_id + ' > ' + element_list + ':nth-child(' + (index + 1) + ')').addClass(focus_class);
					}
				}
				if (typeof callback === 'function') {
					callback();
				}
				
			}
		},		
		/**
		 *	Move the focus to the left in the grid.
		 *	@param {function} [callback] Function to be call when the focus gets to the edge of the list.
		 */
		left: function(callback){
			temp_selected = $(grid_id + ' > .' + focus_class);
			temp_selected_index = temp_selected.index()+1;
			
			if ((temp_selected_index) % elementsPerRow != 1) {
				temp_selected.removeClass(focus_class).prev().addClass(focus_class);
				index--;
			} else {
				if (infinite_x) {
					temp_selected.removeClass(focus_class);
					if ((temp_selected_index) == elements_length - ((elements_length % elementsPerRow)-1)) {
						index = $(grid_id + ' > ' + element_list).length() - 1;
						$(grid_id + ' > ' + element_list + ':last-child').addClass(focus_class);
					} else {
						index = (temp_selected.index() + elementsPerRow) - 1;
						$(grid_id + ' > ' + element_list + ':nth-child(' + (index + 1)  + ')').addClass(focus_class);
					}
				}
				if (typeof callback === 'function') {
					callback();
				}
			}
		},		
		/**
		 *	Move the focus down in the grid.
		 *	@param {function} [callback] Function to be call when the focus gets to the edge of the list.
		 */
		down: function(callback){
			temp_selected = $(grid_id + ' > .' + focus_class);
			temp_selected_index = temp_selected.index()+1;
			
			if ((temp_selected.index() + elementsPerRow) < elements_length) {
				temp_selected.removeClass(focus_class);
				index = temp_selected.index() + elementsPerRow;
				$(grid_id + ' > ' + element_list + ':nth-child(' + (index + 1) + ')').addClass(focus_class);
			} else {
				if (infinite_y) {
					temp_selected.removeClass(focus_class);
					index = (((temp_selected_index) % elementsPerRow) ? ((temp_selected_index) % elementsPerRow) : elementsPerRow ) - 1;
					$(grid_id + ' > ' + element_list + ':nth-child(' + (index + 1) + ')').addClass(focus_class);
				}
				if (typeof callback === 'function') {
					callback();
				}
			}
		},		
		/**
		 *	Move the focus up in the grid.
		 *	@param {function} [callback] Function to be call when the focus gets to the edge of the list.
		 */
		up: function(callback){
			temp_selected = $(grid_id + ' > .' + focus_class);
			temp_selected_index = temp_selected.index()+1;
			
			if (((temp_selected.index() - elementsPerRow)) >= 0) {
				temp_selected.removeClass(focus_class);
				index = temp_selected.index() - elementsPerRow;
				$(grid_id + ' > ' + element_list + ':nth-child(' + (index + 1) + ')').addClass(focus_class);
			} else {
				if (infinite_y) {
					temp_selected.removeClass(focus_class);
					if (elements_length%elementsPerRow == 0) {
						index = ((((elements_length/elementsPerRow)-1)*elementsPerRow) + temp_selected_index) - 1;
						$(grid_id + ' > ' + element_list + ':nth-child(' + (index + 1) + ')').addClass(focus_class);
					} else {
						if ((parseInt(elements_length/elementsPerRow)*elementsPerRow) + temp_selected_index <= elements_length) {
							index = ((parseInt(elements_length/elementsPerRow)*elementsPerRow) + temp_selected_index) - 1;
							$(grid_id + ' > ' + element_list + ':nth-child(' + (index + 1) + ')').addClass(focus_class);
						} else {
							index = (((parseInt(elements_length/elementsPerRow)-1)*elementsPerRow) + temp_selected_index) - 1;
							$(grid_id + ' > ' + element_list + ':nth-child(' + (index + 1) + ')').addClass(focus_class);;
						}
					}
				}
				if(typeof callback === 'function') {
					callback();
				}
			}
		},		
		/**
		 *	@returns {number} Returns the position of the focus in the grid.
		 */
		getIndex: function(){
			return index;
		},		
		/**
		 *	@returns {number} Returns the row of the focus in the grid.
		 */
		getRow: function(){
			var temp_row = (($(grid_id + ' > .' + focus_class).index()+1)/elementsPerRow);
			return (temp_row%1 == 0 ? temp_row-1 : parseInt(temp_row));
		},		
		/**
		 *	@returns {number} Returns the grid of the focus in the grid.
		 */
		getColumn: function(){
			var temp_column = ($(grid_id + ' > .' + focus_class).index()+1)%elementsPerRow;
			return (temp_column == 0 ? elementsPerRow-1 : temp_column-1);
		},
		/**
		 *	Sets a new index in the grid.
		 *	@param {number} [value] The new index
		 *	@param {function} [callback] Function to be call when the focus gets to the edge of the list.
		 */
		setIndex: function(value, callback){
			if ((value < elements_length)&&(value >= 0)) {
				$(grid_id + ' > .' + focus_class).removeClass(focus_class);
				$(grid_id + ' > ' + element_list + ':nth-child(' + (value + 1) + ')').addClass(focus_class);
				index = value;
			} else {
				if (typeof callback === 'function') {
					callback();
				}
			}
		},		
		/**
		 *	Sets a new index in the grid by coordenates.
		 *	@param {number} [x] The new index column.
		 *	@param {number} [y] The new index row.
		 *	@param {function} [callback] Function to be call when the focus gets to the edge of the list.
		 */
		setIndexByCoordenate: function(x, y, callback){
			if (x < elementsPerRow && (y*elementsPerRow + (x+1)) <= elements_length) {
				$(grid_id + ' > .' + focus_class).removeClass(focus_class);
				index = ((y*elementsPerRow) + (x+1)) - 1;
				$(grid_id + ' > ' + element_list + ':nth-child(' + (index + 1) + ')').addClass(focus_class);
			} else {
				if (typeof callback === 'function') {
					callback();
				}
			}
		}
	}
}
/**
 * Manager for pupup messages.
 * @param  {Object} options Properties and methods that popup will contain.
 */
function PopUpManager(options){
	var active = false;
	var html = 	'<div id="' + options.id + '" class="popup">'  +
					'<header>' +
						'<div><span>'+ options.title + '</span></div>' +
					'</header>' +
					'<div class="container">';
	if(options.text)
		html += 		'<p>' + options.text + '</p>';
	if(options.content)
		html += 		options.content;	
	if(options.buttons)
		html += 		'<div class="buttons"></div></div>';
	html += 		'</div>';
	html += 	'</div>';	
	$('#dim').append(html);
	if(options.buttons){
		for (var i=0;i<options.buttons.length;i++){
			$('#dim #' + options.id + ' .buttons').append('<div class="' + options.buttons[i].class + '" onclick="' + options.buttons[i].onclick + '">' + options.buttons[i].text + '</div>');
		}
	}	
	this.show = function(){
		if(!active && !window.active_popup){
			if(options.onShow)
				options.onShow();

			$('#dim').css({'display': '-webkit-box'});
			setTimeout(function(){
				$('#dim').css({'opacity': '1'});
			},50);
			
			if (SceneManager.current === 'Loading') {
				$('#loader').addClass('hide_loader');
			}
			
			$('#' + options.id).css('display', 'block').addClass('popup_in');
			
			active = true;
			window.activePopup = true;
			
            $('#' + options.id).removeClass('popup_in');
            $('#' + options.id).off();
		}
	}	
	this.close = function(){
		if(active){
			
			$('#' + options.id).addClass('popup_out');
				
            // HACK: Section added to deal with the Loading dim.
            if (SceneManager.current !== 'Loading') {
                $('#dim').css('display', 'none');
            }
            
            $('#' + options.id).css('display', 'none');
            $('#' + options.id).removeClass('popup_out');
            
            active = false;
            window.activePopup = false;
            
            if(options.onClose)
                options.onClose();
            $('#' + options.id).off();
		}
	}	
	this.isActive = function(){
		return active;
	}
}
/**
 *	Cookies Management
 *	@param {string n} The name of the new cookie
 *	@author Gerardo Reyes, g.reyes@samsung.com
 */
function Cookie(n){
	var name = false;
	var fileSystemObj = false;
	var values = { };
	(function (n){
		if (n) {
			name = n;
			fileSystemObj = new FileSystem();
			var fileObj = fileSystemObj.openCommonFile(curWidget.id + "/"+ name +".data", 'r');
			if(fileObj){
				Utils.logger.log(" **** Cookie Exist **** ");
				var str = fileObj.readAll();
				fileSystemObj.closeCommonFile(fileObj);
				values = str? jQuery.parseJSON(str) : values;
			}
		}
		else
			Utils.logger.error('Cookie error: The cookie need a name');
	})(n);
	function is_valid (key,val){
		var test = true;
		var check = {name: false, key: false , val: false};
		if (name)       check.name = true;
		if (key)        check.key = true;
		if (val)        check.val = true;
		if(!check.name || !check.key){
			Utils.logger.warn("You are missing something \n" +
							"Initialize the cookie with a name: " + check.name +
							"\nKey param: " + check.key);
			test = false;
		}
		return test;
	};

	this.addValue = function(key,val){
		if(is_valid(key,val)){
			values[key] = val;
			return true;
		}
		return false;
	};

	this.removeValue= function(key){
		if(is_valid(key))
			return delete values[key];
	};

	this.getValue = function(key){
		if(is_valid(key))
			return values[key];
	};

	this.getAllValues = function(){
		return values;
	};

	this.removeAllValues = function(){
		values = { };
		return values;
	};

	this.deleteCookie =  function(){
		fileSystemObj.deleteCommonFile(curWidget.id + "/"+ name +".data");
	};

	this.save = function(){
		if (name) {
			var bValid = fileSystemObj.isValidCommonPath(curWidget.id);
			if (!bValid)
				fileSystemObj.createCommonDir(curWidget.id);
			var fileObj = fileSystemObj.openCommonFile(curWidget.id + "/"+ name +".data", "w");
			fileObj.writeAll(JSON.stringify(values));
			fileSystemObj.closeCommonFile(fileObj);
		}
	};

} Object.freeze(Cookie);
/**
 * List of the optios for popup exit to be manage by the focus manager.
 */
exitOptionsList = new ListFocusManager({
		id: "popup-exit-list",
		infinite: true
	});
/**
 * Popup message for exit.
 */
popupExit = new PopUpManager({
	id: 'popup-exit', 
	title: 'Do you want to exit the application?', 
	content:'<ul id="popup-exit-list"> ' +
				'<li>' +
					'<div></div>' +
					'<span class="button_no"></span>' +
					'<div></div>' +
				'</li>' +
				'<li>' +
					'<div></div>' +
					'<span class="button_yes"></span>' +
					'<div></div>' +
				'</li>' +
			'</ul>',
	onShow: function(){
	
		Scene.focus = $(".focus");
		$(".focus").removeClass("focus");
		$("#score-popup, #two-players-end-menu").addClass("hide");
		
		
		$(".button_no").html(text[LANGUAGE.current].no);
		$(".button_yes").html(text[LANGUAGE.current].yes);
		$("#popup-exit header span").html(text[LANGUAGE.current].popop_exit_header);
		
		unbind_keys();
		$('li').click(function() {
            exitOptionsList.setIndex($(this).index());
            triggerKey(tvKey.KEY_ENTER);
        });
		exitOptionsList.setIndex(0);
		
		setTimeout(function(){
			
			$(document).keydown(function(e){
				switch(e.keyCode){
					case tvKey.KEY_UP:
						exitOptionsList.up();
						break;
					case tvKey.KEY_DOWN:
						exitOptionsList.down();
						break;
					case tvKey.KEY_ENTER:
						switch(exitOptionsList.getIndex()){
							case 0:
								popupExit.close();
								break;
							case 1:
                                if (!Scene.isReturn) {
                                    toast.application.exit();
                                } else {
                                    if(Utils.isTizen()) {
                                        popupExit.close();
                                        tizen.application.getCurrentApplication().hide();
                                    } else {
                                        toast.application.exit();
                                    }
                                }
								break;
						}
						break;
					case tvKey.KEY_RETURN:
					case tvKey.KEY_EXIT:
						popupExit.close();
						break;
				}
			});
		},100);
	},
	onClose: function(){
		unbind_keys();
		
		Scene.isReturn = false;
		
		Scene.focus.addClass("focus");
		$("#score-popup, #two-players-end-menu").removeClass("hide");
		
		if (SceneManager.current === "GameStart")
			SceneManager.GameStart.pauseGame(false);
		else if (SceneManager.current === "TwoPlayersGameStart")
			SceneManager.TwoPlayersGameStart.pauseGame(false)
		
		if (typeof Scene.keys == "function") {
			Scene.keys();
		}
	}
});