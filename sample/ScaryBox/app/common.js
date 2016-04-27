// Namespace. Contains data of the current Scene.
var Scene = {
		language: {
			current: 0,
			languages: ['english', 'spanish'],
			english: 0,
			spanish: 1
		},
		keys: false,
		text: false,
		soundList: false,
		soundListImages: false,
		cookie: false,
		player: false
	},
	popup_exit =  null,
	popup_exit_list =  null;

/**
 *	Clears all the keys events and adds the common keys for TV usage. Blocks the RETURN and EXIT event 
 *	from the TV. Use this function when entering a new scene or before binding a new set of keys.
 *
 *	@author Gerardo Reyes, g.reyes@samsung.com
 */
function unbind_keys () {

	$(document).unbind('keydown');
	
	$(document).keydown(function(e){
		switch(e.keyCode){
			case tvKey.Return:
            event.preventDefault();
				break;
			case tvKey.Exit:
            event.preventDefault();
			break;
			
		}
	});
}


/**
 *	Gets all the data from the sound JSON.
 *	@param {function} function to be call when the JSON is loaded.
 *
 *	@author Gerardo Reyes, g.reyes@samsung.com
 */
function getData (callback) {
	
	$.ajax({
		type: "GET",
		data: '',
		url: 'json/sounds.data',
		dataType: 'json',
		contentType: "application/data",
		success:function(data) {
			if (typeof callback === "function")
				callback(data);
		}
	});
}

/**
 *	Adds an animation keyframe class with custom properties and a callback at the animation ends event.
 *
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
function animation(options, animationClass, callback, duration_ms){

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
			return;
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
			return;
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

/**
 *	Cookies Management
 *	@param {string n} The name of the new cookie
 *
 *	@author Gerardo Reyes, g.reyes@samsung.com
 */
