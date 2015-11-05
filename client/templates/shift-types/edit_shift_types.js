Template.editShiftTypes.events({
	'submit form': function(e) {
		e.preventDefault();
		var currentShiftId = this._id;
		var shiftType = {
			name: $(e.target).find('[name=shiftTypeName]').val(),
			active: $(e.target).find('[name=activeCheckbox]').prop('checked')
		};
		ShiftTypes.update(currentShiftId, {$set: shiftType});
		Router.go('listShiftTypes');
	}
});
