/**
 * Author:      Felipe Medeiros
 * Created in:  24/04/2017 - 22:58.
 */

(function () {
	"use strict";

	var formInvestment = $("#f-eWallet-investment");
	if (formInvestment.length) {
		formInvestment.on('submit', function (e) {
			e.preventDefault();

			$.ajax({
				url: formInvestment.attr('action'),
				data: formInvestment.serialize(),
				type: 'post',
				dataType: 'json',
				success: function (response) {
					if (response.message) {
						block_form(formInvestment, false);

						var type = response.success ? 'success' : 'error';
						toastr[type](response.message);
					}
					if (response.redirect) {
						var redirect = setTimeout(function () {
							window.location.href = response.redirect;
							clearTimeout(redirect);
						}, 1500)
					}
				}
			});
			block_form(formInvestment, true);
		});
	}

	var formPayout = $("#f-eWallet-payout");
	if (formPayout.length) {
		formPayout.on('submit', function (e) {
			e.preventDefault();

			$.ajax({
				url: formPayout.attr('action'),
				data: formPayout.serialize(),
				type: 'post',
				dataType: 'json',
				success: function (response) {
					if (response.message) {
						block_form(formPayout, false);

						var type = response.success ? 'success' : 'error';
						toastr[type](response.message);
					}
					if (response.redirect) {
						var redirect = setTimeout(function () {
							window.location.href = make_url(response.redirect);
							clearTimeout(redirect);
						}, 1500)
					}
				}
			});
			block_form(formPayout, true);
		});
	}

	var formTransfer = $("#f-eWallet-transfer");
	if (formTransfer.length) {
		formTransfer.on('submit', function (e) {
			e.preventDefault();

			$.ajax({
				url: formTransfer.attr('action'),
				data: formTransfer.serialize(),
				type: 'post',
				dataType: 'json',
				success: function (response) {
					if (response.message) {
						block_form(formTransfer, false);

						var type = response.success ? 'success' : 'error';
						toastr[type](response.message);
					}
					if (response.redirect) {
						var redirect = setTimeout(function () {
							window.location.href = make_url(response.redirect);
							clearTimeout(redirect);
						}, 1500)
					}
				}
			});
			block_form(formTransfer, true);
		});
	}
})();