function Cookie(n){

	var name = false;
	var values = { };

	(function (n){
		if (n) {
			name = n;
			var fileObj = localStorage.getItem( device.uuid + "/"+ name +".data");
			if(fileObj){
				console.log(" **** Cookie Exist **** ");
				values = fileObj? jQuery.parseJSON(fileObj) : values;
			}
		}
		else
			console.error('Cookie error: The cookie need a name');
	})(n);

	function is_valid (key,val){
		var test = true;
		var check = {name: false, key: false , val: false};
		if (name)       check.name = true;
		if (key)        check.key = true;
		if (val)        check.val = true;
		if(!check.name || !check.key){
			console.warn("You are missing something \n" +
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
		localStorage.setItem(device.uuid + "/"+ name +".data",'');
	};

	this.save = function(){
		if (name) {
			localStorage.setItem( device.uuid + "/"+ name +".data",JSON.stringify(values));
		}
	};

} Object.freeze(Cookie);

/**
 *	Manages the focus on a generic list. The elements of the list must be place within a parent container.
 *	@param {string|object} options The ID for the list container element or an object with all the list options.
 *	@param {string} list_id A selector with the ID of the list container. 
 * 	@param {boolean} [infinite=false] Makes the navigation through the list infinite, without edge. Default 'true'.
 *  @param {string} [focus_class='focus'] Name of the class to add to the focused element in the list. Default 'focus'.
 *  @param {string} [element_list='li'] Selector for the lines of the list container. Default 'li'.
 *
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
 *
 *	@author Cristian Valladares, cristian.v@samsung.com
 */
function GridFocusManager(options, elements_per_row){

	if (typeof options == "object") {
		var grid_id = '#' + options.id;
		this.elementsPerRow = options.elements_per_row;
	} else {
		var grid_id = '#' + options;
		this.elementsPerRow = elements_per_row;
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
	
	//return {
		
		/**
		 *	Move the focus to the right in the grid.
		 *	@param {function} [callback] Function to be call when the focus gets to the edge of the list.
		 */
		this.right = function(callback){
			temp_selected = $(grid_id + ' > .' + focus_class);
			temp_selected_index = temp_selected.index()+1;
			
			if ((temp_selected_index)%this.elementsPerRow != 0 && (temp_selected_index) < elements_length) {
				temp_selected.removeClass(focus_class).next().addClass(focus_class);
				index++;
			} else {
				if (infinite_x) {
					temp_selected.removeClass(focus_class);
					if (elements_length == temp_selected_index&& elements_length%this.elementsPerRow !=0) {
						index = (elements_length - ((elements_length%this.elementsPerRow) - 1)) - 1;
						$(grid_id + ' > ' + element_list + ':nth-child(' + (index + 1)  + ')').addClass(focus_class);
						
					} else {
						index = (temp_selected.index()-(this.elementsPerRow - 2)) - 1;
						$(grid_id + ' > ' + element_list + ':nth-child(' + (index + 1) + ')').addClass(focus_class);
					}
				}
				if (typeof callback === 'function') {
					callback();
				}
				
			}
		}
		
		/**
		 *	Move the focus to the left in the grid.
		 *	@param {function} [callback] Function to be call when the focus gets to the edge of the list.
		 */
		this.left = function(callback){
			temp_selected = $(grid_id + ' > .' + focus_class);
			temp_selected_index = temp_selected.index()+1;
			
			if ((temp_selected_index)%this.elementsPerRow != 1) {
				temp_selected.removeClass(focus_class).prev().addClass(focus_class);
				index--;
			} else {
				if (infinite_x) {
					temp_selected.removeClass(focus_class);
					if ((temp_selected_index) == elements_length - ((elements_length%this.elementsPerRow)-1)) {
						index = $(grid_id + ' > ' + element_list).length() - 1;
						$(grid_id + ' > ' + element_list + ':last-child').addClass(focus_class);
					} else {
						index = (temp_selected.index()+this.elementsPerRow) - 1;
						$(grid_id + ' > ' + element_list + ':nth-child(' + (index + 1)  + ')').addClass(focus_class);
					}
				}
				if (typeof callback === 'function') {
					callback();
				}
			}
		}
		
		/**
		 *	Move the focus down in the grid.
		 *	@param {function} [callback] Function to be call when the focus gets to the edge of the list.
		 */
		this.down = function(callback){
			temp_selected = $(grid_id + ' > .' + focus_class);
			temp_selected_index = temp_selected.index()+1;
			
			if ((temp_selected.index() + this.elementsPerRow) < elements_length) {
				temp_selected.removeClass(focus_class);
				index = temp_selected.index() + this.elementsPerRow;
				$(grid_id + ' > ' + element_list + ':nth-child(' + (index + 1) + ')').addClass(focus_class);
			} else {
				if (infinite_y) {
					temp_selected.removeClass(focus_class);
					index = (((temp_selected_index)%this.elementsPerRow) ? ((temp_selected_index)%this.elementsPerRow) : this.elementsPerRow ) - 1;
					$(grid_id + ' > ' + element_list + ':nth-child(' + (index + 1) + ')').addClass(focus_class);
				}
				if (typeof callback === 'function') {
					callback();
				}
			}
		}
		
		/**
		 *	Move the focus up in the grid.
		 *	@param {function} [callback] Function to be call when the focus gets to the edge of the list.
		 */
		this.up = function(callback){
			temp_selected = $(grid_id + ' > .' + focus_class);
			temp_selected_index = temp_selected.index()+1;
			
			if (((temp_selected.index() - this.elementsPerRow)) >= 0) {
				temp_selected.removeClass(focus_class);
				index = temp_selected.index() - this.elementsPerRow;
				$(grid_id + ' > ' + element_list + ':nth-child(' + (index + 1) + ')').addClass(focus_class);
			} else {
				if (infinite_y) {
					temp_selected.removeClass(focus_class);
					if (elements_length%this.elementsPerRow == 0) {
						index = ((((elements_length/this.elementsPerRow)-1)*this.elementsPerRow) + temp_selected_index) - 1;
						$(grid_id + ' > ' + element_list + ':nth-child(' + (index + 1) + ')').addClass(focus_class);
					} else {
						if ((parseInt(elements_length/this.elementsPerRow)*this.elementsPerRow) + temp_selected_index <= elements_length) {
							index = ((parseInt(elements_length/this.elementsPerRow)*this.elementsPerRow) + temp_selected_index) - 1;
							$(grid_id + ' > ' + element_list + ':nth-child(' + (index + 1) + ')').addClass(focus_class);
						} else {
							index = (((parseInt(elements_length/this.elementsPerRow)-1)*this.elementsPerRow) + temp_selected_index) - 1;
							$(grid_id + ' > ' + element_list + ':nth-child(' + (index + 1) + ')').addClass(focus_class);;
						}
					}
				}
				if(typeof callback === 'function') {
					callback();
				}
			}
		}
		
		/**
		 *	@returns {number} Returns the position of the focus in the grid.
		 */
		this.getIndex = function(){
			return index;
		}
		
		/**
		 *	@returns {number} Returns the row of the focus in the grid.
		 */
		this.getRow = function(){
			var temp_row = (($(grid_id + ' > .' + focus_class).index()+1)/this.elementsPerRow);
			return (temp_row%1 == 0 ? temp_row-1 : parseInt(temp_row));
		}
		
		/**
		 *	@returns {number} Returns the grid of the focus in the grid.
		 */
		this.getColumn = function(){
			var temp_column = ($(grid_id + ' > .' + focus_class).index()+1)%this.elementsPerRow;
			return (temp_column == 0 ? this.elementsPerRow-1 : temp_column-1);
		}

		/**
		 *	Sets a new index in the grid.
		 *	@param {number} [value] The new index
		 *	@param {function} [callback] Function to be call when the focus gets to the edge of the list.
		 */
		this.setIndex = function(value, callback){
			if ((value < elements_length)&&(value >= 0)) {
				$(grid_id + ' > .' + focus_class).removeClass(focus_class);
				$(grid_id + ' > ' + element_list + ':nth-child(' + (value + 1) + ')').addClass(focus_class);
				index = value;
			} else {
				if (typeof callback === 'function') {
					callback();
				}
			}
		}
		
		/**
		 *	Sets a new index in the grid by coordenates.
		 *	@param {number} [x] The new index column.
		 *	@param {number} [y] The new index row.
		 *	@param {function} [callback] Function to be call when the focus gets to the edge of the list.
		 */
		this.setIndexByCoordenate = function(x, y, callback){
			if (x < this.elementsPerRow && (y*this.elementsPerRow + (x+1)) <= elements_length) {
				$(grid_id + ' > .' + focus_class).removeClass(focus_class);
				index = ((y*this.elementsPerRow) + (x+1)) - 1;
				$(grid_id + ' > ' + element_list + ':nth-child(' + (index + 1) + ')').addClass(focus_class);
			} else {
				if (typeof callback === 'function') {
					callback();
				}
			}
		}
	//}
}

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
			if(typeof options.onShow === 'function'){
				options.onShow();
			}
			
			/*
			 *	FIX: Original routine to show pop up.
			 */
			//$('#dim').css({
			//	'opacity': '1',
			//	'visibility': 'visible'
			//});
			
			$('#dim').addClass('visible').addClass('fade_in');
			
			$('#' + options.id).css('display', 'block').addClass('popup_in');
			
			active = true;
			window.active_popup = true;
			
			$('#' + options.id).on('webkitAnimationEnd',function(){
				$('#dim').removeClass('fade_in');
				$('#' + options.id).removeClass('popup_in');
				$('#' + options.id).off();
			});
		}
	}
	
	this.close = function(){
		if (active) {
			$('#dim').addClass('fade_out');
			
			// CUSTOM: Adds the focus immediately where it was.
			if (Scene.lastList != false) {
				window[Scene.lastList].setIndex(window[Scene.lastList].getIndex());
			}
			
			$('#' + options.id).addClass('popup_out');
			$('#' + options.id).on('webkitAnimationEnd',function(){
				$('#dim').removeClass('fade_out').removeClass('visible')
				$('#' + options.id).css('display', 'none');
				$('#' + options.id).removeClass('popup_out');
				
				active = false;
				window.active_popup = false;
			
				if (options.onClose) {
					options.onClose();
				}
				
				$('#' + options.id).off();
			});
		}
	}
	
	this.isActive = function(){
		return active;
	}
}

