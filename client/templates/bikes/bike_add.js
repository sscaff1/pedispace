Template.bikeAdd.events({
	'submit form': function(e) {
		e.preventDefault();

		var bike = {
			name: $(e.target).find('[name=bikeName]').val()
		};
		Meteor.call('bikeAdd', bike);
		document.insertForm.reset();
	}
});
