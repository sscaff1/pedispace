Template.bikeEdit.helpers({
	'location': function() {
		return Locations.find({_id: {$ne: this.locationId}});
	},
	'locationName': function() {
		var l = Locations.findOne({_id: this.locationId});
		return l.name;
	}

});

Template.bikeEdit.events({
	'submit form': function(e) {
		e.preventDefault();

		currentBikeId = this._id;

		var bike = {
			locationId: $(e.target).find('[name=locationName]').val(),
			name: $(e.target).find('[name=bikeName]').val(),
			active: $(e.target).find('[name=activeCheckbox]').prop('checked')
		};

		Bikes.update(currentBikeId, {$set: bike});

		Router.go('bikesList');
	}
});