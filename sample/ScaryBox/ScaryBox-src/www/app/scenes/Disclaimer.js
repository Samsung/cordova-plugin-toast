var disclaimer_options_list = null;

SceneManager.onDisclaimer = function(event, from, to){

   // Language strings
   Scene.text = DisclaimerText;
   Scene.text(Scene.language.current);
   eyesAnimation();

   setTimeout(function(){
      // Scene lists
      if(!disclaimer_options_list) {
         disclaimer_options_list = new ListFocusManager({
            id: 'disclaimer_options_list',
            infinite: true
         });
      }

      //Intro Animations
      disclaimer_options_list.setIndex(0);
      $('#SceneDisclaimer').addClass('disclaimer_animation_in').addClass('visible').on('webkitAnimationEnd', function(){

         $('#SceneDisclaimer').removeClass('disclaimer_animation_in').off();

         Scene.keys = DisclaimerKeys;
         Scene.keys();
      });
   },500);
};

SceneManager.onleaveDisclaimer = function(event, from, to){

   $('#SceneDisclaimer').addClass('disclaimer_animation_out').on('webkitAnimationEnd', function(){

      $('#SceneDisclaimer').removeClass('disclaimer_animation_out').off().remove();

      setTimeout(function(){
         $('#mainContainer').addClass('fade_in').addClass('visible').on('webkitAnimationEnd', function(){
            $('#mainContainer').removeClass('fade_in').off();
            SceneManager.transition();
         });
      },250);
   });

   return StateMachine.ASYNC;
};

SceneManager.onDisclaimerToTitle = function(event, from, to){
};

function DisclaimerKeys(){

   unbind_keys();

   $(document).keydown(function(e){
      switch (e.keyCode) {
         case tvKey.Enter:
            switch(disclaimer_options_list.getIndex()){
               case 0:
                  SceneManager.DisclaimerToTitle();
                  break;
               case 1:
                  //[TOAST] Terminates current applicaiton using toast application.
                  toast.application.exit();
                  break;
            }
            break;
         case tvKey.ArrowLeft:
            disclaimer_options_list.up();
            break;
         case tvKey.ArrowRight:
            disclaimer_options_list.down();
            break;
         case tvKey.Return:
            toast.application.exit();
            break;
         case tvKey.Exit:
            toast.application.exit();
            break;
      }
   });
}

function DisclaimerText(language_id){

   Scene.language.current = language_id;

   $('.text_warning').html(text.warning[Scene.language.current]);
   $('.text_disclaimer').html(text.disclaimer[Scene.language.current]);
   $('.text_agree').html(text.agree[Scene.language.current]);
   $('.text_exit').html(text.exit[Scene.language.current]);
}
