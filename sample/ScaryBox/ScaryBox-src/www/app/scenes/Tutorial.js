Tutorial.onTutorialBegin = function (event, from, to) {
   $('.messagePointer .enter_icon').removeClass('visible');

   if (from == "Finish" || from == "ExitTutorial") {
      Tutorial.current = 'none';
      title_options_list.setIndex(1);
      Scene.keys = TitleKeys;
      Scene.keys();
   } else {
      console.log("*** TUTORIAL BEGIN ***");

      $("<div>").load("app/htmls/Tutorial.html", function() {
         if (!$('#SceneTutorial').length) {
            $('#dim').before($(this).html());
            setTimeout(function(){ 
               TutorialBegin(); 
            },100);
         }
         else
         TutorialBegin();
      });
   }
}

Tutorial.onleaveTutorialBegin = function (event, from, to) {

   $('#TutorialBegin').addClass('fade_out_to_bottom').on('webkitAnimationEnd', function(){
      $('#TutorialBegin').removeClass('fade_out_to_bottom').removeClass('visible').remove();

      Tutorial.transition();
   });

   return StateMachine.ASYNC;

}

Tutorial.onTitle = function (event, from, to) {

   $('#box.footer').addClass('fallingBox').on('webkitAnimationEnd', function(){
      $(this).addClass("fallen").off();
      $(this).removeClass('fallingBox');

      $(this).addClass('compressed').on('webkitAnimationEnd', function(){

         $(this).removeClass("compressed").off();

         move('#tutorialTitle .text_howToUse')
         .set('opacity', 1)
         .duration(config.TUTORIAL_ANIMATION)
         .end(function () {

            move('#tutorial_title_options_list li.focus')
            .set('opacity', 1)
            .duration(config.TUTORIAL_ANIMATION)
            .end(function () {

               move('#tutorialTitle .zombieHand')
               .set('opacity', 1)
               .duration(config.TUTORIAL_ANIMATION)
               .end(function () {
                  $('#tutorialTitle .zombieHand').addClass('upDownHand');

                  //showDialogBox(text.step_1[Scene.language.current]);
                  showPressEnterDialogBox(text.step_1[Scene.language.current]);

                  // move('#box .message')
                  // .set('opacity', 1)
                  // .duration(config.TUTORIAL_ANIMATION)
                  // .end(function () {

                  Scene.keys = tutorialTitleKeys;
                  Scene.keys();
                  // });
               });
            });
         });
      });
   });
}

Tutorial.onleaveTitle = function (event, from, to) {

   if (to != 'ExitTutorial') {

      mainContainerContent.hide();

      move('#box .box')
         .set('opacity', 0)
         .duration(config.TUTORIAL_ANIMATION)
         .end();

      move('.small-textbox')
         .set('opacity', 0)
         .duration(config.TUTORIAL_ANIMATION)
         .end(function () { $("#tutorialTitle").remove(); Tutorial.transition(); });

      /*
         move('#box .message')
         .set('opacity', 0)
         .duration(config.TUTORIAL_ANIMATION)
         .end();
         */
      move('#tutorialTitle')
         .set('opacity', 0)
         .duration(config.TUTORIAL_ANIMATION)
         .end(function () { $("#tutorialTitle").remove(); Tutorial.transition(); });

      return StateMachine.ASYNC;
   }

}

Tutorial.onBlackScreen = function (event, from, to) {

   /*
      Box animation
      Explaining BlackScreen
      */

   setTimeout(function() {

      $('#tutorialPad').css('background','#000');
      $('#SceneTutorial .footer').css({
         'bottom': 0,
         'right' : '40px'
      });

      move('#box .box')
      .set('opacity', 1)
      .duration(config.TUTORIAL_ANIMATION)
      .end(function () {

         showDialogBox(text.step_2[Scene.language.current]);
         $('#SceneTutorial .text').addClass('blackScreen');
         $('.messagePointer .enter_icon').addClass('visible');

         move('#SceneTutorial .messageTitle')
         .set('opacity', 1)
         .duration(config.TUTORIAL_ANIMATION)
         .end();

      move('#box .message')
         .set('opacity', 1)
         .duration(config.TUTORIAL_ANIMATION)
         .end(function () {

            Scene.keys = tutorialBlackscreenKeys;
            Scene.keys();
         });

      });

   },1500);

}

