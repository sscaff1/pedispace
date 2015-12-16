Template.radioEdit.events({
	'submit form': function(event) {
		event.preventDefault();
		currentId = this._id;
		var radio = {
			name: $(event.target).find('[name=radioName]').val(),
			active: $(event.target).find('[name=activeCheckbox]').prop('checked')
		};
		if (!radio.name) {
			return Messages.throw('The radio name cannot be blank.', 'danger');
		}
		Radios.update(currentId, {$set: radio}, function(error) {
			if (error)
				console.log(error);
			Router.go('radiosList');
		});
	}
});