/**
 *	Generate a "Player"
 *	@param {string id} the ID of the player object
 *
 *	@author Gerardo Reyes, g.reyes@samsung.com
 */
function Player(id){
	var isplaying = false;
	var displayArea = { x: 0, y: 0, w: 960, h: 540 };
	var self = this;
	var mediaType = 'audio';
	var current_vol = 0;
	//[TOAST] play back video or audio file using toast media.
    var p =  toast.Media.getInstance();
   
   var pContainer = p.getContainerElement();
   pContainer.style.position = 'fixed';
   pContainer.style.zIndex = '1000';
   document.body.appendChild(pContainer);

	this.isPlaying = function(val){
		isplaying = typeof val === "boolean" ? val : isplaying;
		return isplaying;
	};
	this.getMediaType = function() {
		return mediaType;
	}

	this.play = function(path, type, bufferComplete, renderComplete){
		self.stop();
		isplaying = true;
		mediaType = type || 'audio';
      setMaxVolume();
      p.open(path);
      
      //[TOAST] Getting container element which is used for displaying the video.
      var pContainer = p.getContainerElement();
		if (type == "video"){
			$('#sound_pad_list li.focus').addClass('video');
         
         pContainer.style.width = '100%';
         pContainer.style.height = '100%';
         pContainer.style.display = 'block';

      }else {
         $('#sound_pad_list li.focus').addClass('animateSound');
         pContainer.style.width = '0px';
         pContainer.style.height = '0px';
      }
      //[TOAST] Synchronize videoRect with container element. 
      //[TOAST] In 2013's sectv-orsay platform, This function MUST be called when you change the container element's position or size.
      p.syncVideoRect();

      p.setListener({
         onevent: function(evt){
            console.log('on event.type: '+evt.type);
            switch (evt.type){
               case 'ENDED':
                  if (renderComplete){
                     renderComplete();
                  }
                  OnRenderingComplete();
                  break;
               case 'BUFFERINGPROGRESS':
                  if (evt.data.bufferingPercentage >= 100 ){
                     if (bufferComplete){
                        bufferComplete();
                     }
                  }
                  break;
            } 
         },
         onerror: function(evt){
            console.log('player error'+ evt); 
         }
      });
      //[TOAST]You don't have to call setScreenSaver Method. It is configurated by toast.avplay .
      p.play();
	};


	this.stop = function() {
      if (p) {
         p.stop();
      }
		isplaying = false;
		$('.animateSound').removeClass('video');
		$('.animateSound').removeClass('animateSound');
	};
	
	function getPath (linkString) {
		var Abs_path = "";
		var rootPath = window.location.href.substring(0, location.href.lastIndexOf("/")+1);
		if (unescape(window.location.toString()).indexOf("localhost") == -1) {	
			if (unescape(window.location.toString()).indexOf("file://C") != -1)
				Abs_path = unescape(rootPath).split("file://")[1].replace("C/","C:/")+linkString;
			else
				Abs_path = unescape(rootPath).split("file://")[1]+linkString;
		}
		else {
			if (unescape(window.location.toString()).indexOf("C:") != -1)
				Abs_path = "/" + unescape(rootPath).split("file://localhost/C:\\")[1].replace(/\\/g,"/")+linkString;
			else 
				Abs_path = "/" + unescape(rootPath).split("file://localhost/")[1]+linkString;
		}
		return Abs_path;
	}

	function setMaxVolume() {
		if (mediaType == 'video') {
         mainContainerContent.hide();
         if (SceneManager.current == "BlackScreen" && $('#mainContainer').data('key') == tvKey.Enter) {
            //[TOAST] TV audio control such as volume-level or mute using toast tvaudiocontrol.
            toast.tvaudiocontrol.getVolume(function(value) {
               current_vol = value;
               toast.tvaudiocontrol.isMute(function(isMuted) {
                  if (!isMuted){
                     toast.tvaudiocontrol.setVolume(90, function() { 
                        console.log('~max volume :)');  
                     });
                  }
               });
            });
         }
		}
	}

	function OnRenderingComplete () {
		isplaying = false;
		self.stop();
		if (mediaType == 'video') {

         var playerConatainer = p.getContainerElement();
         playerConatainer.style.display = 'none';

			if (SceneManager.current == "BlackScreen" && $('#mainContainer').data('key') == tvKey.Enter) {
            toast.tvaudiocontrol.isMute(function(isMuted) {
               if (!isMuted){
                  toast.tvaudiocontrol.setVolume(current_vol, function() { 
                     console.log('volume restored to:'+current_vol);  
                  });
               }
            });
				SceneManager.BlackScreenToFinishScreen();
			}
			else if (SceneManager.current != "BlackScreen")
				mainContainerContent.show();
		}

		if(typeof Scene.keys === "function"){
			Scene.keys();
		}
	}

} Object.freeze(Player);