Tutorial.onleaveBlackScreen = function (event, from, to) {

   move('#SceneTutorial .messageTitle')
      .set('opacity', 0)
      .duration(config.TUTORIAL_ANIMATION)
      .end(function () {
         $("#tutorialBlackScreen").remove(); 
         Tutorial.transition(); 
      });

   return StateMachine.ASYNC;

}

Tutorial.onArrowUp = function (event, from, to) {

   /*
      Show ArrowUp tutorial
      */

   var direction = Tutorial.current.replace('Arrow','').toLowerCase();

   move('#tutorialPad .enter_pad')
      .set('opacity', 1)
      .duration(config.TUTORIAL_ANIMATION)
      .end(function () {

         move('#tutorialPad .commic')
         .set('opacity', 1)
         .duration(config.TUTORIAL_ANIMATION)
         .end(function () {

            $('.messagePointer .enter_icon').removeClass('visible');
            showDialogBox(text.step_3[Scene.language.current]);

            move('#tutorialPad .enter_pad > div.arrow_' + direction)
            .set('opacity', 1)
            .duration(config.TUTORIAL_ANIMATION)
            .end(function () {

               $('#tutorialPad .zombieHand').addClass(direction);

               move('#tutorialPad .zombieHand')
               .set('opacity', 1)
               .duration(config.TUTORIAL_ANIMATION)
               .end(function () {

                  $('#tutorialPad .zombieHand').addClass('upDownHandArrow');

                  Scene.keys = tutorialArrowsKeys;
                  if (!popup_exit.isActive())
                  Scene.keys();

               });

            });

         });

      });

}

Tutorial.onleaveArrowUp = function (event, from, to) {

}

Tutorial.onArrowRight = function (event, from, to) {

   /*
      Show ArrowRight tutorial
      */

   var direction = Tutorial.current.replace('Arrow','').toLowerCase();

   $('#tutorialPad .zombieHand').addClass(direction);

   $('#tutorialPad .image').css('background', "url('images/tutorial/DER_02_01.png') no-repeat center");

   move('#tutorialPad .enter_pad > div.arrow_' + direction)
      .set('opacity', 1)
      .duration(config.TUTORIAL_ANIMATION)
      .end(function () {


         move('#tutorialPad .zombieHand')
         .set('opacity', 1)
         .duration(config.TUTORIAL_ANIMATION)
         .end(function () {

            $('#tutorialPad .zombieHand').addClass('upDownHandArrow');

            if (!popup_exit.isActive())
            Scene.keys();

         });

      });

}

Tutorial.onleaveArrowRight = function (event, from, to) {
}

Tutorial.onArrowDown = function (event, from, to) {

   /*
      Show ArrowDown tutorial
      */

   var direction = Tutorial.current.replace('Arrow','').toLowerCase();

   $('#tutorialPad .zombieHand').addClass(direction);

   $('#tutorialPad .image').css('background', "url('images/tutorial/ABAJO_01.png') no-repeat center");

   move('#tutorialPad .enter_pad > div.arrow_' + direction)
      .set('opacity', 1)
      .duration(config.TUTORIAL_ANIMATION)
      .end(function () {


         move('#tutorialPad .zombieHand')
         .set('opacity', 1)
         .duration(config.TUTORIAL_ANIMATION)
         .end(function () {

            $('#tutorialPad .zombieHand').addClass('upDownHandArrow');

            if (!popup_exit.isActive())
            Scene.keys();

         });

      });

}

Tutorial.onleaveArrowDown = function (event, from, to) {

}

Tutorial.onArrowLeft = function (event, from, to) {

   /*
      Show ArrowLeft tutorial
      */
   var direction = Tutorial.current.replace('Arrow','').toLowerCase();

   $('#tutorialPad .zombieHand').addClass(direction);

   $('#tutorialPad .image').css('background', "url('images/tutorial/IZQ_01.png') no-repeat center");

   move('#tutorialPad .enter_pad > div.arrow_' + direction)
      .set('opacity', 1)
      .duration(config.TUTORIAL_ANIMATION)
      .end(function () {

         move('#tutorialPad .zombieHand')
         .set('opacity', 1)
         .duration(config.TUTORIAL_ANIMATION)
         .end(function () {

            $('#tutorialPad .zombieHand').addClass('upDownHandArrow');

            if (!popup_exit.isActive())
            Scene.keys();

         });

      });

}

