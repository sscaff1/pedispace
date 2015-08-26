Template.bikeItem.helpers({
	locationName: function(){
		var locationName = Locations.findOne({_id: this.locationId});
		var name = locationName.name;
		return name;
	}
});