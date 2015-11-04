Template.editProfile.events({
	'submit form': function(e) {
		e.preventDefault();
		var user = {
			emails: [{address:$(e.target).find('[name=email]').val()}],
			"profile.name": $(e.target).find('[name=userName]').val(),
			"profile.phoneNumber": $(e.target).find('[name=phoneNumber]').val()
		}
		Meteor.call('userUpdate', user);
	}
});
