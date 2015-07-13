Template.scheduleRequest.onCreated(function() {
  Session.set('postSubmitErrors', {});
});

Template.scheduleRequest.events({
	'submit form': function(e) {
		e.preventDefault();
		if ($(e.target).find('[name=requestDate]').val()) {
			var r = $(e.target).find('[name=requestDate]').val();
			var rdate = new Date(r.replace(/-/g,'/').replace('T',' '));
		} else {
			var rdate = null;
		}
		var request = {
			userId: Meteor.userId(),
			locationId: Meteor.user().profile.locationId,
			requestDate: rdate,
			shiftType: $(e.target).find('[name=shiftType]').val(),
			scheduled: false
		}
		var errors = validateRequest(request);

		if (!isEmptyO(errors))
      		return Session.set('postSubmitErrors', errors);

      	Meteor.call('requestAdd', request, function(error, result) {
			if (error) 
				return throwError(error.reason);
			if (result.requestExist)
				throwError('This request has already been made.');

			Session.set('postSubmitErrors', {});
		});
		document.insertForm.reset();
	}
});

Requests.after.insert(function(userId, doc) {
	Session.set('postSubmitErrors', {});
	return throwSuccess("You've successfully created a shift request.");
});