Template.addShiftTypes.events({
	'submit form': function(event) {
		event.preventDefault();

		var shiftType = {
			name: $(event.target).find('[name=shiftTypeName]').val()
		};
		if (!shiftType.name) {
			Messages.throw('The shift type name cannot be blank.', 'danger');
		}
		Meteor.call('shiftTypeAdd', shiftType, function(error) {
			if (error)
				console.log(error);
			document.insertForm.reset();
		});

	}
});
