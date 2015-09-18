Template.rateAdd.events({
	'submit form': function(e) {
		e.preventDefault();

		var rate = {
			scheduleDate: new Date(this.dateValue.toISOString()),
			locationId: Meteor.user().profile.locationId,
			shiftType: $(e.target).find('[name=shiftType]').val(),
			rateAmount: $(e.target).find('[name=rateAmount]').val(),
			comments: $(e.target).find('[name=comments]').val()
		}

		var errors = validateRate(rate);

		if (!$.isEmptyObject(errors))
      		return Session.set('postSubmitErrors', errors);

      	Meteor.call('rateAdd', rate, function(error, result) {
      		if (error)
      			return throwError(error.reason);
      		Session.set('postSubmitErrors', {});
      	});

      	$('[name=insertForm]')[this.formId].reset();
	}
});

Rates.after.insert(function(userId, doc) {
	Session.set('postSubmitErrors', {});
	return throwSuccess("You've successfully created a rate schedule.");
});

Rates.after.update(function(userId, doc) {
	Session.set('postSubmitErrors', {});
	return throwSuccess("You've successfully updated a rate schedule.");
});