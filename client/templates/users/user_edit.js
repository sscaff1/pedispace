Template.userEdit.onRendered(function() {
	var template = this;
	var role = template.data.roles[0];
	template.$('[name=role]').val(role);
});

Template.userEdit.helpers({
	role: function() {
		return Meteor.roles.find();
	}
});

Template.userEdit.events({
	'submit form': function(e) {
		e.preventDefault();
		var user = {
			"profile.active": $(e.target).find('[name=activeCheckbox]').prop('checked')
		};
		var role = $(e.target).find('[name=role]').val();
		Meteor.call('userEdit', user, this._id, role);
	}
});
