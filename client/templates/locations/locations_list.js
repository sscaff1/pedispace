Template.locationsList.helpers({
	'locations': function() {
		return Locations.find({}, {sort: {name: 1}});
	}
});