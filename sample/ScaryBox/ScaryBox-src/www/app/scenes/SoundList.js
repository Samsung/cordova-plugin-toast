var sound_config_list = null;

SceneManager.onSoundList = function(event, from, to){
   // Language strings
   Scene.text = SoundListText;
   Scene.text(Scene.language.current);
   $("#background_layer > .background-eyes").length==0?createSoundEyes():null
      $("#pumpkin-hands").removeClass("visible");

   if(!sound_config_list) {
      sound_config_list = new ListFocusManager({
         id: 'sound_pad_list',
         infinite: true
      });
   }

   if (!$('#slider_1').data('deg')) {
      sound_slider.init('#slider_1');
      sound_slider.init('#slider_2');
      sound_slider.init('#slider_3');
      sound_slider.init('#slider_4');
      sound_slider.init('#slider_5');
   }

   sound_config_list.setIndex(sound_config_list.getIndex());

   // Intro animation
   if (from === 'Title') {		
      animation({
         id: MAIN_PUMPKIN,
         transitionClass: "fade-out",
         duration: IN_TRANSITION,
         timingFunction: "ease-out",

         callback: function(){
            $(MAIN_PUMPKIN).removeClass("visible");
         }
      });

      $('#SceneSoundList').addClass('fade_slide_from_right').addClass('visible').on('webkitAnimationEnd', function(){
         $('#SceneSoundList').removeClass('fade_slide_from_right').off();

         Scene.keys = SoundListButtonsKeys;
         Scene.keys();
      });
   } else {
      $('#SceneSoundList').addClass('visible');

      Scene.keys = SoundListKeys;
      Scene.keys();
   }
};

SceneManager.onleaveSoundList = function(event, from, to){
   var sounds_index_selected = [ ];
   $("#background_layer > .background-eyes").remove();
   Scene.player.stop();
   $("#SceneSoundList > .background-eyes").remove();
   $('#SceneSoundList').removeClass('focus');

   $('.sound_selected').each(function(i,div){
      sounds_index_selected[i] = $(div).index();
   });


   Scene.cookie.addValue("sounds_index_selected",sounds_index_selected);
   Scene.cookie.save();

   if (to === 'Title') {
      $(MAIN_PUMPKIN).addClass("visible");
      $("#pumpkin-hands").addClass("visible");
      animation({
         id: MAIN_PUMPKIN,
         transitionClass: "fade-in",
         duration: IN_TRANSITION,
         timingFunction: "ease-out"
      });

      $('#SceneSoundList').addClass('fade_slide_to_right').on('webkitAnimationEnd', function(){
         $('#SceneSoundList').removeClass('fade_slide_to_right').removeClass('visible').off();
      });
   }
};

function SoundListButtonsKeys(){
   unbind_keys();

   $(document).keydown(function(e){
      switch (e.keyCode) {
         case tvKey.ArrowLeft:
            sound_config_list.up();
            break;
         case tvKey.ArrowRight:
            sound_config_list.down();
            break;
         case tvKey.Exit:
            popup_exit.show();
            Scene.lastList = 'sound_config_list';
            break;
         case tvKey.Return:
            SceneManager.BackToTitle();
            $('#return-button').addClass('press');
            setTimeout(function(){
               $('#return-button').removeClass('press'); 
            },100);	
            break;
         case tvKey.ArrowUp:
            Scene.player.stop();
            sound_slider.up('#slider_' + (sound_config_list.getIndex() + 1));
            break;
         case tvKey.ArrowDown:
            Scene.player.stop()
               sound_slider.down('#slider_' + (sound_config_list.getIndex() + 1));
            break;
         case tvKey.Enter:
            previewSound(sound_config_list.getIndex());
            break;

      }
   });
}

