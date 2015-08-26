Radios = new Mongo.Collection('radios');

Radios.allow({
	update: function(userId, doc) {
		return Roles.userIsInRole(userId, ['admin', 'manager']);
	}
});

Meteor.methods({
  radioAdd: function(radio) {
  	var radio = _.extend(radio, {
	  active: true
	});
    Radios.insert(radio);
  }
});