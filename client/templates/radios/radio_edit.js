Template.radioEdit.helpers({
	'location': function() {
		return Locations.find({_id: {$ne: this.locationId}});
	},
	'locationName': function() {
		var l = Locations.findOne({_id: this.locationId});
		return l.name;
	}

});

Template.radioEdit.events({
	'submit form': function(e) {
		e.preventDefault();

		currentId = this._id;

		var radio = {
			locationId: $(e.target).find('[name=locationName]').val(),
			name: $(e.target).find('[name=radioName]').val(),
			active: $(e.target).find('[name=activeCheckbox]').prop('checked')
		};

		Radios.update(currentId, {$set: radio});

		Router.go('radiosList');
	}
});