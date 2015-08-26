Locations = new Mongo.Collection('locations');

Meteor.methods({
	locationAdd: function(locationName) {
		Locations.insert({
			name: locationName
		});
	}
});