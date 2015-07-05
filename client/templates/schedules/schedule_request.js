Template.scheduleRequest.onCreated(function() {
  Session.set('postSubmitErrors', {});
});

Template.scheduleRequest.helpers({
  errorMessage: function(field) {
    return Session.get('postSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
  }
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
			shiftType: $(e.target).find('[name=shiftType]').val()
		}
		var errors = validateRequest(request);

		if (!isEmptyO(errors))
      		return Session.set('postSubmitErrors', errors);

      	Meteor.call('requestAdd', request, function(error, result) {
			if (error) 
				return throwError(error.reason);
			Session.set('postSubmitErrors', {});
		});
		document.insertForm.reset();
	}
});

Requests.after.insert(function(userId, doc) {
	return throwSuccess("You've successfully created a shift request.");
});