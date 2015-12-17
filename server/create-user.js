Meteor.methods({
  managerCreateUser: function(user) {
    check(user, {
      name: String,
      email: String,
      phoneNumber: String,
      roles: Array,
      businessId: String
    });
		var newUserId = Accounts.createUser({
      email: user.email,
      profile: user
    });
    Accounts.sendEnrollmentEmail(newUserId);
	},
  createUserOnJoin: function(user) {
    check(user, {
      name: String,
      email: String,
      password: String,
      phoneNumber: String,
      businessId: String,
      role: String
    });
    var password = user.password;
    delete user.password;
    var newUserId = Accounts.createUser({
      email: user.email,
      password: password,
      profile: user
    });
    Accounts.sendVerificationEmail(newUserId);
    return newUserId;
  },
  createShopUser: function(user, managerEmail) {
    check(user, {
      name: String,
      email: String,
      businessId: String,
      role: String
    });
    var newUser = Accounts.createUser({
      email: user.email,
      profile: user
    });
    Accounts.sendEnrollmentEmail(newUser);
  }
});
Accounts.onCreateUser(function(options, user) {
  options.roles = [options.profile.role];
  if (options.profile.role === 'manager') {
    options.profile.businessId = Businesses.insert({name: options.profile.businessId});
  }
  delete options.profile.role;
  delete options.profile.email;
  options.profile.active = true;
  _.extend(user, {
    profile: options.profile,
    roles: options.roles
  });
  return user;
});
