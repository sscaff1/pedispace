Template.userEdit.onRendered(function() {
	var template = this;
	var role = template.data.roles[0];
	template.$('[name=role]').val(role);
});

Template.userEdit.helpers({
	role: function() {
		return Meteor.roles.find({name: {$nin: ['shop']}});
	}
});

Template.userEdit.events({
	'submit form': function(event) {
		event.preventDefault();
		var user = {
			activeflag: $(event.target).find('[name=activeCheckbox]').prop('checked')
		};
		var role = $(event.target).find('[name=role]').val();
		if (!role)
			return Messages.throw('You must assign the user a role.', 'danger');
		Meteor.call('userEdit', user, this._id, role, function(error) {
			if (error)
				console.log(error);
			Router.go('userList');
		});
	}
});
