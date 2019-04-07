/**
 * CI-DESSOUS DES FONCTIONS JS UTILES POUR DES TACHES DIVERSES
 * --------------------------------------------------------------
 * is_loaded()				=> vérifier si un plugin existe dans la page (pour éviter les erreurs quand un plugin est manquant)
 * is_function()			=> vérifier si une fonction existe (pour éviter les erreurs quand une fonction est manquante)
 * getViewport()			=> pour récupérer la dimension (largeur + hauteur) du viewport (viewport = balise html)
 * scroll_sniffer()		=> ajouter une classe sur la balise body quand le scroll est à une certaine distance du haut
 * smartresize()			=> remplace le "resize" de jQuery, exécute le code seulement une fois que l'agrandissement est arrêté
 * scrollEnd()				=> remplace le "scroll" de jQuery, exécute le code seulement une fois quand le scroll est arrêté
 * viewportChecker()	=> un plugin jQuery qui détecte quand un élément rentre dans viewport et lui ajoute une classe.
 * CountUp.js					=> un plugin JS (SANS jQuery) anime des chiffres.
 */



/**
 * FUNCTION "IS JQUERY PLUGIN LOADED ?"
 * --------------------------------------------------------------
 */
function is_loaded(plugin) {
	return !!$.fn[plugin];
}



/**
 * FUNCTION "FUNCTION EXISTS ?"
 * --------------------------------------------------------------
 */
function is_function(function_name) {

	if(typeof function_name == 'function') {
		return true;
	}

	return false;

}



/**
 * GET VIEWPORT Width & Height
 * --------------------------------------------------------------
 * Cross Browser viewport size
 * @return array
 * https://stackoverflow.com/a/2035211
 */
function getViewport() {

	var viewPortWidth;
	var viewPortHeight;

	//the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
	if(typeof window.innerWidth != 'undefined') {
		viewPortWidth = window.innerWidth,
		viewPortHeight = window.innerHeight
	}

	//IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
	else if(typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0) {
		viewPortWidth = document.documentElement.clientWidth,
		viewPortHeight = document.documentElement.clientHeight
	}

	//older versions of IE
	else {
		viewPortWidth = document.getElementsByTagName('body')[0].clientWidth,
		viewPortHeight = document.getElementsByTagName('body')[0].clientHeight
	}

 	VW = viewPortWidth;
	VH = viewPortHeight;

	return [viewPortWidth, viewPortHeight]; //arr

}



/**
 * SCROLL SNIFFER
 * --------------------------------------------------------------
 * Ajoute une classe sur la body en fonction du scroll
 */
function scroll_sniffer(top_distance = 100, element = "body", css_class = "is-scrolled") {

	//Function parameters dfault values - For older browser with no suppour for ECMAScript 2015
	//top_distance	= (typeof top_distance	!== 'undefined') ?  top_distance	: 100;
	//element				= (typeof element				!== 'undefined') ?  element				: "body";
	//css_class			= (typeof css_class			!== 'undefined') ?  css_class			: "is-scrolled";

  //Get scroll position from top
  var current_scroll = $(window).scrollTop();

  //Add/Remove body class "is-scrolled" depending on scroll position
  if(current_scroll >= top_distance) {
    $(element).addClass(css_class);
  }
	else {
    $(element).removeClass(css_class);
  }

}



/**
 * DISABLE / ENABLE SCROLL PLUGINS
 * --------------------------------------------------------------
 * From: http://stackoverflow.com/a/31974498
 */
//DISABLE SCROLL
$.fn.disableScroll = function() {
	var oldScrollPos = $(window).scrollTop();

	$(window).on('scroll.scrolldisabler',function ( event ) {
		 $(window).scrollTop( oldScrollPos );
		 event.preventDefault();
	});
};

//ENABLE SCROLL
$.fn.enableScroll = function() {
	$(window).off('scroll.scrolldisabler');
};



/**
 * SMART RESIZE
 * --------------------------------------------------------------
 * Call a function only once, at resize end
 * http://www.paulirish.com/2009/throttled-smartresize-jquery-event-handler/
 */
