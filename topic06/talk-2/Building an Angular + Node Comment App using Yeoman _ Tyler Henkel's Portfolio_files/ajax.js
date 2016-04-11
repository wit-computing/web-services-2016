function is_valid_email(email) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(email);
}

jQuery(document).ready(function($){

	$('.contact-form').submit(function(e){

		e.preventDefault();

		$('.contact-form-success, .contact-form-fail', this).hide();

		var proceed = true;

		var contact_email = $('.contact-form-email', this).val();
		var contact_name = $('.contact-form-name', this).val();
		var contact_subject = $('.contact-form-subject', this).val();
		var contact_message = $('.contact-form-message', this).val();

		$('.required-error', this).removeClass('required-error');

		if(contact_email == '' || is_valid_email(contact_email) == false){
			$('.contact-form-email', this).addClass('required-error');
			proceed = false;
		}

		if(contact_name == ''){
			$('.contact-form-name', this).addClass('required-error');
			proceed = false;
		}

		if(contact_subject == ''){
			$('.contact-form-subject', this).addClass('required-error');
			proceed = false;
		}

		if(contact_message == ''){
			$('.contact-form-message', this).addClass('required-error');
			proceed = false;
		}
		
		var _this = $(this);

		if(proceed == true){

			$('.contact-form-submit').attr('disabled', 'disabled');

			jQuery.post(

				ThemeBrosAjax.ajaxurl,
				{
					action : 'themebros-contact-form-submit',
					email_to : $('.contact-form-email-to', this).val(),
					email : contact_email,
					name : contact_name,
					subject : contact_subject,
					message : contact_message
				},
				function( response ) {
					if(response.success == true){
						$('.contact-form-success', _this).fadeIn(500);
					}else{
						$('.contact-form-fail', _this).fadeIn(500);
					}
					$('.contact-form-submit').removeAttr('disabled');
				}

			);

		}

	});

});