var sound_slider = {
   down: function(element, callback){

      var index = $(element).data('index'),
      deg = $(element).data('deg');

      deg+= config.ROTATE_SLIDER_DEG;

      if (index > 0) {
         index--;
      } else {
         index = ($(element + ' .sound_thumbnails > li').length) - 1;
      }

      this.addFocusClasses(element, deg, index);

      if (typeof callback === 'function') {
         callback();
      }

   },
   up: function(element){

      var index = $(element).data('index'),
      deg = $(element).data('deg');

      deg-= config.ROTATE_SLIDER_DEG;

      if (index < ($(element + ' .sound_thumbnails > li').length) - 1) {
         index++;
      } else {
         index = 0;
      }

      this.addFocusClasses(element, deg, index);

      if (typeof callback === 'function') {
         callback();
      }
   },
   addFocusClasses: function(element, deg, index){
      if(index == 100){
         console.log("RESET INDEX");
         index = 2;
      }

      $(element + ' .sound_selected').removeClass('sound_selected');
      $(element + ' .sound_selected_next_up').removeClass('sound_selected_next_up');
      $(element + ' .sound_selected_next_down').removeClass('sound_selected_next_down');

      $(element + ' .sound_thumbnails').css('-webkit-transform', 'rotateX(' + deg + 'deg)');
      $(element + ' .sound_thumbnails li:nth-child(' + (index+1) + ')').addClass('sound_selected');
            $(element).data('deg', deg);
            $(element).data('index',index);

            /*
               if (index == 0) {
               $(element + ' .sound_thumbnails li:nth-child(' + (index+2) + ')').addClass('sound_selected_next_down');
               $(element + ' .sound_thumbnails li:last-child').addClass('sound_selected_next_up');
               } else if (index == $(element + ' .sound_thumbnails > li').length - 1) {
               $(element + ' .sound_thumbnails li:nth-child(' + (index) + ')').addClass('sound_selected_next_up');
               $(element + ' .sound_thumbnails li:first-child').addClass('sound_selected_next_down');
               } else {
               $(element + ' .sound_thumbnails li:nth-child(' + (index) + ')').addClass('sound_selected_next_up');
               $(element + ' .sound_thumbnails li:nth-child(' + (index+2) + ')').addClass('sound_selected_next_down');
               }
               */
   },
   init: function(element){
      var list_index = parseInt(element.replace("#slider_",'')) - 1;
      var sounds_index_selected = Scene.cookie.getValue("sounds_index_selected") || [ 0, 0, 0, 0, 0 ];

      var ind_selec = sounds_index_selected[list_index];
      if(ind_selec == 100) ind_selec = 2;

      var data = Scene.soundList["row" + list_index];
      console.log(list_index, data)
         data.content.forEach(function(d, i) {
            $(element + ' .sound_thumbnails li:nth-child(' + (i + 1) + ')').css({
               background: 'url(' + d.img + ')'
                              })
               });

               this.addFocusClasses(element, (-1 * (config.ROTATE_SLIDER_DEG * ind_selec)), ind_selec);
               }
               };

               function positionSoundObject (type, type_index, content_index) {
                  this.type = type;
                  this.type_index = type_index;
                  this.content_index = content_index;
               }

               function SoundListText(language_id){
                  Scene.language.current = language_id;

                  $('.text_sounds').html(text.sounds[Scene.language.current]);
                  $('.text_slider_instructions').html(text.slider_instructions[Scene.language.current]);
                  $("#SceneSoundList p").removeClass("_en").removeClass("_es").addClass(Scene.language.current ? "_es" : "_en");
               }

function previewSound (sound_slider_index) {
   var data = Scene.soundList["row" + sound_slider_index];
   var sounds_index_selected = $("#slider_" + (sound_slider_index + 1) + " .sound_selected").index();

   if(data.type == "video"){
      unbind_keys();
   }

   Scene.player.play(data.content[sounds_index_selected].path, data.type);
}

function createSoundEyes(){
   createEyes(176,101,0.9,8,-6, "#background_layer");
   createEyes(1093,133,0.9,3,22, "#background_layer");
   createEyes(1067,521,1,6,9, "#background_layer");
   createEyes(164,520,0.9,4,4, "#background_layer");
}


Array.prototype.equals = function (array) {
   // if the other array is a falsy value, return
   if (!array)
      return false;

   // compare lengths - can save a lot of time 
   if (this.length != array.length)
      return false;

   for (var i = 0, l=this.length; i < l; i++) {
      // Check if we have nested arrays
      if (this[i] instanceof Array && array[i] instanceof Array) {
         // recurse into the nested arrays
         if (!this[i].equals(array[i]))
            return false;       
      }	else if (this[i] != array[i]) { 
         // Warning - two different object instances will never be equal: {x:20} != {x:20}
         return false;   
      }           
   }       
   return true;
}   
