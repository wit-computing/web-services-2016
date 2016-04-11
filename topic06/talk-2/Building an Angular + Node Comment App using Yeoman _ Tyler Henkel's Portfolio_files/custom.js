function init_elements_on_ready(){

	/* Responsive videos */

	jQuery("body").fitVids();

	/* Content box */

	jQuery('.content-box-toggle').each(function(){
		
		var content_box = jQuery(this).parents('.content-box');
		var content_box_content = content_box.find('.content-box-content');
		
		content_box_content.height(content_box_content.height());
		
		if(content_box.hasClass('content-box-toggle-state-closed')){
			content_box.find('.content-box-content').hide();
		}else{
			content_box.addClass('content-box-toggle-state-open');
			content_box.find('.content-box-toggle').removeClass('icon-caret-up').addClass('icon-caret-down');
		}		
		
	});
	
	jQuery('.content-box-toggle-state-open .content-box-title').live('click', function(e){
		
		e.preventDefault();
		
		var content_box = jQuery(this).parents('.content-box');
		content_box.find('.content-box-content').slideUp(200);
		
		content_box.removeClass('content-box-toggle-state-open').addClass('content-box-toggle-state-closed');
		content_box.find('.content-box-toggle').removeClass('icon-caret-down').addClass('icon-caret-up');
		
	});
	
	jQuery('.content-box-toggle-state-closed .content-box-title').live('click', function(e){
		
		e.preventDefault();
		
		var content_box = jQuery(this).parents('.content-box');
		content_box.find('.content-box-content').slideDown(200);
		
		if(jQuery(this).parents('.accordion').length){
			content_box.siblings('.content-box.content-box-toggle-state-open').find('.content-box-toggle').click();
		}
		
		content_box.removeClass('content-box-toggle-state-closed').addClass('content-box-toggle-state-open');
		content_box.find('.content-box-toggle').removeClass('icon-caret-up').addClass('icon-caret-down');
		
	});

	/* Skills */

	jQuery('.skills').waypoint({
		triggerOnce : true,
		offset: '90%',
		handler: function(direction){

			jQuery('li', this).each(function(){

				var skill_color = '#' + jQuery(this).data('color');
				var skill_amount = jQuery(this).data('amount') + '%';

				jQuery(this).prepend('<span class="skill-loading"></span>');
				jQuery('.skill-loading', this).css({ 'background-color' : skill_color }).animate({ width : skill_amount }, 2000);

			});

		}
	});

}

function init_elements_on_load(){

	/*
	* Slider - Flexslider
	* 
	* vars
	*	- autoplay (slideshowSpeed as int and slideshow to true)
	*	- loop (animationLoop true|false)
	*	- animation (animation fade|slide)
	*/
	
	jQuery('.slider-container').each(function(){

		/* Default values */
		var def = {
			autoplay: false,
			loop: false,
			autoplaybar: true,
			animation: 'slide',
			arrows: true
		};
		
		/* User values */
		var usr = {
			autoplay: jQuery(this).data('autoplay'),
			autoplaybar: jQuery(this).data('autoplaybar'),
			loop: jQuery(this).data('loop'),
			animation: jQuery(this).data('animation'),
			arrows: jQuery(this).data('arrows')
		};
		
		/* Merge values */
		var opts = jQuery.extend({}, def, usr);
		
		/* Other vars */
		var autoplay_state = opts.autoplay != false ? true : false;
		
		/* Arrows */
		if(opts.arrows == false){
			jQuery(this).addClass('slider-arrows-disabled');
		}
		
		if(opts.autoplaybar == true && autoplay_state == true){
			var slider_loader = jQuery(this).find('.slider-loader-inner');
			slider_loader.parent().show();
		}
		
		/* Find out the width */
		var slide_width = jQuery(this).width();

		/* Init slider */
		jQuery(this).find('.flexslider').flexslider({
			animation: opts.animation,
			slideshow: autoplay_state,
			slideshowSpeed: parseInt(opts.autoplay),
			controlNav: false,
			itemWidth: slide_width,
			animationLoop: opts.loop,
			smoothHeight: true,
			prevText: '<span class="icon-chevron-left"></span>',
			nextText: '<span class="icon-chevron-right"></span>'
		});

		if( jQuery(this).find('.slides li:not(.clone)').length < 2 ){
			jQuery(this).find('.slider-prev, .slider-next').remove();
		}
		
	});

}


