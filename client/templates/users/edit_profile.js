Template.editProfile.onCreated(function() {
	Session.set('postSubmitErrors', {});
});

Template.editProfile.events({
	'submit form': function(event) {
		event.preventDefault();
		var user = {
			emails: [{address:$(event.target).find('[name=email]').val()}],
			profile: {
				name: $(event.target).find('[name=userName]').val(),
				phoneNumber: $(event.target).find('[name=phoneNumber]').val()
			}
		}

		errors = validateUserUpdate(user);
		if (!$.isEmptyObject(errors)) {
			return Session.set('postSubmitErrors', errors);
		}

		Meteor.call('userUpdate', user, function(error) {
			if (error)
				console.log(error)
			Router.go('shiftAdd');
		});
	}
});
