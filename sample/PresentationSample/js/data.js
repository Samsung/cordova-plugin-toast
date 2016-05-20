/*
	js/data.js - It contains JSON data to be shown at slideshow.

	[JSON data]
	template (title, subtitle, text, image)
	┌──────────────────────────────────────┐
	│common.title / common.subtitle        │
	├─────────────────┬────────────────────┤
	│slide.title      │slide.img           │
	├─────────────────┤                    │
	│slide.text       │                    │
	│                 │                    │
	│                 │                    │
	│                 │                    │
	└─────────────────┴────────────────────┘
*/

var data = {
	toast : {
		common : {
			"title" : "TOAST",
			"subtitle" : "TV Oriented API Simplification for Mul-T-platform"
		},
		slide : 
		[{
			"title" : "Introducing TOAST!",
			"text" : "TV Oriented API Simplification for Mul-T-platform. The Anti-API Fragmentation for Smart TV.",
			"img" : "./img/toast/sample1.PNG"
		},
		{
			"title" : "TOAST Framework",
			"text" : "Technical Concept",
			"img" : "./img/toast/sample2.PNG"
		},
		{
			"title" : "Same result, one code base",
			"text" : "Deliver the same experience in Smart TV with TOAST using fewer lines.",
			"img" : "./img/toast/sample3.PNG"
		},
		{
			"title" : "Github structure",
			"text" : "cordova-plugin-toast",
			"img" : "./img/toast/sample4.PNG"
		},
		{
			"title" : "Github structure",
			"text" : "cordova-sectv-tizen",
			"img" : "./img/toast/sample5.PNG"
		},
		{
			"title" : "Github structure",
			"text" : "cordova-sectv-orsay",
			"img" : "./img/toast/sample6.PNG"
		},
		{
			"title" : "Github structure",
			"text" : "grunt-cordova-sectv",
			"img" : "./img/toast/sample7.PNG"
		}],
		video : 
		[{
			"title" : "samplevideo",
			"url" : "http://media.w3.org/2010/05/sintel/trailer.mp4"
		}]
	}
};