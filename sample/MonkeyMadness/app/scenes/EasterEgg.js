/**
 * Instance of a secret game.
 */
var game;
/**
 * When the transition goes to this State, this will do initializations.
 * @param  {string} event Name of the event was fired.
 * @param  {string} from From which state came.
 * @param  {string} to Name of the actual state.
 * @param  {any} message Some data for the state.
 */
SceneManager.onEasterEgg = function(event, from, to) {
	$('#canvasdiv').css({'z-index':'1','background':'#34495E'});
	game = Game.start(function(){
		unbind_keys();		
		$('#canvasdiv').addClass('e_out').on('webkitAnimationEnd', function(){			
			$('#canvasdiv').removeClass('e_out').css('visibility', 'hidden').off();
			game = Game.stop(game);
			$('#canvasdiv').css({'z-index':'0','background':''});
			Breakout.Defaults.keys = null;
			SceneManager.BackToMainMenu();
		});
	});
}
/**
 * Bind the behavior for keydown in this state.
 */	
function EasterEggKeys(){
	unbind_keys();	
	$(document).keydown(function(e){
		switch (e.keyCode) {
			case tvKey.KEY_RETURN:
				break;
		}
	});
}