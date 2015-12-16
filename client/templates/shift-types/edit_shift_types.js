Template.editShiftTypes.events({
	'submit form': function(event) {
		event.preventDefault();
		var currentShiftId = this._id;
		var shiftType = {
			name: $(event.target).find('[name=shiftTypeName]').val(),
			active: $(event.target).find('[name=activeCheckbox]').prop('checked')
		}
		if (!shiftType.name) {
			Messages.throw('The shift type name cannot be blank.', 'danger');
		}
		ShiftTypes.update(currentShiftId, {$set: shiftType}, function(error) {
			if (error)
				console.log(error);
			Router.go('listShiftTypes');
		});
	}
});