var mainContainerContent = {
	show: function() {
		$('#mainContainer').addClass('fade_in').removeClass('hide').on('webkitAnimationEnd', function(){
			$('#mainContainer').removeClass('fade_in').off();
			if (typeof callback === 'function')
				callback();
		});
	},
	hide: function(callback) {
		$('#mainContainer').addClass('fade_out').on('webkitAnimationEnd', function(){
			$('#mainContainer').removeClass('fade_out').addClass('hide').off();
			if (typeof callback === 'function')
				callback();
		});
	}
}

var infoPopup = {
	keys: function () {
		unbind_keys();
		$(document).keydown(function(e){
			switch(e.keyCode){
				case tvKey.Return:
				case tvKey.Exit:
				case tvKey.Enter:
					$('#info_popup .info_popup_return > div').addClass('press');
					
					Scene.cookie.addValue('title_first',true);
					Scene.cookie.save();
					
					setTimeout(function(){ 
						$('#info_popup .info_popup_return > div').removeClass('press'); 
					},100);
					
					infoPopup.hide();
				break;
				
			}
		});
	},
	show: function (type) {
		if (type && $('#' + type).length) {
			unbind_keys();
			
			$('#howToPlay .howToPlay_left .title').html(text.how_to_play[Scene.language.current]);
			$('#howToPlay .howToPlay_right .title').html(text.how_to_play_info[Scene.language.current]);
			
			$('#soundSettings .soundSettings_popup_1').html(text.soundSettings_popup_1[Scene.language.current]);
			$('#soundSettings .soundSettings_popup_2').html(text.soundSettings_popup_2[Scene.language.current]);
			$('#soundSettings .soundSettings_popup_3').html(text.soundSettings_popup_3[Scene.language.current]);
			

			$('#' + type).css('display','-webkit-box');
			
			$('#mainContainer > :not(.info,#fog-screen,#eyesAnimation,#dim,#SceneDisclaimer)').each(function(i,j){
				move('#' +$(j).attr('id'))
					.set('opacity', 0)
					.duration(300)
				.end();
			})
			
			if (!Scene.cookie.getValue('title_first')) {
				
				move('#info_popup')
					.set('opacity', 1)
					.duration(300)
				.end(function(){ 
					infoPopup.keys();
					
					$('#howToPlay .title').addClass('fade_in_from_top').addClass('visible').on('webkitAnimationEnd', function(){
						$('#howToPlay .title').removeClass('fade_in_from_top').off();
					
						if (!Scene.cookie.getValue('title_first')) {
							setTimeout(function(){
								$('#infoComic > div').each(function(i) {	
									setTimeout(function(){
										if (!Scene.cookie.getValue('title_first')) {
											$('.comic_' + (i+1)).addClass(config.COMIC_BOX_ANIMATIONS[i]).addClass('visible').on('webkitAnimationEnd', function(){
												$('.comic_' + (i+1)).removeClass(config.COMIC_BOX_ANIMATIONS[i]).off();
											});
										}
									}, config.COMIC_DELAY* i);
								});
							}, config.COMIC_DELAY);
						}
					});
				});
								
			} else {
				$('#infoComic > div, #howToPlay .title').addClass('visible');
				move('#info_popup')
					.set('opacity', 1)
					.duration(300)
				.end(function(){ 
					infoPopup.keys(); 
				});
			}
		}
		else
			console.warn('Need div ID');
	},
	hide: function () {
		unbind_keys();
		$('#howToPlay, #soundSettings').css('display','none');
		
		move('#info_popup')
			.set('opacity', 0)
			.duration(300)
		.end(function(){ if (typeof Scene.keys === 'function') Scene.keys(); });
		
		$('#mainContainer > :not(.info,#fog-screen,#eyesAnimation,#dim,#SceneDisclaimer)').each(function(i,j){
			move('#' +$(j).attr('id'))
				.set('opacity', 1)
				.duration(300)
			.end(function(){
				$('#mainContainer > :not(.info,#fog-screen,#eyesAnimation,#dim,#SceneDisclaimer)').attr('style','');
			});
		});
	}
}

