Breakout = {
	Defaults: {
		fps: 13,
		stats: false,
		score: {
			lives: {
				initial: 5,
				max: 10
			}
		},
		court: {
			xchunks: 55,
			ychunks: 36
		},
		ball: {
			radius:  0.3,
			speed:   20, //15
			width: 1,
			height: 1,
			labels: {
				3: { text: 'ready...', fill: '#D82800', stroke: 'black', font: 'bold 28pt arial' },
				2: { text: 'set..',    fill: '#FC9838', stroke: 'black', font: 'bold 28pt arial' },
				1: { text: 'go!',      fill: '#80D010', stroke: 'black', font: 'bold 28pt arial' }
			}
		},
		paddle: {
			width:  8,
			height: 1,
			speed:  30 //20
		},
		color: {
			background: '#34495E',
			foreground: 'green',
			border:     '#222',
			wall:       '#2A3B4C',
			ball:       'white',
			paddle:     '#2DCC70',
			score:      "#FFF",
			highscore:  "#AFD775"
		},
		state: {
			initial: 'menu',
			events: [
				{ name: 'play',    from: 'menu', to: 'game' },
				{ name: 'abandon', from: ['game', 'menu'], to: 'menu' },
				{ name: 'lose',    from: 'game', to: 'menu' }
			]
		},
		keys: [
			{ keys: [tvKey.KEY_LEFT],	mode: 'down',  action: function() { this.paddle.moveLeft();          } },
			{ keys: [tvKey.KEY_RIGHT],	mode: 'down',  action: function() { this.paddle.moveRight();         } },
			{ keys: [tvKey.KEY_LEFT],				   action: function() { this.paddle.stopMovingLeft();    } },
			{ keys: [tvKey.KEY_RIGHT],	       		   action: function() { this.paddle.stopMovingRight();   } },
			{ keys: [tvKey.KEY_ENTER],	state: 'menu', action: function() { this.play();                     } },
			{ keys: [tvKey.KEY_ENTER],	state: 'game', action: function() { this.ball.launchNow();           } },
			{ key:  tvKey.KEY_RETURN,	state: 'game', action: function() { this.abandon();                  } },
			{ key:  tvKey.KEY_RETURN,	state: 'menu', action: function() { this.abandon();                  } },
			{ key:  tvKey.KEY_UP,		state: 'menu', action: function() { this.nextLevel();                } },
			{ key:  tvKey.KEY_DOWN, 	state: 'menu', action: function() { this.prevLevel();                } }
		],
		sounds: {
		}
	},
	initialize: function(runner, cfg) {
		this.cfg     = cfg;
		this.runner  = runner;
		this.width   = runner.width;
		this.height  = runner.height;
		this.storage = runner.storage();
		this.color   = cfg.color;
		this.sound   = (this.storage.sound == "true");
		this.court   = Object.construct(Breakout.Court,  this, cfg.court);
		this.paddle  = Object.construct(Breakout.Paddle, this, cfg.paddle);
		this.ball    = Object.construct(Breakout.Ball,   this, cfg.ball); 
		this.score   = Object.construct(Breakout.Score,  this, cfg.score);
		Game.loadSounds({sounds: cfg.sounds});
		
		console.log(this.court);
	},

	onstartup: function() { 
		this.addEvents();
		this.runner.start();
	},

	addEvents: function() {
		Game.addEvent(this.runner.canvas, 'touchmove',  this.ontouchmove.bind(this));
		Game.addEvent(document.body,      'touchmove',  function(event) { event.preventDefault(); }); // prevent ipad bouncing up and down when finger scrolled
	},

	toggleSound: function() {
		this.storage.sound = this.sound = !this.sound;
	},

	update: function(dt) {
		this.court.update(dt);
		this.paddle.update(dt);
		this.ball.update(dt);
		this.score.update(dt);
	},

	draw: function(ctx) {
		ctx.clearRect(0, 0, this.width, this.height);
		ctx.fillStyle = this.color.background;
		ctx.fillRect(0, 0, this.width, this.height);
		this.court.draw(ctx);
		this.paddle.draw(ctx);
		this.ball.draw(ctx);
		this.score.draw(ctx);
		ctx.restore();
	},

	onresize: function(width, height) {
		this.width  = width;
		this.height = height;
		this.court.resize();
		this.paddle.reset();
		this.ball.reset();
	},

	onmenu: function() {
		this.resetLevel();
		this.paddle.reset();
		this.ball.reset();
		this.refreshDOM();
	},

	ongame: function() {
		this.refreshDOM();
		this.score.reset();
		this.ball.reset({launch: true});
	},

	onlose: function() {
	},

	onleavegame: function() {
		this.score.resetLives();
	},

	onabandon: function() {
		//return this.runner.confirm("Abandon game?")
	},

	loseBall: function() {
		if (this.score.loseLife()) {
			this.lose();
		} else {
			this.ball.reset({
				launch: true,
				lose_ball: true
			});
		}
	},

	winLevel: function() {
		this.playSound('levelup');
		this.score.gainLife();
		this.nextLevel(true);
		this.ball.reset({launch: true});
	},

	hitBrick: function(brick) {
		this.playSound('brick');
		this.court.remove(brick);
		this.score.increase(brick.score);
		this.ball.speed += 10 * (1 - (this.ball.speed / this.ball.maxspeed)); 
		if (this.court.empty()){
			this.winLevel();
		}
	},

	resetLevel: function() { this.setLevel(); },
	setLevel: function(level) {
		level = (typeof level == 'undefined') ? (this.storage.level ? parseInt(this.storage.level) : 0) : level;
		level = level < Breakout.Levels.length ? level : 0;
		this.court.reset(level);
		this.storage.level = this.level = level;
		this.refreshDOM();
	},

	canPrevLevel: function()      { return this.is('menu') && (this.level > 0);                          },
	canNextLevel: function()      { return this.is('menu') && (this.level < (Breakout.Levels.length-1)); },
	prevLevel:    function(force) { if (force || this.canPrevLevel()) this.setLevel(this.level - 1);     },
	nextLevel:    function(force) { if (force || this.canNextLevel()) this.setLevel(this.level + 1);     },

	initCanvas: function(ctx) { 
		ctx.fillStyle    = this.color.foreground;
		ctx.strokeStyle  = this.color.foreground;
		ctx.lineWidth    = 1;
		this.score.measure(ctx);
	},

	refreshDOM: function() {
	},

	playSound: function(id) {
		/*if (soundManager && this.sound) {
			soundManager.play(id);
		}*/
	},

	ontouchmove: function(ev) {
		if (ev.targetTouches.length == 1) {
			this.paddle.place(ev.targetTouches[0].pageX - this.runner.bounds.left - this.paddle.w/2); // clientX only works in ios, not on android - must use pageX - yuck
		}
	},

  // Score
	Score: {

		initialize: function(game, cfg) {
			this.game = game;
			this.cfg  = cfg;
			this.load();
			this.reset();
		},

		reset:    function()  { this.set(0); this.resetLives(); },
		set:      function(n) { this.score = this.vscore = n; this.rerender = true; },
		increase: function(n) { this.score = this.score + n;  this.rerender = true; },
		format:   function(n) { return ("0000000" + n).slice(-7); },
		load:     function()  {},
		save:     function()  {},

		resetLives: function()  { this.setLives(this.cfg.lives.initial);                       }, 
		setLives:   function(n) { this.lives = n; this.rerender = true;                        },
		gainLife:   function()  { this.setLives(Math.min(this.cfg.lives.max, this.lives + 1)); },
		loseLife:   function()  { this.setLives(this.lives-1); return (this.lives == 0);       },
 
		update: function(dt) {
			if (this.vscore < this.score) {
				this.vscore = Math.min(this.score, this.vscore + 10);
				this.rerender = true;
			}
		},

		measure: function(ctx) {
			this.left   = this.game.court.left;
			this.top    = this.game.court.top - this.game.court.wall.size*2;
			this.width  = this.game.court.width;
			this.height = this.game.court.wall.size*2;
			this.scorefont = Math.max(9, this.game.court.wall.size - 2) + "pt Pixelated";
			//ctx.save();
			ctx.font = this.scorefont;
			this.scorewidth = ctx.measureText(this.format(0)).width;
			ctx.restore();
			this.rerender = true;
		},

		draw: function(ctx) {
			if (this.rerender) {
				this.canvas = Game.renderToCanvas(this.width, this.height, this.render.bind(this), this.canvas);
				this.rerender = false;
			}
			ctx.drawImage(this.canvas, this.left, this.top);
		},

		render: function(ctx) {
			var text, width, paddle;
			var ishigh = this.game.is('game') && (this.score > this.highscore);
			
			ctx.translate(0,0);
			ctx.textBaseline = "middle";
			ctx.fillStyle    = this.game.color.score;
			ctx.font         = this.scorefont;
			text             = this.format(this.vscore);
			ctx.fillText(text, 0, this.height/2);

			paddle = {
			game: this.game,
			w:    this.game.court.chunk * 1.5,
			h:    this.game.court.chunk * 2/3
			}
			ctx.translate(this.scorewidth +  this.game.court.chunk*3, (this.height-paddle.h) / 2);
			for(var n = 0 ; n < this.lives ; n++) {
				this.game.paddle.render.call(paddle, ctx);
				ctx.translate(paddle.w + 5, 0);

			}
		}
	},

	// Court
	Court: {

		initialize: function(game, cfg) {
			this.game = game;
			this.cfg  = cfg;
		},
    
		reset: function(level) {
			var layout = Breakout.Levels[level];
			var line, brick, score, c, n, x, y, nx, ny = Math.min(layout.bricks.length, this.cfg.ychunks);
			this.bricks = [];
			for(y = 0 ; y < ny ; y++) {
				score = (this.cfg.ychunks - y) * 5;
				line  = layout.bricks[y] + " ";
				brick = null;
				nx = Math.min(line.length, this.cfg.xchunks + 1);
				for(x = 0 ; x < nx ; x++) {
					c = line[x];
					if (brick && (brick.c == c)) {
						brick.pos.x2 = x;
					} else if (brick && (brick.c != c)) {
						this.bricks.push(brick);
						brick = null;
					}

					if (!brick && (c != ' ')) {
						brick = { isbrick: true, hit: false, c: c, pos: { x1: x, x2: x, y: y }, score: score, color: layout.colors[c.toLowerCase()] };
					}
				}
			}
			this.numbricks = this.bricks.length;
			this.numhits   = 0;
			this.resize();
		},

		resize: function() {
			this.chunk  = Math.floor(this.game.width / 70);
			
			this.width  = this.cfg.xchunks * this.chunk;
			this.height = this.cfg.ychunks * this.chunk;
			
			console.log('chunk: ' + this.chunk + ', chunksy: ' + this.cfg.xchunks);
			
			this.left   = Math.floor((this.game.width  - this.width)  / 2);
			//this.top    = Math.floor((this.game.height - this.height) / 2);
			this.top = 3* this.chunk
			this.right  = this.left + this.width;
			this.bottom = this.top  + this.height;

			this.wall = {}
			this.wall.size  = this.chunk;
			this.wall.top   = Game.Math.bound({x: this.left - this.wall.size, y: this.top - this.wall.size*2, w: this.width + this.wall.size*2, h: this.wall.size*2               });
			this.wall.left  = Game.Math.bound({x: this.left - this.wall.size, y: this.top - this.wall.size*2, w: this.wall.size,                h: this.wall.size*2 + this.height });
			this.wall.right = Game.Math.bound({x: this.right,                 y: this.top - this.wall.size*2, w: this.wall.size,                h: this.wall.size*2 + this.height });

			for (n = 0 ; n < this.numbricks ; n++) {
				brick = this.bricks[n];
				brick.x = this.left + (brick.pos.x1 * this.chunk);
				brick.y = this.top  + (brick.pos.y  * this.chunk);
				brick.w = (brick.pos.x2 - brick.pos.x1 + 1) * this.chunk;
				brick.h = this.chunk;
				Game.Math.bound(brick);
			}
			
			console.log(this.chunk);
			
			this.rerender = true;
		},

		update: function(dt) {
		},

		draw: function(ctx) {
			if (this.rerender) {
				this.canvas = Game.renderToCanvas(this.game.width, this.game.height, this.render.bind(this), this.canvas);
				this.rerender = false;
			}
			ctx.drawImage(this.canvas, 0, 0);
		},

		render: function(ctx) {
			var n, brick;

			ctx.translate(0.5, 0.5); // crisp 1px lines for the brick borders
			ctx.strokeStyle = this.game.color.border;
			ctx.lineWidth = 1;
			for(n = 0 ; n < this.numbricks ; n++) {
				brick = this.bricks[n];
				if (!brick.hit) {
					ctx.fillStyle = brick.color;
					ctx.strokeStyle = brick.color;
					ctx.fillRect(brick.x, brick.y, brick.w, brick.h); 
					ctx.strokeRect(brick.x, brick.y, brick.w, brick.h);
				}
			}
			
			ctx.fillStyle = this.game.color.wall;
			ctx.beginPath();
			ctx.moveTo(this.wall.top.left,     this.wall.top.top);
			ctx.lineTo(this.wall.top.right,    this.wall.top.top);
			ctx.lineTo(this.wall.top.right,    this.wall.right.bottom);
			ctx.lineTo(this.wall.right.left,   this.wall.right.bottom);
			ctx.lineTo(this.wall.right.left,   this.wall.top.bottom);
			ctx.lineTo(this.wall.left.right,   this.wall.top.bottom);
			ctx.lineTo(this.wall.left.right,   this.wall.left.bottom);
			ctx.lineTo(this.wall.left.left,    this.wall.left.bottom);
			ctx.lineTo(this.wall.top.left,     this.wall.top.top);
			ctx.fill();
			ctx.closePath();
			
		},

		remove: function(brick) {
			brick.hit = true;
			this.numhits++;
			this.rerender = true;
		},

		empty: function() {
			return (this.numhits == this.numbricks);
		}
	},

  // Ball
	Ball: {
		initialize: function(game, cfg) {
			this.game = game;
			this.cfg  = cfg;
		},

		reset: function(options) {
			this.radius   = this.cfg.radius * this.game.court.chunk;
			this.speed    = this.cfg.speed  * this.game.court.chunk;
			this.ww   	  = this.cfg.width * this.game.court.chunk;
			this.hh   	  = this.cfg.height * this.game.court.chunk;
			this.maxspeed = this.speed * 1.5;
			this.color    = this.game.color.ball;
			this.moveToPaddle();
			this.setdir(0, 0);
			this.clearLaunch();
			this.hitTargets = [
			this.game.paddle,
			this.game.court.wall.top,
			this.game.court.wall.left,
			this.game.court.wall.right,
			].concat(this.game.court.bricks);
			if (options && options.launch){
				this.launch(options.lose_ball);
			}
		},

		moveToPaddle: function() {
			this.setpos(this.game.paddle.left + (this.game.paddle.w/2), this.game.court.bottom - this.game.paddle.h - this.radius);
		},

		setpos: function(x, y) {
			this.x = x;
			this.y = y;
			Game.Math.bound(this);
		},

		setdir: function(dx, dy) {
			var dir = Game.Math.normalize({ x: dx, y: dy });
			this.dx = dir.x;
			this.dy = dir.y;
			this.moving = dir.m != 0;
		},

		launch: function(options) {
			if(options){
				if (!this.moving || this.countdown) {
					this.countdown = (typeof this.countdown == 'undefined') || (this.countdown == null) ? 2 : this.countdown - 1;
					if (this.countdown > 0) {
						//this.label = this.launchLabel(this.countdown);
						this.delayTimer = setTimeout(this.launch.bind(this), 1000);
						if (this.countdown == 1){
							this.setdir(1, -1); // launch on 'go'
						}
					} else {
						this.clearLaunch();
					}
				}
			} else {
				if (!this.moving) {
						this.setdir(1, -1); // launch on 'go'
				}
			}
		},

		launchNow: function() { // <space> key can override countdown launch
			if (!this.moving) {
				this.clearLaunch();
				this.setdir(1, -1);
			}
		},

		launchLabel: function(count) {
			var label       = this.cfg.labels[count];
			var ctx         = this.game.runner.front2d; // dodgy getting the context this way, should probably have a Game.Runner.ctx() method ?
			//ctx.save();
			ctx.font        = label.font;
			ctx.fillStyle   = label.fill;
			ctx.strokeStyle = label.stroke;
			ctx.lineWidth   = 0.5;
			var width       = ctx.measureText(label.text).width;
			ctx.restore();
			label.x         = this.game.court.left +   (this.game.court.width - width)/2;
			label.y         = this.game.paddle.top - 60;
			
			return label;
		},

		clearLaunch: function() {
			if (this.delayTimer) {
				clearTimeout(this.delayTimer);
				this.delayTimer = this.label = this.countdown = null;
			}
		},

		update: function(dt) {

			if (!this.moving)
				return this.moveToPaddle();

			var p2 = Game.Math.move(this.x, this.y, this.dx * this.speed, this.dy * this.speed, dt);

			var mCurrent, mClosest = Infinity, point, item, closest = null;
			for (var n = 0 ; n < this.hitTargets.length ; n++) {
				item = this.hitTargets[n];
				if (!item.hit) {
					point = Game.Math.ballIntercept(this, item, p2.nx, p2.ny);
					if (point) {
						mCurrent = Game.Math.magnitude(point.x - this.x, point.y - this.y);
						if (mCurrent < mClosest) {
							mClosest = mCurrent;
							closest = {item: item, point: point};
						}
					}
				}
			}

			if (closest) {
				if (closest.item.isbrick) {
					this.game.hitBrick(closest.item);
					if (!this.moving) // if hitBrick caused game to end we dont want to continue updating our state
						return;
				}

				if ((closest.item == this.game.paddle) && (closest.point.d == 'top')) {
					p2.dx = this.speed * (closest.point.x - (this.game.paddle.left + this.game.paddle.w/2)) / (this.game.paddle.w/2);
					this.game.playSound('paddle');
				}

				this.setpos(closest.point.x, closest.point.y);

				switch(closest.point.d) {
					case 'left':
					case 'right':
						this.setdir(-p2.dx, p2.dy);
					break;

					case 'top':
					case 'bottom':
						this.setdir(p2.dx, -p2.dy);
					break;
				}

				var udt = dt * (mClosest / Game.Math.magnitude(p2.nx, p2.ny)); // how far along did we get before intercept ?
				return this.update(dt - udt);                                  // so we can update for time remaining
			}

			if ((p2.x < 0) || (p2.y < 0) || (p2.x > this.game.width) || (p2.y > this.game.height)) {
				this.game.loseBall();
			} else {
				this.setpos(p2.x,  p2.y);
				this.setdir(p2.dx, p2.dy);
			}
		},

		draw: function(ctx) {
			ctx.fillStyle = this.color;
			ctx.beginPath();
			
			ctx.rect(
				this.x -  ((this.cfg.width * this.game.court.chunk)*.4),
				this.y -  ((this.cfg.width * this.game.court.chunk)*.7),
				this.ww,
				this.hh
			);
			
			ctx.fill();
			ctx.closePath();

			if (this.label) {
				ctx.font = this.label.font;
				ctx.fillStyle = this.label.fill;
				ctx.strokeStyle = this.label.stroke;
				ctx.lineWidth = 0.5;
				ctx.fillText(this.label.text,   this.label.x, this.label.y);
				ctx.strokeText(this.label.text, this.label.x, this.label.y);
			}
		}
	},

  // Paddle
	Paddle: {
		initialize: function(game, cfg) {
			this.game = game;
			this.cfg  = cfg;
		},

		reset: function() {
			this.speed  = this.cfg.speed  * this.game.court.chunk;
			this.w      = this.cfg.width  * this.game.court.chunk;
			this.h      = this.cfg.height * this.game.court.chunk;
			this.color  = this.game.color.paddle;
			this.minX   = this.game.court.left;
			this.maxX   = this.game.court.right - this.w;
			this.setpos(Game.random(this.minX, this.maxX), this.game.court.bottom - this.h);
			this.setdir(0);
			this.rerender = true;
		},

		setpos: function(x, y) {
			this.x      = x;
			this.y      = y;
			Game.Math.bound(this);
		},

		setdir: function(dx) {
			this.dleft  = (dx < 0 ? -dx : 0);
			this.dright = (dx > 0 ?  dx : 0);
		},

		place: function(x) {
			this.setpos(Math.min(this.maxX, Math.max(this.minX, x)), this.y);
		},

		update: function(dt) {
			var amount = this.dright - this.dleft;
			if (amount != 0)
			this.place(this.x + (amount * dt * this.speed));
		},

		draw: function(ctx) {
			if (this.rerender) {
				this.canvas = Game.renderToCanvas(this.w, this.h, this.render.bind(this));
				this.rerender = false;
			}
			ctx.drawImage(this.canvas, this.x, this.y);
		},

		render: function(ctx) {
			ctx.fillStyle = this.color;
			ctx.beginPath();
			ctx.moveTo(0,  0);
			ctx.lineTo(this.w, 0);
			ctx.lineTo(this.w, this.h);
			ctx.lineTo(0, this.h);
			ctx.lineTo(0, 0);
			ctx.fill();
			ctx.closePath();
		},

		moveLeft:        function() { this.dleft  = 1; },
		moveRight:       function() { this.dright = 1; },  
		stopMovingLeft:  function() { this.dleft  = 0; },
		stopMovingRight: function() { this.dright = 0; }
	}
};

var breakout_keys = [
			{ keys: [tvKey.KEY_LEFT],	mode: 'down',  action: function() { this.paddle.moveLeft();          } },
			{ keys: [tvKey.KEY_RIGHT],	mode: 'down',  action: function() { this.paddle.moveRight();         } },
			{ keys: [tvKey.KEY_LEFT],				   action: function() { this.paddle.stopMovingLeft();    } },
			{ keys: [tvKey.KEY_RIGHT],	       		   action: function() { this.paddle.stopMovingRight();   } },
			{ keys: [tvKey.KEY_ENTER],	state: 'menu', action: function() { this.play();                     } },
			{ keys: [tvKey.KEY_ENTER],	state: 'game', action: function() { this.ball.launchNow();           } },
			{ key:  tvKey.KEY_RETURN,	state: 'game', action: function() { this.abandon();                  } },
			{ key:  tvKey.KEY_RETURN,	state: 'menu', action: function() { this.abandon();                  } },
			{ key:  tvKey.KEY_UP,		state: 'menu', action: function() { this.nextLevel();                } },
			{ key:  tvKey.KEY_DOWN, 	state: 'menu', action: function() { this.prevLevel();                } }
		];

