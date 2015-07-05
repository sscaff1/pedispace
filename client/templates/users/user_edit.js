Template.userEdit.helpers({
	'role': function() {
		return Meteor.roles.find({name: {$ne: Meteor.user().roles[0]}}, {sort: {name: 1}});
	},
	'roleName': function() {
		var l = Meteor.roles.findOne({name: Meteor.user().roles[0]});
		return l.name;
	},
	'idcheck': function() {
		return this._id;
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