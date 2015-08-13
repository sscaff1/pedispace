Template.alternatesSchedule.helpers({
	'dateValuef': function() {
		return this.dateValue.format("dddd, MMMM Do YYYY");
	},
	'alternate': function(shift) {
		return Alternates.find({scheduled: true, requestDate: this.dateValue, shiftType: shift});
	},
});
Template.alternatesSchedule.events({
  'submit form': function(e) {
  	e.preventDefaults();
  }
});