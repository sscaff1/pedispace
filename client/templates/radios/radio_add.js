Template.radioAdd.events({
	'submit form': function(e) {
		e.preventDefault();
		var radio = {
			name: $(e.target).find('[name=radioName]').val()
		};
		Meteor.call('radioAdd', radio);
		document.insertForm.reset();
	}
})