(function($, sr){

  //debouncing function from John Hann
  //http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function(func, threshold, execAsap) {

		var timeout;

		return function debounced() {

			var obj = this, args = arguments;

			function delayed () {
				if(!execAsap)
					func.apply(obj, args);
				timeout = null;
			};

			if(timeout)
				clearTimeout(timeout);
			else if(execAsap)
				func.apply(obj, args);

			timeout = setTimeout(delayed, threshold || 100);

		}; //end debounced

  } //end debounce

  //smartresize
  jQuery.fn[sr] = function(fn) { return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');



/**
 * ON END SCROLLING
 * --------------------------------------------------------------
 * Detect when scrolling stops
 * https://stackoverflow.com/a/3701328
 */
$.fn.scrollEnd = function(callback, timeout) {

  $(this).scroll(function() {

    var $this = $(this);

    if($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }

    $this.data('scrollTimeout', setTimeout(callback, timeout));

  });

};



/**
 * jQuery ViewportChecker
 * --------------------------------------------------------------
 * v1.8.8 - 2017-09-25
 * https://github.com/dirkgroenen/jQuery-viewport-checker
 */
!function(a){a.fn.viewportChecker=function(b){var c={classToAdd:"visible",classToRemove:"invisible",classToAddForFullView:"full-visible",removeClassAfterAnimation:!1,offset:100,repeat:!1,invertBottomOffset:!0,callbackFunction:function(a,b){},scrollHorizontal:!1,scrollBox:window};a.extend(c,b);var d=this,e={height:a(c.scrollBox).height(),width:a(c.scrollBox).width()};return this.checkElements=function(){var b,f;c.scrollHorizontal?(b=Math.max(a("html").scrollLeft(),a("body").scrollLeft(),a(window).scrollLeft()),f=b+e.width):(b=Math.max(a("html").scrollTop(),a("body").scrollTop(),a(window).scrollTop()),f=b+e.height),d.each(function(){var d=a(this),g={},h={};if(d.data("vp-add-class")&&(h.classToAdd=d.data("vp-add-class")),d.data("vp-remove-class")&&(h.classToRemove=d.data("vp-remove-class")),d.data("vp-add-class-full-view")&&(h.classToAddForFullView=d.data("vp-add-class-full-view")),d.data("vp-keep-add-class")&&(h.removeClassAfterAnimation=d.data("vp-remove-after-animation")),d.data("vp-offset")&&(h.offset=d.data("vp-offset")),d.data("vp-repeat")&&(h.repeat=d.data("vp-repeat")),d.data("vp-scrollHorizontal")&&(h.scrollHorizontal=d.data("vp-scrollHorizontal")),d.data("vp-invertBottomOffset")&&(h.scrollHorizontal=d.data("vp-invertBottomOffset")),a.extend(g,c),a.extend(g,h),!d.data("vp-animated")||g.repeat){String(g.offset).indexOf("%")>0&&(g.offset=parseInt(g.offset)/100*e.height);var i=g.scrollHorizontal?d.offset().left:d.offset().top,j=g.scrollHorizontal?i+d.width():i+d.height(),k=Math.round(i)+g.offset,l=g.scrollHorizontal?k+d.width():k+d.height();g.invertBottomOffset&&(l-=2*g.offset),k<f&&l>b?(d.removeClass(g.classToRemove),d.addClass(g.classToAdd),g.callbackFunction(d,"add"),j<=f&&i>=b?d.addClass(g.classToAddForFullView):d.removeClass(g.classToAddForFullView),d.data("vp-animated",!0),g.removeClassAfterAnimation&&d.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){d.removeClass(g.classToAdd)})):d.hasClass(g.classToAdd)&&g.repeat&&(d.removeClass(g.classToAdd+" "+g.classToAddForFullView),g.callbackFunction(d,"remove"),d.data("vp-animated",!1))}})},("ontouchstart"in window||"onmsgesturechange"in window)&&a(document).bind("touchmove MSPointerMove pointermove",this.checkElements),a(c.scrollBox).bind("load scroll",this.checkElements),a(window).resize(function(b){e={height:a(c.scrollBox).height(),width:a(c.scrollBox).width()},d.checkElements()}),this.checkElements(),this}}(jQuery);



/**
 * CountUp.js
 * --------------------------------------------------------------
 * v1.9.3
 * https://inorganik.github.io/countUp.js/
 * https://github.com/inorganik/CountUp.js
 */
