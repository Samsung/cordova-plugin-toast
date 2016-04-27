/**
 * This have the keycode of the TvKeys.
 * @ {Objects}
 */
var tvKey = {};
/**
 * Contains the main tasks of the app.
 * @ {Object}
 */
var app = {
    /**
     * App initializations.
     */
    initialize: function() {       
        this.bindEvents();
    },
    /**
     * Bind all the common events that are required on startup.
     */
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        document.addEventListener("visibilitychange", this.onVisibilityChange.bind(this), false);
    },
    /**
     * Deviceready Even Handler.
     */
    onDeviceReady: function() {
        toast.inputdevice.getSupportedKeys(function(keys){
            for(var i = 0; i < keys.length; i++)
            {
                switch(keys[i].name)
                {
                case 'ArrowUp':
                    tvKey.KEY_UP = keys[i].code;
                    break;
                case 'ArrowDown':
                    tvKey.KEY_DOWN = keys[i].code;
                    break;
                case 'ArrowLeft':
                    tvKey.KEY_LEFT = keys[i].code;
                    break;
                case 'ArrowRight':
                    tvKey.KEY_RIGHT = keys[i].code;
                    break;
                case 'Enter':
                    tvKey.KEY_ENTER = keys[i].code;
                    break;
                case 'Return':
                    tvKey.KEY_RETURN = keys[i].code;
                    break;
                case 'Exit':
                    tvKey.KEY_EXIT = keys[i].code;
                    toast.inputdevice.registerKey("Exit", function(args) {});
                    break;
                }
            }
        });    
        this.initGame();
    },
    /**
     * Manages the multitasking behavior.
     */
    onVisibilityChange: function() {
        if(document.hidden) {
            this.onPauseApp();
        } else if(SceneManager) {
            /**
             * This timeout is to avoid bad resume for native client on 2015 models,
             * it's applies when the TV have instant on activated and is turned on back .
             */
            setTimeout(this.onResumeApp, 1000);
        }
    },
    /**
     * Pause the game activity.
     */
    onResumeApp: function() {
        window.resumming = true;
        if(SceneManager.current.indexOf('Game') >= 0) {
            if(SceneManager.current.indexOf('Two' >= 0)) {
                player.play(sounds.stage_01_bg_sound,true);
            } else {
                player.play(sounds["stage_0"+(currentLevel.stageIndex+1)+"_bg_sound"],true);
            }
        } else {
            player.play(sounds.game_menu,true);
        }        
    },
    /**
     * Resumes the game activity.
     */
    onPauseApp: function() {
        player.stopAll();
        window.suspending = true;
        if(SceneManager[SceneManager.current] && SceneManager[SceneManager.current].closeTutorial) {
            SceneManager[SceneManager.current].closeTutorial();
        }                        
        if(SceneManager.current != "MainMenu" && SceneManager.current.indexOf('Pause') < 0) {
            triggerKey(tvKey.KEY_RETURN);
        }        
    },
    initGame: function() {
        head.js(
            /*Default Libraries*/
            {Jquery: "app/javascripts/jquery-2.2.3.min.js"},
            {Move: "app/javascripts/move.js"},
            {State_machine: "app/javascripts/state-machine.min.js"},
            {Easeljs: "app/javascripts/easeljs-0.7.1.min.js"},
            {Tweenjs: "app/javascripts/tweenjs-0.5.1.min.js"},
            {Preloadjs: "app/javascripts/preloadjs-0.4.0.min.js"},
            {Player: "app/javascripts/player_nacl.js"},
            /*Common functions*/
            {Common: "app/common.js"},
            {Init: "app/init.js"},            
            /*Easter Egg*/
            {game: "app/javascripts/samsung/game.js"},
            {breakout: "app/javascripts/samsung/breakout.js"},
            {levels: "app/javascripts/samsung/levels.js"},
            /*Scenes functions*/
            {Title: "app/scenes/Title.js"},
            {MainMenu: "app/scenes/MainMenu.js"},
            {EasterEgg: "app/scenes/EasterEgg.js"},
            {ArcadeLevels: "app/scenes/ArcadeLevels.js"},
            {GameStart: "app/scenes/GameStart.js"},
            {GamePause: "app/scenes/GamePause.js"},
            {GameEnd: "app/scenes/GameEnd.js"},
            {TwoPlayersGameStart: "app/scenes/TwoPlayersGameStart.js"},
            {TwoPlayersGamePause: "app/scenes/TwoPlayersGamePause.js"},
            {TwoPlayersGameEnd: "app/scenes/TwoPlayersGameEnd.js"},
            /*Game Functions*/
            {ImageLoader: "app/imageLoader.js"},
            {GameConfig: "app/gameConfig.js"},
            {StageConfig: "app/stages/stageConfig.js"},
            {Stage0: "app/stages/stage0.js"},
            {Stage1: "app/stages/stage1.js"},
            {Stage2: "app/stages/stage2.js"},
            {StagePlayer2_0: "app/stages/stageplayer20.js"},
            {GameEngine: "app/gameEngine.js"},
            {ImageLoader: "app/spriteGenerator.js"},
            /*Language management*/
            {LanguageConfig: "resources/language/languageConfig.js"},   

            function(){
            SceneManager.start();
            // Checks the language of the TV set.
            navigator.globalization.getPreferredLanguage(
                function (language) {
                    if (language.value.indexOf('es') > -1) {
                        $("body").addClass("LANG-ESP");
                        head.js({Esp: "resources/language/esp.js"});
                        window.LANGUAGE.current = window.LANGUAGE.ESP;                              
                    } else {
                        $("body").addClass("LANG-ENG");
                        head.js({Esp: "resources/language/eng.js"});
                        window.LANGUAGE.current = window.LANGUAGE.ENG;                  
                    }    
                }
            );               
            Utils.logger.log("/*----- All scripts has been loaded --------*/");
            player =  new Player_NaCl(playerCallback, "resources/sounds/");
            imageArray.load();  
        });        
    }
};

app.initialize();