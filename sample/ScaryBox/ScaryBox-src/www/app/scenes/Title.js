var title_options_list 		= null,
	MAIN_PUMPKIN 			= "#main-pumpkin",
	PUMPKIN_HANDS 			= "#pumpkin-hands",
	MENU_LIST				= "#title_options_list",
	MENU_LIST_TRANSITION	= 300,
	IN_TRANSITION			= 500;
	

SceneManager.onTitle = function(event, from, to){
		
	// Language strings
	Scene.text = TitleText;
	Scene.text(Scene.language.current);
	//titleSetSoundsPositions();
	
	// Scene lists
	if(!title_options_list) {
		title_options_list = new ListFocusManager({
			id: 'title_options_list',
			infinite: true
		});
	}

	// Intro animation.
	if (from === "SoundList") {
		
		title_options_list.setIndex(title_options_list.getIndex());
		
		$('#SceneTitle').removeClass('fade_slide_to_left').addClass('fade_slide_from_left').on('webkitAnimationEnd', function(){
			
			$('#SceneTitle').removeClass('fade_slide_from_left').off();
			
			Scene.keys = TitleKeys;
			Scene.keys();
		});
	} else if (from === 'Disclaimer' || from === 'FinishScreen' ){

		$('#mainContainer').removeClass('hide');
		
		$('#SceneSoundList').removeClass('visible');
		$('#SceneTitle').removeClass('fade_slide_to_left');
		
		$('.focus').removeClass('focus');
		title_options_list.setIndex(1);
		
		$('#logo').addClass('logo_in_animation').addClass('visible').on('webkitAnimationEnd', function(){
				
			$(MAIN_PUMPKIN).addClass("visible");
			$(PUMPKIN_HANDS).addClass("visible")
				.find("div").addClass("animate").on("webkitAnimationEnd",
				function(){$("#pumpkin-hands > div").removeClass("animate");});
				
			$('#logo').removeClass('logo_in_animation').off();
			
			animation({
				id: PUMPKIN_HANDS,
				transitionClass: "fade-in",
				duration: IN_TRANSITION,
				timingFunction: "ease-in-out",
			});
			
			animation({
				id: MAIN_PUMPKIN,
				transitionClass: "fade-in-pumpkin",
				duration: IN_TRANSITION,
				timingFunction: "ease-in-out",
				
				callback: function(){
					
					$(MENU_LIST).addClass("visible");
					
					animation({
						id: MENU_LIST,
						transitionClass: "fade-in-from-bottom",
						duration: MENU_LIST_TRANSITION,
						timingFunction: "ease-out",
						
						callback: function(){
							if (!Scene.cookie.getValue('second time')) {
								Scene.cookie.addValue('second time',true);
								Scene.cookie.save();
								Tutorial.start();
							}
							else {
								Scene.keys = TitleKeys;
								Scene.keys();
							}
						}
					});
				}
			});
		});

	} else {
		// title_options_list.setIndex(title_options_list.getIndex());
		title_options_list.setIndex(1);
		Scene.keys = TitleKeys;
		Scene.keys();
	}
	$("#background_layer > .background-eyes").length==0?createTitleEyes():null
};

SceneManager.onleaveTitle = function(event, from, to) {
	Scene.player.stop();
	$("#background_layer > .background-eyes").remove();
	$('#SceneTitle').removeClass('focus');
	
	if (to === 'SoundList') {
	
		SceneManager.transition();
	
		$('#SceneTitle').addClass('fade_slide_to_left').on('webkitAnimationEnd', function(){
			$('#SceneTitle').off();
		});
		
	} else if (to === 'BlackScreen') {
	
		$('#mainContainer').addClass('fade_out').on('webkitAnimationEnd', function(){
			$('#mainContainer').removeClass('fade_out').addClass('hide').off();
			SceneManager.transition();
		});
	}
	
	return StateMachine.ASYNC;
};

SceneManager.onTitleToBlackScreen = function(event, from, to) {
};

SceneManager.onTitleToSoundList = function(event, from, to) {
};

SceneManager.onBackToTitle = function(event, from, to) {
};

function TitleKeys(){

	unbind_keys();
	
	$(document).keydown(function(e){
		switch (e.keyCode) {
			case tvKey.ArrowLeft:
				title_options_list.up();
				break;
			case tvKey.ArrowRight:
				title_options_list.down();
				break;
			case tvKey.Enter:
            switch(title_options_list.getIndex()){
               case 0:
                  SceneManager.TitleToSoundList();
                  buttonPressedAnimation('#title_options_list > li:nth-child(2)');
                  break;
               case 1:
                  SceneManager.TitleToBlackScreen();
                  buttonPressedAnimation('#title_options_list > li:nth-child(1)');
                  break;
               case 2:
                  Tutorial.start();
                  buttonPressedAnimation('#title_options_list > li:nth-child(3)');
                  break;
            }
            Scene.lastList = 'title_options_list';
				break;
			case tvKey.Exit:
				popup_exit.show();
				Scene.lastList = 'title_options_list';
				break;
			case tvKey.Return:
				popup_exit.show();
				Scene.lastList = 'title_options_list';
				Scene.exitType = 'return';
				break;
		}
	});
}

function titleDemo (index) {
	var soundsArray = Scene.cookie.getValue('soundPositions');
	
	if (soundsArray && soundsArray[index]) {
		var type_index = soundsArray[index].type_index;
		var content_index = soundsArray[index].content_index;
		var path = Scene.soundList[type_index].content[content_index].path;
		Scene.player.play(path,soundsArray[index].type);
	}
}

function titleSetSoundsPositions () {
	var key = { left: 0, up: 1, down: 2, right: 3, enter: 4},
		positions = Scene.cookie.getValue('soundPositions');
	
	if (!positions) {
		positions = [
			new positionSoundObject('audio', 0, 0),
			new positionSoundObject('audio', 0, 1),
			new positionSoundObject('audio', 0, 2),
			new positionSoundObject('audio', 0, 3),
			new positionSoundObject('video', 1, 1)
		]
		//Scene.cookie.addValue('soundPositions',positions);
		//Scene.cookie.save();
	}
	$('#sound_pad_list > li').each(function(i,li){
		var type_index = positions[i].type_index;
		var content_index = positions[i].content_index;
		$(li).removeClass('video').removeClass('audio');
		$(li).addClass(positions[i].type);
		$(li).css({
			"background":"url("+Scene.soundList[type_index].content[content_index].img+") center no-repeat",
			"background-size": "cover"
		})
	});
}

function buttonPressedAnimation(element){
	if($(element).length !== 0) {
		$(element).addClass('pressed');
		setTimeout(function(){
			$(element).removeClass('pressed');
		},250);
	} else {
		error('buttonPressedAnimation: DOM object not found');
	}
}

function TitleText (language_id) {

	Scene.language.current = language_id;
	
	$('.text_start').html(text.start[Scene.language.current]);
	$('.text_options').html(text.options[Scene.language.current]);
	$('.text_tutorial').html(text.tutorial[Scene.language.current]);

	$("#title_options_list, #logo").removeClass("_en").removeClass("_es").addClass(Scene.language.current ? "_es" : "_en");
}

function createTitleEyes(){
	createEyes(176,101,0.7,8,-6, "#background_layer");
	createEyes(113,160,1.3,8,-6, "#background_layer");
	createEyes(1111,171,0.9,3,13, "#background_layer");
	createEyes(1056,516,0.9,6,9, "#background_layer");
	createEyes(164,520,0.9,4,4, "#background_layer");
}
