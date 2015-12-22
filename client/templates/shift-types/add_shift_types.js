Template.addShiftTypes.events({
	'submit form': function(event) {
		event.preventDefault();

		var shiftType = {
			name: $(event.target).find('[name=shiftTypeName]').val(),
			startTime: $(event.target).find('[name=startTime]').val()
		};

		if (!shiftType.name || !shiftType.startTime) {
			return Messages.throw('No field can be blank.', 'danger');
		}
		Meteor.call('shiftTypeAdd', shiftType, function(error) {
			if (error) {
				console.log(error);
			} else {
				Messages.throw('You\'ve created a new shift.', 'success')
				document.insertForm.reset();
			}
		});

	}
});
