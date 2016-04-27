Scene.counter_interval = null;
Scene.counterIsRunning = false;

SceneManager.onBlackScreen = function(event, from, to){
   if($("#counter_info > .background-eyes").length == 0){
      createBlackscreenEyes();
   }

   var	counter = config.COUNTER,	
         current_index = Scene.cookie.getValue('sounds_index_selected');

   // Language strings
   Scene.text = BlackScreenText;
   Scene.text(Scene.language.current);

   // Intro animation
   $('#SceneBlackScreen').addClass('visible');

   $('#counter_info').addClass('fade_in_from_bottom').addClass('visible').on('webkitAnimationEnd', function(){
      $('#counter_info').removeClass('fade_in_from_bottom').off();
   });

   Scene.keys = BlackScreenInfoKeys;
   Scene.keys();

   Scene.counterIsRunning = true;

   setTimeout(function(){
      if (Scene.counterIsRunning) {
         Scene.counter_interval = setInterval(function(){

            if (counter > 0) {
               $('#counter').addClass('pulse').html(counter);
               setTimeout(function(){	
                  $('#counter').removeClass('pulse');
               },300)
               counter--;
            } else {
               clearInterval(Scene.counter_interval);
               $('#counter_info').addClass('fade_out_to_bottom').on('webkitAnimationEnd', function(){
                  $('#counter_info').removeClass('fade_out_to_bottom').removeClass('visible').off();
                  $('#counter').html('');
                  $("#counter_info > .background-eyes").remove();
                  Scene.keys = BlackScreenKeys;
                  Scene.keys();
               });
            }
         },config.COUNTER_DURATION);
      }
   },config.COUNTER_DELAY);
};

SceneManager.onleaveBlackScreen = function(event, from, to){
	Scene.player.stop();
	$("#counter_info > .background-eyes").remove();
	
	$('#SceneBlackScreen').removeClass('focus');
	
	if (to === 'Title') {
	
		$('#SceneBlackScreen').removeClass('visible');
	
		$('#mainContainer').addClass('fade_in').addClass('visible').removeClass('hide').on('webkitAnimationEnd', function(){
			$('#mainContainer').removeClass('fade_in').off();
		});
	}
};

SceneManager.onBlackScreenToFinishScreen = function(event, from, to){
};

SceneManager.onToBlackScreen = function(event, from, to){
};

function BlackScreenInfoKeys(){
	
	$('#counter').html('');
	
	unbind_keys();
	
	$(document).keydown(function(e){
		switch (e.keyCode) {
			case tvKey.Enter:
				Scene.counterIsRunning = false;
				clearInterval(Scene.counter_interval);
				$('#counter_info').addClass('fade_out_to_bottom').on('webkitAnimationEnd', function(){
					$('#counter_info').removeClass('fade_out_to_bottom').removeClass('visible').off();
					
					Scene.keys = BlackScreenKeys;
					Scene.keys();
				});
				break;
			case tvKey.Return:
				Scene.counterIsRunning = false;
				clearInterval(Scene.counter_interval);
				$('#counter_info').addClass('fade_out_to_bottom').on('webkitAnimationEnd', function(){
					$('#counter_info').removeClass('fade_out_to_bottom').removeClass('visible').off();
					
					SceneManager.BackToTitle();
				});
				break;
		}
	});
}

function BlackScreenKeys(){
	
	unbind_keys();
	
	$(document).keydown(function(e){
		switch (e.keyCode) {
			case tvKey.ArrowLeft:
				if (!Scene.player.isPlaying()) {
					var data = Scene.cookie.getValue('sounds_index_selected')[0],
						path = Scene.soundList["row0"].content[data].path,
						type = Scene.soundList["row0"].type;

					$('#mainContainer').data('key',tvKey.ArrowLeft);
					Scene.player.play(path,type);
				}
				break;
			case tvKey.ArrowUp:
				if (!Scene.player.isPlaying()) {
					var data = Scene.cookie.getValue('sounds_index_selected')[1],
						path = Scene.soundList["row1"].content[data].path,
						type = Scene.soundList["row1"].type;
					
					$('#mainContainer').data('key',tvKey.ArrowUp);
					Scene.player.play(path,type);
				}
				break;
			case tvKey.ArrowDown:
				if (!Scene.player.isPlaying()) {
					var data = Scene.cookie.getValue('sounds_index_selected')[2],
						path = Scene.soundList["row2"].content[data].path,
						type = Scene.soundList["row2"].type;
					
					$('#mainContainer').data('key',tvKey.ArrowDown);
					Scene.player.play(path,type);
				}
				break;
			case tvKey.ArrowRight:
				if (!Scene.player.isPlaying()) {
					var data = Scene.cookie.getValue('sounds_index_selected')[3],
						path = Scene.soundList["row3"].content[data].path,
						type = Scene.soundList["row3"].type;
					
					$('#mainContainer').data('key',tvKey.ArrowRight);
					Scene.player.play(path,type);
				}
				break;
			case tvKey.Enter:
				if (!Scene.player.isPlaying()) {
					unbind_keys();
					var data = Scene.cookie.getValue('sounds_index_selected')[4];

                  
               var path = Scene.soundList["row4"].content[data].path,
                   type = Scene.soundList["row4"].type;

               $('#mainContainer').data('key',tvKey.Enter);
               Scene.player.play(path,type);
				}
				break;
			case tvKey.Info:
				popup_black_help.show();
			break;
			case tvKey.Return:
				SceneManager.BackToTitle();
				break;
			case tvKey.Exit:
				popup_exit.show();
				Scene.lastList = '';
				break;
		}
	});
}

var popup_black_help = {
	show: function(){
		$('#counter').html('');
		$('#counter_info').addClass('fade_in_from_bottom').addClass('visible').on('webkitAnimationEnd', function(){
			$('#counter_info').removeClass('fade_in_from_bottom').off();
			
			unbind_keys();
			
			$(document).keydown(function(e){
				switch (e.keyCode) {
					case tvKey.Enter:
					case tvKey.Return:
					case tvKey.Info:
						popup_black_help.close();
					break;
				}
			});
		});
	},
	close: function(){
		$('#counter_info').addClass('fade_out_to_bottom').on('webkitAnimationEnd', function(){
			$('#counter_info').removeClass('fade_out_to_bottom').removeClass('visible').off();
			Scene.keys();
		});
	}
}

function BlackScreenText(language_id){
	Scene.language.current = language_id;
	
	$('.text_blackscreen_h3').html(text.blackscreen_h3[Scene.language.current]);
	$('.text_blackscreen_p').html(text.blackscreen_p[Scene.language.current]);
	$(".tvnotoff").removeClass("_en").removeClass("_es").addClass(Scene.language.current ? "_es" : "_en");
}

function createBlackscreenEyes(){
	createEyes(66,40,1,8,5, "#counter_info");
	createEyes(1133,66,0.9,3,15, "#counter_info");
	createEyes(266,200,0.5,2,-10, "#counter_info");
	createEyes(153,520,0.9,6,-10, "#counter_info");
	createEyes(1067,480,1,7,25, "#counter_info");
}
