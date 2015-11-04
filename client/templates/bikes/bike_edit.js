Template.bikeEdit.events({
	'submit form': function(e) {
		e.preventDefault();
		var currentBikeId = this._id;
		var bike = {
			name: $(e.target).find('[name=bikeName]').val(),
			active: $(e.target).find('[name=activeCheckbox]').prop('checked')
		};
		Bikes.update(currentBikeId, {$set: bike});
		Router.go('bikesList');
	}
});
