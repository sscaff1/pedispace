Template.addUser.helpers({
	role: function() {
		return Meteor.roles.find();
	}
});

Template.addUser.events({
	'submit form': function(event,template) {
		var user = {
			name: template.$('[name=fullName]').val(),
			email: template.$('[name=email]').val(),
			phoneNumber: template.$('[name=phoneNumber]').val(),
			roles: [template.$('[name=role]').val()],
			businessId: Meteor.user().profile.businessId
		};
		Meteor.call('managerCreateUser', user);
	}
})
