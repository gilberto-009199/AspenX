/* ------------------------------------------------------------------------------
*
*  # Auth module
*
*  Specific JS code additions for login and registration pages
*
*  Version: 1.0
*  Latest update: Jun 13, 2016
*
* ---------------------------------------------------------------------------- */
/*$(document).ready(function() {
	$('.styled').uniform();

	var loginForm = $('#login');
	if (loginForm.length)
	{
		loginForm.on('submit', function(e) {
			e.preventDefault();

			var blockElem = $('.panel', loginForm);
				App.blockUI({
				target: blockElem,
				animate: true
			});

			$.ajax({
				url:		loginForm.attr('action'),
				data:		loginForm.serialize(),
				type:		'POST',
				dataType:	'json',
				timeout:	5000,
				success:	function(response) {
					if (!response.success) {
						App.unblockUI(blockElem);
						$('input, button', loginForm).removeAttr('disabled');
						if (response.message)
							toastr['error'](response.message);
					} else {
						if (response.message)
							toastr['success'](response.message);
					}
					if (response.redirect) {
						var redirect = setTimeout(function() {
							window.location = response.redirect;
							clearTimeout(redirect);
						}, 3000);
					}
				}
			});
			$('input, button', loginForm).attr('disabled', true);
		});
	}

	var registerForm = $('#register');
	if (registerForm.length)
	{
		registerForm.on('submit', function(e) {
			e.preventDefault();

			var blockElem = $('.panel', registerForm);
				App.blockUI({
				target: blockElem,
				animate: true
			});

			$.ajax({
				url:		registerForm.attr('action'),
				data:		registerForm.serialize(),
				type:		'POST',
				dataType:	'json',
				timeout:	5000,
				success:	function(response) {
					if (!response.success) {
						App.unblockUI(blockElem);
						$('input, button', registerForm).removeAttr('disabled');
						if (response.message)
							toastr['error'](response.message);
					} else {
						if (response.message)
							toastr['success'](response.message);
					}
					if (response.redirect) {
						var redirect = setTimeout(function() {
							window.location = response.redirect;
							clearTimeout(redirect);
						}, 3000);
					}
				}
			});
			$('input, button', registerForm).attr('disabled', true);
		});
	}

	var forgotForm = $('#forgot');
	if (forgotForm.length)
	{
		forgotForm.on('submit', function(e) {
			e.preventDefault();

			var blockElem = $('.panel', forgotForm);
			App.blockUI({
				target: blockElem,
				animate: true
			});

			$.ajax({
				url:		forgotForm.attr('action'),
				data:		forgotForm.serialize(),
				type:		'POST',
				dataType:	'json',
				timeout:	5000,
				success:	function(response) {
					if (!response.success) {
						App.unblockUI(blockElem);
						$('input, button', forgotForm).removeAttr('disabled');
						if (response.message)
							toastr['error'](response.message);
					} else {
						if (response.message)
							toastr['success'](response.message);
					}
					if (response.redirect) {
						var redirect = setTimeout(function() {
							window.location = response.redirect;
							clearTimeout(redirect);
						}, 3000);
					}
				}
			});
			$('input, button', forgotForm).attr('disabled', true);
		});
	}
});*/
/* ------------------------------------------------------------------------------
*
*  # Auth module
*
*  Specific JS code additions for login and registration pages
*
*  Version: 1.0
*  Latest update: Jun 13, 2016
*
* ---------------------------------------------------------------------------- */
$(document).ready(function() {
	$('.styled').uniform();

	var loginForm = $('#login');
	if (loginForm.length)
	{
		loginForm.on('submit', function(e) {
			e.preventDefault();
            
			var blockElem = $('.panel', loginForm);
				App.blockUI({
				target: blockElem,
				animate: true
			});
			var data = {
				url:		loginForm.attr('action'),
				data:		loginForm.serialize(),
				type:		'POST',
				dataType:	'json',
				timeout:	5000,
				success:	function(response) {
					if (!response.success) {
						App.unblockUI(blockElem);
						$('input, button', loginForm).removeAttr('disabled');

						if (response.message)toastr['error'](response.message);

						if(window.grecaptcha.token)grecaptcha.reset();

					} else if(!response.redirect){

						if (response.message)toastr['info'](response.message);
						// Autenticacao recaptchav2 para a autenticação 
						console.log("Iniciar recaptchav2")
						App.unblockUI(blockElem);
						$('input, button',loginForm).removeAttr('disabled');

						$.ajax({
							url: 'https://www.google.com/recaptcha/api.js?explicit&hl=pt-BR',
							dataType: "script",
							success: function(){
									setTimeout(function(){

										if(window.grecaptcha.token)grecaptcha.reset()
										else{
											grecaptcha.render('recaptchav2', {
											'sitekey' : '6LdnkqgUAAAAABXcHWqmAPlqqGzgQuT2A3kmNNsw',
											'callback' : function(token){
												window.grecaptcha.token = token;
												loginForm.submit();
											},
											'theme' : 'dark',
											'hl' : 'pt-BR',
											});	
										}
									},1555);
							}
							});
					} else {// Usuario logado e aprovado pela recaptcha

						toastr['success'](response.message);

						var redirect = setTimeout(function() {
							window.location = response.redirect;
							clearTimeout(redirect);
						}, 3000);
					}
				}
			};
			if(!window.grecaptcha.token){
				grecaptcha.ready(function() {
					grecaptcha.execute('6Ld-jKgUAAAAAFI0dq82TvnXZLQUCGRrCVk9L8GB', {action: 'homepage'}).then(function(token) {

						console.log(token);

						data.url+= "?g-token="+token;

						$.ajax(data);

					});
				});
			}else{
				data.url+= "?g-tokenv2="+window.grecaptcha.token;

				$.ajax(data);
			}

			$('input, button', loginForm).attr('disabled', true);
		});
	}

	var registerForm = $('#register');
	if (registerForm.length)
	{
		registerForm.on('submit', function(e) {
			e.preventDefault();

			var blockElem = $('.panel', registerForm);
				App.blockUI({
				target: blockElem,
				animate: true
			});

			$.ajax({
				url:		registerForm.attr('action'),
				data:		registerForm.serialize(),
				type:		'POST',
				dataType:	'json',
				timeout:	5000,
				success:	function(response) {
					if (!response.success) {
						App.unblockUI(blockElem);
						$('input, button', registerForm).removeAttr('disabled');
						if (response.message)
							toastr['error'](response.message);
					} else {
						if (response.message)
							toastr['success'](response.message);
					}
					if (response.redirect) {
						var redirect = setTimeout(function() {
							window.location = response.redirect;
							clearTimeout(redirect);
						}, 3000);
					}
				}
			});
			$('input, button', registerForm).attr('disabled', true);
		});
	}

	var forgotForm = $('#forgot');
	if (forgotForm.length)
	{
		forgotForm.on('submit', function(e) {
			e.preventDefault();

			var blockElem = $('.panel', forgotForm);
			App.blockUI({
				target: blockElem,
				animate: true
			});

			$.ajax({
				url:		forgotForm.attr('action'),
				data:		forgotForm.serialize(),
				type:		'POST',
				dataType:	'json',
				timeout:	5000,
				success:	function(response) {
					if (!response.success) {
						App.unblockUI(blockElem);
						$('input, button', forgotForm).removeAttr('disabled');
						if (response.message)
							toastr['error'](response.message);
					} else {
						if (response.message)
							toastr['success'](response.message);
					}
					if (response.redirect) {
						var redirect = setTimeout(function() {
							window.location = response.redirect;
							clearTimeout(redirect);
						}, 3000);
					}
				}
			});
			$('input, button', forgotForm).attr('disabled', true);
		});
	}
});

