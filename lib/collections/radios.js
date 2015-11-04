Radios = new Mongo.Collection('radios');

Radios.allow({
	update: function(userId, doc) {
		return Roles.userIsInRole(userId, ['manager']);
	}
});

Meteor.methods({
  radioAdd: function(radio) {
  	var radio = _.extend(radio, {
		businessId: Meteor.user().profile.businessId,
	  active: true
	});
    Radios.insert(radio);
  }
});
