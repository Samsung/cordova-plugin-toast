SceneManager.onFinishScreen = function(event, from, to){
   $("<div>").load("app/htmls/FinishScreen.html", function() {
      if (!$('#SceneFinishScreen').length) {
         $("#blackscreenContainer").append($(this).html());
      }

      // Language strings
      Scene.text = FinishScreenText;
      Scene.text(Scene.language.current);

      $('#SceneFinishScreen').addClass('flickering').addClass('visible');
      $('#mainContainer, #mainContainer .visible').removeClass('visible').removeClass('hide');

      setTimeout(function(){
         $('#logo_finish > div:first-child').addClass('fade_in_slow').addClass('visible');
         $('#logo_finish').addClass('zoom_in_slow');
      },1200);

      setTimeout(function(){
         $('#logo_finish > div:last-child').addClass('fade_in_slow').addClass('visible').on('webkitAnimationEnd', function(){
            $('#logo_finish > div').removeClass('fade_in_slow').off();

            setTimeout(function(){
               $('#logo_finish').removeClass('zoom_in_slow').addClass('finish_logo_animation').on('webkitAnimationEnd', function(){
                  $('#finish_title').addClass('fade_in').addClass('visible').on('webkitAnimationEnd', function(){
                     $('#finish_buttons').addClass('fade_in_from_bottom').addClass('visible');

                     $('#SceneFinishScreen').removeClass('flickering');

                     Scene.keys = FinishScreenKeys;
                     Scene.keys();
                  });
               });
            },700);
         });
      },2000);
   });
};

SceneManager.onleaveFinishScreen = function(event, from, to){
   Scene.player.stop();
   move('#SceneFinishScreen')
      .set('opacity',0)
      .duration('.5s')
      .ease('in-out-')
      .end(function(){
         $('#SceneFinishScreen, #SceneFinishScreen .visible').removeClass('visible');

         $('#SceneFinishScreen').remove();

         setTimeout(function(){
            $('#mainContainer').addClass('fade_in').addClass('visible').on('webkitAnimationEnd', function(){
               $('#mainContainer').removeClass('fade_in').off();
               SceneManager.transition();
            });
         },250);
      });

   return StateMachine.ASYNC;
};

function FinishScreenKeys(){

   unbind_keys();

   $(document).keydown(function(e){
      switch (e.keyCode) {
         /*case tvKey.Enter:
           $('#button_main_menu > div').addClass('press');
           setTimeout(function(){$('#button_main_menu > div').removeClass('press');},100);
           SceneManager.BackToTitle();
           break;
           */
         case tvKey.Return:
         case tvKey.Enter:
            //$('#button_scare_again > div').addClass('press');
            //setTimeout(function(){$('#button_scare_again > div').removeClass('press');},100);
            SceneManager.BackToTitle();
            break;
         case tvKey.Exit:
            popup_exit.show();
            Scene.lastList = false;
            break;
      }
   });
}

function FinishScreenText(language_id){

   Scene.language.current = language_id;
   $('.text_finish_title').html(text.final_joke[Math.floor(Math.random() * text.final_joke.length)][Scene.language.current]);
   $('.text_scare_again').html(text.scare_again[Scene.language.current]);
   $('.text_main_menu').html(text.main_menu[Scene.language.current]);

   $("#logo_finish").removeClass("_en").removeClass("_es").addClass(Scene.language.current ? "_es" : "_en");
   $('#button_scare_again > div').addClass('press');
}