Tutorial.onleaveArrowLeft = function (event, from, to) {

}

Tutorial.onEnterKey = function (event, from, to) {

   /*
      Show Enter tutorial
      */

   $('#tutorialPad .zombieHand, #tutorialPad .enter_pad').addClass('center');

   $('#tutorialPad .image').css('background', "url('images/tutorial/ENTER_01.png') no-repeat center");

   move('#tutorialPad .enter_pad > div.frightality_thumb')
      .set('opacity', 1)
      .duration(config.TUTORIAL_ANIMATION)
      .end(function () {

         showDialogBox(text.step_4[Scene.language.current]);

         move('#tutorialPad .zombieHand')
         .set('opacity', 1)
         .duration(config.TUTORIAL_ANIMATION)
         .end(function () {

            $('#tutorialPad .zombieHand').addClass('upDownHandArrow');

            if (!popup_exit.isActive())
            Scene.keys();

         });

      });

}

Tutorial.onFinish = function (event, from, to) {

   /*
      Tutorial Finish
      */

   showDialogBox(text.step_5[Scene.language.current]);
   $('.messagePointer .enter_icon').addClass('visible');
   $('.configuration_button').addClass(Scene.language.languages[Scene.language.current]);

   mainContainerContent.show();
   Scene.keys = tutorialFinishKeys;
   if (!popup_exit.isActive())
      Scene.keys();

}

Tutorial.onExitTutorial = function (event, from, to) {

   /*
      Return keys to title
      */
   console.log('exit ****');
   move('#SceneTutorial')
      .set('opacity', 0)
      .duration(config.TUTORIAL_ANIMATION)
      .end(function(){

         $('#SceneTutorial').remove();

         if ($("#mainContainer").hasClass('hide'))
         mainContainerContent.show();

      Tutorial.ReturnToTitle();

      });

}

Tutorial.onReturnToTitle = function () {
}

function TutorialBegin(){
   TutorialText();

   var actual_index = Scene.cookie.getValue('sounds_index_selected');
   var useInd;
   actual_index.forEach(function(entry, index) {
      useInd = actual_index[index];
      if(useInd == 100){ useInd = 2;}
      $('.thumb_' + (index + 1)).css('background', 'url(' + Scene.soundList['row' + index].content[useInd].img +') center no-repeat');
   });

   setTimeout(function() {
      move('#tutorialTitle')
      .set('opacity', 1)
      .duration(config.TUTORIAL_ANIMATION)
      .end();

   $('#TutorialBegin').addClass('fade_in_from_bottom').addClass('visible').on('webkitAnimationEnd', function(){
      $('#TutorialBegin').removeClass('fade_in_from_bottom').off();

      $('.focus').removeClass('focus');
      title_options_list.setIndex(1);
      $('#tutorialTitle #tutorial_title_options_list li:nth-child(2)').addClass('focus');

      move('#TutorialBegin .text_scareFriends').set('opacity', 1).duration('.5s').end(function () {
         setTimeout(function () {
            $('#TutorialBegin #tutorial-logo').addClass('logo_in_animation').addClass('visible').on('webkitAnimationEnd', function(){
               $(this).off();
               setTimeout(function(){ 
                  Tutorial.TutorialBeginToTitle(); 
               },1500);
            });
         },400);
      });
   });
   },400);
}

function tutorialTitleKeys(){

   unbind_keys();

   $(document).keydown(function(e) {
      switch (e.keyCode) {
         case tvKey.Enter:
            buttonPressedAnimation('#title_options_list > li:nth-child(1)');
            Tutorial.TitleToBlackScreen();
            break;
         case tvKey.Return:
            popup_exit_tutorial.show();
            break;
         case tvKey.Exit:
            popup_exit.show();
            Scene.lastList = '';
            break;
      }
   });
}

function tutorialBlackscreenKeys(){

   unbind_keys();

   $(document).keydown(function(e) {
      switch (e.keyCode) {
         case tvKey.Enter:
            Tutorial.BlackScreenToArrowUp(); 
            break;
         case tvKey.Return:
            popup_exit_tutorial.show();
            break;
         case tvKey.Exit:
            popup_exit.show();
            Scene.lastList = '';
            break;
      }
   });

}

