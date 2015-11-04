Meteor.methods({
	userUpdate: function(user) {
		Meteor.users.update({ _id: Meteor.userId() }, {$set: user}, function() {
			Router.go('shiftAdd');
		});
	},
	userEdit: function(user, userId, role) {
		Roles.setUserRoles(userId, role);
		Meteor.users.update({_id: userId}, {$set: user}, function() {
			return Router.go('usersList');
		});
	}
});
