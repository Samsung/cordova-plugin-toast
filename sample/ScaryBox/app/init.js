
/*Scenes Creation*/
var SceneManager = StateMachine.create({
	events: [
		{name: 'start', from: 'none',   to: 'Disclaimer'},
		{name: 'DisclaimerToTitle', from: 'Disclaimer',   to: 'Title'},
		{name: 'TitleToSoundList', from: 'Title',   to: 'SoundList'},
		{name: 'BlackScreenToFinishScreen', from: 'BlackScreen',   to: 'FinishScreen'},
		{name: 'TitleToBlackScreen', from: 'Title',   to: 'BlackScreen'},
		{name: 'TitleToTutorial', from: 'Title',   to: 'Tutorial'},
		{name: 'BackToSoundList', from: 'FinishScreen',   to: 'SoundList'},
		{name: 'BackToTitle', from: ['BlackScreen','SoundList','FinishScreen'],   to: 'Title'},

	],
	callbacks: {
		onbeforestart: function(event, from, to){
			console.log("STARTING UP"); 
		},
		onstart: function(event, from, to){
			console.log("READY");
		},
		onchangestate: function(event, from, to){
			console.log('TRANSITION: ' + from + ' to ' + to);
			$('#Scene' + to).addClass('focus');
		},
		onafterevent: function(event, from, to){
			console.log('ENTER SCENE: ' + to);
		},
		onleavestate: function(event, from, to){
			unbind_keys();
		}
	}
});

var Tutorial = StateMachine.create({
	events: [
		{name: 'start', from: 'none',   to: 'TutorialBegin'},
		{name: 'TutorialBeginToTitle', from: 'TutorialBegin',   to: 'Title'},
		{name: 'TitleToBlackScreen', from: 'Title',   to: 'BlackScreen'},
		{name: 'BlackScreenToArrowUp', from: 'BlackScreen',   to: 'ArrowUp'},
		{name: 'ArrowUpToArrowRight', from: 'ArrowUp',   to: 'ArrowRight'},
		{name: 'ArrowRightToArrowDown', from: 'ArrowRight',   to: 'ArrowDown'},
		{name: 'ArrowDownToArrowLeft', from: 'ArrowDown',   to: 'ArrowLeft'},
		{name: 'ArrowLeftToEnterKey', from: 'ArrowLeft',   to: 'EnterKey'},
		{name: 'EnterKeyToFinish', from: 'EnterKey',   to: 'Finish'},
		{name: 'fromAlltoExitTutorial', from: [
									'TutorialBegin','Title',
									'BlackScreen','ArrowUp',
									'ArrowRight','ArrowDown',
									'ArrowLeft','EnterKey',
									'Finish'],   to: 'ExitTutorial'},
		{name: 'ReturnToTitle', from: ['Finish','ExitTutorial'],   to: 'TutorialBegin'}

	],
	callbacks: {
		onbeforestart: function(event, from, to){
			console.log("STARTING UP"); 
		},
		onstart: function(event, from, to){
			console.log("READY");
		},
		onchangestate: function(event, from, to){
			console.log('TRANSITION: ' + from + ' to ' + to);
			$('#Scene' + to).addClass('focus');
		},
		onafterevent: function(event, from, to){
			console.log('ENTER SCENE: ' + to);
		},
		onleavestate: function(event, from, to){
			if (!popup_exit.isActive())
				unbind_keys();

			switch(from) {
				case 'ArrowUp':
				case 'ArrowRight':
				case 'ArrowDown':
				case 'ArrowLeft':
					
					var direction = from.replace('Arrow','').toLowerCase();

					move('#tutorialPad .enter_pad > div.arrow_' + direction)
					.set('opacity', .1)
					.duration(config.TUTORIAL_ANIMATION)
					.end(function () {

						$('#tutorialPad .zombieHand').removeClass('upDownHandArrow');
						$('#tutorialPad .zombieHand').removeClass(direction);
						$('#tutorialPad .zombieHand').attr('style','');

						Tutorial.transition();

					});

					return StateMachine.ASYNC;

				break;
				case 'EnterKey':

					$('#tutorialPad .enter_pad').removeClass('center');

					move('#tutorialPad .enter_pad > div.frightality_thumb')
					.set('opacity', 0)
					.duration(config.TUTORIAL_ANIMATION)
					.end(function () {

						$('#tutorialPad .zombieHand').removeClass('upDownHandArrow');
						$('#tutorialPad .zombieHand').removeClass('center');
						$('#tutorialPad .zombieHand').attr('style','');

						setTimeout(function(){
							
							move('#tutorialPad')
							.set('opacity', 0)
							.duration(config.TUTORIAL_ANIMATION)
							.end(function () {
								
								$('#tutorialPad').remove();
								$('#tutorialFinish').css('opacity',1);
								Tutorial.transition();

							});

						},500)

					});

					return StateMachine.ASYNC;

				break
			}
			
		}
	}
});