popup_exit = new PopUpManager({
	id: 'popup_exit', 
	title: 'Are you done scaring people?', 
	content:'<ul id="popup_exit_list"> ' +
				'<li><div><div class="selector"></div></div><span class="text_yes "></span></li>' +
				'<li><div><div class="selector"></div></div><span class="text_no "></span></li>' +
			'</ul>',
	onShow: function(){
		$('#popup_exit header span').html(text.are_you_done[Scene.language.current]);
		$('.text_yes').html(text.yes[Scene.language.current]);
		$('.text_no').html(text.no[Scene.language.current]);
		
		if (Tutorial.current === 'none') {
			$('.focus').removeClass('focus');
		}
		
		$('#sound_selector').addClass('display_none');
		
		unbind_keys();
		popup_exit_list.setIndex(0);
		
		setTimeout(function(){
			
			$(document).keydown(function(e){
				switch(e.keyCode){
					case tvKey.ArrowLeft:
						popup_exit_list.up();
					break;
					case tvKey.ArrowRight:
						popup_exit_list.down();
					break;
					case tvKey.Enter:
						switch(popup_exit_list.getIndex()){
							case 0:
                        toast.application.exit();
							break;
							case 1:
								$('#popup_exit_list .button_no').addClass('press');
								setTimeout(function(){ $('#popup_exit_list .button_no').removeClass('press'); },100);
								popup_exit.close();
							break;
						}
					break;
					case tvKey.Return:
						popup_exit.close();
					break;
				}
			});
		},500);
	},
	onClose: function(){
		//$('.focus').removeClass('focus');
		$('#sound_selector').removeClass('display_none');
		
		// FIX: adds the focus to the SoundListScene son the animation of the slider works
		if (SceneManager.current === 'SoundList') {
			$('#SceneSoundList').addClass('focus');
		}
		
		unbind_keys();
		
		Scene.exitType = '';

		if(typeof Scene.keys === "function"){
			Scene.keys();
		}
	}
});

