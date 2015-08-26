Template.locationAdd.events({
	'submit form': function(e) {
		e.preventDefault();

		var location = $(e.target).find('[name=locationName]').val();
		
		Meteor.call('locationAdd', location);

		document.insertForm.reset();
	}
});