$(document).ready(function(){


$('#sign-up-form').validate({
	rules: {
		parent_name: {
			required: true
		},
		email: {
			required: true,
			email: true
		},
		password: {
			minlength: 2,
			required: true
		},
		// confirmation: {
		// 	minlength: 2,
		// 	equalTo: "#password"
		// }
	},
	success: function(element) {
		element
		.text('OK!').addClass('valid')
	}
});

});