popup_exit_list = new ListFocusManager({
	id: 'popup_exit_list', 
	infinite: true
});

popup_exit_tutorial = new PopUpManager({
	id: 'popup_exit_tutorial', 
	title: 'Are you done scaring people?', 
	content:'<ul id="popup_exit_tutorial_list"> ' +
				'<li ><div><div class="selector"></div></div><span class="text_yes"></span></li>' +
				'<li ><div><div class="selector"></div></div><span class="text_no"></span></li>' +
			'</ul>',
	onShow: function(){
		$('#popup_exit_tutorial header span').html(text.leave_tutorial[Scene.language.current]);
		$('.text_yes').html(text.yes[Scene.language.current]);
		$('.text_no').html(text.no[Scene.language.current]);
		
		if (Tutorial.current === 'none') {
			$('.focus').removeClass('focus');
		}
		
		$('#sound_selector').addClass('display_none');
		
		unbind_keys();
		popup_exit_tutorial_list.setIndex(0);
		Scene.lastList = '';
		
		setTimeout(function(){
			
			$(document).keydown(function(e){
				switch(e.keyCode){
					case tvKey.ArrowLeft:
						popup_exit_tutorial_list.up();
					break;
					case tvKey.ArrowRight:
						popup_exit_tutorial_list.down();
					break;
					case tvKey.Enter:
						$('#popup_exit_tutorial_list .button_no').addClass('press');
						setTimeout(function(){ $('#popup_exit_tutorial_list .button_no').removeClass('press'); },100);
						switch(popup_exit_tutorial_list.getIndex()){
							case 0:
								Tutorial.fromAlltoExitTutorial();
							break;
						}
						popup_exit_tutorial.close();
					break;
					case tvKey.Return:
						popup_exit_tutorial.close();
					break;
				}
			});
		},500);
	},
	onClose: function(){
		//$('.focus').removeClass('focus');
		$('#sound_selector').removeClass('display_none');
		
		unbind_keys();
		
		Scene.exitType = '';

		if(typeof Scene.keys === "function"){
			Scene.keys();
		}
	}
});

