Template.bikeEdit.events({
	'submit form': function(event) {
		event.preventDefault();
		var currentBikeId = this._id;
		var bike = {
			name: $(event.target).find('[name=bikeName]').val(),
			active: $(event.target).find('[name=activeCheckbox]').prop('checked')
		};
		if (!bike.name) {
			Messages.throw('The bike name cannot be blank.', 'danger');
		}
		Bikes.update(currentBikeId, {$set: bike}, function(error) {
			if (error)
				console.log(error)
			Router.go('bikesList');
		});
	}
});
