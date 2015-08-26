Template.bikesList.helpers({
	bikes: function(){
		return Bikes.find({}, {sort: {locationId: 1, name: 1}});
	}
});