jQuery(document).ready(function($){

	init_elements_on_ready();

	/* Link hover (only if the direct parent is a div or paragraph) */
	$('div > a, p > a').live('mouseenter', function(){
		$(this).addClass('hover');
	}).live('mouseleave', function(){
		$(this).removeClass('hover');
	});

	/* Placeholder support for IE */
	
	if ($.browser.msie) {
		Placeholder.init();	
	}

	/* Navigation */

	$('ul.sf-menu').superfish({
		autoArrows	: false,
		animation	: { opacity:'show' },
		speed		: 'fast',
		disableHI	: true,
		delay		: 100
	}); 

	/* Contact form */

	$('input[type=text], textarea').focus(function(){
		
		var input_placeholder = $(this).data('placeholder');
		var input_value = $(this).val();

		if(input_placeholder == input_value){
			$(this).val('');
		}

	}).blur(function(){

		var input_placeholder = $(this).data('placeholder');
		var input_value = $(this).val();

		if(input_value == ''){
			$(this).val(input_placeholder);
		}

	});

	/* Portfolio hover */

	$('.portfolio-post-older, .portfolio-post-newer').live('mouseenter', function(){

		var resize_to_width = $('h3', this).width() + 30;

		$(this).stop().animate({ width : resize_to_width }, 300);
		$('h3', this).stop().animate({ opacity : 1 }, 300);

	}).live('mouseleave', function(){

		$(this).stop().animate({ width : 15 }, 300);
		$('h3', this).stop().animate({ opacity : 0 }, 300);

	});

	/* Portfolio Filter (transparency) */

	$('.page-template-template-portfolio-php.portfolio-posts-filter-style-transparent .portfolio-filters a, .home.homepage-projects-filter-style-transparent .portfolio-filters a').on('click', function(e){

		e.preventDefault();

		var filter_cat = $(this).data('cat');

		$('.active', '.portfolio-filters').removeClass('active');
		$(this).addClass('active');

		$('img, .portfolio-post-title, .portfolio-post-categories, .portfolio-post-thumb-overlay', '.portfolio-post').css({ opacity : 0 });
		$('.portfolio-post[data-cats~="' + filter_cat + '"]').find('img, .portfolio-post-title, .portfolio-post-categories, .portfolio-post-thumb-overlay').css({ opacity : 1 });

	});

	/* Portfolio Filter (animated) */

	// if body has class animated
	window.quicksand_data = $('.portfolio-posts').clone();

	$('.page-template-template-portfolio-php.portfolio-posts-filter-style-animated .portfolio-filters a, .home.homepage-projects-filter-style-animated .portfolio-filters a').on('click', function(e){

		e.preventDefault();

		var filter_cat = $(this).data('cat');

		$('.active', '.portfolio-filters').removeClass('active');
		$(this).addClass('active');
		
		var full_width = 1;
		
		if($('.portfolio-posts .portfolio-post').hasClass('one-fourth')){
			var item_width = 0.25;
		}else if($('.portfolio-posts .portfolio-post').hasClass('one-third')){
			var item_width = 0.33;
		}else if($('.portfolio-posts .portfolio-post').hasClass('one-half')){
			var item_width = 0.5;
		}else{
			var item_width = full_width;
		}
		
		var item_last = Math.round(full_width/item_width);
		var item_first = item_last + 1;		
	
		if(filter_cat == 'all'){ 
			var filtered_data = quicksand_data.find('.portfolio-post');
		}else{
			var data_new = quicksand_data.clone();
			$(data_new).find('.portfolio-post').removeClass('last clear').not('[data-cats~="' + filter_cat + '"]').remove();
			$(data_new).find('.portfolio-post:nth-child(' + item_last + 'n)').addClass('last').next('.portfolio-post').addClass('clear');
			var filtered_data = $(data_new).find('.portfolio-post');
		}

		$('.portfolio-posts').quicksand(filtered_data, { 
			
			duration: 700,
			easing: 'jswing',
			adjustHeight : 'dynamic'
			
		}, function(){
			init_elements_on_ready();
		});
		
	});

	/* Portfolio AJAX Open Project */

	$('.home.homepage-project-ajax-enabled .portfolio-post-thumb a, .home.homepage-project-ajax-enabled .portfolio-post-title a, .page-template-template-portfolio-php.portfolio-posts-ajax-enabled .portfolio-post-thumb a, .page-template-template-portfolio-php.portfolio-posts-ajax-enabled .portfolio-post-title a, #featured-project .portfolio-post-newer, #featured-project .portfolio-post-older').live('click', function(e){

		e.preventDefault();

		var project_link = $(this).attr('href');
		var project_link_path = project_link + ' #main .wrap';

		/* Set active */
		$('.portfolio-post-thumb.active').removeClass('active').find('.portfolio-post-thumb-overlay-viewing').hide().end().find('.portfolio-post-thumb-overlay-view').show();
		$('.portfolio-post-thumb').has('a[href="' + project_link + '"]').addClass('active').find('.portfolio-post-thumb-overlay-view').hide().end().find('.portfolio-post-thumb-overlay-loading').show();

		/* Scroll to top */
		$('html').animate({scrollTop: $('#header').outerHeight() }, 500);
		$('body').animate({scrollTop: $('#header').outerHeight() }, 500);

		/* Slide up -> Show new -> Slide down */
		$('#featured-project').slideUp(500, function(){
			$(this).load(project_link_path, function() {
				if($('#featured-project img').length){
					$('#featured-project img').load(function() {
						$('.portfolio-post-thumb.active').find('.portfolio-post-thumb-overlay-loading').hide().end().find('.portfolio-post-thumb-overlay-viewing').show();
						$('#featured-project').slideDown(600);
						init_elements_on_ready();
					});
				}else{
					$('.portfolio-post-thumb.active').find('.portfolio-post-thumb-overlay-loading').hide().end().find('.portfolio-post-thumb-overlay-viewing').show();
					$('#featured-project').slideDown(600);
					init_elements_on_ready();
				}
			});
		});

	});

	/* Portfolio AJAX Close Project */
	$('.portfolio-post-close').live('click', function(e){

		e.preventDefault();

		/* Scroll to top */
		$('html').animate({scrollTop: $('#header').outerHeight() }, 500);
		$('body').animate({scrollTop: $('#header').outerHeight() }, 500);
		
		$('#featured-project').slideUp(500, function(){ 
			$(this).html('');
		});

		$('.portfolio-post-thumb.active').removeClass('active');

	});

	/* Mobile Navigation */

	$('#mobile-navigation select').change(function() {
		window.location = $(this).val();
	});

	/* Remove WP generated width and height atts */
	
	$('img').each(function(){
		$(this).removeAttr('width')
		$(this).removeAttr('height');
	});


});

jQuery(window).load(function(){

	init_elements_on_load();

});