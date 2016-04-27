/**Controller for Title state */
SceneManager.Title = (function(){
	var	LOGO_IN_DURATION = 400;
	/**
     * When the transition goes to this State, this will do initializations.
	 * @param  {string} event Name of the event was fired.
	 * @param  {string} from From which state came.
	 * @param  {string} to Name of the actual state.
	 * @param  {any} message Some data for the state.
	 */
	SceneManager.onTitle = function(event, from, to, message){
		$("<div>").load("app/htmls/Title.html", function() {
			if (!$("#SceneTitle").length) {
				$("body").append($(this).html());
			}
			TitleAnimations.in();
		});
	};
	/**
     * When occurs a transition and this state will be left.
	 * @param  {string} event Name of the event was fired.
	 * @param  {string} from Name of this state.
	 * @param  {string} to Name the next state.
	 * @param  {string} message Some messages for the next state.
	 */	
	SceneManager.onleaveTitle = function(event, from, to, message){
		unbind_keys();
		TitleAnimations.out(SceneManager.transition);		
		return StateMachine.ASYNC;
	};
	/**
     * Contains animations when this state is involved in transitions.
     * @typ {Object}
     */	
	var TitleAnimations = {		
		in: function(){
			$("#SceneTitle").addClass("visible");
			animation("#SceneTitle", "fade-in", function(){
				TitleAnimations.logoIn();
			}, config.FADE_IN_DURATION);
		},
		logoIn: function(){
			$("#logo").addClass("visible");
			animation("#logo", "logo-in", function(){
			}, LOGO_IN_DURATION);
		},
		out: function(transition){
            $("#logo").removeClass("visible");
            animation("#SceneTitle", "fade-out", function(){
                $("#SceneTitle").remove();
				transition();
			}, config.FADE_IN_DURATION);
		}
	};
})();
