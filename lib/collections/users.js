Meteor.methods({
	userUpdate: function(user) {
		check(user, {
			emails: Array,
			profile: {
				name: String,
				phoneNumber: String
			}
		});
		Meteor.users.update({ _id: Meteor.userId() }, {$set: user});
	},
	userEdit: function(user, userId, role) {
		check(user.activeflag, Boolean);
		check(userId, String);
		check(role, String);
		Roles.setUserRoles(userId, role);
		Meteor.users.update({_id: userId}, {$set: {"profile.active": user.activeflag}});
	},
  createShopUser: function(user) {
    check(user, {
      name: String,
      email: String,
      businessId: String,
      role: String
    });
    Accounts.createUser({
      email: user.email,
      profile: user
    });
  }
});

validateUserUpdate = function(user) {
	var errors = {};
	if (!user.profile.name)
		errors.userName = 'You must provide a name.'
	if (!user.emails[0].address)
		errors.email = 'You must provide your email.'
	return errors;
}

var validateCommon = function(user) {
	var errors = {};
	if (!user.name)
		errors.userName = 'You must input your name.'
	if (!user.email)
		errors.email = 'You must input your email address.'
	if (!user.password)
		errors.password = 'You must input a password.'
	return errors;
}

validateRider = function(user) {
	var errors = validateCommon(user)
	if (!user.businessId)
		errors.business = 'You must select a business from the list.';
	return errors;
}

validateManager = function(user) {
	var errors = validateCommon(user)
	if (!user.businessId)
		errors.business = 'You must input your business name.';
	return errors;
}
