Template.bikeEdit.onCreated(function() {
	var instance = this;
	instance.autorun(function() {
		instance.subscribe('bikes');
	});
});

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
			if (error) {
				console.log(error)
			} else {
				Messages.throw('The bike has been updated.', 'success')
				Router.go('bikesList');
			}
		});
	}
});
