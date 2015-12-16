Template.rateAdd.onRendered(function() {
	Session.set('postSubmitErrors', {});
	$('[name=scheduleDate]').datepicker({
	  format: "MM dd yyyy",
	  autoclose: true
	});
});

Template.rateAdd.events({
	'submit form': function(event, template) {
		event.preventDefault();

		var rate = {
			shiftTypeId: $(event.target).find('[name=shiftType]').val(),
			rateAmount: parseFloat($(event.target).find('[name=rateAmount]').val()),
			comments: $(event.target).find('[name=comments]').val()
		}
		var scheduleDate = $(event.target).find('[name=scheduleDate]').val();
		if (scheduleDate) {
			rate.scheduleDate = moment(scheduleDate, 'MMMM DD YYYY').toDate();
		}
		var errors = validateRate(rate);
		if (!$.isEmptyObject(errors))
      return Session.set('postSubmitErrors', errors);
  	Meteor.call('rateAdd', rate, function(error, result) {
  		if (error)
  			console.log(error);
			Session.set('postSubmitErrors', {});
			document.insertForm.reset();
  	});
	}
});

Template.rateAdd.helpers({
	shiftTypes: function() {
		return ShiftTypes.find();
	}
});

Rates.after.insert(function(userId, doc) {
	return Messages.throw("You've successfully created a rate schedule.", 'success');
});

Rates.after.update(function(userId, doc) {
	return Messages.throw("You've successfully updated a rate schedule.", 'success');
});
