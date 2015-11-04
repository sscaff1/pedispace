Meteor.methods({
  managerCreateUser: function(user) {
		var newUserId = Accounts.createUser({
      email: user.email,
      profile: user
    });
    Accounts.sendEnrollmentEmail(newUserId);
	}
});

Accounts.onCreateUser(function(options, user) {
  if (!options.profile.roles) {
    options.roles = ['manager'];
    options.profile.active = true;
    options.profile.businessId = Businesses.insert({name: options.profile.businessId});
    _.extend(user, {
      profile: options.profile,
      roles: options.roles
    });
    Meteor.setTimeout(function() {
      Accounts.sendVerificationEmail(user._id);
    }, 2 * 1000);
  } else {
    options.roles = options.profile.roles;
    delete options.profile.roles;
    delete options.profile.email;
    options.profile.active = true;
    _.extend(user, {
      profile: options.profile,
      roles: options.roles
    });
  }
  return user;
});
