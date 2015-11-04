Template.bikesList.helpers({
	bikes: function(){
		return Bikes.find({}, {sort: {name: 1}});
	}
});
