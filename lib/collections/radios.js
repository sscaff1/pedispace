Radios = new Mongo.Collection('radios');

Radios.allow({
	update: function(userId, doc) {
		var businessId = Meteor.user().profile.businessId;
		if (businessId === doc.businessId) {
			return Roles.userIsInRole(userId, ['manager']);
		} else {
			return false;
		}
	}
});

Meteor.methods({
  radioAdd: function(radio) {
		check(radio.name, String);
  	var radio = _.extend(radio, {
		businessId: Meteor.user().profile.businessId,
	  active: true
	});
    Radios.insert(radio);
  }
});