popup_exit_tutorial_list = new ListFocusManager({
	id: 'popup_exit_tutorial_list', 
	infinite: true
});

popup_black_help = new PopUpManager({
	id: 'popup_black_help', 
	title: '', 
	content:'<div class="text_black_title"></div>' +
			'<div class="text_black_subtitle"></div>' +
			'<div class="black_image">'+
				'<div class="text_black_sounds"></div>'+
				'<div class="text_black_frightality"></div>'+
			'</div>'+
			'<div class="text_black_ready_scare"></div>'+
			'<div class="text_black_bottom"></div>'+
			'<div class="info_popup_return"><div></div></div>',
	onShow: function(){
		Scene.lastList = false;
		$('#sound_selector').css('display','none');
		$('.text_black_title').html(text.black_title[Scene.language.current]);
		$('.text_black_subtitle').html(text.black_subtitle[Scene.language.current]);
		$('.text_black_sounds').html(text.black_sounds[Scene.language.current]);
		$('.text_black_frightality').html(text.black_frightality[Scene.language.current]);
		$('.text_black_ready_scare').html(text.black_ready_scare[Scene.language.current]);
		$('.text_black_bottom').html(text.black_bottom[Scene.language.current]);
		
		unbind_keys();
		
		setTimeout(function(){
			
			$(document).keydown(function(e){
				switch(e.keyCode){
					case tvKey.Return:
					case tvKey.Enter:
						popup_black_help.close();
						$('#popup_black_help .info_popup_return > div').addClass('press');

						setTimeout(function(){ 
							$('#popup_black_help .info_popup_return > div').removeClass('press'); 
						},100);
					break;
				}
			});
		},500);
	},
	onClose: function(){
		unbind_keys();
		
		Scene.exitType = '';
		$('#sound_selector').attr('style','');
							
		if(typeof Scene.keys === "function"){
			Scene.keys();
		}
	}
});

function eyesAnimation() {
	var first = parseInt(Math.random() * $('#eyesAnimation div').length) + 1;

	while ($('#eyesAnimation .eyes:nth-child(' + first + ')').attr('class').indexOf('blink') != -1) {
		first = parseInt(Math.random()*$('#eyesAnimation div').length)+1;
	}
	
	$('#eyesAnimation .eyes:nth-child('+first+')').addClass('blink');

	setTimeout(function(){
		$('#eyesAnimation .eyes:nth-child('+first+')').removeClass('blink');
		eyesAnimation();
	},3000)
}

function createEyes(x, y, ratio, breathetime, rotatedegrees, parent){
	var width = 92 * ratio,
	    height = 46 * ratio;

	$('<div class="background-eyes"></div>').css({
		width               : width,
		height              : height,
		top                 : y,
		left                : x,
		"-webkit-animation" : "eyes-pulse " + breathetime + "s infinite ease-in-out",
		"-webkit-transform" : "rotate(" + rotatedegrees + "deg)"
	}).appendTo(parent);
}
