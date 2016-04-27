Breakout.Colors = {

  arkanoid: {
    w: "#FCFCFC", // white
    o: "#FC7460", // orange
    l: "#3CBCFC", // light blue
    g: "#80D010", // green
    r: "#D82800", // red
    b: "#0070EC", // blue
    p: "#FC74B4", // pink
    y: "#FC9838", // yellow
    s: "#BCBCBC", // silver
    d: "#F0BC3C"  // gold
  },

  pastel: {
    y: "#FFF7A5", // yellow
    p: "#FFA5E0", // pink
    b: "#A5B3FF", // blue
    g: "#BFFFA5", // green
    o: "#FFCBA5"  // orange
  },

  vintage: {
    a: "#EFD279", // yellow
    b: "#95CBE9", // light blue
    c: "#024769", // dark blue
    d: "#AFD775", // light green
    e: "#2C5700", // grass
    f: "#DE9D7F", // red
    g: "#7F9DDE", // purple
    h: "#00572C", // dark green
    i: "#75D7AF", // mint
    j: "#694702", // brown
    k: "#E9CB95", // peach
    l: "#79D2EF"  // blue
  },

  liquidplanner: {
    a: '#62C4E7', // light blue
    b: '#00A5DE', // dark  blue
    x: '#969699', // light gray
    y: '#7B797E'  // dark  gray
  },
  
  atari: {
	p: '#9b59b6', // amethyst
	b: '#3498db', // peter river
	g: '#2ecc71', // emerald
	t: '#1abc9c', // turquoise
	y: '#f1c40f', // sun flower
	r: '#e74c3c', // alizarin
	o: '#e67e22', // carrot
	w: '#EBFFB2' // white
  }
};

Breakout.Levels = [

  { colors: Breakout.Colors.atari,
    bricks: [
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"                   pPpPp pPpP  PpPpP",
		"                   b     b   b   b",
		"                   tTtTt tTtT    t",
		"                       g g   g   g",
		"                   wWwWw w   w   w",
		"",
		"            r   r rRrRr r   r r rRrRr rRrRr",
		"            oo oo o      o o  o o     o   o",
		"            y y y yYyYy   y   y y     y   y",
		"            o   o o      o o  o o     o   o",
		"            w   w wWwWw w   w w wWwWw wWwWw",
		"",
		"       pPpPp pPpPp p   p pPpPp p   p p   p pPpPp",
		"       b     b   b bb bb b     b   b bb  b b",
		"       gGgGg gGgGg g g g gGgGg g   g g g g g gGg",
		"           b b   b b   b     b b   b b  bb b   b",
		"       pPpPp p   p p   p pPpPp pPpPp p   p pPpPp"
    ]
  },
  { colors: Breakout.Colors.atari,
    bricks: [
		"",
		"",
		"",
		"",
		"              gGgGgGgGwWwWwWwWwWrRrRrRrR",
		"            gGgGgGgGgGwWwWwWwWwWrRrRrRrRrR",
		"            gG                          rR",
		"           gG                            rR ",
		"           gG                 wW         rR ",
		"           gG         wWwWwWwWw       rR rR ",
		"           gG        g             RrRrR rR ",
		"           gG          w   w wW rRrRrRrR rR ",
		"           gG      gGg  wWw  wW rRrRrRrR rR ",
		"           gG   gGgGgGw     wW           rR ",
		"           gG gGgGgGgGwW  WwW  wrRrRrRrR rR ",
		"           gG gGgGgGgGwWw  w   wrRrRrRrR rR ",
		"           gG g   GgGgwWwW   w    rRrRrR rR ",
		"           gG          wWwWw wWw     rRr rR ",
		"           gG                wWwrRrR     rR ",
		"           gG                 wWrRrRrR   rR ",
		"           gG                  wrRrRrRrR rR ",
		"           gG                    RrRrRr  rR ",
		"           gG                      rRrR  rR ",
		"           gG                            rR ",
		"            gG                          rR ",
		"            gGgGgGgGgGwWwWwWwWwWrRrRrRrRrR",
		"              gGgGgGgGwWwWwWwWwWrRrRrRrR",
    ]
  }
  /*
	{colors: Breakout.Colors.atari,
	bricks: [
		"                     roOWoRr r",
		"                    oOorop r  r",
		"                   oO R R R  R",
		"                   rOr",
		"               r  r rp               r",
		"              oOor                    r",
		"             oO ",
		"             r",
		"",
		"                          rRrRrRr r",
		"                        rRroOWOorRrR",
		"                      RrRroOWORWOoOR Rr",
		"                     rRroOWOowWOWwWYOoO",
		"                     rRowoOwoywoOowOWOYR",
		"                     roroOoORrROWOWOoror",
		"                    rRORORrprprpoORr rpo",
		"                    rORrRroOWPRrRWRP  ROo",
		"                     rpr rp rRoOROorRrROo",
		"             R      rRrRrRrRrwropoworoOo",
		"             RrRr   roOYOWOROoOWOoOYOowo",
		"             roror  rROwOowywowroOWwoywo",
		"              orRO  rRrRWOowowoOWOoOWROYR",
		"              ROROR rROorowowoOWOoOWROYR",
		"              ROoOR  RrROorwoOWOR    RPOR",
		"               ROor  rROROWROorRrRrRrRrRP",
		"                RrR  RrprRroOPRrRrRrRrROR",
		"                  R    RropoOR R RPRPRRO", 
		"                      Rr  roprRrRrRORORr",
		"                         r rROorRrRPRrR",
		"                             RrRr   ro",
		"                              rprROoOR",
		"                                RPRrR",
		
		
	]
	}
	*/
];


