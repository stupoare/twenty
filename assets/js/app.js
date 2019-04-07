/* ATTENTION !
   CETTE PAGE UTILISE jQuery ET LES FONCTIONS DU FICHIER "functions.js"
   VEILLEZ A INSERER "jQuery" et "functions.js" AVANT D'UTILISER LES SCRIPTS CI-DESSOUS
*/


/**
 * jQuery
 * --------------------------------------------------------------
 * On document ready, do this...
 * Avant d'utiliser le code ci-dessous il faut installer jQuery !
 */
/*START jQuery Code*/
$(function() {
	
	
	/* CONDITIONAL VARS
	-----------------------------------------------------*/
	var is_index = $("#index")[0];
	
	
	/* OPEN/CLOSE MENU ON CLICK
	-----------------------------------------------------*/
	// OPEN MENU
	$("#open-menu").on("click", function(e) {

		$("#header").addClass("menu-is-open");
		$(window).disableScroll();
		
	});
	
	
	// CLOSE MENU
	$("#close-menu").on("click", function(e) {
		
		$("#header").removeClass("menu-is-open");
		$(window).enableScroll();
		
	});
	


  /* ON SCROLL (SMART !)
   * Ajoute une classe "is-scrolled" quand le scroll est >= 100px
   * Utilisé pour la démo "header-fixe-flexible-on-scroll.html"
  -----------------------------------------------------*/
  // If le plugin "scrollEnd" existe ET la page courante est "index.html"
  if(is_loaded("scrollEnd") && is_index) {

		//Quand on a fini avec le scroll
    $(window).scrollEnd(function() {

			scroll_sniffer();

  	}, 36); //36 => millisecondes avant que l'action se déclenche

  } //END ON SCROLL END
	
	
});