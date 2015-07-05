Template.bikeAdd.helpers({
	'location': function() {
		return Locations.find({}, {sort: {name: 1}});
	}
});

Template.bikeAdd.events({
	'submit form': function(e) {
		e.preventDefault();

		var bike = {
			locationId: $(e.target).find('[name=locationName]').val(),
			name: $(e.target).find('[name=bikeName]').val()
		};
		Meteor.call('bikeAdd', bike);
		document.insertForm.reset();
	}
});
