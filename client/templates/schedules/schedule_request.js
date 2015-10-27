Template.scheduleRequest.onCreated(function() {
  Session.set('postSubmitErrors', {});
});

Template.scheduleRequest.onRendered(function() {
	$('[name=requestDate]').datepicker({
	  format: "MM dd yyyy",
	  autoclose: true
	});
});

Template.scheduleRequest.events({
	'submit form': function(e) {
		e.preventDefault();

		if ($(e.target).find('[name=requestDate]').val()) {
			var rdate =
				moment($(e.target).find('[name=requestDate]').val(), 'MMMM DD YYYY').toDate();
		} else {
			var rdate = null;
		}
		var request = {
			userId: Meteor.userId(),
			locationId: Meteor.user().profile.locationId,
			requestDate: rdate,
			shiftType: $(e.target).find('[name=shiftType]').val(),
			scheduled: false,
      guaranteeRate: $(e.target).find('[name=guaranteeRate]').prop('checked'),
      comments: $(e.target).find('[name=comments]').val()
		}
		var errors = validateRequest(request);

		if (!$.isEmptyObject(errors))
      		return Session.set('postSubmitErrors', errors);

      	Meteor.call('requestAdd', request, function(error, result) {
			if (error)
				return throwError(error.reason);
			if (result.requestExist)
				return throwError('This request has already been made.');

			Session.set('postSubmitErrors', {});
		});
		document.insertForm.reset();
	},
	'change #shiftType, change #requestDate': function(e) {
		e.preventDefault();

		var rdate =
			moment($('form').find('[name=requestDate]').val(), 'MMMM DD YYYY');
		rdate = new Date(rdate);

		var st = $('form').find('[name=shiftType]').val();

		var r = Rates.findOne({
			locationId: Meteor.user().profile.locationId,
			scheduleDate: rdate,
			shiftType: st
		});

		if (r) {
			Session.set('rateSelect', r);
		} else {
			Session.set('rateSelect', null);
		}
	}
});

Template.scheduleRequest.helpers({
	rateSelect: function() {
		return Session.get('rateSelect');
	}
});

Requests.after.insert(function(userId, doc) {
	Session.set('postSubmitErrors', {});
	return throwSuccess("You've successfully created a shift request.");
});