function tutorialArrowsKeys(){

   unbind_keys();

   $(document).keydown(function(e){
      switch (e.keyCode) {
         case tvKey.ArrowUp:
            if (!Scene.player.isPlaying() && Tutorial.current == "ArrowUp") {
               var data = Scene.cookie.getValue('sounds_index_selected')[1];
               var path = Scene.soundList["row1"].content[data].path;
               var type = Scene.soundList["row1"].type;

               Scene.player.play(path,type,tutorialArrowsBufferCallback, tutorialArrowsCallback);

               move('#tutorialPad .zombieHand')
      .set('opacity', 0)
      .duration(config.TUTORIAL_ANIMATION)
      .end();

            }
            break;
         case tvKey.ArrowRight:
            if (!Scene.player.isPlaying() && Tutorial.current == "ArrowRight") {
               var data = Scene.cookie.getValue('sounds_index_selected')[3];
               var path = Scene.soundList["row3"].content[data].path;
               var type = 'audio';

               Scene.player.play(path,type,tutorialArrowsBufferCallback, tutorialArrowsCallback);

               move('#tutorialPad .zombieHand')
                  .set('opacity', 0)
                  .duration(config.TUTORIAL_ANIMATION)
                  .end();

            }
            break;
         case tvKey.ArrowDown:
            if (!Scene.player.isPlaying() && Tutorial.current == "ArrowDown") {
               var data = Scene.cookie.getValue('sounds_index_selected')[2];
               var path = Scene.soundList["row2"].content[data].path;
               var type = Scene.soundList["row2"].type;

               Scene.player.play(path,type,tutorialArrowsBufferCallback, tutorialArrowsCallback);

               move('#tutorialPad .zombieHand')
                  .set('opacity', 0)
                  .duration(config.TUTORIAL_ANIMATION)
                  .end();

            }
            break;
         case tvKey.ArrowLeft:
            if (!Scene.player.isPlaying() && Tutorial.current == "ArrowLeft") {
               var data = Scene.cookie.getValue('sounds_index_selected')[0];
               var path = Scene.soundList["row0"].content[data].path;
               var type = Scene.soundList["row0"].type;

               Scene.player.play(path,type,tutorialArrowsBufferCallback, tutorialArrowsCallback);

               move('#tutorialPad .zombieHand')
                  .set('opacity', 0)
                  .duration(config.TUTORIAL_ANIMATION)
                  .end();

            }
            break;
         case tvKey.Enter:
            if (!Scene.player.isPlaying() && Tutorial.current == "EnterKey") {
               var data = Scene.cookie.getValue('sounds_index_selected')[4];
               if(data == 100){ data = 2; }
               var path = Scene.soundList["row4"].content[data].path;
               var type = 'audio'; 

               Scene.player.play(path,type,tutorialArrowsBufferCallback, tutorialArrowsCallback);

               move('#tutorialPad .zombieHand')
                  .set('opacity', 0)
                  .duration(config.TUTORIAL_ANIMATION)
                  .end();

            }
            break;
         case tvKey.Return:
            if (!Scene.player.isPlaying()) {
               popup_exit_tutorial.show();
            }
            break;
         case tvKey.Exit:
            popup_exit.show();
            Scene.lastList = '';
            break;
      }
   });

}

