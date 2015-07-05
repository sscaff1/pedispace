Template.userItem.helpers({
	'locationName': function() {
		var lid = this.profile.locationId;
		var l = Locations.findOne({_id: lid});
		return l.name;
	}
});