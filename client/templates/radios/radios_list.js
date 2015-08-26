Template.radiosList.helpers({
	radios: function() {	
	  return Radios.find({}, {sort: {locationId: 1, name: 1}});
	}
})