Template.editShiftTypes.onCreated(function() {
	var instance = this;
	instance.autorun(function() {
		instance.subscribe('shiftTypes');
	});
})

Template.editShiftTypes.events({
	'submit form': function(event) {
		event.preventDefault();
		var currentShiftId = this._id;
		var shiftType = {
			name: $(event.target).find('[name=shiftTypeName]').val(),
			startTime: $(event.target).find('[name=startTime]').val(),
			active: $(event.target).find('[name=activeCheckbox]').prop('checked')
		}
		if (!shiftType.name || !shiftType.startTime) {
			Messages.throw('The shift type name or start time cannot be blank.', 'danger');
		}
		ShiftTypes.update(currentShiftId, {$set: shiftType}, function(error) {
			if (error) {
				console.log(error);
			} else {
				Messages.throw('The shift type has been updated.', 'success');
				Router.go('listShiftTypes');
			}
		});
	}
});