!function(a,n){"function"==typeof define&&define.amd?define(n):"object"==typeof exports?module.exports=n(require,exports,module):a.CountUp=n()}(this,function(a,n,t){var e=function(a,n,t,e,i,r){function o(a){a=a.toFixed(l.decimals),a+="";var n,t,e,i,r,o;if(n=a.split("."),t=n[0],e=n.length>1?l.options.decimal+n[1]:"",l.options.useGrouping){for(i="",r=0,o=t.length;r<o;++r)0!==r&&r%3===0&&(i=l.options.separator+i),i=t[o-r-1]+i;t=i}return l.options.numerals.length&&(t=t.replace(/[0-9]/g,function(a){return l.options.numerals[+a]}),e=e.replace(/[0-9]/g,function(a){return l.options.numerals[+a]})),l.options.prefix+t+e+l.options.suffix}function u(a,n,t,e){return t*(-Math.pow(2,-10*a/e)+1)*1024/1023+n}function s(a){return"number"==typeof a&&!isNaN(a)}var l=this;if(l.version=function(){return"1.9.2"},l.options={useEasing:!0,useGrouping:!0,separator:",",decimal:".",easingFn:u,formattingFn:o,prefix:"",suffix:"",numerals:[]},r&&"object"==typeof r)for(var m in l.options)r.hasOwnProperty(m)&&null!==r[m]&&(l.options[m]=r[m]);""===l.options.separator?l.options.useGrouping=!1:l.options.separator=""+l.options.separator;for(var d=0,c=["webkit","moz","ms","o"],f=0;f<c.length&&!window.requestAnimationFrame;++f)window.requestAnimationFrame=window[c[f]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[c[f]+"CancelAnimationFrame"]||window[c[f]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(a,n){var t=(new Date).getTime(),e=Math.max(0,16-(t-d)),i=window.setTimeout(function(){a(t+e)},e);return d=t+e,i}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(a){clearTimeout(a)}),l.initialize=function(){return!!l.initialized||(l.error="",l.d="string"==typeof a?document.getElementById(a):a,l.d?(l.startVal=Number(n),l.endVal=Number(t),s(l.startVal)&&s(l.endVal)?(l.decimals=Math.max(0,e||0),l.dec=Math.pow(10,l.decimals),l.duration=1e3*Number(i)||2e3,l.countDown=l.startVal>l.endVal,l.frameVal=l.startVal,l.initialized=!0,!0):(l.error="[CountUp] startVal ("+n+") or endVal ("+t+") is not a number",!1)):(l.error="[CountUp] target is null or undefined",!1))},l.printValue=function(a){var n=l.options.formattingFn(a);"INPUT"===l.d.tagName?this.d.value=n:"text"===l.d.tagName||"tspan"===l.d.tagName?this.d.textContent=n:this.d.innerHTML=n},l.count=function(a){l.startTime||(l.startTime=a),l.timestamp=a;var n=a-l.startTime;l.remaining=l.duration-n,l.options.useEasing?l.countDown?l.frameVal=l.startVal-l.options.easingFn(n,0,l.startVal-l.endVal,l.duration):l.frameVal=l.options.easingFn(n,l.startVal,l.endVal-l.startVal,l.duration):l.countDown?l.frameVal=l.startVal-(l.startVal-l.endVal)*(n/l.duration):l.frameVal=l.startVal+(l.endVal-l.startVal)*(n/l.duration),l.countDown?l.frameVal=l.frameVal<l.endVal?l.endVal:l.frameVal:l.frameVal=l.frameVal>l.endVal?l.endVal:l.frameVal,l.frameVal=Math.round(l.frameVal*l.dec)/l.dec,l.printValue(l.frameVal),n<l.duration?l.rAF=requestAnimationFrame(l.count):l.callback&&l.callback()},l.start=function(a){l.initialize()&&(l.callback=a,l.rAF=requestAnimationFrame(l.count))},l.pauseResume=function(){l.paused?(l.paused=!1,delete l.startTime,l.duration=l.remaining,l.startVal=l.frameVal,requestAnimationFrame(l.count)):(l.paused=!0,cancelAnimationFrame(l.rAF))},l.reset=function(){l.paused=!1,delete l.startTime,l.initialized=!1,l.initialize()&&(cancelAnimationFrame(l.rAF),l.printValue(l.startVal))},l.update=function(a){if(l.initialize()){if(a=Number(a),!s(a))return void(l.error="[CountUp] update() - new endVal is not a number: "+a);l.error="",a!==l.frameVal&&(cancelAnimationFrame(l.rAF),l.paused=!1,delete l.startTime,l.startVal=l.frameVal,l.endVal=a,l.countDown=l.startVal>l.endVal,l.rAF=requestAnimationFrame(l.count))}},l.initialize()&&l.printValue(l.startVal)};return e});
