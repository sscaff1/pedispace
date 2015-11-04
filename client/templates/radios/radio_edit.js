Template.radioEdit.events({
	'submit form': function(e) {
		e.preventDefault();
		currentId = this._id;
		var radio = {
			name: $(e.target).find('[name=radioName]').val(),
			active: $(e.target).find('[name=activeCheckbox]').prop('checked')
		};
		Radios.update(currentId, {$set: radio});
		Router.go('radiosList');
	}
});
