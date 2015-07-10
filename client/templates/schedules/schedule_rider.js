Template.scheduleRider.helpers({
	'rider': function() {
		return Meteor.users.find({roles: 'biker', "profile.active": true});
	}
});

Template.scheduleRider.onCreated(function() {
  Session.set('postSubmitErrors', {});
});

Template.scheduleRider.helpers({
  errorMessage: function(field) {
    return Session.get('postSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
  }
});

Template.scheduleRider.events({
	'submit form': function(e) {
		e.preventDefault();
		
		if ($(e.target).find('[name=requestDate]').val()) {
			var r = $(e.target).find('[name=requestDate]').val();
			var rdate = new Date(r.replace(/-/g,'/').replace('T',' '));
		} else {
			var rdate = null;
		}
		
		var schedule = {
			userId: $(e.target).find('[name=userId]').val(),
			locationId: Meteor.user().profile.locationId,
			requestDate: rdate,
			shiftType: $(e.target).find('[name=shiftType]').val(),
			scheduled: true
		}
		
		var errors = validateRequest(schedule);

		if (!isEmptyO(errors)) 
			return Session.set('postSubmitErrors', errors);

		Meteor.call('requestAdd', schedule, function(error, result) {
			if (error)
				return throwError(error.reason);
			Session.set('postSubmitErrors', {});
		});
		document.insertForm.reset();
	}
});