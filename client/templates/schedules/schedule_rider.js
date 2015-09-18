Template.scheduleRider.helpers({
	'rider': function() {
		return Meteor.users.find({roles: 'biker', "profile.active": true});
	}
});

Template.scheduleRider.onCreated(function() {
  Session.set('postSubmitErrors', {});
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
			scheduled: true,
			rider: $(e.target).find('[name=riderType]').prop('checked')
		}
		
		var errors = validateRequest(schedule);

		if (!$.isEmptyObject(errors)) 
			return Session.set('postSubmitErrors', errors);

		Meteor.call('requestAdd', schedule, function(error, result) {
			if (error)
				return throwError(error.reason);
			if (result.requestExist)
				throwError('This request has already been made.');

			Session.set('postSubmitErrors', {});
		});
		document.insertForm.reset();
	}
});