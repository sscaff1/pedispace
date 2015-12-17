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
  },
  setNewShopPassword: function(userId, password) {
    Accounts.setPassword(userId, password);
  },
  checkUserPassword: function(userId) {
    if (Meteor.users.findOne(userId).services.password == null) {
      return true;
    } else {
      return false;
    }
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
