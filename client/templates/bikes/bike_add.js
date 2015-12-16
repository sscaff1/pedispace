Template.bikeAdd.events({
	'submit form': function(event) {
		event.preventDefault();
		var bike = {
			name: $(event.target).find('[name=bikeName]').val()
		};
		if (!bike.name) {
			Messages.throw('The bike name cannot be blank.', 'danger');
		}
		Meteor.call('bikeAdd', bike, function(error) {
			if (error)
				console.log(error)
			document.insertForm.reset();
		});
	}
});
