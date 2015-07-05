Template.radioAdd.helpers({
  'location': function() {
  	return Locations.find({}, {sort: {name: 1}});
  }
});

Template.radioAdd.events({
	'submit form': function(e) {
		e.preventDefault();

		var radio = {
			locationId: $(e.target).find('[name=locationName]').val(),
			name: $(e.target).find('[name=radioName]').val()
		}
		Meteor.call('radioAdd', radio);
		document.insertForm.reset();
	}
})