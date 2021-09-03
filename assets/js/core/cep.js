$(document).ready(function() {
	$('#btnSearchCep').click(function() {
		var cep = $('#address_zip').val().replace(/[^\d]/g, "");

		$.ajax({
			url: base_url + 'api/cep/' + cep,
			type: "GET",
			dataType: "json",
			success: function(json) {
				if (json.erro)
				{
					$('#address_street').val('');
					$('#address_district').val('');
					$('#address_city').val('');
					$('#address_state').val('');

					$('#address_city').removeAttr('readonly');
					$('#address_state').removeAttr('readonly');
				} else {
					$('#address_street').val(json.logradouro);
					$('#address_district').val(json.bairro);
					$('#address_city').val(json.localidade);
					$('#address_state').val(json.uf);

					if (json.localidade != '') {
						$('#address_city').attr('readonly', 'readonly');
					}
					if (json.uf != '') {
						$('#address_state').attr('readonly', 'readonly');
					}
				}
			},
			error: function() {
				$('#address_street').val('');
				$('#address_district').val('');
				$('#address_city').val('');
				$('#address_state').val('');

				$('#address_city').removeAttr('readonly');
				$('#address_state').removeAttr('readonly');
			}
		});
	});
	$('#address_zip').blur(function() {
		$('#btnSearchCep').trigger('click');
	});
});