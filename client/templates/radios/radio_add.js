Template.radioAdd.events({
	'submit form': function(event) {
		event.preventDefault();
		var radio = {
			name: $(event.target).find('[name=radioName]').val()
		};
		if (!radio.name) {
			return Messages.throw('The radio name cannot be blank.', 'danger');
		}
		Meteor.call('radioAdd', radio, function(error) {
			if (error)
				console.log(error)
			document.insertForm.reset();
		});

	}
})
