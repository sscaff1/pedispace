Template.radiosList.helpers({
	radios: function() {
	  return Radios.find({}, {sort: {name: 1}});
	}
})
