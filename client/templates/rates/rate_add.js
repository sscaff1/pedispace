Template.rateAdd.events({
	'submit form': function(e) {
		e.preventDefault();

		var scheduleDate =
			moment($(e.target).find('[name=scheduleDate]').val(), 'MMMM DD YYYY').toDate();

		var rate = {
			scheduleDate: scheduleDate,
			shiftTypeId: $(e.target).find('[name=shiftType]').val(),
			rateAmount: parseInt($(e.target).find('[name=rateAmount]').val()),
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
		document.insertForm.reset();
	}
});

Template.rateAdd.helpers({
	shiftTypes: function() {
		return ShiftTypes.find();
	}
});

Template.rateAdd.onRendered(function() {
	$('[name=scheduleDate]').datepicker({
	  format: "MM dd yyyy",
	  autoclose: true
	});
});

Rates.after.insert(function(userId, doc) {
	Session.set('postSubmitErrors', {});
	return throwSuccess("You've successfully created a rate schedule.");
});

Rates.after.update(function(userId, doc) {
	Session.set('postSubmitErrors', {});
	return throwSuccess("You've successfully updated a rate schedule.");
});
