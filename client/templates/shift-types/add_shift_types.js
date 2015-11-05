Template.addShiftTypes.events({
	'submit form': function(e) {
		e.preventDefault();

		var shiftType = {
			name: $(e.target).find('[name=shiftTypeName]').val()
		};
		Meteor.call('shiftTypeAdd', shiftType);
		document.insertForm.reset();
	}
});