function tutorialArrowsBufferCallback () {

   var time = 400;
   switch (Tutorial.current) {
      case "ArrowUp":

         setTimeout(function(){

            $('#tutorialPad .image').css('background', "url('images/tutorial/ARRIBA_01_02.png') no-repeat center");

            move('#tutorialPad .redBar')
            .set('height', '37px')
            .duration(config.TUTORIAL_ANIMATION)
            .end(function() {

               move('#tutorialPad .smileys > div:nth-child(5)')
               .set('opacity', 1)
               .duration(config.TUTORIAL_ANIMATION)
               .end();

            });

         },time);

         break;
      case "ArrowRight":
         setTimeout(function(){

            $('#tutorialPad .image').css('background', "url('images/tutorial/DER_02_02.png') no-repeat center");

            move('#tutorialPad .redBar')
            .set('height', '100px')
            .duration(config.TUTORIAL_ANIMATION)
            .end(function() {

               move('#tutorialPad .smileys > div:nth-child(4)')
               .set('opacity', 1)
               .duration(config.TUTORIAL_ANIMATION)
               .end();

            });


         },time);
         break;
      case "ArrowDown":
         setTimeout(function(){

            $('#tutorialPad .image').css('background', "url('images/tutorial/ABAJO_02.png') no-repeat center");

            move('#tutorialPad .redBar')
            .set('height', '170px')
            .duration(config.TUTORIAL_ANIMATION)
            .end(function() {

               move('#tutorialPad .smileys > div:nth-child(3)')
               .set('opacity', 1)
               .duration(config.TUTORIAL_ANIMATION)
               .end();

            });

         },time);
         break;
      case "ArrowLeft":
         setTimeout(function(){

            $('#tutorialPad .image').css('background', "url('images/tutorial/IZQ_02.png') no-repeat center");

            move('#tutorialPad .redBar')
            .set('height', '241px')
            .duration(config.TUTORIAL_ANIMATION)
            .end(function() {

               move('#tutorialPad .smileys > div:nth-child(2)')
               .set('opacity', 1)
               .duration(config.TUTORIAL_ANIMATION)
               .end();

            });

         },time);
         break;
      case "EnterKey":
         setTimeout(function(){

            $('#tutorialPad .image').css('background', "url('images/tutorial/ENTER_02.png') no-repeat center");

            move('#tutorialPad .redBar')
            .set('height', '300px')
            .duration(config.TUTORIAL_ANIMATION)
            .end(function() {

               $('#tutorialPad .topBar').css('opacity',1);

               move('#tutorialPad .smileys > div:nth-child(1)')
               .set('opacity', 1)
               .duration(config.TUTORIAL_ANIMATION)
               .end();

            });

         },time);
         break;
   }

}

function tutorialArrowsCallback () {

   Scene.player.isPlaying(false);
   switch (Tutorial.current) {
      case "ArrowUp":
         Tutorial.ArrowUpToArrowRight();
         break;
      case "ArrowRight":
         Tutorial.ArrowRightToArrowDown();
         break;
      case "ArrowDown":
         Tutorial.ArrowDownToArrowLeft();
         break;
      case "ArrowLeft":
         Tutorial.ArrowLeftToEnterKey();
         break;
      case "EnterKey":
         Tutorial.EnterKeyToFinish();
         break;
   }

}

function tutorialFinishKeys () {

   unbind_keys();

   $(document).keydown(function(e) {
      switch (e.keyCode) {
         case tvKey.Enter:
            //Tutorial.ReturnToTitle();
            Tutorial.fromAlltoExitTutorial();
            break;
         case tvKey.Return:
            popup_exit_tutorial.show();
            break;
         case tvKey.Exit:
            popup_exit.show();
            Scene.lastList = '';
            break;
      }
   });

}

function showPressEnterDialogBox(msg) {
   $('.small-textbox .text').html(msg);
   $('.small-textbox').addClass('visible');
   $('.small-textbox').addClass('dialog_animation').on('webkitAnimationEnd', function(){
      $('.small-textbox').removeClass('dialog_animation').off();
   });
}

function showDialogBox(msg){

   $('.messageContent .text').html(msg);

   $('#SceneTutorial .big-textbox').addClass('visible');
   $('#SceneTutorial .big-textbox').addClass('dialog_animation').on('webkitAnimationEnd', function(){
      $('.messageContent').removeClass('dialog_animation').off();
   });

   $('.messageContent').addClass('dialog_animation').on('webkitAnimationEnd', function(){
      $('.messageContent').removeClass('dialog_animation').off();
   });
   $('#box .box').addClass('talking_animation').on('webkitAnimationEnd', function(){
      $('#box .box').removeClass('talking_animation').off();
   });
}

function TutorialText (language_id) {
   var 	SPANISH = 1,
         ENGLISH = 0;

   Scene.language.current = language_id || Scene.language.current;

   $('.text_scareFriends').html(text.scareFriends[Scene.language.current]);
   $('.text_howToUse').html(text.howToUse[Scene.language.current]);
   $('.text_start').html(text.start[Scene.language.current]);

   //$('#box .messageTitle').html(text.attention[Scene.language.current]);

   if (Scene.language.current === SPANISH) {
      $('.messageTitle').addClass('attention-text-spanish');
   } else if (Scene.language.current === ENGLISH) {
      $('.messageTitle').addClass('attention-text-english');
   }

   $('#tutorialFinish .finishTutorial').html(text.finishTutorial[Scene.language.current]);
   $("#tutorial_title_options_list, #tutorial-logo").removeClass("_en").removeClass("_es").addClass(Scene.language.current ? "_es" : "_en");
}
