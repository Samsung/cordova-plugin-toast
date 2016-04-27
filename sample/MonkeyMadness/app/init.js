/** State Machine instance */
var SceneManager = StateMachine.create({
	events: [
		{name: "start", from: "none",   to: "Title"},
		{name: "TitleToMainMenu", from: "Title",   to: "MainMenu"},
		{name: "MainMenuToArcadeLevels", from: "MainMenu",   to: "ArcadeLevels"},
		{name: "MainMenuToTwoPlayersGameStart", from: "MainMenu",   to: "TwoPlayersGameStart"},
		{name: "MainMenuToEasterEgg", from: "MainMenu",   to: "EasterEgg"},
		{name: "ArcadeLevelsToGameStart", from: "ArcadeLevels",   to: "GameStart"},
		{name: "GameStartToGamePause", from: "GameStart",   to: "GamePause"},
		{name: "GameStartToGameEnd", from: "GameStart",   to: "GameEnd"},
		{name: "GameEndToGameStart", from: "GameEnd",   to: "GameStart"},
		{name: "GamePauseToGameStart", from: "GamePause",   to: "GameStart"},
		{name: "GamePauseToArcadeLevels", from: "GamePause",   to: "ArcadeLevels"},
		{name: "TwoPlayersGameStartToTwoPlayersGamePause", from: "TwoPlayersGameStart",   to: "TwoPlayersGamePause"},
		{name: "TwoPlayersGameStartToTwoPlayersGameEnd", from: "TwoPlayersGameStart",   to: "TwoPlayersGameEnd"},
		{name: "TwoPlayersGamePauseToTwoPlayersGameStart", from: "TwoPlayersGamePause",   to: "TwoPlayersGameStart"},
		{name: "TwoPlayersGameEndToTwoPlayersGameStart", from: "TwoPlayersGameEnd",   to: "TwoPlayersGameStart"},
		{name: "BackToMainMenu", from: ["ArcadeLevels","GamePause","GameEnd","TwoPlayersGameEnd","TwoPlayersGamePause","EasterEgg"],   to: "MainMenu"},
		{name: "BackToArcadeLevels", from: ["GamePause","GameEnd","TwoPlayersGameEnd","TwoPlayersGamePause"],   to: "ArcadeLevels"}
	],
	callbacks: {
		/**
         * Notifies that transition is gonna happen. 
		 * @param  {string} event Events's name that was fired.
		 * @param  {string} from State's name before transition state.
		 * @param  {string} to State's name after transition state.
		 */
		onbeforestart: function (event, from, to) {
			Utils.logger.log("STARTING UP");
		},
		/**
         * Notifies the transition starts.
		 * @param  {string} event Events's name that was fired.
		 * @param  {string} from State's name before transition state.
		 * @param  {string} to State's name after transition state.
		 */
		onstart: function (event, from, to) {
			Utils.logger.log("READY");
		},
		/**
         * Notifies that transition was changed.
		 * @param  {string} event Events's name that was fired.
		 * @param  {string} from State's name before transition state.
		 * @param  {string} to State's name after transition state.
		 */
		onchangestate: function (event, from, to) {
			Utils.logger.log("TRANSITION: " + from + " to " + to);
		},
		/**
         * Notifies the new scene starts.
		 * @param  {string} event Events's name that was fired.
		 * @param  {string} from State's name before transition state.
		 * @param  {string} to State's name after transition state.
		 */
		onafterevent: function (event, from, to) {
			Utils.logger.log("ENTER SCENE: " + to);
		},
		/**
		 * @param  {string} event Events's name that was fired.
		 * @param  {string} from State's name before transition state.
		 * @param  {string} to State's name after transition state.
		 */
		onleavestate: function (event, from, to) {
			unbind_keys();
		}
	}
});
