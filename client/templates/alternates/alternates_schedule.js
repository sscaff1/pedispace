Template.alternatesSchedule.helpers({
	'rider': function() {
		return Meteor.users.find({'profile.active': true, 'roles': 'biker'});
	}
});
Template.alternatesSchedule.events({
  'submit form': function(e) {
  	e.preventDefaults();

  	
  }
});