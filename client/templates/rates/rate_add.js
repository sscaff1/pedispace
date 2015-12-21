Template.rateAdd.events({
	'submit form': function(event, template) {
		event.preventDefault();

		var rate = {
			shiftTypeId: $(event.target).find('[name=shiftType]').val(),
			rateAmount: parseInt($(event.target).find('[name=rateAmount]').val()),
			comments: $(event.target).find('[name=comments]').val(),
			businessId: Meteor.user().profile.businessId
		}
		var scheduleDate = $(event.target).find('[name=scheduleDate]').val();
		if (scheduleDate) {
			rate.scheduleDate = moment(scheduleDate, 'MMMM DD YYYY').toDate();
		}
		var errors = validateRate(rate);
		if (!$.isEmptyObject(errors))
      return Session.set('postSubmitErrors', errors);
  	Meteor.call('rateAdd', rate, function(error, result) {
  		if (error) {
  			console.log(error);
			} else {
				Messages.throw('You\'re rate has been updated.', 'success')
				Session.set('postSubmitErrors', {});
				document.insertForm.reset();
			}
  	});
	}
});

Template.rateAdd.helpers({
	shiftTypes: function() {
		return ShiftTypes.find();
	}
});
